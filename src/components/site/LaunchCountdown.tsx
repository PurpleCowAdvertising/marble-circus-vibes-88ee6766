import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

// Event starts 19 Sep 2026, 18:00 SAST (Africa/Johannesburg, UTC+02:00, no DST).
const EVENT_ISO = "2026-09-19T18:00:00+02:00";
const EVENT_DATE = new Date(EVENT_ISO).getTime();

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function diff(): Parts {
  const ms = Math.max(0, EVENT_DATE - Date.now());
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms / 3_600_000) % 24);
  const minutes = Math.floor((ms / 60_000) % 60);
  const seconds = Math.floor((ms / 1_000) % 60);
  return { days, hours, minutes, seconds };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function LaunchCountdown() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [parts, setParts] = useState<Parts>(() => diff());
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [vh, setVh] = useState(0);
  const [localLabel, setLocalLabel] = useState<string>("");
  const [localTz, setLocalTz] = useState<string>("local");

  useEffect(() => {
    setMounted(true);
    setParts(diff());

    try {
      setLocalTz(Intl.DateTimeFormat().resolvedOptions().timeZone);
      setLocalLabel(
        new Intl.DateTimeFormat(undefined, {
          weekday: "short",
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
        }).format(new Date(EVENT_ISO)),
      );
    } catch {
      /* ignore */
    }

    const onScroll = () => setScrollY(window.scrollY);
    const onResize = () => {
      setIsMobile(window.matchMedia("(max-width: 639px)").matches);
      setVh(window.innerHeight);
    };
    onScroll();
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const id = window.setInterval(() => setParts(diff()), 1000);
    return () => window.clearInterval(id);
  }, [visible]);

  // Smooth scroll-driven interpolation across a longer range for a gentler glide.
  const range = isMobile ? 480 : 640;
  const t = Math.min(1, Math.max(0, scrollY / range));
  const ease = t * t * (3 - 2 * t); // smoothstep
  const restBottom = isMobile
    ? Math.max(24, vh * 0.3 - 208)
    : Math.max(24, vh * 0.3 - 26 - 52);
  const bottom = restBottom + (24 - restBottom) * ease;
  // Never fully disappears — fades to ~55% on scroll.
  const opacity = 1 - 0.45 * ease;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sk-countdown"
          initial={false}
          animate={{ opacity, bottom }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none fixed inset-x-0 z-[80] flex flex-col items-center px-4"
          aria-live="polite"
        >
          <span className="mb-2 rounded-full bg-black/55 px-3 py-1 font-display text-[10px] font-bold uppercase tracking-[0.28em] text-gold shadow-[0_8px_20px_-8px_rgba(0,0,0,0.55)] backdrop-blur-md sm:hidden">
            19 Sep 26 · FNB
          </span>
          <div className="pointer-events-auto relative flex items-center gap-3 rounded-full border border-white/20 bg-black/55 px-4 py-2.5 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_18px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl backdrop-saturate-150 sm:gap-4 sm:px-5 sm:py-3">
            <span className="hidden font-display text-[10px] font-bold uppercase tracking-[0.32em] text-gold sm:inline">
              Countdown
            </span>

            <span aria-hidden className="hidden h-4 w-px bg-white/20 sm:inline-block" />

            <ul className="flex items-center gap-2 sm:gap-3" aria-label="Time until Scorpion Kings Live">
              {(
                [
                  ["Days", parts.days],
                  ["Hrs", parts.hours],
                  ["Min", parts.minutes],
                  ["Sec", parts.seconds],
                ] as const
              ).map(([label, value], index) => (
                <li key={label} className="flex items-center gap-2 sm:gap-3">
                  <div className="flex flex-col items-center leading-none">
                    <span
                      className="font-display text-base font-bold tabular-nums sm:text-lg"
                      suppressHydrationWarning
                    >
                      {mounted ? (label === "Days" ? value : pad(value)) : "--"}
                    </span>
                    <span className="mt-0.5 text-[8px] uppercase tracking-[0.24em] text-white/55 sm:text-[9px]">
                      {label}
                    </span>
                  </div>
                  {index < 3 && (
                    <span aria-hidden className="text-base text-white/30 sm:text-lg">
                      :
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <span aria-hidden className="hidden h-4 w-px bg-white/20 sm:inline-block" />

            <span
              className="hidden text-[10px] uppercase tracking-[0.24em] text-white/70 md:inline"
              suppressHydrationWarning
            >
              19 Sep 26 · FNB
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LaunchCountdown;
