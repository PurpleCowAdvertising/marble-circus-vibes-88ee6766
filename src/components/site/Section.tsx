import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { HeroVideo } from "@/components/site/HeroVideo";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`relative z-10 mx-auto max-w-[1400px] px-5 pt-3 pb-12 sm:px-6 sm:pt-4 sm:pb-16 md:px-10 md:pt-6 md:pb-24 text-foreground fold-safe-above !pb-6 sm:!pb-10 md:!pb-16 bg-black ${className}`}
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
      initial={{ opacity: 0, y: 110, scale: 0.94, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  return (
    <>
      <HeroVideo />
      {(eyebrow || title || description) && (
        <section className="relative z-10 mx-auto max-w-[1400px] bg-black px-5 pt-10 pb-6 sm:px-6 sm:pt-14 sm:pb-8 md:px-10 md:pt-20 md:pb-12">
          <FadeIn>
            {eyebrow && (
              <p className="text-[10px] uppercase tracking-[0.4em] text-primary sm:text-xs">
                {eyebrow}
              </p>
            )}
            {title && (
              <h1 className="mt-3 font-display text-[clamp(2.25rem,9vw,3.5rem)] font-bold leading-[0.95] tracking-tight text-balance text-white md:text-7xl lg:text-8xl">
                {title}
              </h1>
            )}
            {description && (
              <p className="mt-4 max-w-2xl text-base text-white/75 sm:text-lg md:text-xl">
                {description}
              </p>
            )}
          </FadeIn>
        </section>
      )}
    </>
  );
}

