"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-media-query";

interface GlowEffectProps {
  className?: string;
  color?: string;
  size?: "sm" | "md" | "lg";
  intensity?: "subtle" | "medium" | "strong";
}

export default function GlowEffect({
  className,
  color = "rgba(212, 175, 55",
  size = "md",
  intensity = "medium",
}: GlowEffectProps) {
  const glowRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const sizeClasses = {
    sm: "w-32 h-32 md:w-48 md:h-48",
    md: "w-48 h-48 md:w-72 md:h-72",
    lg: "w-64 h-64 md:w-96 md:h-96",
  };

  const intensityValues = {
    subtle: 0.08,
    medium: 0.15,
    strong: 0.25,
  };

  useEffect(() => {
    if (reducedMotion || !glowRef.current) return;

    gsap.to(glowRef.current, {
      scale: 1.2,
      opacity: intensityValues[intensity] * 0.6,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, [reducedMotion, intensity]);

  if (reducedMotion) return null;

  return (
    <div className={cn("absolute -z-10", className)} aria-hidden="true">
      <div
        ref={glowRef}
        className={cn(
          "rounded-full blur-[100px]",
          sizeClasses[size]
        )}
        style={{
          background: `radial-gradient(circle, ${color}, 0.3) 0%, ${color}, 0.05) 60%, transparent 70%)`,
          opacity: intensityValues[intensity],
        }}
      />
    </div>
  );
}
