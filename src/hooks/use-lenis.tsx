"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ─── Detect iOS Safari ─── */
const isIOS = typeof navigator !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
  !(window as unknown as Record<string, boolean>).MSStream;

/* ─── Lenis instance singleton ─── */
let globalLenis: Lenis | null = null;
let rafId: number | null = null;

function startLenis() {
  if (globalLenis) return;

  gsap.registerPlugin(ScrollTrigger);

  // iOS: native scroll is smoother — disable Lenis smooth wheel
  globalLenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    wheelMultiplier: 1,
    smoothWheel: !isIOS,
    orientation: "vertical",
    gestureOrientation: "vertical",
    touchMultiplier: isIOS ? 1 : 1.5,
  });

  globalLenis.on("scroll", () => {
    ScrollTrigger.update();
  });

  const raf = (time: number) => {
    globalLenis?.raf(time);
    rafId = requestAnimationFrame(raf);
  };

  rafId = requestAnimationFrame(raf);
}

function destroyLenis() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  if (globalLenis) {
    globalLenis.destroy();
    globalLenis = null;
  }
  ScrollTrigger.getAll().forEach((st) => st.kill());
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    startLenis();
    return () => destroyLenis();
  }, [isClient]);

  return <>{children}</>;
}

export function scrollToSection(href: string) {
  if (typeof window === "undefined") return;

  const target = href.startsWith("#") ? href.substring(1) : href;
  const element = document.getElementById(target);

  if (element && globalLenis) {
    globalLenis.scrollTo(element, {
      offset: -80,
      duration: 1.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  }
}
