"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import {
  Scissors,
  FlipVertical,
  Ruler,
  Thermometer,
  Sparkles,
  Droplets,
  ExternalLink,
} from "lucide-react";
import { services } from "@/constants/services";
import SectionTitle from "@/components/shared/section-title";
import GlassCard from "@/components/shared/glass-card";
import { fadeIn } from "@/animations/framer-variants";
import { tilt3D } from "@/animations/gsap-animations";
import { useReducedMotion, useIsTouchDevice } from "@/hooks/use-media-query";
import type { Service } from "@/types";

const iconMap: Record<string, React.ReactNode> = {
  Scissors: <Scissors />,
  FlipVertical: <FlipVertical />,
  Ruler: <Ruler />,
  Thermometer: <Thermometer />,
  Sparkles: <Sparkles />,
  Droplets: <Droplets />,
};

function ServiceCard({ service }: { service: Service }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    if (cardRef.current && !reducedMotion && !isTouch) {
      return tilt3D(cardRef.current, { maxTilt: 4, scale: 1.02, speed: 0.3 });
    }
  }, [reducedMotion, isTouch]);

  return (
    <motion.div variants={fadeIn} className="group">
      <GlassCard ref={cardRef} className="h-full flex flex-col overflow-hidden p-0" glow>
        {/* Image */}
        <div ref={imageContainerRef} className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src={service.image || ""}
            alt={service.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Icon overlay */}
          <div className="absolute top-4 left-4 w-10 h-10 rounded-xl glass flex items-center justify-center text-gold">
            {iconMap[service.icon] || <Scissors className="w-5 h-5" />}
          </div>

          {/* Instagram badge */}
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full glass flex items-center gap-1.5 text-[10px] text-gray font-body tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            Instagram
          </div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6 flex flex-col flex-1">
          <h3 className="font-display text-2xl text-white tracking-wide mb-2" style={{ lineHeight: 1.15 }}>
            {service.name}
          </h3>
          <p className="text-gray text-sm font-body leading-relaxed flex-1">
            {service.description}
          </p>

          <a
            href="https://instagram.com/bilicobarber"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-gold text-xs font-subtitle font-medium tracking-wide uppercase hover:text-gold-light transition-colors group/link"
          >
            Ver no Instagram
            <ExternalLink className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5" />
          </a>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      // Title entrance
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 60, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Cards stagger in
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".service-card-wrapper");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 80, rotateX: -15, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 1,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 75%",
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
      id="services"
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-transparent pointer-events-none" />

      <div className="section-container relative z-10">
        <div ref={titleRef}>
          <SectionTitle
            title="Meus Trabalhos"
            subtitle="Artes e resultados compartilhados no Instagram. Cada corte é uma assinatura."
          />
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {services.map((service) => (
            <div key={service.id} className="service-card-wrapper">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
