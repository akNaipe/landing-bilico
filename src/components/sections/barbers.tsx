"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Camera, Globe2 } from "lucide-react";
import { barbers } from "@/constants/barbers";
import SectionWrapper from "@/components/shared/section-wrapper";
import SectionTitle from "@/components/shared/section-title";
import { fadeIn } from "@/animations/framer-variants";
import { tilt3D } from "@/animations/gsap-animations";
import { useReducedMotion, useIsTouchDevice } from "@/hooks/use-media-query";
import type { Barber } from "@/types";

function BarberCard({ barber }: { barber: Barber }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    if (cardRef.current && !reducedMotion && !isTouch) {
      return tilt3D(cardRef.current, { maxTilt: 3, scale: 1.01, speed: 0.3 });
    }
  }, [reducedMotion, isTouch]);

  return (
    <motion.div variants={fadeIn} className="max-w-lg mx-auto">
      <div
        ref={cardRef}
        className="glass rounded-2xl p-6 md:p-10 text-center group hover:border-gold/20 transition-all duration-500"
        style={{ perspective: "1000px" }}
      >
        {/* Avatar com anéis decorativos */}
        <div ref={avatarRef} className="relative mx-auto mb-6 md:mb-8 w-32 h-32 md:w-44 md:h-44">
          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-gold/20 group-hover:border-gold/50 transition-all duration-500">
            <Image
              src={barber.image}
              alt={barber.name}
              fill
              className="object-cover"
              sizes="176px"
            />
          </div>

          <div className="absolute inset-0 rounded-full border border-gold/0 group-hover:border-gold/20 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.2)] transition-all duration-500" />

          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 176 176">
            <circle
              cx="88" cy="88" r="84"
              fill="none" stroke="rgba(212,175,55,0.1)" strokeWidth="1" strokeDasharray="4 4"
            />
          </svg>
        </div>

        {/* Info */}
        <div ref={infoRef}>
          <h3 className="font-display text-3xl md:text-5xl text-white mb-2" style={{ lineHeight: 1.1 }}>
            {barber.name}
          </h3>
          <p className="text-gold text-base font-subtitle font-medium mb-4">
            {barber.role}
          </p>
          <p className="text-gray text-sm md:text-base font-body leading-relaxed max-w-md mx-auto mb-6">
            {barber.bio}
          </p>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {barber.specialties.map((spec) => (
            <span
              key={spec}
              className="px-3 py-1 text-xs font-body text-gray-dark border border-white/5 rounded-full"
            >
              {spec}
            </span>
          ))}
        </div>

        {/* Social */}
        <div className="flex items-center justify-center gap-3">
          {barber.social.instagram && (
            <a
              href={`https://instagram.com/${barber.social.instagram}`}
              target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray hover:text-gold hover:border-gold/30 transition-all duration-300"
              aria-label={`Instagram ${barber.name}`}
            >
              <Camera className="w-4 h-4" />
            </a>
          )}
          {barber.social.linkedin && (
            <a
              href={`https://linkedin.com/${barber.social.linkedin}`}
              target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray hover:text-gold hover:border-gold/30 transition-all duration-300"
              aria-label={`LinkedIn ${barber.name}`}
            >
              <Globe2 className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Barbers() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      // Card reveal: swoop in from bottom with rotation
      if (cardContainerRef.current) {
        gsap.fromTo(
          cardContainerRef.current,
          { opacity: 0, y: 100, rotateX: -20, scale: 0.9, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "power4.out",
            scrollTrigger: {
              trigger: cardContainerRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Avatar ring rotation animation
      if (cardContainerRef.current) {
        const svgRings = cardContainerRef.current.querySelectorAll("svg circle");
        gsap.to(svgRings, {
          strokeDashoffset: -300,
          duration: 20,
          repeat: -1,
          ease: "none",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <SectionWrapper id="barbers">
      <SectionTitle
        title="O Mestre Barbeiro"
        subtitle="Conheça o profissional por trás de cada transformação."
      />

      <div ref={cardContainerRef}>
        {barbers.map((barber) => (
          <BarberCard key={barber.id} barber={barber} />
        ))}
      </div>
    </SectionWrapper>
  );
}
