import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const FavoriteWorkspaces = ({ workspaces }) => {
  // Format date relative to now
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffDay > 0) {
      return diffDay === 1 ? "Yesterday" : `${diffDay} days ago`;
    }
    if (diffHour > 0) {
      return `${diffHour} ${diffHour === 1 ? "hour" : "hours"} ago`;
    }
    if (diffMin > 0) {
      return `${diffMin} ${diffMin === 1 ? "minute" : "minutes"} ago`;
    }
    return "Just now";
  };

  return (
    <div className="bg-white rounded-lg border border-neutral-200 shadow-sm overflow-hidden h-full">
      <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-neutral-900">Favorite Workspaces</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          icon="Plus"
        >
          Add
        </Button>
      </div>
      
      <div className="divide-y divide-neutral-200">
        {workspaces.map((workspace) => (
          <Link 
            key={workspace.id} 
            to="/workspace-management" 
            className="block p-4 hover:bg-neutral-50 transition-colors duration-200"
          >
            <div className="flex items-start">
              <div className={`p-2 rounded-lg ${workspace.color} mr-3`}>
                <Icon name={workspace.icon} size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-900">{workspace.name}</p>
                <p className="text-xs text-neutral-600 mt-0.5 line-clamp-1">{workspace.description}</p>
                <p className="text-xs text-neutral-500 mt-1">
                  Last accessed {formatRelativeTime(workspace.lastAccessed)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-200">
        <Link 
          to="/workspace-management" 
          className="block text-center text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          View All Workspaces
        </Link>
      </div>
    </div>
  );
};

export default FavoriteWorkspaces;