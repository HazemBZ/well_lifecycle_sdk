import React, { forwardRef, useState } from 'react';
import Icon from '../AppIcon';

const InputWithUnit = forwardRef(({
  label,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  error,
  success,
  helperText,
  disabled = false,
  readOnly = false,
  required = false,
  fullWidth = true,
  id,
  name,
  autoFocus = false,
  type = 'text',
  unit,
  units = [],
  onUnitChange,
  className = '',
  inputClassName = '',
  labelClassName = '',
  helperTextClassName = '',
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [localValue, setLocalValue] = useState(value || '');
  const [isUnitDropdownOpen, setIsUnitDropdownOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(unit || (units.length > 0 ? units[0] : ''));
  
  // Generate a unique ID if not provided
  const inputId = id || `input-unit-${Math.random().toString(36).substring(2, 9)}`;
  
  // Handle input change
  const handleChange = (e) => {
    setLocalValue(e.target.value);
    if (onChange) onChange(e);
  };
  
  // Handle focus
  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };
  
  // Handle blur
  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };
  
  // Handle unit selection
  const handleUnitSelect = (unit) => {
    setSelectedUnit(unit);
    setIsUnitDropdownOpen(false);
    
    if (onUnitChange) {
      onUnitChange(unit);
    }
  };
  
  // Toggle unit dropdown
  const toggleUnitDropdown = () => {
    if (!disabled && !readOnly) {
      setIsUnitDropdownOpen(!isUnitDropdownOpen);
    }
  };
  
  // Close dropdown when clicking outside
  const handleClickOutside = () => {
    setIsUnitDropdownOpen(false);
  };
  
  // Determine container classes
  const containerClasses = `
    ${fullWidth ? 'w-full' : 'w-auto'}
    ${className}
  `;
  
  // Determine input wrapper classes
  const inputWrapperClasses = `
    relative flex items-center overflow-hidden
  `;
  
  // Determine input classes
  const inputClasses = `
    block w-full rounded-md rounded-r-none px-3 py-2 
    ${error ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}
    ${success ? 'border-success-500 focus:border-success-500 focus:ring-success-500' : ''}
    ${!error && !success ? 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500' : ''}
    ${disabled ? 'bg-neutral-100 text-neutral-500 cursor-not-allowed' : 'bg-white text-neutral-900'}
    shadow-sm focus:outline-none focus:ring-1
    ${inputClassName}
  `;
  
  // Determine unit selector classes
  const unitSelectorClasses = `
    flex items-center justify-center px-3 py-2 border border-l-0 rounded-md rounded-l-none
    ${error ? 'border-error-500 bg-error-50 text-error-700' : ''}
    ${success ? 'border-success-500 bg-success-50 text-success-700' : ''}
    ${!error && !success ? 'border-neutral-300 bg-neutral-100 text-neutral-700' : ''}
    ${disabled ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed' : 'cursor-pointer hover:bg-neutral-200'}
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
    <div className={containerClasses}>
      {label && (
        <label 
          htmlFor={inputId} 
          className={`block mb-1 text-sm font-medium text-neutral-700 ${labelClassName}`}
        >
          {label}
          {required && <span className="ml-1 text-error-500">*</span>}
        </label>
      )}
      
      <div className={inputWrapperClasses}>
        <input
          ref={ref}
          id={inputId}
          type={type}
          name={name}
          value={value !== undefined ? value : localValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          autoFocus={autoFocus}
          className={inputClasses}
          {...props}
        />
        
        {units.length > 0 ? (
          <div className="relative">
            <div 
              className={unitSelectorClasses}
              onClick={toggleUnitDropdown}
            >
              <span className="mr-1">{selectedUnit}</span>
              <Icon name="ChevronDown" size={16} />
            </div>
            
            {isUnitDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={handleClickOutside}
                />
                <div className="absolute right-0 mt-1 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {units.map((unit, index) => (
                      <button
                        key={index}
                        className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                        onClick={() => handleUnitSelect(unit)}
                        role="menuitem"
                      >
                        {unit}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className={unitSelectorClasses}>
            <span>{selectedUnit}</span>
          </div>
        )}
      </div>
      
      {helperText && (
        <p className={helperTextClasses}>{helperText}</p>
      )}
    </div>
  );
});

export default InputWithUnit;