import React, { useState, useRef, useEffect } from "react";

import Header from "../../components/ui/Header";
import Sidebar from "../../components/ui/Sidebar";



import LogViewer from "./components/LogViewer";
import TrackManager from "./components/TrackManager";
import CurveSelector from "./components/CurveSelector";
import DepthControl from "./components/DepthControl";
import FormationPanel from "./components/FormationPanel";
import ToolbarControls from "./components/ToolbarControls";
import WellInfoHeader from "./components/WellInfoHeader";

const WellLogViewerAnalysis = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedWell, setSelectedWell] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [scale, setScale] = useState(1);
  const [depthRange, setDepthRange] = useState({ start: 8000, end: 8500 });
  const [tracks, setTracks] = useState([]);
  const [showFormations, setShowFormations] = useState(true);
  const [viewMode, setViewMode] = useState("depth");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const viewerContainerRef = useRef(null);

  // Mock data for wells
  const wells = [
    { value: "well-1", label: "Well Alpha-1", icon: "Droplet" },
    { value: "well-2", label: "Well Beta-2", icon: "Droplet" },
    { value: "well-3", label: "Well Gamma-3", icon: "Droplet" },
    { value: "well-4", label: "Well Delta-4", icon: "Droplet" },
  ];

  // Mock data for templates
  const templates = [
    { value: "template-1", label: "Basic Log Suite", icon: "FileText" },
    { value: "template-2", label: "Petrophysical Analysis", icon: "FileText" },
    { value: "template-3", label: "Formation Evaluation", icon: "FileText" },
    { value: "template-4", label: "Reservoir Characterization", icon: "FileText" },
  ];

  // Mock data for tracks
  const defaultTracks = [
    {
      id: "track-1",
      name: "Gamma Ray",
      curves: [
        { id: "gr", name: "GR", color: "#FF0000", unit: "API", min: 0, max: 150, data: generateMockCurveData(8000, 8500, 0, 150) }
      ],
      scale: "linear",
      width: 1,
    },
    {
      id: "track-2",
      name: "Resistivity",
      curves: [
        { id: "rt", name: "RT", color: "#0000FF", unit: "ohm-m", min: 0.2, max: 2000, data: generateMockCurveData(8000, 8500, 0.2, 2000) }
      ],
      scale: "logarithmic",
      width: 1,
    },
    {
      id: "track-3",
      name: "Density-Neutron",
      curves: [
        { id: "rhob", name: "RHOB", color: "#FF0000", unit: "g/cc", min: 1.95, max: 2.95, data: generateMockCurveData(8000, 8500, 1.95, 2.95) },
        { id: "nphi", name: "NPHI", color: "#0000FF", unit: "v/v", min: 0.45, max: -0.15, data: generateMockCurveData(8000, 8500, -0.15, 0.45) }
      ],
      scale: "linear",
      width: 1,
    },
    {
      id: "track-4",
      name: "Sonic",
      curves: [
        { id: "dt", name: "DT", color: "#00AA00", unit: "us/ft", min: 40, max: 140, data: generateMockCurveData(8000, 8500, 40, 140) }
      ],
      scale: "linear",
      width: 1,
    }
  ];

  // Mock data for formations
  const formations = [
    { id: "fm-1", name: "Upper Sandstone", topDepth: 8050, bottomDepth: 8150, color: "#FFD700" },
    { id: "fm-2", name: "Shale Barrier", topDepth: 8150, bottomDepth: 8200, color: "#808080" },
    { id: "fm-3", name: "Middle Sandstone", topDepth: 8200, bottomDepth: 8300, color: "#F5DEB3" },
    { id: "fm-4", name: "Lower Shale", topDepth: 8300, bottomDepth: 8450, color: "#696969" },
  ];

  // Mock user data
  const user = {
    name: "John Smith",
    email: "john.smith@petrodigital.com",
    initials: "JS"
  };

  // Initialize tracks on component mount
  useEffect(() => {
    setTracks(defaultTracks);
    setSelectedWell(wells[0]);
    setSelectedTemplate(templates[0]);
  }, []);

  // Function to generate mock curve data
  function generateMockCurveData(startDepth, endDepth, minValue, maxValue) {
    const data = [];
    const step = 0.5; // Half-foot increments
    
    for (let depth = startDepth; depth <= endDepth; depth += step) {
      // Generate a somewhat realistic curve with some noise and trends
      const baseValue = minValue + (Math.sin(depth / 50) + 1) * (maxValue - minValue) / 2;
      const noise = (Math.random() - 0.5) * (maxValue - minValue) * 0.1;
      data.push({
        depth,
        value: Math.max(minValue, Math.min(maxValue, baseValue + noise))
      });
    }
    
    return data;
  }

  // Handle depth range change
  const handleDepthRangeChange = (newRange) => {
    setDepthRange(newRange);
  };

  // Handle track addition
  const handleAddTrack = (newTrack) => {
    setTracks([...tracks, newTrack]);
  };

  // Handle track removal
  const handleRemoveTrack = (trackId) => {
    setTracks(tracks.filter(track => track.id !== trackId));
  };

  // Handle track reordering
  const handleReorderTracks = (reorderedTracks) => {
    setTracks(reorderedTracks);
  };

  // Handle curve addition to a track
  const handleAddCurve = (trackId, newCurve) => {
    setTracks(tracks.map(track => {
      if (track.id === trackId) {
        return {
          ...track,
          curves: [...track.curves, newCurve]
        };
      }
      return track;
    }));
  };

  // Handle curve removal from a track
  const handleRemoveCurve = (trackId, curveId) => {
    setTracks(tracks.map(track => {
      if (track.id === trackId) {
        return {
          ...track,
          curves: track.curves.filter(curve => curve.id !== curveId)
        };
      }
      return track;
    }));
  };

  // Handle scale change
  const handleScaleChange = (newScale) => {
    setScale(newScale);
  };

  // Handle view mode change (depth vs time)
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  // Handle fullscreen toggle
  const handleFullscreenToggle = () => {
    if (!isFullscreen) {
      if (viewerContainerRef.current.requestFullscreen) {
        viewerContainerRef.current.requestFullscreen();
      } else if (viewerContainerRef.current.webkitRequestFullscreen) {
        viewerContainerRef.current.webkitRequestFullscreen();
      } else if (viewerContainerRef.current.msRequestFullscreen) {
        viewerContainerRef.current.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      );
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        variant="contextual"
        onToggle={setSidebarCollapsed}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          variant="default"
          user={user}
        />

        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Well info and controls header */}
          <WellInfoHeader 
            selectedWell={selectedWell}
            wells={wells}
            onWellChange={setSelectedWell}
            selectedTemplate={selectedTemplate}
            templates={templates}
            onTemplateChange={setSelectedTemplate}
          />

          {/* Toolbar */}
          <ToolbarControls
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            scale={scale}
            onScaleChange={handleScaleChange}
            onFullscreenToggle={handleFullscreenToggle}
            isFullscreen={isFullscreen}
            showFormations={showFormations}
            onToggleFormations={() => setShowFormations(!showFormations)}
          />

          {/* Main viewer area */}
          <div className="flex-1 flex overflow-hidden" ref={viewerContainerRef}>
            {/* Left panel - Track manager */}
            <div className="w-64 bg-white border-r border-neutral-200 flex flex-col overflow-hidden">
              <div className="p-4 border-b border-neutral-200">
                <h3 className="text-lg font-medium text-neutral-900">Tracks & Curves</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <TrackManager
                  tracks={tracks}
                  onAddTrack={handleAddTrack}
                  onRemoveTrack={handleRemoveTrack}
                  onReorderTracks={handleReorderTracks}
                />
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-neutral-900 mb-2">Available Curves</h4>
                  <CurveSelector
                    tracks={tracks}
                    onAddCurve={handleAddCurve}
                  />
                </div>
              </div>
            </div>

            {/* Center panel - Log viewer */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-auto">
                <LogViewer
                  tracks={tracks}
                  depthRange={depthRange}
                  scale={scale}
                  viewMode={viewMode}
                  formations={showFormations ? formations : []}
                />
              </div>
              <DepthControl
                depthRange={depthRange}
                onDepthRangeChange={handleDepthRangeChange}
                minDepth={8000}
                maxDepth={9000}
              />
            </div>

            {/* Right panel - Formations and annotations */}
            {showFormations && (
              <div className="w-64 bg-white border-l border-neutral-200 flex flex-col overflow-hidden">
                <div className="p-4 border-b border-neutral-200">
                  <h3 className="text-lg font-medium text-neutral-900">Formation Tops</h3>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <FormationPanel
                    formations={formations}
                    depthRange={depthRange}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellLogViewerAnalysis;