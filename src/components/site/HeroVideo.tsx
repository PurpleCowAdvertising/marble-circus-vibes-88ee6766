import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

import { FadeIn } from "@/components/site/Section";
import { useIsMobile } from "@/hooks/use-mobile";

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

/**
 * Looping hero video used on inner landing pages.
 * Video background + date row + Buy Tickets CTA.
 */
export function HeroVideo() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  const isMobile = useIsMobile();
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cycle, setCycle] = useState(0);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

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

  const handleTicketsClick = () => {
    if (pathname !== "/") {
      window.location.href = "/#tickets";
      return;
    }

    window.history.pushState(null, "", "/#tickets");

    window.setTimeout(() => {
      scrollToSection("tickets");
    }, 50);
  };

  return (
    <section
      ref={heroRef}
      aria-label="Scorpion Kings Live hero"
      className="relative isolate z-0 overflow-hidden bg-black"
    >
      <div className="w-full">
        <FadeIn>
          <motion.div style={{ y, opacity }} className="relative">
            <figure className="relative h-[88svh] min-h-[560px] w-full overflow-hidden bg-black md:h-[82vh] md:min-h-[520px] md:max-h-[820px]">
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
                className="relative h-full w-full object-cover"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/20" />

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end gap-3 p-6 pb-[calc(7svh+4.5rem)] md:gap-5 md:pb-[calc(8vh+3rem)]">
                <motion.div
                  key={`date-${cycle}`}
                  initial={{
                    opacity: 0,
                    y: 22,
                    letterSpacing: "0.7em",
                    filter: "blur(10px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    letterSpacing: "0.35em",
                    filter: "blur(0px)",
                  }}
                  transition={{ duration: 8, ease: "easeOut" }}
                  className="flex flex-wrap items-center justify-center gap-2.5 font-display text-[19px] font-bold uppercase text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)] sm:gap-4 sm:text-[25px] md:text-[28px]"
                >
                  <span>19 Sep 26</span>
                  <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
                  <span>FNB Stadium</span>
                </motion.div>

                <motion.button
                  key={`cta-${cycle}`}
                  type="button"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 8, ease: "easeOut" }}
                  onClick={handleTicketsClick}
                  className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3 font-display text-sm font-bold uppercase tracking-widest text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),inset_0_-1px_0_0_rgba(0,0,0,0.25),0_18px_40px_-12px_rgba(0,0,0,0.55)] backdrop-blur-xl backdrop-saturate-150 transition-transform hover:scale-105 sm:text-base"
                >
                  Buy Tickets
                </motion.button>
              </div>

              <figcaption className="sr-only">
                Scorpion Kings Live, 19 September 2026 at FNB Stadium, Johannesburg.
              </figcaption>
            </figure>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
