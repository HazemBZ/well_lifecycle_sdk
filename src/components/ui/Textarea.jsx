import React, { forwardRef, useState } from 'react';

const Textarea = forwardRef(({
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
  rows = 4,
  maxLength,
  minLength,
  resize = 'vertical', // 'none', 'vertical', 'horizontal', 'both'
  className = '',
  textareaClassName = '',
  labelClassName = '',
  helperTextClassName = '',
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [localValue, setLocalValue] = useState(value || '');
  
  // Generate a unique ID if not provided
  const textareaId = id || `textarea-${Math.random().toString(36).substring(2, 9)}`;
  
  // Handle textarea change
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
  
  // Determine container classes
  const containerClasses = `
    ${fullWidth ? 'w-full' : 'w-auto'}
    ${className}
  `;
  
  // Determine resize class
  const resizeClass = {
    'none': 'resize-none',
    'vertical': 'resize-y',
    'horizontal': 'resize-x',
    'both': 'resize'
  }[resize];
  
  // Determine textarea classes
  const textareaClasses = `
    block w-full rounded-md px-3 py-2 
    ${error ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}
    ${success ? 'border-success-500 focus:border-success-500 focus:ring-success-500' : ''}
    ${!error && !success ? 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500' : ''}
    ${disabled ? 'bg-neutral-100 text-neutral-500 cursor-not-allowed' : 'bg-white text-neutral-900'}
    shadow-sm focus:outline-none focus:ring-1
    ${resizeClass}
    ${textareaClassName}
  `;
  
  // Determine helper text classes
  const helperTextClasses = `
    mt-1 text-sm
    ${error ? 'text-error-500' : ''}
    ${success ? 'text-success-500' : ''}
    ${!error && !success ? 'text-neutral-500' : ''}
    ${helperTextClassName}
  `;

  // Character count display
  const showCharCount = maxLength !== undefined;
  const charCount = (value !== undefined ? value : localValue).length;

  return (
    <div className={containerClasses}>
      {label && (
        <label 
          htmlFor={textareaId} 
          className={`block mb-1 text-sm font-medium text-neutral-700 ${labelClassName}`}
        >
          {label}
          {required && <span className="ml-1 text-error-500">*</span>}
        </label>
      )}
      
      <textarea
        ref={ref}
        id={textareaId}
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
        rows={rows}
        maxLength={maxLength}
        minLength={minLength}
        className={textareaClasses}
        {...props}
      />
      
      <div className="flex justify-between items-center mt-1">
        {helperText && (
          <p className={helperTextClasses}>{helperText}</p>
        )}
        
        {showCharCount && (
          <p className={`text-xs text-neutral-500 ${!helperText ? 'ml-auto' : ''}`}>
            {charCount}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
});

export default Textarea;