import React, { useState, useEffect } from 'react'
import { Link, Outlet, Route, Routes } from 'react-router-dom'
import Header from '../../components/ui/Header'
import Sidebar from '../../components/ui/Sidebar'
import Button from '../../components/ui/Button'
import Icon from '../../components/AppIcon'
import ProjectList from './components/ProjectList'
import ProjectDetails from './components/ProjectDetails'
import TeamManagement from './components/TeamManagement'
import PluginConfiguration from './components/PluginConfiguration'
import LocationMap from './components/LocationMap'
import BulkImport from './components/BulkImport'
import ProjectTemplates from './components/ProjectTemplates'
import AuditTrail from './components/AuditTrail'
import AdvancedSettings from './components/AdvancedSettings'
import ProjectManagementLayout from './ProjectManagementLayout'

const ProjectManagementConfiguration = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
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
    <Routes>
      <Route element={<ProjectManagementLayout />}>
        <Route
          index
          element={
            <ProjectList
              onSelectProject={handleProjectSelect}
              onCreateProject={handleCreateProject}
              searchQuery={searchQuery}
            />
          }
        />
        <Route
          path='new'
          element={
            <ProjectDetails project={selectedProject} isCreating={isCreatingProject} wizardStep={currentWizardStep} />
          }
        />
      </Route>
    </Routes>
  )
}

export default ProjectManagementConfiguration
