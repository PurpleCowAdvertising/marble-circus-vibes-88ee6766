import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { SPONSORS } from "@/config/sponsors";

const SHOWCASE_PARTNER_NAMES = [
  "SABC 1",
  "Gauteng Province",
  "Sport, Arts and Culture",
  "Castle Lite",
  "Sprite",
  "RocoMamas",
  "VEEV",
  "McCafé",
  "Galxboy",
  "Gautrain",
  "SAMPRA",
  "Cabs Car Hire",
  "Audi Centre Wonderboom",
] as const;

const SHOWCASE_PARTNERS = SHOWCASE_PARTNER_NAMES.flatMap((name) => {
  const sponsor = SPONSORS.find((item) => item.name === name);
  return sponsor ? [sponsor] : [];
});

type Variant = {
  initial: Record<string, number | string>;
  animate: Record<string, number | string>;
  exit: Record<string, number | string>;
};

// Each partner gets its own way of arriving and leaving.
const VARIANTS: Variant[] = [
  {
    initial: { opacity: 0, scale: 0.72, filter: "blur(18px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, scale: 1.25, filter: "blur(22px)" },
  },
  {
    initial: { opacity: 0, y: 90, rotateX: 55 },
    animate: { opacity: 1, y: 0, rotateX: 0 },
    exit: { opacity: 0, y: -90, rotateX: -55 },
  },
  {
    initial: { opacity: 0, x: -160, skewX: 12 },
    animate: { opacity: 1, x: 0, skewX: 0 },
    exit: { opacity: 0, x: 160, skewX: -12 },
  },
  {
    initial: { opacity: 0, scale: 1.4, filter: "blur(26px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, scale: 0.7, filter: "blur(20px)" },
  },
  {
    initial: { opacity: 0, rotate: -14, scale: 0.8 },
    animate: { opacity: 1, rotate: 0, scale: 1 },
    exit: { opacity: 0, rotate: 14, scale: 0.8 },
  },
  {
    initial: { opacity: 0, x: 160, filter: "blur(16px)" },
    animate: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit: { opacity: 0, x: -160, filter: "blur(16px)" },
  },
  {
    initial: { opacity: 0, y: -110, scale: 0.85 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 110, scale: 0.85 },
  },
  {
    initial: { opacity: 0, rotateY: 80, scale: 0.9 },
    animate: { opacity: 1, rotateY: 0, scale: 1 },
    exit: { opacity: 0, rotateY: -80, scale: 0.9 },
  },
];

const HOLD_MS = 3200;

const PARTICLES = Array.from({ length: 18 }, (_, index) => ({
  left: (index * 53) % 100,
  delay: (index % 9) * 0.7,
  duration: 7 + (index % 5) * 1.4,
  size: index % 3 === 0 ? 3 : 2,
}));

export function PartnerShowcase() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (SHOWCASE_PARTNERS.length < 2) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % SHOWCASE_PARTNERS.length);
    }, HOLD_MS);

    return () => window.clearInterval(id);
  }, []);

  const sponsor = SHOWCASE_PARTNERS[index];

  if (!sponsor) return null;

  const variant = VARIANTS[index % VARIANTS.length]!;

  const image = (
    <img
      src={sponsor.logo}
      alt={`${sponsor.name} logo`}
      className="h-full w-full object-contain object-center drop-shadow-[0_24px_60px_rgba(0,0,0,0.65)]"
    />
  );

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-black/55 [background-image:radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--color-accent)_18%,transparent),transparent_65%)]"
      />

      {!reduceMotion && (
        <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {PARTICLES.map((particle, i) => (
            <span
              key={i}
              className="partner-showcase-particle"
              style={{
                left: `${particle.left}%`,
                width: particle.size,
                height: particle.size,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            />
          ))}
        </span>
      )}

      <p className="relative z-10 text-[10px] uppercase tracking-[0.5em] text-gold md:text-[11px]">
        Proudly partnered by
      </p>

      <div
        className="relative z-10 mt-8 flex h-40 w-[78vw] max-w-[620px] items-center justify-center md:mt-10 md:h-56"
        style={{ perspective: 1200 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={sponsor.name}
            initial={reduceMotion ? { opacity: 0 } : variant.initial}
            animate={reduceMotion ? { opacity: 1 } : variant.animate}
            exit={reduceMotion ? { opacity: 0 } : variant.exit}
            transition={{ duration: reduceMotion ? 0.3 : 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-full w-full items-center justify-center"
          >
            {sponsor.url ? (
              <a
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${sponsor.name}`}
                className="flex h-full w-full items-center justify-center transition-transform duration-500 hover:scale-[1.04]"
              >
                {image}
              </a>
            ) : (
              image
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 mt-10 flex items-center gap-1.5">
        {SHOWCASE_PARTNERS.map((partner, i) => (
          <button
            key={partner.name}
            type="button"
            aria-label={`Show ${partner.name}`}
            onClick={() => setIndex(i)}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === index ? "w-6 bg-gold" : "w-1.5 bg-white/25 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      <Link
        to="/partners"
        className="relative z-10 mt-8 rounded-full border border-gold/40 px-5 py-2 text-[10px] uppercase tracking-[0.3em] text-white/80 transition-colors hover:border-gold hover:text-white"
      >
        All partners
      </Link>
    </div>
  );
}
