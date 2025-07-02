import React, { useState } from "react";

import Button from "../../../components/ui/Button";
import Dropdown from "../../../components/ui/Dropdown";

const CrossplotPanel = () => {
  const [plotType, setPlotType] = useState("standard");
  const [xAxis, setXAxis] = useState({ value: "porosity", label: "Porosity" });
  const [yAxis, setYAxis] = useState({ value: "permeability", label: "Permeability" });
  const [colorBy, setColorBy] = useState({ value: "lithology", label: "Lithology" });
  const [showTrendline, setShowTrendline] = useState(true);
  const [showZones, setShowZones] = useState(true);
  const [selectedZone, setSelectedZone] = useState(null);

  // Mock data for available properties
  const availableProperties = [
    { value: "porosity", label: "Porosity" },
    { value: "permeability", label: "Permeability" },
    { value: "sw", label: "Water Saturation" },
    { value: "vshale", label: "Shale Volume" },
    { value: "density", label: "Bulk Density" },
    { value: "neutron", label: "Neutron Porosity" },
    { value: "sonic", label: "Sonic Transit Time" },
    { value: "resistivity", label: "Deep Resistivity" },
    { value: "gr", label: "Gamma Ray" }
  ];

  // Mock data for color-by options
  const colorByOptions = [
    { value: "lithology", label: "Lithology" },
    { value: "zone", label: "Zone" },
    { value: "depth", label: "Depth" },
    { value: "facies", label: "Facies" },
    { value: "sw", label: "Water Saturation" }
  ];

  // Mock data for plot types
  const plotTypes = [
    { value: "standard", label: "Standard Crossplot" },
    { value: "histogram", label: "Histogram" },
    { value: "density", label: "Density Plot" },
    { value: "ternary", label: "Ternary Diagram" }
  ];

  // Mock data for zones
  const zones = [
    { value: "all", label: "All Zones" },
    { value: "zone-a", label: "Zone A - Upper Sandstone" },
    { value: "zone-b", label: "Zone B - Middle Shale" },
    { value: "zone-c", label: "Zone C - Lower Carbonate" }
  ];

  // Handle axis property change
  const handleXAxisChange = (selected) => {
    setXAxis(selected);
  };

  const handleYAxisChange = (selected) => {
    setYAxis(selected);
  };

  // Handle color-by change
  const handleColorByChange = (selected) => {
    setColorBy(selected);
  };

  // Handle plot type change
  const handlePlotTypeChange = (selected) => {
    setPlotType(selected.value);
  };

  // Handle zone selection
  const handleZoneChange = (selected) => {
    setSelectedZone(selected);
  };

  // Toggle trendline
  const toggleTrendline = () => {
    setShowTrendline(!showTrendline);
  };

  // Toggle zones
  const toggleZones = () => {
    setShowZones(!showZones);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-4 p-2 bg-neutral-50 rounded-md">
        <Dropdown
          label="Plot Type"
          options={plotTypes}
          value={plotTypes.find(type => type.value === plotType)}
          onChange={handlePlotTypeChange}
        />
        
        <Dropdown
          label="X-Axis"
          options={availableProperties}
          value={xAxis}
          onChange={handleXAxisChange}
        />
        
        <Dropdown
          label="Y-Axis"
          options={availableProperties}
          value={yAxis}
          onChange={handleYAxisChange}
        />
        
        <Dropdown
          label="Color By"
          options={colorByOptions}
          value={colorBy}
          onChange={handleColorByChange}
        />
        
        <div className="flex items-end space-x-2 ml-auto">
          <Button
            variant={showTrendline ? "primary" : "secondary"}
            size="sm"
            icon="TrendingUp"
            onClick={toggleTrendline}
          >
            Trendline
          </Button>
          <Button
            variant={showZones ? "primary" : "secondary"}
            size="sm"
            icon="Layers"
            onClick={toggleZones}
          >
            Zones
          </Button>
        </div>
      </div>

      {/* Crossplot Area */}
      <div className="flex-1 border border-neutral-200 rounded-md overflow-hidden min-h-[600px]">
        <div className="flex h-full">
          {/* Main Plot */}
          <div className="flex-1 p-4">
            <div className="h-full bg-white border border-neutral-200 rounded-md relative">
              {/* Plot SVG */}
              <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
                {/* Axes */}
                <line x1="100" y1="500" x2="700" y2="500" stroke="#64748b" strokeWidth="2" />
                <line x1="100" y1="100" x2="100" y2="500" stroke="#64748b" strokeWidth="2" />
                
                {/* X-axis ticks */}
                {[0, 0.1, 0.2, 0.3, 0.4].map((tick, i) => (
                  <g key={`x-tick-${i}`}>
                    <line 
                      x1={100 + (i * 150)} 
                      y1="500" 
                      x2={100 + (i * 150)} 
                      y2="510" 
                      stroke="#64748b" 
                      strokeWidth="1" 
                    />
                    <text 
                      x={100 + (i * 150)} 
                      y="525" 
                      textAnchor="middle" 
                      fontSize="12" 
                      fill="#64748b"
                    >
                      {tick}
                    </text>
                  </g>
                ))}
                
                {/* Y-axis ticks */}
                {[0, 1, 10, 100, 1000].map((tick, i) => {
                  const logY = i === 0 ? 500 : 500 - (i * 100);
                  return (
                    <g key={`y-tick-${i}`}>
                      <line 
                        x1="90" 
                        y1={logY} 
                        x2="100" 
                        y2={logY} 
                        stroke="#64748b" 
                        strokeWidth="1" 
                      />
                      <text 
                        x="80" 
                        y={logY + 5} 
                        textAnchor="end" 
                        fontSize="12" 
                        fill="#64748b"
                      >
                        {tick}
                      </text>
                    </g>
                  );
                })}
                
                {/* Axis labels */}
                <text 
                  x="400" 
                  y="560" 
                  textAnchor="middle" 
                  fontSize="14" 
                  fontWeight="bold" 
                  fill="#334155"
                >
                  {xAxis.label} (v/v)
                </text>
                <text 
                  x="40" 
                  y="300" 
                  textAnchor="middle" 
                  fontSize="14" 
                  fontWeight="bold" 
                  fill="#334155"
                  transform="rotate(-90, 40, 300)"
                >
                  {yAxis.label} (mD)
                </text>
                
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map((_, i) => (
                  <line 
                    key={`x-grid-${i}`}
                    x1={100 + (i * 150)} 
                    y1="100" 
                    x2={100 + (i * 150)} 
                    y2="500" 
                    stroke="#e2e8f0" 
                    strokeWidth="1" 
                  />
                ))}
                {[0, 1, 2, 3, 4].map((_, i) => (
                  <line 
                    key={`y-grid-${i}`}
                    x1="100" 
                    y1={500 - (i * 100)} 
                    x2="700" 
                    y2={500 - (i * 100)} 
                    stroke="#e2e8f0" 
                    strokeWidth="1" 
                  />
                ))}
                
                {/* Data points - Sandstone */}
                <g>
                  <circle cx="250" cy="300" r="6" fill="#f0e68c" stroke="#000" strokeWidth="1" />
                  <circle cx="280" cy="250" r="6" fill="#f0e68c" stroke="#000" strokeWidth="1" />
                  <circle cx="320" cy="220" r="6" fill="#f0e68c" stroke="#000" strokeWidth="1" />
                  <circle cx="350" cy="200" r="6" fill="#f0e68c" stroke="#000" strokeWidth="1" />
                  <circle cx="380" cy="180" r="6" fill="#f0e68c" stroke="#000" strokeWidth="1" />
                  <circle cx="400" cy="170" r="6" fill="#f0e68c" stroke="#000" strokeWidth="1" />
                </g>
                
                {/* Data points - Shale */}
                <g>
                  <circle cx="150" cy="450" r="6" fill="#708090" stroke="#000" strokeWidth="1" />
                  <circle cx="180" cy="430" r="6" fill="#708090" stroke="#000" strokeWidth="1" />
                  <circle cx="200" cy="410" r="6" fill="#708090" stroke="#000" strokeWidth="1" />
                  <circle cx="220" cy="400" r="6" fill="#708090" stroke="#000" strokeWidth="1" />
                  <circle cx="240" cy="390" r="6" fill="#708090" stroke="#000" strokeWidth="1" />
                </g>
                
                {/* Data points - Limestone */}
                <g>
                  <circle cx="300" cy="350" r="6" fill="#add8e6" stroke="#000" strokeWidth="1" />
                  <circle cx="330" cy="330" r="6" fill="#add8e6" stroke="#000" strokeWidth="1" />
                  <circle cx="360" cy="310" r="6" fill="#add8e6" stroke="#000" strokeWidth="1" />
                  <circle cx="390" cy="290" r="6" fill="#add8e6" stroke="#000" strokeWidth="1" />
                </g>
                
                {/* Trendline */}
                {showTrendline && (
                  <line 
                    x1="150" 
                    y1="450" 
                    x2="400" 
                    y2="170" 
                    stroke="#ef4444" 
                    strokeWidth="2" 
                    strokeDasharray="5,3" 
                  />
                )}
                
                {/* Zone boundaries */}
                {showZones && (
                  <>
                    <path 
                      d="M 150,450 Q 250,400 350,200" 
                      fill="none" 
                      stroke="#3b82f6" 
                      strokeWidth="2" 
                      strokeDasharray="5,3" 
                    />
                    <text 
                      x="200" 
                      y="420" 
                      fontSize="12" 
                      fill="#3b82f6"
                    >
                      Zone A
                    </text>
                    <path 
                      d="M 250,300 Q 350,250 450,150" 
                      fill="none" 
                      stroke="#10b981" 
                      strokeWidth="2" 
                      strokeDasharray="5,3" 
                    />
                    <text 
                      x="350" 
                      y="250" 
                      fontSize="12" 
                      fill="#10b981"
                    >
                      Zone B
                    </text>
                  </>
                )}
              </svg>
              
              {/* Plot title */}
              <div className="absolute top-4 left-0 right-0 text-center">
                <h3 className="text-lg font-medium text-neutral-800">
                  {xAxis.label} vs {yAxis.label} Crossplot
                </h3>
              </div>
            </div>
          </div>
          
          {/* Side panel */}
          <div className="w-64 border-l border-neutral-200 p-4 overflow-auto">
            <h3 className="text-sm font-medium mb-4">Filters & Statistics</h3>
            
            <div className="mb-4">
              <Dropdown
                label="Filter by Zone"
                options={zones}
                value={selectedZone || zones[0]}
                onChange={handleZoneChange}
              />
            </div>
            
            <div className="space-y-4 mt-6">
              <div className="bg-neutral-50 p-3 rounded-md">
                <h4 className="text-xs font-medium text-neutral-500 mb-1">Correlation Coefficient</h4>
                <p className="text-lg font-medium">0.87</p>
              </div>
              
              <div className="bg-neutral-50 p-3 rounded-md">
                <h4 className="text-xs font-medium text-neutral-500 mb-1">Regression Equation</h4>
                <p className="text-sm font-mono">y = 10^(4.5x - 0.3)</p>
              </div>
              
              <div className="bg-neutral-50 p-3 rounded-md">
                <h4 className="text-xs font-medium text-neutral-500 mb-1">Data Points</h4>
                <p className="text-lg font-medium">15</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Legend</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-[#f0e68c] border border-black"></div>
                  <span className="ml-2 text-sm">Sandstone</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-[#708090] border border-black"></div>
                  <span className="ml-2 text-sm">Shale</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-[#add8e6] border border-black"></div>
                  <span className="ml-2 text-sm">Limestone</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Button
                variant="secondary"
                size="sm"
                icon="Download"
                fullWidth
              >
                Export Plot
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrossplotPanel;