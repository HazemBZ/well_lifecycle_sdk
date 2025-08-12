import Header from "components/ui/Header";
import Sidebar from "components/ui/Sidebar";
import { Outlet } from "react-router-dom";

import {
  favoriteWorkspaces,
  metrics,
  notifications,
  projects,
  recentActivities,
  user,
} from "../../mockData/dashboardMockData";
import { useState } from "react";

function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  // Handle sidebar toggle
  const handleSidebarToggle = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  // Handle notification toggle
  const handleNotificationToggle = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Sidebar */}
      <Sidebar
        variant={sidebarCollapsed ? "collapsed" : "expanded"}
        onToggle={handleSidebarToggle}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          user={user}
          //   onSearch={handleSearch}
          onNotificationsClick={handleNotificationToggle}
        />
      <Outlet />
      </div>


      {/* Notification panel */}
      {showNotifications && (
        <NotificationPanel
          notifications={notifications}
          onClose={handleNotificationToggle}
        />
      )}
    </div>
  );
}

export { DashboardLayout };
