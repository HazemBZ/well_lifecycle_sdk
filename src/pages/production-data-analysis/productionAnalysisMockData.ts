
  // Mock user data
  export const user = {
    name: "Alex Johnson",
    email: "alex.johnson@petrodigital.com",
    initials: "AJ",
  };

  // Mock well options
  export const wellOptions = [
    { value: "well-001", label: "Well-001" },
    { value: "well-002", label: "Well-002" },
    { value: "well-003", label: "Well-003" },
    { value: "well-004", label: "Well-004" },
    { value: "well-005", label: "Well-005" },
  ];

  // Mock time range options
  export const timeRangeOptions = [
    { value: "1m", label: "Last Month" },
    { value: "3m", label: "Last 3 Months" },
    { value: "6m", label: "Last 6 Months" },
    { value: "1y", label: "Last 12 Months" },
    { value: "all", label: "All Time" },
    { value: "custom", label: "Custom Range" },
  ];

  // Mock aggregation options
  export const aggregationOptions = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
    { value: "yearly", label: "Yearly" },
  ];

  // Mock chart type options
  export const chartTypeOptions = [
    { value: "production", label: "Production Rates", icon: "BarChart3" },
    { value: "pressure", label: "Pressure Data", icon: "Activity" },
    { value: "ratios", label: "GOR & WOR", icon: "LineChart" },
    { value: "cumulative", label: "Cumulative Production", icon: "TrendingUp" },
  ];

  // Mock production data
  export const productionData = [
    { date: "2023-01", oil: 1200, gas: 3500, water: 450, pressure: 2100, gor: 2.92, wor: 0.38 },
    { date: "2023-02", oil: 1150, gas: 3400, water: 480, pressure: 2050, gor: 2.96, wor: 0.42 },
    { date: "2023-03", oil: 1100, gas: 3300, water: 520, pressure: 2000, gor: 3.00, wor: 0.47 },
    { date: "2023-04", oil: 1050, gas: 3200, water: 550, pressure: 1950, gor: 3.05, wor: 0.52 },
    { date: "2023-05", oil: 1000, gas: 3100, water: 580, pressure: 1900, gor: 3.10, wor: 0.58 },
    { date: "2023-06", oil: 950, gas: 3000, water: 600, pressure: 1850, gor: 3.16, wor: 0.63 },
    { date: "2023-07", oil: 900, gas: 2900, water: 620, pressure: 1800, gor: 3.22, wor: 0.69 },
    { date: "2023-08", oil: 850, gas: 2800, water: 640, pressure: 1750, gor: 3.29, wor: 0.75 },
    { date: "2023-09", oil: 800, gas: 2700, water: 660, pressure: 1700, gor: 3.38, wor: 0.83 },
    { date: "2023-10", oil: 750, gas: 2600, water: 680, pressure: 1650, gor: 3.47, wor: 0.91 },
    { date: "2023-11", oil: 700, gas: 2500, water: 700, pressure: 1600, gor: 3.57, wor: 1.00 },
    { date: "2023-12", oil: 650, gas: 2400, water: 720, pressure: 1550, gor: 3.69, wor: 1.11 },
  ];

  // Mock metrics
  export const metrics = {
    cumulativeOil: 11100,
    cumulativeGas: 36400,
    cumulativeWater: 7200,
    initialRate: 1200,
    currentRate: 650,
    declineRate: 45.8,
    remainingReserves: 8500,
    waterCut: 52.6,
    averageGOR: 3.23,
    recoveryFactor: 18.5,
  };
