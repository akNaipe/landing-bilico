"use client";

import { motion } from "framer-motion";
import { navLinks, siteConfig } from "@/constants/site";
import { scrollToSection } from "@/hooks/use-lenis";
import Sheet from "@/components/ui/sheet";

interface MobileNavProps {
  onClose: () => void;
}

export default function MobileNav({ onClose }: MobileNavProps) {
  const handleNav = (href: string) => {
    onClose();
    setTimeout(() => scrollToSection(href), 100);
  };

  return (
    <Sheet open={true} onClose={onClose} side="right">
      <div className="flex flex-col h-full pt-20 px-6">
        {/* Logo */}
        <div className="mb-10 text-center">
          <span className="font-display text-2xl tracking-[0.06em] text-white">
            <span className="text-gold">bilico</span> Barber
          </span>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-2">
          {navLinks.map((link, i) => (
            <motion.button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-left py-3 px-4 text-lg text-gray hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 font-body"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              {link.label}
            </motion.button>
          ))}
        </nav>

        {/* CTA */}
        <motion.div
          className="mt-auto pb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => window.open("https://wa.me/5515996828034", "_blank")}
            className="w-full py-4 bg-gold text-black font-subtitle font-semibold rounded-xl hover:bg-gold-light transition-all"
          >
            Agendar Horário
          </button>

          <div className="mt-6 text-center text-sm text-gray font-body">
            <p>{siteConfig.contact.phone}</p>
            <p className="mt-1">{siteConfig.contact.email}</p>
          </div>
        </motion.div>
      </div>
    </Sheet>
  );
}
