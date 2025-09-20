"use client"
import { useState } from "react";
import Works from "./Works";

const Tabs = () => {
  const [openTab, setOpenTab] = useState<number>(1);

  const activeClasses =
    "border-b-2 inline-block py-2 px-4 font-semibold";
  const inactiveClasses =
    "hover:text-blue-700 inline-block py-2 px-4 font-semibold";

  return (
    <div className="py-6">
      <ul className="flex border-b">
        <li className="-mb-px mr-1">
          <button
            onClick={() => setOpenTab(1)}
            className={openTab === 1 ? activeClasses : inactiveClasses}
          >
            work
          </button>
        </li>
        <li className="mr-1">
          <button
            onClick={() => setOpenTab(2)}
            className={openTab === 2 ? activeClasses : inactiveClasses}
          >
            services
          </button>
        </li>
        <li className="mr-1">
          <button
            onClick={() => setOpenTab(3)}
            className={openTab === 3 ? activeClasses : inactiveClasses}
          >
            if admin (show)
          </button>
        </li>
      </ul>

      <div className="w-full mt-4">
        {openTab === 1 && <div> <Works /> </div>}
        {openTab === 2 && <div>Tab #2</div>}
        {openTab === 3 && <div>Tab #3</div>}
      </div>
    </div>
  );
};

export default Tabs;
