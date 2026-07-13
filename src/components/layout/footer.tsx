"use client";

import { motion } from "framer-motion";
import {
  Camera,
  Globe2,
  Music2,
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  Clock,
  Scissors,
} from "lucide-react";
import { siteConfig } from "@/constants/site";
import { navLinks } from "@/constants/site";

const socialIcons: Record<string, React.ReactNode> = {
  Instagram: <Camera className="w-4 h-4" />,
  Facebook: <Globe2 className="w-4 h-4" />,
  Music2: <Music2 className="w-4 h-4" />,
  MessageCircle: <MessageCircle className="w-4 h-4" />,
};

export default function Footer() {
  return (
    <footer id="contact" className="relative border-t border-white/5 bg-black overflow-hidden">
      {/* Background Glow */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/5 blur-[150px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <motion.div
        className="section-container pt-14 md:pt-20 pb-10 md:pb-14"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* ─── Top Row: Brand + Links + Contact + Hours ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Scissors className="w-5 h-5 text-gold" />
              <span className="font-display text-lg tracking-[0.06em] text-white">
                <span className="text-gold">bilico</span> Barber
              </span>
            </div>
            <p className="text-gray text-sm font-body leading-relaxed mb-5 max-w-xs">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-2">
              {siteConfig.social.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full glass flex items-center justify-center text-gray hover:text-gold hover:border-gold/30 transition-all duration-300"
                  aria-label={s.name}
                >
                  {socialIcons[s.icon] || <MessageCircle className="w-4 h-4" />}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-subtitle font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Links
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray hover:text-gold text-sm transition-colors duration-300 font-body"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-subtitle font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Contato
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`https://wa.me/${siteConfig.contact.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray hover:text-gold text-sm transition-colors duration-300 font-body"
                >
                  <Phone className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-2 text-gray hover:text-gold text-sm transition-colors duration-300 font-body"
                >
                  <Mail className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-gray hover:text-gold text-sm transition-colors duration-300 font-body"
                >
                  <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="break-words leading-tight">{siteConfig.contact.address}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-subtitle font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Horários
            </h4>
            <ul className="space-y-2.5">
              {siteConfig.hours.map((h) => (
                <li key={h.days} className="flex items-center justify-between gap-3 text-sm font-body">
                  <span className="text-gray-dark">{h.days}</span>
                  <span className="text-white text-right">{h.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ─── Bottom Bar ─── */}
        <div className="mt-8 pt-5 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-gray-dark font-body">
          <p>© {new Date().getFullYear()} bilico Barber. Todos os direitos reservados.</p>
          <p>
            desenvolvido por{" "}
            <a
              href="https://instagram.com/jamalrcy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-light transition-colors duration-300"
            >
              @jamalrcy
            </a>
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
