import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/ui/Header";
import Sidebar from "../../components/ui/Sidebar";
import Button from "../../components/ui/Button";
import Icon from "../../components/AppIcon";
import ProjectList from "./components/ProjectList";
import ProjectDetails from "./components/ProjectDetails";
import TeamManagement from "./components/TeamManagement";
import PluginConfiguration from "./components/PluginConfiguration";
import LocationMap from "./components/LocationMap";
import BulkImport from "./components/BulkImport";
import ProjectTemplates from "./components/ProjectTemplates";
import AuditTrail from "./components/AuditTrail";
import AdvancedSettings from "./components/AdvancedSettings";

const ProjectManagementConfiguration = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("projects");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [currentWizardStep, setCurrentWizardStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@petrodigital.com",
    initials: "JD",
    role: "Administrator"
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Handle project selection
  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setIsCreatingProject(false);
  };

  // Handle new project creation
  const handleCreateProject = () => {
    setSelectedProject(null);
    setIsCreatingProject(true);
    setCurrentWizardStep(1);
    setActiveTab("details");
  };

  // Handle wizard navigation
  const handleNextStep = () => {
    if (currentWizardStep < 4) {
      setCurrentWizardStep(currentWizardStep + 1);
      
      // Map wizard steps to tabs
      const tabMapping = {
        1: "details",
        2: "team",
        3: "plugins",
        4: "location"
      };
      
      setActiveTab(tabMapping[currentWizardStep + 1]);
    }
  };

  const handlePreviousStep = () => {
    if (currentWizardStep > 1) {
      setCurrentWizardStep(currentWizardStep - 1);
      
      // Map wizard steps to tabs
      const tabMapping = {
        1: "details",
        2: "team",
        3: "plugins",
        4: "location"
      };
      
      setActiveTab(tabMapping[currentWizardStep - 1]);
    }
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    
    // Map tabs to wizard steps when in creation mode
    if (isCreatingProject) {
      const stepMapping = {
        "details": 1,
        "team": 2,
        "plugins": 3,
        "location": 4
      };
      
      if (stepMapping[tab]) {
        setCurrentWizardStep(stepMapping[tab]);
      }
    }
  };

  // Handle project save
  const handleSaveProject = () => {
    // In a real application, this would save the project to the backend
    setIsCreatingProject(false);
    setActiveTab("projects");
  };

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Sidebar */}
      <Sidebar 
        variant={sidebarCollapsed ? "collapsed" : "expanded"} 
        onToggle={setSidebarCollapsed} 
      />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header 
          user={user} 
          onSearch={handleSearch} 
        />
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Page header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-neutral-900">Project Management & Configuration</h1>
                <p className="mt-1 text-sm text-neutral-500">
                  Create, configure, and organize well projects with comprehensive metadata control
                </p>
              </div>
              <div className="flex space-x-3">
                <Link to="/dashboard-project-overview">
                  <Button 
                    variant="secondary" 
                    icon="LayoutDashboard"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  variant="primary" 
                  icon="Plus"
                  onClick={handleCreateProject}
                >
                  New Project
                </Button>
              </div>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="bg-white rounded-lg border border-neutral-200 shadow-sm overflow-hidden">
            {/* Tabs */}
            {(selectedProject || isCreatingProject) && (
              <div className="border-b border-neutral-200">
                <nav className="flex -mb-px">
                  <button
                    className={`px-4 py-3 text-sm font-medium border-b-2 ${
                      activeTab === "details" ?"border-primary-500 text-primary-600" :"border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                    }`}
                    onClick={() => handleTabChange("details")}
                  >
                    <div className="flex items-center">
                      <Icon name="FileText" size={16} className="mr-2" />
                      Project Details
                    </div>
                  </button>
                  <button
                    className={`px-4 py-3 text-sm font-medium border-b-2 ${
                      activeTab === "team" ?"border-primary-500 text-primary-600" :"border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                    }`}
                    onClick={() => handleTabChange("team")}
                  >
                    <div className="flex items-center">
                      <Icon name="Users" size={16} className="mr-2" />
                      Team Management
                    </div>
                  </button>
                  <button
                    className={`px-4 py-3 text-sm font-medium border-b-2 ${
                      activeTab === "plugins" ?"border-primary-500 text-primary-600" :"border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                    }`}
                    onClick={() => handleTabChange("plugins")}
                  >
                    <div className="flex items-center">
                      <Icon name="Puzzle" size={16} className="mr-2" />
                      Plugin Configuration
                    </div>
                  </button>
                  <button
                    className={`px-4 py-3 text-sm font-medium border-b-2 ${
                      activeTab === "location" ?"border-primary-500 text-primary-600" :"border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                    }`}
                    onClick={() => handleTabChange("location")}
                  >
                    <div className="flex items-center">
                      <Icon name="MapPin" size={16} className="mr-2" />
                      Location
                    </div>
                  </button>
                  <button
                    className={`px-4 py-3 text-sm font-medium border-b-2 ${
                      activeTab === "import" ?"border-primary-500 text-primary-600" :"border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                    }`}
                    onClick={() => handleTabChange("import")}
                  >
                    <div className="flex items-center">
                      <Icon name="Upload" size={16} className="mr-2" />
                      Bulk Import
                    </div>
                  </button>
                  <button
                    className={`px-4 py-3 text-sm font-medium border-b-2 ${
                      activeTab === "templates" ?"border-primary-500 text-primary-600" :"border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                    }`}
                    onClick={() => handleTabChange("templates")}
                  >
                    <div className="flex items-center">
                      <Icon name="Copy" size={16} className="mr-2" />
                      Templates
                    </div>
                  </button>
                  <button
                    className={`px-4 py-3 text-sm font-medium border-b-2 ${
                      activeTab === "audit" ?"border-primary-500 text-primary-600" :"border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                    }`}
                    onClick={() => handleTabChange("audit")}
                  >
                    <div className="flex items-center">
                      <Icon name="History" size={16} className="mr-2" />
                      Audit Trail
                    </div>
                  </button>
                  <button
                    className={`px-4 py-3 text-sm font-medium border-b-2 ${
                      activeTab === "settings" ?"border-primary-500 text-primary-600" :"border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                    }`}
                    onClick={() => handleTabChange("settings")}
                  >
                    <div className="flex items-center">
                      <Icon name="Settings" size={16} className="mr-2" />
                      Advanced Settings
                    </div>
                  </button>
                </nav>
              </div>
            )}
            
            {/* Tab content */}
            <div className="p-6">
              {activeTab === "projects" && !selectedProject && !isCreatingProject && (
                <ProjectList 
                  onSelectProject={handleProjectSelect} 
                  onCreateProject={handleCreateProject}
                  searchQuery={searchQuery}
                />
              )}
              
              {activeTab === "details" && (
                <ProjectDetails 
                  project={selectedProject} 
                  isCreating={isCreatingProject}
                  wizardStep={currentWizardStep}
                />
              )}
              
              {activeTab === "team" && (
                <TeamManagement 
                  project={selectedProject} 
                  isCreating={isCreatingProject}
                  wizardStep={currentWizardStep}
                />
              )}
              
              {activeTab === "plugins" && (
                <PluginConfiguration 
                  project={selectedProject} 
                  isCreating={isCreatingProject}
                  wizardStep={currentWizardStep}
                />
              )}
              
              {activeTab === "location" && (
                <LocationMap 
                  project={selectedProject} 
                  isCreating={isCreatingProject}
                  wizardStep={currentWizardStep}
                />
              )}
              
              {activeTab === "import" && (
                <BulkImport 
                  project={selectedProject}
                />
              )}
              
              {activeTab === "templates" && (
                <ProjectTemplates />
              )}
              
              {activeTab === "audit" && (
                <AuditTrail 
                  project={selectedProject}
                />
              )}
              
              {activeTab === "settings" && (
                <AdvancedSettings 
                  project={selectedProject}
                />
              )}
            </div>
            
            {/* Wizard navigation buttons */}
            {isCreatingProject && (
              <div className="border-t border-neutral-200 p-4 flex justify-between">
                <Button 
                  variant="secondary" 
                  onClick={handlePreviousStep}
                  disabled={currentWizardStep === 1}
                >
                  Previous
                </Button>
                <div className="flex space-x-3">
                  <Button 
                    variant="tertiary" 
                    onClick={() => {
                      setIsCreatingProject(false);
                      setActiveTab("projects");
                    }}
                  >
                    Cancel
                  </Button>
                  {currentWizardStep < 4 ? (
                    <Button 
                      variant="primary" 
                      onClick={handleNextStep}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button 
                      variant="primary" 
                      onClick={handleSaveProject}
                    >
                      Create Project
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectManagementConfiguration;