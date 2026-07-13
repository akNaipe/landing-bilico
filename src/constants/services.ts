import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "corte-classico",
    name: "Corte Clássico",
    description:
      "Tesoura e máquina com acabamento preciso. Tradicional ou degradê, feito sob medida para você.",
    icon: "Scissors",
    image: "/images/gallery/gallery-1.jpg",
  },
  {
    id: "corte-degrade",
    name: "Corte Degradê",
    description:
      "Fade perfeito com transição suave. Do skin fade ao mid fade, o visual moderno que você procura.",
    icon: "FlipVertical",
    image: "/images/gallery/gallery-2.jpg",
  },
  {
    id: "barba",
    name: "Barba Completa",
    description:
      "Aparação e modelagem completa. Toalha quente, óleo essencial e balm para um acabamento impecável.",
    icon: "Ruler",
    image: "/images/gallery/gallery-3.jpg",
  },
  {
    id: "trancas",
    name: "Tranças",
    description:
      "Tranças estilizadas feitas com técnica profissional. Nagô, box braids, twists e muito mais para um visual único.",
    icon: "Zap",
    image: "/images/gallery/gallery-4.jpg",
  },
  {
    id: "dreads",
    name: "Dreads",
    description:
      "Dreads impecáveis, da implantação à manutenção. Estilo e personalidade que duram.",
    icon: "RefreshCw",
    image: "/images/gallery/gallery-5.jpg",
  },
  {
    id: "hidratacao",
    name: "Hidratação Capilar",
    description:
      "Tratamento revitalizante com produtos importados. Recupera a vitalidade e o brilho dos seus fios.",
    icon: "Droplets",
    image: "/images/gallery/gallery-6.jpg",
  },
];
