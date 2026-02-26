"use client";
import { motion } from "framer-motion";
import { FiCpu } from "react-icons/fi";
import { SiAdobephotoshop, SiAdobeillustrator, SiFigma, SiBlender } from "react-icons/si";

const tools = [
  { icon: <SiAdobeillustrator />, name: "Illustrator", level: "98%", color: "group-hover:text-orange-500" },
  { icon: <SiAdobephotoshop />, name: "Photoshop", level: "90%", color: "group-hover:text-blue-500" },
  { icon: <SiFigma />, name: "Figma", level: "85%", color: "group-hover:text-purple-500" },
  { icon: <SiBlender />, name: "Blender", level: "70%", color: "group-hover:text-orange-400" },
];

export default function ToolsGrid() {
  return (
    <>
      <div className="flex items-center gap-3 mb-8 text-pink-500">
        <FiCpu size={20} />
        <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold">Digital Arsenal</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
        {tools.map((tool) => (
          <div key={tool.name} className="group cursor-default">
            <div className={`text-4xl text-gray-600 transition-all duration-500 ${tool.color} mb-3`}>
              {tool.icon}
            </div>
            <p className="text-white text-xs font-bold tracking-widest uppercase">{tool.name}</p>
            <div className="w-full h-0.5 bg-white/5 mt-4 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: tool.level }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="h-full bg-linear-to-r from-purple-500 to-seRed" 
              />
            </div>
            <p className="text-[10px] text-gray-300 mt-2">{tool.level}</p>
          </div>
        ))}
      </div>
    </>
  );
}