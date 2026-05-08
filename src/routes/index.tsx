import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Calendar, MapPin, X, Music2 } from "lucide-react";
import { FadeIn, Section } from "@/components/site/Section";
import { useSubscribePopup } from "@/components/site/SubscribePopup";
import heroPoster from "@/assets/hero-poster.jpg";
import heroPosterMobile from "@/assets/hero-poster-mobile.jpg";
import majorLeague from "@/assets/artists/major-league.jpg";
import tyla from "@/assets/artists/tyla.png";
import blackCoffee from "@/assets/artists/black-coffee.png";
import nastyC from "@/assets/artists/nasty-c.png";
import musaKeys from "@/assets/artists/musa-keys.png";
import uncleWaffles from "@/assets/artists/uncle-waffles.png";

type Headliner = {
  name: string;
  image: string;
  tag: string;
  bio: string;
  set: string;
};

const HEADLINERS: Headliner[] = [
  { name: "MAJOR LEAGUE DJZ", image: majorLeague, tag: "Amapiano · Twin Force", bio: "Twin brothers Banele and Bandile have taken Balcony Mix global, turning amapiano into the soundtrack of the diaspora.", set: "Main Stage · Closing Set" },
  { name: "TYLA", image: tyla, tag: "Pop · Afrobeats", bio: "Grammy-winning sensation behind ‘Water’. A new generation of South African pop, built for arenas and TikTok feeds alike.", set: "Main Stage · Headline" },
  { name: "BLACK COFFEE", image: blackCoffee, tag: "Deep House · Icon", bio: "The architect of South African house. Decades of craft, residencies from Ibiza to NYC, and a sound that has shaped a continent.", set: "Main Stage · Sunset" },
  { name: "NASTY C", image: nastyC, tag: "Hip-Hop · Lyricist", bio: "The Coolest Kid in Africa. Sharp pen, world-class delivery and a catalogue that bridges Durban and the Billboard charts.", set: "Main Stage · Prime Time" },
  { name: "MUSA KEYS", image: musaKeys, tag: "Amapiano · Producer", bio: "From Selema to Unite The World — Musa Keys turns log-drum grooves into stadium-sized choruses.", set: "Second Stage · Headline" },
  { name: "UNCLE WAFFLES", image: uncleWaffles, tag: "Amapiano · DJ", bio: "The face of new amapiano. Sold-out tours from London to Lagos and a stage presence that turns clubs into cathedrals.", set: "Second Stage · Late Night" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Scorpion Kings Live — Home of the Culture" },
      { name: "description", content: "Scorpion Kings Live — artists, events and the culture. Be first to know about lineup drops, tickets and exclusive content." },
      { property: "og:title", content: "Scorpion Kings Live" },
      { property: "og:description", content: "Home of the artists, the events and the culture." },
    ],
  }),
  component: HomePage,
});

const ARTISTS = [
  "MAJOR LEAGUE DJZ", "TYLA", "BLACK COFFEE", "NASTY C",
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
      <div ref={heroRef} className="relative overflow-hidden bg-orange-rich pt-16 md:pt-20">
        <div className="mx-auto max-w-[1400px] px-5 pb-10 sm:px-6 md:px-10 md:pb-20 md:pt-12">
          <FadeIn>
            <motion.div style={{ y, opacity }} className="relative">
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-primary/30 via-accent/20 to-transparent blur-2xl" />

              {/* Hero poster — desktop / mobile */}
              <div className="relative w-full overflow-hidden rounded-2xl border border-border shadow-2xl">
                <picture>
                  <source media="(max-width: 767px)" srcSet={heroPosterMobile} />
                  <img
                    src={heroPoster}
                    alt="Scorpion Kings Live — 19 Sep 2026, FNB Stadium"
                    className="h-auto w-full object-cover"
                  />
                </picture>
              </div>
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-5 flex flex-wrap items-center gap-1.5 text-[11px] sm:mt-8 sm:gap-2.5 sm:text-sm md:gap-3">
              <span className="flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-2.5 py-1.5 text-white backdrop-blur-md sm:gap-2 sm:px-4 sm:py-2">
                <Calendar size={12} className="text-white sm:size-[14px]" />
                <span className="whitespace-nowrap">19 Sep 2026</span>
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-2.5 py-1.5 text-white backdrop-blur-md sm:gap-2 sm:px-4 sm:py-2">
                <MapPin size={12} className="text-white sm:size-[14px]" />
                <span className="whitespace-nowrap">FNB Stadium · Johannesburg</span>
              </span>
              <Link
                to="/music"
                className="group inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white px-2.5 py-1.5 font-semibold text-foreground backdrop-blur-md transition-all hover:scale-[1.03] hover:bg-white sm:gap-2 sm:px-4 sm:py-2"
              >
                <span className="whitespace-nowrap">Explore the lineup</span>
                <ArrowRight size={12} className="transition-transform group-hover:translate-x-1 sm:size-[14px]" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* MARQUEE — artist roster */}
      <div className="relative z-10 overflow-hidden bg-orange-rich py-4 md:py-6">
        <div className="marquee">
          <div className="marquee-track">
            {[...ARTISTS, ...ARTISTS, ...ARTISTS].map((a, i) => (
              <span key={i} className="flex items-center gap-3 md:gap-8">
                <span className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 font-display text-xs uppercase tracking-widest text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.04] hover:border-white/60 hover:bg-white/20 sm:px-4 sm:py-2 sm:text-sm md:px-5 md:py-2.5 md:text-base">
                  {a}
                </span>
                <span className="h-1 w-1 rounded-full bg-white/70 md:h-1.5 md:w-1.5" aria-hidden />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ABOUT TEASER */}
      <div className="relative bg-orange-rich">
        <Section className="text-white">
          <div className="grid gap-10 md:grid-cols-2 md:gap-20">
            <FadeIn>
              <p className="text-xs uppercase tracking-[0.4em] text-white/80">About</p>
              <h2 className="mt-4 font-display text-5xl font-bold leading-tight text-white md:text-7xl">
                Built for the artists, powered by the fans.
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="space-y-6 text-lg text-white/85 md:pt-12">
                <p>
                  Scorpion Kings Live champions the bold, the brilliant and the boundary-breaking.
                  From amapiano floors to global pop stages — this is where the next sound starts.
                </p>
                <p>
                  We're staging an experience that brings the music, the visuals and the moment together
                  in one unforgettable event.
                </p>
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-2 text-white hover:text-white/80"
                >
                  <span className="story-link">Read our story</span>
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </Section>
      </div>

      {/* MUSIC PREVIEW */}
      <Section className="border-t border-border bg-slate-50">
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
              className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:text-accent"
            >
              All artists <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeIn>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HEADLINERS.map(({ name, image }, i) => (
            <FadeIn key={name} delay={i * 0.05}>
              <div className="group relative aspect-[3/4] overflow-hidden rounded-lg border border-border bg-card hover-lift">
                <img
                  src={image}
                  alt={name}
                  width={768}
                  height={1024}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent transition-opacity duration-500 group-hover:via-background/30" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col p-6 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1">
                  <h3 className="font-display text-3xl font-bold">{name}</h3>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* SPONSORS STRIP */}
      <div className="relative bg-orange-rich">
        <Section className="text-white">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.4em] text-white/80">In partnership with</p>
            <h2 className="mt-4 font-display text-4xl font-bold text-white md:text-5xl">Powered by the bold.</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/20 bg-white/15 md:grid-cols-4">
              {["HEADLINE", "MAJOR", "MAJOR", "SUPPORTING", "SUPPORTING", "SUPPORTING", "SUPPORTING", "SUPPORTING"].map((tier, i) => (
                <div key={i} className="group flex aspect-[3/2] items-center justify-center bg-white/5 text-xs uppercase tracking-widest text-white/80 transition-all duration-500 hover:bg-white/15 hover:text-white">
                  <span className="transition-transform duration-500 group-hover:scale-110">{tier}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link
                to="/sponsors"
                className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest text-white hover:text-white/80"
              >
                <span className="story-link">Become a partner</span>
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </FadeIn>
        </Section>
      </div>

      {/* CTA */}
      <Section className="border-t border-border bg-slate-50">
        <div className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/20 via-card to-card p-6 md:p-12">
          <FadeIn>
            <h2 className="font-display text-[clamp(1.75rem,8vw,4.5rem)] font-bold leading-tight whitespace-nowrap md:text-7xl">
              Don't miss <span className="text-primary italic">the moment.</span>
            </h2>
            <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
              Subscribe for first-access drops, ticket waves and exclusive lineup announcements.
            </p>
            <button
              onClick={() => open("home-cta")}
              className="mt-6 rounded-full bg-accent px-8 py-4 text-sm font-bold uppercase tracking-widest text-accent-foreground hover:scale-105 transition-transform"
            >
              Subscribe now
            </button>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
