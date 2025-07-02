import React from "react";

import Button from "../../../components/ui/Button";

const ToolBar = ({ variant = "3d" }) => {
  return (
    <div className="flex items-center space-x-2">
      {variant === "3d" && (
        <>
          <Button 
            variant="ghost" 
            size="sm" 
            icon="Target"
            title="Manage Targets"
          >
            Targets
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            icon="GitMerge"
            title="Anti-collision Analysis"
          >
            Anti-collision
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            icon="Waves"
            title="Tortuosity Analysis"
          >
            Tortuosity
          </Button>
          <div className="h-6 border-l border-neutral-200 mx-1"></div>
          <Button 
            variant="ghost" 
            size="sm" 
            icon="Camera"
            title="Take Screenshot"
          >
            Screenshot
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            icon="Maximize2"
            title="Fullscreen"
          />
        </>
      )}
      
      {variant === "2d" && (
        <>
          <Button 
            variant="ghost" 
            size="sm" 
            icon="Ruler"
            title="Measure Distance"
          >
            Measure
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            icon="GitCommit"
            title="Project to Vertical Section"
          >
            Project
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            icon="Target"
            title="Add Target"
          >
            Target
          </Button>
          <div className="h-6 border-l border-neutral-200 mx-1"></div>
          <Button 
            variant="ghost" 
            size="sm" 
            icon="Camera"
            title="Take Screenshot"
          >
            Screenshot
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            icon="Maximize2"
            title="Fullscreen"
          />
        </>
      )}
    </div>
  );
};

export default ToolBar;