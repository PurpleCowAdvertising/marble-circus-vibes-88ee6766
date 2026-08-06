import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";

import { TICKETS_URL } from "./FieldTicketsPopup";

const SESSION_KEY = "sk_ticket_bar_dismissed";
export const TICKET_BAR_EVENT = "sk-ticket-bar";
const BAR_OFFSET = 64;

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
          <div className="pointer-events-auto mx-auto flex max-w-xl items-center gap-3 rounded-full border border-gold/50 bg-black/70 px-4 py-2.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_24px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl backdrop-saturate-150 sm:gap-5 sm:px-5 sm:py-3">

            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-gold">Field · Selling out</p>
              <p className="mt-0.5 truncate font-display text-base font-bold leading-tight text-white sm:text-lg">
                Final release from R990
              </p>
            </div>

            <a
              href={TICKETS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex flex-none items-center gap-1.5 rounded-full bg-gold px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-black transition-all duration-300 hover:gap-2.5 sm:px-5 sm:text-xs"
            >
              <span>Buy Now</span>
              <ArrowUpRight size={13} />
            </a>

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
