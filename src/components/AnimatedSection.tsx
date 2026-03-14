import { motion, Variants, Easing } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur';
}

const easeSmooth: Easing = [0.25, 0.46, 0.45, 0.94];

const getVariants = (direction: string): Variants => {
  const baseTransition = {
    duration: 0.4,
    ease: easeSmooth,
  };

  switch (direction) {
    case 'up':
      return {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: baseTransition },
      };
    case 'down':
      return {
        hidden: { opacity: 0, y: -40 },
        visible: { opacity: 1, y: 0, transition: baseTransition },
      };
    case 'left':
      return {
        hidden: { opacity: 0, x: 40 },
        visible: { opacity: 1, x: 0, transition: baseTransition },
      };
    case 'right':
      return {
        hidden: { opacity: 0, x: -40 },
        visible: { opacity: 1, x: 0, transition: baseTransition },
      };
    case 'scale':
      return {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { ...baseTransition, duration: 0.35 } },
      };
    case 'blur':
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: baseTransition },
      };
    default:
      return {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: baseTransition },
      };
  }
};

const AnimatedSection = ({ 
  children, 
  className = '', 
  delay = 0, 
  direction = 'up' 
}: AnimatedSectionProps) => {
  const variants = getVariants(direction);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
