import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import InputWithUnit from "../../../components/ui/InputWithUnit";
import Icon from "../../../components/AppIcon";
import Switch from "./Switch";

const SDKConfiguration = () => {
  const [configSaved, setConfigSaved] = useState(false);
  const [configForm, setConfigForm] = useState({
    apiEndpoint: "https://api.petrodigital.com/v2",
    authMethod: "oauth2",
    storageLocation: "/data/petrodigital/storage",
    maxFileSize: "500",
    maxConcurrentRequests: "50",
    logLevel: "info",
    enableCaching: true,
    cacheTTL: "3600",
    enableMetrics: true,
    metricsInterval: "60",
    enableAutoUpdate: true,
    updateChannel: "stable",
    debugMode: false,
    timeoutDuration: "30"
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConfigForm(prev => ({ ...prev, [name]: value }));
    setConfigSaved(false);
  };

  // Handle toggle changes
  const handleToggleChange = (name) => {
    setConfigForm(prev => ({ ...prev, [name]: !prev[name] }));
    setConfigSaved(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate saving
    setTimeout(() => {
      setConfigSaved(true);
      // Reset saved status after 3 seconds
      setTimeout(() => setConfigSaved(false), 3000);
    }, 1000);
  };

  // Reset to defaults
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all settings to default values?")) {
      setConfigForm({
        apiEndpoint: "https://api.petrodigital.com/v2",
        authMethod: "oauth2",
        storageLocation: "/data/petrodigital/storage",
        maxFileSize: "500",
        maxConcurrentRequests: "50",
        logLevel: "info",
        enableCaching: true,
        cacheTTL: "3600",
        enableMetrics: true,
        metricsInterval: "60",
        enableAutoUpdate: true,
        updateChannel: "stable",
        debugMode: false,
        timeoutDuration: "30"
      });
      setConfigSaved(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-neutral-900 mb-2">SDK Configuration</h2>
        <p className="text-sm text-neutral-500">
          Configure system-wide settings for the SDK and plugin infrastructure
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-6">
            <div className="bg-neutral-50 p-5 rounded-lg border border-neutral-200">
              <h3 className="text-md font-medium text-neutral-900 mb-4">API & Authentication</h3>
              
              <div className="space-y-4">
                <Input
                  label="API Endpoint"
                  name="apiEndpoint"
                  value={configForm.apiEndpoint}
                  onChange={handleInputChange}
                  placeholder="https://api.example.com/v1"
                  required
                />
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-neutral-700">
                    Authentication Method
                  </label>
                  <div className="mt-1">
                    <select
                      name="authMethod"
                      value={configForm.authMethod}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    >
                      <option value="oauth2">OAuth 2.0</option>
                      <option value="jwt">JWT</option>
                      <option value="apikey">API Key</option>
                      <option value="basic">Basic Auth</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-700">Debug Mode</span>
                  <Switch 
                    checked={configForm.debugMode} 
                    onChange={() => handleToggleChange('debugMode')} 
                  />
                </div>
                
                <InputWithUnit
                  label="Request Timeout"
                  name="timeoutDuration"
                  value={configForm.timeoutDuration}
                  onChange={handleInputChange}
                  type="number"
                  unit="seconds"
                  min="1"
                  max="300"
                />
              </div>
            </div>
            
            <div className="bg-neutral-50 p-5 rounded-lg border border-neutral-200">
              <h3 className="text-md font-medium text-neutral-900 mb-4">Storage & Files</h3>
              
              <div className="space-y-4">
                <Input
                  label="Storage Location"
                  name="storageLocation"
                  value={configForm.storageLocation}
                  onChange={handleInputChange}
                  placeholder="/path/to/storage"
                />
                
                <InputWithUnit
                  label="Maximum File Size"
                  name="maxFileSize"
                  value={configForm.maxFileSize}
                  onChange={handleInputChange}
                  type="number"
                  unit="MB"
                  min="1"
                />
              </div>
            </div>
            
            <div className="bg-neutral-50 p-5 rounded-lg border border-neutral-200">
              <h3 className="text-md font-medium text-neutral-900 mb-4">Updates & Maintenance</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-700">Enable Auto Updates</span>
                  <Switch 
                    checked={configForm.enableAutoUpdate} 
                    onChange={() => handleToggleChange('enableAutoUpdate')} 
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-neutral-700">
                    Update Channel
                  </label>
                  <div className="mt-1">
                    <select
                      name="updateChannel"
                      value={configForm.updateChannel}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                      disabled={!configForm.enableAutoUpdate}
                    >
                      <option value="stable">Stable</option>
                      <option value="beta">Beta</option>
                      <option value="alpha">Alpha (Development)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-neutral-50 p-5 rounded-lg border border-neutral-200">
              <h3 className="text-md font-medium text-neutral-900 mb-4">Performance & Caching</h3>
              
              <div className="space-y-4">
                <InputWithUnit
                  label="Max Concurrent Requests"
                  name="maxConcurrentRequests"
                  value={configForm.maxConcurrentRequests}
                  onChange={handleInputChange}
                  type="number"
                  min="1"
                  max="1000"
                />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-700">Enable Caching</span>
                  <Switch 
                    checked={configForm.enableCaching} 
                    onChange={() => handleToggleChange('enableCaching')} 
                  />
                </div>
                
                <InputWithUnit
                  label="Cache TTL"
                  name="cacheTTL"
                  value={configForm.cacheTTL}
                  onChange={handleInputChange}
                  type="number"
                  unit="seconds"
                  min="0"
                  disabled={!configForm.enableCaching}
                />
              </div>
            </div>
            
            <div className="bg-neutral-50 p-5 rounded-lg border border-neutral-200">
              <h3 className="text-md font-medium text-neutral-900 mb-4">Logging & Monitoring</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-neutral-700">
                    Log Level
                  </label>
                  <div className="mt-1">
                    <select
                      name="logLevel"
                      value={configForm.logLevel}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    >
                      <option value="error">Error</option>
                      <option value="warn">Warning</option>
                      <option value="info">Info</option>
                      <option value="debug">Debug</option>
                      <option value="trace">Trace</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-700">Enable Metrics Collection</span>
                  <Switch 
                    checked={configForm.enableMetrics} 
                    onChange={() => handleToggleChange('enableMetrics')} 
                  />
                </div>
                
                <InputWithUnit
                  label="Metrics Collection Interval"
                  name="metricsInterval"
                  value={configForm.metricsInterval}
                  onChange={handleInputChange}
                  type="number"
                  unit="seconds"
                  min="10"
                  disabled={!configForm.enableMetrics}
                />
              </div>
            </div>
            
            <div className="bg-neutral-50 p-5 rounded-lg border border-neutral-200">
              <h3 className="text-md font-medium text-neutral-900 mb-4">Advanced Settings</h3>
              
              <div className="space-y-4">
                <p className="text-sm text-neutral-600">
                  Advanced settings should only be modified by system administrators with a thorough understanding of the SDK architecture.
                </p>
                
                <Button 
                  variant="secondary" 
                  icon="FileText" 
                  type="button"
                  fullWidth
                >
                  Export Configuration
                </Button>
                
                <Button 
                  variant="secondary" 
                  icon="Upload" 
                  type="button"
                  fullWidth
                >
                  Import Configuration
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center border-t border-neutral-200 pt-6">
          {configSaved && (
            <div className="flex items-center text-success-600">
              <Icon name="CheckCircle" size={16} className="mr-1" />
              <span className="text-sm font-medium">Configuration saved successfully</span>
            </div>
          )}
          
          <div className="flex space-x-3 ml-auto">
            <Button 
              variant="secondary" 
              icon="RotateCcw" 
              type="button"
              onClick={handleReset}
            >
              Reset to Defaults
            </Button>
            <Button 
              variant="primary" 
              icon="Save" 
              type="submit"
            >
              Save Configuration
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SDKConfiguration;