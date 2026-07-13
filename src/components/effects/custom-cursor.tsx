"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { useIsTouchDevice } from "@/hooks/use-media-query";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
    }
    if (followerRef.current) {
      gsap.to(followerRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  }, []);

  const onMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const isClickable =
      target.closest("a") ||
      target.closest("button") ||
      target.closest('[role="button"]');

    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: isClickable ? 1.8 : 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
    if (followerRef.current) {
      gsap.to(followerRef.current, {
        scale: isClickable ? 2.5 : 1,
        opacity: isClickable ? 0.15 : 0.08,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, []);

  const onMouseOut = useCallback(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
    if (followerRef.current) {
      gsap.to(followerRef.current, {
        scale: 1,
        opacity: 0.08,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, []);

  useEffect(() => {
    if (isTouch) return;

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [isTouch, onMouseMove, onMouseOver, onMouseOut]);

  if (isTouch) return null;

  return (
    <>
      {/* Cursor Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-gold rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          transform: "translate(-50%, -50%)",
        }}
      />
      {/* Cursor Follower */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 bg-gold rounded-full pointer-events-none z-[9998] opacity-[0.08] hidden md:block"
        style={{
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
}
