"use client";

import { useEffect, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-media-query";

interface FloatingElement {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  rotationDuration: number;
}

interface FloatingElementsProps {
  count?: number;
  className?: string;
  minSize?: number;
  maxSize?: number;
}

export default function FloatingElements({
  count,
  className,
  minSize = 4,
  maxSize = 12,
}: FloatingElementsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Reduce count on mobile
  const adjustedCount = useMemo(() => {
    if (typeof window === "undefined") return count || 8;
    return window.innerWidth < 768 ? Math.floor((count || 8) / 2) : count || 8;
  }, [count]);

  const elements = useMemo(() => {
    return Array.from({ length: adjustedCount }, (_, i) => ({
      id: i,
      size: Math.random() * (maxSize - minSize) + minSize,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2,
      rotationDuration: Math.random() * 10 + 10,
    }));
  }, [adjustedCount, minSize, maxSize]);

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const container = containerRef.current;

    elements.forEach((el) => {
      const dot = document.createElement("div");
      dot.className = "absolute rounded-full pointer-events-none";
      dot.style.width = `${el.size}px`;
      dot.style.height = `${el.size}px`;
      dot.style.left = `${el.x}%`;
      dot.style.top = `${el.y}%`;
      dot.style.background =
        el.id % 3 === 0
          ? "rgba(212, 175, 55, 0.15)"
          : el.id % 3 === 1
          ? "rgba(255, 255, 255, 0.05)"
          : "rgba(212, 175, 55, 0.08)";
      dot.style.boxShadow =
        el.id % 3 === 0
          ? "0 0 10px rgba(212, 175, 55, 0.1)"
          : "none";
      dot.style.animation = `float-slow ${el.duration}s ease-in-out ${el.delay}s infinite`;
      container.appendChild(dot);
    });

    return () => {
      container.innerHTML = "";
    };
  }, [elements, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
      aria-hidden="true"
    />
  );
}
