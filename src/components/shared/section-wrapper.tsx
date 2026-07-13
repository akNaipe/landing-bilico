"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { SectionWrapperProps } from "@/types/sections";

export default function SectionWrapper({
  id,
  className,
  children,
  containerClassName,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      data-section={id}
      className={cn(
        "relative py-16 md:py-20 lg:py-28 overflow-hidden",
        className
      )}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-transparent pointer-events-none" />

      <motion.div
        className={cn(
          "section-container relative z-10",
          containerClassName
        )}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {children}
      </motion.div>
    </section>
  );
}
