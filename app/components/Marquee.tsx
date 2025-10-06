"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';

interface MarqueeProps {
  items: string[];
  speed?: number;
  className?: string;
  direction?: 'left' | 'right';
}

export const Marquee = ({ 
  items, 
  speed = 20, 
  className = '', 
  direction = 'left' 
}: MarqueeProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
      
      <motion.div
        className="flex gap-4 whitespace-nowrap"
        animate={{
          x: direction === 'left' ? [0, -1000] : [0, 1000]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear"
          }
        }}
        style={{
          animationPlayState: isHovered ? 'paused' : 'running'
        }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <motion.span 
            key={i}
            className="inline-flex items-center text-sm px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-800 font-semibold shadow-lg hover:shadow-xl hover:bg-navy hover:text-white hover:border-navy transition-all duration-300 cursor-pointer group"
            whileHover={{ 
              scale: 1.05,
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">{item}</span>
            <motion.div
              className="absolute inset-0 bg-navy rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
            />
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};
