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

export function PageHero(_props: {
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  // All landing pages use the looping home hero video.
  // Props are accepted (and ignored) so existing call sites don't need changes.
  void _props;
  return <HeroVideo />;
}
