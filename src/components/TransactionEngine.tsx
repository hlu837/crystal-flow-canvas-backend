import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

const TransactionEngine = () => {
  // Circuit path definitions - more detailed paths radiating from center
  const leftCircuitPaths = [
    "M 180 200 L 120 200 L 120 100 L 40 100",
    "M 180 180 L 100 180 L 100 140 L 40 140",
    "M 180 220 L 100 220 L 100 260 L 40 260",
    "M 180 200 L 120 200 L 120 300 L 40 300",
  ];

  const rightCircuitPaths = [
    "M 300 200 L 360 200 L 360 100 L 440 100",
    "M 300 180 L 380 180 L 380 140 L 440 140",
    "M 300 220 L 380 220 L 380 260 L 440 260",
    "M 300 200 L 360 200 L 360 300 L 440 300",
  ];

  // Additional detailed circuit lines
  const detailCircuits = [
    // Top circuits
    "M 200 160 L 200 80 L 140 80",
    "M 220 160 L 220 60 L 280 60",
    "M 260 160 L 260 80 L 340 80",
    // Bottom circuits
    "M 200 240 L 200 320 L 140 320",
    "M 240 240 L 240 340 L 320 340",
    "M 280 240 L 280 320 L 340 320",
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-full max-w-[480px] aspect-square">
        {/* SVG Circuit Board */}
        <svg
          viewBox="0 0 480 400"
          className="w-full h-full"
          style={{ filter: 'drop-shadow(0 0 2px hsl(var(--primary) / 0.3))' }}
        >
          <defs>
            {/* Gradient for energy flow - cyan */}
            <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(182 100% 62% / 0)" />
              <stop offset="50%" stopColor="hsl(182 100% 70%)" />
              <stop offset="100%" stopColor="hsl(182 100% 62% / 0)" />
            </linearGradient>

            {/* Purple gradient for secondary glow */}
            <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(270 70% 50% / 0)" />
              <stop offset="50%" stopColor="hsl(270 70% 60%)" />
              <stop offset="100%" stopColor="hsl(270 70% 50% / 0)" />
            </linearGradient>

            {/* Frame gradient - cyan to purple */}
            <linearGradient id="frameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(182 100% 62%)" />
              <stop offset="50%" stopColor="hsl(270 70% 55%)" />
              <stop offset="100%" stopColor="hsl(320 70% 50%)" />
            </linearGradient>

            {/* Outer frame gradient */}
            <linearGradient id="outerFrameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(182 100% 62% / 0.4)" />
              <stop offset="100%" stopColor="hsl(270 70% 55% / 0.4)" />
            </linearGradient>

            {/* Glow filter */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Strong glow for frame */}
            <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Soft glow */}
            <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Left Data Boxes - Larger for data display */}
          {[70, 130, 235, 295].map((y, i) => (
            <g key={`left-box-${i}`}>
              <motion.rect
                x="5"
                y={y}
                width="70"
                height="45"
                rx="4"
                fill="hsl(220 45% 8% / 0.9)"
                stroke="hsl(182 100% 62% / 0.5)"
                strokeWidth="1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
              />
              {/* Data placeholder lines */}
              <motion.rect
                x="12"
                y={y + 10}
                width="50"
                height="3"
                rx="1.5"
                fill="hsl(182 100% 62% / 0.4)"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.3 }}
              />
              <motion.rect
                x="12"
                y={y + 18}
                width="35"
                height="3"
                rx="1.5"
                fill="hsl(270 70% 50% / 0.5)"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6 + i * 0.15, duration: 0.3 }}
              />
              <motion.rect
                x="12"
                y={y + 26}
                width="45"
                height="3"
                rx="1.5"
                fill="hsl(182 100% 62% / 0.25)"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7 + i * 0.15, duration: 0.3 }}
              />
            </g>
          ))}

          {/* Right Data Boxes - Larger for data display */}
          {[70, 130, 235, 295].map((y, i) => (
            <g key={`right-box-${i}`}>
              <motion.rect
                x="405"
                y={y}
                width="70"
                height="45"
                rx="4"
                fill="hsl(220 45% 8% / 0.9)"
                stroke="hsl(182 100% 62% / 0.5)"
                strokeWidth="1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
              />
              {/* Data placeholder lines */}
              <motion.rect
                x="412"
                y={y + 10}
                width="50"
                height="3"
                rx="1.5"
                fill="hsl(182 100% 62% / 0.4)"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.3 }}
              />
              <motion.rect
                x="412"
                y={y + 18}
                width="35"
                height="3"
                rx="1.5"
                fill="hsl(270 70% 50% / 0.5)"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6 + i * 0.15, duration: 0.3 }}
              />
              <motion.rect
                x="412"
                y={y + 26}
                width="45"
                height="3"
                rx="1.5"
                fill="hsl(182 100% 62% / 0.25)"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7 + i * 0.15, duration: 0.3 }}
              />
            </g>
          ))}

          {/* Detail circuit paths - base lines */}
          {detailCircuits.map((path, i) => (
            <motion.path
              key={`detail-base-${i}`}
              d={path}
              fill="none"
              stroke="hsl(182 100% 62% / 0.2)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.5, ease: "easeOut" }}
            />
          ))}

          {/* Left Circuit Paths - Base lines */}
          {leftCircuitPaths.map((path, i) => (
            <motion.path
              key={`left-base-${i}`}
              d={path}
              fill="none"
              stroke="hsl(182 100% 62% / 0.25)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: "easeOut" }}
            />
          ))}

          {/* Right Circuit Paths - Base lines */}
          {rightCircuitPaths.map((path, i) => (
            <motion.path
              key={`right-base-${i}`}
              d={path}
              fill="none"
              stroke="hsl(182 100% 62% / 0.25)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: "easeOut" }}
            />
          ))}

          {/* Left Circuit Paths - Energy flow animation */}
          {leftCircuitPaths.map((path, i) => (
            <motion.path
              key={`left-energy-${i}`}
              d={path}
              fill="none"
              stroke="url(#energyGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
              initial={{ pathLength: 0, pathOffset: 0 }}
              animate={{ 
                pathLength: [0, 0.3, 0],
                pathOffset: [0, 0.7, 1]
              }}
              transition={{ 
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Right Circuit Paths - Energy flow animation */}
          {rightCircuitPaths.map((path, i) => (
            <motion.path
              key={`right-energy-${i}`}
              d={path}
              fill="none"
              stroke="url(#purpleGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
              initial={{ pathLength: 0, pathOffset: 1 }}
              animate={{ 
                pathLength: [0, 0.3, 0],
                pathOffset: [1, 0.3, 0]
              }}
              transition={{ 
                duration: 2,
                delay: i * 0.3 + 0.5,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Circuit node points */}
          {[
            // Left nodes
            { x: 120, y: 200 }, { x: 100, y: 180 }, { x: 100, y: 220 },
            { x: 120, y: 100 }, { x: 100, y: 140 }, { x: 100, y: 260 }, { x: 120, y: 300 },
            { x: 140, y: 80 }, { x: 140, y: 320 },
            // Right nodes
            { x: 360, y: 200 }, { x: 380, y: 180 }, { x: 380, y: 220 },
            { x: 360, y: 100 }, { x: 380, y: 140 }, { x: 380, y: 260 }, { x: 360, y: 300 },
            { x: 340, y: 80 }, { x: 340, y: 320 },
            // Top/bottom nodes
            { x: 200, y: 80 }, { x: 220, y: 60 }, { x: 260, y: 80 }, { x: 280, y: 60 },
            { x: 200, y: 320 }, { x: 240, y: 340 }, { x: 280, y: 320 },
          ].map((node, i) => (
            <motion.circle
              key={`node-${i}`}
              cx={node.x}
              cy={node.y}
              r="2.5"
              fill="hsl(182 100% 62%)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: [0.4, 0.9, 0.4] }}
              transition={{ 
                scale: { delay: 0.5 + i * 0.03, duration: 0.3 },
                opacity: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          ))}

          {/* Outermost frame - subtle */}
          <motion.rect
            x="155"
            y="125"
            width="170"
            height="150"
            rx="12"
            fill="none"
            stroke="hsl(182 100% 62% / 0.15)"
            strokeWidth="1"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
          />

          {/* Outer frame */}
          <motion.rect
            x="170"
            y="140"
            width="140"
            height="120"
            rx="10"
            fill="none"
            stroke="url(#outerFrameGradient)"
            strokeWidth="1.5"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
          />

          {/* Main frame background */}
          <motion.rect
            x="190"
            y="155"
            width="100"
            height="90"
            rx="8"
            fill="hsl(220 45% 5% / 0.95)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          />

          {/* Main frame border - gradient */}
          <motion.rect
            x="190"
            y="155"
            width="100"
            height="90"
            rx="8"
            fill="none"
            stroke="url(#frameGradient)"
            strokeWidth="2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          />

          {/* Main frame glow animation */}
          <motion.rect
            x="190"
            y="155"
            width="100"
            height="90"
            rx="8"
            fill="none"
            stroke="url(#frameGradient)"
            strokeWidth="2"
            filter="url(#strongGlow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Inner decorative frame */}
          <motion.rect
            x="200"
            y="165"
            width="80"
            height="70"
            rx="4"
            fill="none"
            stroke="hsl(182 100% 62% / 0.3)"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          />

          {/* Central Lock Icon */}
          <motion.g
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.45, ease: "easeOut" }}
            style={{ transformOrigin: '240px 200px' }}
          >
            {/* Lock icon - positioned center of frame */}
            <g transform="translate(215, 175)">
              {/* Base lock */}
              <Lock
                width="50"
                height="50"
                className="text-foreground"
                strokeWidth={1.5}
              />
            </g>

            {/* Breathing glow layer */}
            <motion.g
              transform="translate(215, 175)"
              animate={{
                opacity: [0.3, 0.9, 0.3],
                filter: [
                  'drop-shadow(0 0 8px hsl(182 100% 62% / 0.4))',
                  'drop-shadow(0 0 20px hsl(182 100% 62% / 0.7))',
                  'drop-shadow(0 0 8px hsl(182 100% 62% / 0.4))'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Lock
                width="50"
                height="50"
                className="text-foreground"
                strokeWidth={1.5}
              />
            </motion.g>
          </motion.g>

          {/* Corner accents - outside main frame */}
          {[
            { x: 190, y: 155, rotate: 0 },
            { x: 290, y: 155, rotate: 90 },
            { x: 290, y: 245, rotate: 180 },
            { x: 190, y: 245, rotate: 270 },
          ].map((corner, i) => (
            <motion.g
              key={`corner-${i}`}
              transform={`translate(${corner.x}, ${corner.y}) rotate(${corner.rotate})`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <path
                d="M 0 12 L 0 0 L 12 0"
                fill="none"
                stroke="hsl(320 70% 50%)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </motion.g>
          ))}

          {/* Small decorative dots on frame corners */}
          {[
            { x: 190, y: 155 },
            { x: 290, y: 155 },
            { x: 290, y: 245 },
            { x: 190, y: 245 },
          ].map((dot, i) => (
            <motion.circle
              key={`frame-dot-${i}`}
              cx={dot.x}
              cy={dot.y}
              r="3"
              fill="hsl(270 70% 55%)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * 0.08, type: "spring" }}
            />
          ))}
        </svg>

        {/* "TAE v1" Label */}
        <motion.div
          className="absolute bottom-[12%] left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          <span className="font-orbitron text-[10px] md:text-xs text-primary/70 tracking-[0.3em] uppercase">
            TAE v1
          </span>
        </motion.div>

        {/* Scanning line effect */}
        <motion.div
          className="absolute left-[40%] right-[40%] h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
          style={{ top: '39%' }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.5, 0],
            top: ['39%', '61%', '39%']
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>
    </div>
  );
};

export default TransactionEngine;
