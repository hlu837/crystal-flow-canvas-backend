import { useState, useRef, useCallback, useEffect, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import LiquidScene from './LiquidScene';

interface LiquidTransitionProps {
  children: ReactNode;
  transitionKey: string | number;
  duration?: number;
  className?: string;
}

const LiquidTransition = ({
  children,
  transitionKey,
  duration = 1.0,
  className = '',
}: LiquidTransitionProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [capturedTexture, setCapturedTexture] = useState<THREE.Texture | null>(null);
  const [showContent, setShowContent] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const previousKeyRef = useRef(transitionKey);
  const animationRef = useRef<number | null>(null);

  const captureContent = useCallback(() => {
    if (!contentRef.current) return null;

    // Create a canvas to capture the content
    const element = contentRef.current;
    const rect = element.getBoundingClientRect();
    
    // Create canvas with device pixel ratio for sharpness
    const canvas = document.createElement('canvas');
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    
    ctx.scale(dpr, dpr);
    
    // Fill with background color
    ctx.fillStyle = getComputedStyle(element).backgroundColor || '#050505';
    ctx.fillRect(0, 0, rect.width, rect.height);
    
    // Create texture from canvas
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    return texture;
  }, []);

  const runTransition = useCallback(() => {
    const startTime = performance.now();
    const durationMs = duration * 1000;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / durationMs, 1);
      
      // Easing function for smooth organic feel (Power3.easeInOut)
      const eased = rawProgress < 0.5
        ? 4 * rawProgress * rawProgress * rawProgress
        : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2;
      
      setProgress(eased);

      if (rawProgress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsTransitioning(false);
        setShowContent(true);
        setProgress(0);
        setCapturedTexture(null);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [duration]);

  useEffect(() => {
    if (previousKeyRef.current !== transitionKey) {
      // Capture current content
      const texture = captureContent();
      if (texture) {
        setCapturedTexture(texture);
        setIsTransitioning(true);
        setShowContent(false);
        
        // Start transition after a brief delay to allow texture capture
        setTimeout(() => {
          setShowContent(true);
          runTransition();
        }, 50);
      }
      
      previousKeyRef.current = transitionKey;
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [transitionKey, captureContent, runTransition]);

  return (
    <div className={`relative ${className}`}>
      {/* WebGL Canvas for transition effect */}
      {isTransitioning && capturedTexture && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Canvas
            gl={{ alpha: true, antialias: true }}
            camera={{ position: [0, 0, 1], fov: 75 }}
            style={{ background: 'transparent' }}
          >
            <LiquidScene texture={capturedTexture} progress={progress} />
          </Canvas>
        </div>
      )}

      {/* Actual content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={transitionKey}
          ref={contentRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LiquidTransition;
