"use client"
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const Loader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate page load time
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-[#050505]">
      {/* Your Branding GIF */}
      <Image  width={150} height={150}
        src="/designing-work.gif" 
        alt="Loading Design" 
        className="w-48 h-48 object-contain"
      />
      
      {/* Optional Brand Text */}
      <p className="mt-4 text-[#0ff] text-[10px] tracking-[0.5em] uppercase animate-pulse">
        Saeid Emon | Design Studio
      </p>
    </div>
  );
};

export default Loader;