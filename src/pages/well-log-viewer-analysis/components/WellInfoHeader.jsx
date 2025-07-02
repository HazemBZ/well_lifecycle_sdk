import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Dropdown from "../../../components/ui/Dropdown";
import { Link } from "react-router-dom";

const WellInfoHeader = ({
  selectedWell,
  wells,
  onWellChange,
  selectedTemplate,
  templates,
  onTemplateChange
}) => {
  // Mock well metadata
  const wellMetadata = {
    name: "Well Alpha-1",
    api: "42-123-45678",
    operator: "PetroDigital Energy",
    field: "Digital Basin",
    county: "Tech County",
    state: "TX",
    country: "USA",
    totalDepth: 12500,
    spudDate: "2023-05-15",
    completionDate: "2023-06-30",
    status: "Producing",
    latitude: 29.7604,
    longitude: -95.3698
  };

  return (
    <div className="bg-white border-b border-neutral-200 p-4">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <Link
            to="/dashboard-project-overview"
            className="mr-3 text-neutral-500 hover:text-neutral-700"
          >
            <Icon name="ArrowLeft" size={20} />
          </Link>
          <h1 className="text-2xl font-semibold text-neutral-900">Well Log Viewer & Analysis</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="tertiary"
            size="sm"
            icon="Save"
          >
            Save View
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon="Share2"
          >
            Share
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-4">
        <div className="w-64">
          <Dropdown
            label="Well"
            options={wells}
            value={selectedWell}
            onChange={onWellChange}
            icon="Droplet"
          />
        </div>
        
        <div className="w-64">
          <Dropdown
            label="Template"
            options={templates}
            value={selectedTemplate}
            onChange={onTemplateChange}
            icon="FileText"
          />
        </div>
        
        <div className="flex-1 ml-4">
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
            <div className="flex items-center">
              <span className="text-neutral-500 mr-1">API:</span>
              <span className="font-medium">{wellMetadata.api}</span>
            </div>
            <div className="flex items-center">
              <span className="text-neutral-500 mr-1">Operator:</span>
              <span className="font-medium">{wellMetadata.operator}</span>
            </div>
            <div className="flex items-center">
              <span className="text-neutral-500 mr-1">Field:</span>
              <span className="font-medium">{wellMetadata.field}</span>
            </div>
            <div className="flex items-center">
              <span className="text-neutral-500 mr-1">TD:</span>
              <span className="font-medium">{wellMetadata.totalDepth} ft</span>
            </div>
            <div className="flex items-center">
              <span className="text-neutral-500 mr-1">Status:</span>
              <span className="font-medium text-success-600">{wellMetadata.status}</span>
            </div>
            <div className="flex items-center">
              <Button
                variant="tertiary"
                size="sm"
                icon="Info"
                className="text-xs py-0.5 px-1.5"
              >
                More Info
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellInfoHeader;