import React, { useState } from "react";

import Button from "../../../components/ui/Button";
import Dropdown from "../../../components/ui/Dropdown";

const LithologyPanel = ({ depthUnit }) => {
  const [editMode, setEditMode] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [showLegend, setShowLegend] = useState(true);

  // Mock lithology symbols
  const lithologySymbols = [
    { id: "sandstone", name: "Sandstone", color: "#f0e68c", pattern: "dots" },
    { id: "shale", name: "Shale", color: "#708090", pattern: "horizontal" },
    { id: "limestone", name: "Limestone", color: "#add8e6", pattern: "brick" },
    { id: "dolomite", name: "Dolomite", color: "#f5deb3", pattern: "diagonal" },
    { id: "coal", name: "Coal", color: "#2f4f4f", pattern: "solid" },
    { id: "anhydrite", name: "Anhydrite", color: "#d3d3d3", pattern: "crosses" },
    { id: "salt", name: "Salt", color: "#ffffff", pattern: "circles" },
    { id: "custom", name: "Custom...", color: "#ffffff", pattern: "none" }
  ];

  // Mock formation tops
  const formationTops = [
    { depth: 2050, name: "Formation A", age: "Miocene", lithology: "Sandstone" },
    { depth: 2150, name: "Formation B", age: "Oligocene", lithology: "Shale" },
    { depth: 2250, name: "Formation C", age: "Eocene", lithology: "Limestone" },
    { depth: 2350, name: "Formation D", age: "Paleocene", lithology: "Dolomite" }
  ];

  // Mock lithology column data
  const lithologyData = [
    { topDepth: 2000, bottomDepth: 2050, lithology: "sandstone", description: "Fine-grained sandstone" },
    { topDepth: 2050, bottomDepth: 2080, lithology: "shale", description: "Dark gray shale" },
    { topDepth: 2080, bottomDepth: 2100, lithology: "sandstone", description: "Medium-grained sandstone" },
    { topDepth: 2100, bottomDepth: 2150, lithology: "limestone", description: "Fossiliferous limestone" },
    { topDepth: 2150, bottomDepth: 2200, lithology: "shale", description: "Black shale with pyrite" },
    { topDepth: 2200, bottomDepth: 2250, lithology: "sandstone", description: "Coarse-grained sandstone" },
    { topDepth: 2250, bottomDepth: 2300, lithology: "dolomite", description: "Crystalline dolomite" },
    { topDepth: 2300, bottomDepth: 2350, lithology: "limestone", description: "Oolitic limestone" },
    { topDepth: 2350, bottomDepth: 2400, lithology: "shale", description: "Silty shale" }
  ];

  // Get lithology symbol by ID
  const getLithologySymbol = (id) => {
    return lithologySymbols.find(symbol => symbol.id === id);
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (editMode) {
      setSelectedSymbol(null);
    }
  };

  // Handle symbol selection
  const handleSymbolSelect = (symbol) => {
    setSelectedSymbol(symbol);
  };

  // Render lithology pattern
  const renderLithologyPattern = (lithologyId, width, height) => {
    const symbol = getLithologySymbol(lithologyId);
    
    if (!symbol) return null;
    
    switch (symbol.pattern) {
      case "dots":
        return (
          <pattern id={`pattern-${lithologyId}`} patternUnits="userSpaceOnUse" width="10" height="10">
            <rect width="10" height="10" fill={symbol.color} />
            <circle cx="5" cy="5" r="1" fill="#000000" fillOpacity="0.3" />
          </pattern>
        );
      case "horizontal":
        return (
          <pattern id={`pattern-${lithologyId}`} patternUnits="userSpaceOnUse" width="10" height="10">
            <rect width="10" height="10" fill={symbol.color} />
            <line x1="0" y1="5" x2="10" y2="5" stroke="#000000" strokeOpacity="0.3" strokeWidth="1" />
          </pattern>
        );
      case "brick":
        return (
          <pattern id={`pattern-${lithologyId}`} patternUnits="userSpaceOnUse" width="20" height="20">
            <rect width="20" height="20" fill={symbol.color} />
            <line x1="0" y1="0" x2="20" y2="0" stroke="#000000" strokeOpacity="0.3" strokeWidth="1" />
            <line x1="0" y1="10" x2="20" y2="10" stroke="#000000" strokeOpacity="0.3" strokeWidth="1" />
            <line x1="10" y1="0" x2="10" y2="10" stroke="#000000" strokeOpacity="0.3" strokeWidth="1" />
            <line x1="0" y1="10" x2="0" y2="20" stroke="#000000" strokeOpacity="0.3" strokeWidth="1" />
            <line x1="20" y1="10" x2="20" y2="20" stroke="#000000" strokeOpacity="0.3" strokeWidth="1" />
          </pattern>
        );
      case "diagonal":
        return (
          <pattern id={`pattern-${lithologyId}`} patternUnits="userSpaceOnUse" width="10" height="10">
            <rect width="10" height="10" fill={symbol.color} />
            <line x1="0" y1="0" x2="10" y2="10" stroke="#000000" strokeOpacity="0.3" strokeWidth="1" />
          </pattern>
        );
      case "solid":
        return (
          <pattern id={`pattern-${lithologyId}`} patternUnits="userSpaceOnUse" width="10" height="10">
            <rect width="10" height="10" fill={symbol.color} />
          </pattern>
        );
      case "crosses":
        return (
          <pattern id={`pattern-${lithologyId}`} patternUnits="userSpaceOnUse" width="10" height="10">
            <rect width="10" height="10" fill={symbol.color} />
            <line x1="0" y1="0" x2="10" y2="10" stroke="#000000" strokeOpacity="0.3" strokeWidth="1" />
            <line x1="10" y1="0" x2="0" y2="10" stroke="#000000" strokeOpacity="0.3" strokeWidth="1" />
          </pattern>
        );
      case "circles":
        return (
          <pattern id={`pattern-${lithologyId}`} patternUnits="userSpaceOnUse" width="20" height="20">
            <rect width="20" height="20" fill={symbol.color} />
            <circle cx="10" cy="10" r="5" stroke="#000000" strokeOpacity="0.3" strokeWidth="1" fill="none" />
          </pattern>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-4 p-2 bg-neutral-50 rounded-md">
        <Button
          variant={editMode ? "primary" : "secondary"}
          size="sm"
          icon={editMode ? "Check" : "Edit2"}
          onClick={toggleEditMode}
        >
          {editMode ? "Save Changes" : "Edit Lithology"}
        </Button>
        
        {editMode && (
          <Dropdown
            label="Select Symbol"
            options={lithologySymbols.map(symbol => ({
              value: symbol.id,
              label: symbol.name,
              icon: "Circle",
              color: symbol.color
            }))}
            onChange={(selected) => handleSymbolSelect(selected)}
            placeholder="Select lithology"
          />
        )}
        
        <Button
          variant={showLegend ? "primary" : "secondary"}
          size="sm"
          icon="List"
          onClick={() => setShowLegend(!showLegend)}
        >
          {showLegend ? "Hide Legend" : "Show Legend"}
        </Button>
        
        <div className="ml-auto">
          <Button
            variant="secondary"
            size="sm"
            icon="Download"
          >
            Export
          </Button>
        </div>
      </div>

      {/* Lithology Column and Legend */}
      <div className="flex-1 border border-neutral-200 rounded-md overflow-hidden min-h-[600px]">
        <div className="flex h-full">
          {/* Lithology Column */}
          <div className="flex-1 p-4 overflow-auto">
            <div className="relative h-[800px] w-64 mx-auto border border-neutral-200 bg-white">
              {/* Depth scale */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-neutral-100 border-r border-neutral-200 flex flex-col">
                <div className="h-10 bg-neutral-200 flex items-center justify-center font-medium text-sm">
                  Depth ({depthUnit})
                </div>
                <div className="flex-1 relative">
                  {/* Depth markers */}
                  {[...Array(9)].map((_, i) => {
                    const depth = 2000 + (i * 50);
                    const position = (i * 50) / 400 * 100;
                    return (
                      <div 
                        key={i} 
                        className="absolute left-0 right-0 flex items-center justify-center text-xs text-neutral-600 border-t border-neutral-300"
                        style={{ top: `${position}%` }}
                      >
                        {depth}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Lithology column */}
              <div className="absolute left-16 right-0 top-0 bottom-0">
                <div className="h-10 bg-neutral-200 flex items-center justify-center font-medium text-sm">
                  Lithology
                </div>
                <div className="relative h-[calc(100%-40px)]">
                  <svg width="100%" height="100%" viewBox="0 0 100 800" preserveAspectRatio="none">
                    {/* Define patterns */}
                    <defs>
                      {lithologySymbols.map(symbol => (
                        renderLithologyPattern(symbol.id, 10, 10)
                      ))}
                    </defs>
                    
                    {/* Lithology intervals */}
                    {lithologyData.map((interval, index) => {
                      const topPosition = ((interval.topDepth - 2000) / 400) * 800;
                      const bottomPosition = ((interval.bottomDepth - 2000) / 400) * 800;
                      const height = bottomPosition - topPosition;
                      
                      return (
                        <g key={index}>
                          <rect
                            x="0"
                            y={topPosition}
                            width="100"
                            height={height}
                            fill={`url(#pattern-${interval.lithology})`}
                            stroke="#000000"
                            strokeWidth="1"
                            className={editMode ? "cursor-pointer" : ""}
                            onClick={() => editMode && handleSymbolSelect({
                              value: interval.lithology,
                              label: getLithologySymbol(interval.lithology).name
                            })}
                          />
                          
                          {/* Description text */}
                          {height > 30 && (
                            <text
                              x="50"
                              y={topPosition + height / 2}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fontSize="8"
                              fill="#000000"
                            >
                              {interval.description}
                            </text>
                          )}
                        </g>
                      );
                    })}
                    
                    {/* Formation tops */}
                    {formationTops.map((top, index) => {
                      const position = ((top.depth - 2000) / 400) * 800;
                      
                      return (
                        <g key={`top-${index}`}>
                          <line
                            x1="0"
                            y1={position}
                            x2="100"
                            y2={position}
                            stroke="#ff0000"
                            strokeWidth="2"
                            strokeDasharray="5,3"
                          />
                          <text
                            x="50"
                            y={position - 5}
                            textAnchor="middle"
                            fontSize="8"
                            fill="#ff0000"
                            fontWeight="bold"
                          >
                            {top.name}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Legend */}
          {showLegend && (
            <div className="w-64 border-l border-neutral-200 p-4 overflow-auto">
              <h3 className="text-sm font-medium mb-4">Lithology Legend</h3>
              
              <div className="space-y-3">
                {lithologySymbols.filter(symbol => symbol.id !== "custom").map(symbol => (
                  <div key={symbol.id} className="flex items-center">
                    <div 
                      className="w-6 h-6 border border-neutral-300"
                      style={{ backgroundColor: symbol.color }}
                    ></div>
                    <span className="ml-2 text-sm">{symbol.name}</span>
                  </div>
                ))}
              </div>
              
              <h3 className="text-sm font-medium mt-6 mb-4">Formation Tops</h3>
              
              <div className="space-y-3">
                {formationTops.map((top, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-6 h-0 border-t-2 border-red-500 border-dashed"></div>
                    <div className="ml-2">
                      <div className="text-sm font-medium">{top.name}</div>
                      <div className="text-xs text-neutral-500">{top.depth}m - {top.age}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LithologyPanel;