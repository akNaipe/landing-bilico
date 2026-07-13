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
import { staggerContainer, fadeIn, fadeInLeft } from "@/animations/framer-variants";

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
        className="section-container py-10 md:py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {/* Brand */}
          <motion.div variants={fadeInLeft}>
            <div className="flex items-center gap-3 mb-4">
              <Scissors className="w-5 h-5 text-gold" />
              <span className="font-display text-lg tracking-[0.06em] text-white">
                <span className="text-gold">bilico</span> Barber
              </span>
            </div>
            <p className="text-gray text-sm font-body leading-relaxed mb-6 max-w-xs">
              {siteConfig.description}
            </p>

            {/* Social */}
            <div className="flex items-center gap-3">
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
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeIn}>
            <h4 className="font-subtitle font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Início", href: "#hero" },
                { label: "Serviços", href: "#services" },
                { label: "Galeria", href: "#gallery" },
                { label: "Contato", href: "#contact" },
              ].map((link) => (
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
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeIn}>
            <h4 className="font-subtitle font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Contato
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`https://wa.me/${siteConfig.contact.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray hover:text-gold text-sm transition-colors duration-300 font-body"
                >
                  <Phone className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span className="break-all">{siteConfig.contact.phone}</span>
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
                  className="flex items-start gap-2 text-gray hover:text-gold text-sm transition-colors duration-300 font-body min-w-0"
                >
                  <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="break-words">{siteConfig.contact.address}</span>
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Hours */}
          <motion.div variants={fadeIn}>
            <h4 className="font-subtitle font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Horários
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                <div className="text-sm font-body">
                  {siteConfig.hours.map((h) => (
                    <div key={h.days} className="flex justify-between gap-4 text-gray">
                      <span className="text-gray-dark">{h.days}</span>
                      <span className="text-white">{h.hours}</span>
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={fadeIn}
          className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-dark font-body"
        >
          <p>© {new Date().getFullYear()} bilico Barber. Todos os direitos reservados.</p>
          <p>
            desenvolvido por{" "}
            <a
              href="https://github.com/jamalrcy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-light transition-colors duration-300"
            >
              @jamalrcy
            </a>
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
