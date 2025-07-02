import React, { useState, useEffect } from "react";

import Header from "../../components/ui/Header";
import Sidebar from "../../components/ui/Sidebar";
import Button from "../../components/ui/Button";
import InputSearch from "../../components/ui/InputSearch";
import Icon from "../../components/AppIcon";
import ProjectCard from "./components/ProjectCard";
import MetricsOverview from "./components/MetricsOverview";
import RecentActivity from "./components/RecentActivity";
import FavoriteWorkspaces from "./components/FavoriteWorkspaces";
import NotificationPanel from "./components/NotificationPanel";

const DashboardProjectOverview = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  // Mock user data
  const user = {
    name: "Sarah Johnson",
    email: "sarah.johnson@petrodigital.com",
    initials: "SJ",
    role: "Senior Geologist",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  };

  // Mock projects data
  const projects = [
    {
      id: 1,
      name: "Eagle Ford Shale Development",
      description: "Multi-well development project in the Eagle Ford shale formation focusing on horizontal drilling and hydraulic fracturing optimization.",
      status: "active",
      progress: 68,
      location: "Texas, USA",
      lastUpdated: "2023-05-15T14:30:00Z",
      tags: ["Shale", "Horizontal", "Fracturing"],
      team: [
        { id: 1, name: "Sarah Johnson", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
        { id: 2, name: "Michael Chen", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
        { id: 3, name: "Aisha Patel", avatar: "https://randomuser.me/api/portraits/women/63.jpg" }
      ],
      metrics: {
        wells: 12,
        completions: 8,
        production: "4,500 BOE/d"
      }
    },
    {
      id: 2,
      name: "North Sea Exploration",
      description: "Offshore exploration project in the North Sea targeting deep-water prospects with high potential for oil discovery.",
      status: "planning",
      progress: 25,
      location: "North Sea, Norway",
      lastUpdated: "2023-05-10T09:15:00Z",
      tags: ["Offshore", "Exploration", "Deep-water"],
      team: [
        { id: 4, name: "Erik Larsen", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
        { id: 5, name: "Olivia Wilson", avatar: "https://randomuser.me/api/portraits/women/28.jpg" }
      ],
      metrics: {
        wells: 2,
        completions: 0,
        production: "N/A"
      }
    },
    {
      id: 3,
      name: "Permian Basin Optimization",
      description: "Production optimization project for existing wells in the Permian Basin using advanced analytics and artificial lift technologies.",
      status: "active",
      progress: 82,
      location: "New Mexico, USA",
      lastUpdated: "2023-05-18T11:45:00Z",
      tags: ["Production", "Optimization", "Analytics"],
      team: [
        { id: 6, name: "James Rodriguez", avatar: "https://randomuser.me/api/portraits/men/67.jpg" },
        { id: 7, name: "Emma Thompson", avatar: "https://randomuser.me/api/portraits/women/8.jpg" },
        { id: 8, name: "David Kim", avatar: "https://randomuser.me/api/portraits/men/42.jpg" }
      ],
      metrics: {
        wells: 35,
        completions: 35,
        production: "12,800 BOE/d"
      }
    },
    {
      id: 4,
      name: "Gulf of Mexico Deepwater",
      description: "Deepwater development project in the Gulf of Mexico focusing on subsea infrastructure and floating production systems.",
      status: "active",
      progress: 45,
      location: "Gulf of Mexico, USA",
      lastUpdated: "2023-05-12T16:20:00Z",
      tags: ["Deepwater", "Subsea", "Floating Production"],
      team: [
        { id: 9, name: "Carlos Mendez", avatar: "https://randomuser.me/api/portraits/men/55.jpg" },
        { id: 10, name: "Sophia Lee", avatar: "https://randomuser.me/api/portraits/women/33.jpg" }
      ],
      metrics: {
        wells: 5,
        completions: 3,
        production: "25,000 BOE/d"
      }
    },
    {
      id: 5,
      name: "Bakken Shale Infill Drilling",
      description: "Infill drilling program in the Bakken shale formation to increase recovery and optimize field development.",
      status: "completed",
      progress: 100,
      location: "North Dakota, USA",
      lastUpdated: "2023-04-28T13:10:00Z",
      tags: ["Infill", "Shale", "Recovery"],
      team: [
        { id: 11, name: "Robert Johnson", avatar: "https://randomuser.me/api/portraits/men/91.jpg" },
        { id: 12, name: "Jennifer Wu", avatar: "https://randomuser.me/api/portraits/women/17.jpg" }
      ],
      metrics: {
        wells: 18,
        completions: 18,
        production: "6,200 BOE/d"
      }
    },
    {
      id: 6,
      name: "Brazil Pre-Salt Exploration",
      description: "Exploration project targeting pre-salt formations offshore Brazil with potential for significant hydrocarbon discoveries.",
      status: "planning",
      progress: 15,
      location: "Santos Basin, Brazil",
      lastUpdated: "2023-05-05T10:30:00Z",
      tags: ["Pre-salt", "Exploration", "Offshore"],
      team: [
        { id: 13, name: "Luiz Silva", avatar: "https://randomuser.me/api/portraits/men/62.jpg" },
        { id: 14, name: "Maria Santos", avatar: "https://randomuser.me/api/portraits/women/59.jpg" }
      ],
      metrics: {
        wells: 1,
        completions: 0,
        production: "N/A"
      }
    }
  ];

  // Mock metrics data
  const metrics = {
    activeProjects: 4,
    completedProjects: 1,
    planningProjects: 2,
    totalWells: 73,
    activeWells: 52,
    totalProduction: "48,500 BOE/d",
    recentActivities: 28,
    pendingTasks: 12
  };

  // Mock recent activity data
  const recentActivities = [
    {
      id: 1,
      type: "update",
      project: "Eagle Ford Shale Development",
      user: "Michael Chen",
      userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      description: "Updated drilling plan for Well EF-103",
      timestamp: "2023-05-18T15:30:00Z"
    },
    {
      id: 2,
      type: "comment",
      project: "Permian Basin Optimization",
      user: "Emma Thompson",
      userAvatar: "https://randomuser.me/api/portraits/women/8.jpg",
      description: "Added comment on production decline analysis",
      timestamp: "2023-05-18T14:15:00Z"
    },
    {
      id: 3,
      type: "file",
      project: "Gulf of Mexico Deepwater",
      user: "Carlos Mendez",
      userAvatar: "https://randomuser.me/api/portraits/men/55.jpg",
      description: "Uploaded new seismic interpretation report",
      timestamp: "2023-05-18T11:45:00Z"
    },
    {
      id: 4,
      type: "task",
      project: "North Sea Exploration",
      user: "Olivia Wilson",
      userAvatar: "https://randomuser.me/api/portraits/women/28.jpg",
      description: "Completed environmental impact assessment",
      timestamp: "2023-05-18T09:20:00Z"
    },
    {
      id: 5,
      type: "meeting",
      project: "Eagle Ford Shale Development",
      user: "Sarah Johnson",
      userAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      description: "Scheduled team meeting for fracturing design review",
      timestamp: "2023-05-17T16:30:00Z"
    }
  ];

  // Mock favorite workspaces data
  const favoriteWorkspaces = [
    {
      id: 1,
      name: "Eagle Ford Geology",
      description: "Geological analysis workspace for Eagle Ford project",
      icon: "Mountain",
      color: "bg-primary-100 text-primary-700",
      lastAccessed: "2023-05-18T10:15:00Z"
    },
    {
      id: 2,
      name: "Permian Production",
      description: "Production monitoring dashboard for Permian Basin",
      icon: "BarChart3",
      color: "bg-success-100 text-success-700",
      lastAccessed: "2023-05-17T14:30:00Z"
    },
    {
      id: 3,
      name: "Gulf of Mexico Drilling",
      description: "Real-time drilling data visualization",
      icon: "Drill",
      color: "bg-warning-100 text-warning-700",
      lastAccessed: "2023-05-16T09:45:00Z"
    }
  ];

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: "alert",
      title: "Production Alert",
      description: "Sudden pressure drop detected in Well PB-24 (Permian Basin)",
      timestamp: "2023-05-18T14:30:00Z",
      read: false
    },
    {
      id: 2,
      type: "update",
      title: "System Update",
      description: "Well Lifecycle SDK v2.3.1 has been deployed with new features",
      timestamp: "2023-05-18T09:15:00Z",
      read: false
    },
    {
      id: 3,
      type: "message",
      title: "New Message",
      description: "Michael Chen shared drilling parameters for review",
      timestamp: "2023-05-17T16:45:00Z",
      read: true
    },
    {
      id: 4,
      type: "task",
      title: "Task Assignment",
      description: "You\'ve been assigned to review seismic data for North Sea project",
      timestamp: "2023-05-17T11:20:00Z",
      read: true
    },
    {
      id: 5,
      type: "calendar",
      title: "Meeting Reminder",
      description: "Project review meeting for Eagle Ford in 30 minutes",
      timestamp: "2023-05-18T15:00:00Z",
      read: false
    }
  ];

  // Filter projects based on search query and active filter
  useEffect(() => {
    let filtered = [...projects];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        project =>
          project.name.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.location.toLowerCase().includes(query) ||
          project.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply status filter
    if (activeFilter !== "all") {
      filtered = filtered.filter(project => project.status === activeFilter);
    }
    
    setFilteredProjects(filtered);
  }, [searchQuery, activeFilter]);

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Handle sidebar toggle
  const handleSidebarToggle = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  // Handle notification toggle
  const handleNotificationToggle = () => {
    setShowNotifications(!showNotifications);
  };

  // Handle filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
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
          onNotificationsClick={handleNotificationToggle}
        />
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Dashboard header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
                <p className="text-neutral-500 mt-1">Welcome back, {user.name}</p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-3">
                <InputSearch 
                  placeholder="Search projects..." 
                  onSearch={handleSearch}
                  className="w-full md:w-64"
                />
                <Button 
                  icon="Plus"
                  variant="primary"
                >
                  Create New Project
                </Button>
              </div>
            </div>
            
            {/* Metrics overview */}
            <MetricsOverview metrics={metrics} />
            
            {/* Projects section */}
            <div className="mt-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-neutral-900">Projects</h2>
                <div className="mt-3 md:mt-0 flex flex-wrap items-center space-x-2">
                  <Button 
                    size="sm" 
                    variant={activeFilter === "all" ? "primary" : "secondary"}
                    onClick={() => handleFilterChange("all")}
                  >
                    All
                  </Button>
                  <Button 
                    size="sm" 
                    variant={activeFilter === "active" ? "primary" : "secondary"}
                    onClick={() => handleFilterChange("active")}
                  >
                    Active
                  </Button>
                  <Button 
                    size="sm" 
                    variant={activeFilter === "planning" ? "primary" : "secondary"}
                    onClick={() => handleFilterChange("planning")}
                  >
                    Planning
                  </Button>
                  <Button 
                    size="sm" 
                    variant={activeFilter === "completed" ? "primary" : "secondary"}
                    onClick={() => handleFilterChange("completed")}
                  >
                    Completed
                  </Button>
                </div>
              </div>
              
              {/* Projects grid */}
              {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-neutral-200 p-8 text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-neutral-100">
                    <Icon name="Search" size={24} className="text-neutral-500" />
                  </div>
                  <h3 className="mt-2 text-lg font-medium text-neutral-900">No projects found</h3>
                  <p className="mt-1 text-neutral-500">
                    {searchQuery 
                      ? `No projects matching "${searchQuery}"`
                      : "No projects available for the selected filter"}
                  </p>
                  <div className="mt-6">
                    <Button 
                      variant="primary"
                      icon="Plus"
                    >
                      Create New Project
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Activity and workspaces section */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent activity */}
              <div className="lg:col-span-2">
                <RecentActivity activities={recentActivities} />
              </div>
              
              {/* Favorite workspaces */}
              <div>
                <FavoriteWorkspaces workspaces={favoriteWorkspaces} />
              </div>
            </div>
          </div>
        </main>
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
};

export default DashboardProjectOverview;