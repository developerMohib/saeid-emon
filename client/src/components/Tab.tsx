"use client";

import { useState, useEffect } from "react";
import Works from "./Works";
import Services from "./Services";
import { TabConfig, TabsProps } from "@/types/tabsInfoTypes";
import Aboutme from "./homepagesection/Aboutme";

const Tabs = ({ tabsConfig, defaultTab = 1 }: TabsProps) => {
  const [openTab, setOpenTab] = useState<number>(defaultTab);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Configure default tabs
  const defaultTabs: TabConfig[] = [
    ...(isMobile
      ? [
          {
            id: 1,
            label: "Info",
            component: <Aboutme />,
          },
        ]
      : []),
    { id: isMobile ? 2 : 1, label: "Work", component: <Works /> },
    { id: isMobile ? 3 : 2, label: "Services", component: <Services /> },
  ];

  const tabs = tabsConfig || defaultTabs;

  const visibleTabs = tabs.filter(
    (tab) => tab.condition === undefined || tab.condition
  );

  // Reset active tab on mobile/desktop switch
  useEffect(() => {
    setOpenTab(isMobile ? 1 : 1);
  }, [isMobile]);

  // CSS classes
  const activeClasses =
    "border-b-2 border-seBlack inline-block py-2 px-4 font-semibold";
  const inactiveClasses =
    "hover:text-seRed inline-block py-2 px-4 font-semibold";

  return (
    <section aria-label="Tabs Component" className="py-6">
      {/* Tabs Navigation */}
      <nav>
        <ul className="flex border-b border-seGray/60 overflow-x-auto">
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
      </nav>

      {/* Tabs Content */}
      <div className="w-full mt-4">
        {tabs.find(
          (tab) => tab.id === openTab && (tab.condition === undefined || tab.condition)
        )?.component}
      </div>
    </section>
  );
};

export default Tabs;
