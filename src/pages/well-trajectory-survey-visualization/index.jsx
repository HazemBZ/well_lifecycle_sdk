import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/AppIcon";

import Header from "../../components/ui/Header";
import Sidebar from "../../components/ui/Sidebar";
import Button from "../../components/ui/Button";
import Dropdown from "../../components/ui/Dropdown";
import WellSelector from "./components/WellSelector";
import SurveyDataGrid from "./components/SurveyDataGrid";
import CalculationSettings from "./components/CalculationSettings";
import Visualization3D from "./components/Visualization3D";
import Visualization2D from "./components/Visualization2D";
import ToolBar from "./components/ToolBar";
import FileUploader from "./components/FileUploader";
import {
  user,
  wells,
  calculationMethods,
  colorOptions,
} from "./WellTrajectoryVisualizationMockData";

const WellTrajectorySurveyVisualization = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("3d");
  const [selectedWell, setSelectedWell] = useState(null);
  const [selectedWells, setSelectedWells] = useState([]);
  const [calculationMethod, setCalculationMethod] =
    useState("minimumCurvature");
  const [showUncertainty, setShowUncertainty] = useState(false);
  const [colorBy, setColorBy] = useState("formation");
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Handle well selection
  const handleWellSelect = (well) => {
    setSelectedWell(well);

    // Add to multi-well selection if not already included
    if (!selectedWells.some((w) => w.value === well.value)) {
      setSelectedWells([...selectedWells, well]);
    }
  };

  // Handle removing a well from multi-well selection
  const handleRemoveWell = (wellToRemove) => {
    setSelectedWells(
      selectedWells.filter((well) => well.value !== wellToRemove.value)
    );

    // If the currently selected well is removed, select the first remaining well or null
    if (selectedWell && selectedWell.value === wellToRemove.value) {
      setSelectedWell(selectedWells.length > 1 ? selectedWells[0] : null);
    }
  };

  // Handle calculation method change
  const handleCalculationMethodChange = (method) => {
    setCalculationMethod(method);
  };

  // Handle color by change
  const handleColorByChange = (option) => {
    setColorBy(option);
  };

  // Toggle uncertainty visualization
  const toggleUncertainty = () => {
    setShowUncertainty(!showUncertainty);
  };

  // Toggle import modal
  const toggleImportModal = () => {
    setIsImportModalOpen(!isImportModalOpen);
  };

  // Toggle export modal
  const toggleExportModal = () => {
    setIsExportModalOpen(!isExportModalOpen);
  };

  // Handle sidebar toggle
  const handleSidebarToggle = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  // Set initial well on component mount
  useEffect(() => {
    if (wells.length > 0 && !selectedWell) {
      setSelectedWell(wells[0]);
      setSelectedWells([wells[0]]);
    }
  }, []);

  // Mock user data for header

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Sidebar */}
      <Sidebar
        variant={sidebarCollapsed ? "collapsed" : "expanded"}
        onToggle={handleSidebarToggle}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          user={user}
          onSearch={(query) => console.log("Search:", query)}
          onNotificationsClick={() => console.log("Notifications clicked")}
          onHelpClick={() => console.log("Help clicked")}
        />

        {/* Page content */}
        <div className="flex-1 overflow-auto">
          {/* Page header */}
          <div className="bg-white border-b border-neutral-200 px-6 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-neutral-900">
                  Well Trajectory & Survey Visualization
                </h1>
                <p className="mt-1 text-sm text-neutral-600">
                  Visualize and analyze wellbore paths based on deviation survey
                  data
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex space-x-3">
                <Button
                  variant="secondary"
                  icon="Upload"
                  onClick={toggleImportModal}
                >
                  Import
                </Button>
                <Button
                  variant="secondary"
                  icon="Download"
                  onClick={toggleExportModal}
                >
                  Export
                </Button>
                <Button variant="primary" icon="Save">
                  Save
                </Button>
              </div>
            </div>

            {/* Navigation tabs */}
            <div className="mt-6 border-b border-neutral-200">
              <nav className="-mb-px flex space-x-6">
                <button
                  className={`pb-3 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "3d"
                      ? "border-primary-600 text-primary-600"
                      : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                  }`}
                  onClick={() => setActiveTab("3d")}
                >
                  3D View
                </button>
                <button
                  className={`pb-3 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "2d"
                      ? "border-primary-600 text-primary-600"
                      : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                  }`}
                  onClick={() => setActiveTab("2d")}
                >
                  2D Sections
                </button>
                <button
                  className={`pb-3 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "data"
                      ? "border-primary-600 text-primary-600"
                      : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                  }`}
                  onClick={() => setActiveTab("data")}
                >
                  Survey Data
                </button>
                <button
                  className={`pb-3 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "settings"
                      ? "border-primary-600 text-primary-600"
                      : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                  }`}
                  onClick={() => setActiveTab("settings")}
                >
                  Calculation Settings
                </button>
              </nav>
            </div>
          </div>

          {/* Well selection and toolbar */}
          <div className="px-6 py-4 bg-white border-b border-neutral-200 flex flex-col sm:flex-row justify-between">
            <div className="w-full sm:w-64 mb-4 sm:mb-0">
              <WellSelector
                wells={wells}
                selectedWell={selectedWell}
                selectedWells={selectedWells}
                onSelectWell={handleWellSelect}
                onRemoveWell={handleRemoveWell}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="w-48">
                <Dropdown
                  label="Color By"
                  options={colorOptions}
                  value={colorOptions.find(
                    (option) => option.value === colorBy
                  )}
                  onChange={(option) => handleColorByChange(option.value)}
                  fullWidth={false}
                />
              </div>

              <div className="flex items-center">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={showUncertainty}
                    onChange={toggleUncertainty}
                  />
                  <div className="relative w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  <span className="ml-2 text-sm font-medium text-neutral-700">
                    Show Uncertainty
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Main visualization area */}
          <div className="p-6">
            {activeTab === "3d" && (
              <div className="bg-white rounded-lg border border-neutral-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
                  <h2 className="text-lg font-medium text-neutral-900">
                    3D Wellbore Trajectory
                  </h2>
                  <ToolBar />
                </div>
                <div className="h-[calc(100vh-320px)] min-h-[500px]">
                  <Visualization3D
                    selectedWells={selectedWells}
                    colorBy={colorBy}
                    showUncertainty={showUncertainty}
                  />
                </div>
              </div>
            )}

            {activeTab === "2d" && (
              <div className="bg-white rounded-lg border border-neutral-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
                  <h2 className="text-lg font-medium text-neutral-900">
                    2D Section Views
                  </h2>
                  <ToolBar variant="2d" />
                </div>
                <div className="h-[calc(100vh-320px)] min-h-[500px]">
                  <Visualization2D
                    selectedWell={selectedWell}
                    selectedWells={selectedWells}
                    colorBy={colorBy}
                  />
                </div>
              </div>
            )}

            {activeTab === "data" && (
              <div className="bg-white rounded-lg border border-neutral-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
                  <h2 className="text-lg font-medium text-neutral-900">
                    Survey Data Grid
                  </h2>
                  <div className="flex space-x-2">
                    <Button variant="secondary" size="sm" icon="Plus">
                      Add Point
                    </Button>
                    <Button variant="secondary" size="sm" icon="Edit">
                      Edit
                    </Button>
                  </div>
                </div>
                <div className="h-[calc(100vh-320px)] min-h-[500px] overflow-auto">
                  <SurveyDataGrid
                    selectedWell={selectedWell}
                    calculationMethod={calculationMethod}
                  />
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-white rounded-lg border border-neutral-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-neutral-200">
                  <h2 className="text-lg font-medium text-neutral-900">
                    Calculation Settings
                  </h2>
                </div>
                <div className="p-6">
                  <CalculationSettings
                    calculationMethod={calculationMethod}
                    calculationMethods={calculationMethods}
                    onCalculationMethodChange={handleCalculationMethodChange}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Import Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 bg-neutral-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-neutral-900">
                Import Survey Data
              </h2>
              <button
                className="text-neutral-500 hover:text-neutral-700"
                onClick={toggleImportModal}
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="p-6">
              <FileUploader />
            </div>
            <div className="p-4 border-t border-neutral-200 flex justify-end space-x-3">
              <Button variant="secondary" onClick={toggleImportModal}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  console.log("Import data");
                  toggleImportModal();
                }}
              >
                Import
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {isExportModalOpen && (
        <div className="fixed inset-0 bg-neutral-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-neutral-900">
                Export Trajectory Data
              </h2>
              <button
                className="text-neutral-500 hover:text-neutral-700"
                onClick={toggleExportModal}
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Export Format
                  </label>
                  <div className="space-y-2">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="exportFormat"
                        value="csv"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300"
                        defaultChecked
                      />
                      <span className="ml-2 text-sm text-neutral-700">CSV</span>
                    </label>
                    <div className="block">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="exportFormat"
                          value="excel"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300"
                        />
                        <span className="ml-2 text-sm text-neutral-700">
                          Excel
                        </span>
                      </label>
                    </div>
                    <div className="block">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="exportFormat"
                          value="witsml"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300"
                        />
                        <span className="ml-2 text-sm text-neutral-700">
                          WITSML
                        </span>
                      </label>
                    </div>
                    <div className="block">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="exportFormat"
                          value="pdf"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300"
                        />
                        <span className="ml-2 text-sm text-neutral-700">
                          PDF Report
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Export Content
                  </label>
                  <div className="space-y-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="exportRawData"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                        defaultChecked
                      />
                      <span className="ml-2 text-sm text-neutral-700">
                        Raw Survey Data
                      </span>
                    </label>
                    <div className="block">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="exportCalculated"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm text-neutral-700">
                          Calculated Points
                        </span>
                      </label>
                    </div>
                    <div className="block">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="exportVisuals"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                        />
                        <span className="ml-2 text-sm text-neutral-700">
                          Include Visualizations
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-neutral-200 flex justify-end space-x-3">
              <Button variant="secondary" onClick={toggleExportModal}>
                Cancel
              </Button>
              <Button
                variant="primary"
                icon="Download"
                onClick={() => {
                  console.log("Export data");
                  toggleExportModal();
                }}
              >
                Export
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation to Dashboard */}
      <div className="fixed bottom-6 left-6">
        <Link to="/dashboard-project-overview">
          <Button variant="primary" icon="ArrowLeft">
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default WellTrajectorySurveyVisualization;
