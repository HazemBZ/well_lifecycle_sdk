import React, { useEffect, useRef } from "react";
import Icon from "../../../components/AppIcon";

const Visualization3D = ({ selectedWells, colorBy, showUncertainty }) => {
  const canvasRef = useRef(null);
  
  // Mock visualization - in a real app, this would use a 3D library like Three.js
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    const { width, height } = canvasRef.current;
    
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
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(50, height - 50);
    ctx.lineTo(width - 50, height - 50);
    ctx.stroke();
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(50, height - 50);
    ctx.lineTo(50, 50);
    ctx.stroke();
    
    // Z-axis (perspective)
    ctx.beginPath();
    ctx.moveTo(50, height - 50);
    ctx.lineTo(150, height - 150);
    ctx.stroke();
    
    // Axis labels
    ctx.fillStyle = '#334155';
    ctx.font = '12px Inter, sans-serif';
    ctx.fillText('North', width - 80, height - 35);
    ctx.fillText('TVD', 30, 70);
    ctx.fillText('East', 120, height - 130);
    
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
      
      // Starting point
      const startX = 50;
      const startY = height - 50;
      
      // Mock trajectory path - would be calculated from actual survey data
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      
      // Create a curved path
      const controlPoints = [
        { x: startX + 100, y: startY - 50 },
        { x: startX + 200, y: startY - 150 },
        { x: startX + 300, y: startY - 200 },
        { x: startX + 400, y: startY - 220 },
        { x: startX + 500, y: startY - 230 },
        { x: startX + 600, y: startY - 240 }
      ];
      
      // Add some randomness for each well to make them look different
      const adjustedPoints = controlPoints.map(point => ({
        x: point.x + (index * 20),
        y: point.y - (index * 15)
      }));
      
      // Draw the curve
      for (let i = 0; i < adjustedPoints.length; i++) {
        ctx.lineTo(adjustedPoints[i].x, adjustedPoints[i].y);
      }
      
      ctx.stroke();
      
      // Draw uncertainty ellipses if enabled
      if (showUncertainty) {
        ctx.strokeStyle = `${wellColor}80`; // Semi-transparent
        ctx.lineWidth = 1;
        
        // Draw ellipses at key points
        for (let i = 0; i < adjustedPoints.length; i += 2) {
          const { x, y } = adjustedPoints[i];
          const radiusX = 10 + (i * 2); // Increasing uncertainty with depth
          const radiusY = 5 + (i * 1);
          
          ctx.beginPath();
          ctx.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI);
          ctx.stroke();
        }
      }
      
      // Draw well name
      ctx.fillStyle = wellColor;
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.fillText(well.label, adjustedPoints[adjustedPoints.length - 1].x + 10, 
                  adjustedPoints[adjustedPoints.length - 1].y);
    });
    
    // Draw color legend based on colorBy
    if (selectedWells.length > 0) {
      const legendX = width - 180;
      const legendY = 50;
      
      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.fillText(`Color By: ${colorBy.charAt(0).toUpperCase() + colorBy.slice(1)}`, legendX, legendY);
      
      if (colorBy === 'formation') {
        const formations = ['Sandstone', 'Shale', 'Limestone', 'Dolomite'];
        const formationColors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
        
        formations.forEach((formation, i) => {
          const y = legendY + 25 + (i * 20);
          
          // Color box
          ctx.fillStyle = formationColors[i];
          ctx.fillRect(legendX, y - 10, 15, 15);
          
          // Formation name
          ctx.fillStyle = '#334155';
          ctx.font = '12px Inter, sans-serif';
          ctx.fillText(formation, legendX + 25, y);
        });
      } else if (colorBy === 'phase') {
        const phases = ['Surface', 'Intermediate', 'Production', 'Lateral'];
        const phaseColors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
        
        phases.forEach((phase, i) => {
          const y = legendY + 25 + (i * 20);
          
          // Color box
          ctx.fillStyle = phaseColors[i];
          ctx.fillRect(legendX, y - 10, 15, 15);
          
          // Phase name
          ctx.fillStyle = '#334155';
          ctx.font = '12px Inter, sans-serif';
          ctx.fillText(phase, legendX + 25, y);
        });
      } else if (colorBy === 'dogleg') {
        const doglegRanges = ['0-1°/100ft', '1-2°/100ft', '2-3°/100ft', '>3°/100ft'];
        const doglegColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
        
        doglegRanges.forEach((range, i) => {
          const y = legendY + 25 + (i * 20);
          
          // Color box
          ctx.fillStyle = doglegColors[i];
          ctx.fillRect(legendX, y - 10, 15, 15);
          
          // Range name
          ctx.fillStyle = '#334155';
          ctx.font = '12px Inter, sans-serif';
          ctx.fillText(range, legendX + 25, y);
        });
      }
    }
    
  }, [selectedWells, colorBy, showUncertainty]);
  
  return (
    <div className="relative h-full">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
        width={1200}
        height={800}
      />
      
      {/* Overlay controls */}
      <div className="absolute top-4 right-4 bg-white bg-opacity-80 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-neutral-200">
        <div className="flex flex-col space-y-3">
          <button className="p-2 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-700">
            <Icon name="ZoomIn" size={20} />
          </button>
          <button className="p-2 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-700">
            <Icon name="ZoomOut" size={20} />
          </button>
          <button className="p-2 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-700">
            <Icon name="RotateCcw" size={20} />
          </button>
          <button className="p-2 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-700">
            <Icon name="Home" size={20} />
          </button>
        </div>
      </div>
      
      {/* Placeholder message */}
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-80 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-neutral-200">
        <p className="text-sm text-neutral-700">
          <Icon name="Info" size={16} className="inline-block mr-1 text-primary-600" />
          This is a simplified visualization. In a production environment, this would use a full 3D rendering library.
        </p>
      </div>
    </div>
  );
};

export default Visualization3D;