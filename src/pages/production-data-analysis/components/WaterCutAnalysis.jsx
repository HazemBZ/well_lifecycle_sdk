import React, { useState } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from "recharts";
import Icon from "../../../components/AppIcon";

const WaterCutAnalysis = ({ data, isLoading }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock water cut data
  const waterCutData = [
    { month: "2023-01", waterCut: 27.3, oilRate: 1200 },
    { month: "2023-02", waterCut: 29.5, oilRate: 1150 },
    { month: "2023-03", waterCut: 32.1, oilRate: 1100 },
    { month: "2023-04", waterCut: 34.4, oilRate: 1050 },
    { month: "2023-05", waterCut: 36.7, oilRate: 1000 },
    { month: "2023-06", waterCut: 38.7, oilRate: 950 },
    { month: "2023-07", waterCut: 40.8, oilRate: 900 },
    { month: "2023-08", waterCut: 43.0, oilRate: 850 },
    { month: "2023-09", waterCut: 45.2, oilRate: 800 },
    { month: "2023-10", waterCut: 47.6, oilRate: 750 },
    { month: "2023-11", waterCut: 50.0, oilRate: 700 },
    { month: "2023-12", waterCut: 52.6, oilRate: 650 },
  ];

  // Toggle expanded view
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-medium text-neutral-900">Water Cut Analysis</h3>
        </div>
        <div className="h-40 bg-neutral-200 rounded"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-medium text-neutral-900">Water Cut Analysis</h3>
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

      <div className="h-40 md:h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={waterCutData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} tickFormatter={(value) => value.substring(5)} />
            <YAxis yAxisId="left" tick={{ fontSize: 10 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "0.375rem",
                fontSize: "12px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "10px" }} />
            <Line yAxisId="left" type="monotone" dataKey="waterCut" name="Water Cut (%)" stroke="#0891b2" strokeWidth={2} dot={{ r: 3 }} />
            <Line yAxisId="right" type="monotone" dataKey="oilRate" name="Oil Rate (bbl/d)" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
            <ReferenceLine y={50} yAxisId="left" stroke="#ef4444" strokeDasharray="3 3" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {isExpanded && (
        <div className="mt-4">
          <div className="bg-neutral-50 p-3 rounded-md mb-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-neutral-500 mb-1">Current Water Cut</div>
                <div className="text-sm font-medium">52.6%</div>
              </div>
              <div>
                <div className="text-xs text-neutral-500 mb-1">Water Cut Trend</div>
                <div className="text-sm font-medium text-error-500 flex items-center">
                  <Icon name="TrendingUp" size={14} className="mr-1" />
                  +2.1% per month
                </div>
              </div>
              <div>
                <div className="text-xs text-neutral-500 mb-1">Economic Limit</div>
                <div className="text-sm font-medium">95%</div>
              </div>
              <div>
                <div className="text-xs text-neutral-500 mb-1">Projected Limit Date</div>
                <div className="text-sm font-medium">2025-06</div>
              </div>
            </div>
          </div>
          <div className="text-xs text-neutral-500">
            <p>The water cut has increased by 25.3% over the past 12 months. The trend indicates potential water breakthrough in the reservoir. Consider water management strategies if the trend continues.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaterCutAnalysis;