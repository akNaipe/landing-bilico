"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassCard from "@/components/shared/glass-card";
import AnimatedCounter from "@/components/shared/animated-counter";
import SectionTitle from "@/components/shared/section-title";
import { useReducedMotion } from "@/hooks/use-media-query";
import type { CounterData } from "@/types";

const counters: CounterData[] = [
  { value: 5000, suffix: "+", label: "Clientes Satisfeitos" },
  { value: 15, suffix: " Anos", label: "de Experiência" },
  { value: 5, prefix: "★", label: "Avaliação Média" },
  { value: 100, suffix: "%", label: "Recomendação" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      // Image reveal with clip
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { clipPath: "inset(0 0 100% 0)", y: 80 },
          {
            clipPath: "inset(0 0 0 0)",
            y: 0,
            duration: 1.4,
            ease: "power4.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Floating badge entrance
      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          { scale: 0, rotate: -180, opacity: 0 },
          {
            scale: 1,
            rotate: 0,
            opacity: 1,
            duration: 1.2,
            ease: "elastic.out(1, 0.6)",
            scrollTrigger: {
              trigger: badgeRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Text slide in
      if (textRef.current) {
        const paragraphs = textRef.current.querySelectorAll("p");
        gsap.fromTo(
          paragraphs,
          { opacity: 0, x: 60, filter: "blur(6px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Counters stagger
      if (countersRef.current) {
        const items = countersRef.current.querySelectorAll(".counter-item");
        gsap.fromTo(
          items,
          { opacity: 0, y: 40, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: countersRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-transparent pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* ─── IMAGE SIDE ─── */}
          <div ref={imageRef} className="relative">
            <GlassCard variant="gold" className="p-0 overflow-hidden aspect-[4/5]">
              <Image
                src="/images/about.jpg"
                alt="Bilico Barber"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </GlassCard>

            {/* Floating badge */}
            <div
              ref={badgeRef}
              className="absolute -bottom-4 -right-4 w-24 h-24 md:w-28 md:h-28 rounded-full bg-gold flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.3)] max-sm:-bottom-2 max-sm:-right-2 max-sm:w-20 max-sm:h-20"
            >
              <div className="text-center">
                <span className="block font-display text-xl max-sm:text-lg text-black leading-none">
                  5K+
                </span>
                <span className="block text-[10px] max-sm:text-[8px] text-black/70 font-subtitle font-medium">
                  CLIENTES
                </span>
              </div>
            </div>
          </div>

          {/* ─── TEXT SIDE ─── */}
          <div ref={textRef}>
            <SectionTitle
              title="Nossa História"
              subtitle="Tradição e estilo se encontram em cada corte."
              align="left"
              className="mb-0"
            />

            <div className="space-y-4 mb-10 text-gray font-body text-sm md:text-base leading-relaxed">
              <p>
                Desde 2009, o <strong className="text-white">Bilico</strong> vem
                redefinindo o conceito de barbearia masculina. Mais que um corte de
                cabelo, oferecemos uma experiência completa de cuidado e estilo.
              </p>
            </div>

            {/* Counters */}
            <div ref={countersRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {counters.map((counter) => (
                <div key={counter.label} className="counter-item">
                  <AnimatedCounter
                    value={counter.value}
                    suffix={counter.suffix}
                    prefix={counter.prefix}
                    label={counter.label}
                    duration={2}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
