import React, { useEffect, useRef } from "react";
import Icon from "../../../components/AppIcon";

const Visualization2D = ({ selectedWell, selectedWells, colorBy }) => {
  const verticalSectionRef = useRef(null);
  const planViewRef = useRef(null);
  
  // Draw vertical section view
  useEffect(() => {
    if (!verticalSectionRef.current || !selectedWell) return;
    
    const ctx = verticalSectionRef.current.getContext('2d');
    const { width, height } = verticalSectionRef.current;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let x = 50; x < width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let y = 50; y < height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Draw axes
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    
    // X-axis (horizontal distance)
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(width - 50, 50);
    ctx.stroke();
    
    // Y-axis (TVD)
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(50, height - 50);
    ctx.stroke();
    
    // Axis labels
    ctx.fillStyle = '#334155';
    ctx.font = '12px Inter, sans-serif';
    ctx.fillText('Horizontal Distance (ft)', width / 2 - 70, 30);
    ctx.save();
    ctx.translate(20, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('True Vertical Depth (ft)', 0, 0);
    ctx.restore();
    
    // Draw depth markers
    for (let y = 50; y < height - 50; y += 100) {
      const depth = ((y - 50) / (height - 100)) * 5000;
      ctx.fillStyle = '#64748b';
      ctx.font = '10px Inter, sans-serif';
      ctx.fillText(depth.toFixed(0), 10, y + 5);
      
      // Tick mark
      ctx.beginPath();
      ctx.moveTo(45, y);
      ctx.lineTo(50, y);
      ctx.stroke();
    }
    
    // Draw distance markers
    for (let x = 50; x < width - 50; x += 100) {
      const distance = ((x - 50) / (width - 100)) * 5000;
      ctx.fillStyle = '#64748b';
      ctx.font = '10px Inter, sans-serif';
      ctx.fillText(distance.toFixed(0), x - 15, 40);
      
      // Tick mark
      ctx.beginPath();
      ctx.moveTo(x, 50);
      ctx.lineTo(x, 55);
      ctx.stroke();
    }
    
    // Draw well trajectory
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    
    // Starting point
    const startX = 50;
    const startY = 50;
    
    // Mock trajectory path - would be calculated from actual survey data
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    
    // Create a curved path
    const controlPoints = [
      { x: startX + 100, y: startY + 50 },
      { x: startX + 200, y: startY + 150 },
      { x: startX + 300, y: startY + 300 },
      { x: startX + 400, y: startY + 400 },
      { x: startX + 500, y: startY + 450 },
      { x: startX + 600, y: startY + 470 }
    ];
    
    // Draw the curve
    for (let i = 0; i < controlPoints.length; i++) {
      ctx.lineTo(controlPoints[i].x, controlPoints[i].y);
    }
    
    ctx.stroke();
    
    // Draw formation boundaries
    const formations = [
      { name: 'Surface', depth: 150, color: '#e2e8f0' },
      { name: 'Shale', depth: 250, color: '#94a3b8' },
      { name: 'Sandstone', depth: 350, color: '#f59e0b' },
      { name: 'Limestone', depth: 450, color: '#10b981' }
    ];
    
    formations.forEach(formation => {
      const y = 50 + formation.depth;
      
      // Draw formation boundary line
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 3]);
      ctx.beginPath();
      ctx.moveTo(50, y);
      ctx.lineTo(width - 50, y);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Draw formation label
      ctx.fillStyle = '#334155';
      ctx.font = '10px Inter, sans-serif';
      ctx.fillText(formation.name, width - 100, y - 5);
    });
    
    // Draw well name
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.fillText(selectedWell.label, controlPoints[controlPoints.length - 1].x + 10, 
                controlPoints[controlPoints.length - 1].y);
    
  }, [selectedWell]);
  
  // Draw plan view
  useEffect(() => {
    if (!planViewRef.current) return;
    
    const ctx = planViewRef.current.getContext('2d');
    const { width, height } = planViewRef.current;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let x = 50; x < width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let y = 50; y < height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Draw axes
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    
    // X-axis (East)
    ctx.beginPath();
    ctx.moveTo(width / 2, height / 2);
    ctx.lineTo(width - 50, height / 2);
    ctx.stroke();
    
    // Y-axis (North)
    ctx.beginPath();
    ctx.moveTo(width / 2, height / 2);
    ctx.lineTo(width / 2, 50);
    ctx.stroke();
    
    // Axis labels
    ctx.fillStyle = '#334155';
    ctx.font = '12px Inter, sans-serif';
    ctx.fillText('East (ft)', width - 80, height / 2 - 10);
    ctx.fillText('North (ft)', width / 2 + 10, 40);
    
    // Draw well trajectories
    selectedWells.forEach((well, index) => {
      // Generate a unique color for each well
      const wellColors = [
        '#3b82f6', // blue
        '#ef4444', // red
        '#10b981', // green
        '#f59e0b', // amber
        '#8b5cf6', // purple
      ];
      
      const wellColor = wellColors[index % wellColors.length];
      
      // Draw the trajectory
      ctx.strokeStyle = wellColor;
      ctx.lineWidth = 3;
      
      // Starting point (center of the canvas)
      const startX = width / 2;
      const startY = height / 2;
      
      // Mock trajectory path - would be calculated from actual survey data
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      
      // Create a curved path
      const controlPoints = [
        { x: startX + 50, y: startY - 50 },
        { x: startX + 100, y: startY - 100 },
        { x: startX + 150, y: startY - 150 },
        { x: startX + 200, y: startY - 180 },
        { x: startX + 250, y: startY - 200 }
      ];
      
      // Add some randomness for each well to make them look different
      const adjustedPoints = controlPoints.map(point => ({
        x: point.x + (index * 15) - (index % 2 === 0 ? 30 : 0),
        y: point.y - (index * 10) + (index % 2 === 0 ? 0 : 20)
      }));
      
      // Draw the curve
      for (let i = 0; i < adjustedPoints.length; i++) {
        ctx.lineTo(adjustedPoints[i].x, adjustedPoints[i].y);
      }
      
      ctx.stroke();
      
      // Draw well name
      ctx.fillStyle = wellColor;
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.fillText(well.label, adjustedPoints[adjustedPoints.length - 1].x + 10, 
                  adjustedPoints[adjustedPoints.length - 1].y);
      
      // Draw surface location
      ctx.fillStyle = wellColor;
      ctx.beginPath();
      ctx.arc(startX, startY, 5, 0, 2 * Math.PI);
      ctx.fill();
      
      // Draw target
      ctx.strokeStyle = wellColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(adjustedPoints[adjustedPoints.length - 1].x, adjustedPoints[adjustedPoints.length - 1].y, 10, 0, 2 * Math.PI);
      ctx.stroke();
      
      // Draw crosshairs on target
      ctx.beginPath();
      ctx.moveTo(adjustedPoints[adjustedPoints.length - 1].x - 15, adjustedPoints[adjustedPoints.length - 1].y);
      ctx.lineTo(adjustedPoints[adjustedPoints.length - 1].x + 15, adjustedPoints[adjustedPoints.length - 1].y);
      ctx.moveTo(adjustedPoints[adjustedPoints.length - 1].x, adjustedPoints[adjustedPoints.length - 1].y - 15);
      ctx.lineTo(adjustedPoints[adjustedPoints.length - 1].x, adjustedPoints[adjustedPoints.length - 1].y + 15);
      ctx.stroke();
    });
    
    // Draw compass
    const compassX = 80;
    const compassY = 80;
    const compassRadius = 30;
    
    // Outer circle
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(compassX, compassY, compassRadius, 0, 2 * Math.PI);
    ctx.stroke();
    
    // North line
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(compassX, compassY);
    ctx.lineTo(compassX, compassY - compassRadius);
    ctx.stroke();
    
    // East line
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(compassX, compassY);
    ctx.lineTo(compassX + compassRadius, compassY);
    ctx.stroke();
    
    // South line
    ctx.beginPath();
    ctx.moveTo(compassX, compassY);
    ctx.lineTo(compassX, compassY + compassRadius);
    ctx.stroke();
    
    // West line
    ctx.beginPath();
    ctx.moveTo(compassX, compassY);
    ctx.lineTo(compassX - compassRadius, compassY);
    ctx.stroke();
    
    // Labels
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.fillText('N', compassX - 4, compassY - compassRadius - 5);
    
    ctx.fillStyle = '#64748b';
    ctx.fillText('E', compassX + compassRadius + 5, compassY + 4);
    ctx.fillText('S', compassX - 4, compassY + compassRadius + 15);
    ctx.fillText('W', compassX - compassRadius - 15, compassY + 4);
    
  }, [selectedWells]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
      <div className="bg-white rounded-lg border border-neutral-200 shadow-sm overflow-hidden">
        <div className="p-3 border-b border-neutral-200 flex justify-between items-center">
          <h3 className="text-sm font-medium text-neutral-900">Vertical Section View</h3>
          <div className="flex space-x-1">
            <button className="p-1 rounded-md hover:bg-neutral-100 text-neutral-700">
              <Icon name="ZoomIn" size={16} />
            </button>
            <button className="p-1 rounded-md hover:bg-neutral-100 text-neutral-700">
              <Icon name="ZoomOut" size={16} />
            </button>
            <button className="p-1 rounded-md hover:bg-neutral-100 text-neutral-700">
              <Icon name="Maximize2" size={16} />
            </button>
          </div>
        </div>
        <div className="h-[calc(100%-40px)]">
          <canvas 
            ref={verticalSectionRef} 
            className="w-full h-full"
            width={800}
            height={600}
          />
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-neutral-200 shadow-sm overflow-hidden">
        <div className="p-3 border-b border-neutral-200 flex justify-between items-center">
          <h3 className="text-sm font-medium text-neutral-900">Plan View (Map)</h3>
          <div className="flex space-x-1">
            <button className="p-1 rounded-md hover:bg-neutral-100 text-neutral-700">
              <Icon name="ZoomIn" size={16} />
            </button>
            <button className="p-1 rounded-md hover:bg-neutral-100 text-neutral-700">
              <Icon name="ZoomOut" size={16} />
            </button>
            <button className="p-1 rounded-md hover:bg-neutral-100 text-neutral-700">
              <Icon name="Maximize2" size={16} />
            </button>
          </div>
        </div>
        <div className="h-[calc(100%-40px)]">
          <canvas 
            ref={planViewRef} 
            className="w-full h-full"
            width={800}
            height={600}
          />
        </div>
      </div>
    </div>
  );
};

export default Visualization2D;