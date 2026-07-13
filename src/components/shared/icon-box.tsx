"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { iconBounce } from "@/animations/framer-variants";
import type { IconBoxProps } from "@/types/sections";
import { useReducedMotion } from "@/hooks/use-media-query";

export default function IconBox({
  icon,
  size = "md",
  className,
  animated = true,
}: IconBoxProps) {
  const reducedMotion = useReducedMotion();

  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-16 h-16",
  };

  const iconSizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <motion.div
      className={cn(
        "glass flex items-center justify-center rounded-xl text-gold",
        sizeClasses[size],
        className
      )}
      whileHover={
        !reducedMotion && animated
          ? iconBounce.hover
          : undefined
      }
    >
      <div className={cn("flex items-center justify-center", iconSizeClasses[size])}>
        {icon}
      </div>
    </motion.div>
  );
}
