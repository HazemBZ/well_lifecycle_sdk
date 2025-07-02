import React from "react";

const Checkbox = ({ id, name, checked, onChange, label, disabled = false, className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
      />
      {label && (
        <label htmlFor={id} className="ml-2 block text-sm text-neutral-700 cursor-pointer">
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;