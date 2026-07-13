"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/constants/site";
import { scrollToSection } from "@/hooks/use-lenis";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import MobileNav from "./mobile-nav";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5">
          <motion.div
            className="h-full bg-gold"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

        <div className="section-container">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("#hero")}
              className="relative z-10"
              aria-label="Ir para o início"
            >
              <span className="font-display text-xl md:text-2xl tracking-[0.06em] text-white">
                <span className="text-gold">bilico</span> Barber
              </span>
            </button>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.slice(0, 6).map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="relative text-sm text-gray hover:text-white transition-colors duration-300 font-body tracking-wide group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-3 text-white hover:text-gold transition-colors"
              aria-label="Abrir menu"
            >
              <Menu className="w-7 h-7" />
            </button>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <MobileNav onClose={() => setMobileOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
