import React, { useState } from "react";

import Button from "../../../components/ui/Button";
import Dropdown from "../../../components/ui/Dropdown";

const CurveSelector = ({ tracks, onAddCurve }) => {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedCurve, setSelectedCurve] = useState(null);
  const [isAddingCurve, setIsAddingCurve] = useState(false);

  // Mock available curves
  const availableCurves = [
    { id: "gr", value: "gr", label: "Gamma Ray (GR)", unit: "API", min: 0, max: 150, color: "#FF0000" },
    { id: "rt", value: "rt", label: "Deep Resistivity (RT)", unit: "ohm-m", min: 0.2, max: 2000, color: "#0000FF" },
    { id: "rshal", value: "rshal", label: "Shallow Resistivity (RSHAL)", unit: "ohm-m", min: 0.2, max: 2000, color: "#00AAFF" },
    { id: "rhob", value: "rhob", label: "Bulk Density (RHOB)", unit: "g/cc", min: 1.95, max: 2.95, color: "#FF0000" },
    { id: "nphi", value: "nphi", label: "Neutron Porosity (NPHI)", unit: "v/v", min: -0.15, max: 0.45, color: "#0000FF" },
    { id: "dt", value: "dt", label: "Sonic Travel Time (DT)", unit: "us/ft", min: 40, max: 140, color: "#00AA00" },
    { id: "pef", value: "pef", label: "Photoelectric Factor (PEF)", unit: "b/e", min: 0, max: 10, color: "#AA00AA" },
    { id: "caliper", value: "caliper", label: "Caliper (CALI)", unit: "in", min: 6, max: 16, color: "#000000" },
    { id: "sp", value: "sp", label: "Spontaneous Potential (SP)", unit: "mV", min: -100, max: 100, color: "#008800" },
  ];

  // Get track options for dropdown
  const trackOptions = tracks.map(track => ({
    value: track.id,
    label: track.name
  }));

  // Handle track selection
  const handleTrackSelect = (option) => {
    setSelectedTrack(option);
  };

  // Handle curve selection
  const handleCurveSelect = (option) => {
    setSelectedCurve(option);
  };

  // Handle add curve to track
  const handleAddCurve = () => {
    if (!selectedTrack || !selectedCurve) return;
    
    const track = tracks.find(t => t.id === selectedTrack.value);
    if (!track) return;
    
    // Check if curve already exists in track
    if (track.curves.some(c => c.id === selectedCurve.id)) {
      alert(`Curve ${selectedCurve.label} already exists in track ${track.name}`);
      return;
    }
    
    const curve = availableCurves.find(c => c.id === selectedCurve.id);
    if (!curve) return;
    
    // Generate mock data for the curve
    const data = generateMockCurveData(8000, 8500, curve.min, curve.max);
    
    const newCurve = {
      ...curve,
      data
    };
    
    onAddCurve(selectedTrack.value, newCurve);
    setIsAddingCurve(false);
    setSelectedTrack(null);
    setSelectedCurve(null);
  };

  // Function to generate mock curve data
  function generateMockCurveData(startDepth, endDepth, minValue, maxValue) {
    const data = [];
    const step = 0.5; // Half-foot increments
    
    for (let depth = startDepth; depth <= endDepth; depth += step) {
      // Generate a somewhat realistic curve with some noise and trends
      const baseValue = minValue + (Math.sin(depth / 50) + 1) * (maxValue - minValue) / 2;
      const noise = (Math.random() - 0.5) * (maxValue - minValue) * 0.1;
      data.push({
        depth,
        value: Math.max(minValue, Math.min(maxValue, baseValue + noise))
      });
    }
    
    return data;
  }

  // Filter out curves that are already in all tracks
  const getFilteredCurves = () => {
    const usedCurveIds = new Set();
    tracks.forEach(track => {
      track.curves.forEach(curve => {
        usedCurveIds.add(curve.id);
      });
    });
    
    return availableCurves
      .filter(curve => !usedCurveIds.has(curve.id))
      .map(curve => ({
        value: curve.id,
        label: curve.label,
        id: curve.id
      }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-sm font-medium text-neutral-900">Curve Library</h4>
        <Button
          variant="tertiary"
          size="sm"
          icon="Plus"
          onClick={() => setIsAddingCurve(true)}
          disabled={tracks.length === 0}
        >
          Add Curve
        </Button>
      </div>

      {/* Add curve form */}
      {isAddingCurve && (
        <div className="mb-4 p-3 bg-neutral-50 rounded-md border border-neutral-200">
          <h5 className="text-sm font-medium mb-2">Add Curve to Track</h5>
          <div className="mb-2">
            <label className="block text-xs text-neutral-500 mb-1">Select Track</label>
            <Dropdown
              options={trackOptions}
              value={selectedTrack}
              onChange={handleTrackSelect}
              placeholder="Select a track"
              fullWidth
            />
          </div>
          <div className="mb-3">
            <label className="block text-xs text-neutral-500 mb-1">Select Curve</label>
            <Dropdown
              options={getFilteredCurves()}
              value={selectedCurve}
              onChange={handleCurveSelect}
              placeholder="Select a curve"
              fullWidth
              disabled={!selectedTrack}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="tertiary"
              size="sm"
              onClick={() => {
                setIsAddingCurve(false);
                setSelectedTrack(null);
                setSelectedCurve(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleAddCurve}
              disabled={!selectedTrack || !selectedCurve}
            >
              Add
            </Button>
          </div>
        </div>
      )}

      {/* Curve library */}
      <div className="grid grid-cols-1 gap-2">
        {availableCurves.map((curve) => (
          <div
            key={curve.id}
            className="p-2 bg-white rounded-md border border-neutral-200 flex items-center"
          >
            <div
              className="w-3 h-3 rounded-full mr-2 flex-shrink-0"
              style={{ backgroundColor: curve.color }}
            ></div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium truncate">{curve.label}</div>
              <div className="text-xs text-neutral-500">
                {curve.min} - {curve.max} {curve.unit}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurveSelector;