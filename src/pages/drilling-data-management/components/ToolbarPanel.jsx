import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ToolbarPanel = () => {
  const [activeTools, setActiveTools] = useState([]);
  
  // Mock tools
  const tools = [
    { id: "cement", name: "Cement Calculations", icon: "Beaker" },
    { id: "hydraulics", name: "Hydraulics Modeling", icon: "Droplet" },
    { id: "torque", name: "Torque & Drag", icon: "GitBranch" },
    { id: "trajectory", name: "Trajectory Planning", icon: "Navigation" },
    { id: "pressure", name: "Pressure Analysis", icon: "BarChart2" },
    { id: "notes", name: "Notes & Annotations", icon: "FileText" },
    { id: "share", name: "Share & Export", icon: "Share2" },
    { id: "settings", name: "Settings", icon: "Settings" },
  ];
  
  // Toggle tool
  const toggleTool = (toolId) => {
    if (activeTools.includes(toolId)) {
      setActiveTools(activeTools.filter(id => id !== toolId));
    } else {
      setActiveTools([...activeTools, toolId]);
    }
  };
  
  return (
    <div className="bg-white border-t border-neutral-200 px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          {tools.map((tool) => (
            <button
              key={tool.id}
              className={`p-2 rounded-md flex items-center justify-center ${
                activeTools.includes(tool.id)
                  ? 'bg-primary-100 text-primary-700' :'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
              onClick={() => toggleTool(tool.id)}
              title={tool.name}
            >
              <Icon name={tool.icon} size={20} />
            </button>
          ))}
        </div>
        
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            icon="HelpCircle"
            title="Help"
          />
        </div>
      </div>
    </div>
  );
};

export default ToolbarPanel;