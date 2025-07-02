import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const SystemHealth = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  const [systemMetrics, setSystemMetrics] = useState({
    cpu: 0,
    memory: 0,
    disk: 0,
    network: 0
  });
  
  const [pluginMetrics, setPluginMetrics] = useState([]);
  const [apiMetrics, setApiMetrics] = useState({
    totalRequests: 0,
    averageResponseTime: 0,
    errorRate: 0,
    requestsPerMinute: 0
  });
  
  const [alerts, setAlerts] = useState([]);

  // Simulate loading data
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        // Mock system metrics
        setSystemMetrics({
          cpu: 42,
          memory: 68,
          disk: 57,
          network: 35
        });
        
        // Mock plugin metrics
        setPluginMetrics([
          {
            id: "well-log-viewer",
            name: "Well Log Viewer",
            status: "healthy",
            responseTime: 120,
            errorRate: 0.2,
            activeUsers: 28,
            cpuUsage: 12,
            memoryUsage: 245
          },
          {
            id: "drilling-analytics",
            name: "Drilling Analytics",
            status: "healthy",
            responseTime: 180,
            errorRate: 0.5,
            activeUsers: 15,
            cpuUsage: 18,
            memoryUsage: 320
          },
          {
            id: "production-forecasting",
            name: "Production Forecasting",
            status: "warning",
            responseTime: 350,
            errorRate: 2.1,
            activeUsers: 12,
            cpuUsage: 25,
            memoryUsage: 410
          },
          {
            id: "geological-mapper",
            name: "Geological Mapper",
            status: "inactive",
            responseTime: 0,
            errorRate: 0,
            activeUsers: 0,
            cpuUsage: 0,
            memoryUsage: 0
          },
          {
            id: "petrophysical-analyzer",
            name: "Petrophysical Analyzer",
            status: "critical",
            responseTime: 780,
            errorRate: 8.5,
            activeUsers: 8,
            cpuUsage: 45,
            memoryUsage: 680
          }
        ]);
        
        // Mock API metrics
        setApiMetrics({
          totalRequests: 12458,
          averageResponseTime: 210,
          errorRate: 1.8,
          requestsPerMinute: 42
        });
        
        // Mock alerts
        setAlerts([
          {
            id: 1,
            severity: "critical",
            message: "Petrophysical Analyzer plugin response time exceeds threshold (780ms > 500ms)",
            timestamp: new Date(Date.now() - 15 * 60 * 1000),
            acknowledged: false
          },
          {
            id: 2,
            severity: "warning",
            message: "Production Forecasting plugin error rate above warning threshold (2.1% > 2.0%)",
            timestamp: new Date(Date.now() - 45 * 60 * 1000),
            acknowledged: false
          },
          {
            id: 3,
            severity: "info",
            message: "System memory usage approaching 70% of allocated resources",
            timestamp: new Date(Date.now() - 120 * 60 * 1000),
            acknowledged: true
          }
        ]);
        
        setLoading(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Refresh data
  const handleRefresh = () => {
    setRefreshing(true);
    
    // Simulate refresh delay
    setTimeout(() => {
      // Update some values to simulate changes
      setSystemMetrics(prev => ({
        ...prev,
        cpu: Math.min(100, prev.cpu + Math.floor(Math.random() * 10) - 5),
        memory: Math.min(100, prev.memory + Math.floor(Math.random() * 8) - 3)
      }));
      
      setPluginMetrics(prev => 
        prev.map(plugin => ({
          ...plugin,
          responseTime: Math.max(0, plugin.responseTime + Math.floor(Math.random() * 50) - 25),
          activeUsers: Math.max(0, plugin.activeUsers + Math.floor(Math.random() * 6) - 3)
        }))
      );
      
      setApiMetrics(prev => ({
        ...prev,
        averageResponseTime: Math.max(0, prev.averageResponseTime + Math.floor(Math.random() * 30) - 15),
        requestsPerMinute: Math.max(0, prev.requestsPerMinute + Math.floor(Math.random() * 10) - 5)
      }));
      
      setLastUpdated(new Date());
      setRefreshing(false);
    }, 2000);
  };

  // Acknowledge alert
  const acknowledgeAlert = (id) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === id ? { ...alert, acknowledged: true } : alert
      )
    );
  };

  // Format timestamp
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get status icon and color
  const getStatusInfo = (status) => {
    switch (status) {
      case "healthy":
        return { icon: "CheckCircle", color: "text-success-500" };
      case "warning":
        return { icon: "AlertTriangle", color: "text-warning-500" };
      case "critical":
        return { icon: "AlertOctagon", color: "text-error-500" };
      case "inactive":
        return { icon: "MinusCircle", color: "text-neutral-400" };
      default:
        return { icon: "HelpCircle", color: "text-neutral-500" };
    }
  };

  // Get alert severity info
  const getAlertInfo = (severity) => {
    switch (severity) {
      case "critical":
        return { icon: "AlertOctagon", color: "text-error-500", bgColor: "bg-error-500 bg-opacity-10" };
      case "warning":
        return { icon: "AlertTriangle", color: "text-warning-500", bgColor: "bg-warning-500 bg-opacity-10" };
      case "info":
        return { icon: "Info", color: "text-info-500", bgColor: "bg-info-500 bg-opacity-10" };
      default:
        return { icon: "Bell", color: "text-neutral-500", bgColor: "bg-neutral-100" };
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
        <p className="text-neutral-600">Loading system health data...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-lg font-medium text-neutral-900 mb-1">System Health Dashboard</h2>
          <p className="text-sm text-neutral-500">
            Monitor plugin performance, API usage, and resource utilization
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center">
          <span className="text-sm text-neutral-500 mr-3">
            Last updated: {formatTime(lastUpdated)}
          </span>
          <Button 
            variant="secondary" 
            icon="RefreshCw" 
            size="sm"
            loading={refreshing}
            onClick={handleRefresh}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* System metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-neutral-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-neutral-500">CPU Usage</h3>
            <Icon name="Cpu" size={18} className="text-neutral-400" />
          </div>
          <div className="flex items-end">
            <span className="text-2xl font-semibold text-neutral-900">{systemMetrics.cpu}%</span>
          </div>
          <div className="mt-2 w-full bg-neutral-100 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${
                systemMetrics.cpu > 80 ? 'bg-error-500' : 
                systemMetrics.cpu > 60 ? 'bg-warning-500': 'bg-success-500'
              }`} 
              style={{ width: `${systemMetrics.cpu}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-neutral-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-neutral-500">Memory Usage</h3>
            <Icon name="Database" size={18} className="text-neutral-400" />
          </div>
          <div className="flex items-end">
            <span className="text-2xl font-semibold text-neutral-900">{systemMetrics.memory}%</span>
          </div>
          <div className="mt-2 w-full bg-neutral-100 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${
                systemMetrics.memory > 80 ? 'bg-error-500' : 
                systemMetrics.memory > 60 ? 'bg-warning-500': 'bg-success-500'
              }`} 
              style={{ width: `${systemMetrics.memory}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-neutral-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-neutral-500">Disk Usage</h3>
            <Icon name="HardDrive" size={18} className="text-neutral-400" />
          </div>
          <div className="flex items-end">
            <span className="text-2xl font-semibold text-neutral-900">{systemMetrics.disk}%</span>
          </div>
          <div className="mt-2 w-full bg-neutral-100 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${
                systemMetrics.disk > 80 ? 'bg-error-500' : 
                systemMetrics.disk > 60 ? 'bg-warning-500': 'bg-success-500'
              }`} 
              style={{ width: `${systemMetrics.disk}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-neutral-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-neutral-500">Network Load</h3>
            <Icon name="Activity" size={18} className="text-neutral-400" />
          </div>
          <div className="flex items-end">
            <span className="text-2xl font-semibold text-neutral-900">{systemMetrics.network}%</span>
          </div>
          <div className="mt-2 w-full bg-neutral-100 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${
                systemMetrics.network > 80 ? 'bg-error-500' : 
                systemMetrics.network > 60 ? 'bg-warning-500': 'bg-success-500'
              }`} 
              style={{ width: `${systemMetrics.network}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* API metrics */}
      <div className="bg-white rounded-lg border border-neutral-200 p-5 shadow-sm mb-6">
        <h3 className="text-md font-medium text-neutral-900 mb-4">API Performance</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-neutral-500 mb-1">Total Requests (24h)</p>
            <p className="text-2xl font-semibold text-neutral-900">{apiMetrics.totalRequests.toLocaleString()}</p>
          </div>
          
          <div>
            <p className="text-sm text-neutral-500 mb-1">Avg. Response Time</p>
            <p className="text-2xl font-semibold text-neutral-900">{apiMetrics.averageResponseTime} ms</p>
          </div>
          
          <div>
            <p className="text-sm text-neutral-500 mb-1">Error Rate</p>
            <p className={`text-2xl font-semibold ${
              apiMetrics.errorRate > 5 ? 'text-error-600' : 
              apiMetrics.errorRate > 2 ? 'text-warning-600': 'text-neutral-900'
            }`}>
              {apiMetrics.errorRate}%
            </p>
          </div>
          
          <div>
            <p className="text-sm text-neutral-500 mb-1">Requests per Minute</p>
            <p className="text-2xl font-semibold text-neutral-900">{apiMetrics.requestsPerMinute}</p>
          </div>
        </div>
      </div>

      {/* Plugin health */}
      <div className="bg-white rounded-lg border border-neutral-200 shadow-sm mb-6 overflow-hidden">
        <div className="p-5 border-b border-neutral-200">
          <h3 className="text-md font-medium text-neutral-900">Plugin Health</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Plugin
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Response Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Error Rate
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Active Users
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Resource Usage
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {pluginMetrics.map(plugin => {
                const statusInfo = getStatusInfo(plugin.status);
                
                return (
                  <tr key={plugin.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-neutral-900">{plugin.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Icon name={statusInfo.icon} size={16} className={`${statusInfo.color} mr-1.5`} />
                        <span className="text-sm capitalize">{plugin.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${
                        plugin.responseTime > 500 ? 'text-error-600' : 
                        plugin.responseTime > 300 ? 'text-warning-600': 'text-neutral-900'
                      }`}>
                        {plugin.status === 'inactive' ? '-' : `${plugin.responseTime} ms`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${
                        plugin.errorRate > 5 ? 'text-error-600' : 
                        plugin.errorRate > 2 ? 'text-warning-600': 'text-neutral-900'
                      }`}>
                        {plugin.status === 'inactive' ? '-' : `${plugin.errorRate}%`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-900">
                        {plugin.status === 'inactive' ? '-' : plugin.activeUsers}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-900">
                        {plugin.status === 'inactive' ? '-' : `${plugin.cpuUsage}% CPU, ${plugin.memoryUsage} MB RAM`}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-white rounded-lg border border-neutral-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-neutral-200 flex justify-between items-center">
          <h3 className="text-md font-medium text-neutral-900">System Alerts</h3>
          <Button 
            variant="ghost" 
            icon="Bell" 
            size="sm"
          >
            Manage Alerts
          </Button>
        </div>
        
        {alerts.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="CheckCircle" size={36} className="mx-auto text-success-500 mb-3" />
            <p className="text-neutral-600">No active alerts. All systems operating normally.</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-200">
            {alerts.map(alert => {
              const alertInfo = getAlertInfo(alert.severity);
              
              return (
                <div key={alert.id} className={`p-4 ${alert.acknowledged ? 'bg-white' : alertInfo.bgColor}`}>
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 ${alertInfo.color} mt-0.5`}>
                      <Icon name={alertInfo.icon} size={18} />
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium ${alert.acknowledged ? 'text-neutral-900' : alertInfo.color}`}>
                          {alert.message}
                        </p>
                        <p className="text-xs text-neutral-500 ml-2">
                          {formatTime(alert.timestamp)}
                        </p>
                      </div>
                      {!alert.acknowledged && (
                        <div className="mt-2">
                          <Button 
                            variant="ghost" 
                            icon="CheckCircle" 
                            size="sm"
                            onClick={() => acknowledgeAlert(alert.id)}
                          >
                            Acknowledge
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemHealth;