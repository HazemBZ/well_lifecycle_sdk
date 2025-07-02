import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Dropdown from "../../../components/ui/Dropdown";

const WellSelector = ({ 
  wells, 
  selectedWell, 
  selectedWells, 
  onSelectWell, 
  onRemoveWell 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-neutral-700 mb-1">
        Well Selection
      </label>
      
      <Dropdown
        placeholder="Select a well"
        options={wells}
        value={selectedWell}
        onChange={onSelectWell}
        icon="CircleDot"
        searchable={true}
      />
      
      {/* Selected wells display */}
      {selectedWells.length > 0 && (
        <div className="mt-3">
          <div className="text-xs font-medium text-neutral-500 mb-1">
            Selected Wells ({selectedWells.length})
          </div>
          <div className="space-y-1">
            {selectedWells.map((well) => (
              <div 
                key={well.value} 
                className={`flex items-center justify-between px-3 py-1.5 rounded-md text-sm ${
                  selectedWell && selectedWell.value === well.value
                    ? "bg-primary-50 text-primary-700" :"bg-neutral-50 text-neutral-700"
                }`}
              >
                <div className="flex items-center">
                  <Icon name="CircleDot" size={16} className="mr-2 text-primary-600" />
                  <span>{well.label}</span>
                </div>
                <button
                  className="text-neutral-400 hover:text-neutral-600"
                  onClick={() => onRemoveWell(well)}
                >
                  <Icon name="X" size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WellSelector;