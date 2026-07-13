"use client";

import { motion } from "framer-motion";
import { Search, CalendarCheck, MapPin, Star } from "lucide-react";
import { processSteps } from "@/constants/process";
import SectionWrapper from "@/components/shared/section-wrapper";
import SectionTitle from "@/components/shared/section-title";
import { staggerContainer, fadeIn } from "@/animations/framer-variants";
import type { ProcessStep } from "@/types";

const iconMap: Record<string, React.ReactNode> = {
  Search: <Search className="w-5 h-5" />,
  CalendarCheck: <CalendarCheck className="w-5 h-5" />,
  MapPin: <MapPin className="w-5 h-5" />,
  Star: <Star className="w-5 h-5" />,
};

function ProcessStepCard({
  step,
  isLast,
}: {
  step: ProcessStep;
  isLast: boolean;
}) {
  return (
    <motion.div
      variants={fadeIn}
      className="relative flex items-start gap-4 md:gap-6 group"
    >
      {/* Step Number + Line */}
      <div className="flex flex-col items-center">
        <div className="relative z-10 w-10 h-10 md:w-14 md:h-14 rounded-full glass-gold flex items-center justify-center group-hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] transition-all duration-500">
          <span className="text-gold font-display text-base md:text-xl">
            {step.step}
          </span>
        </div>
        {!isLast && (
          <div className="w-px flex-1 min-h-[3rem] bg-gradient-to-b from-gold/30 to-transparent mt-2" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-6 md:pb-12">
        <div className="glass rounded-2xl p-4 md:p-6 group-hover:border-gold/15 transition-all duration-500">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-gold w-5 h-5">{iconMap[step.icon]}</span>
            <h3 className="font-display text-xl md:text-2xl text-white" style={{ lineHeight: 1.2 }}>
              {step.title}
            </h3>
          </div>
          <p className="text-gray text-sm md:text-base font-body leading-relaxed ml-8">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Process() {
  return (
    <SectionWrapper id="process">
      <SectionTitle
        title="Como Funciona"
        subtitle="Quatro passos simples para transformar seu visual."
      />

      <motion.div
        className="max-w-2xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {processSteps.map((step, index) => (
          <ProcessStepCard
            key={step.id}
            step={step}
            isLast={index === processSteps.length - 1}
          />
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
