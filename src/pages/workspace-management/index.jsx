import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/ui/Header";
import Sidebar from "../../components/ui/Sidebar";
import Button from "../../components/ui/Button";
import Dropdown from "../../components/ui/Dropdown";
import Icon from "../../components/AppIcon";
import WorkspaceGrid from "./components/WorkspaceGrid";
import WorkspaceList from "./components/WorkspaceList";
import CreateWorkspaceModal from "./components/CreateWorkspaceModal";
import FilterPanel from "./components/FilterPanel";
import RecentActivity from "./components/RecentActivity";
import { sortOptions, user } from "./workspaceMockData";

const WorkspaceManagement = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState({ value: "recent", label: "Recently Modified" });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  
  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header 
          user={user} 
          onSearch={handleSearch}
          onNotificationsClick={() => console.log("Notifications clicked")}
          onHelpClick={() => console.log("Help clicked")}
        />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Page header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-neutral-900">Workspace Management</h1>
              <p className="text-neutral-500 mt-1">Create, customize, and manage your workspaces</p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
              <Button 
                icon="Filter"
                variant="secondary"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                Filter
              </Button>
              <Link to="/dashboard-project-overview">
                <Button 
                  icon="LayoutDashboard"
                  variant="secondary"
                >
                  Dashboard
                </Button>
              </Link>
              <Button 
                icon="Plus"
                onClick={() => setIsCreateModalOpen(true)}
              >
                Create Workspace
              </Button>
            </div>
          </div>

          {/* Filters and view controls */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  className={`p-2 rounded-md ${viewMode === "grid" ? "bg-primary-50 text-primary-600" : "text-neutral-500 hover:bg-neutral-100"}`}
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                >
                  <Icon name="Grid" size={20} />
                </button>
                <button
                  className={`p-2 rounded-md ${viewMode === "list" ? "bg-primary-50 text-primary-600" : "text-neutral-500 hover:bg-neutral-100"}`}
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                >
                  <Icon name="List" size={20} />
                </button>
                <div className="h-6 w-px bg-neutral-200 mx-2"></div>
                <span className="text-sm text-neutral-500">
                  {searchQuery ? "Search results" : "All workspaces"}
                </span>
              </div>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="w-full sm:w-48">
                  <Dropdown
                    label="Sort by"
                    options={sortOptions}
                    value={sortBy}
                    onChange={setSortBy}
                    fullWidth
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main content area with filter panel */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filter panel (conditionally rendered) */}
            {isFilterOpen && (
              <div className="lg:w-64 flex-shrink-0">
                <FilterPanel onClose={() => setIsFilterOpen(false)} />
              </div>
            )}

            {/* Workspaces grid/list */}
            <div className="flex-1">
              {viewMode === "grid" ? (
                <WorkspaceGrid searchQuery={searchQuery} sortBy={sortBy.value} />
              ) : (
                <WorkspaceList searchQuery={searchQuery} sortBy={sortBy.value} />
              )}
            </div>

            {/* Recent activity sidebar */}
            <div className="hidden xl:block w-80 flex-shrink-0">
              <RecentActivity />
            </div>
          </div>
        </main>
      </div>

      {/* Create workspace modal */}
      {isCreateModalOpen && (
        <CreateWorkspaceModal 
          onClose={() => setIsCreateModalOpen(false)} 
          onCreateWorkspace={(data) => {
            console.log("Creating workspace:", data);
            setIsCreateModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default WorkspaceManagement;