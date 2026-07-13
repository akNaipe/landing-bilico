import { gsap } from "gsap";

/* ─── Register GSAP Plugins ─── */
// We import ScrollTrigger dynamically to avoid SSR issues
// It will be registered in the scroll-triggers.ts file

/* ─── Text Split Reveal ─── */
export function textSplitReveal(
  element: HTMLElement | null,
  options?: {
    type?: "chars" | "words" | "lines";
    stagger?: number;
    duration?: number;
    y?: number;
    delay?: number;
  }
) {
  if (!element) return;

  const { type = "chars", stagger = 0.03, duration = 0.6, y = 40, delay = 0 } = options || {};

  // Store original text
  const text = element.innerText;
  element.innerText = "";
  element.style.overflow = "hidden";

  if (type === "words") {
    const words = text.split(" ");
    words.forEach((word, i) => {
      const span = document.createElement("span");
      span.innerText = word + (i < words.length - 1 ? " " : "");
      span.style.display = "inline-block";
      span.style.opacity = "0";
      span.style.transform = `translateY(${y}px)`;
      element.appendChild(span);
    });
  } else {
    // chars
    const chars = text.split("");
    chars.forEach((char) => {
      const span = document.createElement("span");
      span.innerText = char === " " ? " " : char;
      span.style.display = "inline-block";
      span.style.opacity = "0";
      span.style.transform = `translateY(${y}px)`;
      element.appendChild(span);
    });
  }

  const targets = element.children;

  gsap.to(targets, {
    y: 0,
    opacity: 1,
    duration,
    stagger,
    delay,
    ease: "power3.out",
  });
}

/* ─── Count Up Animation ─── */
export function countUp(
  element: HTMLElement | null,
  targetValue: number,
  duration: number = 2,
  suffix: string = "",
  prefix: string = ""
) {
  if (!element) return;

  const obj = { value: 0 };

  gsap.to(obj, {
    value: targetValue,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      element.innerText = prefix + Math.round(obj.value).toLocaleString("pt-BR") + suffix;
    },
  });
}

/* ─── Parallax Layer ─── */
export function parallaxLayer(
  element: HTMLElement | null,
  speed: number = 0.5
) {
  if (!element) return;

  gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element.parentElement || element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

/* ─── Floating Animation ─── */
export function floatElement(
  element: HTMLElement | null,
  options?: {
    y?: number;
    duration?: number;
    delay?: number;
  }
) {
  if (!element) return;

  const { y = 15, duration = 3, delay = 0 } = options || {};

  gsap.to(element, {
    y,
    duration,
    delay,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
}

/* ─── Glow Pulse ─── */
export function glowPulse(
  element: HTMLElement | null,
  color: string = "rgba(212, 175, 55, 0.5)"
) {
  if (!element) return;

  gsap.to(element, {
    boxShadow: `0 0 30px ${color}, 0 0 60px ${color}`,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
}

/* ─── Image Reveal ─── */
export function imageReveal(
  element: HTMLElement | null,
  direction: "left" | "right" = "left"
) {
  if (!element) return;

  const clipFrom = direction === "left" ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)";

  gsap.fromTo(
    element,
    { clipPath: clipFrom },
    {
      clipPath: "inset(0 0 0 0)",
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element.parentElement || element,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    }
  );
}

/* ─── Magnetic Effect (for buttons) ─── */
export function magneticEffect(
  element: HTMLElement | null,
  strength: number = 0.3
) {
  if (!element) return;

  const onMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(element, {
      x: x * strength,
      y: y * strength,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const onMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.3)",
    });
  };

  element.addEventListener("mousemove", onMouseMove);
  element.addEventListener("mouseleave", onMouseLeave);

  return () => {
    element.removeEventListener("mousemove", onMouseMove);
    element.removeEventListener("mouseleave", onMouseLeave);
  };
}

/* ─── 3D Tilt Effect ─── */
export function tilt3D(
  element: HTMLElement | null,
  options?: {
    maxTilt?: number;
    perspective?: number;
    scale?: number;
    speed?: number;
  }
) {
  if (!element) return;

  const { maxTilt = 5, perspective = 1000, scale = 1.02, speed = 0.4 } = options || {};

  const onMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const tiltX = (y - 0.5) * -maxTilt;
    const tiltY = (x - 0.5) * maxTilt;

    gsap.to(element, {
      rotateX: tiltX,
      rotateY: tiltY,
      scale,
      transformPerspective: perspective,
      duration: speed,
      ease: "power2.out",
    });
  };

  const onMouseLeave = () => {
    gsap.to(element, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  };

  element.addEventListener("mousemove", onMouseMove);
  element.addEventListener("mouseleave", onMouseLeave);

  return () => {
    element.removeEventListener("mousemove", onMouseMove);
    element.removeEventListener("mouseleave", onMouseLeave);
  };
}
