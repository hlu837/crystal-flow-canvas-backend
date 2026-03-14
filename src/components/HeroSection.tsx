import { motion, Variants, Easing } from 'framer-motion';
import TransactionEngine from './TransactionEngine';

const easeSmooth: Easing = [0.25, 0.46, 0.45, 0.94];

const HeroSection = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      scale: 0.97,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: easeSmooth,
      },
    },
  };

  const textVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 8,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.25,
        ease: easeSmooth,
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      rotate: -2,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.4,
        ease: easeSmooth,
      },
    },
  };

  return (
    <section id="home" className="relative flex flex-col pt-24 sm:pt-32 md:pt-44 pb-4 sm:pb-8 min-h-[80vh] sm:min-h-screen">
      {/* Purple gradient overlay */}
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
      
      {/* Main Hero Content - Two Glass Containers */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 px-4 sm:px-6 max-w-5xl mx-auto w-full flex-1 flex items-center"
      >
        <motion.div 
          className="w-full"
          variants={cardVariants}
        >
          {/* Glass Card Container */}
          <div className="glass-card p-3 sm:p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-3 sm:gap-4">
              {/* Left Container - CTA */}
              <motion.div
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: '0 0 40px hsl(var(--primary) / 0.3)',
                  transition: { duration: 0.3 }
                }}
                className="glass-card-inner flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 cursor-pointer group relative overflow-hidden order-2 md:order-1"
                style={{
                  background: 'linear-gradient(180deg, hsl(270 40% 8% / 0.8) 0%, hsl(260 50% 4% / 0.9) 100%)'
                }}
              >
                {/* Subtle purple gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent pointer-events-none" />
                
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    repeatDelay: 2,
                    ease: 'easeInOut'
                  }}
                />
                
                <motion.h2 
                  variants={textVariants}
                  className="font-orbitron text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center tracking-wide relative z-10"
                >
                  GET STARTED
                </motion.h2>
                <motion.p 
                  variants={textVariants}
                  className="font-orbitron text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-wide relative z-10"
                >
                  NOW
                </motion.p>
              </motion.div>

              {/* Right Container - Transaction Authorization Engine */}
              <motion.div
                variants={cardVariants}
                className="glass-card-inner flex items-center justify-center py-4 sm:py-6 px-2 sm:px-4 overflow-hidden order-1 md:order-2 min-h-[280px] sm:min-h-[320px] md:min-h-[380px]"
              >
                <TransactionEngine />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
