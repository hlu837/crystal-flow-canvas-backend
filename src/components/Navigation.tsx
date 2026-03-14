import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Search, Menu, X, LogIn } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Login / Signup', href: '#login' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Contact Us', href: '#contact' },
];

const Navigation = () => {
  const [activeItem, setActiveItem] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (label: string, href: string) => {
    setActiveItem(label);
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Mobile Fixed Header - appears when scrolled */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-0 left-0 right-0 z-[100] px-4 py-3 backdrop-blur-xl bg-background/70 border-b border-border/30"
          >
            <div className="flex items-center justify-between">
              <span className="font-orbitron text-lg font-bold tracking-[0.1em] text-foreground">
                NINJASERVERS
              </span>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative p-2 bg-card/50 backdrop-blur-md border border-border/40 rounded-xl"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-primary" />
                ) : (
                  <Menu className="w-5 h-5 text-primary" />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-50 px-4 sm:px-6 pt-6 sm:pt-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Secondary tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] mb-4 sm:mb-6"
          >
            <span className="text-primary/70">NINJASERVERS</span> : Where Trust Builds
          </motion.p>

          {/* Primary Logo */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.15em] sm:tracking-[0.3em] text-foreground mb-4 sm:mb-6"
          >
            NINJASERVERS
          </motion.h1>

          {/* Subtitle line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mb-6 sm:mb-10"
          >
            <p className="text-muted-foreground text-[8px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.25em] font-bold uppercase">
              WORLD'S FIRST FULLY INDEPENDENT
            </p>
            <p className="text-muted-foreground text-[8px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.25em] font-bold uppercase mt-0.5">
              AUTHORISATION LAYERED NETWORK ( INDI-ALN )
            </p>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="hidden md:flex justify-center"
          >
            <div className="relative inline-flex items-center gap-1 bg-card/50 backdrop-blur-md border border-border/40 rounded-full px-2 py-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.label, item.href)}
                  className={`relative px-5 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                    activeItem === item.label 
                      ? 'bg-foreground text-background shadow-[0_0_20px_hsl(var(--foreground)/0.4),0_0_40px_hsl(var(--primary)/0.3)]' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="w-px h-6 bg-border/50 mx-2" />

              <button className="w-9 h-9 flex items-center justify-center rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors">
                <Shield className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </motion.nav>

          {/* Mobile Navigation Button - only visible when not scrolled */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className={`md:hidden flex justify-center ${isScrolled ? 'opacity-0 pointer-events-none' : ''}`}
          >
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative inline-flex items-center gap-2 bg-card/50 backdrop-blur-md border border-border/40 rounded-full px-4 py-3"
            >
              <span className="text-sm text-foreground font-medium">{activeItem}</span>
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-primary" />
              ) : (
                <Menu className="w-5 h-5 text-primary" />
              )}
            </button>
          </motion.div>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`md:hidden fixed left-4 right-4 ${isScrolled ? 'top-[68px]' : 'top-48'} bg-card/95 backdrop-blur-md border border-border/40 rounded-2xl p-4 z-[101]`}
              >
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleNavClick(item.label, item.href)}
                      className={`px-4 py-3 text-sm font-medium transition-all duration-300 rounded-xl text-left flex items-center gap-3 ${
                        activeItem === item.label 
                          ? 'bg-primary/20 text-foreground border border-primary/30' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/20'
                      }`}
                    >
                      {item.label === 'Login / Signup' && <LogIn className="w-4 h-4" />}
                      {item.label}
                    </button>
                  ))}
                  
                  <div className="h-px bg-border/30 my-2" />
                  
                  {/* Full width stacked buttons */}
                  <button className="w-full h-12 flex items-center justify-start gap-3 px-4 rounded-xl border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors">
                    <Search className="w-4 h-4" />
                    <span className="text-sm">Search</span>
                  </button>
                  <button className="w-full h-12 flex items-center justify-start gap-3 px-4 rounded-xl border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm">Security</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Purple glow under navigation */}
          <div className="absolute left-1/2 -translate-x-1/2 w-48 sm:w-64 h-12 sm:h-16 bg-purple-500/30 blur-3xl -z-10 mt-2" />
        </div>
      </motion.header>
    </>
  );
};

export default Navigation;
