import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";


import { HeroVideo } from "@/components/site/HeroVideo";

export function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section
      id={id}
      className={`relative z-10 mx-auto max-w-[1400px] px-5 py-12 text-foreground sm:px-6 sm:py-16 md:px-10 md:py-24 ${className}`}
    >
      {children}
    </section>
  );
}

/**
 * Phones and reduced-motion users skip the scroll-linked 3D/blur pipeline
 * entirely — a spring + per-frame blur on every section is the main cause of
 * janky, fragmented scrolling on mobile.
 */
let cachedLite: boolean | null = null;
function isLiteDevice() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  if (cachedLite === null) {
    const nav = navigator as Navigator & { deviceMemory?: number };
    cachedLite =
      window.matchMedia("(max-width: 1023px), (pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      (nav.hardwareConcurrency ?? 8) <= 4 ||
      (nav.deviceMemory ?? 8) <= 4;
  }
  return cachedLite;
}

export function FadeIn({
  children,
  delay: _delay = 0,
  className = "",
  once: _once = false,
  bubble,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
  /** Force card-style bubble expansion. Auto-detected when omitted. */
  bubble?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [autoBubble, setAutoBubble] = useState(false);
  const [lite, setLite] = useState(true);

  useEffect(() => {
    setLite(isLiteDevice());
  }, []);

  // Auto-detect card-like content: rounded surfaces, image tiles, or grid layouts.
  useEffect(() => {
    if (bubble !== undefined || !ref.current || lite) return;
    const el = ref.current;
    const looksLikeCard =
      el.querySelector(
        '[class*="rounded-3xl"],[class*="rounded-2xl"],[class*="backdrop-blur"],img,video',
      ) !== null;
    if (looksLikeCard) setAutoBubble(true);
  }, [bubble, lite]);

  const isBubble = bubble ?? autoBubble;


  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: isBubble ? 90 : 140,
    damping: isBubble ? 20 : 28,
    mass: isBubble ? 0.5 : 0.3,
  });


  // Text: near-still, just a whisper of settle + fade.
  // Cards (bubble): pronounced expand-in / recede-out with soft focus.
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const tri = (p: number) => 1 - Math.abs(p - 0.5) * 2; // 0 at edges, 1 at center

  const scale = useTransform(smooth, (p) => {
    const c = tri(p);
    return isBubble ? lerp(0.88, 1.04, c) : lerp(0.995, 1, c);
  });
  const z = useTransform(smooth, (p) => (isBubble ? lerp(-140, 30, tri(p)) : 0));
  const opacity = useTransform(smooth, (p) => {
    if (!isBubble) return p < 0.2 ? p / 0.2 : 1;
    if (p < 0.2) return p / 0.2;
    if (p > 0.8) return (1 - p) / 0.2;
    return 1;
  });
  const filter = useTransform(smooth, (p) => {
    if (!isBubble) return "blur(0px)";
    const c = tri(p);
    const b = lerp(10, 0, Math.min(1, c * 1.4));
    return `blur(${b.toFixed(2)}px)`;
  });


  return (
    <motion.div
      ref={ref}
      style={{
        transformPerspective: 1400,
        transformStyle: "preserve-3d",
        willChange: "transform, filter, opacity",
        scale,
        z,
        opacity,
        filter,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}




export function PageHero({ eyebrow, title, description }: { eyebrow?: string; title?: string; description?: string }) {
  return (
    <>
      <HeroVideo />

      {(eyebrow || title || description) && (
        <section className="relative z-10 mx-auto max-w-[1400px] bg-black px-5 pb-8 pt-10 text-white sm:px-6 sm:pb-10 sm:pt-14 md:px-10 md:pb-14 md:pt-20">
          <FadeIn once>
            {eyebrow && <p className="text-[10px] uppercase tracking-[0.4em] text-gold sm:text-xs">{eyebrow}</p>}

            {title && (
              <h1 className="mt-3 text-balance font-display text-[clamp(2.25rem,9vw,3.5rem)] font-bold leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
                {title}
              </h1>
            )}

            {description && (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg md:text-xl">
                {description}
              </p>
            )}
          </FadeIn>
        </section>
      )}
    </>
  );
}
