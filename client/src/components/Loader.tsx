"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Duration for the preloader (3 seconds)
    const timer = setTimeout(() => setIsVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
          }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#050505]"
        >
          {/* Logo Construction Container */}
          <div className="relative group">
            {/* Background Ambient Glow - Makes the dark logo visible */}
            <div 
               className="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-full animate-pulse" 
               aria-hidden="true" 
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative z-10"
            >
              <div className="relative w-32 h-32 md:w-44 md:h-44">
                {/* 1. The "Blueprint" Layer (Static Background) */}
                {/* We use filter: brightness to make the white logo visible as a ghost */}
                <Image
                  src="/favicon.png" 
                  alt="Saeid Emon Logo Blueprint"
                  fill
                  className="object-contain opacity-10 brightness-200"
                />
                
                {/* 2. The "Construction" Layer (Animated Fill) */}
                <motion.div
                  className="absolute inset-0 overflow-hidden"
                  initial={{ height: "0%" }}
                  animate={{ height: "100%" }}
                  transition={{ duration: 2.2, ease: "easeInOut", delay: 0.5 }}
                >
                  <Image
                    src="/favicon.png"
                    alt="Saeid Emon Logo Full"
                    fill
                    className="object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                  />
                </motion.div>

                {/* 3. The Scanning Line (Laser Cut Effect) */}
                <motion.div 
                  initial={{ top: "0%" }}
                  animate={{ top: "100%" }}
                  transition={{ duration: 2.2, ease: "easeInOut", delay: 0.5 }}
                  className="absolute left-[-10%] right-[-10%] h-px bg-blue-400 shadow-[0_0_10px_#60a5fa] z-20"
                />
              </div>
            </motion.div>
          </div>

          {/* Typography Section */}
          <div className="mt-10 text-center space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white font-bold text-xs md:text-sm uppercase tracking-[0.6em]"
            >
              Saeid Emon
            </motion.h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 1 }}
              className="h-px bg-linear-to-r from-transparent via-purple-500/50 to-transparent w-full mx-auto"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="text-blue-400 font-mono text-[8px] uppercase tracking-widest"
            >
              Visual Architect & Designer
            </motion.p>
          </div>

          {/* Loading Percentage Simulation (Optional Visual) */}
          <div className="absolute bottom-12 overflow-hidden">
             <motion.span 
               initial={{ opacity: 0 }}
               animate={{ opacity: [0, 1, 0] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="text-[9px] font-mono text-white/20 tracking-tighter"
             >
               INITIALIZING_SYSTEM_CORE...
             </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;