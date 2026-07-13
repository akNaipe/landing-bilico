import dynamic from "next/dynamic";
import React from "react";
import ErrorBoundary from "@/components/shared/error-boundary";

/* ─── Static Imports (above-fold, critical) ─── */
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";

/* ─── Dynamic Imports (below-fold, non-critical) ─── */
function withErrorBoundary(Component: React.ComponentType, fallback?: React.ReactNode) {
  return function Wrapped() {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component />
      </ErrorBoundary>
    );
  };
}

const Gallery = dynamic(
  () => import("@/components/sections/gallery").then(mod => ({ default: withErrorBoundary(mod.default) })),
  { loading: () => <SectionSkeleton /> }
);

const Barbers = dynamic(
  () => import("@/components/sections/barbers").then(mod => ({ default: withErrorBoundary(mod.default) })),
  { loading: () => <SectionSkeleton /> }
);

const Courses = dynamic(
  () => import("@/components/sections/courses").then(mod => ({ default: withErrorBoundary(mod.default) })),
  { loading: () => <SectionSkeleton /> }
);

const Testimonials = dynamic(
  () => import("@/components/sections/testimonials").then(mod => ({ default: withErrorBoundary(mod.default) })),
  { loading: () => <SectionSkeleton /> }
);

const Process = dynamic(
  () => import("@/components/sections/process").then(mod => ({ default: withErrorBoundary(mod.default) })),
  { loading: () => <SectionSkeleton /> }
);

const CTA = dynamic(
  () => import("@/components/sections/cta").then(mod => ({ default: withErrorBoundary(mod.default) })),
  { loading: () => <SectionSkeleton /> }
);

/* ─── Loading Skeletons ─── */
function SectionSkeleton() {
  return (
    <section className="py-20 md:py-28 lg:py-32">
      <div className="section-container">
        <div className="w-full h-64 bg-graphite/50 rounded-2xl animate-pulse" />
      </div>
    </section>
  );
}

/* ─── Page ─── */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Gallery />
      <Barbers />
      <Courses />
      <Testimonials />
      <Process />
      <CTA />
    </>
  );
}
