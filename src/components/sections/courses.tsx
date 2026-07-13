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
  Zap,
  Droplets,
  BarChart3,
  Clock,
  BookOpen,
  User,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { courses } from "@/constants/courses";
import SectionTitle from "@/components/shared/section-title";
import GlassCard from "@/components/shared/glass-card";
import { fadeIn } from "@/animations/framer-variants";
import { tilt3D } from "@/animations/gsap-animations";
import { useReducedMotion, useIsTouchDevice } from "@/hooks/use-media-query";
import type { Course } from "@/types";

const iconMap: Record<string, React.ReactNode> = {
  Scissors: <Scissors />,
  FlipVertical: <FlipVertical />,
  Ruler: <Ruler />,
  Zap: <Zap />,
  Droplets: <Droplets />,
  BarChart3: <BarChart3 />,
};

const levelColors: Record<string, string> = {
  Iniciante: "text-green-400 border-green-400/20 bg-green-400/5",
  Intermediário: "text-yellow-400 border-yellow-400/20 bg-yellow-400/5",
  Avançado: "text-red-400 border-red-400/20 bg-red-400/5",
};

const statusStyles: Record<string, { label: string; className: string }> = {
  "Em andamento": {
    label: "Em andamento",
    className: "text-emerald-400 border-emerald-400/20 bg-emerald-400/10",
  },
  "Em breve": {
    label: "Em breve",
    className: "text-blue-400 border-blue-400/20 bg-blue-400/10",
  },
  "Disponível": {
    label: "Disponível",
    className: "text-gold border-gold/20 bg-gold/10",
  },
};

function CourseCard({ course }: { course: Course }) {
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
            src={course.image || ""}
            alt={course.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Icon overlay */}
          <div className="absolute top-4 left-4 w-10 h-10 rounded-xl glass flex items-center justify-center text-gold">
            {iconMap[course.icon] || <BookOpen className="w-5 h-5" />}
          </div>

          {/* Status badge */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-body tracking-wide uppercase border font-medium ${
                statusStyles[course.status]?.className || "text-gray border-white/10 bg-white/5"
              }`}
            >
              <span className="inline-flex items-center gap-1.5">
                {course.status === "Em andamento" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                )}
                {course.status}
              </span>
            </span>
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-body tracking-wide uppercase border font-medium ${
                levelColors[course.level] || "text-gray border-white/10 bg-white/5"
              }`}
            >
              {course.level}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6 flex flex-col flex-1">
          <h3 className="font-display text-2xl text-white tracking-wide mb-2" style={{ lineHeight: 1.15 }}>
            {course.name}
          </h3>
          <p className="text-gray text-sm font-body leading-relaxed flex-1 mb-4">
            {course.description}
          </p>

          {/* Course details */}
          <div className="flex flex-wrap items-center gap-3 mb-5 pt-3 border-t border-white/5">
            <div className="flex items-center gap-1.5 text-xs font-body text-gray-dark">
              <Clock className="w-3.5 h-3.5" />
              {course.duration}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-body text-gray-dark">
              <BookOpen className="w-3.5 h-3.5" />
              {course.modules} módulos
            </div>
            <div className="flex items-center gap-1.5 text-xs font-body text-gray-dark">
              <User className="w-3.5 h-3.5" />
              {course.instructor}
            </div>
          </div>

          <a
            href={course.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-3 bg-gold text-black font-subtitle font-semibold rounded-xl hover:bg-gold-light transition-all duration-300 text-sm group/link"
          >
            <MessageCircle className="w-4 h-4" />
            Tenho Interesse
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
          </a>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export default function Courses() {
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
        const cards = gridRef.current.querySelectorAll(".course-card-wrapper");
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
      id="courses"
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-transparent pointer-events-none" />

      <div className="section-container relative z-10">
        <div ref={titleRef}>
          <SectionTitle
            title="Cursos & Formação"
            subtitle="Aprenda técnicas profissionais com quem entende do ofício. Transforme sua paixão em carreira."
          />
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {courses.map((course) => (
            <div key={course.id} className="course-card-wrapper">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
