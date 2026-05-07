import { motion } from "motion/react";
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  baseVx: number;
  baseVy: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: -9999, y: -9999 });
  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // If reduced motion is preferred, skip the animation loop entirely
    if (prefersReduced.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = () => window.innerWidth < 768;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const COLORS = [
      "#39FF14",
      "#00D9FF",
      "#39FF1466",
      "#00D9FF66",
      "#39FF14AA",
      "#00D9FFAA",
    ];

    const initParticles = () => {
      const count = isMobile() ? 100 : 300;
      particles.current = Array.from({ length: count }, () => {
        const baseVx = (Math.random() - 0.5) * 0.35;
        const baseVy = (Math.random() - 0.5) * 0.35;
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: baseVx,
          vy: baseVy,
          baseVx,
          baseVy,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: Math.random() * 1.8 + 0.5,
        };
      });
    };

    initParticles();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    // Propagate parent events (canvas is absolute inset)
    window.addEventListener("mousemove", handleMouseMove);

    const CONNECTION_DIST = 110;
    const MOUSE_DIST = 140;
    const MOUSE_FORCE = 0.012;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pts = particles.current;
      const mx = mouse.current.x;
      const my = mouse.current.y;

      // Update positions with mouse interaction
      for (const p of pts) {
        if (!prefersReduced.current) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const distSq = dx * dx + dy * dy;
          if (distSq < MOUSE_DIST * MOUSE_DIST && distSq > 0) {
            const dist = Math.sqrt(distSq);
            // Repel away from cursor
            const force = ((MOUSE_DIST - dist) / MOUSE_DIST) * MOUSE_FORCE;
            p.vx += (dx / dist) * force * 4;
            p.vy += (dy / dist) * force * 4;
          }
          // Dampen back toward base velocity
          p.vx += (p.baseVx - p.vx) * 0.02;
          p.vy += (p.baseVy - p.vy) * 0.02;

          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) {
            p.x = 0;
            p.vx = Math.abs(p.vx);
            p.baseVx = Math.abs(p.baseVx);
          }
          if (p.x > canvas.width) {
            p.x = canvas.width;
            p.vx = -Math.abs(p.vx);
            p.baseVx = -Math.abs(p.baseVx);
          }
          if (p.y < 0) {
            p.y = 0;
            p.vy = Math.abs(p.vy);
            p.baseVy = Math.abs(p.baseVy);
          }
          if (p.y > canvas.height) {
            p.y = canvas.height;
            p.vy = -Math.abs(p.vy);
            p.baseVy = -Math.abs(p.baseVy);
          }
        }
      }

      // Connection lines (batched for performance)
      ctx.lineWidth = 0.4;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < CONNECTION_DIST * CONNECTION_DIST) {
            const alpha = (1 - Math.sqrt(distSq) / CONNECTION_DIST) * 0.18;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,217,255,${alpha})`;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color.startsWith("#39") ? "#39FF14" : "#00D9FF";
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Mouse repulsion halo
      if (mx > 0 && my > 0) {
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, MOUSE_DIST);
        grad.addColorStop(0, "rgba(57,255,20,0.04)");
        grad.addColorStop(1, "rgba(57,255,20,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mx, my, MOUSE_DIST, 0, Math.PI * 2);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    />
  );
}
