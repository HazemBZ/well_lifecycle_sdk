import React, { useState, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Button from '../../components/ui/Button'

const ProjectManagementLayout = () => {
  const [activeTab, setActiveTab] = useState('projects')
  const [selectedProject, setSelectedProject] = useState(null)
  const [isCreatingProject, setIsCreatingProject] = useState(false)
  const [currentWizardStep, setCurrentWizardStep] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@petrodigital.com',
    initials: 'JD',
    role: 'Administrator',
  }

  // Handle search
  const handleSearch = query => {
    setSearchQuery(query)
  }

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
  const handleNextStep = () => {
    if (currentWizardStep < 4) {
      setCurrentWizardStep(currentWizardStep + 1)

      // Map wizard steps to tabs
      const tabMapping = {
        1: 'details',
        2: 'team',
        3: 'plugins',
        4: 'location',
      }

      setActiveTab(tabMapping[currentWizardStep + 1])
    }
  }

  const handlePreviousStep = () => {
    if (currentWizardStep > 1) {
      setCurrentWizardStep(currentWizardStep - 1)

      // Map wizard steps to tabs
      const tabMapping = {
        1: 'details',
        2: 'team',
        3: 'plugins',
        4: 'location',
      }

      setActiveTab(tabMapping[currentWizardStep - 1])
    }
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

  // Handle project save
  const handleSaveProject = () => {
    // In a real application, this would save the project to the backend
    setIsCreatingProject(false)
    setActiveTab('projects')
  }

  return (
    <main className='flex-1 overflow-y-auto p-4 md:p-6'>
      {/* Page header */}
      <div className='mb-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-semibold text-neutral-900'>Project Management & Configuration</h1>
            <p className='mt-1 text-sm text-neutral-500'>
              Create, configure, and organize well projects with comprehensive metadata control
            </p>
          </div>
          <div className='flex space-x-3'>
            <Link to='/dashboard/home'>
              <Button variant='secondary' icon='LayoutDashboard'>
                Dashboard
              </Button>
            </Link>
            <Button variant='primary' icon='Plus' onClick={handleCreateProject}>
              New Project
            </Button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className='bg-white rounded-lg border border-neutral-200 shadow-sm overflow-hidden'>
        <Outlet />
      </div>
    </main>
  )
}

export default ProjectManagementLayout
