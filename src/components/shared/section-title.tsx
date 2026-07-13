"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeIn, fadeInLeft } from "@/animations/framer-variants";
import type { SectionTitleProps } from "@/types/sections";

export default function SectionTitle({
  title,
  subtitle,
  align = "center",
  className,
  goldAccent = true,
}: SectionTitleProps) {
  return (
    <motion.div
      className={cn(
        "mb-10 md:mb-14 max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {goldAccent && (
        <motion.div
          className={cn(
            "w-16 h-0.5 bg-gold mb-6 rounded-full",
            align === "center" ? "mx-auto" : ""
          )}
          variants={fadeInLeft}
        />
      )}

      <motion.h2
        className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] uppercase mb-4"
        variants={fadeIn}
      >
        {goldAccent ? (
          <>
            <span className="gradient-gold">{title}</span>
          </>
        ) : (
          title
        )}
      </motion.h2>

      {subtitle && (
        <motion.p
          className="text-gray text-base md:text-lg font-body leading-relaxed max-w-2xl mx-auto"
          variants={fadeIn}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
