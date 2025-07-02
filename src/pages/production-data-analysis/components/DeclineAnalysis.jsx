import React, { useState } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import Icon from "../../../components/AppIcon";
import Dropdown from "../../../components/ui/Dropdown";
import Button from "../../../components/ui/Button";

const DeclineAnalysis = ({ data, isLoading }) => {
  const [declineModel, setDeclineModel] = useState({ value: "exponential", label: "Exponential" });
  const [forecastPeriod, setForecastPeriod] = useState({ value: "5", label: "5 Years" });
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock decline curve data
  const declineCurveData = [
    { month: "2023-01", actual: 1200, forecast: 1200 },
    { month: "2023-02", actual: 1150, forecast: 1140 },
    { month: "2023-03", actual: 1100, forecast: 1082 },
    { month: "2023-04", actual: 1050, forecast: 1028 },
    { month: "2023-05", actual: 1000, forecast: 976 },
    { month: "2023-06", actual: 950, forecast: 927 },
    { month: "2023-07", actual: 900, forecast: 880 },
    { month: "2023-08", actual: 850, forecast: 836 },
    { month: "2023-09", actual: 800, forecast: 794 },
    { month: "2023-10", actual: 750, forecast: 754 },
    { month: "2023-11", actual: 700, forecast: 716 },
    { month: "2023-12", actual: 650, forecast: 680 },
    { month: "2024-01", actual: null, forecast: 646 },
    { month: "2024-02", actual: null, forecast: 613 },
    { month: "2024-03", actual: null, forecast: 583 },
    { month: "2024-04", actual: null, forecast: 553 },
    { month: "2024-05", actual: null, forecast: 526 },
    { month: "2024-06", actual: null, forecast: 499 },
  ];

  // Decline model options
  const declineModelOptions = [
    { value: "exponential", label: "Exponential" },
    { value: "harmonic", label: "Harmonic" },
    { value: "hyperbolic", label: "Hyperbolic" },
    { value: "custom", label: "Custom" },
  ];

  // Forecast period options
  const forecastPeriodOptions = [
    { value: "1", label: "1 Year" },
    { value: "2", label: "2 Years" },
    { value: "5", label: "5 Years" },
    { value: "10", label: "10 Years" },
    { value: "custom", label: "Custom" },
  ];

  // Mock decline parameters
  const declineParameters = {
    initialRate: 1200,
    declineRate: 5.2,
    bFactor: 0.8,
    rSquared: 0.97,
  };

  // Toggle expanded view
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-medium text-neutral-900">Decline Curve Analysis</h3>
        </div>
        <div className="h-40 bg-neutral-200 rounded"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-medium text-neutral-900">Decline Curve Analysis</h3>
        <button
          onClick={toggleExpanded}
          className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
        >
          {isExpanded ? (
            <>
              <span>Collapse</span>
              <Icon name="ChevronUp" size={16} className="ml-1" />
            </>
          ) : (
            <>
              <span>Expand</span>
              <Icon name="ChevronDown" size={16} className="ml-1" />
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <Dropdown
          options={declineModelOptions}
          value={declineModel}
          onChange={setDeclineModel}
          placeholder="Select model"
          size="sm"
        />
        <Dropdown
          options={forecastPeriodOptions}
          value={forecastPeriod}
          onChange={setForecastPeriod}
          placeholder="Forecast period"
          size="sm"
        />
      </div>

      <div className="h-40 md:h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={declineCurveData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} tickFormatter={(value) => value.substring(5)} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "0.375rem",
                fontSize: "12px",
              }}
            />
            <Line type="monotone" dataKey="actual" name="Actual" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="forecast" name="Forecast" stroke="#f59e0b" strokeWidth={2} strokeDasharray="3 3" dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {isExpanded && (
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-neutral-50 p-3 rounded-md">
              <div className="text-xs text-neutral-500 mb-1">Initial Rate (qi)</div>
              <div className="text-sm font-medium">{declineParameters.initialRate} bbl/d</div>
            </div>
            <div className="bg-neutral-50 p-3 rounded-md">
              <div className="text-xs text-neutral-500 mb-1">Decline Rate (Di)</div>
              <div className="text-sm font-medium">{declineParameters.declineRate}% per year</div>
            </div>
            <div className="bg-neutral-50 p-3 rounded-md">
              <div className="text-xs text-neutral-500 mb-1">b-Factor</div>
              <div className="text-sm font-medium">{declineParameters.bFactor}</div>
            </div>
            <div className="bg-neutral-50 p-3 rounded-md">
              <div className="text-xs text-neutral-500 mb-1">R-Squared</div>
              <div className="text-sm font-medium">{declineParameters.rSquared}</div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              variant="primary"
              size="sm"
              icon="Save"
            >
              Save Analysis
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeclineAnalysis;