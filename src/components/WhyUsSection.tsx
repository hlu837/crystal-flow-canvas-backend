import { motion, Easing } from 'framer-motion';
import { useState } from 'react';

const easeSmooth: Easing = [0.25, 0.46, 0.45, 0.94];

const features = [
  { title: 'Scam-resistant workflow' },
  { title: 'Verified service partners' },
  { title: 'Transparent service process' },
];

const WhyUsSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const getBubbleVariants = (i: number) => ({
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      y: 20,
      filter: 'blur(8px)'
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.4,
        ease: easeSmooth,
      },
    },
  });

  return (
    <section className="relative py-4 sm:py-6 md:py-8 px-4 sm:px-6 overflow-visible">
      {/* Dark overlay for better visibility */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-background/60 backdrop-blur-sm" 
      />
      
      {/* SVG Connection Lines - Network Map - Hidden on mobile, simplified on tablet */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden sm:block"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="lineGradientUp" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="horizontalGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          </linearGradient>
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Vertical lines rising from floor */}
        <motion.line
          x1="20%" y1="100%" x2="20%" y2="70%"
          stroke="url(#lineGradientUp)"
          strokeWidth="2"
          filter="url(#strongGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease: easeSmooth }}
        />
        <motion.line
          x1="50%" y1="100%" x2="50%" y2="50%"
          stroke="url(#lineGradientUp)"
          strokeWidth="2"
          filter="url(#strongGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0, ease: easeSmooth }}
        />
        <motion.line
          x1="80%" y1="100%" x2="80%" y2="70%"
          stroke="url(#lineGradientUp)"
          strokeWidth="2"
          filter="url(#strongGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4, ease: easeSmooth }}
        />
        
        {/* Horizontal connection line */}
        <motion.line
          x1="20%" y1="70%" x2="80%" y2="70%"
          stroke="url(#horizontalGlow)"
          strokeWidth="2"
          filter="url(#strongGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.6, ease: easeSmooth }}
        />
        
        {/* Connection nodes with stronger glow */}
        {[20, 50, 80].map((x, i) => (
          <g key={i}>
            <motion.circle
              cx={`${x}%`}
              cy="70%"
              r="8"
              fill="hsl(var(--primary))"
              opacity="0.3"
              filter="url(#strongGlow)"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 + i * 0.15, type: 'spring', stiffness: 200 }}
            />
            <motion.circle
              cx={`${x}%`}
              cy="70%"
              r="5"
              fill="hsl(var(--primary))"
              filter="url(#strongGlow)"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 + i * 0.15, type: 'spring', stiffness: 200 }}
            />
          </g>
        ))}
      </svg>

      <div className="relative max-w-5xl mx-auto z-20">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: easeSmooth }}
          className="text-center mb-12 sm:mb-20 md:mb-28"
        >
          <motion.h2 
            className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-3 drop-shadow-[0_0_10px_hsl(var(--primary)/0.5)]"
            initial={{ letterSpacing: '0.3em', opacity: 0 }}
            whileInView={{ letterSpacing: '0.1em', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeSmooth }}
          >
            Why NINJASERVERS
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-xs sm:text-sm"
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            Trustworthy and fast for your needs
          </motion.p>
        </motion.div>

        {/* Feature nodes - 2 rows layout */}
        <div className="relative flex flex-col items-center gap-6 sm:gap-8 px-2 sm:px-4 md:px-12">
          {/* First row - 2 items */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 md:gap-16 w-full">
            {features.slice(0, 2).map((feature, index) => (
              <motion.div
                key={index}
                variants={getBubbleVariants(index)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.1,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className="flex flex-col items-center text-center"
              >
                {/* Feature text bubble */}
                <div 
                  className="relative group cursor-pointer"
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                >
                  {/* Inner container - glow only when active */}
                  <motion.div 
                    className="relative bg-background/80 backdrop-blur-md border rounded-full px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-4 transition-all duration-300"
                    animate={{
                      boxShadow: activeIndex === index ? '0 0 40px hsl(var(--primary) / 0.7)' : '0 0 0px transparent',
                      borderColor: activeIndex === index ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.5)'
                    }}
                  >
                    <span className="font-orbitron text-[10px] sm:text-xs md:text-sm text-foreground whitespace-nowrap font-medium">
                      {feature.title}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Second row - 1 item centered */}
          <div className="flex justify-center w-full">
            <motion.div
              variants={getBubbleVariants(2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.1,
                y: -5,
                transition: { duration: 0.3 }
              }}
              className="flex flex-col items-center text-center"
            >
              {/* Feature text bubble */}
              <div 
                className="relative group cursor-pointer"
                onClick={() => setActiveIndex(activeIndex === 2 ? null : 2)}
              >
                {/* Inner container - glow only when active */}
                <motion.div 
                  className="relative bg-background/80 backdrop-blur-md border rounded-full px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-4 transition-all duration-300"
                  animate={{
                    boxShadow: activeIndex === 2 ? '0 0 40px hsl(var(--primary) / 0.7)' : '0 0 0px transparent',
                    borderColor: activeIndex === 2 ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.5)'
                  }}
                >
                  <span className="font-orbitron text-[10px] sm:text-xs md:text-sm text-foreground whitespace-nowrap font-medium">
                    {features[2].title}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Pulsing data nodes at the bottom - hidden on mobile */}
        <div className="hidden sm:flex absolute bottom-0 left-0 right-0 justify-between px-4 md:px-12 translate-y-16">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1/3 flex justify-center"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4 + i * 0.15, type: 'spring', stiffness: 200 }}
            >
              <motion.div
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-primary shadow-[0_0_15px_hsl(var(--primary))]"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.4, 1],
                  boxShadow: [
                    '0 0 15px hsl(var(--primary))',
                    '0 0 30px hsl(var(--primary))',
                    '0 0 15px hsl(var(--primary))'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
