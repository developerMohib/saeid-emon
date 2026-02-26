"use client"
import React from "react";
import { motion } from "framer-motion";

export default function Preloader() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] overflow-hidden">
            <div className="relative flex items-center justify-center">

                {/* 1. The "Blueprint" Grid Background (Subtle Designer Vibe) */}
                <div className="absolute inset-0 w-[500px] h-[500px] opacity-10"
                    style={{ backgroundImage: 'linear-gradient(#0ff 1px, transparent 1px), linear-gradient(90deg, #0ff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                {/* 2. Animated Drawing Circle (SVG for high-end feel) */}
                <svg width="200" height="200" className="absolute">
                    <motion.circle
                        cx="100"
                        cy="100"
                        r="80"
                        stroke="#0ff"
                        strokeWidth="1"
                        fill="transparent"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.5 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                </svg>

                {/* 3. The Central Brand Mark */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 flex flex-col items-center"
                >
                    <div className="text-6xl font-extrabold tracking-tighter text-white">
                        S<span className="text-[#0ff] relative">E
                            {/* Pen Tool Nib Icon Mockup */}
                            <motion.div
                                animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 3 }}
                                className="absolute -top-2 -right-4 w-3 h-3 bg-[#0ff] rotate-45"
                            />
                        </span>
                    </div>

                    {/* Progress Bar (Minimalist) */}
                    <div className="w-24 h-px bg-gray-800 mt-4 overflow-hidden">
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            className="w-full h-full bg-linear-to-r from-transparent via-[#0ff] to-transparent"
                        />
                    </div>
                </motion.div>

                {/* 4. Ambient Glow */}
                <div className="absolute w-64 h-64 bg-[#0ff]/10 rounded-full blur-[100px] animate-pulse" />
            </div>

            {/* 5. Professional Typography Footer */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 text-center"
            >
                <h2 className="text-white text-xl font-medium tracking-[0.3em] uppercase">
                    Saeid Emon
                </h2>
                <div className="flex items-center justify-center gap-3 mt-2">
                    <span className="h-px w-4 bg-gray-600"></span>
                    <p className="text-gray-400 text-[10px] tracking-[0.4em] uppercase">
                        Visual Identity Specialist
                    </p>
                    <span className="h-px w-4 bg-gray-600"></span>
                </div>
            </motion.div>

            {/* Floating Status Text */}
            <div className="absolute bottom-8 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#0ff] rounded-full animate-ping" />
                <span className="text-gray-500 text-[9px] uppercase tracking-widest font-bold">
                    Crafting Experience...
                </span>
            </div>
        </div>
    );
}