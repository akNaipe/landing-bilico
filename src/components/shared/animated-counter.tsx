"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { countUp } from "@/animations/gsap-animations";
import { useIntersection } from "@/hooks/use-intersection";
import type { AnimatedCounterProps } from "@/types/sections";

export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  label,
  duration = 2,
  className,
}: AnimatedCounterProps) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const [ref, isVisible] = useIntersection({ threshold: 0.5 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && numberRef.current && !hasAnimated.current) {
      hasAnimated.current = true;
      countUp(numberRef.current, value, duration, suffix, prefix);
    }
  }, [isVisible, value, duration, suffix, prefix]);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn("flex flex-col items-center gap-2", className)}
    >
      <span
        ref={numberRef}
        className="font-display text-3xl md:text-4xl lg:text-5xl text-gold leading-none"
      >
        0
      </span>
      <span className="text-gray text-sm md:text-base font-body text-center leading-tight">
        {label}
      </span>
    </div>
  );
}
