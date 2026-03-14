import { motion, AnimatePresence } from 'framer-motion';
import splashLogo from '@/assets/ninja-splash-logo.png';

interface SplashScreenProps {
  isLoading: boolean;
  onComplete?: () => void;
}

const SplashScreen = ({ isLoading, onComplete }: SplashScreenProps) => {
  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
        >
          {/* Logo */}
          <motion.img
            src={splashLogo}
            alt="NINJA SERVERS"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-[280px] md:w-[400px] h-auto"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
