
  // Function to generate mock curve data
  function generateMockCurveData(startDepth, endDepth, minValue, maxValue) {
    const data = [];
    const step = 0.5; // Half-foot increments
    
    for (let depth = startDepth; depth <= endDepth; depth += step) {
      // Generate a somewhat realistic curve with some noise and trends
      const baseValue = minValue + (Math.sin(depth / 50) + 1) * (maxValue - minValue) / 2;
      const noise = (Math.random() - 0.5) * (maxValue - minValue) * 0.1;
      data.push({
        depth,
        value: Math.max(minValue, Math.min(maxValue, baseValue + noise))
      });
    }
    
    return data;
  }


  // Mock data for wells
  export const wells = [
    { value: "well-1", label: "Well Alpha-1", icon: "Droplet" },
    { value: "well-2", label: "Well Beta-2", icon: "Droplet" },
    { value: "well-3", label: "Well Gamma-3", icon: "Droplet" },
    { value: "well-4", label: "Well Delta-4", icon: "Droplet" },
  ];

  // Mock data for templates
  export const templates = [
    { value: "template-1", label: "Basic Log Suite", icon: "FileText" },
    { value: "template-2", label: "Petrophysical Analysis", icon: "FileText" },
    { value: "template-3", label: "Formation Evaluation", icon: "FileText" },
    { value: "template-4", label: "Reservoir Characterization", icon: "FileText" },
  ];

  // Mock data for tracks
  export const defaultTracks = [
    {
      id: "track-1",
      name: "Gamma Ray",
      curves: [
        { id: "gr", name: "GR", color: "#FF0000", unit: "API", min: 0, max: 150, data: generateMockCurveData(8000, 8500, 0, 150) }
      ],
      scale: "linear",
      width: 1,
    },
    {
      id: "track-2",
      name: "Resistivity",
      curves: [
        { id: "rt", name: "RT", color: "#0000FF", unit: "ohm-m", min: 0.2, max: 2000, data: generateMockCurveData(8000, 8500, 0.2, 2000) }
      ],
      scale: "logarithmic",
      width: 1,
    },
    {
      id: "track-3",
      name: "Density-Neutron",
      curves: [
        { id: "rhob", name: "RHOB", color: "#FF0000", unit: "g/cc", min: 1.95, max: 2.95, data: generateMockCurveData(8000, 8500, 1.95, 2.95) },
        { id: "nphi", name: "NPHI", color: "#0000FF", unit: "v/v", min: 0.45, max: -0.15, data: generateMockCurveData(8000, 8500, -0.15, 0.45) }
      ],
      scale: "linear",
      width: 1,
    },
    {
      id: "track-4",
      name: "Sonic",
      curves: [
        { id: "dt", name: "DT", color: "#00AA00", unit: "us/ft", min: 40, max: 140, data: generateMockCurveData(8000, 8500, 40, 140) }
      ],
      scale: "linear",
      width: 1,
    }
  ];

  // Mock data for formations
  export const formations = [
    { id: "fm-1", name: "Upper Sandstone", topDepth: 8050, bottomDepth: 8150, color: "#FFD700" },
    { id: "fm-2", name: "Shale Barrier", topDepth: 8150, bottomDepth: 8200, color: "#808080" },
    { id: "fm-3", name: "Middle Sandstone", topDepth: 8200, bottomDepth: 8300, color: "#F5DEB3" },
    { id: "fm-4", name: "Lower Shale", topDepth: 8300, bottomDepth: 8450, color: "#696969" },
  ];

  // Mock user data
  export const user = {
    name: "John Smith",
    email: "john.smith@petrodigital.com",
    initials: "JS"
  };