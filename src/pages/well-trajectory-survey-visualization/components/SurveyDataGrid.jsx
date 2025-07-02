import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const SurveyDataGrid = ({ selectedWell, calculationMethod }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  
  // Mock survey data
  const surveyData = [
    {
      id: 1,
      md: 0,
      inclination: 0,
      azimuth: 0,
      tvd: 0,
      northing: 0,
      easting: 0,
      verticalSection: 0,
      doglegSeverity: 0,
      date: "2023-06-15",
      quality: "Good"
    },
    {
      id: 2,
      md: 500,
      inclination: 5.2,
      azimuth: 145.3,
      tvd: 498.5,
      northing: -25.6,
      easting: 30.2,
      verticalSection: 39.7,
      doglegSeverity: 1.04,
      date: "2023-06-15",
      quality: "Good"
    },
    {
      id: 3,
      md: 1000,
      inclination: 12.8,
      azimuth: 148.7,
      tvd: 985.3,
      northing: -102.4,
      easting: 118.9,
      verticalSection: 156.8,
      doglegSeverity: 1.52,
      date: "2023-06-16",
      quality: "Good"
    },
    {
      id: 4,
      md: 1500,
      inclination: 22.5,
      azimuth: 150.2,
      tvd: 1450.8,
      northing: -228.6,
      easting: 258.4,
      verticalSection: 344.9,
      doglegSeverity: 1.94,
      date: "2023-06-16",
      quality: "Good"
    },
    {
      id: 5,
      md: 2000,
      inclination: 35.1,
      azimuth: 152.8,
      tvd: 1880.4,
      northing: -412.5,
      easting: 458.7,
      verticalSection: 616.2,
      doglegSeverity: 2.52,
      date: "2023-06-17",
      quality: "Questionable"
    },
    {
      id: 6,
      md: 2500,
      inclination: 45.3,
      azimuth: 155.4,
      tvd: 2258.6,
      northing: -652.8,
      easting: 712.3,
      verticalSection: 965.8,
      doglegSeverity: 2.04,
      date: "2023-06-17",
      quality: "Good"
    },
    {
      id: 7,
      md: 3000,
      inclination: 52.7,
      azimuth: 158.9,
      tvd: 2580.2,
      northing: -932.4,
      easting: 1012.6,
      verticalSection: 1375.4,
      doglegSeverity: 1.48,
      date: "2023-06-18",
      quality: "Good"
    },
    {
      id: 8,
      md: 3500,
      inclination: 60.2,
      azimuth: 162.3,
      tvd: 2845.7,
      northing: -1242.8,
      easting: 1345.9,
      verticalSection: 1830.6,
      doglegSeverity: 1.50,
      date: "2023-06-18",
      quality: "Good"
    },
    {
      id: 9,
      md: 4000,
      inclination: 65.8,
      azimuth: 165.7,
      tvd: 3065.3,
      northing: -1575.2,
      easting: 1702.4,
      verticalSection: 2315.8,
      doglegSeverity: 1.12,
      date: "2023-06-19",
      quality: "Good"
    },
    {
      id: 10,
      md: 4500,
      inclination: 68.4,
      azimuth: 168.2,
      tvd: 3252.6,
      northing: -1920.7,
      easting: 2075.3,
      verticalSection: 2820.4,
      doglegSeverity: 0.52,
      date: "2023-06-19",
      quality: "Good"
    }
  ];
  
  // Start editing a row
  const startEditing = (index) => {
    setEditingIndex(index);
  };
  
  // Cancel editing
  const cancelEditing = () => {
    setEditingIndex(null);
  };
  
  // Save edited row
  const saveEditing = () => {
    // In a real app, save the changes to the data
    setEditingIndex(null);
  };
  
  // Get quality indicator color
  const getQualityColor = (quality) => {
    switch (quality) {
      case "Good":
        return "text-success-500";
      case "Questionable":
        return "text-warning-500";
      case "Poor":
        return "text-error-500";
      default:
        return "text-neutral-500";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-neutral-200">
        <thead className="bg-neutral-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider sticky top-0 bg-neutral-50 z-10">
              MD (ft)
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider sticky top-0 bg-neutral-50 z-10">
              Inc (°)
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider sticky top-0 bg-neutral-50 z-10">
              Azi (°)
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider sticky top-0 bg-neutral-50 z-10">
              TVD (ft)
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider sticky top-0 bg-neutral-50 z-10">
              N/S (ft)
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider sticky top-0 bg-neutral-50 z-10">
              E/W (ft)
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider sticky top-0 bg-neutral-50 z-10">
              VS (ft)
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider sticky top-0 bg-neutral-50 z-10">
              DLS (°/100ft)
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider sticky top-0 bg-neutral-50 z-10">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider sticky top-0 bg-neutral-50 z-10">
              Quality
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider sticky top-0 bg-neutral-50 z-10">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-neutral-200">
          {surveyData.map((survey, index) => (
            <tr key={survey.id} className={index % 2 === 0 ? "bg-white" : "bg-neutral-50"}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                {editingIndex === index ? (
                  <input 
                    type="number" 
                    className="block w-24 rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" 
                    defaultValue={survey.md}
                  />
                ) : (
                  survey.md.toFixed(1)
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                {editingIndex === index ? (
                  <input 
                    type="number" 
                    step="0.1"
                    className="block w-24 rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" 
                    defaultValue={survey.inclination}
                  />
                ) : (
                  survey.inclination.toFixed(1)
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                {editingIndex === index ? (
                  <input 
                    type="number" 
                    step="0.1"
                    className="block w-24 rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" 
                    defaultValue={survey.azimuth}
                  />
                ) : (
                  survey.azimuth.toFixed(1)
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                {survey.tvd.toFixed(1)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                {survey.northing.toFixed(1)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                {survey.easting.toFixed(1)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                {survey.verticalSection.toFixed(1)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                {survey.doglegSeverity.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                {editingIndex === index ? (
                  <input 
                    type="date" 
                    className="block w-36 rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" 
                    defaultValue={survey.date}
                  />
                ) : (
                  survey.date
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {editingIndex === index ? (
                  <select 
                    className="block w-32 rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" 
                    defaultValue={survey.quality}
                  >
                    <option value="Good">Good</option>
                    <option value="Questionable">Questionable</option>
                    <option value="Poor">Poor</option>
                  </select>
                ) : (
                  <span className={`inline-flex items-center ${getQualityColor(survey.quality)}`}>
                    <Icon 
                      name={survey.quality === "Good" ? "CheckCircle" : survey.quality === "Questionable" ? "AlertTriangle" : "XCircle"} 
                      size={16} 
                      className="mr-1" 
                    />
                    {survey.quality}
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {editingIndex === index ? (
                  <div className="flex justify-end space-x-2">
                    <button
                      className="text-primary-600 hover:text-primary-900"
                      onClick={saveEditing}
                    >
                      <Icon name="Check" size={16} />
                    </button>
                    <button
                      className="text-neutral-600 hover:text-neutral-900"
                      onClick={cancelEditing}
                    >
                      <Icon name="X" size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    className="text-primary-600 hover:text-primary-900"
                    onClick={() => startEditing(index)}
                  >
                    <Icon name="Edit2" size={16} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SurveyDataGrid;