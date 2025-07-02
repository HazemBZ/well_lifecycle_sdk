import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Dropdown from "../../../components/ui/Dropdown";

const ToolbarControls = ({
  viewMode,
  onViewModeChange,
  scale,
  onScaleChange,
  onFullscreenToggle,
  isFullscreen,
  showFormations,
  onToggleFormations
}) => {
  // Scale options
  const scaleOptions = [
    { value: 0.5, label: "0.5x" },
    { value: 0.75, label: "0.75x" },
    { value: 1, label: "1x" },
    { value: 1.25, label: "1.25x" },
    { value: 1.5, label: "1.5x" },
    { value: 2, label: "2x" }
  ];

  // View mode options
  const viewModeOptions = [
    { value: "depth", label: "Depth", icon: "ArrowDownUp" },
    { value: "time", label: "Time", icon: "Clock" }
  ];

  return (
    <div className="bg-white border-b border-neutral-200 p-2 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        {/* View mode selector */}
        <div className="flex items-center bg-neutral-100 rounded-md p-1">
          {viewModeOptions.map((option) => (
            <button
              key={option.value}
              className={`flex items-center px-3 py-1 text-sm rounded-md ${
                viewMode === option.value
                  ? "bg-white text-primary-700 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
              onClick={() => onViewModeChange(option.value)}
            >
              <Icon name={option.icon} size={16} className="mr-1.5" />
              {option.label}
            </button>
          ))}
        </div>

        {/* Scale selector */}
        <div className="flex items-center">
          <span className="text-sm text-neutral-600 mr-2">Scale:</span>
          <Dropdown
            options={scaleOptions}
            value={scaleOptions.find(option => option.value === scale)}
            onChange={(option) => onScaleChange(option.value)}
            variant="select"
            className="w-24"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {/* Curve tools */}
        <Button
          variant="tertiary"
          size="sm"
          icon="Sliders"
          title="Curve Settings"
        >
          Curve Settings
        </Button>
        
        <Button
          variant="tertiary"
          size="sm"
          icon="Calculator"
          title="Curve Calculator"
        >
          Calculator
        </Button>
        
        <Button
          variant="tertiary"
          size="sm"
          icon="Edit3"
          title="Annotations"
        >
          Annotate
        </Button>
        
        {/* Toggle formations */}
        <Button
          variant={showFormations ? "primary" : "tertiary"}
          size="sm"
          icon="Layers"
          onClick={onToggleFormations}
          title={showFormations ? "Hide Formations" : "Show Formations"}
        >
          Formations
        </Button>
        
        {/* Export options */}
        <Dropdown
          options={[
            { value: "pdf", label: "Export as PDF", icon: "FileText" },
            { value: "image", label: "Export as Image", icon: "Image" },
            { value: "las", label: "Export as LAS", icon: "Database" },
            { value: "csv", label: "Export as CSV", icon: "FileText" }
          ]}
          placeholder="Export"
          icon="Download"
          className="w-32"
        />
        
        {/* Fullscreen toggle */}
        <Button
          variant="tertiary"
          size="sm"
          icon={isFullscreen ? "Minimize2" : "Maximize2"}
          onClick={onFullscreenToggle}
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        />
      </div>
    </div>
  );
};

export default ToolbarControls;