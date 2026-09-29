import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessagesSquare, X } from "lucide-react";
import { FeedbackForm } from "@/components/site/FeedbackForm";

const SEEN_KEY = "sk_feedback_seen";

// Non-intrusive: opens once per session a few seconds after landing, and can
// always be re-opened from the floating pill. Never interrupts navigation —
// it only lives on the page it is mounted on.
export function FeedbackPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [pillVisible, setPillVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (sessionStorage.getItem(SEEN_KEY)) {
      setPillVisible(true);
      return;
    }

    // Never stack on top of the Sony subscribe popup — wait until it's gone.
    const tryOpen = (attempt: number) => {
      const subscribeOpen = !!document.querySelector("[data-subscribe-popup]");
      if (subscribeOpen && attempt < 45) {
        window.setTimeout(() => tryOpen(attempt + 1), 1000);
        return;
      }
      sessionStorage.setItem(SEEN_KEY, "1");
      setIsOpen(true);
      setPillVisible(true);
    };

    const timer = window.setTimeout(() => {
      setPillVisible(true);
      tryOpen(0);
    }, 9000);

    return () => window.clearTimeout(timer);

  }, []);

  const close = () => setIsOpen(false);

  return (
    <>
      <AnimatePresence>
        {!isOpen && pillVisible && (
          <motion.button
            type="button"
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed inset-x-0 bottom-5 z-40 mx-auto flex w-fit items-center gap-2.5 rounded-full border border-gold/50 bg-black/70 py-3 pe-5 ps-4 text-xs font-bold uppercase tracking-widest text-gold shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-transform hover:scale-105 md:bottom-6"
          >
            <motion.span
              aria-hidden
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <MessagesSquare size={16} />
            </motion.span>
            WHERE TO NEXT?
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/80 p-4 pt-24 backdrop-blur-sm md:pt-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative max-h-[74vh] w-full max-w-md overflow-y-auto rounded-3xl border border-white/15 bg-zinc-950 p-5 shadow-2xl md:max-h-[90vh] md:max-w-lg md:p-8"
            >
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-4 top-4 text-white/50 transition-colors hover:text-gold"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-6 text-center">
                <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Your voice</p>
                <h2 className="mt-2 font-display text-3xl font-bold leading-tight text-white md:text-4xl">
                  We want to hear from you.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/65">
                  Submit your thoughts, ideas and where should we take the show next.
                </p>
              </div>

              <FeedbackForm />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
