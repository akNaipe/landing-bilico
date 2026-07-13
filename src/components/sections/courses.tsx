"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Scissors,
  Clock,
  BookOpen,
  User,
  LockKeyhole,
} from "lucide-react";
import { courses } from "@/constants/courses";
import SectionTitle from "@/components/shared/section-title";
import { fadeIn } from "@/animations/framer-variants";
import { useReducedMotion } from "@/hooks/use-media-query";
import type { Course } from "@/types";

const iconMap: Record<string, React.ReactNode> = {
  Scissors: <Scissors className="w-6 h-6" />,
};

const levelColors: Record<string, string> = {
  Iniciante: "text-green-400 border-green-400/20 bg-green-400/5",
  Intermediário: "text-yellow-400 border-yellow-400/20 bg-yellow-400/5",
  Avançado: "text-red-400 border-red-400/20 bg-red-400/5",
};

function CourseCard({ course }: { course: Course }) {
  return (
    <motion.div variants={fadeIn} className="max-w-lg mx-auto w-full">
      <div className="glass rounded-2xl p-6 md:p-8 text-center group hover:border-gold/20 transition-all duration-500">
        {/* Icon */}
        <div className="w-16 h-16 rounded-xl glass flex items-center justify-center text-gold mx-auto mb-5">
          {iconMap[course.icon] || <BookOpen className="w-6 h-6" />}
        </div>

        {/* Status badge */}
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-body tracking-wide uppercase border font-medium text-blue-400 border-blue-400/20 bg-blue-400/10 mb-4">
          {course.status}
        </span>

        <h3 className="font-display text-2xl md:text-3xl text-white tracking-wide mb-3">
          {course.name}
        </h3>
        <p className="text-gray text-sm font-body leading-relaxed mb-5">
          {course.description}
        </p>

        {/* Details */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6 pt-4 border-t border-white/5">
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

        {/* Locked indicator */}
        <div className="w-full py-3 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-center gap-2 text-gray-dark text-xs font-body">
          <LockKeyhole className="w-3.5 h-3.5" />
          Em breve
        </div>
      </div>
    </motion.div>
  );
}

export default function Courses() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 60, filter: "blur(8px)" },
          {
            opacity: 1, y: 0, filter: "blur(0px)",
            duration: 1, ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (cardContainerRef.current) {
        gsap.fromTo(
          cardContainerRef.current,
          { opacity: 0, y: 80, rotateX: -15, scale: 0.9, filter: "blur(8px)" },
          {
            opacity: 1, y: 0, rotateX: 0, scale: 1, filter: "blur(0px)",
            duration: 1.4, ease: "power4.out",
            scrollTrigger: {
              trigger: cardContainerRef.current,
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-transparent pointer-events-none" />

      <div className="section-container relative z-10">
        <div ref={titleRef}>
          <SectionTitle
            title="Cursos & Formação"
            subtitle="Aprenda técnicas profissionais com quem entende do ofício. Transforme sua paixão em carreira."
          />
        </div>

        <div ref={cardContainerRef}>
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
