'use client';

import { useEffect, useState, useMemo } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
// Import the type definitions
import type { IOptions, RecursivePartial } from "@tsparticles/engine";

export default function ParticlesBg() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Explicitly type the useMemo
  const particlesOptions: RecursivePartial<IOptions> = useMemo(() => ({
    fullScreen: { enable: true, zIndex: -1 },
    background: {
      color: { value: "transparent" },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "bubble",
        },
      },
      modes: {
        bubble: {
          distance: 300,
          size: 6,
          duration: 2,
          opacity: 1,
        },
      },
    },
    particles: {
      color: {
        // Added your seRed color #F54927 to the mix!
        value: ["#a855f7", "#3b82f6", "#ffffff", "#F54927"],
      },
      move: {
        enable: true,
        direction: "none", // Now TypeScript knows this is the "none" MoveDirection
        outModes: { default: "out" },
        random: true,
        speed: 0.4,
        straight: false,
      },
      number: {
        density: { enable: true, area: 800 },
        value: 80,
      },
      opacity: {
        value: { min: 0.1, max: 0.5 },
        animation: {
          enable: true,
          speed: 1,
          sync: false,
        },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  }), []);

  if (init) {
    return (
      <Particles
        id="tsparticles"
        options={particlesOptions}
        className="absolute inset-0 pointer-events-none"
      />
    );
  }

  return null;
}