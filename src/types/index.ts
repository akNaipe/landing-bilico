/* ─── Shared Types ─── */

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  image?: string;
}

export interface Barber {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  bio: string;
  image: string;
  social: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  text: string;
  rating: number;
  date?: string;
}

export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  url: string;
  ogImage: string;
  contact: {
    phone: string;
    email: string;
    address: string;
    mapsUrl: string;
  };
  hours: {
    days: string;
    hours: string;
  }[];
  social: SocialLink[];
}

export interface CounterData {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}
