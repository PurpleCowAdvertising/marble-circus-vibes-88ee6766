import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Check, Minus, Plus, X } from "lucide-react";

export type TicketTier = {
  name: string;
  price: string;
  tag: string;
  highlight?: boolean;
  gold?: boolean;
};

type Props = {
  tier: TicketTier | null;
  onClose: () => void;
};

const PERKS: Record<string, string[]> = {
  "General Access": [
    "Standing access from stage front to floor",
    "Entry from 14:00",
    "Access to all main stage performances",
  ],
  VIP: ["Elevated viewing deck", "Fast-track entry and dedicated bar", "VIP washrooms and lounge access"],
  "Premium Table": [
    "Private table and hospitality service",
    "Bottle service and curated menu",
    "Premium host support close to the stage",
  ],
};

export function TicketModal({ tier, onClose }: Props) {
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!tier) return;

    setQty(1);

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [tier, onClose]);

  if (!tier) return null;

  const gold = Boolean(tier.gold);
  const perks = PERKS[tier.name] ?? [];

  const handleCheckout = () => {
    onClose();
    window.open("https://www.webtickets.co.za", "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button
          type="button"
          aria-label="Close ticket modal"
          onClick={onClose}
          className="absolute inset-0 bg-black/85"
        />

        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${tier.name} tickets`}
          initial={{ opacity: 0, y: 36, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`relative max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-3xl border p-6 text-white shadow-2xl sm:p-8 ${
            gold ? "border-gold/50 bg-black" : "border-white/20 bg-black"
          }`}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
          >
            <X size={16} />
          </button>

          <div className="relative z-[1]">
            <p className="pr-12 text-[10px] uppercase tracking-[0.4em] text-white/60">{tier.tag}</p>

            <div className="mt-2 flex items-start justify-between gap-4 pr-10">
              <h3 className={`font-display text-3xl font-bold sm:text-4xl ${gold ? "text-gold" : "text-white"}`}>
                {tier.name}
              </h3>

              {tier.highlight && (
                <span className="rounded-full bg-gold px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-black">
                  Popular
                </span>
              )}
            </div>

            <p className={`mt-3 font-display text-2xl font-bold ${gold ? "text-gold" : "text-white"}`}>{tier.price}</p>

            <ul className="mt-6 space-y-2.5">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3 text-sm text-white/85">
                  <span
                    className={`mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full ${
                      gold ? "bg-gold text-black" : "bg-white text-black"
                    }`}
                  >
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span>{perk}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 p-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">Quantity</p>
                <p className="mt-0.5 text-sm text-white/80">Max 8 per order</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQty((current) => Math.max(1, current - 1))}
                  aria-label="Decrease quantity"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 disabled:opacity-40"
                  disabled={qty <= 1}
                >
                  <Minus size={14} />
                </button>

                <span className="w-6 text-center font-display text-xl font-bold text-white">{qty}</span>

                <button
                  type="button"
                  onClick={() => setQty((current) => Math.min(8, current + 1))}
                  aria-label="Increase quantity"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 disabled:opacity-40"
                  disabled={qty >= 8}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className={`group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:gap-3 ${
                gold ? "bg-gold text-black" : "bg-white text-black"
              }`}
            >
              <span>
                Checkout · {qty} ticket{qty > 1 ? "s" : ""}
              </span>
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <p className="mt-3 text-center text-[10px] uppercase tracking-[0.3em] text-white/50">
              Secure checkout · Webtickets
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
