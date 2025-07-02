import React, { useRef, useEffect } from "react";

const LogViewer = ({ tracks, depthRange, scale, viewMode, formations }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Draw the log viewer on canvas
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to match container
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate dimensions
    const totalTracks = tracks.length;
    if (totalTracks === 0) return;
    
    const depthRulerWidth = 80;
    const trackSpacing = 10;
    const trackWidth = (canvas.width - depthRulerWidth - (totalTracks - 1) * trackSpacing) / totalTracks;
    
    const depthRange = { start: 8000, end: 8500 }; // Example depth range
    const depthSpan = depthRange.end - depthRange.start;
    const pixelsPerFoot = canvas.height / depthSpan;
    
    // Draw background
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw formations if available
    if (formations && formations.length > 0) {
      formations.forEach(formation => {
        if (formation.topDepth <= depthRange.end && formation.bottomDepth >= depthRange.start) {
          const topY = Math.max(0, (formation.topDepth - depthRange.start) * pixelsPerFoot);
          const bottomY = Math.min(canvas.height, (formation.bottomDepth - depthRange.start) * pixelsPerFoot);
          const height = bottomY - topY;
          
          // Draw formation background across all tracks
          ctx.fillStyle = `${formation.color}40`; // Add transparency
          ctx.fillRect(0, topY, canvas.width, height);
          
          // Draw formation name
          ctx.fillStyle = '#333';
          ctx.font = '12px Arial';
          ctx.fillText(formation.name, depthRulerWidth + 5, topY + 15);
          
          // Draw formation boundary lines
          ctx.strokeStyle = formation.color;
          ctx.lineWidth = 1;
          ctx.setLineDash([5, 3]);
          
          // Top boundary
          ctx.beginPath();
          ctx.moveTo(0, topY);
          ctx.lineTo(canvas.width, topY);
          ctx.stroke();
          
          // Bottom boundary
          ctx.beginPath();
          ctx.moveTo(0, bottomY);
          ctx.lineTo(canvas.width, bottomY);
          ctx.stroke();
          
          ctx.setLineDash([]);
        }
      });
    }
    
    // Draw depth ruler
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, depthRulerWidth, canvas.height);
    
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(depthRulerWidth, 0);
    ctx.lineTo(depthRulerWidth, canvas.height);
    ctx.stroke();
    
    // Draw depth markers
    const depthStep = 50; // 50 feet between depth markers
    const startDepth = Math.ceil(depthRange.start / depthStep) * depthStep;
    
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.textAlign = 'right';
    
    for (let depth = startDepth; depth <= depthRange.end; depth += depthStep) {
      const y = (depth - depthRange.start) * pixelsPerFoot;
      
      // Draw depth tick
      ctx.beginPath();
      ctx.moveTo(depthRulerWidth - 10, y);
      ctx.lineTo(depthRulerWidth, y);
      ctx.stroke();
      
      // Draw depth label
      ctx.fillText(depth.toString(), depthRulerWidth - 15, y + 4);
      
      // Draw grid line
      ctx.strokeStyle = '#eee';
      ctx.beginPath();
      ctx.moveTo(depthRulerWidth, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    
    // Draw tracks
    let xOffset = depthRulerWidth;
    
    tracks.forEach((track, trackIndex) => {
      // Draw track background
      ctx.fillStyle = '#fff';
      ctx.fillRect(xOffset, 0, trackWidth, canvas.height);
      
      // Draw track border
      ctx.strokeStyle = '#ddd';
      ctx.lineWidth = 1;
      ctx.strokeRect(xOffset, 0, trackWidth, canvas.height);
      
      // Draw track header
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(xOffset, 0, trackWidth, 30);
      
      ctx.fillStyle = '#333';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(track.name, xOffset + trackWidth / 2, 20);
      
      // Draw track scale
      if (track.curves.length > 0) {
        const firstCurve = track.curves[0];
        const lastCurve = track.curves[track.curves.length - 1];
        
        ctx.font = '10px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`${firstCurve.min} ${firstCurve.unit}`, xOffset + 5, 45);
        
        ctx.textAlign = 'right';
        ctx.fillText(`${firstCurve.max} ${firstCurve.unit}`, xOffset + trackWidth - 5, 45);
        
        if (track.curves.length > 1) {
          ctx.textAlign = 'left';
          ctx.fillStyle = lastCurve.color;
          ctx.fillText(`${lastCurve.min} ${lastCurve.unit}`, xOffset + 5, 60);
          
          ctx.textAlign = 'right';
          ctx.fillText(`${lastCurve.max} ${lastCurve.unit}`, xOffset + trackWidth - 5, 60);
        }
      }
      
      // Draw curves
      track.curves.forEach(curve => {
        const data = curve.data;
        if (!data || data.length === 0) return;
        
        ctx.strokeStyle = curve.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        // Map first point
        let firstPoint = data[0];
        let normalizedValue;
        
        if (track.scale === 'logarithmic' && firstPoint.value > 0) {
          const logMin = Math.log10(curve.min > 0 ? curve.min : 0.1);
          const logMax = Math.log10(curve.max);
          const logValue = Math.log10(firstPoint.value);
          normalizedValue = (logValue - logMin) / (logMax - logMin);
        } else {
          normalizedValue = (firstPoint.value - curve.min) / (curve.max - curve.min);
        }
        
        normalizedValue = Math.max(0, Math.min(1, normalizedValue)); // Clamp between 0 and 1
        const x = xOffset + normalizedValue * trackWidth;
        const y = (firstPoint.depth - depthRange.start) * pixelsPerFoot;
        
        ctx.moveTo(x, y);
        
        // Map remaining points
        for (let i = 1; i < data.length; i++) {
          const point = data[i];
          
          if (track.scale === 'logarithmic' && point.value > 0) {
            const logMin = Math.log10(curve.min > 0 ? curve.min : 0.1);
            const logMax = Math.log10(curve.max);
            const logValue = Math.log10(point.value);
            normalizedValue = (logValue - logMin) / (logMax - logMin);
          } else {
            normalizedValue = (point.value - curve.min) / (curve.max - curve.min);
          }
          
          normalizedValue = Math.max(0, Math.min(1, normalizedValue)); // Clamp between 0 and 1
          const x = xOffset + normalizedValue * trackWidth;
          const y = (point.depth - depthRange.start) * pixelsPerFoot;
          
          ctx.lineTo(x, y);
        }
        
        ctx.stroke();
      });
      
      // Move to next track
      xOffset += trackWidth + trackSpacing;
    });
    
  }, [tracks, depthRange, scale, viewMode, formations]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth;
        canvasRef.current.height = containerRef.current.clientHeight;
        // Redraw canvas
        // This will trigger the effect above
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative bg-neutral-100 overflow-auto"
    >
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0"
      />
    </div>
  );
};

export default LogViewer;