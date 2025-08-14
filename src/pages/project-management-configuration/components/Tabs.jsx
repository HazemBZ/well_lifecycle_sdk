import { ProjectDetailsTab } from './ProjectDetailsTab'

function Tabs() {
  return (
    <>
      {/* Tabs */}

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
          <ProjectDetailsTab project={selectedProject} isCreating={isCreatingProject} wizardStep={currentWizardStep} />
        )}

        {activeTab === 'team' && (
          <TeamManagement project={selectedProject} isCreating={isCreatingProject} wizardStep={currentWizardStep} />
        )}

        {activeTab === 'plugins' && (
          <PluginConfiguration
            project={selectedProject}
            isCreating={isCreatingProject}
            wizardStep={currentWizardStep}
          />
        )}

        {activeTab === 'location' && (
          <LocationMap project={selectedProject} isCreating={isCreatingProject} wizardStep={currentWizardStep} />
        )}

        {activeTab === 'import' && <BulkImport project={selectedProject} />}

        {activeTab === 'templates' && <ProjectTemplates />}

        {activeTab === 'audit' && <AuditTrail project={selectedProject} />}

        {activeTab === 'settings' && <AdvancedSettings project={selectedProject} />}
      </div>

      {/* Wizard navigation buttons */}
      {isCreatingProject && (
        <div className='border-t border-neutral-200 p-4 flex justify-between'>
          <Button variant='secondary' onClick={handlePreviousStep} disabled={currentWizardStep === 1}>
            Previous
          </Button>
          <div className='flex space-x-3'>
            <Button
              variant='tertiary'
              onClick={() => {
                setIsCreatingProject(false)
                setActiveTab('projects')
              }}
            >
              Cancel
            </Button>
            {currentWizardStep < 4 ? (
              <Button variant='primary' onClick={handleNextStep}>
                Next
              </Button>
            ) : (
              <Button variant='primary' onClick={handleSaveProject}>
                Create Project
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export { Tabs }
