import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { ArrowRight, MapPin, X } from "lucide-react";

export const PARK_RIDE_LOCATIONS = [
  "Clearwater Mall",
  "Cresta Shopping Centre",
  "East Rand Mall",
  "Menlyn Park Shopping Centre",
  "Montecasino",
  "Greenstone Shopping Centre",
  "Melrose Arch",
  "Nelson Mandela Square at Sandton City",
  "Mall of Africa",
  "The Glen Shopping Centre",
  "Gold Reef City Casino",
];

export const PARK_RIDE_URL = "https://www.webtickets.co.za/v2/event.aspx?itemid=1594653275";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function ParkRideModal({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [open, onClose]);

  const handleSelect = () => {
    onClose();
    window.open(PARK_RIDE_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-black/85" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Choose your Park & Ride location"
            initial={{ opacity: 0, y: 36, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[92%] max-w-sm overflow-y-auto rounded-2xl border border-gold/50 bg-black p-5 text-white shadow-2xl sm:w-full sm:max-w-lg sm:rounded-3xl sm:p-8 max-h-[calc(100dvh-9rem)] sm:max-h-[calc(100dvh-4rem)]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 sm:right-4 sm:top-4 sm:h-9 sm:w-9"
            >
              <X size={16} />
            </button>

            <p className="pr-10 text-[10px] uppercase tracking-[0.4em] text-white/60 sm:pr-12">Park &amp; Ride</p>
            <h3 className="mt-2 font-display text-2xl font-bold text-gold sm:text-3xl sm:font-bold">Choose Your Location</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              Select your preferred pick-up point to continue to secure checkout.
            </p>

            <ul className="mt-5 space-y-2 sm:mt-6">
              {PARK_RIDE_LOCATIONS.map((location) => (
                <li key={location}>
                  <button
                    type="button"
                    onClick={handleSelect}
                    className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-white/15 bg-white/[0.06] px-3 py-2.5 text-left text-sm text-white/90 transition-all duration-300 hover:border-gold/60 hover:bg-gold/10 hover:text-white sm:px-4 sm:py-3"
                  >
                    <span className="flex items-center gap-3">
                      <MapPin size={14} className="flex-none text-gold" />
                      {location}
                    </span>
                    <ArrowRight
                      size={14}
                      className="flex-none text-gold transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-center text-[10px] uppercase tracking-[0.3em] text-white/50 sm:mt-5">
              Secure checkout · Webtickets
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
