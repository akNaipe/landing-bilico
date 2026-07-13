import { Variants, Transition } from "framer-motion";

/* ─── Shared Transitions ─── */
const springSmooth: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 0.8,
};

const springBouncy: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 12,
};

const easeOutExpo: Transition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1],
};

const easeOutSmooth: Transition = {
  duration: 0.6,
  ease: [0.65, 0, 0.35, 1],
};

/* ─── Fade Variants ─── */
export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: easeOutExpo,
  },
};

export const fadeInFast: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: easeOutExpo,
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: easeOutExpo,
  },
};

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: easeOutExpo,
  },
};

/* ─── Scale Variants ─── */
export const scaleIn: Variants = {
  hidden: { scale: 0.85, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { ...easeOutExpo, duration: 0.9 },
  },
};

export const scaleInLight: Variants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: easeOutSmooth,
  },
};

/* ─── Blur Reveal ─── */
export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ─── Stagger Container ─── */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15,
    },
  },
};

/* ─── Card Hover ─── */
export const cardHover = {
  rest: { scale: 1, boxShadow: "0 8px 32px rgba(0,0,0,0.3)" },
  hover: {
    scale: 1.02,
    boxShadow: "0 12px 48px rgba(212,175,55,0.15)",
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export const cardHover3D = {
  rest: { rotateX: 0, rotateY: 0 },
  hover: {
    rotateX: 2,
    rotateY: 2,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ─── Button Hover ─── */
export const buttonHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: springSmooth,
  },
  tap: { scale: 0.97 },
};

/* ─── Icon Hover ─── */
export const iconBounce = {
  rest: { y: 0 },
  hover: {
    y: -3,
    transition: springBouncy,
  },
};

export const iconRotate = {
  rest: { rotate: 0 },
  hover: {
    rotate: 15,
    transition: springSmooth,
  },
};

/* ─── Slide Directions ─── */
export const slideUp: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: easeOutExpo,
  },
};

export const slideDown: Variants = {
  hidden: { y: "-100%" },
  visible: {
    y: 0,
    transition: easeOutExpo,
  },
};

/* ─── Text Reveal ─── */
export const textReveal: Variants = {
  hidden: { y: 80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ─── Word Stagger ─── */
export const wordReveal = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

/* ─── Counter ─── */
export const counterAnimation = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
  },
};

/* ─── Section Entrance ─── */
export const sectionEntrance: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
      duration: 0.3,
    },
  },
};
