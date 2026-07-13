"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { magneticEffect } from "@/animations/gsap-animations";
import { buttonHover } from "@/animations/framer-variants";
import { useReducedMotion, useIsTouchDevice } from "@/hooks/use-media-query";
import type { MagneticButtonProps } from "@/types/sections";

export default function MagneticButton({
  children,
  href,
  onClick,
  className,
  variant = "primary",
  size = "md",
  magnetic = true,
  ripple = true,
  glow = true,
  type = "button",
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [rippleCoords, setRippleCoords] = useState<{ x: number; y: number } | null>(null);
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();

  const variantClasses = {
    primary:
      "bg-gold text-black hover:bg-gold-light border-gold",
    outline:
      "border border-gold/40 text-white hover:bg-gold/10 hover:border-gold/70",
    ghost:
      "text-white hover:text-gold bg-transparent",
  };

  const sizeClasses = {
    sm: "px-5 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-lg",
  };

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (ripple) {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setRippleCoords({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
        setTimeout(() => setRippleCoords(null), 600);
      }

      if (href) {
        if (href.startsWith("#")) {
          e.preventDefault();
          import("@/hooks/use-lenis").then(({ scrollToSection }) => {
            scrollToSection(href);
          });
        }
      }

      onClick?.();
    },
    [ripple, href, onClick]
  );

  // Magnetic effect via GSAP
  useEffect(() => {
    if (magnetic && !reducedMotion && !isTouch) {
      const el = buttonRef.current || linkRef.current;
      return magneticEffect(el, 0.3);
    }
  }, [magnetic, reducedMotion, isTouch]);

  const content = (
    <>
      {children}
      {ripple && rippleCoords && (
        <motion.span
          className="absolute rounded-full bg-white/20 pointer-events-none"
          initial={{ width: 0, height: 0, x: rippleCoords.x, y: rippleCoords.y }}
          animate={{
            width: 300,
            height: 300,
            x: rippleCoords.x - 150,
            y: rippleCoords.y - 150,
            opacity: 0,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </>
  );

  const baseClasses = cn(
    "relative overflow-hidden inline-flex items-center justify-center gap-2",
    "font-subtitle font-semibold tracking-wide",
    "rounded-xl transition-all duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    "select-none",
    variantClasses[variant],
    sizeClasses[size],
    glow && "hover:shadow-[0_0_25px_rgba(212,175,55,0.3)]",
    className
  );

  if (href && !href.startsWith("#")) {
    return (
      <a
        ref={linkRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onClick={handleClick}
      className={baseClasses}
      variants={!reducedMotion ? buttonHover : undefined}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
    >
      {content}
    </motion.button>
  );
}
