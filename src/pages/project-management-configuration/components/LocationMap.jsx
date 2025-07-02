import React, { useState } from "react";
import Input from "../../../components/ui/Input";
import InputWithUnit from "../../../components/ui/InputWithUnit";
import InputNumber from "../../../components/ui/InputNumber";
import Dropdown from "../../../components/ui/Dropdown";
import Button from "../../../components/ui/Button";


const LocationMap = ({ project, isCreating, wizardStep }) => {
  // State for form fields
  const [formData, setFormData] = useState({
    latitude: project?.latitude || 29.7604,
    longitude: project?.longitude || -95.3698,
    elevation: project?.elevation || 50,
    elevationUnit: project?.elevationUnit || { value: "m", label: "m" },
    country: project?.country || { value: "USA", label: "United States" },
    region: project?.region || "Texas",
    basin: project?.basin || "Gulf Coast",
    field: project?.field || "Houston",
    wellType: project?.wellType || { value: "exploration", label: "Exploration" },
    waterDepth: project?.waterDepth || 0,
    waterDepthUnit: project?.waterDepthUnit || { value: "m", label: "m" },
    onshoreOffshore: project?.onshoreOffshore || { value: "onshore", label: "Onshore" }
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

  // Handle number input change
  const handleNumberChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: parseFloat(value)
    });
  };

  // Country options
  const countryOptions = [
    { value: "USA", label: "United States" },
    { value: "CAN", label: "Canada" },
    { value: "MEX", label: "Mexico" },
    { value: "BRA", label: "Brazil" },
    { value: "NOR", label: "Norway" },
    { value: "UK", label: "United Kingdom" },
    { value: "SAU", label: "Saudi Arabia" },
    { value: "UAE", label: "United Arab Emirates" },
    { value: "QAT", label: "Qatar" },
    { value: "AUS", label: "Australia" }
  ];

  // Well type options
  const wellTypeOptions = [
    { value: "exploration", label: "Exploration" },
    { value: "development", label: "Development" },
    { value: "appraisal", label: "Appraisal" },
    { value: "injection", label: "Injection" },
    { value: "production", label: "Production" }
  ];

  // Onshore/Offshore options
  const onshoreOffshoreOptions = [
    { value: "onshore", label: "Onshore" },
    { value: "offshore", label: "Offshore" },
    { value: "shallow", label: "Shallow Water" },
    { value: "deepwater", label: "Deepwater" }
  ];

  // Unit options
  const lengthUnitOptions = [
    { value: "m", label: "m" },
    { value: "ft", label: "ft" }
  ];

  return (
    <div>
      {/* Section title */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-neutral-900">
          {isCreating ? "Project Location" : "Edit Project Location"}
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          Set the geographical location and spatial information for this project.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map visualization */}
        <div className="lg:col-span-2 bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm">
          <div className="h-96">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title={formData.field || "Project Location"}
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${formData.latitude},${formData.longitude}&z=10&output=embed`}
            ></iframe>
          </div>
        </div>

        {/* Location form */}
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm p-4">
          <h3 className="text-md font-medium text-neutral-900 mb-4">Location Details</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InputNumber
                label="Latitude"
                name="latitude"
                value={formData.latitude}
                onChange={(e) => handleNumberChange("latitude", e.target.value)}
                min="-90"
                max="90"
                step="0.0001"
              />
              <InputNumber
                label="Longitude"
                name="longitude"
                value={formData.longitude}
                onChange={(e) => handleNumberChange("longitude", e.target.value)}
                min="-180"
                max="180"
                step="0.0001"
              />
            </div>
            
            <InputWithUnit
              label="Elevation"
              name="elevation"
              type="number"
              value={formData.elevation}
              onChange={(e) => handleNumberChange("elevation", e.target.value)}
              unit={formData.elevationUnit.value}
              units={["m", "ft"]}
              onUnitChange={(unit) => handleDropdownChange("elevationUnit", { value: unit, label: unit })}
            />
            
            <Dropdown
              label="Country"
              options={countryOptions}
              value={formData.country}
              onChange={(value) => handleDropdownChange("country", value)}
            />
            
            <Input
              label="Region/State"
              name="region"
              value={formData.region}
              onChange={handleInputChange}
              placeholder="Enter region or state"
            />
            
            <Input
              label="Basin"
              name="basin"
              value={formData.basin}
              onChange={handleInputChange}
              placeholder="Enter geological basin"
            />
            
            <Input
              label="Field"
              name="field"
              value={formData.field}
              onChange={handleInputChange}
              placeholder="Enter field name"
            />
            
            <Dropdown
              label="Well Type"
              options={wellTypeOptions}
              value={formData.wellType}
              onChange={(value) => handleDropdownChange("wellType", value)}
            />
            
            <Dropdown
              label="Environment"
              options={onshoreOffshoreOptions}
              value={formData.onshoreOffshore}
              onChange={(value) => handleDropdownChange("onshoreOffshore", value)}
            />
            
            {formData.onshoreOffshore.value !== "onshore" && (
              <InputWithUnit
                label="Water Depth"
                name="waterDepth"
                type="number"
                value={formData.waterDepth}
                onChange={(e) => handleNumberChange("waterDepth", e.target.value)}
                unit={formData.waterDepthUnit.value}
                units={["m", "ft"]}
                onUnitChange={(unit) => handleDropdownChange("waterDepthUnit", { value: unit, label: unit })}
              />
            )}
          </div>
        </div>
      </div>

      {/* Action buttons (only show when not in wizard mode) */}
      {!isCreating && (
        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="tertiary">
            Cancel
          </Button>
          <Button variant="primary" icon="Save">
            Save Changes
          </Button>
        </div>
      )}

      {/* Wizard progress indicator */}
      {isCreating && (
        <div className="mt-8 pt-6 border-t border-neutral-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center relative">
                <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
                  wizardStep >= 1 ? "bg-primary-600 text-white" : "bg-neutral-200 text-neutral-500"
                }`}>
                  1
                </div>
                <div className={`ml-2 text-sm font-medium ${
                  wizardStep >= 1 ? "text-primary-600" : "text-neutral-500"
                }`}>Project Details</div>
              </div>
              <div className={`flex-grow mx-4 h-0.5 ${
                wizardStep >= 2 ? "bg-primary-600" : "bg-neutral-200"
              }`}></div>
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
                wizardStep >= 3 ? "bg-primary-600" : "bg-neutral-200"
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
                wizardStep >= 4 ? "bg-primary-600" : "bg-neutral-200"
              }`}></div>
              <div className="flex items-center relative">
                <div className="rounded-full h-8 w-8 flex items-center justify-center bg-primary-600 text-white">
                  4
                </div>
                <div className="ml-2 text-sm font-medium text-primary-600">Location</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationMap;