import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

import heroVideoAsset from "@/assets/hero-video.mp4.asset.json";
import heroVideoMobileAsset from "@/assets/hero-video-mobile.mp4.asset.json";
import { TICKET_SALES_VISIBLE } from "@/config/site-campaign";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Looping hero video used on inner landing pages.
 * Video background + date row + Buy Tickets CTA.
 */
export function HeroVideo({ overlay }: { overlay?: ReactNode }) {
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
  // Softens the whole frame as it leaves, so the bottom edge melts instead of cutting
  const videoBlur = useTransform(scrollYProgress, [0, 0.55], ["blur(0px)", "blur(14px)"]);
  const seamOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);

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
    window.open(
      "https://www.webtickets.co.za/v2/event.aspx?itemid=1594173143",
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section
      ref={heroRef}
      aria-label="Scorpion Kings Live hero"
      className="relative isolate z-0 bg-black"
    >
      <div className="w-full">
        <motion.div style={isMobile ? undefined : { y, opacity }} className="relative">
          <figure className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-black md:h-screen">
            <motion.video
              ref={videoRef}
              key={isMobile ? "mobile" : "desktop"}
              src={isMobile ? heroVideoMobileAsset.url : heroVideoAsset.url}
              poster={isMobile ? "/hero-poster-mobile.jpg" : "/hero-poster.jpg"}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              aria-label="Scorpion Kings Live logo reveal"
              style={{
                filter: isMobile ? undefined : videoBlur,
                WebkitMaskImage:
                  "linear-gradient(to bottom, #000 0%, #000 78%, rgba(0,0,0,0.6) 90%, rgba(0,0,0,0) 100%)",
                maskImage:
                  "linear-gradient(to bottom, #000 0%, #000 78%, rgba(0,0,0,0.6) 90%, rgba(0,0,0,0) 100%)",
              }}
              className="relative h-full w-full object-cover"
            />


            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-black/20" />

            {overlay && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 mx-auto flex max-w-[1400px] px-5 pb-[calc(22svh+4.5rem)] sm:px-6 md:px-10 md:pb-[calc(22vh+3rem)]">
                {overlay}
              </div>
            )}

            {/* Soft blend into the next section — dissolves the hard bottom edge on scroll */}
            <motion.div
              aria-hidden
              style={{ opacity: seamOpacity }}
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-black/30 to-black/60 md:h-40"
            />




              {TICKET_SALES_VISIBLE && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 p-6 pb-[calc(7svh+4.5rem)] md:gap-5 md:pb-[calc(8vh+3rem)]">
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
              )}

            <figcaption className="sr-only">
              Scorpion Kings Live, 19 September 2026 at FNB Stadium, Johannesburg.
            </figcaption>
          </figure>

          {/* Bleeds a soft black-to-transparent taper down into the next section for a seamless seam */}
          <div
            aria-hidden
            className="pointer-events-none relative z-10 -mt-16 h-16 w-full bg-gradient-to-b from-black/60 to-transparent md:-mt-24 md:h-24"
          />
        </motion.div>
      </div>
    </section>
  );
}

