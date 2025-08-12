import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import InputSearch from './InputSearch';

const Header = ({
  variant = 'default',
  logo,
  user,
  onSearch,
  onUserMenuClick,
  onNotificationsClick,
  onHelpClick,
  className = '',
  ...props
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Navigation items
  const navigationItems = [
    // { name: 'Dashboard', path: '/dashboard/home', icon: 'LayoutDashboard' },
    // { name: 'Projects', path: '/dashboard/projects', icon: 'Briefcase' },
    // { name: 'Workspace', path: '/dashboard/workspaces', icon: 'Layers' },
    // { name: 'Well Log Viewer', path: '/dashboard/well-log-viewer', icon: 'LineChart' },
    // { name: 'Drilling Data', path: '/drilling-data-management', icon: 'Drill' },
    // { name: 'Production', path: '/production-data-analysis', icon: 'BarChart3' },
    // { name: 'Geology', path: '/geological-petrophysical-evaluation', icon: 'Mountain' },
    // { name: 'Well Trajectory', path: '/well-trajectory-survey-visualization', icon: 'Route' },
    // { name: 'Plugins', path: '/plugin-management-sdk-configuration', icon: 'Puzzle' },
  ];
  
  // Toggle user menu
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // Handle search
  const handleSearch = (query) => {
    if (onSearch) {
      onSearch(query);
    }
  };
  
  // Get breadcrumbs for contextual header
  const getBreadcrumbs = () => {
    const path = location.pathname;
    const parts = path.split('/').filter(Boolean);
    
    if (parts.length === 0) return [];
    
    return parts.map((part, index) => {
      const url = `/${parts.slice(0, index + 1).join('/')}`;
      const label = part.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      
      return { label, url };
    });
  };
  
  // Default header
  const renderDefaultHeader = () => (
    <header className={`bg-white border-b border-neutral-200 ${className}`} {...props}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              {logo ? (
                logo
              ) : (
                <Link to="/" className="flex items-center">
                  <div className="h-8 w-8 bg-primary-600 rounded-md flex items-center justify-center text-white font-bold">
                    PD
                  </div>
                  <span className="ml-2 text-lg font-semibold text-neutral-900">PetroDigital</span>
                </Link>
              )}
            </div>
            <nav className="hidden md:ml-6 md:flex md:space-x-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    location.pathname === item.path
                      ? 'text-primary-700 bg-primary-50' :'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <Icon name={item.icon} size={18} className="mr-1.5" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Search and user actions */}
          <div className="flex items-center">
            <div className="w-64 mr-4">
              <InputSearch
                placeholder="Search..."
                onSearch={handleSearch}
              />
            </div>
            
            {/* Action buttons */}
            <button
              type="button"
              className="p-2 rounded-full text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              onClick={onNotificationsClick}
            >
              <Icon name="Bell" size={20} />
            </button>
            <button
              type="button"
              className="ml-2 p-2 rounded-full text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              onClick={onHelpClick}
            >
              <Icon name="HelpCircle" size={20} />
            </button>
            
            {/* User menu */}
            <div className="ml-3 relative">
              <div>
                <button
                  type="button"
                  className="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  onClick={toggleUserMenu}
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                    {user?.initials || 'U'}
                  </div>
                </button>
              </div>
              
              {isUserMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <div className="px-4 py-2 text-sm text-neutral-700 border-b border-neutral-200">
                      <p className="font-medium">{user?.name || 'User Name'}</p>
                      <p className="text-neutral-500 truncate">{user?.email || 'user@example.com'}</p>
                    </div>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100" role="menuitem">Your Profile</Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100" role="menuitem">Settings</Link>
                    <Link to="/login-authentication" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100" role="menuitem">Sign out</Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1 px-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? 'text-primary-700 bg-primary-50' :'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center">
                  <Icon name={item.icon} size={18} className="mr-2" />
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-neutral-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white">
                  {user?.initials || 'U'}
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-neutral-800">{user?.name || 'User Name'}</div>
                <div className="text-sm font-medium text-neutral-500">{user?.email || 'user@example.com'}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1 px-2">
              <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50">Your Profile</Link>
              <Link to="/settings" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50">Settings</Link>
              <Link to="/login-authentication" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50">Sign out</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
  
  // Compact header
  const renderCompactHeader = () => (
    <header className={`bg-white border-b border-neutral-200 ${className}`} {...props}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-12">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            {logo ? (
              logo
            ) : (
              <Link to="/" className="flex items-center">
                <div className="h-6 w-6 bg-primary-600 rounded-md flex items-center justify-center text-white font-bold text-xs">
                  PD
                </div>
                <span className="ml-2 text-base font-semibold text-neutral-900">PetroDigital</span>
              </Link>
            )}
          </div>
          
          {/* Compact navigation */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`p-2 rounded-md ${
                  location.pathname === item.path
                    ? 'text-primary-700 bg-primary-50' :'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
                title={item.name}
              >
                <Icon name={item.icon} size={18} />
              </Link>
            ))}
          </div>
          
          {/* Search and user actions */}
          <div className="flex items-center">
            <button
              type="button"
              className="p-1.5 rounded-full text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              onClick={() => onSearch && onSearch('')}
            >
              <Icon name="Search" size={18} />
            </button>
            <button
              type="button"
              className="ml-2 p-1.5 rounded-full text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              onClick={onNotificationsClick}
            >
              <Icon name="Bell" size={18} />
            </button>
            
            {/* User menu */}
            <div className="ml-2 relative">
              <button
                type="button"
                className="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                onClick={toggleUserMenu}
              >
                <span className="sr-only">Open user menu</span>
                <div className="h-7 w-7 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs">
                  {user?.initials || 'U'}
                </div>
              </button>
              
              {isUserMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <div className="px-4 py-2 text-sm text-neutral-700 border-b border-neutral-200">
                      <p className="font-medium">{user?.name || 'User Name'}</p>
                      <p className="text-neutral-500 truncate">{user?.email || 'user@example.com'}</p>
                    </div>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100" role="menuitem">Your Profile</Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100" role="menuitem">Settings</Link>
                    <Link to="/login-authentication" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100" role="menuitem">Sign out</Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-1.5 rounded-md text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1 px-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? 'text-primary-700 bg-primary-50' :'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center">
                  <Icon name={item.icon} size={18} className="mr-2" />
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
  
  // Contextual header
  const renderContextualHeader = () => {
    const breadcrumbs = getBreadcrumbs();
    
    return (
      <header className={`bg-white border-b border-neutral-200 ${className}`} {...props}>
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and breadcrumbs */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                {logo ? (
                  logo
                ) : (
                  <Link to="/" className="flex items-center">
                    <div className="h-8 w-8 bg-primary-600 rounded-md flex items-center justify-center text-white font-bold">
                      PD
                    </div>
                    <span className="ml-2 text-lg font-semibold text-neutral-900">PetroDigital</span>
                  </Link>
                )}
              </div>
              
              {/* Breadcrumbs */}
              <nav className="hidden md:ml-6 md:flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                  <li>
                    <Link to="/" className="text-neutral-500 hover:text-neutral-700">
                      <Icon name="Home" size={16} />
                      <span className="sr-only">Home</span>
                    </Link>
                  </li>
                  {breadcrumbs.map((breadcrumb, index) => (
                    <li key={index}>
                      <div className="flex items-center">
                        <Icon name="ChevronRight" size={16} className="text-neutral-400" />
                        <Link
                          to={breadcrumb.url}
                          className={`ml-2 text-sm font-medium ${
                            index === breadcrumbs.length - 1
                              ? 'text-primary-600 hover:text-primary-700' :'text-neutral-500 hover:text-neutral-700'
                          }`}
                        >
                          {breadcrumb.label}
                        </Link>
                      </div>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
            
            {/* Contextual actions */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-neutral-300 shadow-sm text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <Icon name="Save" size={16} className="mr-1.5" />
                Save
              </button>
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <Icon name="Share2" size={16} className="mr-1.5" />
                Share
              </button>
              
              {/* More actions dropdown */}
              <div className="relative">
                <button
                  type="button"
                  className="inline-flex items-center px-2 py-2 border border-neutral-300 shadow-sm text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  onClick={toggleUserMenu}
                >
                  <Icon name="MoreHorizontal" size={16} />
                </button>
                
                {isUserMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <button className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100" role="menuitem">Export</button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100" role="menuitem">Duplicate</button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100" role="menuitem">Archive</button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-error-600 hover:bg-neutral-100" role="menuitem">Delete</button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* User menu */}
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  onClick={toggleUserMenu}
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                    {user?.initials || 'U'}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  };
  
  // Render the appropriate header variant
  switch (variant) {
    case 'compact':
      return renderCompactHeader();
    case 'contextual':
      return renderContextualHeader();
    default:
      return renderDefaultHeader();
  }
};

export default Header;