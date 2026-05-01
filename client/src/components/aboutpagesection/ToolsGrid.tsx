"use client";
import { motion } from "framer-motion";
import { FiCpu } from "react-icons/fi";
import {  SiFigma, SiBlender } from "react-icons/si";
import { TbBrandAdobeIllustrator, TbBrandAdobePhotoshop } from "react-icons/tb";

const tools = [
  // Swapped hardcoded hover colors for your theme-aware seRed and seBlue
  { icon: <TbBrandAdobeIllustrator />, name: "Illustrator", level: "98%", color: "group-hover:text-seRed" },
  { icon: <TbBrandAdobePhotoshop />, name: "Photoshop", level: "90%", color: "group-hover:text-seBlue" },
  { icon: <SiFigma />, name: "Figma", level: "85%", color: "group-hover:text-accent" },
  { icon: <SiBlender />, name: "Blender", level: "70%", color: "group-hover:text-seRed" },
];

export default function ToolsGrid() {
  return (
    <>
      {/* 1. Updated Header Color to use seRed instead of pink-500 */}
      <div className="flex items-center gap-3 mb-8 text-seRed">
        <FiCpu size={20} />
        <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold">Digital Arsenal</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
        {tools.map((tool) => (
          <div key={tool.name} className="group cursor-default">
            {/* 2. Updated Icon color to use seGray (maps to light/dark gray) */}
            <div className={`text-4xl text-seGray transition-all duration-500 ${tool.color} mb-3`}>
              {tool.icon}
            </div>

            {/* 3. Updated Name color to use seBlack (maps to dark blue/white) */}
            <p className="text-seBlack text-xs font-bold tracking-widest uppercase">
              {tool.name}
            </p>

            {/* 4. Updated Progress Bar Background (using foreground/10 for adaptive contrast) */}
            <div className="w-full h-0.5 bg-foreground/10 mt-4 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: tool.level }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "circOut" }}
                // 5. Updated gradient to use your accent and seRed variables
                className="h-full bg-linear-to-r from-accent to-seRed"
              />
            </div>

            {/* 6. Updated Level Percentage text color */}
            <p className="text-[10px] text-seGray mt-2 font-medium">{tool.level}</p>
          </div>
        ))}
      </div>
    </>
  );
}