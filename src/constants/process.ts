import type { ProcessStep } from "@/types";

export const processSteps: ProcessStep[] = [
  {
    id: "choose",
    step: 1,
    title: "Escolha",
    description: "Navegue pelos nossos serviços e escolha o que mais combina com você.",
    icon: "Search",
  },
  {
    id: "schedule",
    step: 2,
    title: "Agende",
    description: "Reserve seu horário online de forma rápida e prática. Sem filas, sem espera.",
    icon: "CalendarCheck",
  },
  {
    id: "visit",
    step: 3,
    title: "Venha",
    description: "Chegue na hora marcada e seja recebido com um café premium em nosso ambiente exclusivo.",
    icon: "MapPin",
  },
  {
    id: "enjoy",
    step: 4,
    title: "Aproveite",
    description: "Relaxe, deixe com a gente e saia de lá com o visual impecável e a autoestima renovada.",
    icon: "Star",
  },
];
