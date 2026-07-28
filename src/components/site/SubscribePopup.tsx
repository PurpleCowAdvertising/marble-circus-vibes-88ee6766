import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const SESSION_KEY = "sk_subscribe_seen";

// Updated validation schema to handle the new Sony Music requirements
const schema = z.object({
  email: z.string().trim().email({ message: "Enter a valid email" }).max(255),
  firstName: z.string().trim().min(1, { message: "Enter your first name" }).max(100),
  lastName: z.string().trim().min(1, { message: "Enter your last name" }).max(100),
  mobilePhone: z.string().trim().min(1, { message: "Enter your mobile phone number" }).max(50),
  country: z.string().min(1, { message: "Enter your country or region" }),
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
  const [source, setSource] = useState("auto");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Form fields state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("ZA"); // South Africa default
  const [marketingConsent, setMarketingConsent] = useState(true);
  const [privacyConsent, setPrivacyConsent] = useState(false);

  const open = useCallback((src: string = "manual") => {
    setSource(src);
    setSuccess(false);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    localStorage.setItem(SESSION_KEY, "true");
  }, []);

  // Non-intrusive trigger: never on load or on scroll. The popup only appears
  // after the visitor actively engages — i.e. clicks a button, link or card
  // somewhere on the site (second interaction, so the first click never gets
  // interrupted).
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(SESSION_KEY)) return;

    let interactions = 0;
    let triggered = false;

    const onClick = (event: MouseEvent) => {
      if (triggered) return;
      const target = event.target as HTMLElement | null;
      if (!target) return;

      // Ignore clicks inside the popup itself and on consent/cookie chrome.
      if (target.closest("[data-subscribe-popup]")) return;

      const interactive = target.closest(
        'button, a, [role="button"], [role="tab"], input, select, label, article',
      );
      if (!interactive) return;

      interactions += 1;
      if (interactions < 2) return;

      triggered = true;
      document.removeEventListener("click", onClick, true);
      // Let the click's own action (navigation, modal, scroll) settle first.
      window.setTimeout(() => open("engaged"), 1200);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [open]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Validate using our Zod schema
    const validation = schema.safeParse({
      email,
      firstName,
      lastName,
      mobilePhone,
      country,
      marketingConsent,
      privacyConsent,
    });

    if (!validation.success) {
      toast.error(validation.error.issues[0].message);
      setSubmitting(false);
      return;
    }

    // Prepare Sony Music body submission parameters
    const urlParams = new URLSearchParams();
    urlParams.append("js_url", "https://subs.sonymusicfans.com/submit");
    urlParams.append("ae_segment_id", "2815861");
    urlParams.append("ae_brand_id", "4307835");
    urlParams.append("form", "764269");
    urlParams.append("field_first_name", firstName);
    urlParams.append("field_last_name", lastName);
    urlParams.append("field_mobile_phone", mobilePhone);
    urlParams.append("field_email_address", email);
    urlParams.append("field_country_region", country);
    urlParams.append("triggered_sends[]", "");

    // Add hidden newsletter mailing list IDs
    const mailingLists = [
      "a0S1p00000UGdJTEA1", // DJ Maphorisa
      "a0S0800000W7JEvEAN", // Kabza De Small
      "a0S0800000W81P9EAJ", // Dance
      "a0S24000005SowPEAS", // Sony Music Africa
      "a0S0800000VfjfuEAB", // Sony Music South Africa
    ];

    mailingLists.forEach((id, index) => {
      urlParams.append(`mailing-list-id[${index}]`, id);
    });

    try {
      // 1. Submit to Sony Music Fans
      const sonyResponse = await fetch("https://subs.sonymusicfans.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: urlParams.toString(),
      });

      if (!sonyResponse.ok) {
        throw new Error("Sony API submission error");
      }

      // 2. Also save to your backup Supabase database if configured
      try {
        await supabase.from("subscribers").insert([
          {
            email,
            name: `${firstName} ${lastName}`.trim(),
            first_name: firstName,
            last_name: lastName,
            phone: mobilePhone,
            country,
            marketing_consent: marketingConsent,
            privacy_consent: privacyConsent,
            source,
          },
        ]);
      } catch (dbError) {
        console.warn("Database backup skipped or failed:", dbError);
      }

      setSuccess(true);
      toast.success("Welcome to the movement!");
      
      // Reset fields
      setFirstName("");
      setLastName("");
      setMobilePhone("");
      setEmail("");
      setCountry("ZA");
      setPrivacyConsent(false);

      setTimeout(() => {
        close();
      }, 2000);

    } catch (error) {
      console.error(error);
      toast.error("Subscription failed. Please check your details and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SubscribeContext.Provider value={{ open, close, isOpen }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <div
            data-subscribe-popup
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-zinc-950 text-white rounded-2xl border border-zinc-800 p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={close} 
                className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <span className="text-xs uppercase tracking-widest text-amber-500 font-semibold">
                  {source === "engaged" ? "Glad you're here" : "Don't Miss A Beat"}
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1 uppercase">
                  {source === "engaged" ? "Enjoying the ride?" : "Join the Movement"}
                </h2>
                <p className="text-xs text-zinc-400 mt-2">
                  {source === "engaged"
                    ? "Since you're exploring, join the mailing list for lineup drops, ticket waves and exclusive content — straight to your inbox."
                    : "Be first for lineup drops, ticket waves and exclusive content."}
                </p>
              </div>



              {success ? (
                <div className="text-center py-8 text-emerald-400 font-semibold">
                  Successfully subscribed! Welcome aboard.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                    />
                  </div>

                  <input
                    type="tel"
                    placeholder="Mobile Phone Number"
                    value={mobilePhone}
                    onChange={(e) => setMobilePhone(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  />

                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  />

                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  >
                    <option value="ZA">South Africa</option>
                    <option value="US">United States</option>
                    <option value="GB">United Kingdom</option>
                    <option value="NG">Nigeria</option>
                    <option value="KE">Kenya</option>
                    <option value="AU">Australia</option>
                  </select>

                  <div className="space-y-2 pt-2 text-xs text-zinc-400">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={marketingConsent}
                        onChange={(e) => setMarketingConsent(e.target.checked)}
                        className="mt-0.5 rounded border-zinc-800 text-amber-500 focus:ring-amber-500"
                      />
                      <span>I agree to receive marketing emails. I can unsubscribe anytime.</span>
                    </label>

                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacyConsent}
                        onChange={(e) => setPrivacyConsent(e.target.checked)}
                        required
                        className="mt-0.5 rounded border-zinc-800 text-amber-500 focus:ring-amber-500"
                      />
                      <span>
                        By checking this box, I agree to receive news from DJ Maphorisa, Kabza De Small, and Sony Music Entertainment. For more information on how we use your data, please visit{" "}
                        <a href="https://www.sonymusic.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-500">this link</a>.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 mt-2 bg-white text-black font-bold uppercase rounded-full hover:bg-amber-500 hover:text-white transition-all duration-300 disabled:opacity-50 text-sm"
                  >
                    {submitting ? "Joining..." : "Subscribe"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </SubscribeContext.Provider>
  );
}