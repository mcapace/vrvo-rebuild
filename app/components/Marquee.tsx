"use client";

import { motion } from 'framer-motion';

interface MarqueeProps {
  items: string[];
  speed?: number;
  className?: string;
}

export const Marquee = ({ items, speed = 20, className = '' }: MarqueeProps) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex gap-3 whitespace-nowrap"
        animate={{
          x: [0, -1000]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear"
          }
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span 
            key={i} 
            className="text-sm px-3 py-1.5 bg-white/80 border border-gray-200 rounded-full text-gray-700 font-medium shadow-sm hover:shadow-md hover:bg-white transition-all duration-300 cursor-pointer"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};
