import React, { useState, useEffect } from "react";

import Button from "../../../components/ui/Button";

const DepthControl = ({ depthRange, onDepthRangeChange, minDepth, maxDepth }) => {
  const [startDepth, setStartDepth] = useState(depthRange.start);
  const [endDepth, setEndDepth] = useState(depthRange.end);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragStartDepth, setDragStartDepth] = useState(0);

  // Update local state when props change
  useEffect(() => {
    setStartDepth(depthRange.start);
    setEndDepth(depthRange.end);
  }, [depthRange]);

  // Handle start depth change
  const handleStartDepthChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= minDepth && value < endDepth) {
      setStartDepth(value);
    }
  };

  // Handle end depth change
  const handleEndDepthChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value <= maxDepth && value > startDepth) {
      setEndDepth(value);
    }
  };

  // Apply depth range changes
  const applyDepthRange = () => {
    onDepthRangeChange({ start: startDepth, end: endDepth });
  };

  // Handle keyboard input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      applyDepthRange();
    }
  };

  // Handle zoom in (decrease range)
  const handleZoomIn = () => {
    const currentSpan = endDepth - startDepth;
    const newSpan = Math.max(50, currentSpan * 0.8); // Don't zoom in too much
    const midpoint = (startDepth + endDepth) / 2;
    
    const newStart = Math.max(minDepth, Math.floor(midpoint - newSpan / 2));
    const newEnd = Math.min(maxDepth, Math.ceil(midpoint + newSpan / 2));
    
    setStartDepth(newStart);
    setEndDepth(newEnd);
    onDepthRangeChange({ start: newStart, end: newEnd });
  };

  // Handle zoom out (increase range)
  const handleZoomOut = () => {
    const currentSpan = endDepth - startDepth;
    const newSpan = Math.min(maxDepth - minDepth, currentSpan * 1.2);
    const midpoint = (startDepth + endDepth) / 2;
    
    const newStart = Math.max(minDepth, Math.floor(midpoint - newSpan / 2));
    const newEnd = Math.min(maxDepth, Math.ceil(midpoint + newSpan / 2));
    
    setStartDepth(newStart);
    setEndDepth(newEnd);
    onDepthRangeChange({ start: newStart, end: newEnd });
  };

  // Handle mouse down for dragging
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStartY(e.clientY);
    setDragStartDepth(startDepth);
    
    // Add event listeners for mouse move and up
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaY = e.clientY - dragStartY;
    const depthSpan = endDepth - startDepth;
    const pixelsPerFoot = 0.1; // Adjust this value to control drag sensitivity
    
    const deltaDepth = Math.round(deltaY * pixelsPerFoot);
    
    let newStart = dragStartDepth + deltaDepth;
    let newEnd = newStart + depthSpan;
    
    // Ensure we stay within bounds
    if (newStart < minDepth) {
      newStart = minDepth;
      newEnd = newStart + depthSpan;
    } else if (newEnd > maxDepth) {
      newEnd = maxDepth;
      newStart = newEnd - depthSpan;
    }
    
    setStartDepth(newStart);
    setEndDepth(newEnd);
    onDepthRangeChange({ start: newStart, end: newEnd });
  };

  // Handle mouse up for dragging
  const handleMouseUp = () => {
    setIsDragging(false);
    
    // Remove event listeners
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Move up (decrease depth)
  const handleMoveUp = () => {
    const depthSpan = endDepth - startDepth;
    const moveAmount = Math.max(10, Math.floor(depthSpan * 0.1));
    
    let newStart = startDepth - moveAmount;
    let newEnd = endDepth - moveAmount;
    
    if (newStart < minDepth) {
      newStart = minDepth;
      newEnd = newStart + depthSpan;
    }
    
    setStartDepth(newStart);
    setEndDepth(newEnd);
    onDepthRangeChange({ start: newStart, end: newEnd });
  };

  // Move down (increase depth)
  const handleMoveDown = () => {
    const depthSpan = endDepth - startDepth;
    const moveAmount = Math.max(10, Math.floor(depthSpan * 0.1));
    
    let newStart = startDepth + moveAmount;
    let newEnd = endDepth + moveAmount;
    
    if (newEnd > maxDepth) {
      newEnd = maxDepth;
      newStart = newEnd - depthSpan;
    }
    
    setStartDepth(newStart);
    setEndDepth(newEnd);
    onDepthRangeChange({ start: newStart, end: newEnd });
  };

  return (
    <div className="flex items-center justify-between p-2 border-t border-neutral-200 bg-white">
      <div className="flex items-center space-x-2">
        <div className="flex items-center">
          <span className="text-xs text-neutral-500 mr-1">From:</span>
          <input
            type="number"
            className="w-20 px-2 py-1 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            value={startDepth}
            onChange={handleStartDepthChange}
            onKeyDown={handleKeyDown}
            onBlur={applyDepthRange}
            min={minDepth}
            max={endDepth - 1}
            step={10}
          />
        </div>
        <div className="flex items-center">
          <span className="text-xs text-neutral-500 mr-1">To:</span>
          <input
            type="number"
            className="w-20 px-2 py-1 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            value={endDepth}
            onChange={handleEndDepthChange}
            onKeyDown={handleKeyDown}
            onBlur={applyDepthRange}
            min={startDepth + 1}
            max={maxDepth}
            step={10}
          />
        </div>
        <Button
          variant="tertiary"
          size="sm"
          icon="Check"
          onClick={applyDepthRange}
        >
          Apply
        </Button>
      </div>
      
      <div 
        className="flex-1 mx-4 h-6 bg-neutral-100 rounded-md cursor-move relative"
        onMouseDown={handleMouseDown}
      >
        <div 
          className="absolute h-full bg-primary-100 border border-primary-300 rounded-md"
          style={{
            left: `${((startDepth - minDepth) / (maxDepth - minDepth)) * 100}%`,
            width: `${((endDepth - startDepth) / (maxDepth - minDepth)) * 100}%`
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs text-primary-700 font-medium">
              {endDepth - startDepth} ft
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-1">
        <Button
          variant="tertiary"
          size="sm"
          icon="ChevronUp"
          onClick={handleMoveUp}
          title="Move up"
        />
        <Button
          variant="tertiary"
          size="sm"
          icon="ChevronDown"
          onClick={handleMoveDown}
          title="Move down"
        />
        <Button
          variant="tertiary"
          size="sm"
          icon="ZoomIn"
          onClick={handleZoomIn}
          title="Zoom in"
        />
        <Button
          variant="tertiary"
          size="sm"
          icon="ZoomOut"
          onClick={handleZoomOut}
          title="Zoom out"
        />
      </div>
    </div>
  );
};

export default DepthControl;