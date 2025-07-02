import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const Footer = ({
  variant = 'standard',
  version = 'v2.0.0',
  companyName = 'PetroDigital',
  copyrightYear = new Date().getFullYear(),
  systemStatus = 'operational',
  className = '',
  ...props
}) => {
  // Links for footer
  const links = [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Service', path: '/terms-of-service' },
    { name: 'Contact Support', path: '/contact-support' },
    { name: 'Documentation', path: '/documentation' },
  ];
  
  // System status indicator
  const getStatusIndicator = () => {
    switch (systemStatus) {
      case 'operational':
        return { color: 'bg-success-500', text: 'All Systems Operational' };
      case 'degraded':
        return { color: 'bg-warning-500', text: 'Degraded Performance' };
      case 'partial_outage':
        return { color: 'bg-warning-500', text: 'Partial System Outage' };
      case 'major_outage':
        return { color: 'bg-error-500', text: 'Major System Outage' };
      case 'maintenance':
        return { color: 'bg-info-500', text: 'Scheduled Maintenance' };
      default:
        return { color: 'bg-neutral-500', text: 'Status Unknown' };
    }
  };
  
  const status = getStatusIndicator();
  
  // Standard footer
  const renderStandardFooter = () => (
    <footer className={`bg-white border-t border-neutral-200 ${className}`} {...props}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-primary-600 rounded-md flex items-center justify-center text-white font-bold">
              PD
            </div>
            <div className="ml-3">
              <p className="text-base font-medium text-neutral-900">{companyName}</p>
              <p className="text-sm text-neutral-500">{version}</p>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0">
            <div className="flex space-x-6">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-neutral-700">
                <span className="sr-only">Twitter</span>
                <Icon name="Twitter" size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-neutral-700">
                <span className="sr-only">LinkedIn</span>
                <Icon name="Linkedin" size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-neutral-700">
                <span className="sr-only">GitHub</span>
                <Icon name="Github" size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-6 border-t border-neutral-200 pt-6 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            {links.map((link) => (
              <Link key={link.name} to={link.path} className="text-sm text-neutral-600 hover:text-neutral-900">
                {link.name}
              </Link>
            ))}
          </div>
          <p className="mt-4 text-sm text-neutral-500 md:mt-0 md:order-1">
            &copy; {copyrightYear} {companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
  
  // Minimal footer
  const renderMinimalFooter = () => (
    <footer className={`bg-white border-t border-neutral-200 ${className}`} {...props}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-wrap items-center justify-between">
          <p className="text-xs text-neutral-500">
            &copy; {copyrightYear} {companyName} | {version}
          </p>
          
          <div className="flex space-x-4">
            {links.map((link) => (
              <Link key={link.name} to={link.path} className="text-xs text-neutral-600 hover:text-neutral-900">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
  
  // Status-focused footer
  const renderStatusFocusedFooter = () => (
    <footer className={`bg-white border-t border-neutral-200 ${className}`} {...props}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-primary-600 rounded-md flex items-center justify-center text-white font-bold">
              PD
            </div>
            <div className="ml-3">
              <p className="text-base font-medium text-neutral-900">{companyName}</p>
              <p className="text-sm text-neutral-500">{version}</p>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center">
            <div className={`h-2.5 w-2.5 rounded-full ${status.color} mr-2`}></div>
            <span className="text-sm font-medium text-neutral-700">{status.text}</span>
            <Link to="/system-status" className="ml-4 text-sm text-primary-600 hover:text-primary-700">
              View Status
            </Link>
          </div>
        </div>
        
        <div className="mt-4 border-t border-neutral-200 pt-4">
          <div className="flex flex-wrap justify-between items-center">
            <p className="text-xs text-neutral-500">
              &copy; {copyrightYear} {companyName}. All rights reserved.
            </p>
            
            <div className="flex space-x-4 mt-2 sm:mt-0">
              {links.map((link) => (
                <Link key={link.name} to={link.path} className="text-xs text-neutral-600 hover:text-neutral-900">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center">
              <Icon name="Server" size={16} className="text-neutral-500 mr-2" />
              <span className="text-xs text-neutral-600">API: Operational</span>
            </div>
            <div className="flex items-center">
              <Icon name="Database" size={16} className="text-neutral-500 mr-2" />
              <span className="text-xs text-neutral-600">Database: Operational</span>
            </div>
            <div className="flex items-center">
              <Icon name="Cloud" size={16} className="text-neutral-500 mr-2" />
              <span className="text-xs text-neutral-600">Storage: Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
  
  // Render the appropriate footer variant
  switch (variant) {
    case 'minimal':
      return renderMinimalFooter();
    case 'status-focused':
      return renderStatusFocusedFooter();
    default:
      return renderStandardFooter();
  }
};

export default Footer;