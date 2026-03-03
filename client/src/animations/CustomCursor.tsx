'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  // Define types for the refs
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      
      requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
        if (cursorDotRef.current) {
          cursorDotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
      });
    };

    const handleMouseDown = () => {
      if (cursorRef.current) cursorRef.current.style.scale = "0.8";
    };

    const handleMouseUp = () => {
      if (cursorRef.current) cursorRef.current.style.scale = "1";
    };

    // Updated Hover Effects to match your designer theme (Purple/Blue)
    const addHoverEffect = () => {
      if (cursorRef.current) {
        // Grow the ring, change border to your brand color, add subtle glow
        cursorRef.current.classList.add('scale-[2.5]', 'bg-purple-500/10', 'border-purple-400');
        cursorDotRef.current?.classList.add('scale-0');
      }
    };

    const removeHoverEffect = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove('scale-[2.5]', 'bg-purple-500/10', 'border-purple-400');
        cursorDotRef.current?.classList.remove('scale-0');
      }
    };

    // Event Listeners
    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Initial attach for static elements
    const interactives = document.querySelectorAll('button, a, .cursor-pointer');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', addHoverEffect);
      el.addEventListener('mouseleave', removeHoverEffect);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', addHoverEffect);
        el.removeEventListener('mouseleave', removeHoverEffect);
      });
    };
  }, []);

  return (
    <>
      {/* Outer Ring - Styled to match seBlack/Purple theme */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-white/30 rounded-full pointer-events-none z-9999 -ml-5 -mt-5 transition-all duration-500 ease-out will-change-transform"
      ></div>
      
      {/* Inner Dot - Styled with seBlue/Purple glow */}
      <div 
        ref={cursorDotRef} 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-linear-to-r from-purple-400 to-blue-500 rounded-full pointer-events-none z-9999 -ml-[3px] -mt-[3px] transition-transform duration-150 ease-out will-change-transform"
      ></div>
    </>
  );
}