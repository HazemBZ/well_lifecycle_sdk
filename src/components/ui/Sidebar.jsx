import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Sidebar = ({
  variant = 'expanded',
  onToggle,
  className = '',
  ...props
}) => {
  const [isCollapsed, setIsCollapsed] = useState(variant === 'collapsed');
  const location = useLocation();
  
  // Navigation items
  const navigationItems = [
    {
      name: 'Dashboard',
      path: '/dashboard-project-overview',
      icon: 'LayoutDashboard',
    },
    {
      name: 'Projects',
      path: '/project-management-configuration',
      icon: 'Briefcase',
      subItems: [
        { name: 'All Projects', path: '/project-management-configuration' },
        { name: 'Create New', path: '/project-management-configuration/new' },
        { name: 'Templates', path: '/project-management-configuration/templates' },
      ],
    },
    {
      name: 'Workspace',
      path: '/workspace-management',
      icon: 'Layers',
    },
    {
      name: 'Well Log Viewer',
      path: '/well-log-viewer-analysis',
      icon: 'LineChart',
    },
    {
      name: 'Drilling Data',
      path: '/drilling-data-management',
      icon: 'Drill',
    },
    {
      name: 'Production',
      path: '/production-data-analysis',
      icon: 'BarChart3',
    },
    {
      name: 'Geology',
      path: '/geological-petrophysical-evaluation',
      icon: 'Mountain',
    },
    {
      name: 'Well Trajectory',
      path: '/well-trajectory-survey-visualization',
      icon: 'Route',
    },
    {
      name: 'Plugins',
      path: '/plugin-management-sdk-configuration',
      icon: 'Puzzle',
    },
  ];
  
  // Contextual navigation items based on current path
  const getContextualItems = () => {
    const path = location.pathname;
    
    if (path.includes('well-log-viewer')) {
      return [
        { name: 'Log Viewer', path: '/well-log-viewer-analysis', icon: 'LineChart' },
        { name: 'Track Configuration', path: '/well-log-viewer-analysis/tracks', icon: 'Sliders' },
        { name: 'Curve Management', path: '/well-log-viewer-analysis/curves', icon: 'Activity' },
        { name: 'Depth Reference', path: '/well-log-viewer-analysis/depth', icon: 'ArrowDownUp' },
        { name: 'Annotations', path: '/well-log-viewer-analysis/annotations', icon: 'Edit3' },
        { name: 'Export', path: '/well-log-viewer-analysis/export', icon: 'Download' },
      ];
    }
    
    if (path.includes('drilling-data')) {
      return [
        { name: 'Overview', path: '/drilling-data-management', icon: 'Grid' },
        { name: 'Real-time Data', path: '/drilling-data-management/realtime', icon: 'Activity' },
        { name: 'Historical Data', path: '/drilling-data-management/historical', icon: 'Clock' },
        { name: 'Reports', path: '/drilling-data-management/reports', icon: 'FileText' },
        { name: 'Alerts', path: '/drilling-data-management/alerts', icon: 'Bell' },
      ];
    }
    
    if (path.includes('production-data')) {
      return [
        { name: 'Production Overview', path: '/production-data-analysis', icon: 'BarChart3' },
        { name: 'Decline Analysis', path: '/production-data-analysis/decline', icon: 'TrendingDown' },
        { name: 'Forecasting', path: '/production-data-analysis/forecast', icon: 'TrendingUp' },
        { name: 'Well Performance', path: '/production-data-analysis/performance', icon: 'Activity' },
        { name: 'Economics', path: '/production-data-analysis/economics', icon: 'DollarSign' },
      ];
    }
    
    return navigationItems;
  };
  
  // Toggle sidebar collapse state
  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    
    if (onToggle) {
      onToggle(newState);
    }
  };
  
  // Determine if a navigation item is active
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  // Expanded sidebar
  const renderExpandedSidebar = () => {
    const items = variant === 'contextual' ? getContextualItems() : navigationItems;
    
    return (
      <aside 
        className={`bg-white border-r border-neutral-200 w-64 flex-shrink-0 h-screen overflow-y-auto ${className}`}
        {...props}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-200">
            <h2 className="text-lg font-semibold text-neutral-900">Navigation</h2>
            <button
              type="button"
              className="p-1 rounded-md text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              onClick={toggleCollapse}
              aria-label="Collapse sidebar"
            >
              <Icon name="PanelLeftClose" size={20} />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {items.map((item) => {
              const active = isActive(item.path);
              
              return (
                <div key={item.name}>
                  <Link
                    to={item.path}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      active
                        ? 'bg-primary-50 text-primary-700' :'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50'
                    }`}
                  >
                    <Icon 
                      name={item.icon} 
                      size={20} 
                      className={`mr-3 flex-shrink-0 ${
                        active ? 'text-primary-600' : 'text-neutral-500 group-hover:text-neutral-600'
                      }`} 
                    />
                    {item.name}
                  </Link>
                  
                  {/* Sub-items */}
                  {item.subItems && active && (
                    <div className="mt-1 ml-8 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className={`group flex items-center px-3 py-1.5 text-sm font-medium rounded-md ${
                            location.pathname === subItem.path
                              ? 'bg-primary-50 text-primary-700' :'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
          
          {/* Sidebar footer */}
          <div className="p-4 border-t border-neutral-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                  PD
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-neutral-900">PetroDigital</p>
                <p className="text-xs text-neutral-500">v2.0.0</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    );
  };
  
  // Collapsed sidebar
  const renderCollapsedSidebar = () => {
    const items = variant === 'contextual' ? getContextualItems() : navigationItems;
    
    return (
      <aside 
        className={`bg-white border-r border-neutral-200 w-16 flex-shrink-0 h-screen overflow-y-auto ${className}`}
        {...props}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar header */}
          <div className="h-16 flex items-center justify-center border-b border-neutral-200">
            <button
              type="button"
              className="p-1 rounded-md text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              onClick={toggleCollapse}
              aria-label="Expand sidebar"
            >
              <Icon name="PanelLeftOpen" size={20} />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 py-4 flex flex-col items-center space-y-3">
            {items.map((item) => {
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`group flex items-center justify-center p-2 rounded-md ${
                    active
                      ? 'bg-primary-50 text-primary-700' :'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                  title={item.name}
                >
                  <Icon 
                    name={item.icon} 
                    size={20} 
                    className={active ? 'text-primary-600' : 'text-neutral-500 group-hover:text-neutral-600'} 
                  />
                </Link>
              );
            })}
          </nav>
          
          {/* Sidebar footer */}
          <div className="p-4 border-t border-neutral-200 flex justify-center">
            <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs">
              PD
            </div>
          </div>
        </div>
      </aside>
    );
  };
  
  return isCollapsed ? renderCollapsedSidebar() : renderExpandedSidebar();
};

export default Sidebar;