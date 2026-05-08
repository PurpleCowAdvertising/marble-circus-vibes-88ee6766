import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, Calendar, MapPin } from "lucide-react";
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
import partnerLogoFull from "@/assets/partners/purple-cow-full.png";
import partnerLogoMark from "@/assets/partners/purple-cow-mark.png";

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

        </div>
      </div>

      {/* ARTIST CAROUSEL — swipeable, with arrows + scrubber */}
      <ArtistCarousel />


      {/* ABOUT TEASER */}
      <div className="relative bg-orange-rich">
        <Section className="text-foreground">
          <div className="grid gap-10 md:grid-cols-2 md:gap-20">
            <FadeIn>
              <p className="text-xs uppercase tracking-[0.4em] text-foreground/70">About</p>
              <h2 className="mt-4 font-display text-5xl font-bold leading-tight text-foreground md:text-7xl">
                Built for the artists, powered by the fans.
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="space-y-6 text-lg text-foreground/85 md:pt-12">
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
                  className="group inline-flex items-center gap-2 text-foreground hover:text-foreground/70"
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
      <div className="surface-light">
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
              className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:text-accent"
            >
              All artists <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeIn>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HEADLINERS.map((artist, i) => (
            <motion.div
              key={artist.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="group relative block aspect-[3/4] w-full overflow-hidden rounded-lg border border-border bg-card text-left"
              >
                <img
                  src={artist.image}
                  alt={artist.name}
                  width={768}
                  height={1024}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent transition-opacity duration-500 group-hover:via-background/30" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col p-6 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1">
                  <h3 className="font-display text-3xl font-bold">{artist.name}</h3>
                  <span className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">
                    {artist.tag}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
      </div>

      {/* SPONSORS STRIP */}
      <div className="relative bg-orange-rich">
        <Section className="text-foreground">
          <FadeIn>
            {/* On orange background, use BLACK text for legibility */}
            <p className="text-xs uppercase tracking-[0.4em] text-foreground/80">In partnership with</p>
            <h2 className="mt-4 font-display text-4xl font-bold text-foreground md:text-5xl">Powered by the bold.</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                { tier: "Headline", variant: "full" as const },
                { tier: "Major", variant: "full" as const },
                { tier: "Major", variant: "full" as const },
                { tier: "Supporting", variant: "mark" as const },
                { tier: "Supporting", variant: "mark" as const },
                { tier: "Supporting", variant: "mark" as const },
                { tier: "Supporting", variant: "mark" as const },
                { tier: "Supporting", variant: "mark" as const },
              ].map((p, i) => (
                <div
                  key={i}
                  className="group relative flex aspect-[3/2] overflow-hidden rounded-lg border border-foreground/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                >
                  <img
                    src={p.variant === "full" ? partnerLogoFull : partnerLogoMark}
                    alt={`${p.tier} partner — placeholder logo`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 z-10 rounded-full bg-black/30 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                    {p.tier}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link
                to="/sponsors"
                className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest text-foreground hover:text-foreground/70"
              >
                <span className="story-link">Become a partner</span>
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </FadeIn>
        </Section>
      </div>

      {/* CTA */}
      <div className="surface-light">
      <Section className="border-t border-border">
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

/* ---------- Artist carousel (under the hero) ---------- */

type CarouselArtist = { name: string; image: string; tag: string };
const CAROUSEL_ARTISTS: CarouselArtist[] = HEADLINERS.map((h) => ({
  name: h.name,
  image: h.image,
  tag: h.tag,
}));

function ArtistCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  const recompute = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setMaxScroll(max);
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  useEffect(() => {
    recompute();
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", recompute);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", recompute);
    };
  }, []);

  const nudge = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(280, el.clientWidth * 0.7), behavior: "smooth" });
  };

  const onSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = trackRef.current;
    if (!el) return;
    const pct = Number(e.target.value) / 100;
    el.scrollTo({ left: pct * maxScroll, behavior: "auto" });
  };

  return (
    <section
      aria-label="Featured artists carousel"
      className="relative z-10 border-y border-foreground/10 surface-light py-10 md:py-14"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-primary">The Roster</p>
            <h2 className="mt-2 font-display text-3xl font-bold leading-none md:text-5xl">
              Artists on the bill.
            </h2>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => nudge(-1)}
              aria-label="Previous artists"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/20 bg-background text-foreground transition-all hover:scale-105 hover:border-foreground hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => nudge(1)}
              aria-label="Next artists"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/20 bg-background text-foreground transition-all hover:scale-105 hover:border-foreground hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 sm:gap-5 sm:px-6 md:gap-6 md:px-10"
        tabIndex={0}
        aria-label="Scroll through featured artists. Use arrow keys or drag."
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); nudge(1); }
          if (e.key === "ArrowLeft")  { e.preventDefault(); nudge(-1); }
        }}
      >
        {CAROUSEL_ARTISTS.map((a) => (
          <Link
            key={a.name}
            to="/music"
            aria-label={`View ${a.name} on the artists page`}
            className="group relative block aspect-[3/4] w-[68%] flex-none snap-start overflow-hidden rounded-xl border border-foreground/10 bg-foreground/[0.03] transition-shadow hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 sm:w-[42%] md:w-[28%] lg:w-[22%]"
          >
            <img
              src={a.image}
              alt={a.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.1]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 translate-y-1 p-4 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 md:p-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-background/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100">{a.tag}</p>
              <h3 className="mt-1 font-display text-xl font-bold leading-tight text-background md:text-2xl">
                {a.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Scrubber slider */}
      <div className="mx-auto mt-6 flex max-w-[1400px] items-center gap-4 px-5 sm:px-6 md:px-10">
        <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-foreground/10">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-foreground transition-[width] duration-150"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
            aria-hidden
          />
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(progress * 100)}
          onChange={onSliderChange}
          aria-label="Scroll position"
          className="h-1 w-32 cursor-pointer accent-foreground sm:w-44"
        />
        <span className="hidden font-mono text-[11px] uppercase tracking-widest text-foreground/60 sm:inline">
          {String(Math.round(progress * 100)).padStart(2, "0")}%
        </span>
      </div>
    </section>
  );
}
