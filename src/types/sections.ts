/* ─── Section-specific Prop Types ─── */

import { ReactNode } from "react";

export interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: ReactNode;
  containerClassName?: string;
}

export interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "gold";
  tilt?: boolean;
  glow?: boolean;
  as?: "div" | "article" | "section";
}

export interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  goldAccent?: boolean;
}

export interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
  className?: string;
}

export interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

export interface IconBoxProps {
  icon: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
  animated?: boolean;
}

export interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
  ripple?: boolean;
  glow?: boolean;
  type?: "button" | "submit" | "reset";
}

export interface NavbarProps {
  links: { label: string; href: string }[];
}

export interface HeroProps {
  headline: string;
  subheadline: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}

export interface AboutProps {
  counters: import("./index").CounterData[];
  imageSrc: string;
  title: string;
  description: string;
}

export interface ServicesProps {
  services: import("./index").Service[];
}

export interface BarbersProps {
  barbers: import("./index").Barber[];
}

export interface TestimonialsProps {
  testimonials: import("./index").Testimonial[];
}

export interface ProcessProps {
  steps: import("./index").ProcessStep[];
}

export interface CTAProps {
  headline: string;
  subheadline: string;
  buttonLabel: string;
  buttonHref: string;
}

export interface FooterProps {
  config: import("./index").SiteConfig;
}
