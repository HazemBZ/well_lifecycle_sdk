import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Dropdown from "../../../components/ui/Dropdown";

const DataImportPanel = ({ onClose }) => {
  const [importMethod, setImportMethod] = useState("file");
  const [fileFormat, setFileFormat] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [importProgress, setImportProgress] = useState(0);
  const [isImporting, setIsImporting] = useState(false);
  
  // Mock file formats
  const fileFormats = [
    { value: "witsml", label: "WITSML", icon: "FileCode" },
    { value: "csv", label: "CSV", icon: "FileText" },
    { value: "excel", label: "Excel", icon: "FileSpreadsheet" },
    { value: "las", label: "LAS", icon: "FileDigit" },
    { value: "json", label: "JSON", icon: "FileJson" },
  ];
  
  // Mock import methods
  const importMethods = [
    { value: "file", label: "File Upload" },
    { value: "url", label: "From URL" },
    { value: "api", label: "API Connection" },
  ];
  
  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  // Start import process
  const startImport = () => {
    if (!fileFormat || (importMethod === "file" && !selectedFile)) {
      return;
    }
    
    setIsImporting(true);
    setImportProgress(0);
    
    // Simulate import progress
    const interval = setInterval(() => {
      setImportProgress((prev) => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsImporting(false);
            onClose();
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };
  
  return (
    <div className="bg-white border-b border-neutral-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-neutral-900">Import Drilling Data</h3>
        <button
          className="text-neutral-500 hover:text-neutral-700"
          onClick={onClose}
        >
          <Icon name="X" size={20} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step 1: Select Import Method */}
        <div className="bg-neutral-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-neutral-900 mb-3">Step 1: Import Method</h4>
          <div className="space-y-2">
            {importMethods.map((method) => (
              <button
                key={method.value}
                className={`w-full text-left px-3 py-2 rounded-md ${
                  importMethod === method.value
                    ? 'bg-primary-100 text-primary-700 font-medium' :'bg-white text-neutral-700 hover:bg-neutral-100'
                }`}
                onClick={() => setImportMethod(method.value)}
              >
                {method.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Step 2: Select Format */}
        <div className="bg-neutral-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-neutral-900 mb-3">Step 2: Select Format</h4>
          <Dropdown
            options={fileFormats}
            value={fileFormat}
            onChange={setFileFormat}
            placeholder="Select File Format"
          />
          
          {fileFormat && (
            <div className="mt-4 text-sm text-neutral-600">
              <p className="font-medium">Format Details:</p>
              <ul className="mt-1 list-disc list-inside">
                <li>Supported version: {fileFormat.value === "witsml" ? "1.4.1, 2.0" : "All"}</li>
                <li>Encoding: UTF-8</li>
                {fileFormat.value === "csv" && <li>Delimiter: Comma or Tab</li>}
              </ul>
            </div>
          )}
        </div>
        
        {/* Step 3: Upload or Connect */}
        <div className="bg-neutral-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-neutral-900 mb-3">
            Step 3: {importMethod === "file" ? "Upload File" : importMethod === "url" ? "Enter URL" : "API Details"}
          </h4>
          
          {importMethod === "file" && (
            <div>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Icon name="Upload" size={24} className="mx-auto text-neutral-400" />
                  <div className="flex text-sm text-neutral-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-neutral-500">
                    {fileFormat ? `${fileFormat.label} files only` : "Select a format first"}
                  </p>
                </div>
              </div>
              
              {selectedFile && (
                <div className="mt-3 flex items-center text-sm text-neutral-600">
                  <Icon name="File" size={16} className="mr-2 text-neutral-500" />
                  {selectedFile.name}
                </div>
              )}
            </div>
          )}
          
          {importMethod === "url" && (
            <div>
              <label htmlFor="url-input" className="sr-only">URL</label>
              <input
                type="text"
                id="url-input"
                className="block w-full border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Enter URL to data source"
              />
              <p className="mt-2 text-xs text-neutral-500">
                Enter a valid URL to a {fileFormat?.label || "data"} file
              </p>
            </div>
          )}
          
          {importMethod === "api" && (
            <div className="space-y-3">
              <div>
                <label htmlFor="api-endpoint" className="block text-sm font-medium text-neutral-700">API Endpoint</label>
                <input
                  type="text"
                  id="api-endpoint"
                  className="mt-1 block w-full border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="https://api.example.com/data"
                />
              </div>
              <div>
                <label htmlFor="api-key" className="block text-sm font-medium text-neutral-700">API Key</label>
                <input
                  type="password"
                  id="api-key"
                  className="mt-1 block w-full border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Enter API key"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {isImporting && (
        <div className="mt-6">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-neutral-700">Importing...</span>
            <span className="text-sm font-medium text-neutral-700">{Math.round(importProgress)}%</span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2.5">
            <div 
              className="bg-primary-600 h-2.5 rounded-full" 
              style={{ width: `${importProgress}%` }}
            ></div>
          </div>
          <p className="mt-2 text-sm text-neutral-500">
            {importProgress < 30 ? "Validating data..." : 
             importProgress < 60 ? "Processing records..." : 
             importProgress < 90 ? "Mapping to database...": "Finalizing import..."}
          </p>
        </div>
      )}
      
      <div className="mt-6 flex justify-end space-x-3">
        <Button
          variant="secondary"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          icon="Upload"
          onClick={startImport}
          disabled={!fileFormat || (importMethod === "file" && !selectedFile) || isImporting}
          loading={isImporting}
        >
          {isImporting ? "Importing..." : "Start Import"}
        </Button>
      </div>
    </div>
  );
};

export default DataImportPanel;