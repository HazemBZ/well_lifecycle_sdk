import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/ui/Header";
import Sidebar from "../../components/ui/Sidebar";
import Button from "../../components/ui/Button";
import InputSearch from "../../components/ui/InputSearch";

import PluginDirectory from "./components/PluginDirectory";
import InstalledPlugins from "./components/InstalledPlugins";
import SDKConfiguration from "./components/SDKConfiguration";
import PluginPermissions from "./components/PluginPermissions";
import SystemHealth from "./components/SystemHealth";
import AuditLog from "./components/AuditLog";
import { user } from "./pluginManagementMockData";

const PluginManagementSDKConfiguration = () => {
  const [activeTab, setActiveTab] = useState("installed");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Handle sidebar toggle
  const handleSidebarToggle = (collapsed) => {
    setSidebarCollapsed(collapsed);
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
          onSearch={handleSearch}
        />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-neutral-900">Plugin Management & SDK Configuration</h1>
                <p className="mt-1 text-sm text-neutral-500">
                  Manage plugins and configure the SDK settings for your platform
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <Button 
                  variant="primary" 
                  icon="Upload"
                >
                  Upload Plugin
                </Button>
                <Button 
                  variant="secondary" 
                  icon="RefreshCw"
                >
                  Refresh
                </Button>
              </div>
            </div>

            {/* Navigation tabs */}
            <div className="border-b border-neutral-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                <button
                  className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "installed" ?"border-primary-500 text-primary-600" :"border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                  }`}
                  onClick={() => setActiveTab("installed")}
                >
                  Installed Plugins
                </button>
                <button
                  className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "available" ?"border-primary-500 text-primary-600" :"border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                  }`}
                  onClick={() => setActiveTab("available")}
                >
                  Available Plugins
                </button>
                <button
                  className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "configuration" ?"border-primary-500 text-primary-600" :"border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                  }`}
                  onClick={() => setActiveTab("configuration")}
                >
                  SDK Configuration
                </button>
                <button
                  className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "permissions" ?"border-primary-500 text-primary-600" :"border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                  }`}
                  onClick={() => setActiveTab("permissions")}
                >
                  Permissions
                </button>
                <button
                  className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "health" ?"border-primary-500 text-primary-600" :"border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                  }`}
                  onClick={() => setActiveTab("health")}
                >
                  System Health
                </button>
                <button
                  className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "audit" ?"border-primary-500 text-primary-600" :"border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                  }`}
                  onClick={() => setActiveTab("audit")}
                >
                  Audit Log
                </button>
              </nav>
            </div>

            {/* Search and filters */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div className="w-full md:w-64 mb-4 md:mb-0">
                <InputSearch
                  placeholder="Search plugins..."
                  onSearch={handleSearch}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex space-x-3">
                <Button 
                  variant="ghost" 
                  icon="Filter"
                  size="sm"
                >
                  Filter
                </Button>
                <Button 
                  variant="ghost" 
                  icon="SortAsc"
                  size="sm"
                >
                  Sort
                </Button>
                <Link to="/dashboard-project-overview">
                  <Button 
                    variant="ghost" 
                    icon="ArrowLeft"
                    size="sm"
                  >
                    Back to Dashboard
                  </Button>
                </Link>
              </div>
            </div>

            {/* Tab content */}
            <div className="bg-white rounded-lg shadow">
              {activeTab === "installed" && <InstalledPlugins searchQuery={searchQuery} />}
              {activeTab === "available" && <PluginDirectory searchQuery={searchQuery} />}
              {activeTab === "configuration" && <SDKConfiguration />}
              {activeTab === "permissions" && <PluginPermissions />}
              {activeTab === "health" && <SystemHealth />}
              {activeTab === "audit" && <AuditLog />}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-neutral-200 py-4 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-neutral-500">
              &copy; {new Date().getFullYear()} PetroDigital. All rights reserved.
            </div>
            <div className="mt-2 md:mt-0 flex space-x-4">
              <a href="#" className="text-sm text-neutral-500 hover:text-neutral-700">Privacy Policy</a>
              <a href="#" className="text-sm text-neutral-500 hover:text-neutral-700">Terms of Service</a>
              <a href="#" className="text-sm text-neutral-500 hover:text-neutral-700">Contact Support</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PluginManagementSDKConfiguration;