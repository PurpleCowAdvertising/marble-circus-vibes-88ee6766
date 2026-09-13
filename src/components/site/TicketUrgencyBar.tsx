import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpRight, BusFront, X } from "lucide-react";

const SESSION_KEY = "sk_ticket_bar_dismissed";
export const TICKET_BAR_EVENT = "sk-ticket-bar";
const BAR_OFFSET = 120;

export function TicketUrgencyBar() {
  const [dismissed, setDismissed] = useState(true);
  const [pastHero, setPastHero] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setDismissed(Boolean(sessionStorage.getItem(SESSION_KEY)));

    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const footerEl = document.getElementById("site-footer");
    let observer: IntersectionObserver | undefined;
    if (footerEl && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting), { threshold: 0 });
      observer.observe(footerEl);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  const visible = !dismissed && pastHero && !footerVisible;

  // Tell the countdown card to morph out while this card owns the slot.
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent(TICKET_BAR_EVENT, { detail: visible ? BAR_OFFSET : 0 }));
  }, [visible]);

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sk-ticket-bar"
          initial={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] px-4"
        >
          <div className="pointer-events-auto relative mx-auto flex max-w-xl items-center gap-3 rounded-full border border-gold/70 bg-black/75 px-4 py-2.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_0_0_1px_color-mix(in_oklab,var(--gold)_25%,transparent),0_24px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl backdrop-saturate-150 sm:gap-5 sm:px-5 sm:py-3">
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-gold/60"
              animate={{ opacity: [0.15, 0.7, 0.15], scale: [1, 1.035, 1] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            />

            <span className="relative hidden h-9 w-9 flex-none items-center justify-center rounded-full bg-gold/15 text-gold ring-1 ring-gold/50 sm:inline-flex">
              <BusFront size={17} />
            </span>

            <div className="relative min-w-0 flex-1">
              <p className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.3em] text-gold">
                <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
                Recommended · Park + Ride
              </p>
              <p className="mt-0.5 truncate font-display text-base font-bold leading-tight text-white sm:text-lg">
                Skip the traffic from R225
              </p>
            </div>

            <Link
              to="/faqs"
              hash="park-ride"
              className="group relative inline-flex flex-none items-center gap-1.5 rounded-full bg-gold px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-black transition-all duration-300 hover:gap-2.5 sm:px-5 sm:text-xs"
            >
              <span>Book Now</span>
              <ArrowUpRight size={13} />
            </Link>

            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss ticket banner"
              className="inline-flex h-7 w-7 flex-none items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <X size={13} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
