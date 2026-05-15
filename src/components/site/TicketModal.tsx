import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, X, Check } from "lucide-react";

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
    "Standing access · Stage front to floor",
    "Entry from 14:00 · Doors close 22:30",
    "All main stage performances",
  ],
  "VIP": [
    "Elevated viewing deck",
    "Fast-track entry & dedicated bar",
    "VIP washrooms + lounge access",
  ],
  "Premium / Table": [
    "Private table · Hospitality service",
    "Bottle service & curated menu",
    "Closest to the stage · Concierge host",
  ],
};

export function TicketModal({ tier, onClose }: Props) {
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!tier) return;
    setQty(1);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [tier, onClose]);

  const gold = !!tier?.gold;
  const perks = tier ? PERKS[tier.name] ?? [] : [];

  return (
    <AnimatePresence>
      {tier && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${tier.name} tickets`}
            initial={{ opacity: 0, y: 60, scale: 0.94, rotateX: 8, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 40, scale: 0.96, filter: "blur(10px)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              transformStyle: "preserve-3d",
              boxShadow: gold
                ? "inset 0 1px 0 0 color-mix(in oklab, var(--gold) 60%, transparent), inset 0 -1px 0 0 rgba(0,0,0,0.4), 0 40px 80px -20px rgba(0,0,0,0.7), 0 0 60px -10px color-mix(in oklab, var(--gold) 40%, transparent)"
                : "inset 0 1px 0 0 rgba(255,255,255,0.4), inset 0 -1px 0 0 rgba(0,0,0,0.4), 0 40px 80px -20px rgba(0,0,0,0.7), 0 0 60px -10px rgba(255,255,255,0.15)",
            }}
            className={`relative w-full max-w-lg overflow-hidden rounded-3xl border p-6 sm:p-8 backdrop-blur-2xl backdrop-saturate-150 ${
              gold
                ? "border-gold/40 bg-gradient-to-br from-gold/[0.18] via-gold/[0.06] to-black/40"
                : "border-white/25 bg-gradient-to-br from-white/[0.16] via-white/[0.05] to-black/40"
            }`}
          >
            {/* Top specular highlight */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-3xl bg-gradient-to-b from-white/30 via-white/5 to-transparent opacity-70 mix-blend-overlay"
            />
            {/* Inset edge ring for 3D rim */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/15"
            />
            {/* Ambient glow */}
            <span
              aria-hidden
              className={`pointer-events-none absolute -top-1/2 left-1/2 h-[140%] w-[140%] -translate-x-1/2 rounded-full opacity-60 blur-3xl ${
                gold
                  ? "bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--gold)_30%,transparent),transparent_70%)]"
                  : "bg-[radial-gradient(closest-side,rgba(255,255,255,0.2),transparent_70%)]"
              }`}
            />

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/90 backdrop-blur-md transition hover:scale-105 hover:bg-white/20"
            >
              <X size={16} />
            </button>

            <div className="relative z-[1]">
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/70">{tier.tag}</p>
              <div className="mt-2 flex items-end justify-between gap-4">
                <h3 className={`font-display text-3xl font-bold sm:text-4xl ${gold ? "text-gold" : "text-white"}`}>
                  {tier.name}
                </h3>
                {tier.highlight && (
                  <span className="rounded-full bg-gold px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-gold-foreground shadow-[0_8px_20px_-6px_color-mix(in_oklab,var(--gold)_70%,transparent)]">
                    Popular
                  </span>
                )}
              </div>
              <p className={`mt-3 font-display text-2xl font-bold ${gold ? "text-gold" : "text-white"}`}>{tier.price}</p>

              {/* Perks */}
              <ul className="mt-6 space-y-2.5">
                {perks.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-white/85">
                    <span
                      className={`mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full ${
                        gold ? "bg-gold text-gold-foreground" : "bg-white text-black"
                      }`}
                    >
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              {/* Quantity */}
              <div className="mt-7 flex items-center justify-between rounded-2xl border border-white/15 bg-white/[0.06] p-3 backdrop-blur-md">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">Quantity</p>
                  <p className="mt-0.5 text-sm text-white/90">Max 8 per order</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 disabled:opacity-40"
                    disabled={qty <= 1}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-6 text-center font-display text-xl font-bold text-white">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.min(8, q + 1))}
                    aria-label="Increase quantity"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 disabled:opacity-40"
                    disabled={qty >= 8}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* CTA */}
              <Link
                to="/tickets"
                onClick={onClose}
                className={`group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-500 ease-out hover:gap-3 ${
                  gold
                    ? "bg-gold text-gold-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.55),0_14px_36px_-10px_color-mix(in_oklab,var(--gold)_85%,transparent)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.7),0_18px_44px_-10px_color-mix(in_oklab,var(--gold)_95%,transparent)]"
                    : "bg-white text-black shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_14px_36px_-10px_rgba(255,255,255,0.45)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,1),0_18px_44px_-10px_rgba(255,255,255,0.6)]"
                }`}
              >
                <span>Checkout · {qty} ticket{qty > 1 ? "s" : ""}</span>
                <ArrowRight size={14} className="transition-transform duration-500 ease-out group-hover:translate-x-1" />
              </Link>
              <p className="mt-3 text-center text-[10px] uppercase tracking-[0.3em] text-white/50">
                Secure checkout · Webtickets
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
