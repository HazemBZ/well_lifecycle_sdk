import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";


const CreateWorkspaceModal = ({ onClose, onCreateWorkspace }) => {
  const [step, setStep] = useState(1);
  const [workspaceData, setWorkspaceData] = useState({
    name: "",
    description: "",
    template: null,
    components: [],
    dataSources: [],
    sharing: "private",
  });

  // Mock template options
  const templateOptions = [
    { value: "blank", label: "Blank Workspace", icon: "File" },
    { value: "drilling", label: "Drilling Engineer", icon: "Drill" },
    { value: "geology", label: "Geologist", icon: "Mountain" },
    { value: "petrophysics", label: "Petrophysicist", icon: "Activity" },
    { value: "production", label: "Production Engineer", icon: "BarChart3" },
    { value: "reservoir", label: "Reservoir Engineer", icon: "Database" },
  ];

  // Mock component options
  const componentOptions = [
    { id: 1, name: "Log Viewer", icon: "LineChart", description: "Display and analyze well log data" },
    { id: 2, name: "Crossplot", icon: "ScatterChart", description: "Create scatter plots to analyze relationships between log curves" },
    { id: 3, name: "Histogram", icon: "BarChart2", description: "Visualize data distribution with histograms" },
    { id: 4, name: "Map View", icon: "Map", description: "Geographic visualization of well locations" },
    { id: 5, name: "Time Series", icon: "TrendingUp", description: "Plot time-based data for production or drilling" },
    { id: 6, name: "3D Viewer", icon: "Cube", description: "Three-dimensional visualization of well trajectories" },
    { id: 7, name: "Data Table", icon: "Table", description: "Tabular display of well or production data" },
    { id: 8, name: "Calculator", icon: "Calculator", description: "Perform engineering calculations" },
  ];

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkspaceData({ ...workspaceData, [name]: value });
  };

  // Handle template selection
  const handleTemplateSelect = (template) => {
    setWorkspaceData({ ...workspaceData, template });
  };

  // Handle component toggle
  const handleComponentToggle = (componentId) => {
    const currentComponents = [...workspaceData.components];
    const index = currentComponents.indexOf(componentId);
    
    if (index === -1) {
      currentComponents.push(componentId);
    } else {
      currentComponents.splice(index, 1);
    }
    
    setWorkspaceData({ ...workspaceData, components: currentComponents });
  };

  // Handle sharing option change
  const handleSharingChange = (e) => {
    setWorkspaceData({ ...workspaceData, sharing: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateWorkspace(workspaceData);
  };

  // Next step
  const handleNextStep = () => {
    setStep(step + 1);
  };

  // Previous step
  const handlePrevStep = () => {
    setStep(step - 1);
  };

  // Check if current step is valid
  const isStepValid = () => {
    if (step === 1) {
      return workspaceData.name.trim() !== "" && workspaceData.template !== null;
    }
    return true;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-neutral-900">Create New Workspace</h2>
          <button
            className="p-2 rounded-full text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100"
            onClick={onClose}
            aria-label="Close"
          >
            <Icon name="X" size={20} />
          </button>
        </div>
        
        {/* Progress steps */}
        <div className="px-6 py-4 bg-neutral-50 border-b border-neutral-200">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-primary-600 text-white' : 'bg-neutral-200 text-neutral-500'}`}>
                1
              </div>
              <div className="ml-2 text-sm font-medium text-neutral-900">Template</div>
            </div>
            <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? 'bg-primary-600' : 'bg-neutral-200'}`}></div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-primary-600 text-white' : 'bg-neutral-200 text-neutral-500'}`}>
                2
              </div>
              <div className="ml-2 text-sm font-medium text-neutral-900">Components</div>
            </div>
            <div className={`flex-1 h-0.5 mx-4 ${step >= 3 ? 'bg-primary-600' : 'bg-neutral-200'}`}></div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? 'bg-primary-600 text-white' : 'bg-neutral-200 text-neutral-500'}`}>
                3
              </div>
              <div className="ml-2 text-sm font-medium text-neutral-900">Settings</div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(90vh - 180px)' }}>
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Info & Template */}
            {step === 1 && (
              <div>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                    Workspace Name <span className="text-error-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={workspaceData.name}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border border-neutral-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Enter workspace name"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={workspaceData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="block w-full rounded-md border border-neutral-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Describe the purpose of this workspace"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Select Template <span className="text-error-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {templateOptions.map((template) => (
                      <div
                        key={template.value}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          workspaceData.template?.value === template.value
                            ? 'border-primary-500 bg-primary-50' :'border-neutral-200 hover:border-primary-300 hover:bg-neutral-50'
                        }`}
                        onClick={() => handleTemplateSelect(template)}
                      >
                        <div className="flex items-start">
                          <div className={`p-2 rounded-md mr-3 ${
                            workspaceData.template?.value === template.value
                              ? 'bg-primary-100 text-primary-700' :'bg-neutral-100 text-neutral-700'
                          }`}>
                            <Icon name={template.icon} size={20} />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-neutral-900">{template.label}</h3>
                            <p className="text-xs text-neutral-500 mt-1">
                              {template.value === "blank" ?"Start with an empty workspace" 
                                : `Pre-configured for ${template.label} workflows`}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 2: Components */}
            {step === 2 && (
              <div>
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">Select Components</h3>
                  <p className="text-neutral-500 text-sm mb-4">
                    Choose the visualization components and tools to include in your workspace.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {componentOptions.map((component) => (
                      <div
                        key={component.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          workspaceData.components.includes(component.id)
                            ? 'border-primary-500 bg-primary-50' :'border-neutral-200 hover:border-primary-300 hover:bg-neutral-50'
                        }`}
                        onClick={() => handleComponentToggle(component.id)}
                      >
                        <div className="flex items-start">
                          <div className={`p-2 rounded-md mr-3 ${
                            workspaceData.components.includes(component.id)
                              ? 'bg-primary-100 text-primary-700' :'bg-neutral-100 text-neutral-700'
                          }`}>
                            <Icon name={component.icon} size={20} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-medium text-neutral-900">{component.name}</h3>
                              {workspaceData.components.includes(component.id) && (
                                <Icon name="Check" size={16} className="text-primary-600" />
                              )}
                            </div>
                            <p className="text-xs text-neutral-500 mt-1">
                              {component.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                  <div className="flex items-start">
                    <div className="p-2 bg-primary-100 rounded-md text-primary-700 mr-3">
                      <Icon name="Info" size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-neutral-900">Component Configuration</h4>
                      <p className="text-xs text-neutral-500 mt-1">
                        You'll be able to arrange and configure these components in the workspace editor after creation.
                        You can also add or remove components later.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 3: Settings */}
            {step === 3 && (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">Workspace Settings</h3>
                  <p className="text-neutral-500 text-sm mb-4">
                    Configure additional settings for your workspace.
                  </p>
                  
                  <div className="space-y-6">
                    {/* Sharing options */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Sharing Options
                      </label>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <input
                            id="sharing-private"
                            name="sharing"
                            type="radio"
                            value="private"
                            checked={workspaceData.sharing === "private"}
                            onChange={handleSharingChange}
                            className="mt-1 h-4 w-4 text-primary-600 border-neutral-300 focus:ring-primary-500"
                          />
                          <label htmlFor="sharing-private" className="ml-3">
                            <div className="text-sm font-medium text-neutral-900">Private</div>
                            <p className="text-xs text-neutral-500">
                              Only you can access this workspace
                            </p>
                          </label>
                        </div>
                        
                        <div className="flex items-start">
                          <input
                            id="sharing-team"
                            name="sharing"
                            type="radio"
                            value="team"
                            checked={workspaceData.sharing === "team"}
                            onChange={handleSharingChange}
                            className="mt-1 h-4 w-4 text-primary-600 border-neutral-300 focus:ring-primary-500"
                          />
                          <label htmlFor="sharing-team" className="ml-3">
                            <div className="text-sm font-medium text-neutral-900">Team Members</div>
                            <p className="text-xs text-neutral-500">
                              Share with specific team members with custom permissions
                            </p>
                          </label>
                        </div>
                        
                        <div className="flex items-start">
                          <input
                            id="sharing-organization"
                            name="sharing"
                            type="radio"
                            value="organization"
                            checked={workspaceData.sharing === "organization"}
                            onChange={handleSharingChange}
                            className="mt-1 h-4 w-4 text-primary-600 border-neutral-300 focus:ring-primary-500"
                          />
                          <label htmlFor="sharing-organization" className="ml-3">
                            <div className="text-sm font-medium text-neutral-900">Organization</div>
                            <p className="text-xs text-neutral-500">
                              Everyone in your organization can access this workspace
                            </p>
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    {/* Data sources */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Default Data Sources
                      </label>
                      <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-neutral-700">
                            Data sources can be configured after workspace creation
                          </div>
                          <Button 
                            variant="tertiary" 
                            size="sm"
                            icon="Settings"
                            disabled
                          >
                            Configure Later
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Save as template option */}
                    <div className="flex items-center">
                      <input
                        id="save-template"
                        name="saveTemplate"
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                      />
                      <label htmlFor="save-template" className="ml-2 text-sm text-neutral-700">
                        Save as organization template
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
                  <div className="flex items-start">
                    <div className="p-2 bg-primary-100 rounded-md text-primary-700 mr-3">
                      <Icon name="CheckCircle" size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-neutral-900">Ready to Create</h4>
                      <p className="text-xs text-neutral-500 mt-1">
                        Your workspace will be created with the selected template, components, and settings.
                        You can modify all settings later from the workspace editor.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50 flex justify-between">
          {step > 1 ? (
            <Button 
              variant="secondary" 
              onClick={handlePrevStep}
              icon="ArrowLeft"
            >
              Back
            </Button>
          ) : (
            <Button 
              variant="tertiary" 
              onClick={onClose}
            >
              Cancel
            </Button>
          )}
          
          {step < 3 ? (
            <Button 
              variant="primary" 
              onClick={handleNextStep}
              disabled={!isStepValid()}
              icon="ArrowRight"
              iconPosition="right"
            >
              Next
            </Button>
          ) : (
            <Button 
              variant="primary" 
              onClick={handleSubmit}
              icon="Check"
            >
              Create Workspace
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateWorkspaceModal;