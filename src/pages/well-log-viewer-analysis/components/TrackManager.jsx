import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const TrackManager = ({ tracks, onAddTrack, onRemoveTrack, onReorderTracks }) => {
  const [draggedTrackId, setDraggedTrackId] = useState(null);
  const [isAddingTrack, setIsAddingTrack] = useState(false);
  const [newTrackName, setNewTrackName] = useState("");
  const [newTrackScale, setNewTrackScale] = useState("linear");

  // Handle drag start
  const handleDragStart = (e, trackId) => {
    setDraggedTrackId(trackId);
    e.dataTransfer.effectAllowed = "move";
  };

  // Handle drag over
  const handleDragOver = (e, trackId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  // Handle drop
  const handleDrop = (e, targetTrackId) => {
    e.preventDefault();
    
    if (draggedTrackId === targetTrackId) return;
    
    const draggedTrackIndex = tracks.findIndex(track => track.id === draggedTrackId);
    const targetTrackIndex = tracks.findIndex(track => track.id === targetTrackId);
    
    if (draggedTrackIndex < 0 || targetTrackIndex < 0) return;
    
    const reorderedTracks = [...tracks];
    const [draggedTrack] = reorderedTracks.splice(draggedTrackIndex, 1);
    reorderedTracks.splice(targetTrackIndex, 0, draggedTrack);
    
    onReorderTracks(reorderedTracks);
    setDraggedTrackId(null);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDraggedTrackId(null);
  };

  // Handle add track
  const handleAddTrack = () => {
    if (!newTrackName.trim()) return;
    
    const newTrack = {
      id: `track-${Date.now()}`,
      name: newTrackName,
      curves: [],
      scale: newTrackScale,
      width: 1,
    };
    
    onAddTrack(newTrack);
    setNewTrackName("");
    setNewTrackScale("linear");
    setIsAddingTrack(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-sm font-medium text-neutral-900">Track Configuration</h4>
        <Button
          variant="tertiary"
          size="sm"
          icon="Plus"
          onClick={() => setIsAddingTrack(true)}
        >
          Add Track
        </Button>
      </div>

      {/* Add track form */}
      {isAddingTrack && (
        <div className="mb-4 p-3 bg-neutral-50 rounded-md border border-neutral-200">
          <h5 className="text-sm font-medium mb-2">New Track</h5>
          <div className="mb-2">
            <label className="block text-xs text-neutral-500 mb-1">Track Name</label>
            <input
              type="text"
              className="w-full px-2 py-1 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              value={newTrackName}
              onChange={(e) => setNewTrackName(e.target.value)}
              placeholder="Enter track name"
            />
          </div>
          <div className="mb-3">
            <label className="block text-xs text-neutral-500 mb-1">Scale Type</label>
            <div className="flex space-x-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-primary-600 focus:ring-primary-500"
                  name="scaleType"
                  value="linear"
                  checked={newTrackScale === "linear"}
                  onChange={() => setNewTrackScale("linear")}
                />
                <span className="ml-1 text-xs">Linear</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-primary-600 focus:ring-primary-500"
                  name="scaleType"
                  value="logarithmic"
                  checked={newTrackScale === "logarithmic"}
                  onChange={() => setNewTrackScale("logarithmic")}
                />
                <span className="ml-1 text-xs">Logarithmic</span>
              </label>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="tertiary"
              size="sm"
              onClick={() => setIsAddingTrack(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleAddTrack}
              disabled={!newTrackName.trim()}
            >
              Add
            </Button>
          </div>
        </div>
      )}

      {/* Track list */}
      <div className="space-y-2">
        {tracks.length === 0 ? (
          <div className="text-sm text-neutral-500 text-center py-4">
            No tracks available. Add a track to get started.
          </div>
        ) : (
          tracks.map((track) => (
            <div
              key={track.id}
              className={`p-3 bg-white rounded-md border ${
                draggedTrackId === track.id
                  ? "border-primary-500 bg-primary-50" :"border-neutral-200"
              } cursor-move`}
              draggable
              onDragStart={(e) => handleDragStart(e, track.id)}
              onDragOver={(e) => handleDragOver(e, track.id)}
              onDrop={(e) => handleDrop(e, track.id)}
              onDragEnd={handleDragEnd}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Icon name="GripVertical" size={16} className="text-neutral-400 mr-2" />
                  <span className="text-sm font-medium">{track.name}</span>
                </div>
                <button
                  className="text-neutral-400 hover:text-error-500"
                  onClick={() => onRemoveTrack(track.id)}
                >
                  <Icon name="Trash2" size={16} />
                </button>
              </div>
              <div className="mt-2 text-xs text-neutral-500">
                <span className="inline-flex items-center mr-3">
                  <Icon name="LineChart" size={14} className="mr-1" />
                  {track.scale === "logarithmic" ? "Logarithmic" : "Linear"}
                </span>
                <span className="inline-flex items-center">
                  <Icon name="Layers" size={14} className="mr-1" />
                  {track.curves.length} curve{track.curves.length !== 1 ? "s" : ""}
                </span>
              </div>
              {track.curves.length > 0 && (
                <div className="mt-2 pl-2 border-l-2 border-neutral-200">
                  {track.curves.map((curve) => (
                    <div key={curve.id} className="flex items-center text-xs py-1">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: curve.color }}
                      ></div>
                      <span className="font-medium">{curve.name}</span>
                      <span className="ml-1 text-neutral-500">
                        ({curve.min} - {curve.max} {curve.unit})
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TrackManager;