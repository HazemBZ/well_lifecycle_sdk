import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Dropdown from "../../../components/ui/Dropdown";

const FilterPanel = ({ onClose }) => {
  const [filters, setFilters] = useState({
    timeRange: { start: "", end: "" },
    depthRange: { start: "", end: "" },
    parameters: [],
    activities: [],
    formations: [],
  });
  
  // Mock parameter options
  const parameterOptions = [
    { value: "rop", label: "Rate of Penetration" },
    { value: "wob", label: "Weight on Bit" },
    { value: "rpm", label: "Rotations Per Minute" },
    { value: "torque", label: "Torque" },
    { value: "spp", label: "Standpipe Pressure" },
    { value: "flow", label: "Flow Rate" },
    { value: "hookload", label: "Hookload" },
    { value: "mse", label: "Mechanical Specific Energy" },
  ];
  
  // Mock activity options
  const activityOptions = [
    { value: "drilling", label: "Drilling" },
    { value: "tripping", label: "Tripping" },
    { value: "circulation", label: "Circulation" },
    { value: "connection", label: "Connection" },
    { value: "survey", label: "Survey" },
    { value: "wiper_trip", label: "Wiper Trip" },
    { value: "bha_change", label: "BHA Change" },
    { value: "casing", label: "Casing" },
  ];
  
  // Mock formation options
  const formationOptions = [
    { value: "sandstone", label: "Sandstone" },
    { value: "shale", label: "Shale" },
    { value: "limestone", label: "Limestone" },
    { value: "dolomite", label: "Dolomite" },
    { value: "coal", label: "Coal" },
    { value: "salt", label: "Salt" },
  ];
  
  // Handle input change
  const handleInputChange = (section, field, value) => {
    setFilters({
      ...filters,
      [section]: {
        ...filters[section],
        [field]: value,
      },
    });
  };
  
  // Handle dropdown change
  const handleDropdownChange = (field, value) => {
    setFilters({
      ...filters,
      [field]: value,
    });
  };
  
  // Apply filters
  const applyFilters = () => {
    console.log("Applied filters:", filters);
    onClose();
  };
  
  // Reset filters
  const resetFilters = () => {
    setFilters({
      timeRange: { start: "", end: "" },
      depthRange: { start: "", end: "" },
      parameters: [],
      activities: [],
      formations: [],
    });
  };
  
  return (
    <div className="bg-white border-b border-neutral-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-neutral-900">Advanced Filters</h3>
        <button
          className="text-neutral-500 hover:text-neutral-700"
          onClick={onClose}
        >
          <Icon name="X" size={20} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Time Range */}
        <div>
          <h4 className="text-sm font-medium text-neutral-700 mb-2">Time Range</h4>
          <div className="space-y-3">
            <div>
              <label htmlFor="time-start" className="block text-xs text-neutral-500">Start Time</label>
              <input
                type="datetime-local"
                id="time-start"
                className="mt-1 block w-full border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                value={filters.timeRange.start}
                onChange={(e) => handleInputChange("timeRange", "start", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="time-end" className="block text-xs text-neutral-500">End Time</label>
              <input
                type="datetime-local"
                id="time-end"
                className="mt-1 block w-full border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                value={filters.timeRange.end}
                onChange={(e) => handleInputChange("timeRange", "end", e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {/* Depth Range */}
        <div>
          <h4 className="text-sm font-medium text-neutral-700 mb-2">Depth Range</h4>
          <div className="space-y-3">
            <div>
              <label htmlFor="depth-start" className="block text-xs text-neutral-500">Start Depth (m)</label>
              <input
                type="number"
                id="depth-start"
                className="mt-1 block w-full border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="0"
                value={filters.depthRange.start}
                onChange={(e) => handleInputChange("depthRange", "start", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="depth-end" className="block text-xs text-neutral-500">End Depth (m)</label>
              <input
                type="number"
                id="depth-end"
                className="mt-1 block w-full border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="5000"
                value={filters.depthRange.end}
                onChange={(e) => handleInputChange("depthRange", "end", e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {/* Parameters */}
        <div>
          <h4 className="text-sm font-medium text-neutral-700 mb-2">Parameters</h4>
          <Dropdown
            options={parameterOptions}
            value={filters.parameters}
            onChange={(value) => handleDropdownChange("parameters", value)}
            placeholder="Select Parameters"
            multiple
          />
        </div>
        
        {/* Activities */}
        <div>
          <h4 className="text-sm font-medium text-neutral-700 mb-2">Activities</h4>
          <Dropdown
            options={activityOptions}
            value={filters.activities}
            onChange={(value) => handleDropdownChange("activities", value)}
            placeholder="Select Activities"
            multiple
          />
        </div>
        
        {/* Formations */}
        <div>
          <h4 className="text-sm font-medium text-neutral-700 mb-2">Formations</h4>
          <Dropdown
            options={formationOptions}
            value={filters.formations}
            onChange={(value) => handleDropdownChange("formations", value)}
            placeholder="Select Formations"
            multiple
          />
        </div>
        
        {/* Additional Filters */}
        <div>
          <h4 className="text-sm font-medium text-neutral-700 mb-2">Additional Filters</h4>
          <div className="space-y-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="rounded border-neutral-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-neutral-700">Show only alerts</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="rounded border-neutral-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-neutral-700">Show only non-productive time</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="rounded border-neutral-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-neutral-700">Show only drilling operations</span>
            </label>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end space-x-3">
        <Button
          variant="ghost"
          onClick={resetFilters}
        >
          Reset
        </Button>
        <Button
          variant="secondary"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          icon="Filter"
          onClick={applyFilters}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;