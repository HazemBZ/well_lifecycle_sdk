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
import {
  defaultTracks,
  formations,
  templates,
  user,
  wells,
} from "./wellLogAnalysisMockData";

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

  // Initialize tracks on component mount
  useEffect(() => {
    setTracks(defaultTracks);
    setSelectedWell(wells[0]);
    setSelectedTemplate(templates[0]);
  }, []);

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
    setTracks(tracks.filter((track) => track.id !== trackId));
  };

  // Handle track reordering
  const handleReorderTracks = (reorderedTracks) => {
    setTracks(reorderedTracks);
  };

  // Handle curve addition to a track
  const handleAddCurve = (trackId, newCurve) => {
    setTracks(
      tracks.map((track) => {
        if (track.id === trackId) {
          return {
            ...track,
            curves: [...track.curves, newCurve],
          };
        }
        return track;
      })
    );
  };

  // Handle curve removal from a track
  const handleRemoveCurve = (trackId, curveId) => {
    setTracks(
      tracks.map((track) => {
        if (track.id === trackId) {
          return {
            ...track,
            curves: track.curves.filter((curve) => curve.id !== curveId),
          };
        }
        return track;
      })
    );
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

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  return (
    <>
      {/* <div className="flex h-screen bg-neutral-50 overflow-hidden"> */}
      {/* Sidebar */}
      {/* <Sidebar
        variant="contextual"
        onToggle={setSidebarCollapsed}
      /> */}



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
                <h3 className="text-lg font-medium text-neutral-900">
                  Tracks & Curves
                </h3>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <TrackManager
                  tracks={tracks}
                  onAddTrack={handleAddTrack}
                  onRemoveTrack={handleRemoveTrack}
                  onReorderTracks={handleReorderTracks}
                />
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-neutral-900 mb-2">
                    Available Curves
                  </h4>
                  <CurveSelector tracks={tracks} onAddCurve={handleAddCurve} />
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
                  <h3 className="text-lg font-medium text-neutral-900">
                    Formation Tops
                  </h3>
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
      {/* </div> */}
    </>
  );
};

export default WellLogViewerAnalysis;
