// Mock user data
  export const user = {
    name: "John Smith",
    email: "john.smith@petrodigital.com",
    initials: "JS",
  };

  // Mock wells data
  export const wells = [
    { value: "well-01", label: "Well Alpha-01", icon: "Drill" },
    { value: "well-02", label: "Well Beta-02", icon: "Drill" },
    { value: "well-03", label: "Well Gamma-03", icon: "Drill" },
    { value: "well-04", label: "Well Delta-04", icon: "Drill" },
  ];

  // Mock time range options
  export const timeRangeOptions = [
    { value: "24h", label: "Last 24 Hours" },
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "custom", label: "Custom Range" },
  ];

  // Mock depth range options
  export const depthRangeOptions = [
    { value: "all", label: "All Depths" },
    { value: "surface", label: "Surface to 1000m" },
    { value: "intermediate", label: "1000m to 2000m" },
    { value: "deep", label: "Below 2000m" },
    { value: "custom", label: "Custom Range" },
  ];