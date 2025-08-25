import React, { useState } from 'react'

import Icon from '../../../components/AppIcon'
import { ProjectDetailsTab } from './ProjectDetailsTab'
import TeamManagementTab from './TeamManagementTab'
import PluginConfiguration from './PluginConfiguration'
import LocationMap from './LocationMap'
import BulkImportTab from './BulkImportTab'
import ProjectTemplates from './ProjectTemplates'
import AuditTrail from './AuditTrail'
import AdvancedSettings from './AdvancedSettings'
import { Form, Formik } from 'formik'
import { DEFAULT_RESAMPLING_CONFIG } from './ProjectDetailsTabOptions'
import * as Yup from 'yup'
import Button from 'components/ui/Button'
import axios from 'axios'

const createPorjectSchema = Yup.object().shape({
  projectname: Yup.string().required('Required'),
  description: Yup.string(),
  country: Yup.string().test(
    'country-selected',
    'country must be selected',
    (value, ctx) => !(ctx.parent.projectionType === 'MANUAL' && !countries.find(el => el.code === ctx.parent.country))
  ),
  unitSystem: Yup.string().required(),
  deadline: Yup.date(),
  projectionType: Yup.string().required(),
  projectionName: Yup.string(),
  resampleStart: Yup.number(),
  resampleStop: Yup.number(),
  resampleStep: Yup.number(),
  interpolation: Yup.string(),
})

const ProjectDetails = ({ project, isCreating, wizardStep }) => {
  const [activeTab, setActiveTab] = useState('details')
  const [selectedProject, setSelectedProject] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isCreatingProject, setIsCreatingProject] = useState(true)
  const [currentWizardStep, setCurrentWizardStep] = useState(1)
  const unitSystem = 'Metric system'
  const members = [{ id: 1, role: 'Manager' }] // This should be replaced with actual member data

  // Handle project selection
  const handleProjectSelect = project => {
    setSelectedProject(project)
    setIsCreatingProject(false)
  }

  // Handle new project creation
  const handleCreateProject = () => {
    setSelectedProject(null)
    setIsCreatingProject(true)
    setCurrentWizardStep(1)
    setActiveTab('details')
  }

  // Handle tab change
  const handleTabChange = tab => {
    setActiveTab(tab)

    // Map tabs to wizard steps when in creation mode
    if (isCreatingProject) {
      const stepMapping = {
        details: 1,
        team: 2,
        plugins: 3,
        location: 4,
      }

      if (stepMapping[tab]) {
        setCurrentWizardStep(stepMapping[tab])
      }
    }
  }

  const handleSubmission = (
    {
      projectionType,
      projectionName,
      resampleStart,
      resampleStop,
      resampleStep,
      resampleType,
      interpolation,
      members,
      ...restVaues
    },
    actions
  ) => {
    const paths = []
    const associatedPaths = {}

    const data = {
      ...restVaues,
      projection_kind: projectionType,
      projection_value: projectionName,
      list_path: JSON.stringify(paths),
      associated_files: JSON.stringify(Object.keys(associatedPaths)),
      unitSystem,
      members,
      resample: {
        resampleType,
        resampleStart,
        resampleStop,
        resampleStep,
        interpolation,
      },
    }
    return axios
      .post('http://localhost:8000/api/projects/createproject/', data)
      .then(() => {
        actions.resetForm()
        // resetNonFormData()
        // navigate('/projects')
      })
      .catch(() => {
        // TODO: handle exception
      })
  }

  return (
    <Formik
      initialValues={{
        projectname: '',
        description: '',
        country: '',
        unitSystem: 'Metric system',
        deadline: '',
        projectionType: 'AUTOMATIC',
        projectionName: '',
        resampleStart: DEFAULT_RESAMPLING_CONFIG.start,
        resampleStop: DEFAULT_RESAMPLING_CONFIG.stop,
        resampleStep: DEFAULT_RESAMPLING_CONFIG.step,
        resampleType: 'ORIGIN',
        interpolation: DEFAULT_RESAMPLING_CONFIG.interpolation,
        associated_files: {},
        members, // TODO: Default to include logged-in user or project creator
      }}
      onSubmit={handleSubmission}
    >
      {({ values, submitForm, isSubmitting }) => (
        <Form
          onSubmit={e => {
            e.preventDefault()
            e.stopPropagation()
            console.log('submit')
          }}
        >
          <>
            <div className='border-b border-neutral-200'>
              <nav className='flex -mb-px'>
                <button
                  className={`px-4 py-3 text-sm font-medium border-b-2 ${
                    activeTab === 'details'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                  }`}
                  type='button'
                  onClick={() => handleTabChange('details')}
                >
                  <div className='flex items-center'>
                    <Icon name='FileText' size={16} className='mr-2' />
                    Project Details
                  </div>
                </button>
                <button
                  className={`px-4 py-3 text-sm font-medium border-b-2 ${
                    activeTab === 'team'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                  }`}
                  onClick={() => handleTabChange('team')}
                >
                  <div className='flex items-center'>
                    <Icon name='Users' size={16} className='mr-2' />
                    Team Management
                  </div>
                </button>
                <button
                  className={`px-4 py-3 text-sm font-medium border-b-2 ${
                    activeTab === 'import'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                  }`}
                  onClick={() => handleTabChange('import')}
                >
                  <div className='flex items-center'>
                    <Icon name='Upload' size={16} className='mr-2' />
                    Bulk Import
                  </div>
                </button>
              </nav>
            </div>

            <div>
              {/* Main content */}

              {/* Tab content */}
              <div className='p-6'>
                {activeTab === 'projects' && !selectedProject && !isCreatingProject && (
                  <ProjectList
                    onSelectProject={handleProjectSelect}
                    onCreateProject={handleCreateProject}
                    searchQuery={searchQuery}
                  />
                )}

                {activeTab === 'details' && (
                  <ProjectDetailsTab
                    project={selectedProject}
                    isCreating={isCreatingProject}
                    wizardStep={currentWizardStep}
                  />
                )}

                {activeTab === 'team' && (
                  <TeamManagementTab
                    project={selectedProject}
                    isCreating={isCreatingProject}
                    wizardStep={currentWizardStep}
                  />
                )}

                {activeTab === 'plugins' && (
                  <PluginConfiguration
                    project={selectedProject}
                    isCreating={isCreatingProject}
                    wizardStep={currentWizardStep}
                  />
                )}

                {activeTab === 'location' && (
                  <LocationMap
                    project={selectedProject}
                    isCreating={isCreatingProject}
                    wizardStep={currentWizardStep}
                  />
                )}

                {activeTab === 'import' && <BulkImportTab project={selectedProject} />}

                {activeTab === 'templates' && <ProjectTemplates />}

                {activeTab === 'audit' && <AuditTrail project={selectedProject} />}

                {activeTab === 'settings' && <AdvancedSettings project={selectedProject} />}
              </div>

              {/* Wizard progress indicator */}
              {isCreating && (
                <div className='mt-8 pt-6 border-t border-neutral-200'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <div className='flex items-center relative'>
                        <div className='rounded-full h-8 w-8 flex items-center justify-center bg-primary-600 text-white'>
                          1
                        </div>
                        <div className='ml-2 text-sm font-medium text-primary-600'>Project Details</div>
                      </div>
                      <div className='flex-grow mx-4 h-0.5 bg-primary-600'></div>
                      <div className='flex items-center relative'>
                        <div
                          className={`rounded-full h-8 w-8 flex items-center justify-center ${
                            wizardStep >= 2 ? 'bg-primary-600 text-white' : 'bg-neutral-200 text-neutral-500'
                          }`}
                        >
                          2
                        </div>
                        <div
                          className={`ml-2 text-sm font-medium ${
                            wizardStep >= 2 ? 'text-primary-600' : 'text-neutral-500'
                          }`}
                        >
                          Team Management
                        </div>
                      </div>
                      <div
                        className={`flex-grow mx-4 h-0.5 ${wizardStep >= 2 ? 'bg-primary-600' : 'bg-neutral-200'}`}
                      ></div>
                      <div className='flex items-center relative'>
                        <div
                          className={`rounded-full h-8 w-8 flex items-center justify-center ${
                            wizardStep >= 3 ? 'bg-primary-600 text-white' : 'bg-neutral-200 text-neutral-500'
                          }`}
                        >
                          3
                        </div>
                        <div
                          className={`ml-2 text-sm font-medium ${
                            wizardStep >= 3 ? 'text-primary-600' : 'text-neutral-500'
                          }`}
                        >
                          Plugins
                        </div>
                      </div>
                      <div
                        className={`flex-grow mx-4 h-0.5 ${wizardStep >= 3 ? 'bg-primary-600' : 'bg-neutral-200'}`}
                      ></div>
                      <div className='flex items-center relative'>
                        <div
                          className={`rounded-full h-8 w-8 flex items-center justify-center ${
                            wizardStep >= 4 ? 'bg-primary-600 text-white' : 'bg-neutral-200 text-neutral-500'
                          }`}
                        >
                          4
                        </div>
                        <div
                          className={`ml-2 text-sm font-medium ${
                            wizardStep >= 4 ? 'text-primary-600' : 'text-neutral-500'
                          }`}
                        >
                          Location
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className='flex justify-end space-x-3'>
                <Button variant='tertiary' type='button'>
                  Cancel
                </Button>
                <Button
                  variant='primary'
                  icon='Save'
                  type='submit'
                  onClick={e => {
                    console.log('Values:', values)
                    e.preventDefault()
                    e.stopPropagation()
                    submitForm()
                  }}
                >
                  Save Settings
                </Button>
              </div>
            </div>
          </>
        </Form>
      )}
    </Formik>
  )
}

export default ProjectDetails
