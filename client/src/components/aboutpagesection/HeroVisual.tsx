"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const HeroVisual = () => {
  return (
    <motion.figure
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex justify-center lg:justify-end"
    >
      <div className="relative w-[300px] h-[300px] md:w-[420px] md:h-[420px]">
        
        {/* Outer Architectural Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-dashed border-seRed/30"
        />

        {/* Inner Pulsing Ring */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-6 rounded-full border border-purple-500/40"
        />

        {/* The Avatar Container */}
        <div className="absolute inset-10 rounded-full overflow-hidden border-2 border-white/10 group">
          <Image
            src="https://images.pexels.com/photos/36211200/pexels-photo-36211200.jpeg"
            alt="Saeid Emon - Portrait"
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-110 group-hover:scale-100"
            priority
          />
          
          {/* Subtle Overlay on Hover */}
          <div className="absolute inset-0 bg-seRed/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Technical Coordinate Dots */}
        {[0, 90, 180, 270].map((degree) => (
          <div
            key={degree}
            className="absolute w-1.5 h-1.5 bg-white rounded-full"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${degree}deg) translate(150px, -50%)`, // Adjust 150px based on circle size
            }}
          />
        ))}
      </div>
    </motion.figure>
  );
};

export default HeroVisual;