import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const MultiSelect = ({
  label,
  placeholder = 'Select options',
  options = [],
  value = [],
  onChange,
  onFocus,
  onBlur,
  error,
  success,
  helperText,
  disabled = false,
  required = false,
  fullWidth = true,
  id,
  name,
  searchable = true,
  clearable = true,
  icon,
  maxItems,
  className = '',
  dropdownClassName = '',
  labelClassName = '',
  helperTextClassName = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  
  // Generate a unique ID if not provided
  const multiSelectId = id || `multi-select-${Math.random().toString(36).substring(2, 9)}`;
  
  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);
  
  // Toggle dropdown
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setSearchValue('');
      
      if (onFocus && !isOpen) {
        onFocus();
      } else if (onBlur && isOpen) {
        onBlur();
      }
    }
  };
  
  // Handle option selection
  const handleSelect = (option) => {
    const isSelected = value.some(item => item.value === option.value);
    let newValue;
    
    if (isSelected) {
      newValue = value.filter(item => item.value !== option.value);
    } else {
      if (maxItems && value.length >= maxItems) {
        return;
      }
      newValue = [...value, option];
    }
    
    if (onChange) {
      onChange(newValue);
    }
  };
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  
  // Clear all selections
  const handleClearAll = (e) => {
    e.stopPropagation();
    if (onChange) {
      onChange([]);
    }
  };
  
  // Remove a selected item
  const handleRemoveItem = (e, optionValue) => {
    e.stopPropagation();
    const newValue = value.filter(item => item.value !== optionValue);
    if (onChange) {
      onChange(newValue);
    }
  };
  
  // Filter options based on search value
  const filteredOptions = searchValue
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchValue.toLowerCase()))
    : options;
  
  // Check if an option is selected
  const isSelected = (option) => {
    return value.some(item => item.value === option.value);
  };
  
  // Determine container classes
  const containerClasses = `
    ${fullWidth ? 'w-full' : 'w-auto'}
    ${className}
  `;
  
  // Determine dropdown button classes
  const dropdownButtonClasses = `
    flex items-start justify-between w-full px-3 py-2 text-left rounded-md border shadow-sm min-h-[42px]
    ${error ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}
    ${success ? 'border-success-500 focus:border-success-500 focus:ring-success-500' : ''}
    ${!error && !success ? 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500' : ''}
    ${disabled ? 'bg-neutral-100 text-neutral-500 cursor-not-allowed' : 'bg-white text-neutral-900 cursor-pointer hover:bg-neutral-50'}
    focus:outline-none focus:ring-1
  `;
  
  // Determine dropdown menu classes
  const dropdownMenuClasses = `
    absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none
    ${dropdownClassName}
  `;
  
  // Determine helper text classes
  const helperTextClasses = `
    mt-1 text-sm
    ${error ? 'text-error-500' : ''}
    ${success ? 'text-success-500' : ''}
    ${!error && !success ? 'text-neutral-500' : ''}
    ${helperTextClassName}
  `;

  return (
    <div className={containerClasses} ref={dropdownRef}>
      {label && (
        <label 
          htmlFor={multiSelectId} 
          className={`block mb-1 text-sm font-medium text-neutral-700 ${labelClassName}`}
        >
          {label}
          {required && <span className="ml-1 text-error-500">*</span>}
          {maxItems && <span className="ml-1 text-neutral-500 text-xs">({value.length}/{maxItems})</span>}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          id={multiSelectId}
          className={dropdownButtonClasses}
          onClick={toggleDropdown}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          {...props}
        >
          <div className="flex flex-wrap gap-1 flex-1">
            {value.length === 0 ? (
              <span className="text-neutral-500">{placeholder}</span>
            ) : (
              value.map((item) => (
                <span 
                  key={item.value} 
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                >
                  {item.label}
                  <button
                    type="button"
                    className="ml-1 text-primary-600 hover:text-primary-800 focus:outline-none"
                    onClick={(e) => handleRemoveItem(e, item.value)}
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              ))
            )}
          </div>
          <div className="flex items-center ml-2">
            {clearable && value.length > 0 && (
              <button
                type="button"
                className="text-neutral-400 hover:text-neutral-500 mr-1"
                onClick={handleClearAll}
              >
                <Icon name="X" size={16} />
              </button>
            )}
            <Icon name="ChevronDown" size={18} className="text-neutral-500" />
          </div>
        </button>
        
        {isOpen && (
          <div className={dropdownMenuClasses} role="listbox" aria-multiselectable="true">
            {searchable && (
              <div className="sticky top-0 p-2 bg-white border-b border-neutral-200">
                <input
                  ref={searchInputRef}
                  type="text"
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={handleSearchChange}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            
            {filteredOptions.length === 0 ? (
              <div className="py-2 px-3 text-sm text-neutral-500 text-center">
                No options available
              </div>
            ) : (
              <ul className="py-1">
                {filteredOptions.map((option) => (
                  <li
                    key={option.value}
                    className={`
                      px-3 py-2 text-sm cursor-pointer flex items-center justify-between
                      ${isSelected(option) ? 'bg-primary-50 text-primary-900' : 'text-neutral-900 hover:bg-neutral-100'}
                      ${maxItems && value.length >= maxItems && !isSelected(option) ? 'opacity-50 pointer-events-none' : ''}
                    `}
                    onClick={() => handleSelect(option)}
                    role="option"
                    aria-selected={isSelected(option)}
                  >
                    <div className="flex items-center">
                      <div className="mr-2 flex items-center justify-center w-5 h-5">
                        {isSelected(option) ? (
                          <Icon name="CheckSquare" size={18} className="text-primary-600" />
                        ) : (
                          <Icon name="Square" size={18} className="text-neutral-400" />
                        )}
                      </div>
                      {option.icon && (
                        <span className="mr-2">
                          {typeof option.icon === 'string' ? (
                            <Icon name={option.icon} size={18} />
                          ) : (
                            option.icon
                          )}
                        </span>
                      )}
                      <span className="block truncate">{option.label}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      
      {helperText && (
        <p className={helperTextClasses}>{helperText}</p>
      )}
    </div>
  );
};

export default MultiSelect;