import React from "react";
import Icon from "../../../components/AppIcon";

const KPIDashboard = () => {
  // Mock KPI data
  const kpiData = [
    {
      title: "Current Depth",
      value: "1,312.2",
      unit: "m",
      change: "+24.8",
      changeType: "positive",
      icon: "ArrowDownUp",
      color: "primary",
    },
    {
      title: "Current ROP",
      value: "14.5",
      unit: "m/hr",
      change: "-2.3",
      changeType: "negative",
      icon: "TrendingDown",
      color: "info",
    },
    {
      title: "Drilling Efficiency",
      value: "87",
      unit: "%",
      change: "+3",
      changeType: "positive",
      icon: "BarChart2",
      color: "success",
    },
    {
      title: "Non-Productive Time",
      value: "4.2",
      unit: "hrs",
      change: "+1.5",
      changeType: "negative",
      icon: "Clock",
      color: "warning",
    },
    {
      title: "Mud Weight",
      value: "1.25",
      unit: "g/cm³",
      change: "+0.03",
      changeType: "neutral",
      icon: "Droplet",
      color: "oil",
    },
    {
      title: "ECD",
      value: "1.32",
      unit: "g/cm³",
      change: "+0.02",
      changeType: "neutral",
      icon: "Thermometer",
      color: "gas",
    },
  ];

  // Progress against plan data
  const progressData = {
    planned: 1350,
    actual: 1312.2,
    unit: "m",
    percentage: 97,
  };

  return (
    <div className="bg-white rounded-lg border border-neutral-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-neutral-200">
        <h2 className="text-lg font-medium text-neutral-900">Key Performance Indicators</h2>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {kpiData.map((kpi, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg border border-neutral-200 shadow-sm p-4 flex flex-col"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-500">{kpi.title}</p>
                  <div className="mt-1 flex items-baseline">
                    <p className="text-2xl font-semibold text-neutral-900">{kpi.value}</p>
                    <p className="ml-1 text-sm font-medium text-neutral-500">{kpi.unit}</p>
                  </div>
                </div>
                <div className={`p-2 rounded-md bg-${kpi.color}-100`}>
                  <Icon 
                    name={kpi.icon} 
                    size={20} 
                    className={`text-${kpi.color}-600`}
                    style={{ color: `var(--color-${kpi.color}-600)` }}
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  kpi.changeType === 'positive' ?'bg-success-100 text-success-800' 
                    : kpi.changeType === 'negative' ?'bg-error-100 text-error-800' :'bg-neutral-100 text-neutral-800'
                }`}>
                  <Icon 
                    name={
                      kpi.changeType === 'positive' ?'ArrowUp' 
                        : kpi.changeType === 'negative' ?'ArrowDown' :'ArrowRight'
                    } 
                    size={12} 
                    className="mr-1"
                  />
                  {kpi.change} {kpi.unit}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 bg-white rounded-lg border border-neutral-200 shadow-sm p-4">
          <h3 className="text-base font-medium text-neutral-900 mb-2">Progress Against Plan</h3>
          <div className="flex items-center">
            <div className="flex-1 mr-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-neutral-700">
                  {progressData.actual} / {progressData.planned} {progressData.unit}
                </span>
                <span className="text-sm font-medium text-neutral-700">
                  {progressData.percentage}%
                </span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2.5">
                <div 
                  className="bg-primary-600 h-2.5 rounded-full" 
                  style={{ width: `${progressData.percentage}%` }}
                ></div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-neutral-500">Ahead/Behind</p>
              <p className="text-lg font-semibold text-success-600">
                <Icon name="ArrowUp" size={16} className="inline mr-1" />
                On Track
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPIDashboard;