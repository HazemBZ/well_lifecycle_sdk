import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Dropdown from "../../../components/ui/Dropdown";
import Input from "../../../components/ui/Input";
import InputWithUnit from "../../../components/ui/InputWithUnit";

const PetrophysicalWorkflow = () => {
  const [activeStep, setActiveStep] = useState("environmental");
  const [selectedMethod, setSelectedMethod] = useState({
    environmental: "standard",
    shaleVolume: "gamma-ray",
    porosity: "density-neutron",
    saturation: "archie"
  });
  const [parameters, setParameters] = useState({
    environmental: {
      mudWeight: 9.5,
      mudResistivity: 0.1,
      mudFiltrateSalinity: 30000,
      formationTemperature: 80,
      bitSize: 8.5
    },
    shaleVolume: {
      grSandstone: 15,
      grShale: 120,
      larionov: "tertiary"
    },
    porosity: {
      matrixDensity: 2.65,
      fluidDensity: 1.0,
      neutronMatrixResponse: 0.0,
      neutronFluidResponse: 1.0
    },
    saturation: {
      a: 1.0,
      m: 2.0,
      n: 2.0,
      rw: 0.03
    }
  });
  const [calculationStatus, setCalculationStatus] = useState({
    environmental: "complete",
    shaleVolume: "complete",
    porosity: "pending",
    saturation: "not-started"
  });

  // Workflow steps
  const workflowSteps = [
    { id: "environmental", name: "Environmental Corrections", icon: "Settings" },
    { id: "shaleVolume", name: "Shale Volume Calculation", icon: "Layers" },
    { id: "porosity", name: "Porosity Determination", icon: "Circle" },
    { id: "saturation", name: "Saturation Modeling", icon: "Droplets" }
  ];

  // Methods for each step
  const methods = {
    environmental: [
      { value: "standard", label: "Standard Corrections" },
      { value: "advanced", label: "Advanced Corrections" },
      { value: "custom", label: "Custom Corrections" }
    ],
    shaleVolume: [
      { value: "gamma-ray", label: "Gamma Ray Index" },
      { value: "sp", label: "Spontaneous Potential" },
      { value: "neutron-density", label: "Neutron-Density Crossplot" },
      { value: "multi-mineral", label: "Multi-Mineral Model" }
    ],
    porosity: [
      { value: "density", label: "Density Log" },
      { value: "neutron", label: "Neutron Log" },
      { value: "density-neutron", label: "Density-Neutron Crossplot" },
      { value: "sonic", label: "Sonic Log" }
    ],
    saturation: [
      { value: "archie", label: "Archie Equation" },
      { value: "indonesia", label: "Indonesia Equation" },
      { value: "simandoux", label: "Simandoux Equation" },
      { value: "dual-water", label: "Dual Water Model" }
    ]
  };

  // Handle method selection
  const handleMethodChange = (step, method) => {
    setSelectedMethod({
      ...selectedMethod,
      [step]: method.value
    });
  };

  // Handle parameter change
  const handleParameterChange = (step, param, value) => {
    setParameters({
      ...parameters,
      [step]: {
        ...parameters[step],
        [param]: value
      }
    });
  };

  // Run calculation
  const runCalculation = (step) => {
    setCalculationStatus({
      ...calculationStatus,
      [step]: "running"
    });
    
    // Simulate calculation time
    setTimeout(() => {
      setCalculationStatus({
        ...calculationStatus,
        [step]: "complete"
      });
      
      // Update next step status if it's not started yet
      const stepIndex = workflowSteps.findIndex(s => s.id === step);
      if (stepIndex < workflowSteps.length - 1) {
        const nextStep = workflowSteps[stepIndex + 1].id;
        if (calculationStatus[nextStep] === "not-started") {
          setCalculationStatus({
            ...calculationStatus,
            [nextStep]: "pending"
          });
        }
      }
    }, 2000);
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "complete":
        return <Icon name="CheckCircle" size={16} className="text-success-500" />;
      case "running":
        return <div className="animate-spin h-4 w-4 border-2 border-primary-500 border-t-transparent rounded-full"></div>;
      case "pending":
        return <Icon name="Clock" size={16} className="text-warning-500" />;
      case "error":
        return <Icon name="AlertCircle" size={16} className="text-error-500" />;
      default:
        return <Icon name="Circle" size={16} className="text-neutral-300" />;
    }
  };

  // Render parameters for the active step
  const renderParameters = () => {
    switch (activeStep) {
      case "environmental":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputWithUnit
              label="Mud Weight"
              value={parameters.environmental.mudWeight}
              onChange={(e) => handleParameterChange("environmental", "mudWeight", parseFloat(e.target.value))}
              unit="ppg"
              type="number"
              step="0.1"
            />
            <InputWithUnit
              label="Mud Resistivity"
              value={parameters.environmental.mudResistivity}
              onChange={(e) => handleParameterChange("environmental", "mudResistivity", parseFloat(e.target.value))}
              unit="ohm-m"
              type="number"
              step="0.01"
            />
            <InputWithUnit
              label="Mud Filtrate Salinity"
              value={parameters.environmental.mudFiltrateSalinity}
              onChange={(e) => handleParameterChange("environmental", "mudFiltrateSalinity", parseFloat(e.target.value))}
              unit="ppm"
              type="number"
              step="1000"
            />
            <InputWithUnit
              label="Formation Temperature"
              value={parameters.environmental.formationTemperature}
              onChange={(e) => handleParameterChange("environmental", "formationTemperature", parseFloat(e.target.value))}
              unit="°C"
              type="number"
              step="1"
            />
            <InputWithUnit
              label="Bit Size"
              value={parameters.environmental.bitSize}
              onChange={(e) => handleParameterChange("environmental", "bitSize", parseFloat(e.target.value))}
              unit="in"
              type="number"
              step="0.125"
            />
          </div>
        );
      case "shaleVolume":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputWithUnit
              label="GR Clean (Sandstone)"
              value={parameters.shaleVolume.grSandstone}
              onChange={(e) => handleParameterChange("shaleVolume", "grSandstone", parseFloat(e.target.value))}
              unit="API"
              type="number"
              step="1"
            />
            <InputWithUnit
              label="GR Shale"
              value={parameters.shaleVolume.grShale}
              onChange={(e) => handleParameterChange("shaleVolume", "grShale", parseFloat(e.target.value))}
              unit="API"
              type="number"
              step="1"
            />
            <Dropdown
              label="Non-Linear Correction"
              options={[
                { value: "linear", label: "Linear (No Correction)" },
                { value: "tertiary", label: "Larionov (Tertiary Rocks)" },
                { value: "older", label: "Larionov (Older Rocks)" },
                { value: "clavier", label: "Clavier" }
              ]}
              value={{ value: parameters.shaleVolume.larionov, label: parameters.shaleVolume.larionov === "tertiary" ? "Larionov (Tertiary Rocks)" : "Larionov (Older Rocks)" }}
              onChange={(selected) => handleParameterChange("shaleVolume", "larionov", selected.value)}
            />
          </div>
        );
      case "porosity":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputWithUnit
              label="Matrix Density"
              value={parameters.porosity.matrixDensity}
              onChange={(e) => handleParameterChange("porosity", "matrixDensity", parseFloat(e.target.value))}
              unit="g/cc"
              type="number"
              step="0.01"
            />
            <InputWithUnit
              label="Fluid Density"
              value={parameters.porosity.fluidDensity}
              onChange={(e) => handleParameterChange("porosity", "fluidDensity", parseFloat(e.target.value))}
              unit="g/cc"
              type="number"
              step="0.01"
            />
            <InputWithUnit
              label="Neutron Matrix Response"
              value={parameters.porosity.neutronMatrixResponse}
              onChange={(e) => handleParameterChange("porosity", "neutronMatrixResponse", parseFloat(e.target.value))}
              unit="v/v"
              type="number"
              step="0.01"
            />
            <InputWithUnit
              label="Neutron Fluid Response"
              value={parameters.porosity.neutronFluidResponse}
              onChange={(e) => handleParameterChange("porosity", "neutronFluidResponse", parseFloat(e.target.value))}
              unit="v/v"
              type="number"
              step="0.01"
            />
          </div>
        );
      case "saturation":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Tortuosity Factor (a)"
              value={parameters.saturation.a}
              onChange={(e) => handleParameterChange("saturation", "a", parseFloat(e.target.value))}
              type="number"
              step="0.1"
            />
            <Input
              label="Cementation Exponent (m)"
              value={parameters.saturation.m}
              onChange={(e) => handleParameterChange("saturation", "m", parseFloat(e.target.value))}
              type="number"
              step="0.1"
            />
            <Input
              label="Saturation Exponent (n)"
              value={parameters.saturation.n}
              onChange={(e) => handleParameterChange("saturation", "n", parseFloat(e.target.value))}
              type="number"
              step="0.1"
            />
            <InputWithUnit
              label="Formation Water Resistivity (Rw)"
              value={parameters.saturation.rw}
              onChange={(e) => handleParameterChange("saturation", "rw", parseFloat(e.target.value))}
              unit="ohm-m"
              type="number"
              step="0.01"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Workflow Steps */}
      <div className="flex flex-wrap gap-2 mb-6">
        {workflowSteps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <button
              className={`flex items-center px-4 py-2 rounded-md ${
                activeStep === step.id
                  ? "bg-primary-50 text-primary-700 border border-primary-200" :"bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50"
              }`}
              onClick={() => setActiveStep(step.id)}
            >
              <div className="flex items-center justify-center w-5 h-5 mr-2">
                {getStatusIcon(calculationStatus[step.id])}
              </div>
              <span className="mr-1">{index + 1}.</span>
              <span>{step.name}</span>
            </button>
            {index < workflowSteps.length - 1 && (
              <div className="mx-1 text-neutral-400">
                <Icon name="ChevronRight" size={16} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Active Step Content */}
      <div className="bg-white border border-neutral-200 rounded-md p-4 mb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <h3 className="text-lg font-medium">
            {workflowSteps.find(step => step.id === activeStep)?.name}
          </h3>
          
          <div className="flex items-center space-x-2 mt-2 md:mt-0">
            <Dropdown
              label="Method"
              options={methods[activeStep]}
              value={methods[activeStep].find(method => method.value === selectedMethod[activeStep])}
              onChange={(selected) => handleMethodChange(activeStep, selected)}
            />
            <Button
              variant="primary"
              icon={calculationStatus[activeStep] === "running" ? undefined : "Play"}
              loading={calculationStatus[activeStep] === "running"}
              onClick={() => runCalculation(activeStep)}
            >
              Run Calculation
            </Button>
          </div>
        </div>
        
        {/* Parameters */}
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-3">Parameters</h4>
          {renderParameters()}
        </div>
        
        {/* Quality Control */}
        <div className="mt-6">
          <h4 className="text-sm font-medium mb-3">Quality Control</h4>
          <div className="bg-neutral-50 p-4 rounded-md">
            {calculationStatus[activeStep] === "complete" ? (
              <div>
                <div className="flex items-center mb-2">
                  <Icon name="CheckCircle" size={16} className="text-success-500 mr-2" />
                  <span className="text-sm font-medium">Calculation completed successfully</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-white p-3 rounded-md border border-neutral-200">
                    <div className="text-xs text-neutral-500 mb-1">Average Value</div>
                    <div className="text-lg font-medium">
                      {activeStep === "shaleVolume" ? "0.28 v/v" : 
                       activeStep === "porosity" ? "0.18 v/v" : 
                       activeStep === "saturation" ? "0.35 v/v" : "N/A"}
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-md border border-neutral-200">
                    <div className="text-xs text-neutral-500 mb-1">Range</div>
                    <div className="text-lg font-medium">
                      {activeStep === "shaleVolume" ? "0.05 - 0.65 v/v" : 
                       activeStep === "porosity" ? "0.08 - 0.25 v/v" : 
                       activeStep === "saturation" ? "0.15 - 0.85 v/v" : "N/A"}
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-md border border-neutral-200">
                    <div className="text-xs text-neutral-500 mb-1">Quality Index</div>
                    <div className="text-lg font-medium text-success-500">Good</div>
                  </div>
                </div>
                
                {/* Visualization placeholder */}
                <div className="mt-4 h-48 bg-white border border-neutral-200 rounded-md p-2">
                  <div className="h-full w-full flex items-center justify-center text-neutral-400">
                    <div className="text-center">
                      <Icon name="BarChart" size={32} className="mx-auto mb-2" />
                      <span className="text-sm">Histogram visualization would appear here</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : calculationStatus[activeStep] === "running" ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
                <p className="text-neutral-600">Running calculation...</p>
              </div>
            ) : calculationStatus[activeStep] === "pending" ? (
              <div className="flex items-center justify-center py-8">
                <Icon name="Clock" size={24} className="text-warning-500 mr-2" />
                <p className="text-neutral-600">Ready to calculate. Click "Run Calculation" to proceed.</p>
              </div>
            ) : (
              <div className="flex items-center justify-center py-8">
                <Icon name="Circle" size={24} className="text-neutral-300 mr-2" />
                <p className="text-neutral-600">Complete previous steps first.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetrophysicalWorkflow;