import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";
import Dropdown from "../../../components/ui/Dropdown";

const BulkImport = ({ project }) => {
  const [file, setFile] = useState(null);
  const [importType, setImportType] = useState({ value: "wells", label: "Wells" });
  const [mappingFields, setMappingFields] = useState({});
  const [previewData, setPreviewData] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const [importStep, setImportStep] = useState(1);

  // Import type options
  const importTypeOptions = [
    { value: "wells", label: "Wells", icon: "Database" },
    { value: "logs", label: "Well Logs", icon: "LineChart" },
    { value: "production", label: "Production Data", icon: "BarChart3" },
    { value: "surveys", label: "Well Surveys", icon: "Route" }
  ];

  // Mock field mapping options
  const fieldMappingOptions = {
    wells: [
      { value: "name", label: "Well Name", required: true },
      { value: "uwi", label: "UWI/API", required: true },
      { value: "latitude", label: "Latitude", required: true },
      { value: "longitude", label: "Longitude", required: true },
      { value: "elevation", label: "Elevation", required: false },
      { value: "total_depth", label: "Total Depth", required: false },
      { value: "spud_date", label: "Spud Date", required: false },
      { value: "completion_date", label: "Completion Date", required: false },
      { value: "status", label: "Well Status", required: false },
      { value: "type", label: "Well Type", required: false }
    ],
    logs: [
      { value: "uwi", label: "UWI/API", required: true },
      { value: "log_name", label: "Log Name", required: true },
      { value: "log_date", label: "Log Date", required: false },
      { value: "top_depth", label: "Top Depth", required: true },
      { value: "bottom_depth", label: "Bottom Depth", required: true },
      { value: "step", label: "Step", required: false },
      { value: "unit", label: "Unit", required: false }
    ],
    production: [
      { value: "uwi", label: "UWI/API", required: true },
      { value: "date", label: "Production Date", required: true },
      { value: "oil", label: "Oil Production", required: false },
      { value: "gas", label: "Gas Production", required: false },
      { value: "water", label: "Water Production", required: false },
      { value: "days", label: "Days On", required: false }
    ],
    surveys: [
      { value: "uwi", label: "UWI/API", required: true },
      { value: "md", label: "Measured Depth", required: true },
      { value: "inclination", label: "Inclination", required: true },
      { value: "azimuth", label: "Azimuth", required: true },
      { value: "tvd", label: "TVD", required: false },
      { value: "north", label: "North/South", required: false },
      { value: "east", label: "East/West", required: false }
    ]
  };

  // Mock CSV header options based on file
  const mockFileHeaders = [
    { value: "column1", label: "Well Name" },
    { value: "column2", label: "API Number" },
    { value: "column3", label: "Latitude" },
    { value: "column4", label: "Longitude" },
    { value: "column5", label: "KB Elevation" },
    { value: "column6", label: "Total Depth" },
    { value: "column7", label: "Spud Date" },
    { value: "column8", label: "Completion Date" },
    { value: "column9", label: "Status" },
    { value: "column10", label: "Well Type" }
  ];

  // Mock preview data
  const mockPreviewData = {
    headers: ["Well Name", "API Number", "Latitude", "Longitude", "KB Elevation", "Total Depth", "Spud Date", "Completion Date", "Status", "Well Type"],
    rows: [
      ["Well A-1", "42-123-45678", "29.7604", "-95.3698", "50", "10500", "2023-01-15", "2023-03-20", "Producing", "Development"],
      ["Well B-2", "42-123-45679", "29.7605", "-95.3699", "52", "10200", "2023-02-10", "2023-04-15", "Producing", "Development"],
      ["Well C-3", "42-123-45680", "29.7606", "-95.3700", "48", "10800", "2023-03-05", "2023-05-10", "Drilling", "Exploration"],
      ["Well D-4", "42-123-45681", "29.7607", "-95.3701", "51", "10300", "2023-04-20", "2023-06-25", "Completed", "Development"],
      ["Well E-5", "42-123-45682", "29.7608", "-95.3702", "49", "11000", "2023-05-15", "2023-07-20", "Producing", "Development"]
    ]
  };

  // Mock validation errors
  const mockValidationErrors = [
    { row: 3, column: "Latitude", message: "Invalid latitude value" },
    { row: 4, column: "API Number", message: "API number format is incorrect" },
    { row: 5, column: "Spud Date", message: "Date format should be YYYY-MM-DD" }
  ];

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // In a real app, you would parse the file here
      // For now, we'll just set mock preview data
      setPreviewData(mockPreviewData);
      setValidationErrors([]);
    }
  };

  // Handle import type change
  const handleImportTypeChange = (value) => {
    setImportType(value);
    setMappingFields({});
  };

  // Handle field mapping change
  const handleFieldMappingChange = (fieldName, value) => {
    setMappingFields({
      ...mappingFields,
      [fieldName]: value
    });
  };

  // Handle validation
  const handleValidate = () => {
    // In a real app, you would validate the data here
    // For now, we'll just set mock validation errors
    setValidationErrors(mockValidationErrors);
    setImportStep(2);
  };

  // Handle import
  const handleImport = () => {
    // In a real app, you would import the data here
    alert("Import successful! 5 wells were imported.");
    setFile(null);
    setPreviewData(null);
    setValidationErrors([]);
    setMappingFields({});
    setImportStep(1);
  };

  // Reset the form
  const handleReset = () => {
    setFile(null);
    setPreviewData(null);
    setValidationErrors([]);
    setMappingFields({});
    setImportStep(1);
  };

  return (
    <div>
      {/* Section title */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-neutral-900">Bulk Import</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Import multiple wells or data from CSV/Excel files with validation.
        </p>
      </div>

      {/* Import steps */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center relative">
              <div className="rounded-full h-8 w-8 flex items-center justify-center bg-primary-600 text-white">
                1
              </div>
              <div className="ml-2 text-sm font-medium text-primary-600">Upload File</div>
            </div>
            <div className={`flex-grow mx-4 h-0.5 ${
              importStep >= 2 ? "bg-primary-600" : "bg-neutral-200"
            }`}></div>
            <div className="flex items-center relative">
              <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
                importStep >= 2 ? "bg-primary-600 text-white" : "bg-neutral-200 text-neutral-500"
              }`}>
                2
              </div>
              <div className={`ml-2 text-sm font-medium ${
                importStep >= 2 ? "text-primary-600" : "text-neutral-500"
              }`}>Map Fields</div>
            </div>
            <div className={`flex-grow mx-4 h-0.5 ${
              importStep >= 3 ? "bg-primary-600" : "bg-neutral-200"
            }`}></div>
            <div className="flex items-center relative">
              <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
                importStep >= 3 ? "bg-primary-600 text-white" : "bg-neutral-200 text-neutral-500"
              }`}>
                3
              </div>
              <div className={`ml-2 text-sm font-medium ${
                importStep >= 3 ? "text-primary-600" : "text-neutral-500"
              }`}>Import</div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 1: Upload File */}
      {importStep === 1 && (
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm p-6">
          <div className="mb-6">
            <Dropdown
              label="Import Type"
              options={importTypeOptions}
              value={importType}
              onChange={handleImportTypeChange}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Upload File
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Icon name="Upload" size={36} className="mx-auto text-neutral-400" />
                <div className="flex text-sm text-neutral-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-neutral-500">
                  CSV, Excel files up to 10MB
                </p>
              </div>
            </div>
          </div>

          {file && (
            <div className="mb-6">
              <div className="flex items-center p-4 bg-neutral-50 rounded-md">
                <Icon name="FileText" size={24} className="text-neutral-500 mr-3" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-900">{file.name}</p>
                  <p className="text-xs text-neutral-500">
                    {(file.size / 1024).toFixed(2)} KB • {new Date().toLocaleDateString()}
                  </p>
                </div>
                <Button
                  variant="tertiary"
                  icon="X"
                  size="sm"
                  onClick={handleReset}
                >
                  Remove
                </Button>
              </div>
            </div>
          )}

          {previewData && (
            <div className="mb-6">
              <h3 className="text-md font-medium text-neutral-900 mb-2">Preview</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-200">
                  <thead className="bg-neutral-50">
                    <tr>
                      {previewData.headers.map((header, index) => (
                        <th
                          key={index}
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-neutral-200">
                    {previewData.rows.slice(0, 3).map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-neutral-500 mt-2">
                Showing 3 of {previewData.rows.length} rows
              </p>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              variant="primary"
              onClick={handleValidate}
              disabled={!file}
            >
              Continue to Field Mapping
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Map Fields */}
      {importStep === 2 && (
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm p-6">
          <h3 className="text-md font-medium text-neutral-900 mb-4">Map Fields</h3>
          <p className="text-sm text-neutral-600 mb-4">
            Map the columns in your file to the required fields for {importType.label.toLowerCase()}.
          </p>

          <div className="space-y-4 mb-6">
            {fieldMappingOptions[importType.value].map((field) => (
              <div key={field.value} className="grid grid-cols-3 gap-4 items-center">
                <div>
                  <label className="block text-sm font-medium text-neutral-700">
                    {field.label}
                    {field.required && <span className="text-error-500 ml-1">*</span>}
                  </label>
                </div>
                <div className="col-span-2">
                  <Dropdown
                    options={mockFileHeaders}
                    value={mappingFields[field.value]}
                    onChange={(value) => handleFieldMappingChange(field.value, value)}
                    placeholder="Select column"
                  />
                </div>
              </div>
            ))}
          </div>

          {validationErrors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-md font-medium text-neutral-900 mb-2">Validation Issues</h3>
              <div className="bg-error-50 border border-error-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Icon name="AlertTriangle" className="h-5 w-5 text-error-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-error-800">
                      There are {validationErrors.length} issues with your data
                    </h3>
                    <div className="mt-2 text-sm text-error-700">
                      <ul className="list-disc pl-5 space-y-1">
                        {validationErrors.map((error, index) => (
                          <li key={index}>
                            Row {error.row}: {error.message} in column "{error.column}"
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <Button
              variant="tertiary"
              onClick={() => setImportStep(1)}
            >
              Back
            </Button>
            <Button
              variant="primary"
              onClick={() => setImportStep(3)}
              disabled={Object.keys(mappingFields).length < fieldMappingOptions[importType.value].filter(f => f.required).length}
            >
              Validate and Continue
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Import */}
      {importStep === 3 && (
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm p-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-success-100 text-success-600 mb-4">
              <Icon name="Check" size={24} />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">Ready to Import</h3>
            <p className="text-neutral-600">
              You're about to import {previewData.rows.length} {importType.value} into your project.
            </p>
          </div>

          <div className="bg-neutral-50 rounded-md p-4 mb-6">
            <h4 className="text-sm font-medium text-neutral-900 mb-2">Import Summary</h4>
            <ul className="space-y-2">
              <li className="flex justify-between text-sm">
                <span className="text-neutral-500">File:</span>
                <span className="text-neutral-900 font-medium">{file.name}</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-neutral-500">Type:</span>
                <span className="text-neutral-900 font-medium">{importType.label}</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-neutral-500">Total Records:</span>
                <span className="text-neutral-900 font-medium">{previewData.rows.length}</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-neutral-500">Valid Records:</span>
                <span className="text-neutral-900 font-medium">{previewData.rows.length - validationErrors.length}</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-neutral-500">Issues:</span>
                <span className="text-error-600 font-medium">{validationErrors.length}</span>
              </li>
            </ul>
          </div>

          <div className="flex justify-between">
            <Button
              variant="tertiary"
              onClick={() => setImportStep(2)}
            >
              Back
            </Button>
            <div className="space-x-3">
              <Button
                variant="secondary"
                onClick={handleReset}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                icon="Upload"
                onClick={handleImport}
              >
                Import Data
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkImport;