"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import type { StarRatingProps } from "@/types/sections";

export default function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  showValue = false,
}: StarRatingProps) {
  const sizeClasses = {
    sm: "w-3.5 h-3.5",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }, (_, i) => (
        <Star
          key={i}
          className={cn(
            sizeClasses[size],
            i < rating
              ? "fill-gold text-gold"
              : "fill-none text-gray-dark",
            "transition-all duration-300"
          )}
        />
      ))}
      {showValue && (
        <span className="ml-1 text-gold font-subtitle text-sm">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
