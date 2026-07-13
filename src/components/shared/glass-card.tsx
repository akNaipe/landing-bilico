"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { GlassCardProps } from "@/types/sections";
import { useReducedMotion } from "@/hooks/use-media-query";

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      children,
      className,
      variant = "default",
      tilt = false,
      glow = false,
      ...props
    },
    ref
  ) => {
    const reducedMotion = useReducedMotion();

    return (
      <motion.div
        ref={ref}
        className={cn(
          "glass-card glass-reflection relative rounded-2xl p-6 md:p-8",
          variant === "gold" && "glass-card-gold",
          glow && "hover:glow-gold-strong",
          tilt && !reducedMotion && "perspective-[1000px]",
          className
        )}
        whileHover={
          !reducedMotion
            ? {
                scale: 1.015,
                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
              }
            : undefined
        }
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export default GlassCard;
