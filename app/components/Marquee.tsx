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
            className="text-sm px-3 py-1.5 bg-white/60 backdrop-blur-sm border border-deep-charcoal/10 rounded-full text-deep-charcoal/90 font-medium shadow-sm hover:shadow-md hover:bg-white/80 transition-all duration-300 cursor-pointer"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};
