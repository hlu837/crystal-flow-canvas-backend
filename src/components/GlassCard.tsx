import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

const GlassCard = ({ children, className = '', delay = 0, hover = true }: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      whileHover={hover ? { y: -8, transition: { duration: 0.3 } } : undefined}
      className={`glass-card ${hover ? 'hover-lift' : ''} ${className}`}
    >
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-4 h-4 bg-primary/20 transform rotate-45 translate-x-2 -translate-y-2" />
      </div>
      {children}
    </motion.div>
  );
};

export default GlassCard;
