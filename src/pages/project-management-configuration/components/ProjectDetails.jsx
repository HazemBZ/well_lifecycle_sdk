import React, { useState } from "react";
import Input from "../../../components/ui/Input";
import Dropdown from "../../../components/ui/Dropdown";
import Button from "../../../components/ui/Button";


const ProjectDetails = ({ project, isCreating, wizardStep }) => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: project?.name || "",
    description: project?.description || "",
    status: project?.status ? { 
      value: project.status, 
      label: project.status.charAt(0).toUpperCase() + project.status.slice(1) 
    } : { value: "planning", label: "Planning" },
    type: project?.type ? { 
      value: project.type, 
      label: project.type.charAt(0).toUpperCase() + project.type.slice(1) 
    } : { value: "exploration", label: "Exploration" },
    startDate: project?.startDate || "",
    endDate: project?.endDate || "",
    budget: project?.budget || "",
    currency: project?.currency ? { 
      value: project.currency, 
      label: project.currency 
    } : { value: "USD", label: "USD" },
    client: project?.client || "",
    operator: project?.operator || "",
    tags: project?.tags || []
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle dropdown change
  const handleDropdownChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Status options
  const statusOptions = [
    { value: "planning", label: "Planning", icon: "Calendar" },
    { value: "active", label: "Active", icon: "Activity" },
    { value: "completed", label: "Completed", icon: "CheckCircle" },
    { value: "archived", label: "Archived", icon: "Archive" }
  ];

  // Project type options
  const typeOptions = [
    { value: "exploration", label: "Exploration", icon: "Search" },
    { value: "development", label: "Development", icon: "Layers" },
    { value: "production", label: "Production", icon: "BarChart3" },
    { value: "abandonment", label: "Abandonment", icon: "XCircle" },
    { value: "research", label: "Research", icon: "Flask" }
  ];

  // Currency options
  const currencyOptions = [
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
    { value: "GBP", label: "GBP" },
    { value: "CAD", label: "CAD" },
    { value: "AUD", label: "AUD" },
    { value: "NOK", label: "NOK" },
    { value: "SAR", label: "SAR" }
  ];

  // Tag options
  const tagOptions = [
    { value: "offshore", label: "Offshore" },
    { value: "onshore", label: "Onshore" },
    { value: "deepwater", label: "Deepwater" },
    { value: "shallow", label: "Shallow Water" },
    { value: "conventional", label: "Conventional" },
    { value: "unconventional", label: "Unconventional" },
    { value: "shale", label: "Shale" },
    { value: "gas", label: "Gas" },
    { value: "oil", label: "Oil" },
    { value: "high-pressure", label: "High Pressure" },
    { value: "high-temperature", label: "High Temperature" }
  ];

  return (
    <div>
      {/* Section title */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-neutral-900">
          {isCreating ? "Create New Project" : "Edit Project Details"}
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          {isCreating 
            ? "Enter the basic information to set up your new project." 
            : "Update the project details and metadata."}
        </p>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="bg-neutral-50 p-4 rounded-md">
          <h3 className="text-md font-medium text-neutral-900 mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Project Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter project name"
              required
            />
            <Dropdown
              label="Project Status"
              options={statusOptions}
              value={formData.status}
              onChange={(value) => handleDropdownChange("status", value)}
              required
            />
            <div className="md:col-span-2">
              <Input
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter project description"
              />
            </div>
            <Dropdown
              label="Project Type"
              options={typeOptions}
              value={formData.type}
              onChange={(value) => handleDropdownChange("type", value)}
            />
            <Dropdown
              label="Tags"
              options={tagOptions}
              value={formData.tags}
              onChange={(value) => handleDropdownChange("tags", value)}
              multiple
              searchable
            />
          </div>
        </div>

        {/* Timeline and Budget */}
        <div className="bg-neutral-50 p-4 rounded-md">
          <h3 className="text-md font-medium text-neutral-900 mb-4">Timeline and Budget</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Start Date"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleInputChange}
            />
            <Input
              label="End Date"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleInputChange}
            />
            <div className="flex space-x-4">
              <div className="flex-1">
                <Input
                  label="Budget"
                  name="budget"
                  type="number"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="Enter budget amount"
                />
              </div>
              <div className="w-24">
                <Dropdown
                  label="Currency"
                  options={currencyOptions}
                  value={formData.currency}
                  onChange={(value) => handleDropdownChange("currency", value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Organization */}
        <div className="bg-neutral-50 p-4 rounded-md">
          <h3 className="text-md font-medium text-neutral-900 mb-4">Organization</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Client"
              name="client"
              value={formData.client}
              onChange={handleInputChange}
              placeholder="Enter client name"
            />
            <Input
              label="Operator"
              name="operator"
              value={formData.operator}
              onChange={handleInputChange}
              placeholder="Enter operator name"
            />
          </div>
        </div>

        {/* Action buttons (only show when not in wizard mode) */}
        {!isCreating && (
          <div className="flex justify-end space-x-3">
            <Button variant="tertiary">
              Cancel
            </Button>
            <Button variant="primary" icon="Save">
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* Wizard progress indicator */}
      {isCreating && (
        <div className="mt-8 pt-6 border-t border-neutral-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center relative">
                <div className="rounded-full h-8 w-8 flex items-center justify-center bg-primary-600 text-white">
                  1
                </div>
                <div className="ml-2 text-sm font-medium text-primary-600">Project Details</div>
              </div>
              <div className="flex-grow mx-4 h-0.5 bg-primary-600"></div>
              <div className="flex items-center relative">
                <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
                  wizardStep >= 2 ? "bg-primary-600 text-white" : "bg-neutral-200 text-neutral-500"
                }`}>
                  2
                </div>
                <div className={`ml-2 text-sm font-medium ${
                  wizardStep >= 2 ? "text-primary-600" : "text-neutral-500"
                }`}>Team Management</div>
              </div>
              <div className={`flex-grow mx-4 h-0.5 ${
                wizardStep >= 2 ? "bg-primary-600" : "bg-neutral-200"
              }`}></div>
              <div className="flex items-center relative">
                <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
                  wizardStep >= 3 ? "bg-primary-600 text-white" : "bg-neutral-200 text-neutral-500"
                }`}>
                  3
                </div>
                <div className={`ml-2 text-sm font-medium ${
                  wizardStep >= 3 ? "text-primary-600" : "text-neutral-500"
                }`}>Plugins</div>
              </div>
              <div className={`flex-grow mx-4 h-0.5 ${
                wizardStep >= 3 ? "bg-primary-600" : "bg-neutral-200"
              }`}></div>
              <div className="flex items-center relative">
                <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
                  wizardStep >= 4 ? "bg-primary-600 text-white" : "bg-neutral-200 text-neutral-500"
                }`}>
                  4
                </div>
                <div className={`ml-2 text-sm font-medium ${
                  wizardStep >= 4 ? "text-primary-600" : "text-neutral-500"
                }`}>Location</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;