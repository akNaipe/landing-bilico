"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/components/effects/magnetic-button";
import ParticleField from "@/components/effects/particle-field";
import GlowEffect from "@/components/effects/glow-effect";
import { scrollToSection } from "@/hooks/use-lenis";
import { siteConfig } from "@/constants/site";
import { useReducedMotion } from "@/hooks/use-media-query";

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // Golden line draw
      if (lineRef.current) {
        tl.fromTo(lineRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.8, ease: "power4.out" }
        );
      }

      // Headline text reveal - splitting lines
      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll(".cta-line");
        tl.fromTo(lines,
          { opacity: 0, y: 60, rotateX: -15, filter: "blur(8px)" },
          { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)", duration: 1, stagger: 0.15, ease: "power4.out" },
          "-=0.4"
        );

        // Gold gradient sweep
        tl.fromTo(
          headlineRef.current,
          { backgroundPosition: "200% center" },
          { backgroundPosition: "0% center", duration: 1.5, ease: "power2.out" },
          "-=0.6"
        );
      }

      // CTA buttons
      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll(".cta-btn");
        tl.fromTo(buttons,
          { opacity: 0, y: 40, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12, ease: "back.out(1.7)" },
          "-=0.4"
        );
      }

      // Trust markers
      if (trustRef.current) {
        const markers = trustRef.current.querySelectorAll(".trust-item");
        tl.fromTo(markers,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" },
          "-=0.2"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative flex items-center py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      <ParticleField count={50} color="rgba(212, 175, 55" />
      <GlowEffect
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        size="lg"
        intensity="medium"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-transparent pointer-events-none" />

      <div className="section-container relative z-10 text-center max-w-3xl mx-auto">
        {/* Accent line */}
        <div
          ref={lineRef}
          className="w-16 h-0.5 bg-gold mx-auto mb-8 rounded-full origin-center"
          style={{ opacity: 0, transform: "scaleX(0)" }}
        />

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1] text-white mb-6"
          style={{
            background: "linear-gradient(90deg, #D4AF37, #FFFFFF, #D4AF37)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          <span className="cta-line block">Pronto para</span>
          <span className="cta-line block gradient-gold">transformar seu visual?</span>
        </h2>

        {/* Subheadline */}
        <p className="text-gray text-base md:text-lg lg:text-xl font-body max-w-xl mx-auto mb-10 leading-relaxed">
          Agende seu horário agora e descubra por que o Bilico é o
          barbeiro preferido de quem não abre mão de estilo e qualidade.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="cta-btn" style={{ opacity: 0 }}>
            <MagneticButton
              variant="primary"
              size="lg"
              glow
              onClick={() => window.open(`https://wa.me/${siteConfig.contact.phone}`, "_blank")}
            >
              Agendar pelo WhatsApp
            </MagneticButton>
          </div>
          <div className="cta-btn" style={{ opacity: 0 }}>
            <MagneticButton
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("#services")}
            >
              Ver Todos os Serviços
            </MagneticButton>
          </div>
        </div>

        {/* Trust markers */}
        <div ref={trustRef} className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-dark font-body flex-wrap">
          <span className="trust-item" style={{ opacity: 0 }}>✦ Agendamento rápido</span>
          <span className="trust-item" style={{ opacity: 0 }}>✦ Cancele sem custo</span>
          <span className="trust-item" style={{ opacity: 0 }}>✦ 5.000+ clientes</span>
        </div>
      </div>
    </section>
  );
}
