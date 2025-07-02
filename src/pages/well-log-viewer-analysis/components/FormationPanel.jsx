import React from "react";
import Icon from "../../../components/AppIcon";

const FormationPanel = ({ formations, depthRange }) => {
  // Sort formations by top depth
  const sortedFormations = [...formations].sort((a, b) => a.topDepth - b.topDepth);
  
  // Filter formations that are visible in the current depth range
  const visibleFormations = sortedFormations.filter(
    formation => formation.bottomDepth >= depthRange.start && formation.topDepth <= depthRange.end
  );

  return (
    <div>
      {visibleFormations.length === 0 ? (
        <div className="text-sm text-neutral-500 text-center py-4">
          No formations in the current depth range.
        </div>
      ) : (
        <div className="space-y-3">
          {visibleFormations.map((formation) => (
            <div
              key={formation.id}
              className="p-3 bg-white rounded-md border border-neutral-200"
            >
              <div className="flex items-center">
                <div
                  className="w-4 h-4 rounded-sm mr-2 flex-shrink-0"
                  style={{ backgroundColor: formation.color }}
                ></div>
                <div className="flex-1">
                  <h5 className="text-sm font-medium">{formation.name}</h5>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                <div className="flex flex-col">
                  <span className="text-neutral-500">Top</span>
                  <span className="font-medium">{formation.topDepth} ft</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-neutral-500">Bottom</span>
                  <span className="font-medium">{formation.bottomDepth} ft</span>
                </div>
                <div className="flex flex-col col-span-2">
                  <span className="text-neutral-500">Thickness</span>
                  <span className="font-medium">{formation.bottomDepth - formation.topDepth} ft</span>
                </div>
              </div>
              <div className="mt-2 flex justify-end space-x-2">
                <button
                  className="p-1 text-neutral-500 hover:text-primary-600 rounded-md hover:bg-neutral-100"
                  title="Edit formation"
                >
                  <Icon name="Edit2" size={14} />
                </button>
                <button
                  className="p-1 text-neutral-500 hover:text-primary-600 rounded-md hover:bg-neutral-100"
                  title="Add annotation"
                >
                  <Icon name="MessageSquare" size={14} />
                </button>
                <button
                  className="p-1 text-neutral-500 hover:text-primary-600 rounded-md hover:bg-neutral-100"
                  title="Jump to formation"
                >
                  <Icon name="ArrowRight" size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-6">
        <h4 className="text-sm font-medium text-neutral-900 mb-3">Lithology Legend</h4>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-200 border border-yellow-400 rounded-sm mr-2"></div>
            <span className="text-xs">Sandstone</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-500 border border-gray-600 rounded-sm mr-2"></div>
            <span className="text-xs">Shale</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-200 border border-blue-400 rounded-sm mr-2"></div>
            <span className="text-xs">Limestone</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-300 border border-gray-400 rounded-sm mr-2"></div>
            <span className="text-xs">Dolomite</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-200 border border-red-400 rounded-sm mr-2"></div>
            <span className="text-xs">Anhydrite</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-200 border border-green-400 rounded-sm mr-2"></div>
            <span className="text-xs">Salt</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormationPanel;