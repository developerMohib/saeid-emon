'use client';

import { useEffect, useState, useMemo } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
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

  const particlesOptions: RecursivePartial<IOptions> = useMemo(() => ({
    // FIX: Set to false, we will handle positioning via CSS class
    fullScreen: { enable: false },
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
          distance: 200,
          size: 4,
          duration: 2,
          opacity: 0.8,
        },
      },
    },
    particles: {
      color: {
        // FIX: Use your CSS variables here for theme support
        value: ["var(--accent)", "var(--seBlue)", "#ffffff", "var(--seRed)"],
      },
      move: {
        enable: true,
        direction: "none",
        outModes: { default: "out" },
        random: true,
        speed: 0.3,
        straight: false,
      },
      number: {
        density: { enable: true, area: 1000 },
        value: 60,
      },
      opacity: {
        value: { min: 0.1, max: 0.4 },
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
        value: { min: 1, max: 2 },
      },
    },
    detectRetina: true,
  }), []);

  if (init) {
    return (
      <Particles
        id="tsparticles"
        options={particlesOptions}
        // FIX: Fixed positioning to span behind everything
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      />
    );
  }

  return null;
}