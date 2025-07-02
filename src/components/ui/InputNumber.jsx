import React, { forwardRef, useState } from 'react';
import Icon from '../AppIcon';

const InputNumber = forwardRef(({
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
  min,
  max,
  step = 1,
  showControls = true,
  unit,
  className = '',
  inputClassName = '',
  labelClassName = '',
  helperTextClassName = '',
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [localValue, setLocalValue] = useState(value !== undefined ? value : '');
  
  // Generate a unique ID if not provided
  const inputId = id || `input-number-${Math.random().toString(36).substring(2, 9)}`;
  
  // Handle input change
  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    if (onChange) onChange(e);
  };
  
  // Handle increment
  const handleIncrement = () => {
    if (disabled || readOnly) return;
    
    const currentValue = parseFloat(localValue) || 0;
    const stepValue = parseFloat(step) || 1;
    let newValue = currentValue + stepValue;
    
    if (max !== undefined && newValue > max) {
      newValue = max;
    }
    
    setLocalValue(newValue.toString());
    
    const event = {
      target: { value: newValue.toString(), name: name },
      currentTarget: { value: newValue.toString(), name: name }
    };
    
    if (onChange) onChange(event);
  };
  
  // Handle decrement
  const handleDecrement = () => {
    if (disabled || readOnly) return;
    
    const currentValue = parseFloat(localValue) || 0;
    const stepValue = parseFloat(step) || 1;
    let newValue = currentValue - stepValue;
    
    if (min !== undefined && newValue < min) {
      newValue = min;
    }
    
    setLocalValue(newValue.toString());
    
    const event = {
      target: { value: newValue.toString(), name: name },
      currentTarget: { value: newValue.toString(), name: name }
    };
    
    if (onChange) onChange(event);
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
  
  // Determine container classes
  const containerClasses = `
    ${fullWidth ? 'w-full' : 'w-auto'}
    ${className}
  `;
  
  // Determine input wrapper classes
  const inputWrapperClasses = `
    relative flex items-center overflow-hidden
    ${unit ? 'pr-10' : ''}
  `;
  
  // Determine input classes
  const inputClasses = `
    block w-full rounded-md px-3 py-2 
    ${error ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}
    ${success ? 'border-success-500 focus:border-success-500 focus:ring-success-500' : ''}
    ${!error && !success ? 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500' : ''}
    ${disabled ? 'bg-neutral-100 text-neutral-500 cursor-not-allowed' : 'bg-white text-neutral-900'}
    ${showControls ? 'pr-12' : ''}
    shadow-sm focus:outline-none focus:ring-1
    ${inputClassName}
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
          type="number"
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
          min={min}
          max={max}
          step={step}
          className={inputClasses}
          {...props}
        />
        
        {showControls && (
          <div className="absolute inset-y-0 right-0 flex flex-col border-l border-neutral-300">
            <button
              type="button"
              className="flex-1 flex items-center justify-center px-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 border-b border-neutral-300"
              onClick={handleIncrement}
              disabled={disabled || readOnly || (max !== undefined && parseFloat(localValue) >= max)}
              tabIndex={-1}
            >
              <Icon name="ChevronUp" size={14} />
            </button>
            <button
              type="button"
              className="flex-1 flex items-center justify-center px-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100"
              onClick={handleDecrement}
              disabled={disabled || readOnly || (min !== undefined && parseFloat(localValue) <= min)}
              tabIndex={-1}
            >
              <Icon name="ChevronDown" size={14} />
            </button>
          </div>
        )}
        
        {unit && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-neutral-500">
            {unit}
          </div>
        )}
      </div>
      
      {helperText && (
        <p className={helperTextClasses}>{helperText}</p>
      )}
    </div>
  );
});

export default InputNumber;