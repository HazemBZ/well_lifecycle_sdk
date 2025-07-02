import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const WorkspaceList = ({ searchQuery, sortBy }) => {
  // Mock workspaces data (same as in WorkspaceGrid)
  const workspaces = [
    {
      id: 1,
      name: "Drilling Operations Dashboard",
      description: "Real-time monitoring of drilling parameters with visualization components",
      thumbnail: "https://images.unsplash.com/photo-1582482520201-7c3408fdbf9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      template: "Drilling Engineer",
      created: "2023-10-15T14:30:00Z",
      modified: "2023-11-02T09:45:00Z",
      usageCount: 42,
      shared: true,
      sharedWith: [
        { id: 1, name: "Sarah Chen", initials: "SC" },
        { id: 2, name: "Miguel Rodriguez", initials: "MR" },
        { id: 3, name: "Aisha Patel", initials: "AP" },
      ],
      tags: ["drilling", "real-time", "operations"],
      favorite: true,
    },
    {
      id: 2,
      name: "Petrophysical Analysis",
      description: "Comprehensive log analysis workspace with crossplots and histograms",
      thumbnail: "https://images.pexels.com/photos/4386442/pexels-photo-4386442.jpeg?auto=compress&cs=tinysrgb&w=800",
      template: "Petrophysicist",
      created: "2023-09-20T10:15:00Z",
      modified: "2023-11-05T16:30:00Z",
      usageCount: 28,
      shared: true,
      sharedWith: [
        { id: 4, name: "John Smith", initials: "JS" },
        { id: 5, name: "Emma Wilson", initials: "EW" },
      ],
      tags: ["petrophysics", "log analysis", "crossplots"],
      favorite: false,
    },
    {
      id: 3,
      name: "Production Forecasting",
      description: "Decline curve analysis and production forecasting tools",
      thumbnail: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      template: "Production Engineer",
      created: "2023-08-05T08:45:00Z",
      modified: "2023-10-28T11:20:00Z",
      usageCount: 35,
      shared: false,
      sharedWith: [],
      tags: ["production", "forecasting", "decline analysis"],
      favorite: true,
    },
    {
      id: 4,
      name: "Geological Interpretation",
      description: "Stratigraphic correlation and facies analysis workspace",
      thumbnail: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800",
      template: "Geologist",
      created: "2023-07-12T13:10:00Z",
      modified: "2023-10-15T09:30:00Z",
      usageCount: 19,
      shared: true,
      sharedWith: [
        { id: 6, name: "David Kim", initials: "DK" },
      ],
      tags: ["geology", "stratigraphy", "correlation"],
      favorite: false,
    },
    {
      id: 5,
      name: "Well Trajectory Planning",
      description: "3D well path planning and survey visualization",
      thumbnail: "https://images.unsplash.com/photo-1581093196277-9f608bb3b4b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      template: "Drilling Engineer",
      created: "2023-09-08T15:20:00Z",
      modified: "2023-11-01T14:15:00Z",
      usageCount: 23,
      shared: true,
      sharedWith: [
        { id: 7, name: "Lisa Johnson", initials: "LJ" },
        { id: 8, name: "Robert Chen", initials: "RC" },
      ],
      tags: ["well planning", "trajectory", "3D visualization"],
      favorite: true,
    },
    {
      id: 6,
      name: "Reservoir Simulation",
      description: "Reservoir modeling and simulation results visualization",
      thumbnail: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=800",
      template: "Reservoir Engineer",
      created: "2023-10-01T09:00:00Z",
      modified: "2023-10-20T16:45:00Z",
      usageCount: 15,
      shared: false,
      sharedWith: [],
      tags: ["reservoir", "simulation", "modeling"],
      favorite: false,
    },
  ];

  // Filter workspaces based on search query
  const filteredWorkspaces = workspaces.filter(workspace => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      workspace.name.toLowerCase().includes(query) ||
      workspace.description.toLowerCase().includes(query) ||
      workspace.template.toLowerCase().includes(query) ||
      workspace.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });

  // Sort workspaces based on selected option
  const sortedWorkspaces = [...filteredWorkspaces].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "created":
        return new Date(b.created) - new Date(a.created);
      case "recent":
        return new Date(b.modified) - new Date(a.modified);
      case "popular":
        return b.usageCount - a.usageCount;
      default:
        return 0;
    }
  });

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div>
      {sortedWorkspaces.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
            <Icon name="Search" size={24} className="text-neutral-400" />
          </div>
          <h3 className="text-lg font-medium text-neutral-900 mb-2">No workspaces found</h3>
          <p className="text-neutral-500 mb-4">
            We couldn't find any workspaces matching your search criteria.
          </p>
          <Button variant="primary" icon="Plus" onClick={() => console.log("Create workspace")}>
            Create New Workspace
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-neutral-50 border-b border-neutral-200">
            <div className="col-span-5 sm:col-span-6 flex items-center text-sm font-medium text-neutral-700">
              Workspace
            </div>
            <div className="col-span-3 hidden md:flex items-center text-sm font-medium text-neutral-700">
              Template
            </div>
            <div className="col-span-4 sm:col-span-3 md:col-span-2 flex items-center text-sm font-medium text-neutral-700">
              Modified
            </div>
            <div className="col-span-3 hidden md:flex items-center text-sm font-medium text-neutral-700">
              Sharing
            </div>
            <div className="col-span-3 sm:col-span-2 md:col-span-1 flex items-center justify-end text-sm font-medium text-neutral-700">
              Actions
            </div>
          </div>
          
          {/* Table rows */}
          {sortedWorkspaces.map((workspace) => (
            <div 
              key={workspace.id} 
              className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-neutral-100 hover:bg-neutral-50 transition-colors"
            >
              {/* Workspace name and thumbnail */}
              <div className="col-span-5 sm:col-span-6 flex items-center">
                <div className="h-10 w-10 rounded overflow-hidden flex-shrink-0 mr-3">
                  <Image 
                    src={workspace.thumbnail} 
                    alt={workspace.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center">
                    <h3 className="text-sm font-medium text-neutral-900 truncate mr-2">
                      {workspace.name}
                    </h3>
                    {workspace.favorite && (
                      <Icon name="Star" size={16} className="text-warning-500 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 truncate">
                    {workspace.description}
                  </p>
                </div>
              </div>
              
              {/* Template */}
              <div className="col-span-3 hidden md:flex items-center">
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-neutral-100 text-neutral-700">
                  {workspace.template}
                </span>
              </div>
              
              {/* Modified date */}
              <div className="col-span-4 sm:col-span-3 md:col-span-2 flex items-center">
                <div className="text-sm text-neutral-500">
                  {formatDate(workspace.modified)}
                </div>
              </div>
              
              {/* Sharing */}
              <div className="col-span-3 hidden md:flex items-center">
                {workspace.shared ? (
                  <div className="flex -space-x-2">
                    {workspace.sharedWith.slice(0, 3).map((user) => (
                      <div 
                        key={user.id} 
                        className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center text-xs font-medium text-primary-700 border border-white"
                        title={user.name}
                      >
                        {user.initials}
                      </div>
                    ))}
                    {workspace.sharedWith.length > 3 && (
                      <div className="h-6 w-6 rounded-full bg-neutral-100 flex items-center justify-center text-xs font-medium text-neutral-700 border border-white">
                        +{workspace.sharedWith.length - 3}
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="text-sm text-neutral-500 flex items-center">
                    <Icon name="Lock" size={14} className="mr-1" />
                    Private
                  </span>
                )}
              </div>
              
              {/* Actions */}
              <div className="col-span-3 sm:col-span-2 md:col-span-1 flex items-center justify-end space-x-2">
                <button 
                  className="p-1.5 rounded text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100"
                  aria-label="Edit workspace"
                >
                  <Icon name="Edit2" size={16} />
                </button>
                <button 
                  className="p-1.5 rounded text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100"
                  aria-label="Open workspace"
                >
                  <Icon name="ExternalLink" size={16} />
                </button>
                <button 
                  className="p-1.5 rounded text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100"
                  aria-label="More options"
                >
                  <Icon name="MoreVertical" size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkspaceList;