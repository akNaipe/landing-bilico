"use client";

import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-media-query";

interface Particle {
  el: HTMLDivElement;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

interface ParticleFieldProps {
  count?: number;
  className?: string;
  color?: string;
  interactive?: boolean;
}

export default function ParticleField({
  count = 30,
  className,
  color = "rgba(212, 175, 55",
  interactive = true,
}: ParticleFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();

  // Generate seed data (stable across renders)
  const seedData = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      size: Math.random() * 4 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.1,
    }));
  }, [count]);

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const container = containerRef.current;
    const particles: Particle[] = [];

    seedData.forEach((data) => {
      const el = document.createElement("div");
      el.className = "absolute rounded-full pointer-events-none";
      el.style.width = `${data.size}px`;
      el.style.height = `${data.size}px`;
      el.style.background = `${color}, 0.4)`;
      el.style.boxShadow = `0 0 ${data.size * 2}px ${color}, 0.2)`;
      el.style.left = `${data.x}%`;
      el.style.top = `${data.y}%`;
      el.style.opacity = String(data.opacity);
      container.appendChild(el);

      particles.push({
        el,
        x: data.x,
        y: data.y,
        size: data.size,
        speedX: data.speedX,
        speedY: data.speedY,
        opacity: data.opacity,
      });
    });

    particlesRef.current = particles;

    const animate = () => {
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Mouse interaction
        if (interactive) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 15) {
            p.x -= dx * 0.02;
            p.y -= dy * 0.02;
          }
        }

        // Wrap around
        if (p.x < -5) p.x = 105;
        if (p.x > 105) p.x = -5;
        if (p.y < -5) p.y = 105;
        if (p.y > 105) p.y = -5;

        gsap.set(p.el, {
          x: `${p.x}%`,
          y: `${p.y}%`,
          opacity: p.opacity,
        });
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    // Track mouse
    const handleMouse = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      };
    };

    if (interactive) {
      window.addEventListener("mousemove", handleMouse);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (interactive) window.removeEventListener("mousemove", handleMouse);
      particles.forEach((p) => p.el.remove());
      particlesRef.current = [];
    };
  }, [seedData, color, interactive, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
      aria-hidden="true"
    />
  );
}
