import React from "react";
import Icon from "../../../components/AppIcon";


const RecentActivity = () => {
  // Mock activity data
  const activities = [
    {
      id: 1,
      type: "created",
      user: {
        name: "Alex Johnson",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        initials: "AJ",
      },
      workspace: {
        name: "Drilling Operations Dashboard",
        id: 1,
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    {
      id: 2,
      type: "edited",
      user: {
        name: "Sarah Chen",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        initials: "SC",
      },
      workspace: {
        name: "Petrophysical Analysis",
        id: 2,
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    },
    {
      id: 3,
      type: "shared",
      user: {
        name: "Miguel Rodriguez",
        avatar: "https://randomuser.me/api/portraits/men/67.jpg",
        initials: "MR",
      },
      workspace: {
        name: "Production Forecasting",
        id: 3,
      },
      sharedWith: [
        { name: "Alex Johnson", initials: "AJ" },
        { name: "Emma Wilson", initials: "EW" },
      ],
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    },
    {
      id: 4,
      type: "commented",
      user: {
        name: "Emma Wilson",
        avatar: "https://randomuser.me/api/portraits/women/63.jpg",
        initials: "EW",
      },
      workspace: {
        name: "Geological Interpretation",
        id: 4,
      },
      comment: "Added new correlation markers for the upper formation",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    },
    {
      id: 5,
      type: "exported",
      user: {
        name: "John Smith",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
        initials: "JS",
      },
      workspace: {
        name: "Well Trajectory Planning",
        id: 5,
      },
      format: "PDF Report",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    },
  ];

  // Format relative time
  const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const diffMs = now - timestamp;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffSec < 60) {
      return "just now";
    } else if (diffMin < 60) {
      return `${diffMin}m ago`;
    } else if (diffHour < 24) {
      return `${diffHour}h ago`;
    } else if (diffDay < 7) {
      return `${diffDay}d ago`;
    } else {
      return timestamp.toLocaleDateString();
    }
  };

  // Get icon for activity type
  const getActivityIcon = (type) => {
    switch (type) {
      case "created":
        return "Plus";
      case "edited":
        return "Edit2";
      case "shared":
        return "Share2";
      case "commented":
        return "MessageSquare";
      case "exported":
        return "Download";
      default:
        return "Activity";
    }
  };

  // Get color for activity type
  const getActivityColor = (type) => {
    switch (type) {
      case "created":
        return "bg-success-500";
      case "edited":
        return "bg-primary-500";
      case "shared":
        return "bg-info-500";
      case "commented":
        return "bg-warning-500";
      case "exported":
        return "bg-neutral-500";
      default:
        return "bg-neutral-500";
    }
  };

  // Get description for activity
  const getActivityDescription = (activity) => {
    switch (activity.type) {
      case "created":
        return `created a new workspace`;
      case "edited":
        return `edited workspace`;
      case "shared":
        return `shared workspace with ${activity.sharedWith.length} people`;
      case "commented":
        return `commented on workspace`;
      case "exported":
        return `exported workspace as ${activity.format}`;
      default:
        return `interacted with workspace`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-neutral-200">
        <h3 className="text-lg font-medium text-neutral-900">Recent Activity</h3>
      </div>
      
      {/* Activity list */}
      <div className="divide-y divide-neutral-100">
        {activities.map((activity) => (
          <div key={activity.id} className="p-4 hover:bg-neutral-50 transition-colors">
            <div className="flex">
              {/* Activity icon */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white mr-3 ${getActivityColor(activity.type)}`}>
                <Icon name={getActivityIcon(activity.type)} size={16} />
              </div>
              
              {/* Activity content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-neutral-900">
                        {activity.user.name}
                      </span>
                      <span className="ml-1 text-sm text-neutral-500">
                        {getActivityDescription(activity)}
                      </span>
                    </div>
                    <div className="mt-1">
                      <a href="#" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                        {activity.workspace.name}
                      </a>
                    </div>
                    
                    {/* Comment content if available */}
                    {activity.comment && (
                      <div className="mt-2 p-2 bg-neutral-50 rounded-md text-sm text-neutral-700 border border-neutral-200">
                        {activity.comment}
                      </div>
                    )}
                    
                    {/* Shared with users if available */}
                    {activity.type === "shared" && activity.sharedWith && (
                      <div className="mt-2 flex items-center">
                        <span className="text-xs text-neutral-500 mr-2">Shared with:</span>
                        <div className="flex -space-x-2">
                          {activity.sharedWith.map((user, index) => (
                            <div 
                              key={index} 
                              className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center text-xs font-medium text-primary-700 border border-white"
                              title={user.name}
                            >
                              {user.initials}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Timestamp */}
                  <span className="text-xs text-neutral-500 whitespace-nowrap ml-2">
                    {formatRelativeTime(activity.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Footer */}
      <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-200 text-center">
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          View All Activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;