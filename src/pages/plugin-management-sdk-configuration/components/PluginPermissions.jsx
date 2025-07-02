import React, { useState } from "react";

import Button from "../../../components/ui/Button";

const PluginPermissions = () => {
  const [roles, setRoles] = useState([
    { id: "admin", name: "Administrator", description: "Full system access" },
    { id: "manager", name: "Project Manager", description: "Manage projects and team access" },
    { id: "engineer", name: "Engineer", description: "Technical user with data analysis capabilities" },
    { id: "viewer", name: "Viewer", description: "Read-only access to approved data" },
    { id: "analyst", name: "Data Analyst", description: "Specialized in data processing and visualization" }
  ]);

  const [plugins, setPlugins] = useState([
    { id: "well-log-viewer", name: "Well Log Viewer", category: "Visualization" },
    { id: "drilling-analytics", name: "Drilling Analytics", category: "Analytics" },
    { id: "production-forecasting", name: "Production Forecasting", category: "Modeling" },
    { id: "geological-mapper", name: "Geological Mapper", category: "Geology" },
    { id: "petrophysical-analyzer", name: "Petrophysical Analyzer", category: "Petrophysics" },
    { id: "seismic-interpreter", name: "Seismic Interpreter", category: "Geophysics" },
    { id: "reservoir-simulator", name: "Reservoir Simulator", category: "Simulation" },
    { id: "well-test-analyzer", name: "Well Test Analyzer", category: "Testing" }
  ]);

  const [permissions, setPermissions] = useState([
    { roleId: "admin", pluginId: "well-log-viewer", access: "full" },
    { roleId: "admin", pluginId: "drilling-analytics", access: "full" },
    { roleId: "admin", pluginId: "production-forecasting", access: "full" },
    { roleId: "admin", pluginId: "geological-mapper", access: "full" },
    { roleId: "admin", pluginId: "petrophysical-analyzer", access: "full" },
    { roleId: "admin", pluginId: "seismic-interpreter", access: "full" },
    { roleId: "admin", pluginId: "reservoir-simulator", access: "full" },
    { roleId: "admin", pluginId: "well-test-analyzer", access: "full" },
    
    { roleId: "manager", pluginId: "well-log-viewer", access: "full" },
    { roleId: "manager", pluginId: "drilling-analytics", access: "full" },
    { roleId: "manager", pluginId: "production-forecasting", access: "full" },
    { roleId: "manager", pluginId: "geological-mapper", access: "read" },
    { roleId: "manager", pluginId: "petrophysical-analyzer", access: "read" },
    { roleId: "manager", pluginId: "seismic-interpreter", access: "read" },
    { roleId: "manager", pluginId: "reservoir-simulator", access: "read" },
    { roleId: "manager", pluginId: "well-test-analyzer", access: "read" },
    
    { roleId: "engineer", pluginId: "well-log-viewer", access: "full" },
    { roleId: "engineer", pluginId: "drilling-analytics", access: "full" },
    { roleId: "engineer", pluginId: "production-forecasting", access: "full" },
    { roleId: "engineer", pluginId: "geological-mapper", access: "read" },
    { roleId: "engineer", pluginId: "petrophysical-analyzer", access: "full" },
    { roleId: "engineer", pluginId: "seismic-interpreter", access: "none" },
    { roleId: "engineer", pluginId: "reservoir-simulator", access: "read" },
    { roleId: "engineer", pluginId: "well-test-analyzer", access: "full" },
    
    { roleId: "viewer", pluginId: "well-log-viewer", access: "read" },
    { roleId: "viewer", pluginId: "drilling-analytics", access: "read" },
    { roleId: "viewer", pluginId: "production-forecasting", access: "read" },
    { roleId: "viewer", pluginId: "geological-mapper", access: "read" },
    { roleId: "viewer", pluginId: "petrophysical-analyzer", access: "read" },
    { roleId: "viewer", pluginId: "seismic-interpreter", access: "none" },
    { roleId: "viewer", pluginId: "reservoir-simulator", access: "none" },
    { roleId: "viewer", pluginId: "well-test-analyzer", access: "read" },
    
    { roleId: "analyst", pluginId: "well-log-viewer", access: "full" },
    { roleId: "analyst", pluginId: "drilling-analytics", access: "full" },
    { roleId: "analyst", pluginId: "production-forecasting", access: "full" },
    { roleId: "analyst", pluginId: "geological-mapper", access: "read" },
    { roleId: "analyst", pluginId: "petrophysical-analyzer", access: "full" },
    { roleId: "analyst", pluginId: "seismic-interpreter", access: "read" },
    { roleId: "analyst", pluginId: "reservoir-simulator", access: "read" },
    { roleId: "analyst", pluginId: "well-test-analyzer", access: "full" }
  ]);

  const [selectedRole, setSelectedRole] = useState("admin");
  const [permissionChanged, setPermissionChanged] = useState(false);

  // Get access level for a role and plugin
  const getAccessLevel = (roleId, pluginId) => {
    const permission = permissions.find(p => p.roleId === roleId && p.pluginId === pluginId);
    return permission ? permission.access : "none";
  };

  // Update permission
  const updatePermission = (roleId, pluginId, access) => {
    setPermissions(prevPermissions => {
      const updatedPermissions = [...prevPermissions];
      const index = updatedPermissions.findIndex(p => p.roleId === roleId && p.pluginId === pluginId);
      
      if (index !== -1) {
        updatedPermissions[index] = { ...updatedPermissions[index], access };
      } else {
        updatedPermissions.push({ roleId, pluginId, access });
      }
      
      return updatedPermissions;
    });
    
    setPermissionChanged(true);
  };

  // Save permissions
  const savePermissions = () => {
    // Simulate saving
    setTimeout(() => {
      setPermissionChanged(false);
      alert("Permissions saved successfully");
    }, 1000);
  };

  // Access level badge component
  const AccessBadge = ({ access }) => {
    let bgColor, textColor;
    
    switch (access) {
      case "full":
        bgColor = "bg-success-500 bg-opacity-10";
        textColor = "text-success-600";
        break;
      case "read":
        bgColor = "bg-info-500 bg-opacity-10";
        textColor = "text-info-600";
        break;
      case "none":
      default:
        bgColor = "bg-neutral-100";
        textColor = "text-neutral-600";
        break;
    }
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
        {access === "full" ? "Full Access" : access === "read" ? "Read Only" : "No Access"}
      </span>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-neutral-900 mb-2">Plugin Permissions</h2>
        <p className="text-sm text-neutral-500">
          Manage role-based access control for plugins and features
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Role selection sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-neutral-50 rounded-lg border border-neutral-200 overflow-hidden">
            <div className="p-4 border-b border-neutral-200">
              <h3 className="text-md font-medium text-neutral-900">User Roles</h3>
            </div>
            <div className="p-2">
              {roles.map(role => (
                <button
                  key={role.id}
                  className={`w-full text-left px-4 py-3 rounded-md mb-1 ${
                    selectedRole === role.id
                      ? 'bg-primary-50 text-primary-700' :'text-neutral-700 hover:bg-neutral-100'
                  }`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <div className="font-medium">{role.name}</div>
                  <div className="text-xs text-neutral-500">{role.description}</div>
                </button>
              ))}
            </div>
            <div className="p-4 border-t border-neutral-200">
              <Button 
                variant="secondary" 
                icon="UserPlus" 
                size="sm"
                fullWidth
              >
                Manage Roles
              </Button>
            </div>
          </div>
        </div>
        
        {/* Permissions table */}
        <div className="flex-1">
          <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
            <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
              <div>
                <h3 className="text-md font-medium text-neutral-900">
                  {roles.find(r => r.id === selectedRole)?.name} Permissions
                </h3>
                <p className="text-sm text-neutral-500">
                  Configure access levels for each plugin
                </p>
              </div>
              {permissionChanged && (
                <Button 
                  variant="primary" 
                  icon="Save" 
                  size="sm"
                  onClick={savePermissions}
                >
                  Save Changes
                </Button>
              )}
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Plugin Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Current Access
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {plugins.map(plugin => {
                    const access = getAccessLevel(selectedRole, plugin.id);
                    
                    return (
                      <tr key={plugin.id} className="hover:bg-neutral-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                          {plugin.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                          {plugin.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <AccessBadge access={access} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                          <select
                            value={access}
                            onChange={(e) => updatePermission(selectedRole, plugin.id, e.target.value)}
                            className="rounded-md border border-neutral-300 bg-white px-3 py-1 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                          >
                            <option value="full">Full Access</option>
                            <option value="read">Read Only</option>
                            <option value="none">No Access</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t border-neutral-200 bg-neutral-50">
              <div className="text-sm text-neutral-600">
                <p><strong>Access Levels:</strong></p>
                <ul className="mt-2 space-y-1">
                  <li className="flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-500 bg-opacity-10 text-success-600 mr-2">
                      Full Access
                    </span>
                    <span>Can use all features, modify settings, and manage data</span>
                  </li>
                  <li className="flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-info-500 bg-opacity-10 text-info-600 mr-2">
                      Read Only
                    </span>
                    <span>Can view data and results but cannot modify settings or data</span>
                  </li>
                  <li className="flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600 mr-2">
                      No Access
                    </span>
                    <span>Cannot access the plugin or view its data</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PluginPermissions;