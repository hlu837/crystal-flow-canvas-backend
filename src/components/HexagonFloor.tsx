import { useEffect, useRef, useState } from 'react';

interface Hexagon {
  // Grid position in 3D space
  gx: number;
  gy: number;
  z: number;
  speed: number;
  size: number;
  brightness: number;
  // Which cluster string this belongs to (vertical/horizontal alignment)
  cluster: number;
}

const HexagonFloor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);

  // Watch for the "Get Started" section to appear
  useEffect(() => {
    const target = document.getElementById('get-started-section');
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationId: number;
    const resize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create hexagon clusters — vertical and horizontal strings
    const hexagons: Hexagon[] = [];
    const numClusters = 50;
    const hexPerCluster = 8;
    const maxZ = 3000;

    for (let c = 0; c < numClusters; c++) {
      const laneX = (Math.random() - 0.5) * 1200;
      const laneY = (Math.random() - 0.5) * 900;
      const isVertical = Math.random() > 0.4;
      const baseSpeed = 2 + Math.random() * 4;

      for (let i = 0; i < hexPerCluster; i++) {
        const spacing = 30 * i;
        hexagons.push({
          gx: laneX + (isVertical ? (Math.random() - 0.5) * 8 : spacing),
          gy: laneY + (isVertical ? spacing : (Math.random() - 0.5) * 8),
          z: Math.random() * maxZ + 200,
          speed: baseSpeed + Math.random() * 0.8,
          size: 5 + Math.random() * 6,
          brightness: 0.3 + Math.random() * 0.7,
          cluster: c,
        });
      }
    }

    // Scattered singles for organic feel — lots of tiny particles
    const scatterCount = 200;
    for (let i = 0; i < scatterCount; i++) {
      hexagons.push({
        gx: (Math.random() - 0.5) * 1600,
        gy: (Math.random() - 0.5) * 1200,
        z: Math.random() * maxZ + 100,
        speed: 1.5 + Math.random() * 5,
        size: 3 + Math.random() * 5,
        brightness: 0.15 + Math.random() * 0.85,
        cluster: -1,
      });
    }

    function drawHexagon(
      cx: number,
      cy: number,
      size: number,
      alpha: number,
      blur: number,
      bright: number
    ) {
      if (!ctx) return;
      ctx.save();

      // Skip expensive blur filter — use alpha falloff instead

      const r = bright * 45;
      const g = bright * 212;
      const b = bright * 191;

      // Filled glow
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const x = cx + size * Math.cos(angle);
        const y = cy + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.06})`;
      ctx.fill();

      // Edge stroke
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.7})`;
      ctx.lineWidth = blur > 2 ? 2.5 : 1.2;
      ctx.stroke();

      // Bright node at center
      ctx.beginPath();
      ctx.arc(cx, cy, Math.max(1, size * 0.08), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${Math.min(255, r + 60)}, ${Math.min(255, g + 40)}, ${Math.min(255, b + 30)}, ${alpha * 0.9})`;
      ctx.shadowBlur = 12 + blur * 2;
      ctx.shadowColor = `rgba(45, 212, 191, ${alpha * 0.8})`;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Corner nodes for close hexagons
      if (size > 20 && alpha > 0.3) {
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i - Math.PI / 6;
          const x = cx + size * Math.cos(angle);
          const y = cy + size * Math.sin(angle);
          ctx.beginPath();
          ctx.arc(x, y, Math.max(0.8, size * 0.04), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(94, 234, 212, ${alpha * 0.6})`;
          ctx.fill();
        }
      }

      ctx.restore();
    }

    // Draw connecting lines between cluster members
    function drawClusterLinks() {
      if (!ctx) return;
      const clusterMap = new Map<number, { sx: number; sy: number; alpha: number }[]>();

      // Group projected positions by cluster
      hexagons.forEach((h) => {
        if (h.cluster < 0) return;
        const z = h.z;
        if (z < 30 || z > maxZ) return;

        const scale = 600 / z;
        const sx = width / 2 + h.gx * scale;
        const sy = height / 2 + h.gy * scale;
        const alpha = Math.min(1, Math.max(0, 1 - z / maxZ));

        if (!clusterMap.has(h.cluster)) clusterMap.set(h.cluster, []);
        clusterMap.get(h.cluster)!.push({ sx, sy, alpha });
      });

      clusterMap.forEach((members) => {
        if (members.length < 2) return;
        for (let i = 0; i < members.length - 1; i++) {
          const a = members[i];
          const b = members[i + 1];
          const dist = Math.hypot(a.sx - b.sx, a.sy - b.sy);
          if (dist > 300) continue;

          const lineAlpha = Math.min(a.alpha, b.alpha) * 0.25;
          ctx.beginPath();
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(b.sx, b.sy);
          ctx.strokeStyle = `rgba(45, 212, 191, ${lineAlpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      });
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Subtle radial vignette
      const vignette = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, width * 0.7
      );
      vignette.addColorStop(0, 'rgba(45, 212, 191, 0.03)');
      vignette.addColorStop(0.6, 'rgba(20, 184, 166, 0.01)');
      vignette.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      // Move hexagons toward camera (decreasing z)
      hexagons.forEach((h) => {
        h.z -= h.speed;
        // Reset when passing camera
        if (h.z < 20) {
          h.z = maxZ + Math.random() * 400;
        }
      });

      // Sort by z for proper depth ordering (far first)
      const sorted = [...hexagons].sort((a, b) => b.z - a.z);

      // Draw cluster connecting lines first (behind hexagons)
      drawClusterLinks();

      // Draw each hexagon
      sorted.forEach((h) => {
        const z = h.z;
        if (z < 30) return;

        const scale = 600 / z;
        const sx = width / 2 + h.gx * scale;
        const sy = height / 2 + h.gy * scale;
        const projSize = h.size * scale;

        // Skip if off-screen
        if (sx < -100 || sx > width + 100 || sy < -100 || sy > height + 100) return;

        // Depth-based alpha: fades in from distance, fades with proximity
        const distAlpha = Math.min(1, Math.max(0, 1 - z / maxZ));
        // Close hexagons get bright then fade (bokeh zone)
        const closeAlpha = z < 150 ? z / 150 : 1;
        const alpha = distAlpha * closeAlpha * h.brightness;

        // Bokeh blur for very close hexagons (shallow depth of field)
        let blur = 0;
        if (z < 200) {
          blur = ((200 - z) / 200) * 8;
        } else if (z > maxZ * 0.85) {
          // Far hexagons also slightly blurred
          blur = ((z - maxZ * 0.85) / (maxZ * 0.15)) * 4;
        }

        drawHexagon(sx, sy, projSize, alpha, blur, h.brightness);
      });

      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [visible]);

  return (
    <div
      className="absolute left-0 right-0 top-0 bottom-0 pointer-events-none z-[1] transition-opacity duration-1000"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
};

export default HexagonFloor;
