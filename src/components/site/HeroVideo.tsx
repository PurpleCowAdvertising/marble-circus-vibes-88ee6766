import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { FadeIn } from "@/components/site/Section";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Looping hero video used on the home page and every other landing page.
 * Mirrors the home hero exactly: video background + date row + Buy Tickets CTA.
 */
export function HeroVideo() {
  const isMobile = useIsMobile();
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cycle, setCycle] = useState(0);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    let last = 0;
    const onTime = () => {
      if (v.currentTime + 0.5 < last) setCycle((c) => c + 1);
      last = v.currentTime;
    };
    const onLoaded = () => tryPlay();
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("canplay", onLoaded);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("canplay", onLoaded);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      aria-label="Scorpion Kings Live hero"
      className="relative z-0 isolate overflow-hidden bg-black"
    >
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
                className="relative h-full w-full object-cover"
              />

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end gap-3 p-6 pb-[calc(8svh+4.5rem)] md:gap-5 md:pb-[calc(10vh+3rem)]">
                <motion.div
                  key={`date-${cycle}`}
                  initial={{ opacity: 0, y: 22, letterSpacing: "0.7em", filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, letterSpacing: "0.35em", filter: "blur(0px)" }}
                  transition={{ duration: 8, ease: "easeOut" }}
                  className="flex flex-wrap items-center justify-center gap-2.5 font-display text-[19px] font-bold uppercase text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)] sm:gap-4 sm:text-[25px] md:text-[28px]"
                >
                  <span>19 Sep 26</span>
                  <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
                  <span>FNB Stadium</span>
                </motion.div>
                <motion.div
                  key={`cta-${cycle}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 8, ease: "easeOut" }}
                >
                  <Link
                    to="/tickets"
                    className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3 font-display text-sm font-bold uppercase tracking-widest text-white backdrop-blur-xl backdrop-saturate-150 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),inset_0_-1px_0_0_rgba(0,0,0,0.25),0_18px_40px_-12px_rgba(0,0,0,0.55)] transition-transform hover:scale-105 sm:text-base"
                  >
                    Buy Tickets
                  </Link>
                </motion.div>
              </div>

              <figcaption className="sr-only">
                Scorpion Kings Live — 19 September 2026 at FNB Stadium, Johannesburg.
              </figcaption>
            </figure>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
