import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Dropdown from "../../../components/ui/Dropdown";

const ResultsPanel = ({ selectedZone }) => {
  const [displayMode, setDisplayMode] = useState("table");
  const [selectedScenario, setSelectedScenario] = useState({ value: "base", label: "Base Case" });
  const [selectedParameter, setSelectedParameter] = useState({ value: "porosity", label: "Porosity" });

  // Mock scenarios
  const scenarios = [
    { value: "base", label: "Base Case" },
    { value: "optimistic", label: "Optimistic Case" },
    { value: "pessimistic", label: "Pessimistic Case" },
    { value: "alternative", label: "Alternative Model" }
  ];

  // Mock parameters for visualization
  const parameters = [
    { value: "porosity", label: "Porosity" },
    { value: "sw", label: "Water Saturation" },
    { value: "permeability", label: "Permeability" },
    { value: "netpay", label: "Net Pay" },
    { value: "vshale", label: "Shale Volume" }
  ];

  // Mock results data
  const resultsData = {
    base: [
      { zone: "Upper Sandstone", netPay: 15.2, avgPorosity: 0.18, avgSw: 0.35, avgPerm: 120.5, stoip: 2.5 },
      { zone: "Middle Shale", netPay: 0.0, avgPorosity: 0.08, avgSw: 0.95, avgPerm: 0.1, stoip: 0.0 },
      { zone: "Lower Carbonate", netPay: 8.5, avgPorosity: 0.12, avgSw: 0.45, avgPerm: 5.2, stoip: 0.8 },
      { zone: "Basement", netPay: 0.0, avgPorosity: 0.03, avgSw: 0.99, avgPerm: 0.01, stoip: 0.0 }
    ],
    optimistic: [
      { zone: "Upper Sandstone", netPay: 18.5, avgPorosity: 0.22, avgSw: 0.28, avgPerm: 180.3, stoip: 3.8 },
      { zone: "Middle Shale", netPay: 0.0, avgPorosity: 0.08, avgSw: 0.95, avgPerm: 0.1, stoip: 0.0 },
      { zone: "Lower Carbonate", netPay: 12.3, avgPorosity: 0.15, avgSw: 0.38, avgPerm: 8.7, stoip: 1.5 },
      { zone: "Basement", netPay: 0.0, avgPorosity: 0.03, avgSw: 0.99, avgPerm: 0.01, stoip: 0.0 }
    ],
    pessimistic: [
      { zone: "Upper Sandstone", netPay: 10.8, avgPorosity: 0.15, avgSw: 0.42, avgPerm: 85.2, stoip: 1.6 },
      { zone: "Middle Shale", netPay: 0.0, avgPorosity: 0.08, avgSw: 0.95, avgPerm: 0.1, stoip: 0.0 },
      { zone: "Lower Carbonate", netPay: 5.2, avgPorosity: 0.10, avgSw: 0.52, avgPerm: 2.8, stoip: 0.4 },
      { zone: "Basement", netPay: 0.0, avgPorosity: 0.03, avgSw: 0.99, avgPerm: 0.01, stoip: 0.0 }
    ],
    alternative: [
      { zone: "Upper Sandstone", netPay: 14.5, avgPorosity: 0.17, avgSw: 0.38, avgPerm: 110.0, stoip: 2.2 },
      { zone: "Middle Shale", netPay: 1.2, avgPorosity: 0.09, avgSw: 0.85, avgPerm: 0.5, stoip: 0.1 },
      { zone: "Lower Carbonate", netPay: 9.8, avgPorosity: 0.13, avgSw: 0.40, avgPerm: 6.5, stoip: 1.0 },
      { zone: "Basement", netPay: 0.0, avgPorosity: 0.03, avgSw: 0.99, avgPerm: 0.01, stoip: 0.0 }
    ]
  };

  // Get current results based on selected scenario
  const currentResults = resultsData[selectedScenario.value] || resultsData.base;

  // Handle scenario change
  const handleScenarioChange = (selected) => {
    setSelectedScenario(selected);
  };

  // Handle parameter change
  const handleParameterChange = (selected) => {
    setSelectedParameter(selected);
  };

  // Toggle display mode
  const toggleDisplayMode = (mode) => {
    setDisplayMode(mode);
  };

  // Calculate totals
  const calculateTotals = () => {
    return {
      netPay: currentResults.reduce((sum, zone) => sum + zone.netPay, 0),
      stoip: currentResults.reduce((sum, zone) => sum + zone.stoip, 0)
    };
  };

  const totals = calculateTotals();

  return (
    <div className="flex flex-col h-full">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-4 p-2 bg-neutral-50 rounded-md">
        <Dropdown
          label="Scenario"
          options={scenarios}
          value={selectedScenario}
          onChange={handleScenarioChange}
        />
        
        <div className="flex items-end space-x-2">
          <Button
            variant={displayMode === "table" ? "primary" : "secondary"}
            size="sm"
            icon="Table"
            onClick={() => toggleDisplayMode("table")}
          >
            Table
          </Button>
          <Button
            variant={displayMode === "chart" ? "primary" : "secondary"}
            size="sm"
            icon="BarChart"
            onClick={() => toggleDisplayMode("chart")}
          >
            Chart
          </Button>
          <Button
            variant={displayMode === "map" ? "primary" : "secondary"}
            size="sm"
            icon="Map"
            onClick={() => toggleDisplayMode("map")}
          >
            Map View
          </Button>
        </div>
        
        {displayMode === "chart" && (
          <Dropdown
            label="Parameter"
            options={parameters}
            value={selectedParameter}
            onChange={handleParameterChange}
          />
        )}
        
        <div className="ml-auto">
          <Button
            variant="secondary"
            size="sm"
            icon="Download"
          >
            Export Results
          </Button>
        </div>
      </div>

      {/* Results Content */}
      <div className="flex-1 border border-neutral-200 rounded-md overflow-hidden min-h-[600px]">
        {displayMode === "table" && (
          <div className="p-4 h-full overflow-auto">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Zone
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Net Pay (m)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Avg. Porosity (v/v)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Avg. Sw (v/v)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Avg. Perm (mD)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      STOIP (MMSTB)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {currentResults.map((row, index) => (
                    <tr 
                      key={index} 
                      className={`${index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'} ${selectedZone && selectedZone.label.includes(row.zone) ? 'bg-primary-50' : ''}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                        {row.zone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                        {row.netPay.toFixed(1)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                        {row.avgPorosity.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                        {row.avgSw.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                        {row.avgPerm.toFixed(1)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                        {row.stoip.toFixed(1)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-neutral-100 font-medium">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      Total
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      {totals.netPay.toFixed(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      -
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      -
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      -
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      {totals.stoip.toFixed(1)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-neutral-200 rounded-md p-4">
                <h3 className="text-sm font-medium mb-3">Volumetric Calculation Parameters</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Formation Volume Factor (Bo):</span>
                    <span className="font-medium">1.25 rb/stb</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Area:</span>
                    <span className="font-medium">500 acres</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Recovery Factor:</span>
                    <span className="font-medium">0.35</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Estimated Recoverable:</span>
                    <span className="font-medium">{(totals.stoip * 0.35).toFixed(1)} MMSTB</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-neutral-200 rounded-md p-4">
                <h3 className="text-sm font-medium mb-3">Scenario Comparison</h3>
                <div className="h-40">
                  <svg width="100%" height="100%" viewBox="0 0 400 150" preserveAspectRatio="none">
                    {/* X and Y axes */}
                    <line x1="50" y1="120" x2="380" y2="120" stroke="#64748b" strokeWidth="1" />
                    <line x1="50" y1="20" x2="50" y2="120" stroke="#64748b" strokeWidth="1" />
                    
                    {/* Bars for each scenario */}
                    <g>
                      <rect x="80" y="50" width="40" height="70" fill="#3b82f6" />
                      <rect x="140" y="30" width="40" height="90" fill="#10b981" />
                      <rect x="200" y="70" width="40" height="50" fill="#ef4444" />
                      <rect x="260" y="55" width="40" height="65" fill="#f59e0b" />
                    </g>
                    
                    {/* X-axis labels */}
                    <text x="100" y="135" textAnchor="middle" fontSize="10" fill="#64748b">Base</text>
                    <text x="160" y="135" textAnchor="middle" fontSize="10" fill="#64748b">Optimistic</text>
                    <text x="220" y="135" textAnchor="middle" fontSize="10" fill="#64748b">Pessimistic</text>
                    <text x="280" y="135" textAnchor="middle" fontSize="10" fill="#64748b">Alternative</text>
                    
                    {/* Y-axis label */}
                    <text x="30" y="70" textAnchor="middle" fontSize="10" fill="#64748b" transform="rotate(-90, 30, 70)">STOIP (MMSTB)</text>
                    
                    {/* Values */}
                    <text x="100" y="45" textAnchor="middle" fontSize="10" fill="#ffffff">3.3</text>
                    <text x="160" y="25" textAnchor="middle" fontSize="10" fill="#ffffff">5.3</text>
                    <text x="220" y="65" textAnchor="middle" fontSize="10" fill="#ffffff">2.0</text>
                    <text x="280" y="50" textAnchor="middle" fontSize="10" fill="#ffffff">3.3</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {displayMode === "chart" && (
          <div className="p-4 h-full">
            <div className="bg-white border border-neutral-200 rounded-md p-4 h-full">
              <h3 className="text-lg font-medium mb-4">{selectedParameter.label} by Zone</h3>
              
              <div className="h-[500px]">
                <svg width="100%" height="100%" viewBox="0 0 800 500" preserveAspectRatio="none">
                  {/* X and Y axes */}
                  <line x1="100" y1="400" x2="700" y2="400" stroke="#64748b" strokeWidth="2" />
                  <line x1="100" y1="50" x2="100" y2="400" stroke="#64748b" strokeWidth="2" />
                  
                  {/* Bars for each zone */}
                  {currentResults.map((zone, index) => {
                    const x = 150 + (index * 150);
                    let value, height, color;
                    
                    switch (selectedParameter.value) {
                      case "porosity":
                        value = zone.avgPorosity;
                        height = value * 1000;
                        color = "#3b82f6";
                        break;
                      case "sw":
                        value = zone.avgSw;
                        height = value * 300;
                        color = "#10b981";
                        break;
                      case "permeability":
                        value = Math.min(zone.avgPerm, 200); // Cap for visualization
                        height = value;
                        color = "#f59e0b";
                        break;
                      case "netpay":
                        value = zone.netPay;
                        height = value * 10;
                        color = "#ef4444";
                        break;
                      case "vshale":
                        // Mock vshale values
                        value = index === 0 ? 0.15 : index === 1 ? 0.85 : index === 2 ? 0.25 : 0.05;
                        height = value * 300;
                        color = "#8b5cf6";
                        break;
                      default:
                        value = 0;
                        height = 0;
                        color = "#64748b";
                    }
                    
                    return (
                      <g key={index}>
                        <rect 
                          x={x - 40} 
                          y={400 - height} 
                          width="80" 
                          height={height} 
                          fill={color} 
                        />
                        <text 
                          x={x} 
                          y={390 - height} 
                          textAnchor="middle" 
                          fontSize="14" 
                          fill="#334155"
                        >
                          {value.toFixed(2)}
                        </text>
                        <text 
                          x={x} 
                          y="430" 
                          textAnchor="middle" 
                          fontSize="12" 
                          fill="#64748b"
                        >
                          {zone.zone}
                        </text>
                      </g>
                    );
                  })}
                  
                  {/* Y-axis label */}
                  <text 
                    x="50" 
                    y="225" 
                    textAnchor="middle" 
                    fontSize="14" 
                    fontWeight="bold" 
                    fill="#334155"
                    transform="rotate(-90, 50, 225)"
                  >
                    {selectedParameter.label}
                  </text>
                </svg>
              </div>
            </div>
          </div>
        )}
        
        {displayMode === "map" && (
          <div className="p-4 h-full">
            <div className="bg-white border border-neutral-200 rounded-md p-4 h-full">
              <h3 className="text-lg font-medium mb-4">Property Distribution Map</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[calc(100%-40px)]">
                <div className="border border-neutral-200 rounded-md overflow-hidden">
                  <div className="bg-neutral-100 p-2 font-medium text-sm">Porosity Distribution</div>
                  <div className="h-[calc(100%-32px)] bg-white p-2 flex items-center justify-center">
                    <div className="text-center text-neutral-400">
                      <Icon name="Map" size={48} className="mx-auto mb-2" />
                      <p>Porosity map would be displayed here</p>
                    </div>
                  </div>
                </div>
                
                <div className="border border-neutral-200 rounded-md overflow-hidden">
                  <div className="bg-neutral-100 p-2 font-medium text-sm">Water Saturation Distribution</div>
                  <div className="h-[calc(100%-32px)] bg-white p-2 flex items-center justify-center">
                    <div className="text-center text-neutral-400">
                      <Icon name="Map" size={48} className="mx-auto mb-2" />
                      <p>Water saturation map would be displayed here</p>
                    </div>
                  </div>
                </div>
                
                <div className="border border-neutral-200 rounded-md overflow-hidden">
                  <div className="bg-neutral-100 p-2 font-medium text-sm">Net Pay Distribution</div>
                  <div className="h-[calc(100%-32px)] bg-white p-2 flex items-center justify-center">
                    <div className="text-center text-neutral-400">
                      <Icon name="Map" size={48} className="mx-auto mb-2" />
                      <p>Net pay map would be displayed here</p>
                    </div>
                  </div>
                </div>
                
                <div className="border border-neutral-200 rounded-md overflow-hidden">
                  <div className="bg-neutral-100 p-2 font-medium text-sm">Permeability Distribution</div>
                  <div className="h-[calc(100%-32px)] bg-white p-2 flex items-center justify-center">
                    <div className="text-center text-neutral-400">
                      <Icon name="Map" size={48} className="mx-auto mb-2" />
                      <p>Permeability map would be displayed here</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPanel;