"use client";

import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  className?: string;
}

export const AnimatedNumber = ({ value, suffix = '', className = '' }: AnimatedNumberProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const { number } = useSpring({
    from: { number: 0 },
    number: inView ? value : 0,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 }
  });
  
  return (
    <div ref={ref} className={className}>
      <animated.span className="font-mono">
        {number.to(n => n.toFixed(1))}
      </animated.span>
      {suffix}
    </div>
  );
};
