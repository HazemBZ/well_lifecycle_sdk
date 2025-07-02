import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Dropdown from "../../../components/ui/Dropdown";

const TimeDepthPlot = () => {
  const [plotType, setPlotType] = useState("time");
  const [selectedParameters, setSelectedParameters] = useState(["ROP", "WOB"]);
  const [cursorPosition, setCursorPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  // Mock parameters
  const parameters = [
    { value: "ROP", label: "Rate of Penetration", color: "#3b82f6" },
    { value: "WOB", label: "Weight on Bit", color: "#ef4444" },
    { value: "RPM", label: "Rotations Per Minute", color: "#10b981" },
    { value: "Torque", label: "Torque", color: "#f59e0b" },
    { value: "SPP", label: "Standpipe Pressure", color: "#8b5cf6" },
    { value: "Flow", label: "Flow Rate", color: "#0ea5e9" },
  ];

  // Plot type options
  const plotTypeOptions = [
    { value: "time", label: "Time-based" },
    { value: "depth", label: "Depth-based" },
  ];

  // Generate mock data
  useEffect(() => {
    const generateData = () => {
      const mockData = [];
      const now = new Date();
      const depthStart = 1000;
      
      for (let i = 0; i < 100; i++) {
        const time = new Date(now.getTime() - (99 - i) * 15 * 60000);
        const depth = depthStart + i * 2;
        
        mockData.push({
          time: time.toISOString(),
          depth,
          ROP: 15 + Math.sin(i / 10) * 5 + Math.random() * 2,
          WOB: 20 + Math.cos(i / 8) * 7 + Math.random() * 3,
          RPM: 120 + Math.sin(i / 12) * 20 + Math.random() * 5,
          Torque: 8000 + Math.cos(i / 15) * 1000 + Math.random() * 200,
          SPP: 2500 + Math.sin(i / 20) * 300 + Math.random() * 100,
          Flow: 600 + Math.cos(i / 18) * 50 + Math.random() * 20,
        });
      }
      
      setData(mockData);
      setIsLoading(false);
    };

    const timer = setTimeout(() => {
      generateData();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle parameter selection
  const handleParameterToggle = (param) => {
    if (selectedParameters.includes(param)) {
      setSelectedParameters(selectedParameters.filter(p => p !== param));
    } else {
      setSelectedParameters([...selectedParameters, param]);
    }
  };

  // Format X-axis ticks
  const formatXAxis = (value) => {
    if (plotType === "time") {
      const date = new Date(value);
      return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    }
    return value;
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-neutral-200 shadow-md rounded-md">
          <p className="font-medium text-neutral-900">
            {plotType === "time" 
              ? new Date(label).toLocaleTimeString() 
              : `Depth: ${label} m`}
          </p>
          <div className="mt-2">
            {payload.map((entry, index) => (
              <p key={index} style={{ color: entry.color }} className="text-sm">
                {`${entry.name}: ${entry.value.toFixed(2)} ${getUnitForParameter(entry.name)}`}
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  // Get unit for parameter
  const getUnitForParameter = (param) => {
    switch (param) {
      case "ROP": return "m/hr";
      case "WOB": return "tons";
      case "RPM": return "rpm";
      case "Torque": return "ft-lbs";
      case "SPP": return "psi";
      case "Flow": return "gpm";
      default: return "";
    }
  };

  // Handle mouse move on chart
  const handleMouseMove = (e) => {
    if (e && e.activeCoordinate) {
      setCursorPosition(e.activeCoordinate.x);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-neutral-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-neutral-200 flex flex-wrap items-center justify-between">
        <h2 className="text-lg font-medium text-neutral-900">
          {plotType === "time" ? "Time-based Plot" : "Depth-based Plot"}
        </h2>
        <div className="flex items-center space-x-2">
          <Dropdown
            options={plotTypeOptions}
            value={plotTypeOptions.find(option => option.value === plotType)}
            onChange={(option) => setPlotType(option.value)}
            placeholder="Select Plot Type"
          />
          <Button
            variant="ghost"
            icon="Maximize2"
            title="Expand"
          />
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {parameters.map((param) => (
            <button
              key={param.value}
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                selectedParameters.includes(param.value)
                  ? `bg-${param.value.toLowerCase()}-100 text-${param.value.toLowerCase()}-800`
                  : "bg-neutral-100 text-neutral-600"
              }`}
              style={{
                backgroundColor: selectedParameters.includes(param.value) 
                  ? `${param.color}20` 
                  : undefined,
                color: selectedParameters.includes(param.value) 
                  ? param.color 
                  : undefined,
              }}
              onClick={() => handleParameterToggle(param.value)}
            >
              {selectedParameters.includes(param.value) && (
                <Icon name="Check" size={14} className="mr-1" />
              )}
              {param.label}
            </button>
          ))}
        </div>
        
        <div className="h-80">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                onMouseMove={handleMouseMove}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey={plotType === "time" ? "time" : "depth"} 
                  tickFormatter={formatXAxis}
                  label={{ 
                    value: plotType === "time" ? "Time" : "Depth (m)", 
                    position: "insideBottomRight", 
                    offset: -5 
                  }}
                />
                <YAxis 
                  yAxisId="left"
                  orientation="left"
                  label={{ 
                    value: "Primary Parameters", 
                    angle: -90, 
                    position: "insideLeft" 
                  }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  label={{ 
                    value: "Secondary Parameters", 
                    angle: 90, 
                    position: "insideRight" 
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                
                {selectedParameters.includes("ROP") && (
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="ROP" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                )}
                
                {selectedParameters.includes("WOB") && (
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="WOB" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                )}
                
                {selectedParameters.includes("RPM") && (
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="RPM" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                )}
                
                {selectedParameters.includes("Torque") && (
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="Torque" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                )}
                
                {selectedParameters.includes("SPP") && (
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="SPP" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                )}
                
                {selectedParameters.includes("Flow") && (
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="Flow" 
                    stroke="#0ea5e9" 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                )}
                
                {cursorPosition && (
                  <ReferenceLine x={cursorPosition} stroke="#64748b" strokeDasharray="3 3" />
                )}
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
        
        <div className="mt-4 flex items-center justify-between text-sm text-neutral-500">
          <div>
            <span className="font-medium">Synchronized cursor enabled</span> - Move cursor to correlate data across plots
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              icon="ZoomIn"
              title="Zoom In"
            />
            <Button
              variant="ghost"
              size="sm"
              icon="ZoomOut"
              title="Zoom Out"
            />
            <Button
              variant="ghost"
              size="sm"
              icon="RefreshCw"
              title="Reset Zoom"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeDepthPlot;