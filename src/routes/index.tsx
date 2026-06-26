import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { FadeIn, Section } from "@/components/site/Section";

import { TicketModal, type TicketTier } from "@/components/site/TicketModal";
import { useIsMobile } from "@/hooks/use-mobile";

import majorLeague from "@/assets/artists/major-league.jpg";
import tyla from "@/assets/artists/tyla.webp";
import blackCoffee from "@/assets/artists/black-coffee.webp";
import nastyC from "@/assets/artists/nasty-c.webp";
import musaKeys from "@/assets/artists/musa-keys.webp";
import uncleWaffles from "@/assets/artists/uncle-waffles.webp";
import maphorisa from "@/assets/artists/dj-maphorisa.png";
import kabza from "@/assets/artists/kabza.png";

const SCORPION_KINGS = [
  {
    name: "DJ Maphorisa",
    role: "Producer · Architect",
    image: maphorisa,
    bio: "Themba Sekowe — the global hitmaker behind Y-Tjukutja, Khona and Particula. A decade of shaping African pop, Afrobeats and Amapiano into a worldwide sound.",
  },
  {
    name: "Kabza De Small",
    role: "King of Amapiano",
    image: kabza,
    bio: "Kabelo Motha — the producer who turned a township sound into a global movement. From Piano Hub to KOA II and a first-of-its-kind Red Bull Symphonic.",
  },
] as const;

import partnerLogoFull from "@/assets/partners/purple-cow-full.png";
import partnerLogoMark from "@/assets/partners/purple-cow-mark.png";
import skLiveLogo from "@/assets/scorpion-kings-live-logo-cutout.png";

import pastFanPhone from "@/assets/past-event/fan-phone.jpg";
import pastDrummerFire from "@/assets/past-event/drummer-fire.jpg";
import pastStageWalk from "@/assets/past-event/stage-walk.jpg";
import pastRedVocalist from "@/assets/past-event/red-vocalist.jpg";
import pastStadiumFire from "@/assets/past-event/stadium-fire.jpg";

const PAST_EVENT_PHOTOS: { src: string; alt: string }[] = [
  {
    src: pastStadiumFire,
    alt: "FNB Stadium with pyrotechnics during the last Scorpion Kings Live show",
  },
  {
    src: pastDrummerFire,
    alt: "Traditional drummer on stage framed by flames",
  },
  {
    src: pastRedVocalist,
    alt: "Vocalist in red performing under stadium lights",
  },
  {
    src: pastStageWalk,
    alt: "Artist walking the main stage in a cream jacket",
  },
  {
    src: pastFanPhone,
    alt: "Fan smiling in the stands at FNB Stadium",
  },
];

type Headliner = {
  name: string;
  image: string;
  tag: string;
  bio: string;
  set: string;
};

const HEADLINERS: Headliner[] = [
  {
    name: "MAJOR LEAGUE DJZ",
    image: majorLeague,
    tag: "Amapiano · Twin Force",
    bio: "Twin brothers Banele and Bandile have taken Balcony Mix global, turning amapiano into the soundtrack of the diaspora.",
    set: "Main Stage · Closing Set",
  },
  {
    name: "TYLA",
    image: tyla,
    tag: "Pop · Afrobeats",
    bio: "Grammy-winning sensation behind Water. A new generation of South African pop, built for arenas and feeds alike.",
    set: "Main Stage · Headline",
  },
  {
    name: "BLACK COFFEE",
    image: blackCoffee,
    tag: "Deep House · Icon",
    bio: "The architect of South African house. Decades of craft and a sound that has shaped a continent.",
    set: "Main Stage · Sunset",
  },
  {
    name: "NASTY C",
    image: nastyC,
    tag: "Hip-Hop · Lyricist",
    bio: "Sharp pen, world-class delivery and a catalogue that bridges Durban and the global stage.",
    set: "Main Stage · Prime Time",
  },
  {
    name: "MUSA KEYS",
    image: musaKeys,
    tag: "Amapiano · Producer",
    bio: "From Selema to Unite The World, Musa Keys turns log-drum grooves into stadium-sized choruses.",
    set: "Second Stage · Headline",
  },
  {
    name: "UNCLE WAFFLES",
    image: uncleWaffles,
    tag: "Amapiano · DJ",
    bio: "The face of new amapiano. Sold-out tours and a stage presence built for big moments.",
    set: "Second Stage · Late Night",
  },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Scorpion Kings Live | Home of the Culture" },
      {
        name: "description",
        content:
          "Scorpion Kings Live, artists, events and the culture. Be first to know about lineup drops, tickets and exclusive content.",
      },
      { property: "og:title", content: "Scorpion Kings Live" },
      {
        property: "og:description",
        content: "Home of the artists, the events and the culture.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [activeTier, setActiveTier] = useState<TicketTier | null>(null);
  const isMobile = useIsMobile();

  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cycle, setCycle] = useState(0);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = true;

    const tryPlay = () => {
      video.play().catch(() => {});
    };

    tryPlay();

    let lastTime = 0;

    const onTimeUpdate = () => {
      if (video.currentTime + 0.5 < lastTime) {
        setCycle((current) => current + 1);
      }

      lastTime = video.currentTime;
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", tryPlay);
    video.addEventListener("canplay", tryPlay);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
    };
  }, []);

  return (
    <>
      
      <section ref={heroRef} aria-labelledby="hero-heading" className="relative isolate z-0 overflow-hidden bg-black">

        <h1 id="hero-heading" className="sr-only">
          Scorpion Kings Live, DJ Maphorisa and Kabza De Small headline FNB Stadium, Johannesburg, on 19 September 2026
        </h1>

        <div className="w-full">
          <FadeIn>
            <motion.div style={{ y, opacity }} className="relative">
              <figure className="relative h-[100svh] w-full overflow-hidden bg-black md:h-[85vh] md:max-h-[820px] md:min-h-[420px]">
                <video
                  ref={videoRef}
                  key={isMobile ? "mobile" : "desktop"}
                  src={isMobile ? "/hero-video-mobile.mp4" : "/hero-video.mp4"}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label="Scorpion Kings Live logo reveal"
                  className="relative h-full w-full object-contain md:object-cover"
                />

                <div className="pointer-events-none absolute inset-0" />


                <figcaption className="sr-only">
                  Scorpion Kings Live footage of DJ Maphorisa and Kabza De Small on stage.
                </figcaption>
              </figure>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      <div id="scorpion-kings" className="relative isolate z-20 bg-black text-white">
        <Section className="!pb-12 !pt-10 md:!pb-20 md:!pt-16">
          <FadeIn>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-gold">The Headliners</p>
                <h2 className="mt-3 font-display text-4xl font-bold leading-none text-white md:text-6xl">
                  The Scorpion Kings.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-white/65 md:text-base">
                Two producers. One movement. The duo that turned Amapiano into a global sound.
              </p>
            </div>
          </FadeIn>

          <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2 md:gap-8">
            {SCORPION_KINGS.map((king, index) => (
              <motion.article
                key={king.name}
                initial={{ opacity: 0, y: 80, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden rounded-3xl bg-white/[0.04] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.06)] ring-1 ring-white/10"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-[5/6]">
                  <img
                    src={king.image}
                    alt={king.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <p className="text-[10px] uppercase tracking-[0.32em] text-gold">{king.role}</p>
                    <h3 className="mt-2 font-display text-4xl font-bold leading-none text-white md:text-5xl">
                      {king.name}
                    </h3>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80 md:text-base">
                      {king.bio}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </Section>
      </div>

      <div id="lineup" className="fold-safe-strong relative isolate z-10 scroll-mt-24">
        <ArtistCarousel />
      </div>

      <div className="relative isolate z-20 bg-orange-rich">
        <Section className="fold-safe-above !pb-6 text-foreground sm:!pb-10 md:!pb-16">
          <div className="grid gap-3 md:grid-cols-2 md:gap-20">
            <FadeIn>
              <p className="text-xs uppercase tracking-[0.4em] text-white">About</p>
              <h2 className="mt-2 font-display text-5xl font-bold leading-tight text-gold md:text-7xl">
                Built for the artists, powered by the fans.
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="space-y-3 text-lg text-white md:pt-12">
                <p>Scorpion Kings Live champions the bold, the brilliant and the boundary-breaking.</p>
                <p>
                  From amapiano floors to global pop stages, this is where the music, the visuals and the moment meet.
                </p>

                <a
                  href="#experience"
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection("experience");
                  }}
                  className="group inline-flex items-center gap-2 text-white hover:text-white/70"
                >
                  <span className="story-link">Explore the experience</span>
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </FadeIn>
          </div>
        </Section>
      </div>

      <div className="relative isolate z-20 bg-orange-rich">
        <Section className="!pb-10 !pt-4 text-foreground md:!pb-14 md:!pt-8">
          <FadeIn>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-white/70">From the last show</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-white md:text-4xl">
                  A taste of what is coming.
                </h2>
              </div>

              <p className="max-w-xs text-xs text-white/80 md:text-sm">
                Moments from the previous Scorpion Kings Live at FNB Stadium.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="-mx-4 mt-6 overflow-x-auto md:-mx-8">
              <ul className="flex gap-3 px-4 md:gap-4 md:px-8">
                {PAST_EVENT_PHOTOS.map((photo, index) => (
                  <motion.li
                    key={photo.src}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.9,
                      delay: index * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group relative shrink-0 overflow-hidden rounded-lg bg-black/40"
                    style={{
                      width: index === 0 ? "clamp(220px, 36vw, 360px)" : "clamp(160px, 24vw, 260px)",
                      aspectRatio: "3 / 4",
                    }}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                  </motion.li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </Section>
      </div>

      <div className="hidden bg-white text-black md:block">

        <Section className="!bg-white !pt-2 sm:!pt-3 md:!pt-6">
          <motion.div
            initial={{ opacity: 0, y: 60, filter: "blur(14px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-primary">The Lineup</p>
                <h2 className="mt-4 font-display text-5xl font-bold text-black md:text-7xl">
                  2026 Scorpion Kings Live
                </h2>
              </div>

              <a
                href="#lineup"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection("lineup");
                }}
                className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest text-black hover:text-black/60"
              >
                View lineup
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>

          <div className="mt-6 grid gap-6 md:mt-16 sm:grid-cols-2 lg:grid-cols-3">
            {HEADLINERS.map((artist, index) => (
              <motion.div
                key={artist.name}
                initial={{
                  opacity: 0,
                  y: 120,
                  scale: 0.92,
                  filter: "blur(10px)",
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 1.5,
                  delay: index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="group relative block aspect-[3/4] w-full overflow-hidden rounded-3xl bg-card text-left shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55),0_12px_24px_-12px_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.08)] ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.65),0_18px_36px_-12px_rgba(0,0,0,0.5)]">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    width={768}
                    height={1024}
                    loading="lazy"
                    style={{ animationDelay: `${index * -2.5}s` }}
                    className="animate-ken-burns absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.12] group-hover:[animation-play-state:paused]"
                  />

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/55 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 flex flex-col p-6 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1">
                    <h3 className="font-display text-3xl font-bold text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.6)]">
                      {artist.name}
                    </h3>
                    <span className="mt-1 text-[11px] uppercase tracking-widest text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
                      {artist.tag}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>

      <div id="tickets" className="scroll-mt-24 bg-black text-white">
        <div className="bg-black">
          <Section className="!bg-black !pb-4 !pt-8 sm:!pt-10 md:!pb-6 md:!pt-14">
            <FadeIn>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-white">Tickets</p>
                  <h2 className="mt-4 font-display text-5xl font-bold text-gold md:text-7xl md:text-white">
                    Pick your tier.
                  </h2>
                </div>

                <a
                  href="#tickets"
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection("tickets");
                  }}
                  className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest text-white hover:text-white/60"
                >
                  Ticket options
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </FadeIn>
          </Section>
        </div>

        <div className="bg-black">
          <Section className="!bg-black !pt-4 md:!pt-2">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  name: "General Access",
                  price: "From R 400",
                  tag: "Stage front to floor",
                },
                {
                  name: "VIP",
                  price: "TBA",
                  tag: "Elevated view, fast lines",
                  highlight: true,
                },
                {
                  name: "Premium Table",
                  price: "TBA",
                  tag: "Hospitality + bottle service",
                },
              ].map((tier, index) => {
                const gold = index % 2 === 0;

                return (
                  <motion.article
                    key={tier.name}
                    initial={{ opacity: 0, y: 80, filter: "blur(14px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 1.1,
                      delay: index * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ y: -10 }}
                    style={{
                      boxShadow:
                        "inset 0 1px 0 0 rgba(255,255,255,0.18), inset 0 -1px 0 0 rgba(0,0,0,0.35), 0 24px 60px -20px rgba(0,0,0,0.55)",
                    }}
                    className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white/[0.06] p-6 backdrop-blur-xl backdrop-saturate-150 transition-[border-color,box-shadow,background-color,transform] duration-500 ease-out hover:bg-white/[0.09] md:p-7 ${
                      gold ? "border-white/15 hover:border-gold/60" : "border-white/15 hover:border-white/35"
                    }`}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-3xl bg-gradient-to-b from-white/15 via-white/[0.04] to-transparent"
                    />

                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10"
                    />

                    <span
                      aria-hidden
                      className={`pointer-events-none absolute inset-0 -translate-y-full opacity-0 transition-all duration-[900ms] ease-out group-hover:translate-y-0 group-hover:opacity-100 ${
                        gold
                          ? "bg-[radial-gradient(120%_60%_at_50%_0%,color-mix(in_oklab,var(--gold)_25%,transparent)_0%,transparent_70%)]"
                          : "bg-[radial-gradient(120%_60%_at_50%_0%,rgba(255,255,255,0.12)_0%,transparent_70%)]"
                      }`}
                    />

                    {tier.highlight && (
                      <span className="pointer-events-none absolute right-5 top-5 z-[2] hidden rounded-full border border-gold/50 bg-gold/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-gold md:inline-block">
                        Most popular
                      </span>
                    )}

                    <div className="relative z-[1] flex h-full flex-col">
                      <p
                        className={`text-[10px] uppercase tracking-[0.4em] text-white/70 transition-colors duration-500 group-hover:text-white ${
                          tier.highlight ? "md:pr-28" : ""
                        }`}
                      >
                        {tier.tag}
                      </p>

                      {tier.highlight && (
                        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.3em] text-gold md:hidden">
                          Most Popular
                        </p>
                      )}

                      <h3
                        className={`mt-3 font-display text-2xl font-bold transition-transform duration-500 ease-out group-hover:translate-x-1 md:text-3xl ${
                          gold ? "text-gold" : "text-white"
                        }`}
                      >
                        {tier.name}
                      </h3>

                      <p className={`mt-3 font-display text-xl font-bold ${gold ? "text-white" : "text-gold"}`}>
                        {tier.price}
                      </p>

                      <button
                        type="button"
                        onClick={() => setActiveTier({ ...tier, gold })}
                        className={`mt-6 inline-flex items-center justify-center gap-2 self-start rounded-full px-5 py-2.5 text-[12px] font-bold uppercase tracking-widest transition-all duration-500 ease-out group-hover:gap-3 group-hover:px-6 md:text-[11px] ${
                          gold
                            ? "bg-gold text-gold-foreground shadow-[0_6px_18px_-8px_color-mix(in_oklab,var(--gold)_70%,transparent)] hover:shadow-[0_14px_36px_-10px_color-mix(in_oklab,var(--gold)_85%,transparent)]"
                            : "bg-white text-black shadow-[0_6px_18px_-8px_rgba(255,255,255,0.25)] hover:shadow-[0_14px_36px_-10px_rgba(255,255,255,0.4)]"
                        }`}
                      >
                        <span>Buy</span>
                        <ArrowRight
                          size={14}
                          className="transition-transform duration-500 ease-out group-hover:translate-x-1"
                        />
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </Section>
        </div>
      </div>

      <div id="experience" className="relative isolate z-30 scroll-mt-24 bg-orange-rich">
        <Section className="!py-10 text-foreground md:!py-14">
          <FadeIn>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-white/70">Experience</p>
                <h2 className="mt-2 font-display text-4xl font-bold text-white md:text-6xl">Inside the show.</h2>
              </div>

              <a
                href="#experience"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection("experience");
                }}
                className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest text-white hover:text-white/70"
              >
                View experience
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </FadeIn>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
            {[
              {
                title: "Main stage",
                body: "Immersive event visuals, lights and the focus of the night.",
                image: pastStadiumFire,
                alt: "Main stage pyrotechnics at FNB Stadium",
              },
              {
                title: "VIP",
                body: "Hospitality, elevated viewing and faster access.",
                image: pastStageWalk,
                alt: "Artist walking the stage in a cream jacket",
              },
              {
                title: "Vendors + merch",
                body: "Food, bars and limited event drops.",
                image: pastRedVocalist,
                alt: "Performer in red on stage under stadium lights",
              },
              {
                title: "Site map + traffic",
                body: "Parking, transport and access info before the show.",
                image: pastFanPhone,
                alt: "Fan smiling in the FNB Stadium stands",
              },
            ].map((block, index) => (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group overflow-hidden rounded-xl border border-white/15 bg-black/40 backdrop-blur-sm transition-transform hover:-translate-y-0.5"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={block.image}
                    alt={block.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>

                <div className="p-4 md:p-5">
                  <h3 className="font-display text-base font-bold text-white md:text-lg">{block.title}</h3>
                  <p className="mt-1 text-xs text-white/75">{block.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>

      <div id="partners" className="relative isolate z-30 scroll-mt-24 bg-black text-white">
        <Section className="!py-10 md:!py-14">
          <FadeIn>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Partners</p>
                <h2 className="mt-2 font-display text-4xl font-bold md:text-6xl">Built with the right crew.</h2>
              </div>

              <p className="max-w-md text-sm text-white/70 md:text-base">
                Brand, media and culture partners helping bring Scorpion Kings Live to the fans.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                {
                  name: "Scorpion Kings Live",
                  logo: skLiveLogo,
                  description: "Event platform",
                },
                {
                  name: "Purple Cow Advertising",
                  logo: partnerLogoFull,
                  description: "Creative and digital partner",
                },
                {
                  name: "Purple Cow",
                  logo: partnerLogoMark,
                  description: "Production support",
                },
              ].map((partner) => (
                <div
                  key={partner.name}
                  className="flex min-h-[160px] flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.06] p-6 text-center backdrop-blur-xl"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    loading="lazy"
                    className="max-h-16 w-auto object-contain"
                  />
                  <h3 className="mt-5 font-display text-xl font-bold">{partner.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.25em] text-white/50">{partner.description}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </Section>
      </div>

      <TicketModal tier={activeTier} onClose={() => setActiveTier(null)} />
    </>
  );
}

type CarouselArtist = {
  name: string;
  image: string;
  tag: string;
};

const CAROUSEL_ARTISTS: CarouselArtist[] = HEADLINERS.map((headliner) => ({
  name: headliner.name,
  image: headliner.image,
  tag: headliner.tag,
}));

function ArtistCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  const recompute = () => {
    const element = trackRef.current;

    if (!element) return;

    const loop = element.scrollWidth / 2;

    setMaxScroll(loop);
    setProgress(loop > 0 ? (element.scrollLeft % loop) / loop : 0);
  };

  useEffect(() => {
    recompute();

    const element = trackRef.current;

    if (!element) return;

    const onScroll = () => {
      const loop = element.scrollWidth / 2;
      setProgress(loop > 0 ? (element.scrollLeft % loop) / loop : 0);
    };

    element.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", recompute);

    return () => {
      element.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", recompute);
    };
  }, []);

  useEffect(() => {
    const element = trackRef.current;

    if (!element) return;

    let rafId = 0;
    let last = performance.now();
    let pausedUntil = 0;

    const speed = 45;

    const tick = (now: number) => {
      const delta = (now - last) / 1000;
      last = now;

      if (now >= pausedUntil) {
        const loopPoint = element.scrollWidth / 2;

        if (loopPoint > 0) {
          let next = element.scrollLeft + speed * delta;

          if (next >= loopPoint) {
            next -= loopPoint;
          }

          element.scrollLeft = next;
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    const pause = () => {
      pausedUntil = performance.now() + 1200;
    };

    element.addEventListener("mouseenter", pause);
    element.addEventListener("focusin", pause);

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      element.removeEventListener("mouseenter", pause);
      element.removeEventListener("focusin", pause);
    };
  }, []);

  const nudge = (direction: 1 | -1) => {
    const element = trackRef.current;

    if (!element) return;

    element.scrollBy({
      left: direction * Math.max(280, element.clientWidth * 0.7),
      behavior: "smooth",
    });
  };

  const onSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const element = trackRef.current;

    if (!element) return;

    const percentage = Number(event.target.value) / 100;

    element.scrollTo({
      left: percentage * maxScroll,
      behavior: "auto",
    });
  };

  return (
    <section
      aria-label="Featured artists carousel"
      className="surface-light relative z-10 border-white pt-2 pb-2 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.4)] md:pt-3 md:pb-8"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-primary">The Roster</p>
            <h2 className="mt-2 font-display text-3xl font-bold leading-none md:text-5xl">Artists on the bill.</h2>
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
        className="no-scrollbar mt-3 flex gap-3 overflow-x-auto px-5 pb-1 sm:mt-4 sm:gap-5 sm:px-6 sm:pb-2 md:gap-6 md:px-10"
        tabIndex={0}
        aria-label="Scroll through featured artists. Use arrow keys or drag."
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            nudge(1);
          }

          if (event.key === "ArrowLeft") {
            event.preventDefault();
            nudge(-1);
          }
        }}
      >
        {[...CAROUSEL_ARTISTS, ...CAROUSEL_ARTISTS].map((artist, index) => (
          <div
            key={`${artist.name}-${index}`}
            aria-label={`Featured artist: ${artist.name}`}
            aria-hidden={index >= CAROUSEL_ARTISTS.length || undefined}
            tabIndex={index >= CAROUSEL_ARTISTS.length ? -1 : 0}
            className="group relative block aspect-[3/4] w-[68%] flex-none overflow-hidden rounded-xl border border-foreground/10 bg-foreground/[0.03] transition-shadow hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 sm:w-[42%] md:w-[28%] lg:w-[22%]"
          >
            <img
              src={artist.image}
              alt={artist.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.1]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-100" />

            <div className="absolute inset-x-0 bottom-0 translate-y-1 p-3 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 sm:p-4 md:p-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-background/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {artist.tag}
              </p>

              <h3 className="mt-0.5 font-display text-lg font-bold leading-tight text-background sm:mt-1 sm:text-xl md:text-2xl">
                {artist.name}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-3 flex max-w-[1400px] items-center gap-4 border-orange-500 px-5 sm:mt-6 sm:px-6 md:px-10">
        <span className="hidden font-mono text-[11px] uppercase tracking-widest text-foreground/60 sm:inline">
          {String(Math.round(progress * 100)).padStart(2, "0")}%
        </span>

        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(progress * 100)}
          onChange={onSliderChange}
          aria-label="Scroll position"
          className="h-1 w-32 cursor-pointer accent-[var(--orange-rich,theme(colors.orange.600))] sm:w-44"
        />

        <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-orange-rich/15">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-orange-rich transition-[width] duration-150"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
            aria-hidden
          />
        </div>
      </div>

    </section>
  );
}
