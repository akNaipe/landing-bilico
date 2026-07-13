"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "@/constants/site";
import { scrollToSection } from "@/hooks/use-lenis";
import MagneticButton from "@/components/effects/magnetic-button";
import FloatingElements from "@/components/effects/floating-elements";
import GlowEffect from "@/components/effects/glow-effect";
import AnimatedBg from "@/components/effects/animated-bg";
import { useReducedMotion } from "@/hooks/use-media-query";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const goldLineRef = useRef<HTMLDivElement>(null);
  const glowOrbRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [isClient, setIsClient] = useState(false);
  // Ref mantém o valor SEM causar efeito colateral quando muda.
  // Isso impede que o useEffect do GSAP seja limpo/re-executado
  // quando o useMediaQuery resolver assincronamente de false → true.
  const reducedMotionRef = useRef(reducedMotion);
  reducedMotionRef.current = reducedMotion;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (reducedMotionRef.current || !sectionRef.current) return;

    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // ─── BACKGROUND REVEAL ───
      tl.fromTo(
        backgroundRef.current,
        { scale: 1.4, opacity: 0, filter: "blur(20px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.8, ease: "power2.out" }
      );

      // ─── GLOW ORB ───
      if (glowOrbRef.current) {
        tl.fromTo(
          glowOrbRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2, ease: "back.out(2)" },
          "-=1.2"
        );
      }

      // ─── GOLDEN LINE ───
      if (goldLineRef.current) {
        tl.fromTo(
          goldLineRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1, ease: "power4.out" },
          "-=0.6"
        );
      }

      // ─── BADGE ───
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { y: -60, opacity: 0, rotateX: -20 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1, ease: "bounce.out" },
          "-=0.4"
        );
      }

      // ─── TITLE CHARACTER EXPLOSION ───
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll(".hero-char");
        tl.fromTo(
          chars,
          { opacity: 0, y: 120, rotateX: -70, scale: 0.5, filter: "blur(10px)" },
          {
            opacity: 1, y: 0, rotateX: 0, scale: 1, filter: "blur(0px)",
            duration: 1, stagger: 0.025, ease: "elastic.out(1, 0.6)",
          },
          "-=0.3"
        );
      }

      // ─── SUBTITLE ───
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 50, rotateX: -15, filter: "blur(6px)" },
          { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)", duration: 1.2, ease: "power4.out" },
          "-=0.6"
        );
      }

      // ─── CTAS ───
      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll(".hero-cta");
        tl.fromTo(
          buttons,
          { opacity: 0, y: 60, scale: 0.7, rotateX: -20 },
          { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 0.9, stagger: 0.15, ease: "back.out(1.7)" },
          "-=0.4"
        );
      }

      // ─── SCROLL INDICATOR ───
      if (scrollRef.current) {
        tl.fromTo(
          scrollRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.2"
        );
      }

      // ─── BG PARALLAX ───
      if (backgroundRef.current) {
        gsap.to(backgroundRef.current, {
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []); // ⚠️ Sempre executado uma vez. Usa ref pra ler reducedMotion.

  const splitTitle = (text: string, isClient: boolean) => {
    if (!isClient) {
      // Server: render unsplit to match initial hydration
      return <>{text}</>;
    }
    return text.split("").map((char, i) => (
      <span key={i} className="hero-char inline-block" style={{ opacity: 0 }}>
        {char === "\n" ? <br /> : char === " " ? " " : char}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen min-h-[500px] md:min-h-[600px] max-h-[900px] flex items-center justify-center overflow-hidden"
    >
      {/* ─── BACKGROUND BASE ─── */}
      <div ref={backgroundRef} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-graphite to-black" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
      </div>

      {/* ─── CANVAS ANIMADO (PARTÍCULAS + MESH) ─── */}
      <AnimatedBg />

      {/* Orbes abstratos por cima das partículas */}
      <div className="absolute top-1/4 -left-20 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-br from-gold/5 via-transparent to-transparent blur-[100px] md:blur-[150px] animate-pulse-glow pointer-events-none z-[2]" />
      <div className="absolute bottom-1/4 -right-20 w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-tl from-gold/3 via-transparent to-transparent blur-[80px] md:blur-[120px] animate-float-slow pointer-events-none z-[2]" />

      {/* ─── GLOW ORB ─── */}
      <div ref={glowOrbRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2]">
        <GlowEffect size="lg" intensity="medium" />
      </div>

      {/* ─── PARTICLES ─── */}
      <FloatingElements count={20} className="z-[2]" minSize={3} maxSize={10} />

      {/* ─── CONTENT ─── */}
      <div className="relative z-10 section-container text-center">
        {/* Gold line */}
        <div
          ref={goldLineRef}
          className="w-20 h-0.5 bg-gold mx-auto mb-6 rounded-full origin-center"
          style={{ opacity: 0, transform: "scaleX(0)" }}
        />

        {/* Badge */}
        <div ref={badgeRef} className="mb-5" style={{ opacity: 0 }}>
          <span className="inline-block px-5 py-2 text-[10px] md:text-xs tracking-[0.25em] uppercase text-gold font-subtitle font-medium border border-gold/20 rounded-full glass">
            ✦ Premium Barbershop desde 2009 ✦
          </span>
        </div>

        {/* ─── HEADLINE ─── */}
        <h1
          ref={titleRef}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] leading-[1] text-white mb-6"
        >
          {reducedMotion ? (
            <>O CORTE PERFEITO<br />COMEÇA AQUI.</>
          ) : (
            splitTitle("O CORTE PERFEITO\nCOMEÇA AQUI.", isClient)
          )}
        </h1>

        {/* ─── SUBHEADLINE ─── */}
        <p
          ref={subtitleRef}
          className="text-gray text-base md:text-lg lg:text-xl font-body max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ opacity: 0 }}
        >
          {siteConfig.heroSubheadline}
        </p>

        {/* ─── CTAs ─── */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="hero-cta" style={{ opacity: 0 }}>
            <MagneticButton variant="primary" size="lg" glow onClick={() => window.open(`https://wa.me/${siteConfig.contact.phone}`, "_blank")}>
              Agendar Horário
            </MagneticButton>
          </div>
          <div className="hero-cta" style={{ opacity: 0 }}>
            <MagneticButton variant="outline" size="lg" onClick={() => scrollToSection("#about")}>
              Conheça a Barbearia
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* ─── SCROLL INDICATOR ─── */}
      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" style={{ opacity: 0 }}>
        <button
          onClick={() => scrollToSection("#about")}
          className="flex flex-col items-center gap-2 text-gray hover:text-gold transition-colors group"
          aria-label="Rolar para baixo"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase font-body text-gray-dark group-hover:text-gold/50 transition-colors">
            Role
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </button>
      </div>
    </section>
  );
}
