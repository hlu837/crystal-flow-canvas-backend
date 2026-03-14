import { motion, Easing } from 'framer-motion';
import { Shield, Lock, Mail, Globe, FileText, Award, Layers, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const easeSmooth: Easing = [0.25, 0.46, 0.45, 0.94];

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: easeSmooth }
    },
  };

  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={containerVariants}
      className="relative z-30 bg-background border-t-2 border-primary/40 py-8 sm:py-12 px-4 sm:px-6"
    >
      {/* Glowing top border effect */}
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: easeSmooth }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" 
      />
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-0 left-1/4 right-1/4 h-8 bg-primary/20 blur-xl -translate-y-1/2" 
      />
      
      <div className="max-w-5xl mx-auto">

        {/* About the Authorization Layer - Article Section */}
        <motion.div variants={itemVariants} className="mb-8 sm:mb-10">
          <div className="relative rounded-xl border border-primary/20 bg-primary/5 p-5 sm:p-8 overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                  <Layers className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-orbitron text-foreground font-bold tracking-wider text-sm sm:text-base">
                  WHAT IS THE AUTHORISATION LAYER?
                </h3>
              </div>

              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4">
                Digital systems have evolved increasingly powerful execution mechanisms — but without a corresponding authority layer. Actions are routinely executed without explicit, time-bound authorization, producing systemic failure across finance, automation, AI, and human-facing software.
              </p>
              
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4">
                The <span className="text-primary font-semibold">Independent Authorisation-Layered Network (INDI-ALN)</span> identifies authorization as a missing first-class layer beneath execution in all digital systems. Authorization must exist as an explicit, revocable, time-scoped object — independent of execution.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-5">
                <div className="p-3 rounded-lg bg-background/50 border border-primary/10">
                  <h4 className="text-foreground font-semibold text-[11px] sm:text-xs mb-1 tracking-wide">EXPLICIT</h4>
                  <p className="text-muted-foreground text-[10px] sm:text-xs leading-relaxed">
                    Authorization is a declared object — not an implicit assumption embedded in code.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-background/50 border border-primary/10">
                  <h4 className="text-foreground font-semibold text-[11px] sm:text-xs mb-1 tracking-wide">REVOCABLE</h4>
                  <p className="text-muted-foreground text-[10px] sm:text-xs leading-relaxed">
                    Permissions can be meaningfully withdrawn at any time, not just blocked at execution.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-background/50 border border-primary/10">
                  <h4 className="text-foreground font-semibold text-[11px] sm:text-xs mb-1 tracking-wide">TIME-SCOPED</h4>
                  <p className="text-muted-foreground text-[10px] sm:text-xs leading-relaxed">
                    Every authorization has a defined lifespan — systems stop acting when intent expires.
                  </p>
                </div>
              </div>

              <a
                href="/documents/authorization-layer-paper.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-xs sm:text-sm font-semibold group"
              >
                <FileText className="w-4 h-4" />
                Read the Full Research Paper
                <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand */}
          <motion.div variants={itemVariants} className="space-y-3 sm:space-y-4 text-center sm:text-left">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <motion.div 
                className="relative"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                <div className="absolute inset-0 blur-md bg-primary/50" />
              </motion.div>
              <span className="font-orbitron text-foreground font-bold tracking-wider text-lg sm:text-xl">
                NINJASERVERS
              </span>
            </div>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
              Premium hosting infrastructure built for the future. 
              Fast, secure, and always reliable.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-3 sm:space-y-4 text-center sm:text-left">
            <h4 className="font-orbitron text-foreground font-semibold tracking-wider text-xs sm:text-sm">
              QUICK LINKS
            </h4>
            <div className="flex flex-wrap justify-center sm:justify-start sm:flex-col gap-3 sm:gap-2">
              {['Services', 'Pricing', 'Support', 'Status'].map((link, index) => (
                <motion.a
                  key={link}
                  href="#"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                  whileHover={{ x: 5, color: 'hsl(var(--primary))' }}
                  className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm flex items-center gap-2 group"
                >
                  <motion.span 
                    className="w-1.5 h-1.5 bg-primary/50 rounded-full group-hover:bg-primary transition-colors"
                    whileHover={{ scale: 1.5 }}
                  />
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Legal */}
          <motion.div variants={itemVariants} className="space-y-3 sm:space-y-4 text-center sm:text-left">
            <h4 className="font-orbitron text-foreground font-semibold tracking-wider text-xs sm:text-sm">
              LEGAL
            </h4>
            <div className="flex flex-col gap-2 sm:gap-3 items-center sm:items-start">
              <Link to="/legal#incorporation">
                <motion.span
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-primary/70" />
                  Company Incorporation Details
                </motion.span>
              </Link>
              <Link to="/legal#licence">
                <motion.span
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
                >
                  <Award className="w-3 h-3 sm:w-4 sm:h-4 text-primary/70" />
                  Company Licences
                </motion.span>
              </Link>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants} className="space-y-3 sm:space-y-4 text-center sm:text-left">
            <h4 className="font-orbitron text-foreground font-semibold tracking-wider text-xs sm:text-sm">
              CONTACT
            </h4>
            <div className="flex flex-col gap-2 sm:gap-3 items-center sm:items-start">
              <motion.a
                href="mailto:support@ninjaservers.com"
                whileHover={{ scale: 1.02, x: 5 }}
                className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm flex items-center gap-2"
              >
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-primary/70" />
                support@ninjaservers.com
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.02, x: 5 }}
                className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm flex items-center gap-2"
              >
                <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-primary/70" />
                www.ninjaservers.com
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easeSmooth }}
          className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-4 sm:mb-6" 
        />

        {/* Bottom bar */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col items-center gap-3 sm:gap-4 md:flex-row md:justify-between"
        >
          <p className="text-muted-foreground text-[10px] sm:text-xs text-center">
            © 2024 NinjaServers. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <motion.a 
              href="#" 
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-[10px] sm:text-xs"
            >
              <Lock className="w-3 h-3" />
              Privacy
            </motion.a>
            <motion.a 
              href="#" 
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-[10px] sm:text-xs"
            >
              <Shield className="w-3 h-3" />
              Terms
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
