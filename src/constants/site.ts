import type { SiteConfig, NavLink } from "@/types";

export const siteConfig: SiteConfig = {
  name: "bilico Barber",
  description:
    "Barbearia premium com cortes modernos e clássicos. Experiência masculina de luxo com o melhor barbeiro da cidade.",
  tagline: "Onde o estilo encontra a tradição",
  heroHeadline: "O corte perfeito\ncomeça aqui.",
  heroSubheadline:
    "Experiência premium em barbearia masculina. Tradição, estilo e sofisticação em cada detalhe, feitos pelo mestre Bilico.",
  url: "https://bilicobarber.site",
  ogImage: "/images/og-image.jpg",
  contact: {
    phone: "5515996828034",
    email: "bilico@hotmail.com",
    address: "R. Antônio de Almeida Leme, 171 - Vila Santana, Itapetininga - SP, 18210-090, Brasil",
    mapsUrl: "https://maps.app.goo.gl/hhkS62vqsXVPkfTX8",
  },
  hours: [
    { days: "Terça a Sexta", hours: "09:00 - 20:00" },
    { days: "Sábado", hours: "09:00 - 18:00" },
    { days: "Domingo", hours: "Fechado" },
    { days: "Segunda", hours: "Fechado" },
  ],
  social: [
    { name: "Instagram", url: "https://instagram.com/bilicobarber", icon: "Instagram" },
    { name: "Facebook", url: "https://facebook.com/bilicobarber", icon: "Facebook" },
    { name: "TikTok", url: "https://tiktok.com/@bilicobarber", icon: "Music2" },
    { name: "WhatsApp", url: "https://wa.me/5515996828034", icon: "MessageCircle" },
  ],
};

export const navLinks: NavLink[] = [
  { label: "Início", href: "#hero" },
  { label: "Sobre", href: "#about" },
  { label: "Galeria", href: "#gallery" },
  { label: "Cursos", href: "#courses" },
  { label: "Depoimentos", href: "#testimonials" },
  { label: "Contato", href: "#contact" },
];
