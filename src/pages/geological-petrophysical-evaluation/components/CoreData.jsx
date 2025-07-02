import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Dropdown from "../../../components/ui/Dropdown";
import Image from "../../../components/AppImage";

const CoreData = ({ depthUnit }) => {
  const [selectedCore, setSelectedCore] = useState("core-1");
  const [selectedView, setSelectedView] = useState("photos");
  const [depthMatching, setDepthMatching] = useState({ enabled: false, shift: 0 });

  // Mock core data
  const coreOptions = [
    { value: "core-1", label: "Core #1 (2100-2150m)" },
    { value: "core-2", label: "Core #2 (2200-2250m)" },
    { value: "core-3", label: "Core #3 (2300-2350m)" }
  ];

  // Mock core photos
  const corePhotos = [
    {
      id: "photo-1",
      depth: 2105.5,
      url: "https://images.unsplash.com/photo-1582484258502-d3d3f2d724f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Fine-grained sandstone with cross-bedding"
    },
    {
      id: "photo-2",
      depth: 2110.2,
      url: "https://images.unsplash.com/photo-1582484258511-1f9d6d768f03?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Medium-grained sandstone with oil staining"
    },
    {
      id: "photo-3",
      depth: 2115.8,
      url: "https://images.unsplash.com/photo-1582484258534-6bd234f9f2c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Shaly interval with microfractures"
    },
    {
      id: "photo-4",
      depth: 2120.3,
      url: "https://images.unsplash.com/photo-1582484258521-91adced5a022?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Carbonate nodules in sandstone matrix"
    }
  ];

  // Mock core analysis data
  const coreAnalysisData = [
    { depth: 2105.5, porosity: 18.2, permeability: 120.5, grainDensity: 2.65, lithology: "Sandstone" },
    { depth: 2107.2, porosity: 16.8, permeability: 95.3, grainDensity: 2.66, lithology: "Sandstone" },
    { depth: 2109.1, porosity: 15.4, permeability: 78.2, grainDensity: 2.67, lithology: "Sandstone" },
    { depth: 2111.5, porosity: 14.2, permeability: 45.1, grainDensity: 2.68, lithology: "Silty Sandstone" },
    { depth: 2113.8, porosity: 12.1, permeability: 22.7, grainDensity: 2.69, lithology: "Silty Sandstone" },
    { depth: 2116.2, porosity: 8.5, permeability: 5.3, grainDensity: 2.71, lithology: "Shale" },
    { depth: 2118.7, porosity: 10.2, permeability: 12.8, grainDensity: 2.70, lithology: "Silty Shale" },
    { depth: 2121.3, porosity: 13.5, permeability: 35.6, grainDensity: 2.68, lithology: "Silty Sandstone" }
  ];

  // Handle depth matching adjustment
  const handleDepthShiftChange = (e) => {
    setDepthMatching({
      ...depthMatching,
      shift: parseFloat(e.target.value)
    });
  };

  // Toggle depth matching
  const toggleDepthMatching = () => {
    setDepthMatching({
      ...depthMatching,
      enabled: !depthMatching.enabled
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-4 p-2 bg-neutral-50 rounded-md">
        <Dropdown
          label="Select Core"
          options={coreOptions}
          value={coreOptions.find(option => option.value === selectedCore)}
          onChange={(selected) => setSelectedCore(selected.value)}
        />
        
        <div className="flex items-end space-x-2">
          <Button
            variant={selectedView === "photos" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setSelectedView("photos")}
          >
            Core Photos
          </Button>
          <Button
            variant={selectedView === "analysis" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setSelectedView("analysis")}
          >
            Core Analysis
          </Button>
          <Button
            variant={selectedView === "description" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setSelectedView("description")}
          >
            Description
          </Button>
        </div>
        
        <div className="flex items-end ml-auto">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-neutral-700 flex items-center">
              <input
                type="checkbox"
                checked={depthMatching.enabled}
                onChange={toggleDepthMatching}
                className="mr-2 h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
              />
              Depth Matching
            </label>
            {depthMatching.enabled && (
              <div className="flex items-center">
                <button 
                  className="p-1 bg-neutral-200 rounded-l-md border border-neutral-300"
                  onClick={() => setDepthMatching({...depthMatching, shift: depthMatching.shift - 0.1})}
                >
                  <Icon name="Minus" size={14} />
                </button>
                <input
                  type="number"
                  value={depthMatching.shift}
                  onChange={handleDepthShiftChange}
                  step="0.1"
                  className="w-16 text-center border-y border-neutral-300 py-1"
                />
                <button 
                  className="p-1 bg-neutral-200 rounded-r-md border border-neutral-300"
                  onClick={() => setDepthMatching({...depthMatching, shift: depthMatching.shift + 0.1})}
                >
                  <Icon name="Plus" size={14} />
                </button>
                <span className="ml-1 text-sm text-neutral-600">{depthUnit}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Core Data Content */}
      <div className="flex-1 border border-neutral-200 rounded-md overflow-hidden min-h-[600px]">
        {selectedView === "photos" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 h-full overflow-auto">
            {corePhotos.map(photo => (
              <div key={photo.id} className="border border-neutral-200 rounded-md overflow-hidden bg-white shadow-sm">
                <div className="p-2 bg-neutral-100 border-b border-neutral-200 flex justify-between items-center">
                  <span className="font-medium text-sm">
                    Depth: {(depthMatching.enabled ? photo.depth + depthMatching.shift : photo.depth).toFixed(1)} {depthUnit}
                  </span>
                  <div className="flex space-x-1">
                    <button className="p-1 hover:bg-neutral-200 rounded">
                      <Icon name="ZoomIn" size={14} />
                    </button>
                    <button className="p-1 hover:bg-neutral-200 rounded">
                      <Icon name="Download" size={14} />
                    </button>
                  </div>
                </div>
                <div className="h-64 overflow-hidden">
                  <Image
                    src={photo.url}
                    alt={`Core photo at ${photo.depth}m`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm text-neutral-700">{photo.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedView === "analysis" && (
          <div className="p-4 h-full overflow-auto">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Depth ({depthUnit})
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Porosity (%)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Permeability (mD)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Grain Density (g/cc)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Lithology
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {coreAnalysisData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                        {(depthMatching.enabled ? row.depth + depthMatching.shift : row.depth).toFixed(1)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                        {row.porosity.toFixed(1)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                        {row.permeability.toFixed(1)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                        {row.grainDensity.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                        {row.lithology}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Simple visualization */}
            <div className="mt-6 border border-neutral-200 rounded-md p-4">
              <h3 className="text-sm font-medium mb-4">Core Analysis Visualization</h3>
              <div className="h-64 relative">
                <div className="absolute inset-0">
                  <svg width="100%" height="100%" viewBox="0 0 800 300" preserveAspectRatio="none">
                    {/* X and Y axes */}
                    <line x1="50" y1="250" x2="750" y2="250" stroke="#64748b" strokeWidth="2" />
                    <line x1="50" y1="50" x2="50" y2="250" stroke="#64748b" strokeWidth="2" />
                    
                    {/* Porosity data points and line */}
                    <g>
                      {coreAnalysisData.map((point, i) => {
                        const x = 50 + (i * 700 / (coreAnalysisData.length - 1));
                        const y = 250 - (point.porosity * 10);
                        return (
                          <circle key={i} cx={x} cy={y} r="4" fill="#3b82f6" />
                        );
                      })}
                      <polyline
                        points={coreAnalysisData.map((point, i) => {
                          const x = 50 + (i * 700 / (coreAnalysisData.length - 1));
                          const y = 250 - (point.porosity * 10);
                          return `${x},${y}`;
                        }).join(' ')}
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2"
                      />
                    </g>
                    
                    {/* Permeability data points and line (using log scale) */}
                    <g>
                      {coreAnalysisData.map((point, i) => {
                        const x = 50 + (i * 700 / (coreAnalysisData.length - 1));
                        const y = 250 - (Math.log10(point.permeability) * 25);
                        return (
                          <circle key={i} cx={x} cy={y} r="4" fill="#ef4444" />
                        );
                      })}
                      <polyline
                        points={coreAnalysisData.map((point, i) => {
                          const x = 50 + (i * 700 / (coreAnalysisData.length - 1));
                          const y = 250 - (Math.log10(point.permeability) * 25);
                          return `${x},${y}`;
                        }).join(' ')}
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="2"
                      />
                    </g>
                    
                    {/* X-axis labels (depth) */}
                    {coreAnalysisData.map((point, i) => {
                      if (i % 2 === 0) {
                        const x = 50 + (i * 700 / (coreAnalysisData.length - 1));
                        return (
                          <text key={i} x={x} y="270" textAnchor="middle" fontSize="10" fill="#64748b">
                            {(depthMatching.enabled ? point.depth + depthMatching.shift : point.depth).toFixed(1)}
                          </text>
                        );
                      }
                      return null;
                    })}
                    
                    {/* Legend */}
                    <rect x="600" y="30" width="140" height="50" fill="white" stroke="#e2e8f0" />
                    <circle cx="620" cy="45" r="4" fill="#3b82f6" />
                    <text x="630" y="48" fontSize="10" fill="#64748b">Porosity (%)</text>
                    <circle cx="620" cy="65" r="4" fill="#ef4444" />
                    <text x="630" y="68" fontSize="10" fill="#64748b">Permeability (mD, log scale)</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === "description" && (
          <div className="p-4 h-full overflow-auto">
            <div className="bg-white border border-neutral-200 rounded-md p-4">
              <h3 className="text-lg font-medium mb-2">Core Description</h3>
              <p className="text-sm text-neutral-700 mb-4">
                Core #1 (2100-2150m) - Recovered 48.5m (97%)
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-md font-medium mb-1">Interval: 2100-2110m</h4>
                  <p className="text-sm text-neutral-700">
                    Fine to medium-grained sandstone, well-sorted, with occasional cross-bedding. 
                    Moderate to good visible porosity. Oil staining present throughout, with stronger 
                    staining in coarser intervals. Occasional thin (1-2cm) shale laminations.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-md font-medium mb-1">Interval: 2110-2120m</h4>
                  <p className="text-sm text-neutral-700">
                    Interbedded fine-grained sandstone and silty shale. Sandstone intervals show 
                    ripple laminations and moderate visible porosity. Shale intervals are dark gray, 
                    fissile, with occasional siderite nodules. Microfractures observed in shaly sections, 
                    some filled with calcite.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-md font-medium mb-1">Interval: 2120-2130m</h4>
                  <p className="text-sm text-neutral-700">
                    Medium to coarse-grained sandstone with occasional granule-sized clasts. 
                    Poorly sorted in places. Strong oil staining throughout. Calcite cementation 
                    observed in patches, reducing visible porosity. Occasional stylolites and 
                    dissolution features.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-md font-medium mb-1">Interval: 2130-2140m</h4>
                  <p className="text-sm text-neutral-700">
                    Predominantly shale with thin siltstone interbeds. Shale is dark gray to black, 
                    fissile, with occasional pyrite nodules. Siltstone interbeds show ripple laminations 
                    and bioturbation. No visible porosity or oil staining in this interval.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-md font-medium mb-1">Interval: 2140-2150m</h4>
                  <p className="text-sm text-neutral-700">
                    Fine-grained sandstone grading to siltstone. Moderate sorting, with occasional 
                    clay clasts. Faint oil staining in sandier portions. Calcite cementation common, 
                    reducing visible porosity. Bioturbation increases toward the base of the interval.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 border-t border-neutral-200 pt-4">
                <h4 className="text-md font-medium mb-2">Depositional Environment Interpretation</h4>
                <p className="text-sm text-neutral-700">
                  The succession represents a progradational deltaic sequence, transitioning from 
                  prodelta muds (2130-2140m) to delta front (2110-2130m) and distributary channel 
                  deposits (2100-2110m). The presence of cross-bedding, ripple laminations, and 
                  the overall coarsening-upward trend supports this interpretation. Periodic 
                  abandonment surfaces are marked by thin shale drapes.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoreData;