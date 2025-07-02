import React from 'react';

const Grid = ({
  children,
  columns = 1,
  gap = 4,
  rowGap,
  columnGap,
  className = '',
  ...props
}) => {
  // Convert columns to responsive classes
  const getColumnsClass = () => {
    if (typeof columns === 'number') {
      return `grid-cols-1 sm:grid-cols-${Math.min(columns, 12)}`;
    }
    
    if (typeof columns === 'object') {
      const { xs, sm, md, lg, xl } = columns;
      return [
        xs && `grid-cols-${Math.min(xs, 12)}`,
        sm && `sm:grid-cols-${Math.min(sm, 12)}`,
        md && `md:grid-cols-${Math.min(md, 12)}`,
        lg && `lg:grid-cols-${Math.min(lg, 12)}`,
        xl && `xl:grid-cols-${Math.min(xl, 12)}`,
      ].filter(Boolean).join(' ');
    }
    
    return 'grid-cols-1';
  };
  
  // Convert gap to classes
  const getGapClass = () => {
    if (rowGap && columnGap) {
      return `gap-x-${columnGap} gap-y-${rowGap}`;
    }
    
    return `gap-${gap}`;
  };
  
  const gridClasses = `grid ${getColumnsClass()} ${getGapClass()} ${className}`;
  
  return (
    <div className={gridClasses} {...props}>
      {children}
    </div>
  );
};

export default Grid;