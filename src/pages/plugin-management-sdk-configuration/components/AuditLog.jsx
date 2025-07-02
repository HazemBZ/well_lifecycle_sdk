import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import InputSearch from "../../../components/ui/InputSearch";

const AuditLog = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [auditLogs, setAuditLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  
  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      // Mock audit logs
      const mockLogs = [
        {
          id: 1,
          action: "plugin_install",
          description: "Installed Well Log Viewer plugin v2.3.1",
          user: "John Doe",
          userId: "john.doe",
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          ipAddress: "192.168.1.45",
          details: {
            pluginId: "well-log-viewer",
            version: "2.3.1",
            source: "official repository"
          }
        },
        {
          id: 2,
          action: "config_change",
          description: "Modified SDK configuration parameters",
          user: "Admin User",
          userId: "admin",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          ipAddress: "192.168.1.10",
          details: {
            changes: [
              { param: "maxConcurrentRequests", old: "30", new: "50" },
              { param: "cacheTTL", old: "1800", new: "3600" }
            ]
          }
        },
        {
          id: 3,
          action: "permission_change",
          description: "Updated permissions for Engineer role",
          user: "John Doe",
          userId: "john.doe",
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
          ipAddress: "192.168.1.45",
          details: {
            role: "engineer",
            changes: [
              { plugin: "seismic-interpreter", old: "none", new: "read" },
              { plugin: "reservoir-simulator", old: "none", new: "read" }
            ]
          }
        },
        {
          id: 4,
          action: "plugin_update",
          description: "Updated Drilling Analytics plugin from v1.7.2 to v1.8.0",
          user: "Jane Smith",
          userId: "jane.smith",
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          ipAddress: "192.168.1.22",
          details: {
            pluginId: "drilling-analytics",
            oldVersion: "1.7.2",
            newVersion: "1.8.0"
          }
        },
        {
          id: 5,
          action: "plugin_uninstall",
          description: "Uninstalled Mud Logger plugin v1.4.2",
          user: "Admin User",
          userId: "admin",
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          ipAddress: "192.168.1.10",
          details: {
            pluginId: "mud-logger",
            version: "1.4.2",
            reason: "No longer needed"
          }
        },
        {
          id: 6,
          action: "user_login",
          description: "User login successful",
          user: "John Doe",
          userId: "john.doe",
          timestamp: new Date(Date.now() - 10 * 60 * 1000),
          ipAddress: "192.168.1.45",
          details: {
            browser: "Chrome 98.0.4758.102",
            os: "Windows 10"
          }
        },
        {
          id: 7,
          action: "config_change",
          description: "Changed storage location configuration",
          user: "Admin User",
          userId: "admin",
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          ipAddress: "192.168.1.10",
          details: {
            changes: [
              { param: "storageLocation", old: "/data/storage", new: "/data/petrodigital/storage" }
            ]
          }
        },
        {
          id: 8,
          action: "plugin_config",
          description: "Modified Well Log Viewer plugin configuration",
          user: "Jane Smith",
          userId: "jane.smith",
          timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
          ipAddress: "192.168.1.22",
          details: {
            pluginId: "well-log-viewer",
            changes: [
              { param: "defaultTrackWidth", old: "200", new: "250" },
              { param: "curveColors", old: "default", new: "custom" }
            ]
          }
        }
      ];
      
      setAuditLogs(mockLogs);
      setFilteredLogs(mockLogs);
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Apply filters when search query or filter type changes
  useEffect(() => {
    if (auditLogs.length > 0) {
      let filtered = [...auditLogs];
      
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(log => 
          log.description.toLowerCase().includes(query) ||
          log.user.toLowerCase().includes(query) ||
          log.userId.toLowerCase().includes(query) ||
          log.action.toLowerCase().includes(query)
        );
      }
      
      // Apply type filter
      if (filterType !== "all") {
        filtered = filtered.filter(log => log.action === filterType);
      }
      
      setFilteredLogs(filtered);
    }
  }, [searchQuery, filterType, auditLogs]);

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Format timestamp
  const formatTime = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
  };

  // Get action icon and color
  const getActionInfo = (action) => {
    switch (action) {
      case "plugin_install":
        return { icon: "Download", color: "text-success-500", bgColor: "bg-success-500 bg-opacity-10" };
      case "plugin_update":
        return { icon: "RefreshCw", color: "text-info-500", bgColor: "bg-info-500 bg-opacity-10" };
      case "plugin_uninstall":
        return { icon: "Trash2", color: "text-error-500", bgColor: "bg-error-500 bg-opacity-10" };
      case "plugin_config":
        return { icon: "Settings", color: "text-primary-500", bgColor: "bg-primary-500 bg-opacity-10" };
      case "config_change":
        return { icon: "Sliders", color: "text-warning-500", bgColor: "bg-warning-500 bg-opacity-10" };
      case "permission_change":
        return { icon: "Shield", color: "text-primary-500", bgColor: "bg-primary-500 bg-opacity-10" };
      case "user_login":
        return { icon: "LogIn", color: "text-info-500", bgColor: "bg-info-500 bg-opacity-10" };
      default:
        return { icon: "Activity", color: "text-neutral-500", bgColor: "bg-neutral-100" };
    }
  };

  // Export logs
  const exportLogs = () => {
    alert("Logs would be exported to CSV/JSON in a real implementation");
  };

  // Render loading state
  if (loading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
        <p className="text-neutral-600">Loading audit logs...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-neutral-900 mb-2">Audit Log</h2>
        <p className="text-sm text-neutral-500">
          Track all configuration changes and plugin management actions
        </p>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="w-full md:w-64">
          <InputSearch
            placeholder="Search logs..."
            onSearch={handleSearch}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-3">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="all">All Actions</option>
            <option value="plugin_install">Plugin Install</option>
            <option value="plugin_update">Plugin Update</option>
            <option value="plugin_uninstall">Plugin Uninstall</option>
            <option value="plugin_config">Plugin Config</option>
            <option value="config_change">SDK Config Change</option>
            <option value="permission_change">Permission Change</option>
            <option value="user_login">User Login</option>
          </select>
          
          <Button 
            variant="secondary" 
            icon="Download" 
            size="sm"
            onClick={exportLogs}
          >
            Export
          </Button>
        </div>
      </div>

      {/* Logs list */}
      {filteredLogs.length === 0 ? (
        <div className="bg-white rounded-lg border border-neutral-200 p-8 text-center">
          <Icon name="Search" size={36} className="mx-auto text-neutral-400 mb-3" />
          <p className="text-neutral-600 mb-2">No audit logs match your search criteria.</p>
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => {
              setSearchQuery("");
              setFilterType("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-neutral-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    IP Address
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {filteredLogs.map(log => {
                  const actionInfo = getActionInfo(log.action);
                  
                  return (
                    <tr key={log.id} className="hover:bg-neutral-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${actionInfo.bgColor}`}>
                          <Icon name={actionInfo.icon} size={12} className={`${actionInfo.color} mr-1`} />
                          <span className={actionInfo.color}>
                            {log.action.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-neutral-900">{log.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-neutral-900">{log.user}</div>
                        <div className="text-xs text-neutral-500">{log.userId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-neutral-500" title={log.timestamp.toLocaleString()}>
                          {formatTime(log.timestamp)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-neutral-500">{log.ipAddress}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          className="text-primary-600 hover:text-primary-900 text-sm font-medium"
                          onClick={() => alert(`Details for log #${log.id}:\n${JSON.stringify(log.details, null, 2)}`)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="bg-neutral-50 px-6 py-3 border-t border-neutral-200 text-sm text-neutral-500">
            Showing {filteredLogs.length} of {auditLogs.length} logs
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditLog;