import React from "react";
import { ResponsiveContainer, LineChart, Line, Bar, ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const ProductionChart = ({ data, chartType, isLoading, isComparisonEnabled }) => {
  if (isLoading) {
    return (
      <div className="h-80 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const renderProductionRatesChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="date" stroke="#64748b" />
        <YAxis yAxisId="left" stroke="#64748b" />
        <YAxis yAxisId="right" orientation="right" stroke="#64748b" />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "0.375rem",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          }}
        />
        <Legend />
        <Bar yAxisId="left" dataKey="oil" name="Oil (bbl/d)" fill="#3b82f6" barSize={20} />
        <Line yAxisId="right" type="monotone" dataKey="gas" name="Gas (mcf/d)" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
        <Line yAxisId="left" type="monotone" dataKey="water" name="Water (bbl/d)" stroke="#0891b2" strokeWidth={2} dot={{ r: 4 }} />
        
        {isComparisonEnabled && (
          <>
            <Bar yAxisId="left" dataKey="oil" name="Oil (Forecast)" fill="#93c5fd" barSize={20} strokeDasharray="3 3" />
            <Line yAxisId="right" type="monotone" dataKey="gas" name="Gas (Forecast)" stroke="#fca5a5" strokeWidth={2} strokeDasharray="3 3" dot={{ r: 4 }} />
            <Line yAxisId="left" type="monotone" dataKey="water" name="Water (Forecast)" stroke="#67e8f9" strokeWidth={2} strokeDasharray="3 3" dot={{ r: 4 }} />
          </>
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );

  const renderPressureChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="date" stroke="#64748b" />
        <YAxis stroke="#64748b" />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "0.375rem",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          }}
        />
        <Legend />
        <Line type="monotone" dataKey="pressure" name="Pressure (psi)" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
        
        {isComparisonEnabled && (
          <Line type="monotone" dataKey="pressure" name="Pressure (Forecast)" stroke="#c4b5fd" strokeWidth={2} strokeDasharray="3 3" dot={{ r: 4 }} />
        )}
      </LineChart>
    </ResponsiveContainer>
  );

  const renderRatiosChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="date" stroke="#64748b" />
        <YAxis yAxisId="left" stroke="#64748b" />
        <YAxis yAxisId="right" orientation="right" stroke="#64748b" />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "0.375rem",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          }}
        />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="gor" name="GOR (mcf/bbl)" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
        <Line yAxisId="right" type="monotone" dataKey="wor" name="WOR (bbl/bbl)" stroke="#0891b2" strokeWidth={2} dot={{ r: 4 }} />
        
        {isComparisonEnabled && (
          <>
            <Line yAxisId="left" type="monotone" dataKey="gor" name="GOR (Forecast)" stroke="#fcd34d" strokeWidth={2} strokeDasharray="3 3" dot={{ r: 4 }} />
            <Line yAxisId="right" type="monotone" dataKey="wor" name="WOR (Forecast)" stroke="#67e8f9" strokeWidth={2} strokeDasharray="3 3" dot={{ r: 4 }} />
          </>
        )}
      </LineChart>
    </ResponsiveContainer>
  );

  const renderCumulativeChart = () => {
    // Calculate cumulative values
    const cumulativeData = data.map((item, index) => {
      const prevCumOil = index > 0 ? data[index - 1].cumOil || 0 : 0;
      const prevCumGas = index > 0 ? data[index - 1].cumGas || 0 : 0;
      const prevCumWater = index > 0 ? data[index - 1].cumWater || 0 : 0;
      
      return {
        ...item,
        cumOil: prevCumOil + item.oil,
        cumGas: prevCumGas + item.gas,
        cumWater: prevCumWater + item.water,
      };
    });

    return (
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={cumulativeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" stroke="#64748b" />
          <YAxis yAxisId="left" stroke="#64748b" />
          <YAxis yAxisId="right" orientation="right" stroke="#64748b" />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "0.375rem",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
            }}
          />
          <Legend />
          <Area yAxisId="left" type="monotone" dataKey="cumOil" name="Cumulative Oil (bbl)" fill="#3b82f6" stroke="#3b82f6" fillOpacity={0.3} />
          <Area yAxisId="right" type="monotone" dataKey="cumGas" name="Cumulative Gas (mcf)" fill="#ef4444" stroke="#ef4444" fillOpacity={0.3} />
          <Area yAxisId="left" type="monotone" dataKey="cumWater" name="Cumulative Water (bbl)" fill="#0891b2" stroke="#0891b2" fillOpacity={0.3} />
        </ComposedChart>
      </ResponsiveContainer>
    );
  };

  // Render the appropriate chart based on the selected type
  switch (chartType) {
    case "pressure":
      return renderPressureChart();
    case "ratios":
      return renderRatiosChart();
    case "cumulative":
      return renderCumulativeChart();
    case "production":
    default:
      return renderProductionRatesChart();
  }
};

export default ProductionChart;