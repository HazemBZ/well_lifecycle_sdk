import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Dropdown from "../../../components/ui/Dropdown";
import InputSearch from "../../../components/ui/InputSearch";

const AuditTrail = ({ project }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState(null);
  const [filterUser, setFilterUser] = useState(null);
  const [dateRange, setDateRange] = useState({ value: "all", label: "All Time" });
  const [expandedItems, setExpandedItems] = useState([]);

  // Mock audit trail data
  const mockAuditTrail = [
    {
      id: 1,
      action: "project_created",
      description: "Project created",
      user: {
        name: "John Doe",
        email: "john.doe@petrodigital.com",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      timestamp: "2023-11-15T10:30:00Z",
      details: {
        name: "North Sea Exploration",
        description: "Offshore exploration project in the North Sea region focusing on new oil reserves discovery.",
        status: "planning"
      }
    },
    {
      id: 2,
      action: "team_member_added",
      description: "Team member added",
      user: {
        name: "Sarah Johnson",
        email: "sarah.johnson@petrodigital.com",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      timestamp: "2023-11-16T14:45:00Z",
      details: {
        member: {
          name: "Michael Chen",
          email: "michael.chen@petrodigital.com",
          role: "Data Scientist"
        },
        projectRole: "Contributor"
      }
    },
    {
      id: 3,
      action: "plugin_enabled",
      description: "Plugin enabled",
      user: {
        name: "John Doe",
        email: "john.doe@petrodigital.com",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      timestamp: "2023-11-17T09:15:00Z",
      details: {
        plugin: "Geology",
        version: "1.5.2"
      }
    },
    {
      id: 4,
      action: "location_updated",
      description: "Location updated",
      user: {
        name: "Emily Rodriguez",
        email: "emily.rodriguez@petrodigital.com",
        avatar: "https://randomuser.me/api/portraits/women/33.jpg"
      },
      timestamp: "2023-11-18T11:20:00Z",
      details: {
        previous: {
          latitude: 29.7604,
          longitude: -95.3698,
          field: "Houston"
        },
        current: {
          latitude: 29.7605,
          longitude: -95.3699,
          field: "Houston North"
        }
      }
    },
    {
      id: 5,
      action: "wells_imported",
      description: "Wells imported",
      user: {
        name: "Robert Kim",
        email: "robert.kim@petrodigital.com",
        avatar: "https://randomuser.me/api/portraits/men/41.jpg"
      },
      timestamp: "2023-11-20T15:45:00Z",
      details: {
        count: 12,
        source: "wells_import.csv",
        successful: 10,
        failed: 2
      }
    },
    {
      id: 6,
      action: "project_status_changed",
      description: "Project status changed",
      user: {
        name: "John Doe",
        email: "john.doe@petrodigital.com",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      timestamp: "2023-11-22T08:30:00Z",
      details: {
        previous: "planning",
        current: "active"
      }
    },
    {
      id: 7,
      action: "team_member_removed",
      description: "Team member removed",
      user: {
        name: "Lisa Wang",
        email: "lisa.wang@petrodigital.com",
        avatar: "https://randomuser.me/api/portraits/women/67.jpg"
      },
      timestamp: "2023-11-25T13:10:00Z",
      details: {
        member: {
          name: "David Smith",
          email: "david.smith@petrodigital.com",
          role: "Reservoir Engineer"
        }
      }
    },
    {
      id: 8,
      action: "plugin_disabled",
      description: "Plugin disabled",
      user: {
        name: "John Doe",
        email: "john.doe@petrodigital.com",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      timestamp: "2023-11-28T09:45:00Z",
      details: {
        plugin: "Mudlogging",
        version: "1.0.4",
        reason: "Not needed for current phase"
      }
    },
    {
      id: 9,
      action: "project_description_updated",
      description: "Project description updated",
      user: {
        name: "Sarah Johnson",
        email: "sarah.johnson@petrodigital.com",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      timestamp: "2023-11-30T10:15:00Z",
      details: {
        previous: "Offshore exploration project in the North Sea region.",
        current: "Offshore exploration project in the North Sea region focusing on new oil reserves discovery."
      }
    },
    {
      id: 10,
      action: "team_member_role_changed",
      description: "Team member role changed",
      user: {
        name: "John Doe",
        email: "john.doe@petrodigital.com",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      timestamp: "2023-12-01T14:20:00Z",
      details: {
        member: {
          name: "Emily Rodriguez",
          email: "emily.rodriguez@petrodigital.com",
          role: "Drilling Engineer"
        },
        previous: "Contributor",
        current: "Administrator"
      }
    }
  ];

  // Action type filter options
  const actionTypeOptions = [
    { value: "all", label: "All Actions" },
    { value: "project", label: "Project Changes", icon: "FileText" },
    { value: "team", label: "Team Changes", icon: "Users" },
    { value: "plugin", label: "Plugin Changes", icon: "Puzzle" },
    { value: "location", label: "Location Changes", icon: "MapPin" },
    { value: "import", label: "Data Imports", icon: "Upload" }
  ];

  // User filter options
  const userOptions = [
    { value: "all", label: "All Users" },
    ...Array.from(new Set(mockAuditTrail.map(item => item.user.email))).map(email => {
      const user = mockAuditTrail.find(item => item.user.email === email).user;
      return {
        value: email,
        label: user.name,
        icon: "User"
      };
    })
  ];

  // Date range options
  const dateRangeOptions = [
    { value: "all", label: "All Time" },
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "custom", label: "Custom Range" }
  ];

  // Filter audit trail items
  const filteredAuditTrail = mockAuditTrail.filter(item => {
    // Search filter
    const matchesSearch = searchQuery
      ? item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        JSON.stringify(item.details).toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    // Action type filter
    const matchesType = !filterType || filterType.value === "all"
      ? true
      : filterType.value === "project" && (item.action.includes("project") || item.action.includes("wells"))
      ? true
      : filterType.value === "team" && item.action.includes("team")
      ? true
      : filterType.value === "plugin" && item.action.includes("plugin")
      ? true
      : filterType.value === "location" && item.action.includes("location")
      ? true
      : filterType.value === "import" && item.action.includes("import")
      ? true
      : false;
    
    // User filter
    const matchesUser = !filterUser || filterUser.value === "all"
      ? true
      : item.user.email === filterUser.value;
    
    // Date range filter
    const itemDate = new Date(item.timestamp);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const matchesDate = !dateRange || dateRange.value === "all"
      ? true
      : dateRange.value === "today" && itemDate >= today
      ? true
      : dateRange.value === "yesterday" && itemDate >= yesterday && itemDate < today
      ? true
      : dateRange.value === "week" && itemDate >= weekStart
      ? true
      : dateRange.value === "month" && itemDate >= monthStart
      ? true
      : false;
    
    return matchesSearch && matchesType && matchesUser && matchesDate;
  });

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Toggle item expansion
  const toggleItemExpansion = (id) => {
    if (expandedItems.includes(id)) {
      setExpandedItems(expandedItems.filter(item => item !== id));
    } else {
      setExpandedItems([...expandedItems, id]);
    }
  };

  // Get action icon
  const getActionIcon = (action) => {
    if (action.includes("project")) return "FileText";
    if (action.includes("team")) return "Users";
    if (action.includes("plugin")) return "Puzzle";
    if (action.includes("location")) return "MapPin";
    if (action.includes("wells") || action.includes("import")) return "Upload";
    return "Activity";
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Export audit trail
  const handleExport = () => {
    alert("Audit trail exported successfully!");
  };

  return (
    <div>
      {/* Section title */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-neutral-900">Audit Trail</h2>
        <p className="mt-1 text-sm text-neutral-500">
          View a comprehensive history of all changes made to this project.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-64">
          <InputSearch
            placeholder="Search audit trail..."
            value={searchQuery}
            onSearch={handleSearch}
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <Dropdown
            options={actionTypeOptions}
            value={filterType}
            onChange={setFilterType}
            placeholder="Filter by Action"
            icon="Filter"
            clearable
          />
          <Dropdown
            options={userOptions}
            value={filterUser}
            onChange={setFilterUser}
            placeholder="Filter by User"
            icon="User"
            clearable
          />
          <Dropdown
            options={dateRangeOptions}
            value={dateRange}
            onChange={setDateRange}
            icon="Calendar"
          />
          <Button
            variant="secondary"
            icon="Download"
            onClick={handleExport}
          >
            Export
          </Button>
        </div>
      </div>

      {/* Audit trail list */}
      {filteredAuditTrail.length === 0 ? (
        <div className="text-center py-12 bg-white border border-neutral-200 rounded-lg">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-neutral-100 text-neutral-500 mb-4">
            <Icon name="History" size={24} />
          </div>
          <h3 className="text-md font-medium text-neutral-900 mb-2">No audit trail entries found</h3>
          <p className="text-neutral-500 max-w-md mx-auto">
            {searchQuery || filterType || filterUser || dateRange.value !== "all" ?"No entries match your current filters. Try adjusting your search or filters." :"There are no audit trail entries for this project yet."}
          </p>
        </div>
      ) : (
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm">
          <ul className="divide-y divide-neutral-200">
            {filteredAuditTrail.map((item) => (
              <li key={item.id} className="hover:bg-neutral-50">
                <div 
                  className="p-4 cursor-pointer"
                  onClick={() => toggleItemExpansion(item.id)}
                >
                  <div className="flex items-start">
                    <div className={`p-2 rounded-md mr-4 ${
                      item.action.includes("project") ? "bg-primary-100 text-primary-600" :
                      item.action.includes("team") ? "bg-info-100 text-info-600" :
                      item.action.includes("plugin") ? "bg-success-100 text-success-600" :
                      item.action.includes("location") ? "bg-warning-100 text-warning-600" :
                      "bg-neutral-100 text-neutral-600"
                    }`}>
                      <Icon name={getActionIcon(item.action)} size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-neutral-900">{item.description}</h4>
                        <div className="flex items-center">
                          <span className="text-xs text-neutral-500 mr-2">{formatDate(item.timestamp)}</span>
                          <Icon 
                            name={expandedItems.includes(item.id) ? "ChevronUp" : "ChevronDown"} 
                            size={16} 
                            className="text-neutral-400"
                          />
                        </div>
                      </div>
                      <div className="flex items-center mt-1">
                        <img 
                          src={item.user.avatar} 
                          alt={item.user.name} 
                          className="w-5 h-5 rounded-full mr-2"
                        />
                        <span className="text-xs text-neutral-600">{item.user.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Expanded details */}
                {expandedItems.includes(item.id) && (
                  <div className="px-4 pb-4 pt-0">
                    <div className="ml-12 bg-neutral-50 p-3 rounded-md border border-neutral-200">
                      <h5 className="text-xs font-medium text-neutral-700 mb-2">Details</h5>
                      {item.action === "project_created" && (
                        <div className="space-y-1 text-xs">
                          <p><span className="font-medium">Name:</span> {item.details.name}</p>
                          <p><span className="font-medium">Description:</span> {item.details.description}</p>
                          <p><span className="font-medium">Status:</span> {item.details.status}</p>
                        </div>
                      )}
                      {item.action === "team_member_added" && (
                        <div className="space-y-1 text-xs">
                          <p><span className="font-medium">Member:</span> {item.details.member.name}</p>
                          <p><span className="font-medium">Email:</span> {item.details.member.email}</p>
                          <p><span className="font-medium">Role:</span> {item.details.member.role}</p>
                          <p><span className="font-medium">Project Role:</span> {item.details.projectRole}</p>
                        </div>
                      )}
                      {item.action === "plugin_enabled" && (
                        <div className="space-y-1 text-xs">
                          <p><span className="font-medium">Plugin:</span> {item.details.plugin}</p>
                          <p><span className="font-medium">Version:</span> {item.details.version}</p>
                        </div>
                      )}
                      {item.action === "location_updated" && (
                        <div className="space-y-2 text-xs">
                          <div>
                            <p className="font-medium">Previous:</p>
                            <p>Latitude: {item.details.previous.latitude}</p>
                            <p>Longitude: {item.details.previous.longitude}</p>
                            <p>Field: {item.details.previous.field}</p>
                          </div>
                          <div>
                            <p className="font-medium">Current:</p>
                            <p>Latitude: {item.details.current.latitude}</p>
                            <p>Longitude: {item.details.current.longitude}</p>
                            <p>Field: {item.details.current.field}</p>
                          </div>
                        </div>
                      )}
                      {item.action === "wells_imported" && (
                        <div className="space-y-1 text-xs">
                          <p><span className="font-medium">Source:</span> {item.details.source}</p>
                          <p><span className="font-medium">Total Wells:</span> {item.details.count}</p>
                          <p><span className="font-medium">Successful:</span> {item.details.successful}</p>
                          <p><span className="font-medium">Failed:</span> {item.details.failed}</p>
                        </div>
                      )}
                      {item.action === "project_status_changed" && (
                        <div className="space-y-1 text-xs">
                          <p><span className="font-medium">Previous Status:</span> {item.details.previous}</p>
                          <p><span className="font-medium">New Status:</span> {item.details.current}</p>
                        </div>
                      )}
                      {item.action === "team_member_removed" && (
                        <div className="space-y-1 text-xs">
                          <p><span className="font-medium">Member:</span> {item.details.member.name}</p>
                          <p><span className="font-medium">Email:</span> {item.details.member.email}</p>
                          <p><span className="font-medium">Role:</span> {item.details.member.role}</p>
                        </div>
                      )}
                      {item.action === "plugin_disabled" && (
                        <div className="space-y-1 text-xs">
                          <p><span className="font-medium">Plugin:</span> {item.details.plugin}</p>
                          <p><span className="font-medium">Version:</span> {item.details.version}</p>
                          <p><span className="font-medium">Reason:</span> {item.details.reason}</p>
                        </div>
                      )}
                      {item.action === "project_description_updated" && (
                        <div className="space-y-2 text-xs">
                          <div>
                            <p className="font-medium">Previous:</p>
                            <p>{item.details.previous}</p>
                          </div>
                          <div>
                            <p className="font-medium">Current:</p>
                            <p>{item.details.current}</p>
                          </div>
                        </div>
                      )}
                      {item.action === "team_member_role_changed" && (
                        <div className="space-y-1 text-xs">
                          <p><span className="font-medium">Member:</span> {item.details.member.name}</p>
                          <p><span className="font-medium">Email:</span> {item.details.member.email}</p>
                          <p><span className="font-medium">Previous Role:</span> {item.details.previous}</p>
                          <p><span className="font-medium">New Role:</span> {item.details.current}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AuditTrail;