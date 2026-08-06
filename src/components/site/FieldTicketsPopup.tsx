import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpRight, Check, X } from "lucide-react";

const SESSION_KEY = "sk_field_tickets_popup";
export const TICKETS_URL = "https://www.webtickets.co.za/v2/event.aspx?itemid=1594173143";

const POINTS = [
  "Standing access, stage front to floor",
  "FNB Stadium · 19 September 2026",
  "Final release — limited Field inventory",
];

export function FieldTicketsPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const id = window.setTimeout(() => {
      // Don't interrupt an already-open overlay (cart drawer, other modal).
      if (document.querySelector('[role="dialog"], .shopify-buy-modal, .shopify-buy__cart--visible')) return;
      setOpen(true);
    }, 4000);

    return () => window.clearTimeout(id);
  }, []);

  const dismiss = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    if (!open) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="sk-field-popup"
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            type="button"
            aria-label="Close ticket offer"
            onClick={dismiss}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Field tickets"
            initial={{ opacity: 0, y: 36, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-3xl border border-gold/50 bg-black p-6 text-white shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] sm:p-8"
          >
            <button
              type="button"
              onClick={dismiss}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
            >
              <X size={16} />
            </button>

            <p className="pr-12 text-[10px] font-bold uppercase tracking-[0.4em] text-gold">
              Final release · Selling out
            </p>

            <h2 className="mt-3 font-display text-4xl font-bold leading-[0.95] text-white sm:text-5xl">
              Field tickets
            </h2>

            <p className="mt-3 font-display text-2xl font-bold text-gold">From R990</p>

            <ul className="mt-6 space-y-2.5">
              {POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-white/85">
                  <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-gold text-black">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <a
              href={TICKETS_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={dismiss}
              className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-4 text-xs font-bold uppercase tracking-widest text-black transition-all duration-300 hover:gap-3"
            >
              <span>Buy Field Tickets</span>
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>

            <button
              type="button"
              onClick={dismiss}
              className="mt-3 w-full text-center text-[10px] uppercase tracking-[0.3em] text-white/45 transition hover:text-white/70"
            >
              Not now
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
