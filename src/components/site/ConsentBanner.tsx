import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const STORAGE_KEY = "sony_sa_consent_v1";

type StoredConsent = {
  privacy_consent: boolean;
  marketing_consent: boolean;
  consent_at: string;
};

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [marketing, setMarketing] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(STORAGE_KEY)) {
      const t = window.setTimeout(() => setVisible(true), 600);
      return () => window.clearTimeout(t);
    }
  }, []);

  const persist = async (marketingConsent: boolean, source: string) => {
    setSubmitting(true);
    const consent_at = new Date().toISOString();
    const record: StoredConsent = {
      privacy_consent: true,
      marketing_consent: marketingConsent,
      consent_at,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
      const { error } = await supabase.from("consent_records").insert({
        privacy_consent: true,
        marketing_consent: marketingConsent,
        source,
        user_agent:
          typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : null,
        consent_at,
      });
      if (error) throw error;
    } catch (err) {
      console.error("Consent record failed", err);
      toast.error("We couldn't record your preferences — please try again.");
    } finally {
      setSubmitting(false);
      setVisible(false);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 22, stiffness: 200 }}
          role="dialog"
          aria-label="Privacy and cookie preferences"
          className="fixed inset-x-0 bottom-0 z-[90] p-3 sm:p-5"
        >
          <div className="mx-auto max-w-[1200px] overflow-hidden rounded-2xl border border-border bg-card/95 shadow-2xl backdrop-blur-xl">
            <div className="grid gap-5 p-5 md:grid-cols-[1fr_auto] md:items-center md:gap-8 md:p-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-accent">
                  Privacy · POPIA / GDPR
                </p>
                <p className="mt-2 text-sm text-foreground">
                  We use cookies and process limited personal information to run this site
                  and, with your permission, send you marketing updates. See our{" "}
                  <Link to="/privacy" className="underline hover:text-accent">
                    Privacy Policy
                  </Link>
                  .
                </p>

                {showPrefs && (
                  <div className="mt-4 space-y-3 rounded-lg border border-border bg-background/40 p-4">
                    <label className="flex items-start gap-2 text-xs text-muted-foreground">
                      <input
                        type="checkbox"
                        checked
                        disabled
                        className="mt-0.5 accent-primary"
                      />
                      <span>
                        <strong className="text-foreground">Required.</strong> Essential
                        site functionality and processing of personal information per the
                        Privacy Policy.
                      </span>
                    </label>
                    <label className="flex cursor-pointer items-start gap-2 text-xs text-muted-foreground">
                      <input
                        type="checkbox"
                        checked={marketing}
                        onChange={(e) => setMarketing(e.target.checked)}
                        className="mt-0.5 accent-primary"
                      />
                      <span>
                        <strong className="text-foreground">Marketing.</strong> Receive
                        announcements, lineup drops and ticket waves from Sony Music SA.
                      </span>
                    </label>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 md:flex-nowrap md:justify-end">
                {!showPrefs && (
                  <button
                    type="button"
                    onClick={() => setShowPrefs(true)}
                    disabled={submitting}
                    className="rounded-full border border-border bg-card px-4 py-2.5 text-xs font-bold uppercase tracking-widest hover:border-accent hover:text-accent"
                  >
                    Preferences
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => persist(false, "banner-reject")}
                  disabled={submitting}
                  className="rounded-full border border-border bg-card px-4 py-2.5 text-xs font-bold uppercase tracking-widest hover:border-accent hover:text-accent disabled:opacity-60"
                >
                  Reject marketing
                </button>
                <button
                  type="button"
                  onClick={() =>
                    persist(showPrefs ? marketing : true, showPrefs ? "banner-save" : "banner-accept-all")
                  }
                  disabled={submitting}
                  className="rounded-full bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:scale-[1.02] disabled:opacity-60"
                >
                  {showPrefs ? "Save preferences" : "Accept all"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
