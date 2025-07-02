import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ProductionAllocation = ({ isLoading }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock allocation data
  const allocationData = [
    { zone: "Upper Sand", oil: 250, gas: 950, water: 320, contribution: 38.5 },
    { zone: "Middle Sand", oil: 300, gas: 1100, water: 250, contribution: 46.2 },
    { zone: "Lower Sand", oil: 100, gas: 350, water: 150, contribution: 15.3 },
  ];

  // Toggle expanded view
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-medium text-neutral-900">Production Allocation</h3>
        </div>
        <div className="h-40 bg-neutral-200 rounded"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-medium text-neutral-900">Production Allocation</h3>
        <button
          onClick={toggleExpanded}
          className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
        >
          {isExpanded ? (
            <>
              <span>Collapse</span>
              <Icon name="ChevronUp" size={16} className="ml-1" />
            </>
          ) : (
            <>
              <span>Expand</span>
              <Icon name="ChevronDown" size={16} className="ml-1" />
            </>
          )}
        </button>
      </div>

      <div className="bg-white border border-neutral-200 rounded-md overflow-hidden">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Zone
              </th>
              <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Oil (bbl/d)
              </th>
              <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Contrib.
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {allocationData.map((zone, index) => (
              <tr key={index}>
                <td className="px-3 py-2 whitespace-nowrap text-xs text-neutral-900">
                  {zone.zone}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-xs text-right text-neutral-900">
                  {zone.oil}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-xs text-right text-neutral-900">
                  {zone.contribution}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isExpanded && (
        <div className="mt-4">
          <div className="bg-white border border-neutral-200 rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Zone
                  </th>
                  <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Oil (bbl/d)
                  </th>
                  <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Gas (mcf/d)
                  </th>
                  <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Water (bbl/d)
                  </th>
                  <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Contribution
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {allocationData.map((zone, index) => (
                  <tr key={index}>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-neutral-900">
                      {zone.zone}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-right text-neutral-900">
                      {zone.oil}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-right text-neutral-900">
                      {zone.gas}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-right text-neutral-900">
                      {zone.water}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-right text-neutral-900">
                      {zone.contribution}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 flex justify-between items-center">
            <div className="text-xs text-neutral-500">
              Last updated: 2023-12-15
            </div>
            <Button
              variant="tertiary"
              size="sm"
              icon="Edit2"
            >
              Edit Allocation
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductionAllocation;