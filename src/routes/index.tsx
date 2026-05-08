import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { FadeIn, Section } from "@/components/site/Section";
import { useSubscribePopup } from "@/components/site/SubscribePopup";
import majorLeague from "@/assets/artists/major-league.jpg";
import tyla from "@/assets/artists/tyla.jpg";
import blackCoffee from "@/assets/artists/black-coffee.jpg";
import nastyC from "@/assets/artists/nasty-c.jpg";
import musaKeys from "@/assets/artists/musa-keys.jpg";
import uncleWaffles from "@/assets/artists/uncle-waffles.jpg";

const HEADLINERS = [
  { name: "MAJOR LEAGUE DJZ", image: majorLeague },
  { name: "TYLA", image: tyla },
  { name: "BLACK COFFEE", image: blackCoffee },
  { name: "NASTY C", image: nastyC },
  { name: "MUSA KEYS", image: musaKeys },
  { name: "UNCLE WAFFLES", image: uncleWaffles },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sony Music South Africa — Home of the Culture" },
      { name: "description", content: "Sony Music SA — artists, events and the culture. Be first to know about lineup drops, tickets and exclusive content." },
      { property: "og:title", content: "Sony Music South Africa" },
      { property: "og:description", content: "Home of the artists, the events and the culture." },
    ],
  }),
  component: HomePage,
});

const ARTISTS = [
  "MAJOR LEAGUE DJZ", "TYLA", "AKA", "BLACK COFFEE", "NASTY C",
  "MUSA KEYS", "UNCLE WAFFLES", "FOCALISTIC", "KABZA DE SMALL", "SHO MADJOZI",
];

function HomePage() {
  const { open } = useSubscribePopup();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* HERO */}
      <div ref={heroRef} className="relative min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-50" />
        <div className="absolute -left-32 top-1/3 h-[500px] w-[500px] rounded-full bg-primary/30 blur-[120px]" />
        <div className="absolute -right-32 top-1/4 h-[400px] w-[400px] rounded-full bg-accent/20 blur-[120px]" />

        <motion.div
          style={{ y, opacity }}
          className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-center px-6 pt-24 md:px-10"
        >
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.5em] text-primary md:text-sm">
              Sony Music · South Africa
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-6 font-display text-[clamp(3.5rem,12vw,11rem)] font-bold leading-[0.85] tracking-tighter text-balance">
              Sound<br />
              <span className="text-primary italic">that moves</span><br />
              a continent.
            </h1>
          </FadeIn>
          <FadeIn delay={0.25}>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar size={16} className="text-primary" />
                Coming 2026
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                Johannesburg · Cape Town · Durban
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => open("hero")}
                className="group flex items-center gap-3 rounded-full bg-primary px-7 py-4 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-105"
              >
                Get the drop
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
              <Link
                to="/music"
                className="rounded-full border border-border px-7 py-4 text-sm font-bold uppercase tracking-widest hover:border-primary hover:text-primary"
              >
                Explore the lineup
              </Link>
            </div>
          </FadeIn>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Scroll
        </div>
      </div>

      {/* MARQUEE */}
      <div className="relative z-10 border-y border-border bg-card py-6">
        <div className="marquee">
          <div className="marquee-track font-display text-3xl uppercase md:text-5xl">
            {[...ARTISTS, ...ARTISTS].map((a, i) => (
              <span key={i} className="flex items-center gap-12">
                {a}
                <span className="text-primary">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ABOUT TEASER */}
      <Section>
        <div className="grid gap-12 md:grid-cols-2 md:gap-20">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.4em] text-primary">About</p>
            <h2 className="mt-4 font-display text-5xl font-bold leading-tight md:text-7xl">
              Built for the artists, powered by the fans.
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="space-y-6 text-lg text-muted-foreground md:pt-12">
              <p>
                Sony Music South Africa champions the bold, the brilliant and the boundary-breaking.
                From amapiano floors to global pop stages — this is where the next sound starts.
              </p>
              <p>
                We're staging an experience that brings the music, the visuals and the moment together
                in one unforgettable event.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-foreground hover:text-primary"
              >
                Read our story <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* MUSIC PREVIEW */}
      <Section className="border-t border-border">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-primary">The Lineup</p>
              <h2 className="mt-4 font-display text-5xl font-bold md:text-7xl">
                Headliners.
              </h2>
            </div>
            <Link
              to="/music"
              className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:text-primary"
            >
              All artists <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeIn>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HEADLINERS.map(({ name, image }, i) => (
            <FadeIn key={name} delay={i * 0.05}>
              <div className="group relative aspect-[3/4] overflow-hidden rounded-lg border border-border bg-card">
                <img
                  src={image}
                  alt={name}
                  width={768}
                  height={1024}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <p className="text-xs uppercase tracking-widest text-primary">Headliner {i + 1}</p>
                  <h3 className="mt-1 font-display text-3xl font-bold">{name}</h3>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* SPONSORS STRIP */}
      <Section className="border-t border-border">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.4em] text-primary">In partnership with</p>
          <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">Powered by the bold.</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4">
            {["HEADLINE", "MAJOR", "MAJOR", "SUPPORTING", "SUPPORTING", "SUPPORTING", "SUPPORTING", "SUPPORTING"].map((tier, i) => (
              <div key={i} className="flex aspect-[3/2] items-center justify-center bg-card text-xs uppercase tracking-widest text-muted-foreground">
                {tier}
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              to="/sponsors"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:text-primary"
            >
              Become a partner <ArrowRight size={16} />
            </Link>
          </div>
        </FadeIn>
      </Section>

      {/* CTA */}
      <Section className="border-t border-border">
        <div className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/20 via-card to-card p-10 md:p-20">
          <FadeIn>
            <h2 className="font-display text-5xl font-bold leading-none md:text-8xl">
              Don't<br />miss<br /><span className="text-primary italic">the moment.</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Subscribe for first-access drops, ticket waves and exclusive lineup announcements.
            </p>
            <button
              onClick={() => open("home-cta")}
              className="mt-8 rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-widest text-primary-foreground hover:scale-105 transition-transform"
            >
              Subscribe now
            </button>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
