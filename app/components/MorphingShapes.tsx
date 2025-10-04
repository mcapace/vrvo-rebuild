import React from 'react';
import { motion } from 'framer-motion';

export const MorphingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-rich-navy/20 to-burnt-orange/20 rounded-full"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-burnt-orange/20 to-rich-navy/20 transform rotate-45"
        animate={{
          y: [0, 30, 0],
          rotate: [45, 225, 405],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <motion.div
        className="absolute bottom-40 left-1/4 w-16 h-16 bg-gradient-to-br from-rich-navy/30 to-burnt-orange/30 rounded-full"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <motion.div
        className="absolute top-1/2 right-1/3 w-20 h-20 bg-gradient-to-br from-burnt-orange/15 to-rich-navy/15 transform rotate-12"
        animate={{
          rotate: [12, 192, 372],
          scale: [1, 0.7, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />
    </div>
  );
};
