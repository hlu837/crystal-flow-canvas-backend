import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from './ui/button';

const GetStartedTransition = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Liquid displacement values
  const blur = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [15, 8, 0, 8, 15]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.9, 0.95, 1, 0.95, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0]);
  
  // Chromatic aberration effect - RGB separation
  const redOffset = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [-8, -3, 0, 3, 8]);
  const blueOffset = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [8, 3, 0, -3, -8]);
  
  // Liquid wave distortion
  const skewX = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [3, -2, 0, 2, -3]);
  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [15, 5, 0, -5, -15]);

  return (
    <div 
      id="get-started-section"
      ref={containerRef}
      className="relative py-4 sm:py-6 md:py-8 overflow-hidden px-4 sm:px-6"
    >
      {/* Liquid ripple background effect */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)',
            scale,
            filter: `blur(${blur}px)`,
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Ripple rings - smaller on mobile */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20"
            style={{
              width: `${120 + i * 80}px`,
              height: `${120 + i * 80}px`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Main content with liquid displacement */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center"
        style={{
          y,
          scale,
          opacity,
          skewX,
          rotateX,
          perspective: 1000,
        }}
      >
        {/* Chromatic aberration layers */}
        <div className="relative">
          {/* Red channel - offset left */}
          <motion.div
            className="absolute inset-0 mix-blend-screen opacity-50 pointer-events-none"
            style={{ x: redOffset }}
          >
            <div className="text-center">
              <h3 
                className="font-orbitron text-base sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6"
                style={{ color: 'rgba(255, 0, 0, 0.3)' }}
              >
                Ready to Experience the Future?
              </h3>
            </div>
          </motion.div>
          
          {/* Blue channel - offset right */}
          <motion.div
            className="absolute inset-0 mix-blend-screen opacity-50 pointer-events-none"
            style={{ x: blueOffset }}
          >
            <div className="text-center">
              <h3 
                className="font-orbitron text-base sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6"
                style={{ color: 'rgba(0, 100, 255, 0.3)' }}
              >
                Ready to Experience the Future?
              </h3>
            </div>
          </motion.div>
          
          {/* Main content */}
          <div className="text-center relative">
            <motion.h3 
              className="font-orbitron text-base sm:text-xl md:text-2xl font-bold text-foreground mb-4 sm:mb-6"
              style={{
                filter: `blur(${blur}px)`,
                textShadow: '0 0 20px hsl(var(--primary) / 0.5)',
              }}
            >
              Ready to Experience the Future?
            </motion.h3>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setIsActive(!isActive); (window as any).__openVisitorFlow?.(); }}
              animate={{
                boxShadow: isActive ? '0 0 40px hsl(var(--primary) / 0.7)' : '0 0 0px transparent'
              }}
              className="rounded-md"
            >
              <Button 
                size="lg"
                className="relative font-orbitron text-xs sm:text-sm tracking-wider px-6 sm:px-8 py-5 sm:py-6 bg-primary/20 border border-primary/50 hover:bg-primary/30 hover:border-primary text-foreground transition-all duration-300"
              >
                <span className="relative z-10">GET STARTED</span>
              </Button>
            </motion.div>
            
          </div>
        </div>
      </motion.div>

      {/* Bottom liquid edge - connects to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 md:h-32 pointer-events-none">
        <svg 
          className="absolute bottom-0 w-full h-16 sm:h-24 md:h-32" 
          viewBox="0 0 1440 128" 
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,64 C360,128 720,0 1080,64 C1260,96 1380,64 1440,64 L1440,128 L0,128 Z"
            fill="url(#liquidGradient)"
            animate={{
              d: [
                "M0,64 C360,128 720,0 1080,64 C1260,96 1380,64 1440,64 L1440,128 L0,128 Z",
                "M0,96 C360,32 720,128 1080,64 C1260,32 1380,96 1440,64 L1440,128 L0,128 Z",
                "M0,64 C360,128 720,0 1080,64 C1260,96 1380,64 1440,64 L1440,128 L0,128 Z",
              ]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
      </div>
    </div>
  );
};

export default GetStartedTransition;
