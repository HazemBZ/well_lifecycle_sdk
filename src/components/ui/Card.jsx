import React from 'react';
import Icon from '../AppIcon';

const Card = ({
  children,
  variant = 'standard',
  title,
  subtitle,
  icon,
  headerActions,
  footerActions,
  footer,
  onClick,
  interactive = false,
  selected = false,
  disabled = false,
  loading = false,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  ...props
}) => {
  // Base classes
  const baseClasses = 'bg-white rounded-lg border overflow-hidden';
  
  // Variant classes
  const variantClasses = {
    standard: 'border-neutral-200 shadow-sm',
    interactive: 'border-neutral-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer',
    data: 'border-neutral-200 shadow-sm',
    dashboard: 'border-neutral-200 shadow-sm',
    wellInfo: 'border-neutral-200 shadow-sm bg-neutral-50',
    plugin: 'border-neutral-200 shadow-sm',
  };
  
  // State classes
  const stateClasses = {
    selected: 'ring-2 ring-primary-500',
    disabled: 'opacity-60 pointer-events-none',
    loading: 'relative',
  };
  
  // Combine all classes
  const cardClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${selected ? stateClasses.selected : ''}
    ${disabled ? stateClasses.disabled : ''}
    ${loading ? stateClasses.loading : ''}
    ${interactive || onClick ? 'cursor-pointer' : ''}
    ${className}
  `;
  
  // Handle click
  const handleClick = (e) => {
    if (onClick && !disabled) {
      onClick(e);
    }
  };
  
  // Render header if title, subtitle, icon, or headerActions are provided
  const renderHeader = () => {
    if (!title && !subtitle && !icon && !headerActions) return null;
    
    return (
      <div className={`px-6 py-4 border-b border-neutral-200 ${headerClassName}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {icon && (
              <div className="flex-shrink-0">
                {typeof icon === 'string' ? (
                  <Icon name={icon} size={24} className="text-primary-600" />
                ) : (
                  icon
                )}
              </div>
            )}
            <div>
              {title && (
                <h3 className="text-lg font-medium text-neutral-900">{title}</h3>
              )}
              {subtitle && (
                <p className="text-sm text-neutral-500 mt-1">{subtitle}</p>
              )}
            </div>
          </div>
          {headerActions && (
            <div className="flex items-center space-x-2">
              {headerActions}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  // Render footer if footer or footerActions are provided
  const renderFooter = () => {
    if (!footer && !footerActions) return null;
    
    return (
      <div className={`px-6 py-4 border-t border-neutral-200 ${footerClassName}`}>
        {footer ? (
          footer
        ) : (
          <div className="flex justify-end space-x-2">
            {footerActions}
          </div>
        )}
      </div>
    );
  };
  
  // Render loading overlay
  const renderLoadingOverlay = () => {
    if (!loading) return null;
    
    return (
      <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  };

  return (
    <div 
      className={cardClasses}
      onClick={handleClick}
      {...props}
    >
      {renderLoadingOverlay()}
      {renderHeader()}
      <div className={`p-6 ${bodyClassName}`}>
        {children}
      </div>
      {renderFooter()}
    </div>
  );
};

export default Card;