import React from "react";
import Icon from "../../../components/AppIcon";

const Tabs = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="border-b border-neutral-200">
      <nav className="flex overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`
              flex items-center px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap
              ${activeTab === tab.id
                ? "border-primary-600 text-primary-700" :"border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300"
              }
            `}
            onClick={() => onChange(tab.id)}
          >
            <Icon
              name={tab.icon}
              size={18}
              className={`mr-2 ${activeTab === tab.id ? "text-primary-600" : "text-neutral-500"}`}
            />
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Tabs;