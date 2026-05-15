import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { FadeIn, PageHero, Section } from "@/components/site/Section";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Briefcase, Newspaper } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Scorpion Kings Live" },
      { name: "description", content: "Get in touch with Scorpion Kings Live — general enquiries, press, partnerships." },
      { property: "og:title", content: "Contact — Scorpion Kings Live" },
      { property: "og:description", content: "General, press and partnership enquiries." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  subject: z.string().trim().max(150).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const onChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid form");
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("contact_messages").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        subject: parsed.data.subject || null,
        message: parsed.data.message,
      });
      if (error) throw error;
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      toast.success("Message sent. We'll be in touch.");
    } catch (err) {
      console.error(err);
      toast.error("Could not send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk."
        description="Press, partnerships, artist enquiries — drop us a line and we'll get right back."
      />

      <Section className="border-t border-border">
        <div className="grid gap-16 md:grid-cols-[1fr_1.4fr]">
          <FadeIn>
            <div className="space-y-10">
              {[
                { icon: Newspaper, label: "Press · Kim Sineke", email: "kim@iam4.co.za" },
                { icon: Mail, label: "General", email: "hello@sonymusic.co.za" },
                { icon: Briefcase, label: "Partnerships", email: "partners@sonymusic.co.za" },
              ].map(({ icon: Icon, label, email }) => (
                <div key={label}>
                  <div className="flex items-center gap-3">
                    <Icon size={18} className="text-primary" />
                    <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">{label}</p>
                  </div>
                  <a href={`mailto:${email}`} className="mt-2 block font-display text-2xl font-bold hover:text-accent md:text-3xl">
                    {email}
                  </a>
                  {label.startsWith("Press") && (
                    <a href="tel:+27810421076" className="mt-1 block text-sm text-muted-foreground hover:text-foreground">
                      +27 81 042 1076
                    </a>
                  )}
                </div>
              ))}

              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Office</p>
                <p className="mt-2 font-display text-xl">
                  Scorpion Kings Live<br />
                  Johannesburg, South Africa
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-8 md:p-10">
              {sent ? (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                    <span className="font-display text-3xl text-primary">✓</span>
                  </div>
                  <h3 className="font-display text-3xl font-bold">Message sent.</h3>
                  <p className="mt-2 text-muted-foreground">We'll get back to you within 2 business days.</p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-6 rounded-full border border-border px-6 py-2 text-sm uppercase tracking-widest hover:border-accent"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Name *</label>
                      <input
                        required
                        value={form.name}
                        onChange={onChange("name")}
                        maxLength={100}
                        className="w-full rounded-md border border-border bg-input px-4 py-3 text-sm focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Email *</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={onChange("email")}
                        maxLength={255}
                        className="w-full rounded-md border border-border bg-input px-4 py-3 text-sm focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Subject</label>
                    <input
                      value={form.subject}
                      onChange={onChange("subject")}
                      maxLength={150}
                      className="w-full rounded-md border border-border bg-input px-4 py-3 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Message *</label>
                    <textarea
                      required
                      value={form.message}
                      onChange={onChange("message")}
                      maxLength={2000}
                      rows={6}
                      className="w-full resize-none rounded-md border border-border bg-input px-4 py-3 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-full bg-primary px-6 py-4 text-sm font-bold uppercase tracking-widest text-primary-foreground hover:scale-[1.01] transition-transform disabled:opacity-60"
                  >
                    {submitting ? "Sending..." : "Send message"}
                  </button>
                </div>
              )}
            </form>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
