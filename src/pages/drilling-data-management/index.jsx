import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Header from "../../components/ui/Header";
import Sidebar from "../../components/ui/Sidebar";
import Button from "../../components/ui/Button";
import Dropdown from "../../components/ui/Dropdown";
import TimeDepthPlot from "./components/TimeDepthPlot";
import DailyDrillingReport from "./components/DailyDrillingReport";
import KPIDashboard from "./components/KPIDashboard";
import BHADiagram from "./components/BHADiagram";
import ToolbarPanel from "./components/ToolbarPanel";
import DataImportPanel from "./components/DataImportPanel";
import FilterPanel from "./components/FilterPanel";

const DrillingDataManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedWell, setSelectedWell] = useState(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h");
  const [selectedDepthRange, setSelectedDepthRange] = useState("all");
  const [showDataImport, setShowDataImport] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data
  const user = {
    name: "John Smith",
    email: "john.smith@petrodigital.com",
    initials: "JS",
  };

  // Mock wells data
  const wells = [
    { value: "well-01", label: "Well Alpha-01", icon: "Drill" },
    { value: "well-02", label: "Well Beta-02", icon: "Drill" },
    { value: "well-03", label: "Well Gamma-03", icon: "Drill" },
    { value: "well-04", label: "Well Delta-04", icon: "Drill" },
  ];

  // Mock time range options
  const timeRangeOptions = [
    { value: "24h", label: "Last 24 Hours" },
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "custom", label: "Custom Range" },
  ];

  // Mock depth range options
  const depthRangeOptions = [
    { value: "all", label: "All Depths" },
    { value: "surface", label: "Surface to 1000m" },
    { value: "intermediate", label: "1000m to 2000m" },
    { value: "deep", label: "Below 2000m" },
    { value: "custom", label: "Custom Range" },
  ];

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setSelectedWell(wells[0]);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle sidebar toggle
  const handleSidebarToggle = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Toggle data import panel
  const toggleDataImport = () => {
    setShowDataImport(!showDataImport);
    if (showDataImport) setShowFilters(false);
  };

  // Toggle filters panel
  const toggleFilters = () => {
    setShowFilters(!showFilters);
    if (showFilters) setShowDataImport(false);
  };

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Sidebar */}
      <Sidebar
        variant={sidebarCollapsed ? "collapsed" : "expanded"}
        onToggle={handleSidebarToggle}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          user={user}
          onSearch={(query) => console.log("Search:", query)}
          onNotificationsClick={() => console.log("Notifications clicked")}
          onHelpClick={() => console.log("Help clicked")}
        />

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          {/* Page Header */}
          <div className="bg-white border-b border-neutral-200 px-6 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-neutral-900">Drilling Data Management</h1>
                <p className="text-neutral-500 mt-1">
                  Visualize and analyze drilling operations data
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
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
                  icon="Download"
                  iconPosition="left"
                >
                  Export Data
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-6 border-b border-neutral-200">
              <nav className="-mb-px flex space-x-6">
                <button
                  className={`pb-3 px-1 ${
                    activeTab === "overview" ?"border-b-2 border-primary-500 text-primary-600 font-medium" :"text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                  }`}
                  onClick={() => handleTabChange("overview")}
                >
                  <div className="flex items-center">
                    <Icon name="Grid" size={18} className="mr-2" />
                    Overview
                  </div>
                </button>
                <button
                  className={`pb-3 px-1 ${
                    activeTab === "realtime" ?"border-b-2 border-primary-500 text-primary-600 font-medium" :"text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                  }`}
                  onClick={() => handleTabChange("realtime")}
                >
                  <div className="flex items-center">
                    <Icon name="Activity" size={18} className="mr-2" />
                    Real-time Data
                  </div>
                </button>
                <button
                  className={`pb-3 px-1 ${
                    activeTab === "historical" ?"border-b-2 border-primary-500 text-primary-600 font-medium" :"text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                  }`}
                  onClick={() => handleTabChange("historical")}
                >
                  <div className="flex items-center">
                    <Icon name="Clock" size={18} className="mr-2" />
                    Historical Data
                  </div>
                </button>
                <button
                  className={`pb-3 px-1 ${
                    activeTab === "reports" ?"border-b-2 border-primary-500 text-primary-600 font-medium" :"text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                  }`}
                  onClick={() => handleTabChange("reports")}
                >
                  <div className="flex items-center">
                    <Icon name="FileText" size={18} className="mr-2" />
                    Reports
                  </div>
                </button>
                <button
                  className={`pb-3 px-1 ${
                    activeTab === "alerts" ?"border-b-2 border-primary-500 text-primary-600 font-medium" :"text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                  }`}
                  onClick={() => handleTabChange("alerts")}
                >
                  <div className="flex items-center">
                    <Icon name="Bell" size={18} className="mr-2" />
                    Alerts
                  </div>
                </button>
              </nav>
            </div>
          </div>

          {/* Control Panel */}
          <div className="bg-white border-b border-neutral-200 px-6 py-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <div className="w-64">
                  <Dropdown
                    label="Well"
                    options={wells}
                    value={selectedWell}
                    onChange={setSelectedWell}
                    icon="Drill"
                  />
                </div>
                <div className="w-48">
                  <Dropdown
                    label="Time Range"
                    options={timeRangeOptions}
                    value={timeRangeOptions.find(option => option.value === selectedTimeRange)}
                    onChange={(option) => setSelectedTimeRange(option.value)}
                    icon="Clock"
                  />
                </div>
                <div className="w-48">
                  <Dropdown
                    label="Depth Range"
                    options={depthRangeOptions}
                    value={depthRangeOptions.find(option => option.value === selectedDepthRange)}
                    onChange={(option) => setSelectedDepthRange(option.value)}
                    icon="ArrowDownUp"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={showFilters ? "primary" : "secondary"}
                  icon="Filter"
                  onClick={toggleFilters}
                >
                  Filters
                </Button>
                <Button
                  variant={showDataImport ? "primary" : "secondary"}
                  icon="Upload"
                  onClick={toggleDataImport}
                >
                  Import Data
                </Button>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && <FilterPanel onClose={toggleFilters} />}

          {/* Data Import Panel */}
          {showDataImport && <DataImportPanel onClose={toggleDataImport} />}

          {/* Main Content */}
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                <p className="mt-4 text-neutral-600">Loading drilling data...</p>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* KPI Dashboard */}
                <div className="lg:col-span-3">
                  <KPIDashboard />
                </div>

                {/* Time-Depth Plot */}
                <div className="lg:col-span-2">
                  <TimeDepthPlot />
                </div>

                {/* BHA Diagram */}
                <div className="lg:col-span-1">
                  <BHADiagram />
                </div>

                {/* Daily Drilling Report */}
                <div className="lg:col-span-3">
                  <DailyDrillingReport />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Toolbar */}
        <ToolbarPanel />
      </div>
    </div>
  );
};

export default DrillingDataManagement;