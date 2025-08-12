import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LineChart } from "recharts";
import Icon from "../../components/AppIcon";
import Header from "../../components/ui/Header";
import Sidebar from "../../components/ui/Sidebar";
import Dropdown from "../../components/ui/Dropdown";
import Button from "../../components/ui/Button";
import ProductionChart from "./components/ProductionChart";
import ProductionDataTable from "./components/ProductionDataTable";
import ProductionMetrics from "./components/ProductionMetrics";
import DeclineAnalysis from "./components/DeclineAnalysis";
import WaterCutAnalysis from "./components/WaterCutAnalysis";
import ProductionAllocation from "./components/ProductionAllocation";
import { aggregationOptions, chartTypeOptions, metrics, productionData, timeRangeOptions, user, wellOptions } from "./productionAnalysisMockData";

const ProductionDataAnalysis = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedWell, setSelectedWell] = useState({ value: "well-001", label: "Well-001" });
  const [selectedTimeRange, setSelectedTimeRange] = useState({ value: "1y", label: "Last 12 Months" });
  const [selectedAggregation, setSelectedAggregation] = useState({ value: "monthly", label: "Monthly" });
  const [selectedChartType, setSelectedChartType] = useState({ value: "production", label: "Production Rates" });
  const [isComparisonEnabled, setIsComparisonEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle sidebar toggle
  const handleSidebarToggle = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  // Handle well selection
  const handleWellChange = (option) => {
    setSelectedWell(option);
    setIsLoading(true);
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  // Handle time range selection
  const handleTimeRangeChange = (option) => {
    setSelectedTimeRange(option);
    setIsLoading(true);
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // Handle aggregation selection
  const handleAggregationChange = (option) => {
    setSelectedAggregation(option);
    setIsLoading(true);
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // Handle chart type selection
  const handleChartTypeChange = (option) => {
    setSelectedChartType(option);
  };

  // Toggle comparison mode
  const toggleComparison = () => {
    setIsComparisonEnabled(!isComparisonEnabled);
  };

  // Export data
  const handleExport = (type) => {
    console.log(`Exporting ${type}`);
    // In a real implementation, this would trigger a download
  };

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Sidebar */}
      <Sidebar
        variant="contextual"
        onToggle={handleSidebarToggle}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          variant="default"
          user={user}
        />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Page header */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-neutral-900">Production Data Analysis</h1>
                <p className="mt-1 text-sm text-neutral-500">
                  Monitor and analyze well production performance and trends
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                <Button
                  variant="secondary"
                  icon="Download"
                  onClick={() => handleExport('csv')}
                >
                  Export CSV
                </Button>
                <Button
                  variant="secondary"
                  icon="FileText"
                  onClick={() => handleExport('report')}
                >
                  Generate Report
                </Button>
                <Button
                  variant="primary"
                  icon="Upload"
                >
                  Import Data
                </Button>
              </div>
            </div>

            {/* Breadcrumb */}
            <nav className="mt-4 flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link to="/dashboard/home" className="text-neutral-500 hover:text-neutral-700">
                    <Icon name="Home" size={16} />
                    <span className="sr-only">Dashboard</span>
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <Icon name="ChevronRight" size={16} className="text-neutral-400" />
                    <span className="ml-2 text-sm font-medium text-primary-600">
                      Production Data Analysis
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>

          {/* Filters and controls */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Dropdown
                  label="Well Selection"
                  options={wellOptions}
                  value={selectedWell}
                  onChange={handleWellChange}
                  icon="Filter"
                />
              </div>
              <div>
                <Dropdown
                  label="Time Range"
                  options={timeRangeOptions}
                  value={selectedTimeRange}
                  onChange={handleTimeRangeChange}
                  icon="Calendar"
                />
              </div>
              <div>
                <Dropdown
                  label="Aggregation"
                  options={aggregationOptions}
                  value={selectedAggregation}
                  onChange={handleAggregationChange}
                  icon="BarChart2"
                />
              </div>
              <div>
                <Dropdown
                  label="Chart Type"
                  options={chartTypeOptions}
                  value={selectedChartType}
                  onChange={handleChartTypeChange}
                  icon="LineChart"
                />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="comparison"
                  checked={isComparisonEnabled}
                  onChange={toggleComparison}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                />
                <label htmlFor="comparison" className="ml-2 text-sm text-neutral-700">
                  Enable Comparison Mode
                </label>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="tertiary"
                  size="sm"
                  icon="RefreshCw"
                >
                  Refresh Data
                </Button>
                <Button
                  variant="tertiary"
                  size="sm"
                  icon="Edit2"
                >
                  Edit Data
                </Button>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Production metrics */}
            <div className="lg:col-span-3">
              <ProductionMetrics metrics={metrics} isLoading={isLoading} />
            </div>

            {/* Main chart */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-neutral-900">
                    {selectedChartType.label}
                  </h2>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon="ZoomIn"
                      iconPosition="right"
                    >
                      Zoom
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon="Image"
                      iconPosition="right"
                    >
                      Export
                    </Button>
                  </div>
                </div>
                <ProductionChart
                  data={productionData}
                  chartType={selectedChartType.value}
                  isLoading={isLoading}
                  isComparisonEnabled={isComparisonEnabled}
                />
              </div>
            </div>

            {/* Analysis panel */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-neutral-200 h-full">
                <div className="border-b border-neutral-200 px-4 py-3">
                  <h2 className="text-lg font-medium text-neutral-900">Analysis Tools</h2>
                </div>
                <div className="p-4">
                  <DeclineAnalysis data={productionData} isLoading={isLoading} />
                  <div className="mt-6">
                    <WaterCutAnalysis data={productionData} isLoading={isLoading} />
                  </div>
                  <div className="mt-6">
                    <ProductionAllocation isLoading={isLoading} />
                  </div>
                </div>
              </div>
            </div>

            {/* Data table */}
            <div className="lg:col-span-3">
              <ProductionDataTable data={productionData} isLoading={isLoading} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductionDataAnalysis;