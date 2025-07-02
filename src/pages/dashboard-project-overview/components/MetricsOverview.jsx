import React from "react";
import Icon from "../../../components/AppIcon";

const MetricsOverview = ({ metrics }) => {
  // Metric cards data
  const metricCards = [
    {
      title: "Active Projects",
      value: metrics.activeProjects,
      icon: "Briefcase",
      color: "bg-primary-100 text-primary-600",
      change: "+2 from last month",
      trend: "up"
    },
    {
      title: "Total Wells",
      value: metrics.totalWells,
      icon: "Drill",
      color: "bg-success-100 text-success-600",
      change: "+5 from last month",
      trend: "up"
    },
    {
      title: "Total Production",
      value: metrics.totalProduction,
      icon: "BarChart3",
      color: "bg-warning-100 text-warning-600",
      change: "+3.2% from last month",
      trend: "up"
    },
    {
      title: "Pending Tasks",
      value: metrics.pendingTasks,
      icon: "CheckSquare",
      color: "bg-info-100 text-info-600",
      change: "-4 from last month",
      trend: "down"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metricCards.map((metric, index) => (
        <div 
          key={index} 
          className="bg-white rounded-lg border border-neutral-200 shadow-sm p-4 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-500">{metric.title}</p>
              <p className="mt-1 text-2xl font-semibold text-neutral-900">{metric.value}</p>
            </div>
            <div className={`p-2 rounded-lg ${metric.color}`}>
              <Icon name={metric.icon} size={20} />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <Icon 
              name={metric.trend === "up" ? "TrendingUp" : "TrendingDown"} 
              size={16} 
              className={metric.trend === "up" ? "text-success-500" : "text-error-500"} 
            />
            <span className="ml-1 text-xs text-neutral-500">{metric.change}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsOverview;