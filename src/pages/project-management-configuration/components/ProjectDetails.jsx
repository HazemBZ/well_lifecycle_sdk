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

// TODO: Implement the actual save logic
// const handleSubmission = (
//   {
//     projectionType,
//     projectionName,
//     resampleStart,
//     resampleStop,
//     resampleStep,
//     resampleType,
//     interpolation,
//     ...restVaues
//   },
//   actions
// ) => {
//   if (paths.length + Object.keys(associatedPaths).length === 0) {
//     setErrorPath(true)
//     actions.setSubmitting(false)
//     confirmModal.hide()
//     return
//   }
//   const data = {
//     ...restVaues,
//     projection_kind: projectionType,
//     projection_value: projectionName,
//     list_path: JSON.stringify(paths),
//     associated_files: JSON.stringify(Object.keys(associatedPaths)),
//     unitSystem,
//     members: members.map(({ id, role }) => ({ id: id, role: role })),
//     resample: {
//       resampleType,
//       resampleStart,
//       resampleStop,
//       resampleStep,
//       interpolation,
//     },
//   }

//   return axios
//     .post('projects/createproject/', data)
//     .then(() => {
//       actions.resetForm()
//       resetNonFormData()
//       navigate('/projects')
//     })
//     .catch(() => {
//       // TODO: handle exception
//     })
// }

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

  // const handleSaveProject = () => {
  //   // In a real application, this would save the project to the backend
  //   setIsCreatingProject(false)
  //   setActiveTab('projects')
  // }

  // State for form fields
  const [formData, setFormData] = useState({
    name: project?.name || '',
    description: project?.description || '',
    status: project?.status
      ? {
          value: project.status,
          label: project.status.charAt(0).toUpperCase() + project.status.slice(1),
        }
      : { value: 'planning', label: 'Planning' },
    type: project?.type
      ? {
          value: project.type,
          label: project.type.charAt(0).toUpperCase() + project.type.slice(1),
        }
      : { value: 'exploration', label: 'Exploration' },
    startDate: project?.startDate || '',
    endDate: project?.endDate || '',
    budget: project?.budget || '',
    currency: project?.currency
      ? {
          value: project.currency,
          label: project.currency,
        }
      : { value: 'USD', label: 'USD' },
    client: project?.client || '',
    operator: project?.operator || '',
    tags: project?.tags || [],
  })

  // Handle input change
  // const handleInputChange = e => {
  //   const { name, value } = e.target
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   })
  // }

  // Handle dropdown change
  // const handleDropdownChange = (name, value) => {
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   })
  // }

  // Handle search
  // const handleSearch = query => {
  //   setSearchQuery(query)
  // }

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

  // Handle wizard navigation
  // const handleNextStep = () => {
  //   if (currentWizardStep < 4) {
  //     setCurrentWizardStep(currentWizardStep + 1)

  //     // Map wizard steps to tabs
  //     const tabMapping = {
  //       1: 'details',
  //       2: 'team',
  //       3: 'plugins',
  //       4: 'location',
  //     }

  //     setActiveTab(tabMapping[currentWizardStep + 1])
  //   }
  // }

  // const handlePreviousStep = () => {
  //   if (currentWizardStep > 1) {
  //     setCurrentWizardStep(currentWizardStep - 1)

  //     // Map wizard steps to tabs
  //     const tabMapping = {
  //       1: 'details',
  //       2: 'team',
  //       3: 'plugins',
  //       4: 'location',
  //     }

  //     setActiveTab(tabMapping[currentWizardStep - 1])
  //   }
  // }

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

  // TODO: submit country code not the entire object
  const handleSubmission = (
    {
      projectionType,
      projectionName,
      resampleStart,
      resampleStop,
      resampleStep,
      resampleType,
      interpolation,
      ...restVaues
    },
    actions
  ) => {
    // console.log('Form submitted with values:', values)
    // Here you would typically send the data to your backend
    // For now, just log it and reset the form
    // actions.setSubmitting(false)
    // actions.resetForm()

    const paths = []
    const associatedPaths = {}

    const data = {
      ...restVaues,
      projection_kind: projectionType,
      projection_value: projectionName,
      list_path: JSON.stringify(paths),
      associated_files: JSON.stringify(Object.keys(associatedPaths)),
      unitSystem,
      members: members.map(({ id, role }) => ({ id: id, role: role })),
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

  // TODO: Implement the actual save logic
  // const handleSubmission = (
  //   {
  //     projectionType,
  //     projectionName,
  //     resampleStart,
  //     resampleStop,
  //     resampleStep,
  //     resampleType,
  //     interpolation,
  //     ...restVaues
  //   },
  //   actions
  // ) => {
  //   if (paths.length + Object.keys(associatedPaths).length === 0) {
  //     setErrorPath(true)
  //     actions.setSubmitting(false)
  //     confirmModal.hide()
  //     return
  //   }
  //   const data = {
  //     ...restVaues,
  //     projection_kind: projectionType,
  //     projection_value: projectionName,
  //     list_path: JSON.stringify(paths),
  //     associated_files: JSON.stringify(Object.keys(associatedPaths)),
  //     unitSystem,
  //     members: members.map(({ id, role }) => ({ id: id, role: role })),
  //     resample: {
  //       resampleType,
  //       resampleStart,
  //       resampleStop,
  //       resampleStep,
  //       interpolation,
  //     },
  //   }

  // return axios
  //   .post('projects/createproject/', data)
  //   .then(() => {
  //     actions.resetForm()
  //     resetNonFormData()
  //     navigate('/projects')
  //   })
  //   .catch(() => {
  //     // TODO: handle exception
  //   })
  // }

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
      }}
      onSubmit={handleSubmission}
    >
      {({ values, submitForm, isSubmitting }) => (
        <Form>
          <>
            <div className='border-b border-neutral-200'>
              <nav className='flex -mb-px'>
                <button
                  className={`px-4 py-3 text-sm font-medium border-b-2 ${
                    activeTab === 'details'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                  }`}
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
                {/* <button
                  className={`px-4 py-3 text-sm font-medium border-b-2 ${
                    activeTab === 'plugins'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                  }`}
                  onClick={() => handleTabChange('plugins')}
                >
                  <div className='flex items-center'>
                    <Icon name='Puzzle' size={16} className='mr-2' />
                    Plugin Configuration
                  </div>
                </button> */}
                {/* <button
                  className={`px-4 py-3 text-sm font-medium border-b-2 ${
                    activeTab === 'location'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                  }`}
                  onClick={() => handleTabChange('location')}
                >
                  <div className='flex items-center'>
                    <Icon name='MapPin' size={16} className='mr-2' />
                    Location
                  </div>
                </button> */}
                {/* <button
                  className={`px-4 py-3 text-sm font-medium border-b-2 ${
                    activeTab === 'templates'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                  }`}
                  onClick={() => handleTabChange('templates')}
                >
                  <div className='flex items-center'>
                    <Icon name='Copy' size={16} className='mr-2' />
                    Templates
                  </div>
                </button> */}
                {/* <button
                  className={`px-4 py-3 text-sm font-medium border-b-2 ${
                    activeTab === 'audit'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                  }`}
                  onClick={() => handleTabChange('audit')}
                >
                  <div className='flex items-center'>
                    <Icon name='History' size={16} className='mr-2' />
                    Audit Trail
                  </div>
                </button> */}
                {/* <button
                  className={`px-4 py-3 text-sm font-medium border-b-2 ${
                    activeTab === 'settings'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                  }`}
                  onClick={() => handleTabChange('settings')}
                >
                  <div className='flex items-center'>
                    <Icon name='Settings' size={16} className='mr-2' />
                    Advanced Settings
                  </div>
                </button> */}
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
                <Button variant='tertiary'>Cancel</Button>
                <Button
                  variant='primary'
                  icon='Save'
                  onClick={() => {
                    console.log('Values:', values)
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
