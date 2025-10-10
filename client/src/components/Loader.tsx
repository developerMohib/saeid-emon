

import React from "react";

const Loader = () => {
  return (

    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        <div className="relative w-32 h-32">
          {/* Outer Spinner */}
          <div
            className="absolute w-full h-full rounded-full border-[2px] border-gray-100/20 border-r-[#0ff]/50 border-b-[#0ff]/50 animate-spin"
            style={{ animationDuration: '3s' }}
          />
          {/* Inner Spinner */}
          <div
            className="absolute w-full h-full rounded-full border-[3px] border-gray-100/20 border-t-[#0ff]/50 animate-spin"
            style={{ animationDuration: '2s', animationDirection: 'reverse' }}
          />
        </div>
        {/* Soft Glow Background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0ff]/20 via-transparent to-[#0ff]/10 animate-pulse rounded-full blur-md" />
      </div>
    </div>


  );
};

export default Loader;
