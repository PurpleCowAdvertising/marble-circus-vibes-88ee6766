import { motion } from "framer-motion";
import type { ReactNode } from "react";

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
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 56, scale: 0.98, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
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
          <FadeIn>
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
