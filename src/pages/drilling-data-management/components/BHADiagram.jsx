import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Dropdown from "../../../components/ui/Dropdown";

const BHADiagram = () => {
  const [selectedBHA, setSelectedBHA] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  
  // Mock BHA configurations
  const bhaConfigurations = [
    { value: "bha-1", label: "BHA #1 - PDC" },
    { value: "bha-2", label: "BHA #2 - Tricone" },
    { value: "bha-3", label: "BHA #3 - Coring" },
  ];
  
  // Mock BHA components
  const bhaComponents = [
    { 
      id: 1, 
      name: "8 1/2\" PDC Bit", 
      length: 0.3, 
      od: 8.5, 
      type: "bit",
      details: "6 blades, 13mm cutters, matrix body"
    },
    { 
      id: 2, 
      name: "Near-Bit Stabilizer", 
      length: 1.8, 
      od: 8.375, 
      type: "stabilizer",
      details: "3-point contact, spiral blades"
    },
    { 
      id: 3, 
      name: "MWD/LWD Tool", 
      length: 9.2, 
      od: 6.75, 
      type: "mwd",
      details: "Directional, gamma ray, resistivity sensors"
    },
    { 
      id: 4, 
      name: "String Stabilizer", 
      length: 1.5, 
      od: 8.25, 
      type: "stabilizer",
      details: "Integral blade design"
    },
    { 
      id: 5, 
      name: "HWDP", 
      length: 28.5, 
      od: 5.0, 
      type: "pipe",
      details: "3 stands, 5\" OD, 3\" ID"
    },
    { 
      id: 6, 
      name: "Drill Pipe", 
      length: 900, 
      od: 5.0, 
      type: "pipe",
      details: "30 stands, 5\" OD, S-135 grade"
    },
  ];
  
  // Get component color based on type
  const getComponentColor = (type) => {
    switch (type) {
      case "bit": return "#ef4444";
      case "stabilizer": return "#3b82f6";
      case "mwd": return "#10b981";
      case "pipe": return "#f59e0b";
      default: return "#64748b";
    }
  };
  
  // Get component icon based on type
  const getComponentIcon = (type) => {
    switch (type) {
      case "bit": return "Tool";
      case "stabilizer": return "CircleDot";
      case "mwd": return "Cpu";
      case "pipe": return "PipeLine";
      default: return "Circle";
    }
  };
  
  // Toggle component details
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  
  return (
    <div className="bg-white rounded-lg border border-neutral-200 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
        <h2 className="text-lg font-medium text-neutral-900">BHA Configuration</h2>
        <div className="flex items-center space-x-2">
          <Dropdown
            options={bhaConfigurations}
            value={selectedBHA || bhaConfigurations[0]}
            onChange={setSelectedBHA}
            placeholder="Select BHA"
          />
        </div>
      </div>
      
      <div className="p-4 flex-1 overflow-auto">
        <div className="flex justify-center mb-4">
          <Button
            variant={showDetails ? "primary" : "secondary"}
            size="sm"
            icon={showDetails ? "EyeOff" : "Eye"}
            onClick={toggleDetails}
          >
            {showDetails ? "Hide Details" : "Show Details"}
          </Button>
        </div>
        
        <div className="relative flex flex-col items-center">
          {/* Vertical line representing the wellbore */}
          <div className="absolute top-0 bottom-0 w-1 bg-neutral-200 z-0"></div>
          
          {/* BHA components */}
          {bhaComponents.map((component, index) => (
            <div 
              key={component.id}
              className={`relative z-10 mb-2 w-full max-w-xs ${
                component.type === 'pipe' && !showDetails ? 'h-16' : ''
              }`}
            >
              <div 
                className="bg-white border border-neutral-200 rounded-lg shadow-sm p-3 hover:bg-neutral-50 transition-colors"
                style={{
                  borderLeftWidth: '4px',
                  borderLeftColor: getComponentColor(component.type)
                }}
              >
                <div className="flex items-center">
                  <div 
                    className="p-2 rounded-md mr-3"
                    style={{ backgroundColor: `${getComponentColor(component.type)}20` }}
                  >
                    <Icon 
                      name={getComponentIcon(component.type)} 
                      size={20} 
                      style={{ color: getComponentColor(component.type) }}
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900">{component.name}</h4>
                    <div className="flex items-center mt-1 text-xs text-neutral-500">
                      <span className="mr-2">Length: {component.length} m</span>
                      <span>OD: {component.od}"</span>
                    </div>
                    {showDetails && (
                      <p className="mt-2 text-xs text-neutral-600">{component.details}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Skip rendering all pipe components when not showing details */}
              {component.type === 'pipe' && !showDetails && index < bhaComponents.length - 1 && (
                <div className="flex justify-center my-2">
                  <Icon name="MoreVertical" size={20} className="text-neutral-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="px-4 py-3 border-t border-neutral-200 bg-neutral-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-900">Total Length</p>
            <p className="text-lg font-semibold text-neutral-700">
              {bhaComponents.reduce((sum, component) => sum + component.length, 0).toFixed(1)} m
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            icon="FileText"
          >
            Full Specs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BHADiagram;