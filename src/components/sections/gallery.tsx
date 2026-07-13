"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "lucide-react";
import SectionWrapper from "@/components/shared/section-wrapper";
import SectionTitle from "@/components/shared/section-title";
import { fadeInScale } from "@/animations/framer-variants";
import { useReducedMotion } from "@/hooks/use-media-query";

const galleryItems = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  src: `/images/gallery/gallery-${i + 1}.jpg`,
  alt: `Galeria bilico Barber ${i + 1}`,
}));

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const items = gridRef.current.querySelectorAll(".gallery-item");
        gsap.fromTo(
          items,
          { opacity: 0, y: 60, scale: 0.85, rotateX: -10 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <SectionWrapper id="gallery">
      <SectionTitle
        title="Galeria"
        subtitle="Veja o resultado do nosso trabalho."
      />

      <div
        ref={gridRef}
        className="columns-1 sm:columns-2 lg:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4"
      >
        {galleryItems.map((item, index) => (
          <motion.button
            key={item.id}
            className="gallery-item group relative overflow-hidden rounded-xl w-full break-inside-avoid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
            onClick={() => setSelectedImage(index)}
            variants={fadeInScale}
          >
            <div className="relative w-full overflow-hidden rounded-xl"
              style={{ minHeight: index % 2 === 0 ? "14rem" : "12rem" }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl">
              <div className="scale-0 group-hover:scale-100 transition-transform duration-300">
                <span className="text-white font-subtitle text-sm font-medium px-4 py-2 border border-white/20 rounded-full glass backdrop-blur-md">
                  Ampliar foto
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-2xl"
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-[4/3] md:aspect-[16/10]">
                <Image
                  src={galleryItems[selectedImage].src}
                  alt={galleryItems[selectedImage].alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  priority
                />
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-3 text-white hover:text-gold bg-black/60 hover:bg-black/80 rounded-full transition-all backdrop-blur-sm border border-white/10"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
