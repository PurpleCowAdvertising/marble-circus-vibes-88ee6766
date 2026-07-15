import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  subject: z.string().trim().max(150).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ScorpionKingsFormProps = {
  tableName?: string;
  title?: string;
  description?: string;
  successMessage?: string;
  errorMessage?: string;
};

export function ScorpionKingsForm({
  tableName = "contact_messages",
  title = "Send a message",
  description = "Drop your details below and we’ll be in touch.",
  successMessage = "Message sent. We’ll be in touch.",
  errorMessage = "Could not send message. Please try again.",
}: ScorpionKingsFormProps) {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const onChange =
    (key: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({
        ...current,
        [key]: event.target.value,
      }));
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
      const { error } = await supabase.from(tableName).insert({
        name: parsed.data.name,
        email: parsed.data.email,
        subject: parsed.data.subject || null,
        message: parsed.data.message,
      });

      if (error) throw error;

      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      toast.success(successMessage);
    } catch (error) {
      console.error(error);
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-xl md:p-10">
      {sent ? (
        <div className="py-12 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gold text-black">
            <span className="font-display text-3xl">✓</span>
          </div>

          <h3 className="font-display text-4xl font-bold text-white">{successMessage}</h3>

          <button
            type="button"
            onClick={() => setSent(false)}
            className="mt-7 rounded-full border border-white/20 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:border-gold hover:text-gold"
          >
            Send another
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Get in touch</p>
            <h3 className="font-display text-2xl font-bold text-white">{title}</h3>
            <p className="text-sm text-white/65">{description}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">Name *</label>
              <input
                required
                value={form.name}
                onChange={onChange("name")}
                maxLength={100}
                className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-gold"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">Email *</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={onChange("email")}
                maxLength={255}
                className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-gold"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">Subject</label>
            <input
              value={form.subject}
              onChange={onChange("subject")}
              maxLength={150}
              className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-gold"
              placeholder="What is this about?"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">Message *</label>
            <textarea
              required
              value={form.message}
              onChange={onChange("message")}
              maxLength={2000}
              rows={5}
              className="w-full resize-none rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-gold"
              placeholder="Tell us more..."
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-gold px-6 py-4 text-sm font-bold uppercase tracking-widest text-black transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Sending..." : "Send message"}
          </button>

          <p className="text-center text-[10px] uppercase tracking-[0.25em] text-white/40">
            Your details are used only to respond to your enquiry.
          </p>
        </form>
      )}
    </div>
  );
}
