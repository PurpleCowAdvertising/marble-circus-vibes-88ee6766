import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

const EVENT_DATE = new Date("2026-09-19T18:00:00+02:00").getTime();
const STORAGE_KEY = "sk-launch-countdown-seen";

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
  const [visible, setVisible] = useState(false);
  const [parts, setParts] = useState<Parts>(() => diff());

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (window.sessionStorage.getItem(STORAGE_KEY)) return;
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }

    const show = window.setTimeout(() => setVisible(true), 600);
    const auto = window.setTimeout(() => setVisible(false), 9_000);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(auto);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const id = window.setInterval(() => setParts(diff()), 1000);
    return () => window.clearInterval(id);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sk-countdown"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none fixed inset-x-0 bottom-6 z-[80] flex justify-center px-4 sm:bottom-8"
          aria-live="polite"
        >
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
                    <span className="font-display text-base font-bold tabular-nums sm:text-lg">
                      {label === "Days" ? value : pad(value)}
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

            <span className="hidden text-[10px] uppercase tracking-[0.24em] text-white/70 md:inline">
              19 Sep 26 · FNB
            </span>

            <button
              type="button"
              onClick={() => setVisible(false)}
              aria-label="Dismiss countdown"
              className="ml-1 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:bg-white/15 hover:text-white"
            >
              <X size={13} strokeWidth={1.75} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LaunchCountdown;
