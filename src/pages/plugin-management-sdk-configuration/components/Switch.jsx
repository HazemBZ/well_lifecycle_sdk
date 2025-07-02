import React from "react";

const Switch = ({ checked, onChange, disabled = false, size = "md", className = "" }) => {
  // Determine size classes
  const sizeClasses = {
    sm: {
      switch: "w-8 h-4",
      dot: "h-3 w-3",
      translate: "translate-x-4"
    },
    md: {
      switch: "w-10 h-5",
      dot: "h-4 w-4",
      translate: "translate-x-5"
    },
    lg: {
      switch: "w-12 h-6",
      dot: "h-5 w-5",
      translate: "translate-x-6"
    }
  };
  
  const currentSize = sizeClasses[size] || sizeClasses.md;

  return (
    <button
      type="button"
      className={`${currentSize.switch} relative inline-flex flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
        checked ? 'bg-primary-600' : 'bg-neutral-200'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={disabled ? undefined : onChange}
    >
      <span
        className={`${
          checked ? currentSize.translate : 'translate-x-0'
        } pointer-events-none relative inline-block ${
          currentSize.dot
        } rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out`}
      />
    </button>
  );
};

export default Switch;