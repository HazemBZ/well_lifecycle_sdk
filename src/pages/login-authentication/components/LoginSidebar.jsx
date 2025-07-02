import React from "react";
import Icon from "../../../components/AppIcon";

const LoginSidebar = () => {
  return (
    <div className="hidden md:flex md:w-1/2 lg:w-2/5 bg-primary-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-900 opacity-90"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="relative z-10 flex flex-col justify-center px-8 lg:px-12 py-12 w-full">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Well Lifecycle SDK Platform</h2>
          <p className="text-white text-opacity-80 text-lg mb-8">
            A comprehensive toolkit for managing well projects with modular architecture and plugin-based extensions
          </p>
          
          <div className="space-y-6">
            {[
              { icon: "Database", text: "Centralized project management" },
              { icon: "Layers", text: "Plugin-based domain extensions" },
              { icon: "Lock", text: "Robust security framework" },
              { icon: "RefreshCw", text: "Seamless workflow integration" }
            ].map((feature, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-white bg-opacity-20 p-2 rounded-md mr-4">
                  <Icon name={feature.icon} size={20} />
                </div>
                <p className="text-white text-opacity-90">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-auto">
          <div className="bg-white bg-opacity-10 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center mr-3">
                <Icon name="User" size={20} />
              </div>
              <div>
                <p className="font-medium">Sarah Johnson</p>
                <p className="text-sm text-white text-opacity-70">Lead Geologist</p>
              </div>
            </div>
            <p className="text-white text-opacity-80 italic">
              "The Well Lifecycle SDK has transformed how our team manages well data, providing a unified platform that adapts to our specific workflow needs."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSidebar;