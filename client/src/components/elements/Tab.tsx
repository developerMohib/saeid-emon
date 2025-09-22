"use client"
import { useState } from "react";
import Works from "./Works";
import Services from "./Services";

interface TabConfig {
  id: number;
  label: string;
  component: React.ReactNode;
  condition?: boolean;
}

interface TabsProps {
  tabsConfig?: TabConfig[]; // Optional custom config
  defaultTab?: number; // Optional default tab
}

const Tabs = ({ tabsConfig, defaultTab = 1 }: TabsProps) => {

  const [openTab, setOpenTab] = useState<number>(defaultTab);

  // Default tabs configuration
  const defaultTabs: TabConfig[] = [
    { id: 1, label: "work", component: <Works /> },
    { id: 2, label: "services", component: <Services /> },
    {
      id: 3,
      label: "admin panel",
      component: <div>Admin Content</div>,
      condition: true
    }
  ];

  const tabs = tabsConfig || defaultTabs;
  const visibleTabs = tabs.filter(tab => tab.condition === undefined || tab.condition);

  const activeClasses = "border-b-2 border-seBlack inline-block py-2 px-4 font-semibold";
  const inactiveClasses = "hover:text-seRed inline-block py-2 px-4 font-semibold";

  return (
    <div className="py-6">
      <ul className="flex border-b border-seGray/60">
        {visibleTabs.map((tab, index) => (
          <li key={tab.id} className={index === 0 ? "-mb-px mr-1" : "mr-1"}>
            <button
              onClick={() => setOpenTab(tab.id)}
              className={openTab === tab.id ? activeClasses : inactiveClasses}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="w-full mt-4">
        {tabs.find(tab => tab.id === openTab && (tab.condition === undefined || tab.condition))?.component}
      </div>
    </div>
  );
};

export default Tabs;