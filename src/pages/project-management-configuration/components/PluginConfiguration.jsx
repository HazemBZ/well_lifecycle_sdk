import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const PluginConfiguration = ({ project, isCreating, wizardStep }) => {
  // Initial plugin state based on project or defaults
  const [enabledPlugins, setEnabledPlugins] = useState(
    project?.plugins || ["Logs", "Drilling"]
  );

  // Mock plugins data
  const availablePlugins = [
    {
      id: "logs",
      name: "Logs",
      description: "Well log visualization and analysis tools for petrophysical interpretation.",
      icon: "LineChart",
      category: "Data Visualization",
      dependencies: [],
      version: "2.1.0"
    },
    {
      id: "drilling",
      name: "Drilling",
      description: "Drilling data management and real-time monitoring for drilling operations.",
      icon: "Drill",
      category: "Operations",
      dependencies: [],
      version: "1.8.5"
    },
    {
      id: "production",
      name: "Production",
      description: "Production data analysis, decline curves, and forecasting tools.",
      icon: "BarChart3",
      category: "Analysis",
      dependencies: [],
      version: "2.0.1"
    },
    {
      id: "geology",
      name: "Geology",
      description: "Geological interpretation, correlation, and mapping tools.",
      icon: "Mountain",
      category: "Interpretation",
      dependencies: [],
      version: "1.5.2"
    },
    {
      id: "petrophysics",
      name: "Petrophysics",
      description: "Advanced petrophysical analysis and interpretation tools.",
      icon: "Activity",
      category: "Analysis",
      dependencies: ["logs"],
      version: "1.3.7"
    },
    {
      id: "surveys",
      name: "Surveys",
      description: "Well trajectory and survey visualization tools.",
      icon: "Route",
      category: "Data Visualization",
      dependencies: [],
      version: "1.2.0"
    },
    {
      id: "mudlogging",
      name: "Mudlogging",
      description: "Mudlogging data capture and analysis tools.",
      icon: "Droplet",
      category: "Operations",
      dependencies: ["drilling"],
      version: "1.0.4"
    },
    {
      id: "economics",
      name: "Economics",
      description: "Economic analysis and forecasting tools for project evaluation.",
      icon: "DollarSign",
      category: "Analysis",
      dependencies: ["production"],
      version: "0.9.2"
    },
    {
      id: "reserves",
      name: "Reserves",
      description: "Reserves estimation and reporting tools.",
      icon: "Database",
      category: "Analysis",
      dependencies: ["production"],
      version: "0.8.5"
    }
  ];

  // Toggle plugin enabled state
  const togglePlugin = (pluginId) => {
    if (enabledPlugins.includes(pluginId)) {
      // Check if any dependent plugins would be affected
      const dependentPlugins = availablePlugins.filter(p => 
        p.dependencies.includes(pluginId) && enabledPlugins.includes(p.id)
      );
      
      if (dependentPlugins.length > 0) {
        // Show warning or handle dependencies
        alert(`Cannot disable this plugin as it is required by: ${dependentPlugins.map(p => p.name).join(', ')}`);
        return;
      }
      
      setEnabledPlugins(enabledPlugins.filter(id => id !== pluginId));
    } else {
      // Check if this plugin has dependencies that need to be enabled
      const plugin = availablePlugins.find(p => p.id === pluginId);
      const missingDependencies = plugin.dependencies.filter(dep => !enabledPlugins.includes(dep));
      
      if (missingDependencies.length > 0) {
        // Enable dependencies automatically
        const dependencyNames = missingDependencies.map(dep => 
          availablePlugins.find(p => p.id === dep).name
        ).join(', ');
        
        if (confirm(`This plugin requires: ${dependencyNames}. Enable them as well?`)) {
          setEnabledPlugins([...enabledPlugins, pluginId, ...missingDependencies]);
        }
        return;
      }
      
      setEnabledPlugins([...enabledPlugins, pluginId]);
    }
  };

  // Check if a plugin is enabled
  const isPluginEnabled = (pluginId) => {
    return enabledPlugins.includes(pluginId);
  };

  // Get plugin status badge
  const getPluginStatusBadge = (plugin) => {
    if (isPluginEnabled(plugin.id)) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-500 bg-opacity-10 text-success-600">
          <Icon name="Check" size={12} className="mr-1" />
          Enabled
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-200 text-neutral-600">
        <Icon name="X" size={12} className="mr-1" />
        Disabled
      </span>
    );
  };

  // Group plugins by category
  const pluginsByCategory = availablePlugins.reduce((acc, plugin) => {
    if (!acc[plugin.category]) {
      acc[plugin.category] = [];
    }
    acc[plugin.category].push(plugin);
    return acc;
  }, {});

  return (
    <div>
      {/* Section title */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-neutral-900">
          {isCreating ? "Configure Plugins" : "Plugin Configuration"}
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          Enable or disable specific modules for this project to customize its functionality.
        </p>
      </div>

      {/* Plugin configuration */}
      <div className="space-y-6">
        {Object.entries(pluginsByCategory).map(([category, plugins]) => (
          <div key={category} className="bg-neutral-50 p-4 rounded-md">
            <h3 className="text-md font-medium text-neutral-900 mb-4">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plugins.map((plugin) => (
                <div 
                  key={plugin.id}
                  className={`bg-white border rounded-lg overflow-hidden ${
                    isPluginEnabled(plugin.id) 
                      ? 'border-primary-300 shadow-sm' 
                      : 'border-neutral-200'
                  }`}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-md ${
                          isPluginEnabled(plugin.id) 
                            ? 'bg-primary-100 text-primary-600' :'bg-neutral-100 text-neutral-500'
                        }`}>
                          <Icon name={plugin.icon} size={20} />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-neutral-900">{plugin.name}</h4>
                          <p className="text-xs text-neutral-500">v{plugin.version}</p>
                        </div>
                      </div>
                      <div>
                        {getPluginStatusBadge(plugin)}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-neutral-600">{plugin.description}</p>
                    
                    {plugin.dependencies.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-neutral-500">
                          Dependencies: {plugin.dependencies.map(dep => {
                            const depPlugin = availablePlugins.find(p => p.id === dep);
                            return depPlugin ? depPlugin.name : dep;
                          }).join(', ')}
                        </p>
                      </div>
                    )}
                    
                    <div className="mt-3 pt-3 border-t border-neutral-100 flex justify-end">
                      <Button
                        variant={isPluginEnabled(plugin.id) ? "danger" : "primary"}
                        size="sm"
                        icon={isPluginEnabled(plugin.id) ? "X" : "Check"}
                        onClick={() => togglePlugin(plugin.id)}
                      >
                        {isPluginEnabled(plugin.id) ? "Disable" : "Enable"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
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
                <div className="rounded-full h-8 w-8 flex items-center justify-center bg-primary-600 text-white">
                  3
                </div>
                <div className="ml-2 text-sm font-medium text-primary-600">Plugins</div>
              </div>
              <div className={`flex-grow mx-4 h-0.5 ${
                wizardStep >= 4 ? "bg-primary-600" : "bg-neutral-200"
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

export default PluginConfiguration;