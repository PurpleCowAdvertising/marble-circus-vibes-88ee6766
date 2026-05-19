import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, Calendar, MapPin } from "lucide-react";
import { FadeIn, Section } from "@/components/site/Section";
import { TicketModal, type TicketTier } from "@/components/site/TicketModal";
import { LaunchAudio } from "@/components/site/LaunchAudio";

import heroPoster from "@/assets/hero-poster.png";
import heroPosterMobile from "@/assets/hero-poster-mobile.png";
import majorLeague from "@/assets/artists/major-league.jpg";
import tyla from "@/assets/artists/tyla.png";
import blackCoffee from "@/assets/artists/black-coffee.png";
import nastyC from "@/assets/artists/nasty-c.png";
import musaKeys from "@/assets/artists/musa-keys.png";
import uncleWaffles from "@/assets/artists/uncle-waffles.png";
import partnerLogoFull from "@/assets/partners/purple-cow-full.png";
import partnerLogoMark from "@/assets/partners/purple-cow-mark.png";
import skLiveLogo from "@/assets/scorpion-kings-live-logo-cutout.png";
import pastFanPhone from "@/assets/past-event/fan-phone.jpg";
import pastDrummerFire from "@/assets/past-event/drummer-fire.jpg";
import pastStageWalk from "@/assets/past-event/stage-walk.jpg";
import pastRedVocalist from "@/assets/past-event/red-vocalist.jpg";
import pastStadiumFire from "@/assets/past-event/stadium-fire.jpg";

const PAST_EVENT_PHOTOS: { src: string; alt: string }[] = [
  { src: pastStadiumFire, alt: "FNB Stadium ablaze with pyrotechnics during the last Scorpion Kings Live show" },
  { src: pastDrummerFire, alt: "Traditional drummer on stage framed by flames" },
  { src: pastRedVocalist, alt: "Vocalist in red performing under stadium lights" },
  { src: pastStageWalk, alt: "Artist walking the main stage in a cream jacket" },
  { src: pastFanPhone, alt: "Fan smiling in the stands at FNB Stadium" },
];

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
  const [activeTier, setActiveTier] = useState<TicketTier | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* HERO */}
      <section
        ref={heroRef}
        aria-labelledby="hero-heading"
        className="relative z-0 isolate overflow-hidden bg-black pt-16 md:pt-0"
      >
        <h1 id="hero-heading" className="sr-only">
          Scorpion Kings Live — DJ Maphorisa and Kabza De Small headline FNB Stadium, Johannesburg, on 19 September 2028
        </h1>
        <LaunchAudio src="/hero-soundtrack.m4a" startAt={0} />
        <div className="w-full">
          <FadeIn>
            <motion.div style={{ y, opacity }} className="relative">
              {/* Hero video — looping background of the artists live */}
              <figure className="relative w-full overflow-hidden bg-black">
                <video
                  src="/hero-video.mp4"
                  poster={heroPosterMobile}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label="Scorpion Kings live performance footage"
                  className="h-[70vh] max-h-[820px] min-h-[420px] w-full object-cover md:h-[85vh]"
                />
                {/* Centered event logo + date overlay — transparent, no scrim */}
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 md:gap-6">
                  <motion.img
                    src={skLiveLogo}
                    alt="Scorpion Kings Live 2028"
                    initial={{ opacity: 0, scale: 0.96, filter: "blur(10px)" }}
                    animate={{ opacity: [0, 1, 1, 0], scale: 1, filter: "blur(0px)" }}
                    transition={{
                      duration: 9,
                      times: [0, 0.28, 0.72, 1],
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                    className="max-h-[42vh] w-auto max-w-[88%] object-contain drop-shadow-[0_10px_36px_rgba(0,0,0,0.7)] md:max-h-[54vh] md:max-w-[66%]"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 22, letterSpacing: "0.7em", filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, letterSpacing: "0.35em", filter: "blur(0px)" }}
                    transition={{ duration: 2.4, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-wrap items-center justify-center gap-2.5 font-display text-[11px] font-bold uppercase text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)] sm:gap-4 sm:text-sm md:text-base"
                  >
                    <span>19 Sep 28</span>
                    <motion.span
                      aria-hidden
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 3.6, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-block h-1.5 w-1.5 rounded-full bg-gold"
                    />
                    <span>FNB Stadium</span>
                  </motion.div>
                </div>
                <figcaption className="sr-only">
                  Scorpion Kings live — South Africa has always been home. Footage of DJ Maphorisa and Kabza De Small on stage.
                </figcaption>
              </figure>
            </motion.div>
          </FadeIn>

        </div>
      </section>



      {/* ARTIST CAROUSEL — folds up over hero */}
      <div id="lineup" className="relative z-10 isolate fold-safe-strong scroll-mt-24">
        <ArtistCarousel />
      </div>

      {/* ABOUT TEASER */}
      <div className="relative z-20 isolate bg-orange-rich">
        <Section className="text-foreground fold-safe-above !pb-6 sm:!pb-10 md:!pb-16">
          <div className="grid gap-3 md:grid-cols-2 md:gap-20">
            <FadeIn>
              <p className="text-xs uppercase tracking-[0.4em] text-white">About</p>
              <h2 className="mt-2 font-display text-5xl font-bold leading-tight md:text-7xl text-gold">
                Built for the artists, powered by the fans.
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="space-y-3 text-lg text-white md:pt-12">
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
                  className="group inline-flex items-center gap-2 text-white hover:text-white/70"
                >
                  <span className="story-link">Read our story</span>
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </Section>
      </div>

      {/* PAST EVENT GALLERY — restrained horizontal strip, lets the imagery breathe */}
      <div className="relative z-20 isolate bg-orange-rich">
        <Section className="text-foreground !pt-4 !pb-10 md:!pt-8 md:!pb-14">
          <FadeIn>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-black">From the last show</p>
                <h2 className="mt-2 font-display text-2xl font-bold md:text-4xl text-white">
                  A taste of what's coming.
                </h2>
              </div>
              <p className="max-w-xs text-xs text-white/80 md:text-sm">
                Moments from the previous Scorpion Kings Live at FNB Stadium.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-6 -mx-4 md:-mx-8 overflow-x-auto scrollbar-hide">
              <ul className="flex gap-3 px-4 md:gap-4 md:px-8">
                {PAST_EVENT_PHOTOS.map((p, i) => (
                  <motion.li
                    key={p.src}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative shrink-0 overflow-hidden rounded-lg bg-black/40"
                    style={{
                      width: i === 0 ? "clamp(220px, 36vw, 360px)" : "clamp(160px, 24vw, 260px)",
                      aspectRatio: "3 / 4",
                    }}
                  >
                    <img
                      src={p.src}
                      alt={p.alt}
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


      {/* MUSIC PREVIEW — desktop/tablet only (mobile uses the carousel above) */}
      <div className="hidden md:block bg-black text-white">
      <Section className="!pt-2 sm:!pt-3 md:!pt-6 !bg-black">
        <motion.div
          initial={{ opacity: 0, y: 60, filter: "blur(14px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-primary">The Lineup</p>
              <h2 className="mt-4 font-display text-5xl font-bold md:text-7xl text-white">
                Headliners.
              </h2>
            </div>
            <Link
              to="/music"
              className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest text-white hover:text-white/60"
            >
              All artists <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        <div className="mt-6 md:mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HEADLINERS.map((artist, i) => (
            <motion.div
              key={artist.name}
              initial={{ opacity: 0, y: 120, scale: 0.92, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="group relative block aspect-[3/4] w-full overflow-hidden rounded-lg border border-border bg-card text-left"
              >
                <motion.img
                  src={artist.image}
                  alt={artist.name}
                  width={768}
                  height={1024}
                  loading="lazy"
                  initial={{ scale: 1.35 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 h-full w-full object-cover will-change-transform group-hover:scale-[1.08] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                />

                {/* Legibility scrim — guarantees text contrast across every artist image */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/55 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 flex flex-col p-6 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1">
                  <h3 className="font-display text-3xl font-bold text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.6)]">{artist.name}</h3>
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

      {/* TICKETS PREVIEW */}
      <div id="tickets" className="bg-white text-black scroll-mt-24">
        {/* Heading area — white on both mobile + desktop */}
        <div className="bg-white">
          <Section className="!pt-8 sm:!pt-10 md:!pt-14 !pb-4 md:!pb-6 !bg-white">
            <FadeIn>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-black">Tickets</p>
                  <h2 className="mt-4 font-display text-5xl font-bold md:text-7xl text-gold md:text-black">Pick your tier.</h2>
                </div>
                <Link
                  to="/tickets"
                  className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest text-black hover:text-black/60"
                >
                  All tickets <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </FadeIn>
          </Section>
        </div>

        {/* Cards area — black on mobile, white on desktop */}
        <div className="bg-black md:bg-white">
          <Section className="!pt-4 md:!pt-2 !bg-black md:!bg-white">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { name: "General Access", price: "From R 400", tag: "Stage front to floor" },
                { name: "VIP", price: "TBA", tag: "Elevated View, Fast Lines", highlight: true },
                { name: "Premium Table", price: "TBA", tag: "Hospitality + Bottle Service" },
              ].map((t, i) => {
                const gold = i % 2 === 0;
                return (
                  <motion.article
                    key={t.name}
                    initial={{ opacity: 0, y: 80, filter: "blur(14px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 1.1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -10 }}
                    style={{
                      boxShadow: gold
                        ? "inset 0 1px 0 0 color-mix(in oklab, var(--gold) 55%, transparent), inset 0 -1px 0 0 rgba(0,0,0,0.08), 0 20px 50px -20px rgba(0,0,0,0.18)"
                        : "inset 0 1px 0 0 rgba(0,0,0,0.06), inset 0 -1px 0 0 rgba(0,0,0,0.08), 0 20px 50px -20px rgba(0,0,0,0.18)",
                    }}
                    className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 md:p-7 transition-[border-color,box-shadow,background-color,transform] duration-500 ease-out ${
                      gold
                        ? "bg-black bg-none border-gold/50 md:bg-gradient-to-br md:from-gold/[0.22] md:via-gold/[0.10] md:to-white hover:border-gold/80"
                        : "bg-white border-black/15 md:bg-gradient-to-br md:from-black/[0.06] md:via-black/[0.02] md:to-white hover:border-black/40"
                    }`}
                  >
                    {/* Top specular highlight — desktop only (mobile black cards don't need light shine) */}
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-3xl bg-gradient-to-b from-white/60 via-white/10 to-transparent opacity-80 ${gold ? "hidden md:block" : "hidden md:block"}`}
                    />
                    {/* Soft inner edge for depth */}
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ${gold ? "ring-white/10 md:ring-black/5" : "ring-black/5"}`}
                    />
                    {/* Hover dissolve sheen */}
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute inset-0 -translate-y-full opacity-0 transition-all duration-[900ms] ease-out group-hover:translate-y-0 group-hover:opacity-100 ${
                        gold
                          ? "bg-[radial-gradient(120%_60%_at_50%_0%,color-mix(in_oklab,var(--gold)_30%,transparent)_0%,transparent_70%)]"
                          : "bg-[radial-gradient(120%_60%_at_50%_0%,rgba(0,0,0,0.08)_0%,transparent_70%)]"
                      }`}
                    />
                    {/* Most-popular badge — desktop only (mobile shows inline under tag) */}
                    {t.highlight && (
                      <span
                        className={`pointer-events-none absolute right-5 top-5 z-[2] hidden rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] md:inline-block ${
                          gold
                            ? "border-gold/60 bg-gold/15 text-gold"
                            : "border-black/30 bg-black/5 text-black"
                        }`}
                      >
                        Most popular
                      </span>
                    )}
                    <div className="relative z-[1] flex h-full flex-col">
                      <p className={`text-[10px] uppercase tracking-[0.4em] transition-colors duration-500 ${
                        gold
                          ? "text-white md:text-black/70 group-hover:text-white md:group-hover:text-black"
                          : "text-black md:text-black/70 group-hover:text-black"
                      } ${t.highlight ? "md:pr-28" : ""}`}>{t.tag}</p>
                      {t.highlight && (
                        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.3em] text-black md:hidden">
                          Most Popular
                        </p>
                      )}
                      <h3 className={`mt-3 font-display text-2xl font-bold md:text-3xl transition-transform duration-500 ease-out group-hover:translate-x-1 ${gold ? "text-gold" : "text-gold md:text-black"}`}>{t.name}</h3>
                      <p className={`mt-3 font-display text-xl font-bold ${gold ? "text-white md:text-gold" : "text-black"}`}>{t.price}</p>
                      <button
                        type="button"
                        onClick={() => setActiveTier({ ...t, gold })}
                        className={`mt-6 inline-flex items-center justify-center gap-2 self-start rounded-full px-5 py-2.5 text-[12px] md:text-[11px] font-bold uppercase tracking-widest transition-all duration-500 ease-out group-hover:gap-3 group-hover:px-6 ${
                          gold
                            ? "bg-gold text-gold-foreground shadow-[0_6px_18px_-8px_color-mix(in_oklab,var(--gold)_70%,transparent)] hover:shadow-[0_14px_36px_-10px_color-mix(in_oklab,var(--gold)_85%,transparent)]"
                            : "bg-gold text-gold-foreground md:bg-black md:text-white shadow-[0_6px_18px_-8px_rgba(0,0,0,0.35)] hover:shadow-[0_14px_36px_-10px_rgba(0,0,0,0.5)]"
                        }`}
                      >
                        <span>Buy</span>
                        <ArrowRight size={14} className="transition-transform duration-500 ease-out group-hover:translate-x-1" />
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </Section>
        </div>
      </div>

      {/* EXPERIENCE PREVIEW — desktop/tablet only */}
      <div id="experience" className="relative z-30 isolate bg-orange-rich hidden md:block scroll-mt-24">
        <Section className="text-foreground !py-10 md:!py-14">
          <FadeIn>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-black">Experience</p>
                <h2 className="mt-2 font-display text-4xl font-bold md:text-6xl text-white">Inside the show.</h2>
              </div>
              <Link
                to="/experience"
                className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest text-white hover:text-white/70"
              >
                Full experience <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </FadeIn>

          <div className="mt-8 grid gap-3 md:gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Main stage", body: "Immersive event visual, the focus of the night." },
              { title: "VIP", body: "Hospitality and elevated viewing." },
              { title: "Vendors + merch", body: "Food, bars and limited drops." },
              { title: "Site map + traffic", body: "Parking, transport and access info." },
            ].map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group rounded-xl border border-white/15 bg-black/30 p-4 md:p-5 backdrop-blur-sm transition-transform hover:-translate-y-0.5"
              >
                <div className="aspect-[16/10] w-full rounded-md border border-dashed border-white/20 bg-white/[0.03]" aria-hidden />
                <h3 className="mt-3 font-display text-base font-bold text-white md:text-lg">{b.title}</h3>
                <p className="mt-1 text-xs text-white/75">{b.body}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>

      {/* PARTNERS PREVIEW — desktop/tablet only */}
      <div id="partners" className="hidden md:block bg-black text-white scroll-mt-24">
        <Section className="!py-10 md:!py-14 !bg-black">
          <motion.div
            initial={{ opacity: 0, y: 60, filter: "blur(14px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-primary">Partners</p>
                <h2 className="mt-2 font-display text-4xl font-bold md:text-6xl text-white">Powered by the bold.</h2>
              </div>
              <Link
                to="/partners"
                className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest text-white hover:text-white/60"
              >
                All partners <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:mt-8 md:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex aspect-[3/2] items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-500 hover:border-white/30 hover:bg-white/[0.06]"
              >
                <img
                  src={i % 2 === 0 ? partnerLogoFull : partnerLogoMark}
                  alt="Partner logo placeholder"
                  loading="lazy"
                  className="max-h-full max-w-full object-contain opacity-80 transition-opacity duration-500 hover:opacity-100"
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/[0.04] p-6 md:p-8"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-primary">Partner with us</p>
              <h3 className="mt-2 font-display text-xl font-bold md:text-2xl">Move with the culture.</h3>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-105"
            >
              Partner enquiry <ArrowRight size={14} />
            </Link>
          </motion.div>
        </Section>
      </div>

      <div className="relative z-40 isolate bg-orange-rich">
        <Section className="text-foreground !py-8 md:!py-12">
          <FadeIn>
            <p className="text-[10px] uppercase tracking-[0.4em] text-black">Latest</p>
            <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl text-white">News from the Kings.</h2>
            <p className="mt-2 max-w-xl text-sm text-white/85">
              Live updates straight from Kabza De Small and DJ Maphorisa's official Facebook pages.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-5 hidden md:mt-6 md:grid md:gap-4 md:grid-cols-2">
              {[
                { name: "Kabza De Small", handle: "@KabzaDeSmall", href: "https://www.facebook.com/KabzaDeSmall" },
                { name: "DJ Maphorisa", handle: "@djmaphorisa", href: "https://www.facebook.com/djmaphorisa" },
              ].map((p) => (
                <div
                  key={p.name}
                  className="group relative overflow-hidden rounded-xl border border-white/15 bg-black/40 shadow-[0_14px_40px_-18px_rgba(0,0,0,0.7)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-white/30"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  />
                  <div className="flex items-center justify-between gap-2 px-3 py-2 md:px-4 md:py-2.5">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1877F2] font-display text-sm font-bold text-white shadow-md">f</span>
                      <div className="leading-tight">
                        <h3 className="font-display text-sm font-bold text-white md:text-base">{p.name}</h3>
                        <p className="text-[9px] uppercase tracking-widest text-white/60">{p.handle}</p>
                      </div>
                    </div>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/25 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black"
                    >
                      Follow
                    </a>
                  </div>
                  <div className="relative overflow-hidden border-t border-white/10 bg-white">
                    <iframe
                      title={`${p.name} Facebook feed`}
                      src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(p.href)}&tabs=timeline&width=500&height=300&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=false`}
                      style={{ border: "none", overflow: "hidden", width: "100%", height: 300, display: "block" }}
                      scrolling="no"
                      frameBorder="0"
                      allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      loading="lazy"
                    />
                  </div>
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
    const loop = el.scrollWidth / 2; // list is duplicated for seamless marquee
    setMaxScroll(loop);
    setProgress(loop > 0 ? (el.scrollLeft % loop) / loop : 0);
  };

  useEffect(() => {
    recompute();
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const loop = el.scrollWidth / 2;
      setProgress(loop > 0 ? (el.scrollLeft % loop) / loop : 0);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", recompute);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", recompute);
    };
  }, []);

  // Auto-glide: continuous seamless marquee (loops via duplicated list).
  // Works on desktop AND mobile. Pauses briefly on user interaction then resumes.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let rafId = 0;
    let last = performance.now();
    let pausedUntil = 0;
    const SPEED = 45; // pixels per second

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (now >= pausedUntil) {
        const loopPoint = el.scrollWidth / 2;
        if (loopPoint > 0) {
          let next = el.scrollLeft + SPEED * dt;
          if (next >= loopPoint) next -= loopPoint;
          el.scrollLeft = next;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    // Only pause for clear desktop intent (mouse hover / keyboard focus).
    // Mobile touches and page-scroll wheels do NOT pause — the glide stays continuous.
    const bump = () => { pausedUntil = performance.now() + 1200; };

    el.addEventListener("mouseenter", bump);
    el.addEventListener("focusin", bump);

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("mouseenter", bump);
      el.removeEventListener("focusin", bump);
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
      className="relative z-10 surface-light rounded-t-[2.5rem] md:rounded-t-[3rem] shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.4)] pt-6 pb-2 md:py-14 py-[56px] border-white"
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
        className="no-scrollbar mt-4 flex gap-3 overflow-x-auto px-5 pb-1 sm:mt-8 sm:gap-5 sm:px-6 sm:pb-2 md:gap-6 md:px-10"
        tabIndex={0}
        aria-label="Scroll through featured artists. Use arrow keys or drag."
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); nudge(1); }
          if (e.key === "ArrowLeft")  { e.preventDefault(); nudge(-1); }
        }}
      >
        {[...CAROUSEL_ARTISTS, ...CAROUSEL_ARTISTS].map((a, idx) => (
          <Link
            key={`${a.name}-${idx}`}
            to="/music"
            aria-label={`View ${a.name} on the artists page`}
            aria-hidden={idx >= CAROUSEL_ARTISTS.length || undefined}
            tabIndex={idx >= CAROUSEL_ARTISTS.length ? -1 : 0}
            className="group relative block aspect-[3/4] w-[68%] flex-none overflow-hidden rounded-xl border border-foreground/10 bg-foreground/[0.03] transition-shadow hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 sm:w-[42%] md:w-[28%] lg:w-[22%]"
          >
            <img
              src={a.image}
              alt={a.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.1]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 translate-y-1 p-3 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 sm:p-4 md:p-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-background/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100">{a.tag}</p>
              <h3 className="mt-0.5 font-display text-lg font-bold leading-tight text-background sm:mt-1 sm:text-xl md:text-2xl">
                {a.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Scrubber slider */}
      <div className="mx-auto mt-3 flex max-w-[1400px] items-center gap-4 px-5 sm:mt-6 sm:px-6 md:px-10 border-orange-500">
        <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-orange-rich/15">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-orange-rich transition-[width] duration-150"
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
          className="h-1 w-32 cursor-pointer accent-[var(--orange-rich,theme(colors.orange.600))] sm:w-44"
        />
        <span className="hidden font-mono text-[11px] uppercase tracking-widest text-foreground/60 sm:inline">
          {String(Math.round(progress * 100)).padStart(2, "0")}%
        </span>
      </div>
    </section>
  );
}
