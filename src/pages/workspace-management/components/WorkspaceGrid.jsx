import React from "react";

import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const WorkspaceGrid = ({ searchQuery, sortBy }) => {
  // Mock workspaces data
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedWorkspaces.map((workspace) => (
            <div 
              key={workspace.id} 
              className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              {/* Thumbnail */}
              <div className="relative h-40 overflow-hidden">
                <Image 
                  src={workspace.thumbnail} 
                  alt={workspace.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button 
                    className={`p-1.5 rounded-full bg-white bg-opacity-80 backdrop-blur-sm ${workspace.favorite ? 'text-warning-500' : 'text-neutral-500'} hover:text-warning-500 transition-colors`}
                    aria-label={workspace.favorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Icon name={workspace.favorite ? "Star" : "StarOutline"} size={18} />
                  </button>
                  <button 
                    className="p-1.5 rounded-full bg-white bg-opacity-80 backdrop-blur-sm text-neutral-500 hover:text-neutral-700 transition-colors"
                    aria-label="More options"
                  >
                    <Icon name="MoreVertical" size={18} />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-16 opacity-70"></div>
                <div className="absolute bottom-2 left-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-white bg-opacity-90 text-neutral-800">
                    {workspace.template}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-medium text-neutral-900 mb-1 truncate">
                  {workspace.name}
                </h3>
                <p className="text-neutral-500 text-sm mb-3 line-clamp-2">
                  {workspace.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {workspace.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-neutral-100 text-neutral-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                  <div className="flex items-center text-sm text-neutral-500">
                    <Icon name="Clock" size={14} className="mr-1" />
                    <span>Modified {formatDate(workspace.modified)}</span>
                  </div>
                  
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
              </div>
              
              {/* Action buttons */}
              <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-200 flex justify-between">
                <Button 
                  variant="secondary" 
                  size="sm"
                  icon="Edit2"
                >
                  Edit
                </Button>
                <Button 
                  variant="primary" 
                  size="sm"
                  icon="Play"
                >
                  Open
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkspaceGrid;