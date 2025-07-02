import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import InputSearch from "../../../components/ui/InputSearch";
import Dropdown from "../../../components/ui/Dropdown";

const ProjectTemplates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [newTemplateDescription, setNewTemplateDescription] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  // Mock templates data
  const mockTemplates = [
    {
      id: 1,
      name: "Exploration Project",
      description: "Template for new exploration projects with standard plugins and team structure.",
      createdBy: "John Doe",
      createdAt: "2023-10-15T10:30:00Z",
      plugins: ["Logs", "Drilling", "Geology", "Surveys"],
      thumbnail: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 2,
      name: "Development Project",
      description: "Template for development projects with focus on production and optimization.",
      createdBy: "Sarah Johnson",
      createdAt: "2023-09-22T14:45:00Z",
      plugins: ["Logs", "Production", "Geology", "Petrophysics"],
      thumbnail: "https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 3,
      name: "Offshore Project",
      description: "Template for offshore projects with specialized plugins and workflows.",
      createdBy: "Michael Chen",
      createdAt: "2023-11-05T09:15:00Z",
      plugins: ["Logs", "Drilling", "Production", "Geology", "Surveys", "Mudlogging"],
      thumbnail: "https://images.pixabay.com/photo/2020/05/23/08/23/oil-platform-5209259_1280.jpg"
    },
    {
      id: 4,
      name: "Unconventional Project",
      description: "Template for unconventional resource projects with specialized workflows.",
      createdBy: "Emily Rodriguez",
      createdAt: "2023-10-30T11:20:00Z",
      plugins: ["Logs", "Drilling", "Production", "Geology", "Petrophysics"],
      thumbnail: "https://images.unsplash.com/photo-1586076100131-32505c71d0d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
    }
  ];

  // Mock projects for template creation
  const mockProjects = [
    { value: "project1", label: "North Sea Exploration" },
    { value: "project2", label: "Gulf of Mexico Development" },
    { value: "project3", label: "Permian Basin Analysis" },
    { value: "project4", label: "Caspian Sea Exploration" },
    { value: "project5", label: "North Dakota Shale" }
  ];

  // Filter templates based on search query
  const filteredTemplates = mockTemplates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // Handle create template
  const handleCreateTemplate = () => {
    // In a real app, you would create the template here
    alert(`Template "${newTemplateName}" created successfully!`);
    setShowCreateModal(false);
    setNewTemplateName("");
    setNewTemplateDescription("");
    setSelectedProject(null);
  };

  return (
    <div>
      {/* Section title */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-neutral-900">Project Templates</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Create and manage reusable project templates to streamline project setup.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
        <div className="w-full md:w-64">
          <InputSearch
            placeholder="Search templates..."
            value={searchQuery}
            onSearch={handleSearch}
          />
        </div>
        <Button 
          variant="primary" 
          icon="Plus" 
          onClick={() => setShowCreateModal(true)}
        >
          Create Template
        </Button>
      </div>

      {/* Templates grid */}
      {filteredTemplates.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 text-neutral-500 mb-4">
            <Icon name="FileText" size={32} />
          </div>
          <h3 className="text-lg font-medium text-neutral-900 mb-2">No templates found</h3>
          <p className="text-neutral-500 max-w-md mx-auto mb-6">
            {searchQuery 
              ? `No templates match your search "${searchQuery}".` 
              : "You haven't created any project templates yet."}
          </p>
          <Button
            variant="primary"
            icon="Plus"
            onClick={() => setShowCreateModal(true)}
          >
            Create Template
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div 
              key={template.id}
              className="bg-white border border-neutral-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="h-40 overflow-hidden">
                <img 
                  src={template.thumbnail} 
                  alt={template.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-neutral-900 mb-1">{template.name}</h3>
                <p className="text-neutral-600 text-sm mb-3 line-clamp-2">{template.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {template.plugins.slice(0, 3).map((plugin, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                    >
                      {plugin}
                    </span>
                  ))}
                  {template.plugins.length > 3 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                      +{template.plugins.length - 3} more
                    </span>
                  )}
                </div>
                
                <div className="flex items-center text-xs text-neutral-500 mb-4">
                  <span>Created by {template.createdBy}</span>
                  <span className="mx-2">•</span>
                  <span>{formatDate(template.createdAt)}</span>
                </div>
                
                <div className="flex justify-between">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon="Edit2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    icon="Copy"
                  >
                    Use Template
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Template Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-neutral-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-neutral-900 mb-4">
                      Create Project Template
                    </h3>
                    <div className="space-y-4">
                      <Input
                        label="Template Name"
                        value={newTemplateName}
                        onChange={(e) => setNewTemplateName(e.target.value)}
                        placeholder="Enter template name"
                        required
                      />
                      <Input
                        label="Description"
                        value={newTemplateDescription}
                        onChange={(e) => setNewTemplateDescription(e.target.value)}
                        placeholder="Enter template description"
                      />
                      <Dropdown
                        label="Base on Existing Project"
                        options={mockProjects}
                        value={selectedProject}
                        onChange={setSelectedProject}
                        placeholder="Select a project (optional)"
                      />
                      <div className="bg-neutral-50 p-3 rounded-md">
                        <p className="text-sm text-neutral-600">
                          Creating a template will save the current project configuration, including:
                        </p>
                        <ul className="mt-2 text-sm text-neutral-600 space-y-1">
                          <li className="flex items-center">
                            <Icon name="Check" size={14} className="text-success-500 mr-2" />
                            Enabled plugins and their settings
                          </li>
                          <li className="flex items-center">
                            <Icon name="Check" size={14} className="text-success-500 mr-2" />
                            Team structure and role assignments
                          </li>
                          <li className="flex items-center">
                            <Icon name="Check" size={14} className="text-success-500 mr-2" />
                            Project metadata structure
                          </li>
                          <li className="flex items-center">
                            <Icon name="Check" size={14} className="text-success-500 mr-2" />
                            Custom fields and configurations
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-neutral-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <Button 
                  variant="primary" 
                  onClick={handleCreateTemplate}
                  disabled={!newTemplateName}
                  className="sm:ml-3"
                >
                  Create Template
                </Button>
                <Button 
                  variant="tertiary" 
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectTemplates;