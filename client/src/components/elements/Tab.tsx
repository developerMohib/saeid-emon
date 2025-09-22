"use client";
import { useState, useEffect } from "react";
import Works from "./Works";
import Services from "./Services";
import { TabConfig, TabsProps } from "@/types/tabsInfoTypes";

const Tabs = ({ tabsConfig, defaultTab = 1 }: TabsProps) => {
  const [openTab, setOpenTab] = useState<number>(defaultTab);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Tabs setup
  let defaultTabs: TabConfig[] = [];

  if (isMobile) {
    defaultTabs.push({
      id: 1,
      label: "Info",
      component: <div>Mobile Info Content</div>,
    });
  }

  defaultTabs = [
    ...defaultTabs,
    { id: isMobile ? 2 : 1, label: "Work", component: <Works /> },
    { id: isMobile ? 3 : 2, label: "Services", component: <Services /> },
    {
      id: isMobile ? 4 : 3,
      label: "Admin panel",
      component: <div>Admin Content</div>,
      condition: true,
    },
  ];

  const tabs = tabsConfig || defaultTabs;
  const visibleTabs = tabs.filter(
    (tab) => tab.condition === undefined || tab.condition
  );

  // Default active tab: Info (id 1) if mobile, otherwise Work (id 1 on desktop)
  useEffect(() => {
    setOpenTab(isMobile ? 1 : 1);
  }, [isMobile]);

  const activeClasses =
    "border-b-2 border-seBlack inline-block py-2 px-4 font-semibold";
  const inactiveClasses =
    "hover:text-seRed inline-block py-2 px-4 font-semibold";

  return (
    <div className="py-6">
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

      <div className="w-full mt-4">
        {tabs.find(
          (tab) =>
            tab.id === openTab &&
            (tab.condition === undefined || tab.condition)
        )?.component}
      </div>
    </div>
  );
};

export default Tabs;
