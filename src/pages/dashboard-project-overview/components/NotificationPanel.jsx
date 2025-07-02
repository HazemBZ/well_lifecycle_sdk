import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const NotificationPanel = ({ notifications, onClose }) => {
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
  
  // Get icon for notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "alert":
        return "AlertTriangle";
      case "update":
        return "RefreshCw";
      case "message":
        return "MessageSquare";
      case "task":
        return "CheckSquare";
      case "calendar":
        return "Calendar";
      default:
        return "Bell";
    }
  };
  
  // Get color for notification type
  const getNotificationColor = (type) => {
    switch (type) {
      case "alert":
        return "bg-error-100 text-error-600";
      case "update":
        return "bg-primary-100 text-primary-600";
      case "message":
        return "bg-info-100 text-info-600";
      case "task":
        return "bg-success-100 text-success-600";
      case "calendar":
        return "bg-warning-100 text-warning-600";
      default:
        return "bg-neutral-100 text-neutral-600";
    }
  };

  // Count unread notifications
  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        {/* Background overlay */}
        <div 
          className="absolute inset-0 bg-neutral-500 bg-opacity-75 transition-opacity" 
          aria-hidden="true"
          onClick={onClose}
        ></div>
        
        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="relative w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
              {/* Header */}
              <div className="px-4 py-6 sm:px-6 border-b border-neutral-200">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-neutral-900" id="slide-over-title">
                    Notifications
                  </h2>
                  <div className="ml-3 h-7 flex items-center">
                    <button
                      type="button"
                      className="bg-white rounded-md text-neutral-400 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      onClick={onClose}
                    >
                      <span className="sr-only">Close panel</span>
                      <Icon name="X" size={24} />
                    </button>
                  </div>
                </div>
                <div className="mt-1 flex items-center">
                  <span className="text-sm text-neutral-500">
                    {unreadCount} unread notifications
                  </span>
                  <Button 
                    variant="tertiary" 
                    size="sm" 
                    className="ml-auto"
                  >
                    Mark all as read
                  </Button>
                </div>
              </div>
              
              {/* Notification list */}
              <div className="divide-y divide-neutral-200">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-4 hover:bg-neutral-50 transition-colors duration-200 ${!notification.read ? 'bg-primary-50' : ''}`}
                  >
                    <div className="flex">
                      <div className="mr-4">
                        <div className={`p-2 rounded-lg ${getNotificationColor(notification.type)}`}>
                          <Icon name={getNotificationIcon(notification.type)} size={16} />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-neutral-900">{notification.title}</p>
                            <p className="text-sm text-neutral-600 mt-1">{notification.description}</p>
                          </div>
                          {!notification.read && (
                            <div className="ml-2 flex-shrink-0">
                              <div className="h-2 w-2 rounded-full bg-primary-600"></div>
                            </div>
                          )}
                        </div>
                        <div className="mt-2 text-xs text-neutral-500">
                          {formatRelativeTime(notification.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Footer */}
              <div className="px-4 py-4 border-t border-neutral-200 bg-neutral-50 mt-auto">
                <Button 
                  variant="tertiary" 
                  fullWidth
                  icon="Settings"
                >
                  Notification Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;