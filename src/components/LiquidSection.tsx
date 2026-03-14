import { useRef, useEffect, useState, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface LiquidSectionProps {
  children: ReactNode;
  className?: string;
}

/**
 * A wrapper component that applies a liquid displacement effect when scrolling into view.
 * Uses CSS filters and transforms for a performant "melty" transition.
 */
const LiquidSection = ({ children, className = '' }: LiquidSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      className={`liquid-section ${className}`}
      initial={{ 
        opacity: 0,
        filter: 'blur(20px) saturate(2)',
        transform: 'scale(1.05) translateY(30px)',
      }}
      animate={isInView ? { 
        opacity: 1,
        filter: 'blur(0px) saturate(1)',
        transform: 'scale(1) translateY(0px)',
      } : {
        opacity: 0,
        filter: 'blur(20px) saturate(2)',
        transform: 'scale(1.05) translateY(30px)',
      }}
      transition={{
        duration: 1.0,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for organic feel
        opacity: { duration: 0.8 },
        filter: { duration: 1.2 },
        transform: { duration: 1.0 },
      }}
    >
      {children}
    </motion.div>
  );
};

export default LiquidSection;
