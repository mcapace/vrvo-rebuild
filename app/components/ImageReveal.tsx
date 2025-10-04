"use client";

import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export const ImageReveal = ({ src, alt, className = '', width = 400, height = 300 }: ImageRevealProps) => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      animate={inView ? { clipPath: 'inset(0% 0% 0% 0%)' } : {}}
      transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
      className={`overflow-hidden ${className}`}
    >
      <Image 
        src={src} 
        alt={alt} 
        width={width} 
        height={height}
        className="scale-110 hover:scale-100 transition-transform duration-700"
      />
    </motion.div>
  );
};
