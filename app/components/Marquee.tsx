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
        className="flex gap-8 whitespace-nowrap"
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
            className="text-2xl px-4 py-2 border border-forest-green/20 rounded-full text-forest-green hover:border-forest-green hover:bg-forest-green hover:text-warm-linen transition-all duration-300 cursor-pointer"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};
