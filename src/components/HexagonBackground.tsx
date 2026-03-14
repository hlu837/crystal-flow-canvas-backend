import { useEffect, useRef, useCallback } from 'react';

interface Point {
  x: number;
  y: number;
}

interface HexEdge {
  start: Point;
  end: Point;
  hexIndex: number;
}

interface TraceParticle {
  edges: HexEdge[];
  currentEdgeIndex: number;
  progress: number;
  speed: number;
  trailLength: number;
}

const HexagonBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const offsetRef = useRef<Point>({ x: 0, y: 0 });
  const tracesRef = useRef<TraceParticle[]>([]);
  const edgesRef = useRef<HexEdge[]>([]);
  const animationRef = useRef<number>();

  // Smaller hexagons for premium look
  const hexSize = 25;
  const lineWidth = 0.5;
  const lineColor = 'rgba(30, 35, 45, 0.4)';
  const glowColor = '#00f2ff';

  const getHexagonPoints = useCallback((centerX: number, centerY: number, size: number): Point[] => {
    const points: Point[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      points.push({
        x: centerX + size * Math.cos(angle),
        y: centerY + size * Math.sin(angle),
      });
    }
    return points;
  }, []);

  const generateHexGrid = useCallback((width: number, height: number): HexEdge[] => {
    const edges: HexEdge[] = [];
    const horizontalSpacing = hexSize * 1.75;
    const verticalSpacing = hexSize * 1.5;

    let hexIndex = 0;
    for (let row = -2; row < height / verticalSpacing + 2; row++) {
      for (let col = -2; col < width / horizontalSpacing + 2; col++) {
        const x = col * horizontalSpacing + (row % 2 === 0 ? 0 : horizontalSpacing / 2);
        const y = row * verticalSpacing;
        const points = getHexagonPoints(x, y, hexSize);
        
        // Create edges for this hexagon
        for (let i = 0; i < 6; i++) {
          edges.push({
            start: points[i],
            end: points[(i + 1) % 6],
            hexIndex,
          });
        }
        hexIndex++;
      }
    }
    return edges;
  }, [getHexagonPoints]);

  const findConnectedEdges = useCallback((edge: HexEdge): HexEdge[] => {
    return edgesRef.current.filter((e) => {
      if (e === edge) return false;
      const dist = Math.hypot(e.start.x - edge.end.x, e.start.y - edge.end.y);
      return dist < 2;
    });
  }, []);

  const createTrace = useCallback(() => {
    if (edgesRef.current.length === 0) return;

    const startEdge = edgesRef.current[Math.floor(Math.random() * edgesRef.current.length)];
    const pathLength = 8 + Math.floor(Math.random() * 12);
    
    const edges: HexEdge[] = [startEdge];
    let currentEdge = startEdge;
    
    for (let i = 0; i < pathLength; i++) {
      const connected = findConnectedEdges(currentEdge);
      if (connected.length === 0) break;
      
      currentEdge = connected[Math.floor(Math.random() * connected.length)];
      edges.push(currentEdge);
    }

    tracesRef.current.push({
      edges,
      currentEdgeIndex: 0,
      progress: 0,
      speed: 0.015 + Math.random() * 0.02,
      trailLength: 4 + Math.floor(Math.random() * 3),
    });
  }, [findConnectedEdges]);

  const drawHexGrid = useCallback((ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number) => {
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    
    edgesRef.current.forEach((edge) => {
      ctx.moveTo(edge.start.x + offsetX, edge.start.y + offsetY);
      ctx.lineTo(edge.end.x + offsetX, edge.end.y + offsetY);
    });
    
    ctx.stroke();
  }, []);

  const drawTrace = useCallback((ctx: CanvasRenderingContext2D, trace: TraceParticle, offsetX: number, offsetY: number) => {
    const { edges, currentEdgeIndex, progress, trailLength } = trace;
    if (currentEdgeIndex >= edges.length) return;

    // Draw glowing trail
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (let i = Math.max(0, currentEdgeIndex - trailLength); i <= currentEdgeIndex; i++) {
      const edge = edges[i];
      if (!edge) continue;

      const isCurrentEdge = i === currentEdgeIndex;
      const trailPosition = currentEdgeIndex - i;
      const alpha = Math.max(0.1, 1 - (trailPosition / trailLength) * 0.8);

      ctx.beginPath();
      ctx.strokeStyle = `rgba(0, 242, 255, ${alpha})`;
      ctx.lineWidth = isCurrentEdge ? 2 : 1.5 - (trailPosition * 0.2);
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = isCurrentEdge ? 20 : 10 - trailPosition * 2;

      if (isCurrentEdge) {
        const currentX = edge.start.x + (edge.end.x - edge.start.x) * progress;
        const currentY = edge.start.y + (edge.end.y - edge.start.y) * progress;
        ctx.moveTo(edge.start.x + offsetX, edge.start.y + offsetY);
        ctx.lineTo(currentX + offsetX, currentY + offsetY);
      } else {
        ctx.moveTo(edge.start.x + offsetX, edge.start.y + offsetY);
        ctx.lineTo(edge.end.x + offsetX, edge.end.y + offsetY);
      }
      ctx.stroke();
    }

    // Draw glowing head particle
    const currentEdge = edges[currentEdgeIndex];
    if (currentEdge) {
      const headX = currentEdge.start.x + (currentEdge.end.x - currentEdge.start.x) * progress;
      const headY = currentEdge.start.y + (currentEdge.end.y - currentEdge.start.y) * progress;

      ctx.beginPath();
      ctx.arc(headX + offsetX, headY + offsetY, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 25;
      ctx.fill();
    }

    ctx.shadowBlur = 0;
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Smooth parallax offset
    const targetOffsetX = (mouseRef.current.x - canvas.width / 2) * 0.015;
    const targetOffsetY = (mouseRef.current.y - canvas.height / 2) * 0.015;
    offsetRef.current.x += (targetOffsetX - offsetRef.current.x) * 0.03;
    offsetRef.current.y += (targetOffsetY - offsetRef.current.y) * 0.03;

    // Clear canvas
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Clip to top portion only (avoid overlap with floor)
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height * 0.55);
    ctx.clip();

    // Draw hexagon grid
    drawHexGrid(ctx, offsetRef.current.x, offsetRef.current.y);

    // Update and draw traces
    tracesRef.current = tracesRef.current.filter((trace) => {
      trace.progress += trace.speed;
      
      if (trace.progress >= 1) {
        trace.progress = 0;
        trace.currentEdgeIndex++;
      }

      if (trace.currentEdgeIndex >= trace.edges.length) {
        return false;
      }

      drawTrace(ctx, trace, offsetRef.current.x, offsetRef.current.y);
      return true;
    });

    // Spawn new traces more frequently
    if (Math.random() < 0.04 && tracesRef.current.length < 12) {
      createTrace();
    }

    // Restore context after clipping
    ctx.restore();

    animationRef.current = requestAnimationFrame(animate);
  }, [drawHexGrid, drawTrace, createTrace]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      edgesRef.current = generateHexGrid(canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, generateHexGrid]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: '#050505' }}
    />
  );
};

export default HexagonBackground;
