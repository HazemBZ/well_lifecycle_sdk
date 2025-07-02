import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Dropdown from "../../../components/ui/Dropdown";

const FilterPanel = ({ onClose }) => {
  const [filters, setFilters] = useState({
    templates: [],
    dateRange: null,
    tags: [],
    sharing: [],
  });

  // Mock template options
  const templateOptions = [
    { value: "blank", label: "Blank Workspace" },
    { value: "drilling", label: "Drilling Engineer" },
    { value: "geology", label: "Geologist" },
    { value: "petrophysics", label: "Petrophysicist" },
    { value: "production", label: "Production Engineer" },
    { value: "reservoir", label: "Reservoir Engineer" },
  ];

  // Mock date range options
  const dateRangeOptions = [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "last7days", label: "Last 7 days" },
    { value: "last30days", label: "Last 30 days" },
    { value: "last90days", label: "Last 90 days" },
    { value: "custom", label: "Custom range" },
  ];

  // Mock tag options
  const tagOptions = [
    { value: "drilling", label: "drilling" },
    { value: "real-time", label: "real-time" },
    { value: "production", label: "production" },
    { value: "geology", label: "geology" },
    { value: "petrophysics", label: "petrophysics" },
    { value: "reservoir", label: "reservoir" },
    { value: "simulation", label: "simulation" },
    { value: "well-planning", label: "well-planning" },
    { value: "trajectory", label: "trajectory" },
    { value: "logs", label: "logs" },
    { value: "crossplots", label: "crossplots" },
  ];

  // Mock sharing options
  const sharingOptions = [
    { value: "private", label: "Private" },
    { value: "shared", label: "Shared with me" },
    { value: "myShared", label: "Shared by me" },
    { value: "organization", label: "Organization-wide" },
  ];

  // Handle template filter change
  const handleTemplateChange = (selected) => {
    setFilters({ ...filters, templates: selected || [] });
  };

  // Handle date range filter change
  const handleDateRangeChange = (selected) => {
    setFilters({ ...filters, dateRange: selected });
  };

  // Handle tag filter change
  const handleTagChange = (selected) => {
    setFilters({ ...filters, tags: selected || [] });
  };

  // Handle sharing filter change
  const handleSharingChange = (selected) => {
    setFilters({ ...filters, sharing: selected || [] });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      templates: [],
      dateRange: null,
      tags: [],
      sharing: [],
    });
  };

  // Apply filters
  const applyFilters = () => {
    console.log("Applied filters:", filters);
    // In a real app, this would trigger filtering logic
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
        <h3 className="text-lg font-medium text-neutral-900">Filters</h3>
        <button
          className="p-1.5 rounded-full text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 lg:hidden"
          onClick={onClose}
          aria-label="Close filters"
        >
          <Icon name="X" size={18} />
        </button>
      </div>
      
      {/* Filter options */}
      <div className="p-4 space-y-6">
        {/* Template filter */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Template Type
          </label>
          <Dropdown
            options={templateOptions}
            value={filters.templates}
            onChange={handleTemplateChange}
            placeholder="Select templates"
            multiple
            fullWidth
          />
        </div>
        
        {/* Date range filter */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Modified Date
          </label>
          <Dropdown
            options={dateRangeOptions}
            value={filters.dateRange}
            onChange={handleDateRangeChange}
            placeholder="Any time"
            fullWidth
          />
        </div>
        
        {/* Tags filter */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Tags
          </label>
          <Dropdown
            options={tagOptions}
            value={filters.tags}
            onChange={handleTagChange}
            placeholder="Select tags"
            multiple
            searchable
            fullWidth
          />
        </div>
        
        {/* Sharing filter */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Sharing Status
          </label>
          <Dropdown
            options={sharingOptions}
            value={filters.sharing}
            onChange={handleSharingChange}
            placeholder="Any sharing status"
            multiple
            fullWidth
          />
        </div>
      </div>
      
      {/* Actions */}
      <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-200 flex flex-col sm:flex-row gap-2">
        <Button 
          variant="tertiary" 
          size="sm"
          onClick={clearFilters}
          fullWidth
        >
          Clear All
        </Button>
        <Button 
          variant="primary" 
          size="sm"
          onClick={applyFilters}
          fullWidth
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;