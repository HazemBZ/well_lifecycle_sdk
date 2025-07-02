import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Dropdown from "../../../components/ui/Dropdown";

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [fileFormat, setFileFormat] = useState(null);
  
  // File format options
  const formatOptions = [
    { value: "csv", label: "CSV" },
    { value: "excel", label: "Excel" },
    { value: "witsml", label: "WITSML" },
    { value: "json", label: "JSON" },
    { value: "las", label: "LAS" },
  ];
  
  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Auto-detect file format from extension
      const extension = file.name.split('.').pop().toLowerCase();
      
      switch (extension) {
        case 'csv':
          setFileFormat(formatOptions[0]);
          break;
        case 'xls': case'xlsx':
          setFileFormat(formatOptions[1]);
          break;
        case 'xml':
          setFileFormat(formatOptions[2]);
          break;
        case 'json':
          setFileFormat(formatOptions[3]);
          break;
        case 'las':
          setFileFormat(formatOptions[4]);
          break;
        default:
          setFileFormat(null);
      }
    }
  };
  
  // Handle file upload
  const handleUpload = () => {
    if (!selectedFile || !fileFormat) return;
    
    setIsUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
      }
    }, 300);
  };
  
  // Handle file format change
  const handleFormatChange = (format) => {
    setFileFormat(format);
  };
  
  // Reset the uploader
  const handleReset = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setFileFormat(null);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center">
          {!selectedFile ? (
            <div className="space-y-3">
              <Icon name="Upload" size={36} className="mx-auto text-neutral-400" />
              <div className="text-sm text-neutral-600">
                <p className="font-medium">Drag and drop your file here</p>
                <p>or</p>
              </div>
              <div>
                <label htmlFor="file-upload" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 cursor-pointer">
                  <Icon name="File" size={16} className="mr-2" />
                  Browse Files
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                  accept=".csv,.xls,.xlsx,.xml,.json,.las"
                />
              </div>
              <p className="text-xs text-neutral-500">
                Supported formats: CSV, Excel, WITSML, JSON, LAS
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <Icon 
                  name={
                    fileFormat?.value === "csv" ? "FileText" :
                    fileFormat?.value === "excel" ? "FileSpreadsheet" :
                    fileFormat?.value === "witsml" ? "FileCode" :
                    fileFormat?.value === "json" ? "FileJson" :
                    fileFormat?.value === "las"? "FileDigit" : "File"
                  } 
                  size={36} 
                  className="text-primary-600" 
                />
              </div>
              <div>
                <p className="font-medium text-neutral-900">{selectedFile.name}</p>
                <p className="text-sm text-neutral-500">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
              {isUploading && (
                <div className="w-full bg-neutral-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary-600 h-2.5 rounded-full" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}
              <div className="flex justify-center space-x-3">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  icon="X" 
                  onClick={handleReset}
                >
                  Remove
                </Button>
                {uploadProgress < 100 && !isUploading && (
                  <Button 
                    variant="primary" 
                    size="sm" 
                    icon="Upload" 
                    onClick={handleUpload}
                  >
                    Upload
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Dropdown
              label="File Format"
              options={formatOptions}
              value={fileFormat}
              onChange={handleFormatChange}
              placeholder="Select format"
              disabled={!selectedFile}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Well Name
            </label>
            <input
              type="text"
              className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="Enter well name"
              disabled={!selectedFile}
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Import Options
          </label>
          <div className="space-y-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                defaultChecked
              />
              <span className="ml-2 text-sm text-neutral-700">Validate survey data</span>
            </label>
            <div className="block">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-neutral-700">Auto-calculate missing values</span>
              </label>
            </div>
            <div className="block">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                />
                <span className="ml-2 text-sm text-neutral-700">Replace existing data</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-neutral-50 p-4 rounded-md border border-neutral-200">
        <h3 className="text-sm font-medium text-neutral-900 mb-2">File Format Guidelines</h3>
        <p className="text-xs text-neutral-600 mb-2">
          For best results, ensure your file follows these guidelines:
        </p>
        <ul className="text-xs text-neutral-600 space-y-1 list-disc pl-5">
          <li>CSV files should have headers in the first row</li>
          <li>Required columns: MD, Inclination, Azimuth</li>
          <li>Optional columns: TVD, N/S, E/W, DLS, Date</li>
          <li>Units should be consistent (feet or meters)</li>
          <li>Angles should be in degrees</li>
        </ul>
      </div>
    </div>
  );
};

export default FileUploader;