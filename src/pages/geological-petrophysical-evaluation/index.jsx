import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/ui/Header";
import Sidebar from "../../components/ui/Sidebar";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Dropdown from "../../components/ui/Dropdown";
import Tabs from "./components/Tabs";
import LogVisualization from "./components/LogVisualization";
import CoreData from "./components/CoreData";
import LithologyPanel from "./components/LithologyPanel";
import PetrophysicalWorkflow from "./components/PetrophysicalWorkflow";
import CrossplotPanel from "./components/CrossplotPanel";
import ResultsPanel from "./components/ResultsPanel";
import { tabs, user, wells, zones } from "./geologyEvaluationMockData";

const GeologicalPetrophysicalEvaluation = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("visualization");
  const [selectedWell, setSelectedWell] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [depthUnit, setDepthUnit] = useState("m");
  const [depthRange, setDepthRange] = useState({ min: 2000, max: 2500 });
  const [isLoading, setIsLoading] = useState(true);



  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setSelectedWell(wells[0]);
      setSelectedZone(zones[0]);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle well selection
  const handleWellChange = (selected) => {
    setSelectedWell(selected);
    // In a real app, this would trigger loading of well-specific data
  };

  // Handle zone selection
  const handleZoneChange = (selected) => {
    setSelectedZone(selected);
    // In a real app, this would filter data to the selected zone
  };

  // Handle depth unit change
  const handleDepthUnitChange = (selected) => {
    setDepthUnit(selected.value);
    // In a real app, this would convert depth values
  };

  // Handle depth range change
  const handleDepthRangeChange = (type, value) => {
    setDepthRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  // Handle sidebar toggle
  const handleSidebarToggle = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  // Render the active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "visualization":
        return <LogVisualization depthUnit={depthUnit} depthRange={depthRange} />;
      case "core":
        return <CoreData depthUnit={depthUnit} />;
      case "lithology":
        return <LithologyPanel depthUnit={depthUnit} />;
      case "petrophysics":
        return <PetrophysicalWorkflow />;
      case "crossplot":
        return <CrossplotPanel />;
      case "results":
        return <ResultsPanel selectedZone={selectedZone} />;
      default:
        return <LogVisualization depthUnit={depthUnit} depthRange={depthRange} />;
    }
  };

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Sidebar */}
      <Sidebar
        variant="expanded"
        onToggle={handleSidebarToggle}
        className="h-screen"
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <Header
          variant="default"
          user={user}
          onSearch={(query) => console.log("Search:", query)}
          onNotificationsClick={() => console.log("Notifications clicked")}
          onHelpClick={() => console.log("Help clicked")}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-neutral-900 mb-2">
                Geological & Petrophysical Evaluation
              </h1>
              <p className="text-neutral-600">
                Integrate core data, formation tops, and petrophysical calculations for comprehensive interpretation
              </p>
            </div>

            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <Link to="/dashboard-project-overview">
                <Button
                  variant="secondary"
                  icon="ArrowLeft"
                  iconPosition="left"
                >
                  Back to Dashboard
                </Button>
              </Link>
              <Button
                variant="primary"
                icon="Save"
                iconPosition="left"
              >
                Save Interpretation
              </Button>
            </div>
          </div>

          {/* Well Selection and Controls */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Dropdown
                label="Well"
                options={wells}
                value={selectedWell}
                onChange={handleWellChange}
                placeholder="Select a well"
                icon="CircleDot"
              />
              <Dropdown
                label="Zone"
                options={zones}
                value={selectedZone}
                onChange={handleZoneChange}
                placeholder="Select a zone"
                icon="Layers"
              />
              <div className="flex space-x-4">
                <Input
                  label={`Top Depth (${depthUnit})`}
                  type="number"
                  value={depthRange.min}
                  onChange={(e) => handleDepthRangeChange("min", parseFloat(e.target.value))}
                  min={0}
                  className="flex-1"
                />
                <Input
                  label={`Bottom Depth (${depthUnit})`}
                  type="number"
                  value={depthRange.max}
                  onChange={(e) => handleDepthRangeChange("max", parseFloat(e.target.value))}
                  min={depthRange.min}
                  className="flex-1"
                />
              </div>
              <Dropdown
                label="Depth Unit"
                options={[
                  { value: "m", label: "Meters (m)" },
                  { value: "ft", label: "Feet (ft)" }
                ]}
                value={{ value: depthUnit, label: depthUnit === "m" ? "Meters (m)" : "Feet (ft)" }}
                onChange={(selected) => setDepthUnit(selected.value)}
              />
            </div>
          </div>

          {/* Tabs Navigation */}
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 mt-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-96">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
                  <p className="text-neutral-600">Loading data...</p>
                </div>
              </div>
            ) : (
              renderTabContent()
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-neutral-200 py-4 px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-neutral-500">
              &copy; {new Date().getFullYear()} PetroDigital. All rights reserved.
            </div>
            <div className="flex items-center space-x-4 mt-2 md:mt-0">
              <a href="#" className="text-sm text-neutral-600 hover:text-primary-600">Terms of Service</a>
              <a href="#" className="text-sm text-neutral-600 hover:text-primary-600">Privacy Policy</a>
              <a href="#" className="text-sm text-neutral-600 hover:text-primary-600">Help Center</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default GeologicalPetrophysicalEvaluation;