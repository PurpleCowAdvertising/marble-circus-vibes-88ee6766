import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const SESSION_KEY = "sk_subscribe_seen";

const schema = z.object({
  email: z.string().trim().email({ message: "Enter a valid email" }).max(255),
  name: z.string().trim().max(100).optional().or(z.literal("")),
  marketingConsent: z.boolean(),
  privacyConsent: z.literal(true, {
    errorMap: () => ({ message: "You must accept the Privacy Policy to subscribe" }),
  }),
});

type Ctx = { open: (source?: string) => void; close: () => void; isOpen: boolean };
const SubscribeContext = createContext<Ctx | null>(null);

export function useSubscribePopup() {
  const ctx = useContext(SubscribeContext);
  if (!ctx) throw new Error("useSubscribePopup must be used inside SubscribeProvider");
  return ctx;
}

export function SubscribeProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<string>("auto");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(true);
  const [privacyConsent, setPrivacyConsent] = useState(false);

  const open = useCallback((src: string = "manual") => {
    setSource(src);
    setSuccess(false);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch {}
  }, []);

  // Gentle auto-trigger: once per session, only after the user has shown
  // engagement (≥35s on the page AND scrolled past 50% of the document).
  // Never fires on first paint, never re-opens after close/submit.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try { if (sessionStorage.getItem(SESSION_KEY)) return; } catch {}

    let fired = false;
    let timeReady = false;
    let scrollReady = false;

    const maybeOpen = () => {
      if (fired || !timeReady || !scrollReady) return;
      fired = true;
      open("auto-engaged");
    };

    const timer = window.setTimeout(() => { timeReady = true; maybeOpen(); }, 35000);

    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = (window.scrollY + window.innerHeight) / doc.scrollHeight;
      if (scrolled > 0.5) { scrollReady = true; maybeOpen(); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  useEffect(() => {
    if (success) {
      try { sessionStorage.setItem(SESSION_KEY, "1"); } catch {}
    }
  }, [success]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, name, marketingConsent, privacyConsent });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("subscribers").insert({
        email: parsed.data.email,
        name: parsed.data.name || null,
        marketing_consent: parsed.data.marketingConsent,
        privacy_consent: parsed.data.privacyConsent,
        consent_at: new Date().toISOString(),
        source,
      });
      if (error) {
        if (error.code === "23505") {
          setSuccess(true);
        } else {
          throw error;
        }
      } else {
        setSuccess(true);
      }
      setEmail("");
      setName("");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SubscribeContext.Provider value={{ open, close, isOpen }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 p-4 backdrop-blur-md"
            onClick={close}
          >
            <motion.div
              initial={{ y: 24, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 12, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", damping: 26, stiffness: 240 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-orange-rich relative w-full max-w-md overflow-hidden rounded-2xl border border-white/15 p-7 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] md:p-9"
            >
              <button
                onClick={close}
                aria-label="Close"
                className="absolute right-3 top-3 z-10 rounded-full p-2 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
              >
                <X size={18} />
              </button>

              <div className="relative">
                {success ? (
                  <div className="py-4 text-center text-white">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                      <span className="font-display text-2xl">✓</span>
                    </div>
                    <h3 className="font-display text-3xl font-bold">You're in.</h3>
                    <p className="mt-2 text-sm text-white/85">
                      Welcome to the family. Watch your inbox.
                    </p>
                    <button
                      onClick={close}
                      className="mt-5 rounded-full bg-white px-6 py-2 text-xs font-bold uppercase tracking-widest text-foreground transition-transform hover:scale-[1.03]"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <div className="text-white">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-white/75">Don't miss a beat</p>
                    <h3 className="mt-2 font-display text-3xl font-bold leading-none md:text-4xl">
                      Join the<br />movement.
                    </h3>
                    <p className="mt-3 text-sm text-white/85">
                      Be first for lineup drops, ticket waves and exclusive content.
                    </p>

                    <form onSubmit={onSubmit} className="mt-5 space-y-2.5">
                      <input
                        type="text"
                        placeholder="Your name (optional)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength={100}
                        className="w-full rounded-md border border-white/25 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/60 focus:border-white/70 focus:bg-white/15 focus:outline-none"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        maxLength={255}
                        className="w-full rounded-md border border-white/25 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/60 focus:border-white/70 focus:bg-white/15 focus:outline-none"
                      />
                      <label className="flex cursor-pointer items-start gap-2 text-[11px] leading-snug text-white/85">
                        <input
                          type="checkbox"
                          checked={marketingConsent}
                          onChange={(e) => setMarketingConsent(e.target.checked)}
                          className="mt-0.5 accent-white"
                        />
                        <span>I agree to receive marketing emails. I can unsubscribe anytime.</span>
                      </label>
                      <label className="flex cursor-pointer items-start gap-2 text-[11px] leading-snug text-white/85">
                        <input
                          type="checkbox"
                          required
                          checked={privacyConsent}
                          onChange={(e) => setPrivacyConsent(e.target.checked)}
                          className="mt-0.5 accent-white"
                        />
                        <span>
                          I accept the{" "}
                          <a href="/privacy" target="_blank" rel="noreferrer" className="underline hover:text-white">
                            Privacy Policy
                          </a>{" "}
                          (POPIA / GDPR).
                        </span>
                      </label>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="mt-1 w-full rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-widest text-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
                      >
                        {submitting ? "Joining..." : "Subscribe"}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SubscribeContext.Provider>
  );
}
