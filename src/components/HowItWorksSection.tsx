import { motion, Easing } from 'framer-motion';
import { Send, CheckCircle, Shield, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

const easeSmooth: Easing = [0.25, 0.46, 0.45, 0.94];

const steps = [
  {
    step: '01',
    icon: Send,
    title: 'Request Service',
  },
  {
    step: '02',
    icon: CheckCircle,
    title: 'Verified Assignment',
  },
  {
    step: '03',
    icon: Shield,
    title: 'Secure Execution',
  },
];

const HowItWorksSection = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30, 
      scale: 0.95,
      rotateX: 8,
      filter: 'blur(5px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.4,
        ease: easeSmooth,
      },
    },
  };

  return (
    <section id="how-it-works" className="relative py-4 sm:py-6 md:py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: easeSmooth }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.h2 
            className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold text-foreground"
            initial={{ letterSpacing: '0.2em', opacity: 0 }}
            whileInView={{ letterSpacing: '0.05em', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: easeSmooth }}
          >
            How It Works
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5"
          style={{ perspective: '1000px' }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              onClick={() => setActiveCard(activeCard === index ? null : index)}
              className="relative group cursor-pointer"
            >
              <motion.div 
                className="relative bg-card/40 backdrop-blur-md border border-primary/30 rounded-2xl p-5 sm:p-6 overflow-hidden"
                animate={{
                  boxShadow: activeCard === index ? '0 0 40px hsl(var(--primary) / 0.5)' : '0 0 0px transparent',
                  borderColor: activeCard === index ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.3)'
                }}
              >
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                />

                {/* Step number */}
                <motion.div 
                  className="absolute top-3 sm:top-4 left-3 sm:left-4"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05, duration: 0.25 }}
                >
                  <span className="font-orbitron text-xs text-primary/60">{step.step}</span>
                </motion.div>

                {/* Arrow in top right */}
                <motion.div 
                  className="absolute top-3 sm:top-4 right-3 sm:right-4"
                  whileHover={{ rotate: 45, scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                </motion.div>

                {/* Icon */}
                <div className="flex justify-center mb-3 sm:mb-4 mt-3 sm:mt-4">
                  <motion.div
                    initial={{ scale: 0.8, rotate: -45, filter: 'blur(5px)' }}
                    whileInView={{ scale: 1, rotate: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + index * 0.05, type: 'spring', stiffness: 200, damping: 20 }}
                    className="relative"
                  >
                    <motion.div 
                      className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/40 flex items-center justify-center"
                      whileHover={{ rotate: 15, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <step.icon className="w-5 h-5 sm:w-7 sm:h-7 text-primary" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Title */}
                <motion.h3 
                  className="font-orbitron text-sm sm:text-base font-semibold text-foreground text-center"
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.05, duration: 0.25 }}
                >
                  {step.title}
                </motion.h3>

                {/* Subtle bottom glow */}
                <motion.div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + index * 0.05, duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
