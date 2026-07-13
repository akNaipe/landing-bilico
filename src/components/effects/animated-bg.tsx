"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-media-query";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  opacitySpeed: number;
  hue: number; // 0 = gold, 120 = white-ish
}

export default function AnimatedBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  // Ref pra evitar que o useEffect limpe/reinicie a animação
  // quando useMediaQuery resolver assincronamente
  const reducedMotionRef = useRef(reducedMotion);
  reducedMotionRef.current = reducedMotion;

  useEffect(() => {
    if (reducedMotionRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let mouseX = 0;
    let mouseY = 0;
    let time = 0;

    const PARTICLE_COUNT = 60;

    const resize = () => {
      const dpr = 1.5;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      initParticles();
    };

    const initParticles = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3 - 0.1,
        opacity: Math.random() * 0.5 + 0.1,
        opacitySpeed: (Math.random() * 0.005 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
        hue: Math.random() * 40 + 35, // gold range: 35-75
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ─── Subtle gradient mesh que se move ───
      const gradient1 = ctx.createRadialGradient(
        canvas.width * (0.5 + Math.sin(time * 0.005) * 0.15),
        canvas.height * (0.3 + Math.cos(time * 0.007) * 0.1),
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.7
      );
      gradient1.addColorStop(0, "rgba(212, 175, 55, 0.03)");
      gradient1.addColorStop(0.4, "rgba(212, 175, 55, 0.015)");
      gradient1.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const gradient2 = ctx.createRadialGradient(
        canvas.width * (0.7 + Math.cos(time * 0.004) * 0.1),
        canvas.height * (0.8 + Math.sin(time * 0.006) * 0.08),
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.5
      );
      gradient2.addColorStop(0, "rgba(255, 255, 255, 0.02)");
      gradient2.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ─── Connecting lines ───
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
            ctx.stroke();
          }
        }
      }

      // ─── Particles ───
      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += p.opacitySpeed;

        // Apply gentle mouse influence
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          p.x -= dx * 0.002;
          p.y -= dy * 0.002;
        }

        // Wrap around
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // Bounce opacity
        if (p.opacity > 0.6 || p.opacity < 0.05) {
          p.opacitySpeed *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 55%, ${p.opacity})`;
        ctx.fill();
      }

      time++;
      animationId = requestAnimationFrame(draw);
    };

    // Mouse tracking — subtle
    const handleMouse = (e: MouseEvent) => {
      mouseX = e.clientX * (canvas.width / window.innerWidth);
      mouseY = e.clientY * (canvas.height / window.innerHeight);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouse);
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []); // ⚠️ Roda uma vez. Usa ref pra ler reducedMotion.

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
