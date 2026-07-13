"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Quote, User } from "lucide-react";
import { testimonials } from "@/constants/testimonials";
import SectionWrapper from "@/components/shared/section-wrapper";
import SectionTitle from "@/components/shared/section-title";
import StarRating from "@/components/shared/star-rating";
import { fadeIn } from "@/animations/framer-variants";

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
      dragFree: false,
    },
    [
      Autoplay({
        delay: 4000,
        stopOnMouseEnter: true,
        stopOnInteraction: false,
      }),
    ]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <SectionWrapper id="testimonials">
      <SectionTitle
        title="O Que Nossos Clientes Dizem"
        subtitle="A opinião de quem vive a experiência do Bilico."
      />

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6 py-4">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-4 first:pl-0"
              variants={fadeIn}
            >
              <div className="glass rounded-2xl p-6 md:p-8 h-full flex flex-col">
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-gold/30 mb-4 flex-shrink-0" />

                {/* Text */}
                <p className="text-gray font-body text-sm md:text-base leading-relaxed mb-6 flex-grow">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Stars */}
                <div className="mb-4">
                  <StarRating rating={testimonial.rating} size="sm" />
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-dark">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-subtitle font-medium">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-dark text-xs font-body">
                      Cliente bilico Barber
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={scrollPrev}
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray hover:text-gold hover:border-gold/30 transition-all duration-300"
          aria-label="Depoimento anterior"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className="w-2 h-2 rounded-full bg-white/20 hover:bg-gold/50 transition-colors duration-300"
              aria-label={`Ir para depoimento ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={scrollNext}
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray hover:text-gold hover:border-gold/30 transition-all duration-300"
          aria-label="Próximo depoimento"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </SectionWrapper>
  );
}
