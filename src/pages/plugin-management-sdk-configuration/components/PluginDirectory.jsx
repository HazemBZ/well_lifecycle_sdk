import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const PluginDirectory = ({ searchQuery }) => {
  const [availablePlugins, setAvailablePlugins] = useState([
    {
      id: "seismic-interpreter",
      name: "Seismic Interpreter",
      description: "Advanced seismic data interpretation with AI-assisted horizon picking and fault detection",
      version: "2.1.0",
      author: "GeoPhysics AI",
      category: "Geophysics",
      rating: 4.7,
      downloads: 1245,
      price: "Free",
      compatibility: "Compatible",
      dependencies: ["core-sdk", "data-connector", "numerical-solver"],
      lastUpdated: "2023-11-28"
    },
    {
      id: "reservoir-simulator",
      name: "Reservoir Simulator",
      description: "Fast and accurate reservoir simulation with multiple phase flow modeling and history matching",
      version: "3.2.1",
      author: "ReservoirSim Inc.",
      category: "Simulation",
      rating: 4.9,
      downloads: 2340,
      price: "Premium",
      compatibility: "Compatible",
      dependencies: ["core-sdk", "data-connector", "numerical-solver", "visualization-engine"],
      lastUpdated: "2023-12-10"
    },
    {
      id: "well-test-analyzer",
      name: "Well Test Analyzer",
      description: "Comprehensive well test analysis with pressure transient interpretation and rate transient analysis",
      version: "1.8.5",
      author: "PetroTest Solutions",
      category: "Testing",
      rating: 4.5,
      downloads: 980,
      price: "Free",
      compatibility: "Compatible",
      dependencies: ["core-sdk", "data-connector", "time-series-engine"],
      lastUpdated: "2023-10-15"
    },
    {
      id: "completion-designer",
      name: "Completion Designer",
      description: "Well completion design and optimization with fracture modeling and production forecasting",
      version: "2.0.3",
      author: "FracTech Innovations",
      category: "Engineering",
      rating: 4.3,
      downloads: 765,
      price: "Premium",
      compatibility: "Requires Update",
      dependencies: ["core-sdk", "data-connector", "numerical-solver", "visualization-engine"],
      lastUpdated: "2023-09-22"
    },
    {
      id: "mud-logger",
      name: "Mud Logger",
      description: "Real-time mud logging and gas analysis with automated lithology identification",
      version: "1.4.2",
      author: "DrillTech Solutions",
      category: "Drilling",
      rating: 4.6,
      downloads: 1120,
      price: "Free",
      compatibility: "Compatible",
      dependencies: ["core-sdk", "data-connector", "time-series-engine"],
      lastUpdated: "2023-11-05"
    },
    {
      id: "economics-evaluator",
      name: "Economics Evaluator",
      description: "Comprehensive economic evaluation with sensitivity analysis and portfolio optimization",
      version: "3.0.1",
      author: "PetroFinance",
      category: "Economics",
      rating: 4.8,
      downloads: 1560,
      price: "Premium",
      compatibility: "Compatible",
      dependencies: ["core-sdk", "data-connector", "numerical-solver"],
      lastUpdated: "2023-12-01"
    }
  ]);

  // Filter plugins based on search query
  const filteredPlugins = availablePlugins.filter(plugin => 
    plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plugin.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plugin.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plugin.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Install plugin
  const installPlugin = (id) => {
    setAvailablePlugins(plugins => 
      plugins.map(plugin => 
        plugin.id === id 
          ? { ...plugin, installing: true } 
          : plugin
      )
    );
    
    // Simulate installation process
    setTimeout(() => {
      setAvailablePlugins(plugins => 
        plugins.map(plugin => 
          plugin.id === id 
            ? { ...plugin, installing: false, installed: true } 
            : plugin
        )
      );
    }, 2000);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-neutral-900 mb-2">Plugin Directory</h2>
        <p className="text-sm text-neutral-500">
          Browse and install plugins from the official repository
        </p>
      </div>

      {filteredPlugins.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="mx-auto text-neutral-400 mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-1">No plugins found</h3>
          <p className="text-sm text-neutral-500 mb-4">
            No plugins match your search criteria. Try adjusting your search.
          </p>
          <Button variant="primary" icon="RefreshCw">
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlugins.map((plugin) => (
            <div 
              key={plugin.id} 
              className="border border-neutral-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow transition-shadow duration-200"
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900">{plugin.name}</h3>
                    <p className="text-sm text-neutral-500">{plugin.author}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    plugin.price === 'Free' ?'bg-success-500 bg-opacity-10 text-success-600' :'bg-primary-500 bg-opacity-10 text-primary-600'
                  }`}>
                    {plugin.price}
                  </span>
                </div>
                
                <p className="text-sm text-neutral-600 mb-4 line-clamp-2">{plugin.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-neutral-500">Version</p>
                    <p className="text-sm font-medium text-neutral-700">{plugin.version}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Category</p>
                    <p className="text-sm font-medium text-neutral-700">{plugin.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Rating</p>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-neutral-700 mr-1">{plugin.rating}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Icon 
                            key={i} 
                            name="Star" 
                            size={12} 
                            className={i < Math.floor(plugin.rating) ? "text-warning-500" : "text-neutral-300"} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Downloads</p>
                    <p className="text-sm font-medium text-neutral-700">{plugin.downloads}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-xs text-neutral-500 mb-1">Compatibility</p>
                  <div className="flex items-center">
                    <Icon 
                      name={plugin.compatibility === 'Compatible' ? 'CheckCircle' : 'AlertCircle'} 
                      size={16} 
                      className={plugin.compatibility === 'Compatible' ? "text-success-500 mr-1" : "text-warning-500 mr-1"} 
                    />
                    <span className="text-sm font-medium text-neutral-700">{plugin.compatibility}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <Button 
                    variant="ghost" 
                    icon="Info" 
                    size="sm"
                  >
                    Details
                  </Button>
                  
                  <Button 
                    variant={plugin.installed ? "success" : "primary"} 
                    icon={plugin.installing ? "Loader" : plugin.installed ? "Check" : "Download"} 
                    size="sm"
                    disabled={plugin.installing || plugin.installed}
                    onClick={() => installPlugin(plugin.id)}
                  >
                    {plugin.installing ? "Installing..." : plugin.installed ? "Installed" : "Install"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PluginDirectory;