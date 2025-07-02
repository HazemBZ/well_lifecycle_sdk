import React from "react";
import Dropdown from "../../../components/ui/Dropdown";


const CalculationSettings = ({ 
  calculationMethod, 
  calculationMethods, 
  onCalculationMethodChange 
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-neutral-900 mb-4">Calculation Method</h3>
          
          <div className="space-y-4">
            <div>
              <Dropdown
                label="Interpolation Method"
                options={calculationMethods}
                value={calculationMethods.find(method => method.value === calculationMethod)}
                onChange={(method) => onCalculationMethodChange(method.value)}
              />
              
              <div className="mt-2 text-sm text-neutral-600">
                {calculationMethod === "minimumCurvature" && (
                  <p>Minimum curvature assumes the wellbore follows a circular arc between survey points. This is the industry standard method.</p>
                )}
                {calculationMethod === "radiusOfCurvature" && (
                  <p>Radius of curvature assumes a constant curvature between survey points, similar to minimum curvature but with a different mathematical approach.</p>
                )}
                {calculationMethod === "tangential" && (
                  <p>Tangential method assumes a straight line from one survey point to the next at the inclination and azimuth of the first point.</p>
                )}
                {calculationMethod === "balanced" && (
                  <p>Balanced tangential method averages the inclination and azimuth at the start and end of each survey interval.</p>
                )}
                {calculationMethod === "averageAngle" && (
                  <p>Average angle method uses the average of the inclination and azimuth at the start and end of each survey interval.</p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Calculation Units
              </label>
              <div className="mt-1 space-y-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="units"
                    value="imperial"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300"
                    defaultChecked
                  />
                  <span className="ml-2 text-sm text-neutral-700">Imperial (ft)</span>
                </label>
                <div className="block">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="units"
                      value="metric"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300"
                    />
                    <span className="ml-2 text-sm text-neutral-700">Metric (m)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-neutral-900 mb-4">Uncertainty Model</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Uncertainty Model
              </label>
              <select
                className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                defaultValue="standard"
              >
                <option value="standard">Standard (ISCWSA)</option>
                <option value="advanced">Advanced (ISCWSA MWD Rev5)</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Confidence Level
              </label>
              <select
                className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                defaultValue="95"
              >
                <option value="68">68% (1σ)</option>
                <option value="95">95% (2σ)</option>
                <option value="99">99% (3σ)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Tool Error Model
              </label>
              <select
                className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                defaultValue="gyro"
              >
                <option value="gyro">Gyroscopic</option>
                <option value="magnetic">Magnetic MWD</option>
                <option value="accelerometer">Accelerometer</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-neutral-200 pt-6">
        <h3 className="text-lg font-medium text-neutral-900 mb-4">Advanced Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Vertical Section Azimuth
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm pr-12"
                    placeholder="0.0"
                    defaultValue="0.0"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-neutral-500 sm:text-sm">degrees</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  North Reference
                </label>
                <select
                  className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  defaultValue="true"
                >
                  <option value="true">True North</option>
                  <option value="grid">Grid North</option>
                  <option value="magnetic">Magnetic North</option>
                </select>
              </div>
            </div>
          </div>
          
          <div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Magnetic Declination
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm pr-12"
                    placeholder="0.0"
                    defaultValue="1.5"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-neutral-500 sm:text-sm">degrees</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Convergence
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm pr-12"
                    placeholder="0.0"
                    defaultValue="0.8"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-neutral-500 sm:text-sm">degrees</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-neutral-300 shadow-sm text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Reset to Defaults
        </button>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Apply Settings
        </button>
      </div>
    </div>
  );
};

export default CalculationSettings;