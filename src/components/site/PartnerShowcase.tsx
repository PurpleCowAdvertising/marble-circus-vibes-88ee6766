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

type Fx = "scan" | "frost" | "fizz" | "sizzle" | "smoke" | "steam" | "shimmer" | "streaks" | "streaks-rtl" | "waves" | "sweep" | null;

type Brand = { variant: Variant; fx: Fx; count: number };

const DEFAULT_BRAND: Brand = {
  variant: {
    initial: { opacity: 0, scale: 0.86, filter: "blur(14px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, scale: 1.08, filter: "blur(14px)" },
  },
  fx: null,
  count: 0,
};

// Each partner arrives in a way that nods to what the brand does.
const BRANDS: Record<string, Brand> = {
  // TV channel — the picture clicks on like a screen switching channel.
  "SABC 1": {
    variant: {
      initial: { opacity: 0, scaleY: 0.02, scaleX: 1.25, filter: "brightness(3)" },
      animate: { opacity: 1, scaleY: 1, scaleX: 1, filter: "brightness(1)" },
      exit: { opacity: 0, scaleY: 0.02, scaleX: 1.3, filter: "brightness(2.4)" },
    },
    fx: "scan",
    count: 3,
  },
  // Beer, extra cold — frost crystals settle onto the mark.
  "Castle Lite": {
    variant: {
      initial: { opacity: 0, scale: 1.18, filter: "blur(20px) brightness(1.6)" },
      animate: { opacity: 1, scale: 1, filter: "blur(0px) brightness(1)" },
      exit: { opacity: 0, scale: 0.92, filter: "blur(18px) brightness(1.4)" },
    },
    fx: "frost",
    count: 16,
  },
  // Fizzy drink — pops up with bubbles.
  Sprite: {
    variant: {
      initial: { opacity: 0, y: 70, scale: 0.8 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: -60, scale: 1.05 },
    },
    fx: "fizz",
    count: 14,
  },
  // Flame-grilled burgers — drops in over sparks.
  RocoMamas: {
    variant: {
      initial: { opacity: 0, y: -80, scale: 1.1, rotate: -4 },
      animate: { opacity: 1, y: 0, scale: 1, rotate: 0 },
      exit: { opacity: 0, y: 40, scale: 0.92, rotate: 3 },
    },
    fx: "sizzle",
    count: 14,
  },
  // Emerges from a soft haze — no product imagery.
  VEEV: {
    variant: {
      initial: { opacity: 0, scale: 1.1, filter: "blur(26px)" },
      animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
      exit: { opacity: 0, scale: 1.05, filter: "blur(26px)" },
    },
    fx: "smoke",
    count: 6,
  },
  // Coffee — warm rise with steam.
  "McCafé": {
    variant: {
      initial: { opacity: 0, y: 60, filter: "blur(10px)" },
      animate: { opacity: 1, y: 0, filter: "blur(0px)" },
      exit: { opacity: 0, y: -40, filter: "blur(10px)" },
    },
    fx: "steam",
    count: 5,
  },
  // Apparel — fabric-like swing with a shimmer pass.
  Galxboy: {
    variant: {
      initial: { opacity: 0, rotate: -8, skewY: 6, scale: 0.9 },
      animate: { opacity: 1, rotate: 0, skewY: 0, scale: 1 },
      exit: { opacity: 0, rotate: 6, skewY: -5, scale: 0.94 },
    },
    fx: "shimmer",
    count: 1,
  },
  // Train — drives in fast from the left and pulls out to the right.
  Gautrain: {
    variant: {
      initial: { opacity: 0, x: -320, filter: "blur(12px)" },
      animate: { opacity: 1, x: 0, filter: "blur(0px)" },
      exit: { opacity: 0, x: 320, filter: "blur(12px)" },
    },
    fx: "streaks",
    count: 6,
  },
  // Music rights — pulses to the beat with sound rings.
  SAMPRA: {
    variant: {
      initial: { opacity: 0, scale: 0.7 },
      animate: { opacity: 1, scale: [0.94, 1.04, 1] as unknown as number },
      exit: { opacity: 0, scale: 1.2 },
    },
    fx: "waves",
    count: 3,
  },
  // Car rental — drives in from the right and brakes into place.
  "Cabs Car Hire": {
    variant: {
      initial: { opacity: 0, x: 300, skewX: -8 },
      animate: { opacity: 1, x: 0, skewX: 0 },
      exit: { opacity: 0, x: -260, skewX: 6 },
    },
    fx: "streaks-rtl",
    count: 5,
  },
  // Audi — precision engineering, a clean light sweep across the rings.
  "Audi Centre Wonderboom": {
    variant: {
      initial: { opacity: 0, scale: 1.12, filter: "blur(8px)" },
      animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
      exit: { opacity: 0, scale: 0.94, filter: "blur(8px)" },
    },
    fx: "sweep",
    count: 1,
  },
};

function BrandFx({ fx, count }: { fx: Fx; count: number }) {
  if (!fx || count < 1) return null;

  return (
    <span aria-hidden className={`brand-fx brand-fx--${fx}`}>
      {Array.from({ length: count }, (_, i) => {
        const spread = ((i * 37) % 100) - 50;
        return (
          <span
            key={i}
            style={
              {
                left: `${(i * 100) / count + 4}%`,
                top: fx === "scan" ? `${(i * 100) / count}%` : undefined,
                animationDelay: `${(i % 6) * 0.35}s`,
                "--fx-x": `${spread * 2}px`,
                "--fx-y": `${spread * 1.6}px`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </span>
  );
}

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

  const brand = BRANDS[sponsor.name] ?? DEFAULT_BRAND;
  const variant = brand.variant;

  const image = (
    <img
      src={sponsor.logo}
      alt={`${sponsor.name} logo`}
      className="h-full w-full object-contain object-center drop-shadow-[0_24px_60px_rgba(0,0,0,0.65)]"
    />
  );

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden">
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

      <p className="relative z-10 pt-16 text-center text-[10px] uppercase tracking-[0.5em] text-gold md:pt-[4.75rem] md:text-[11px]">
         
      </p>

      <div className="relative z-10 flex flex-1 items-center justify-center">
        <div
          className="flex h-40 w-[78vw] max-w-[620px] items-center justify-center md:h-56"
          style={{ perspective: 1200 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={sponsor.name}
              initial={reduceMotion ? { opacity: 0 } : variant.initial}
              animate={reduceMotion ? { opacity: 1 } : variant.animate}
              exit={reduceMotion ? { opacity: 0 } : variant.exit}
              transition={{ duration: reduceMotion ? 0.3 : 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex h-full w-full items-center justify-center"
            >
              {!reduceMotion && <BrandFx fx={brand.fx} count={brand.count} />}
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
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4 pb-5 md:pb-7">
        <div className="flex items-center gap-1.5">
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
          className="rounded-full border border-gold/40 px-5 py-2 text-[10px] uppercase tracking-[0.3em] text-white/80 transition-colors hover:border-gold hover:text-white"
        >
          All partners
        </Link>
      </div>
    </div>
  );
}
