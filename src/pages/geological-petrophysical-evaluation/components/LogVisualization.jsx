import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Dropdown from "../../../components/ui/Dropdown";

const LogVisualization = ({ depthUnit, depthRange }) => {
  const [selectedTracks, setSelectedTracks] = useState([
    { id: "track-1", name: "Gamma Ray" },
    { id: "track-2", name: "Resistivity" },
    { id: "track-3", name: "Density-Neutron" },
    { id: "track-4", name: "Sonic" }
  ]);
  
  const [displayOptions, setDisplayOptions] = useState({
    showGrid: true,
    showFormationTops: true,
    showAnnotations: true,
    showCoreData: true
  });

  // Mock data for visualization options
  const availableTracks = [
    { value: "gamma-ray", label: "Gamma Ray" },
    { value: "resistivity", label: "Resistivity" },
    { value: "density", label: "Density" },
    { value: "neutron", label: "Neutron" },
    { value: "density-neutron", label: "Density-Neutron" },
    { value: "sonic", label: "Sonic" },
    { value: "caliper", label: "Caliper" },
    { value: "sp", label: "Spontaneous Potential" }
  ];

  const availableOverlays = [
    { value: "pef", label: "PEF" },
    { value: "vshale", label: "VShale" },
    { value: "porosity", label: "Porosity" },
    { value: "permeability", label: "Permeability" },
    { value: "sw", label: "Water Saturation" }
  ];

  // Toggle display option
  const toggleDisplayOption = (option) => {
    setDisplayOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-4 p-2 bg-neutral-50 rounded-md">
        <Dropdown
          label="Add Track"
          options={availableTracks}
          placeholder="Select track"
          onChange={(selected) => console.log("Add track:", selected)}
        />
        <Dropdown
          label="Add Overlay"
          options={availableOverlays}
          placeholder="Select overlay"
          onChange={(selected) => console.log("Add overlay:", selected)}
        />
        <div className="flex items-end space-x-2">
          <Button
            variant={displayOptions.showGrid ? "primary" : "secondary"}
            size="sm"
            onClick={() => toggleDisplayOption("showGrid")}
          >
            Grid
          </Button>
          <Button
            variant={displayOptions.showFormationTops ? "primary" : "secondary"}
            size="sm"
            onClick={() => toggleDisplayOption("showFormationTops")}
          >
            Formation Tops
          </Button>
          <Button
            variant={displayOptions.showAnnotations ? "primary" : "secondary"}
            size="sm"
            onClick={() => toggleDisplayOption("showAnnotations")}
          >
            Annotations
          </Button>
          <Button
            variant={displayOptions.showCoreData ? "primary" : "secondary"}
            size="sm"
            onClick={() => toggleDisplayOption("showCoreData")}
          >
            Core Data
          </Button>
        </div>
      </div>

      {/* Log Visualization Area */}
      <div className="flex-1 border border-neutral-200 rounded-md overflow-hidden min-h-[600px] relative">
        {/* Depth Track */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-neutral-100 border-r border-neutral-200 flex flex-col">
          <div className="h-10 bg-neutral-200 flex items-center justify-center font-medium text-sm">
            Depth ({depthUnit})
          </div>
          <div className="flex-1 relative">
            {/* Depth markers would be rendered here */}
            {[...Array(11)].map((_, i) => {
              const depth = depthRange.min + (i * (depthRange.max - depthRange.min) / 10);
              return (
                <div 
                  key={i} 
                  className="absolute left-0 right-0 flex items-center justify-center text-xs text-neutral-600 border-t border-neutral-300"
                  style={{ top: `${i * 10}%` }}
                >
                  {Math.round(depth)}
                </div>
              );
            })}
          </div>
        </div>

        {/* Log Tracks */}
        <div className="ml-16 flex h-full">
          {selectedTracks.map((track, index) => (
            <div key={track.id} className="flex-1 border-r border-neutral-200 min-w-[120px] flex flex-col">
              <div className="h-10 bg-neutral-200 flex items-center justify-between px-2 text-sm font-medium">
                <span>{track.name}</span>
                <div className="flex items-center space-x-1">
                  <button className="p-1 hover:bg-neutral-300 rounded">
                    <Icon name="Settings" size={14} />
                  </button>
                  <button className="p-1 hover:bg-neutral-300 rounded">
                    <Icon name="X" size={14} />
                  </button>
                </div>
              </div>
              <div className="flex-1 relative">
                {/* Track visualization would be rendered here */}
                {displayOptions.showGrid && (
                  <div className="absolute inset-0 grid grid-rows-10 pointer-events-none">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="border-t border-neutral-200"></div>
                    ))}
                  </div>
                )}
                
                {/* Placeholder for log curve */}
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Example curve path - would be generated from actual data */}
                  <path 
                    d={`M 10 90 C 30 70, 40 80, 50 50 C 60 30, 70 60, 90 10`} 
                    stroke={index === 0 ? "#22c55e" : index === 1 ? "#ef4444" : index === 2 ? "#3b82f6" : "#f59e0b"} 
                    strokeWidth="2" 
                    fill="none" 
                  />
                  
                  {/* Formation tops */}
                  {displayOptions.showFormationTops && (
                    <>
                      <line x1="0" y1="30" x2="100" y2="30" stroke="#64748b" strokeWidth="1" strokeDasharray="5,3" />
                      <text x="5" y="28" fontSize="8" fill="#64748b">Top Formation A</text>
                      
                      <line x1="0" y1="70" x2="100" y2="70" stroke="#64748b" strokeWidth="1" strokeDasharray="5,3" />
                      <text x="5" y="68" fontSize="8" fill="#64748b">Top Formation B</text>
                    </>
                  )}
                  
                  {/* Annotations */}
                  {displayOptions.showAnnotations && (
                    <g>
                      <circle cx="50" cy="50" r="3" fill="#ef4444" />
                      <text x="55" y="50" fontSize="8" fill="#ef4444">Note</text>
                    </g>
                  )}
                  
                  {/* Core data points */}
                  {displayOptions.showCoreData && (
                    <>
                      <circle cx="30" cy="60" r="2" fill="#9333ea" />
                      <circle cx="50" cy="40" r="2" fill="#9333ea" />
                      <circle cx="70" cy="55" r="2" fill="#9333ea" />
                    </>
                  )}
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Zoom controls */}
        <div className="absolute right-4 top-16 bg-white border border-neutral-200 rounded-md shadow-sm">
          <button className="p-2 hover:bg-neutral-100 border-b border-neutral-200">
            <Icon name="ZoomIn" size={16} />
          </button>
          <button className="p-2 hover:bg-neutral-100">
            <Icon name="ZoomOut" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogVisualization;