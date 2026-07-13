"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

/* ─── Register ScrollTrigger ─── */
export function registerScrollTrigger() {
  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }
}

/* ─── GSAP Context hook for cleanup ─── */
export function useGSAPContext() {
  useEffect(() => {
    registerScrollTrigger();
    const ctx = gsap.context(() => {});
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);
}

/* ─── Initialize ScrollTrigger defaults ─── */
export function initScrollTriggerDefaults() {
  registerScrollTrigger();

  ScrollTrigger.defaults({
    toggleActions: "play none none none",
  });

  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
  });
}

/* ─── Refresh ScrollTrigger on window resize ─── */
export function useScrollTriggerRefresh() {
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
}
