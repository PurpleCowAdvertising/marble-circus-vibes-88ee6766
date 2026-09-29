import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { FadeIn } from "@/components/site/Section";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  firstName: z.string().trim().min(1, "Name is required").max(100),
  lastName: z.string().trim().min(1, "Surname is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(1, "Tell us what's on your mind").max(2000),
});

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

const emptyForm: FormState = { firstName: "", lastName: "", email: "", message: "" };

export function FeedbackForm() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const onChange = (key: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const parsed = schema.safeParse(form);

    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form.");
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase.from("show_feedback").insert({
        first_name: parsed.data.firstName,
        last_name: parsed.data.lastName,
        email: parsed.data.email,
        message: parsed.data.message,
      });

      if (error) throw error;

      setSent(true);
      setForm(emptyForm);
      toast.success("Thank you — we heard you.");
    } catch (error) {
      console.error(error);
      toast.error("Could not send your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClassName =
    "w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-gold";

  return (
    <FadeIn>
      <form
        onSubmit={onSubmit}
        className="mx-auto max-w-2xl rounded-3xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-xl md:p-10"
      >
        {sent ? (
          <div className="py-10 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gold text-black">
              <span className="font-display text-3xl">✓</span>
            </div>

            <h3 className="font-display text-4xl font-bold text-white">Thank you.</h3>

            <p className="mt-3 text-white/65">Your message is with the crew. We read every single one.</p>

            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-7 rounded-full border border-white/20 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:border-gold hover:text-gold"
            >
              Send another
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">Name *</label>
                <input
                  required
                  value={form.firstName}
                  onChange={onChange("firstName")}
                  maxLength={100}
                  autoComplete="given-name"
                  className={inputClassName}
                />
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">Surname *</label>
                <input
                  required
                  value={form.lastName}
                  onChange={onChange("lastName")}
                  maxLength={100}
                  autoComplete="family-name"
                  className={inputClassName}
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">Email address *</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={onChange("email")}
                maxLength={255}
                autoComplete="email"
                className={inputClassName}
              />
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">
                WHERE SHOULD WE TAKE THE SHOW NEXT?
              </label>
              <textarea
                required
                value={form.message}
                onChange={onChange("message")}
                maxLength={2000}
                rows={6}
                className={`${inputClassName} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-gold px-6 py-4 text-sm font-bold uppercase tracking-widest text-black transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Sending..." : "Send it to the Kings"}
            </button>

            <p className="text-center text-[10px] uppercase tracking-[0.25em] text-white/40">
              We want to hear from you.
            </p>
          </div>
        )}
      </form>
    </FadeIn>
  );
}
