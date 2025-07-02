import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const RecentActivity = ({ activities }) => {
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
  
  // Get icon for activity type
  const getActivityIcon = (type) => {
    switch (type) {
      case "update":
        return "RefreshCw";
      case "comment":
        return "MessageSquare";
      case "file":
        return "File";
      case "task":
        return "CheckSquare";
      case "meeting":
        return "Calendar";
      default:
        return "Activity";
    }
  };
  
  // Get color for activity type
  const getActivityColor = (type) => {
    switch (type) {
      case "update":
        return "bg-primary-100 text-primary-600";
      case "comment":
        return "bg-info-100 text-info-600";
      case "file":
        return "bg-warning-100 text-warning-600";
      case "task":
        return "bg-success-100 text-success-600";
      case "meeting":
        return "bg-neutral-100 text-neutral-600";
      default:
        return "bg-neutral-100 text-neutral-600";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-neutral-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-neutral-900">Recent Activity</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          icon="RefreshCw"
        >
          Refresh
        </Button>
      </div>
      
      <div className="divide-y divide-neutral-200">
        {activities.map((activity) => (
          <div key={activity.id} className="p-4 hover:bg-neutral-50 transition-colors duration-200">
            <div className="flex">
              <div className="mr-4">
                <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                  <Icon name={getActivityIcon(activity.type)} size={16} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{activity.project}</p>
                    <p className="text-sm text-neutral-600">{activity.description}</p>
                  </div>
                  <span className="text-xs text-neutral-500 whitespace-nowrap ml-2">
                    {formatRelativeTime(activity.timestamp)}
                  </span>
                </div>
                <div className="mt-2 flex items-center">
                  <img 
                    src={activity.userAvatar} 
                    alt={activity.user} 
                    className="h-5 w-5 rounded-full mr-1"
                  />
                  <span className="text-xs text-neutral-500">{activity.user}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-200 text-center">
        <Button 
          variant="tertiary" 
          size="sm" 
          icon="ChevronDown"
          iconPosition="right"
        >
          View More
        </Button>
      </div>
    </div>
  );
};

export default RecentActivity;