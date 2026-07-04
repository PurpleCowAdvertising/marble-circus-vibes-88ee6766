import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";

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

export function FadeIn({
  children,
  delay: _delay = 0,
  className = "",
  once: _once = false,
  bubble = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
  /** Card-style bubble expansion — bigger scale pop at viewport center. */
  bubble?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: bubble ? 90 : 140,
    damping: bubble ? 20 : 28,
    mass: bubble ? 0.5 : 0.3,
  });

  // Text: near-still, just a whisper of settle + fade.
  // Cards (bubble): pronounced expand-in / recede-out with soft focus.
  const scale = useTransform(
    smooth,
    [0, 0.5, 1],
    bubble ? [0.88, 1.04, 0.88] : [0.995, 1, 0.995],
  );
  const z = useTransform(smooth, [0, 0.5, 1], bubble ? [-140, 30, -140] : [0, 0, 0]);
  const opacity = useTransform(
    smooth,
    [0, 0.2, 0.5, 0.8, 1],
    bubble ? [0, 1, 1, 1, 0] : [0, 1, 1, 1, 1],
  );
  const filter = useTransform(
    smooth,
    [0, 0.35, 0.5, 0.65, 1],
    bubble
      ? ["blur(10px)", "blur(1px)", "blur(0px)", "blur(1px)", "blur(10px)"]
      : ["blur(0px)", "blur(0px)", "blur(0px)", "blur(0px)", "blur(0px)"],
  );

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
