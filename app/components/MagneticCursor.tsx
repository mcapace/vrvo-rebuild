"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export const MagneticCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      gsap.to(cursorRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.5,
        ease: 'power3.out'
      });
      
      gsap.to(cursorDotRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.1
      });
    };
    
    window.addEventListener('mousemove', moveCursor);
    
    // Magnetic effect on buttons
    const buttons = document.querySelectorAll('button, a[href]');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(cursorRef.current, {
          scale: 2,
          background: 'rgba(45, 95, 79, 0.3)',
          borderColor: '#2D5F4F'
        });
      });
      
      button.addEventListener('mouseleave', () => {
        gsap.to(cursorRef.current, { 
          scale: 1, 
          background: 'transparent',
          borderColor: '#2D5F4F'
        });
      });
    });
    
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);
  
  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed w-8 h-8 border-2 border-forest-green rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div 
        ref={cursorDotRef} 
        className="fixed w-2 h-2 bg-forest-green rounded-full pointer-events-none z-50"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
};
