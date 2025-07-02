import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Switch from "./Switch";

const InstalledPlugins = ({ searchQuery }) => {
  const [installedPlugins, setInstalledPlugins] = useState([
    {
      id: "well-log-viewer",
      name: "Well Log Viewer",
      description: "Advanced visualization tool for well log data with interactive tracks and curve management",
      version: "2.3.1",
      author: "PetroDigital Core Team",
      status: "active",
      lastUpdated: "2023-11-15",
      category: "Visualization",
      dependencies: ["core-sdk", "data-connector"],
      usageMetrics: {
        activeUsers: 128,
        apiCalls: 5840,
        averageResponseTime: 120
      }
    },
    {
      id: "drilling-analytics",
      name: "Drilling Analytics",
      description: "Real-time drilling data analysis with predictive algorithms for drilling optimization",
      version: "1.8.0",
      author: "DrillTech Solutions",
      status: "active",
      lastUpdated: "2023-10-22",
      category: "Analytics",
      dependencies: ["core-sdk", "data-connector", "time-series-engine"],
      usageMetrics: {
        activeUsers: 87,
        apiCalls: 3250,
        averageResponseTime: 180
      }
    },
    {
      id: "production-forecasting",
      name: "Production Forecasting",
      description: "Decline curve analysis and production forecasting tools with multiple model support",
      version: "3.1.2",
      author: "ReservoirSim Inc.",
      status: "active",
      lastUpdated: "2023-12-05",
      category: "Modeling",
      dependencies: ["core-sdk", "data-connector", "numerical-solver"],
      usageMetrics: {
        activeUsers: 64,
        apiCalls: 2180,
        averageResponseTime: 210
      }
    },
    {
      id: "geological-mapper",
      name: "Geological Mapper",
      description: "Geological mapping and cross-section generation with formation correlation",
      version: "2.0.4",
      author: "GeoScience Tools",
      status: "inactive",
      lastUpdated: "2023-09-18",
      category: "Geology",
      dependencies: ["core-sdk", "data-connector", "spatial-engine"],
      usageMetrics: {
        activeUsers: 42,
        apiCalls: 1560,
        averageResponseTime: 250
      }
    },
    {
      id: "petrophysical-analyzer",
      name: "Petrophysical Analyzer",
      description: "Comprehensive petrophysical analysis suite with multi-mineral solver and uncertainty quantification",
      version: "1.5.3",
      author: "PetroPhysics Ltd.",
      status: "active",
      lastUpdated: "2023-11-30",
      category: "Petrophysics",
      dependencies: ["core-sdk", "data-connector", "numerical-solver"],
      usageMetrics: {
        activeUsers: 56,
        apiCalls: 2840,
        averageResponseTime: 190
      }
    }
  ]);

  // Filter plugins based on search query
  const filteredPlugins = installedPlugins.filter(plugin => 
    plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plugin.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plugin.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plugin.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle plugin status
  const togglePluginStatus = (id) => {
    setInstalledPlugins(plugins => 
      plugins.map(plugin => 
        plugin.id === id 
          ? { ...plugin, status: plugin.status === 'active' ? 'inactive' : 'active' } 
          : plugin
      )
    );
  };

  // Uninstall plugin
  const uninstallPlugin = (id) => {
    if (window.confirm("Are you sure you want to uninstall this plugin? This action cannot be undone.")) {
      setInstalledPlugins(plugins => plugins.filter(plugin => plugin.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-neutral-900 mb-2">Installed Plugins</h2>
        <p className="text-sm text-neutral-500">
          Manage your installed plugins, update versions, and configure settings
        </p>
      </div>

      {filteredPlugins.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="PackageX" size={48} className="mx-auto text-neutral-400 mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-1">No plugins found</h3>
          <p className="text-sm text-neutral-500 mb-4">
            No plugins match your search criteria. Try adjusting your search.
          </p>
          <Button variant="primary" icon="RefreshCw">
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPlugins.map((plugin) => (
            <div 
              key={plugin.id} 
              className="border border-neutral-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-medium text-neutral-900 mr-3">{plugin.name}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        plugin.status === 'active' ?'bg-success-500 bg-opacity-10 text-success-600' :'bg-neutral-100 text-neutral-600'
                      }`}>
                        {plugin.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 mb-4">{plugin.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-neutral-500">Version</p>
                        <p className="text-sm font-medium text-neutral-700">{plugin.version}</p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500">Author</p>
                        <p className="text-sm font-medium text-neutral-700">{plugin.author}</p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500">Last Updated</p>
                        <p className="text-sm font-medium text-neutral-700">{plugin.lastUpdated}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-xs text-neutral-500 mb-1">Dependencies</p>
                      <div className="flex flex-wrap gap-2">
                        {plugin.dependencies.map((dep, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700"
                          >
                            {dep}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-neutral-500">Active Users</p>
                        <p className="text-sm font-medium text-neutral-700">{plugin.usageMetrics.activeUsers}</p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500">API Calls (24h)</p>
                        <p className="text-sm font-medium text-neutral-700">{plugin.usageMetrics.apiCalls}</p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500">Avg. Response Time</p>
                        <p className="text-sm font-medium text-neutral-700">{plugin.usageMetrics.averageResponseTime}ms</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-end">
                    <div className="flex items-center mb-4">
                      <span className="text-sm text-neutral-700 mr-2">
                        {plugin.status === 'active' ? 'Enabled' : 'Disabled'}
                      </span>
                      <Switch 
                        checked={plugin.status === 'active'} 
                        onChange={() => togglePluginStatus(plugin.id)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Button 
                        variant="secondary" 
                        icon="Settings" 
                        size="sm" 
                        fullWidth
                      >
                        Configure
                      </Button>
                      <Button 
                        variant="secondary" 
                        icon="RefreshCw" 
                        size="sm" 
                        fullWidth
                      >
                        Update
                      </Button>
                      <Button 
                        variant="danger" 
                        icon="Trash2" 
                        size="sm" 
                        fullWidth
                        onClick={() => uninstallPlugin(plugin.id)}
                      >
                        Uninstall
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InstalledPlugins;