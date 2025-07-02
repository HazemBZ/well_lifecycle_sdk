import React from "react";
import Icon from "../../../components/AppIcon";

const ProductionMetrics = ({ metrics, isLoading }) => {
  // Define metric cards
  const metricCards = [
    {
      title: "Cumulative Oil",
      value: metrics.cumulativeOil.toLocaleString(),
      unit: "bbl",
      icon: "Droplet",
      color: "bg-blue-100 text-blue-600",
      trend: "+2.5%",
      trendUp: true,
    },
    {
      title: "Cumulative Gas",
      value: metrics.cumulativeGas.toLocaleString(),
      unit: "mcf",
      icon: "Wind",
      color: "bg-red-100 text-red-600",
      trend: "+1.8%",
      trendUp: true,
    },
    {
      title: "Cumulative Water",
      value: metrics.cumulativeWater.toLocaleString(),
      unit: "bbl",
      icon: "Droplets",
      color: "bg-cyan-100 text-cyan-600",
      trend: "+4.2%",
      trendUp: true,
    },
    {
      title: "Current Oil Rate",
      value: metrics.currentRate.toLocaleString(),
      unit: "bbl/d",
      icon: "TrendingDown",
      color: "bg-amber-100 text-amber-600",
      trend: "-5.3%",
      trendUp: false,
    },
    {
      title: "Decline Rate",
      value: metrics.declineRate.toFixed(1),
      unit: "%/year",
      icon: "TrendingDown",
      color: "bg-purple-100 text-purple-600",
      trend: "+0.2%",
      trendUp: false,
    },
    {
      title: "Remaining Reserves",
      value: metrics.remainingReserves.toLocaleString(),
      unit: "bbl",
      icon: "Database",
      color: "bg-green-100 text-green-600",
      trend: "-1.5%",
      trendUp: false,
    },
    {
      title: "Water Cut",
      value: metrics.waterCut.toFixed(1),
      unit: "%",
      icon: "Percent",
      color: "bg-cyan-100 text-cyan-600",
      trend: "+2.1%",
      trendUp: false,
    },
    {
      title: "Average GOR",
      value: metrics.averageGOR.toFixed(2),
      unit: "mcf/bbl",
      icon: "BarChart2",
      color: "bg-orange-100 text-orange-600",
      trend: "+0.8%",
      trendUp: true,
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 animate-pulse">
            <div className="h-4 bg-neutral-200 rounded w-1/2 mb-2"></div>
            <div className="h-6 bg-neutral-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-neutral-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metricCards.map((metric, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`p-2 rounded-full ${metric.color}`}>
                <Icon name={metric.icon} size={20} />
              </div>
              <h3 className="ml-3 text-sm font-medium text-neutral-500">{metric.title}</h3>
            </div>
            <div className={`flex items-center text-xs font-medium ${metric.trendUp ? 'text-success-500' : 'text-error-500'}`}>
              <Icon name={metric.trendUp ? 'TrendingUp' : 'TrendingDown'} size={14} className="mr-1" />
              {metric.trend}
            </div>
          </div>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-neutral-900">{metric.value}</p>
            <p className="ml-2 text-sm text-neutral-500">{metric.unit}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductionMetrics;