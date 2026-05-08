import { createContext, useCallback, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";


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
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    }
  }, []);

  // Popup is triggered manually via user action (header/footer/CTA buttons).
  // No auto-trigger on load or exit-intent.

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
          // Duplicate — treat as success
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 backdrop-blur-md"
            onClick={close}
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", damping: 24, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-2xl md:p-10"
            >
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/30 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-accent/20 blur-3xl" />

              <button
                onClick={close}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X size={18} />
              </button>

              <div className="relative">
                {success ? (
                  <div className="py-6 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                      <span className="font-display text-3xl text-primary">✓</span>
                    </div>
                    <h3 className="font-display text-3xl font-bold">You're in.</h3>
                    <p className="mt-2 text-muted-foreground">
                      Welcome to the family. Watch your inbox.
                    </p>
                    <button
                      onClick={close}
                      className="mt-6 rounded-full bg-primary px-6 py-2 text-sm font-bold uppercase tracking-widest text-primary-foreground"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-xs uppercase tracking-[0.3em] text-primary">Don't miss a beat</p>
                    <h3 className="mt-2 font-display text-4xl font-bold leading-none">
                      Join the<br />movement.
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground">
                      Be the first to know about lineup drops, ticket waves and exclusive content.
                    </p>

                    <form onSubmit={onSubmit} className="mt-6 space-y-3">
                      <input
                        type="text"
                        placeholder="Your name (optional)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength={100}
                        className="w-full rounded-md border border-border bg-input px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        maxLength={255}
                        className="w-full rounded-md border border-border bg-input px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                      />
                      <label className="flex cursor-pointer items-start gap-2 text-xs text-muted-foreground">
                        <input
                          type="checkbox"
                          checked={marketingConsent}
                          onChange={(e) => setMarketingConsent(e.target.checked)}
                          className="mt-0.5 accent-primary"
                        />
                        <span>
                          I agree to receive marketing emails from Sony Music SA. I can unsubscribe anytime.
                        </span>
                      </label>
                      <label className="flex cursor-pointer items-start gap-2 text-xs text-muted-foreground">
                        <input
                          type="checkbox"
                          required
                          checked={privacyConsent}
                          onChange={(e) => setPrivacyConsent(e.target.checked)}
                          className="mt-0.5 accent-primary"
                        />
                        <span>
                          I have read and accept the{" "}
                          <a href="/privacy" target="_blank" rel="noreferrer" className="underline hover:text-accent">
                            Privacy Policy
                          </a>{" "}
                          and consent to the processing of my personal information in accordance with POPIA / GDPR.
                        </span>
                      </label>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
                      >
                        {submitting ? "Joining..." : "Subscribe"}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SubscribeContext.Provider>
  );
}
