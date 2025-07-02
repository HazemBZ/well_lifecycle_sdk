import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Dropdown from "../../../components/ui/Dropdown";

const DailyDrillingReport = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("operations");
  
  // Mock dates for reports
  const reportDates = [
    { value: "2023-06-15", label: "June 15, 2023" },
    { value: "2023-06-14", label: "June 14, 2023" },
    { value: "2023-06-13", label: "June 13, 2023" },
    { value: "2023-06-12", label: "June 12, 2023" },
    { value: "2023-06-11", label: "June 11, 2023" },
  ];
  
  // Mock report data
  const reportData = {
    operations: [
      { time: "00:00", depth: "1245.5", activity: "Drilling ahead", details: "Formation: Sandstone, ROP: 15.2 m/hr" },
      { time: "04:30", depth: "1267.8", activity: "Circulation", details: "Cleaning hole, preparing for survey" },
      { time: "06:15", depth: "1267.8", activity: "Survey", details: "Inc: 2.1°, Azi: 178.3°" },
      { time: "07:00", depth: "1267.8", activity: "Drilling ahead", details: "Formation: Sandstone with shale streaks" },
      { time: "12:30", depth: "1289.4", activity: "Connection", details: "Add stand" },
      { time: "13:00", depth: "1289.4", activity: "Drilling ahead", details: "Formation: Shale, ROP: 12.8 m/hr" },
      { time: "18:45", depth: "1312.2", activity: "Wiper trip", details: "Trip to casing shoe and back" },
      { time: "22:30", depth: "1312.2", activity: "Drilling ahead", details: "Formation: Shale with limestone stringers" },
    ],
    mudProperties: {
      density: "1.25 g/cm³",
      viscosity: "45 sec/qt",
      pv: "18 cP",
      yp: "22 lb/100ft²",
      gelStrength: "6/12 lb/100ft²",
      ph: "9.8",
      solids: "8.5%",
      sandContent: "0.2%",
      waterLoss: "5.8 ml/30min",
      oilWaterRatio: "80/20",
    },
    comments: `Encountered higher than expected pressure at 1278m. Adjusted mud weight from 1.22 to 1.25 g/cm³.
    
BHA performing well, no vibration issues observed.
    
Weather conditions: Clear, temperature 28°C, no operational delays due to weather.`,
  };
  
  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  // Toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };
  
  // Render operations tab
  const renderOperationsTab = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-neutral-200">
        <thead className="bg-neutral-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Time
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Depth (m)
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Activity
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Details
            </th>
            {editMode && (
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-neutral-200">
          {reportData.operations.map((operation, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-neutral-50"}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                {editMode ? (
                  <input
                    type="text"
                    className="block w-full border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    defaultValue={operation.time}
                  />
                ) : (
                  operation.time
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                {editMode ? (
                  <input
                    type="text"
                    className="block w-full border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    defaultValue={operation.depth}
                  />
                ) : (
                  operation.depth
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                {editMode ? (
                  <input
                    type="text"
                    className="block w-full border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    defaultValue={operation.activity}
                  />
                ) : (
                  operation.activity
                )}
              </td>
              <td className="px-6 py-4 text-sm text-neutral-900">
                {editMode ? (
                  <input
                    type="text"
                    className="block w-full border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    defaultValue={operation.details}
                  />
                ) : (
                  operation.details
                )}
              </td>
              {editMode && (
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-error-600 hover:text-error-900 mr-3">
                    <Icon name="Trash2" size={16} />
                  </button>
                </td>
              )}
            </tr>
          ))}
          {editMode && (
            <tr>
              <td colSpan={5} className="px-6 py-4">
                <Button
                  variant="secondary"
                  size="sm"
                  icon="Plus"
                  iconPosition="left"
                  className="w-full"
                >
                  Add Operation
                </Button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
  
  // Render mud properties tab
  const renderMudPropertiesTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {Object.entries(reportData.mudProperties).map(([key, value], index) => (
        <div key={index} className="bg-neutral-50 p-4 rounded-md">
          <h4 className="text-sm font-medium text-neutral-500 uppercase mb-1">
            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
          </h4>
          {editMode ? (
            <input
              type="text"
              className="block w-full border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              defaultValue={value}
            />
          ) : (
            <p className="text-lg font-medium text-neutral-900">{value}</p>
          )}
        </div>
      ))}
    </div>
  );
  
  // Render comments tab
  const renderCommentsTab = () => (
    <div className="p-4">
      {editMode ? (
        <textarea
          className="block w-full h-48 border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          defaultValue={reportData.comments}
        />
      ) : (
        <div className="bg-neutral-50 p-4 rounded-md whitespace-pre-line">
          <p className="text-neutral-900">{reportData.comments}</p>
        </div>
      )}
    </div>
  );
  
  return (
    <div className="bg-white rounded-lg border border-neutral-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-neutral-200 flex flex-wrap items-center justify-between">
        <h2 className="text-lg font-medium text-neutral-900">Daily Drilling Report</h2>
        <div className="flex items-center space-x-2">
          <div className="w-48">
            <Dropdown
              options={reportDates}
              value={selectedDate || reportDates[0]}
              onChange={setSelectedDate}
              placeholder="Select Date"
              icon="Calendar"
            />
          </div>
          <Button
            variant={editMode ? "primary" : "secondary"}
            icon={editMode ? "Save" : "Edit2"}
            onClick={toggleEditMode}
          >
            {editMode ? "Save" : "Edit"}
          </Button>
        </div>
      </div>
      
      <div className="border-b border-neutral-200">
        <nav className="-mb-px flex">
          <button
            className={`py-3 px-4 text-sm font-medium ${
              activeTab === "operations" ?"border-b-2 border-primary-500 text-primary-600" :"text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
            }`}
            onClick={() => handleTabChange("operations")}
          >
            Operations
          </button>
          <button
            className={`py-3 px-4 text-sm font-medium ${
              activeTab === "mudProperties" ?"border-b-2 border-primary-500 text-primary-600" :"text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
            }`}
            onClick={() => handleTabChange("mudProperties")}
          >
            Mud Properties
          </button>
          <button
            className={`py-3 px-4 text-sm font-medium ${
              activeTab === "comments" ?"border-b-2 border-primary-500 text-primary-600" :"text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
            }`}
            onClick={() => handleTabChange("comments")}
          >
            Comments
          </button>
        </nav>
      </div>
      
      <div>
        {activeTab === "operations" && renderOperationsTab()}
        {activeTab === "mudProperties" && renderMudPropertiesTab()}
        {activeTab === "comments" && renderCommentsTab()}
      </div>
    </div>
  );
};

export default DailyDrillingReport;