import React, { forwardRef, useState } from 'react';
import Icon from '../AppIcon';

const Input = forwardRef(({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyUp,
  onKeyPress,
  error,
  success,
  helperText,
  disabled = false,
  readOnly = false,
  required = false,
  fullWidth = true,
  id,
  name,
  autoComplete,
  autoFocus = false,
  min,
  max,
  step,
  maxLength,
  minLength,
  pattern,
  icon,
  iconPosition = 'left',
  clearable = false,
  className = '',
  inputClassName = '',
  labelClassName = '',
  helperTextClassName = '',
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [localValue, setLocalValue] = useState(value || '');
  
  // Generate a unique ID if not provided
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  
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
  
  // Handle clear button click
  const handleClear = () => {
    setLocalValue('');
    const event = {
      target: { value: '', name: name },
      currentTarget: { value: '', name: name }
    };
    if (onChange) onChange(event);
    
    // Focus the input after clearing
    if (ref && ref.current) {
      ref.current.focus();
    }
  };
  
  // Determine container classes
  const containerClasses = `
    ${fullWidth ? 'w-full' : 'w-auto'}
    ${className}
  `;
  
  // Determine input wrapper classes
  const inputWrapperClasses = `
    relative flex items-center overflow-hidden
    ${icon && iconPosition === 'left' ? 'pl-10' : ''}
    ${(clearable && localValue) || (icon && iconPosition === 'right') ? 'pr-10' : ''}
  `;
  
  // Determine input classes
  const inputClasses = `
    block w-full rounded-md px-3 py-2 
    ${error ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}
    ${success ? 'border-success-500 focus:border-success-500 focus:ring-success-500' : ''}
    ${!error && !success ? 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500' : ''}
    ${disabled ? 'bg-neutral-100 text-neutral-500 cursor-not-allowed' : 'bg-white text-neutral-900'}
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
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon name={icon} className="text-neutral-500" size={18} />
          </div>
        )}
        
        {type === 'number' ? (
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
            onKeyUp={onKeyUp}
            onKeyPress={onKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            min={min}
            max={max}
            step={step}
            className={inputClasses}
            {...props}
          />
        ) : type === 'search' ? (
          <input
            ref={ref}
            id={inputId}
            type="search"
            name={name}
            value={value !== undefined ? value : localValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onKeyPress={onKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            maxLength={maxLength}
            minLength={minLength}
            pattern={pattern}
            className={inputClasses}
            {...props}
          />
        ) : (
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
            onKeyUp={onKeyUp}
            onKeyPress={onKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            maxLength={maxLength}
            minLength={minLength}
            pattern={pattern}
            className={inputClasses}
            {...props}
          />
        )}
        
        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Icon name={icon} className="text-neutral-500" size={18} />
          </div>
        )}
        
        {clearable && localValue && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-neutral-500"
            onClick={handleClear}
            tabIndex={-1}
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </div>
      
      {helperText && (
        <p className={helperTextClasses}>{helperText}</p>
      )}
    </div>
  );
});

export default Input;