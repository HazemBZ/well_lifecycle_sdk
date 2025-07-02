import React from 'react';

const Checkbox = ({
  id,
  name,
  label,
  checked = false,
  onChange,
  disabled = false,
  required = false,
  error,
  helperText,
  className = '',
  labelClassName = '',
  ...props
}) => {
  // Generate a unique ID if not provided
  const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;
  
  // Determine helper text classes
  const helperTextClasses = `
    mt-1 text-sm
    ${error ? 'text-error-500' : 'text-neutral-500'}
  `;

  return (
    <div className={`flex items-start ${className}`}>
      <div className="flex items-center h-5">
        <input
          id={checkboxId}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`
            h-4 w-4 rounded
            text-primary-600 
            border-neutral-300
            focus:ring-primary-500
            ${error ? 'border-error-500' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          {...props}
        />
      </div>
      <div className="ml-3 text-sm">
        {label && (
          <label 
            htmlFor={checkboxId} 
            className={`font-medium text-neutral-700 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${labelClassName}`}
          >
            {label}
            {required && <span className="ml-1 text-error-500">*</span>}
          </label>
        )}
        {helperText && (
          <p className={helperTextClasses}>{helperText}</p>
        )}
      </div>
    </div>
  );
};

export default Checkbox;