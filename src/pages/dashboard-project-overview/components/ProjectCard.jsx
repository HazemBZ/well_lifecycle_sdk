import React, { useState } from "react";

import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ProjectCard = ({ project }) => {
  const [expanded, setExpanded] = useState(false);
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-success-500";
      case "planning":
        return "bg-info-500";
      case "completed":
        return "bg-neutral-500";
      default:
        return "bg-neutral-400";
    }
  };
  
  // Get status text
  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Active";
      case "planning":
        return "Planning";
      case "completed":
        return "Completed";
      default:
        return "Unknown";
    }
  };
  
  // Toggle expanded state
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="bg-white rounded-lg border border-neutral-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Card header */}
      <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
        <div className="flex items-center">
          <div className={`h-2 w-2 rounded-full ${getStatusColor(project.status)} mr-2`}></div>
          <span className="text-sm font-medium text-neutral-600">{getStatusText(project.status)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            className="text-neutral-400 hover:text-neutral-600"
            title="Favorite"
          >
            <Icon name="Star" size={16} />
          </button>
          <button 
            className="text-neutral-400 hover:text-neutral-600"
            title="More options"
          >
            <Icon name="MoreVertical" size={16} />
          </button>
        </div>
      </div>
      
      {/* Card body */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-neutral-900 mb-2">{project.name}</h3>
        <p className="text-neutral-600 text-sm mb-3 line-clamp-2">{project.description}</p>
        
        {/* Location */}
        <div className="flex items-center text-sm text-neutral-500 mb-3">
          <Icon name="MapPin" size={14} className="mr-1" />
          <span>{project.location}</span>
        </div>
        
        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-medium text-neutral-700">Progress</span>
            <span className="font-medium text-neutral-700">{project.progress}%</span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div 
              className="bg-primary-500 h-2 rounded-full" 
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag, index) => (
            <span 
              key={index} 
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-neutral-100 text-neutral-700"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Team */}
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {project.team.slice(0, 3).map((member) => (
              <div 
                key={member.id} 
                className="h-8 w-8 rounded-full border-2 border-white overflow-hidden bg-neutral-200"
                title={member.name}
              >
                <img 
                  src={member.avatar} 
                  alt={member.name} 
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
            {project.team.length > 3 && (
              <div className="h-8 w-8 rounded-full border-2 border-white bg-neutral-100 flex items-center justify-center text-xs font-medium text-neutral-600">
                +{project.team.length - 3}
              </div>
            )}
          </div>
          <div className="text-sm text-neutral-500">
            Updated {formatDate(project.lastUpdated)}
          </div>
        </div>
        
        {/* Expanded content */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-neutral-200">
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="text-center">
                <div className="text-sm font-medium text-neutral-900">{project.metrics.wells}</div>
                <div className="text-xs text-neutral-500">Wells</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-neutral-900">{project.metrics.completions}</div>
                <div className="text-xs text-neutral-500">Completions</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-neutral-900">{project.metrics.production}</div>
                <div className="text-xs text-neutral-500">Production</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="primary" 
                size="sm" 
                className="flex-1"
                icon="ExternalLink"
              >
                Open Project
              </Button>
              <Button 
                variant="secondary" 
                size="sm" 
                className="flex-1"
                icon="Edit2"
              >
                Edit Details
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Card footer */}
      <div className="px-4 py-2 bg-neutral-50 border-t border-neutral-200">
        <button 
          className="w-full flex items-center justify-center text-sm text-neutral-600 hover:text-neutral-900"
          onClick={toggleExpanded}
        >
          <span>{expanded ? "Show Less" : "Show More"}</span>
          <Icon name={expanded ? "ChevronUp" : "ChevronDown"} size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;