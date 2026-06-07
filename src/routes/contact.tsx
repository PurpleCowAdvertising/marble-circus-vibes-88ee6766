import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Briefcase, Mail, Newspaper } from "lucide-react";

import { FadeIn, PageHero, Section } from "@/components/site/Section";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Scorpion Kings Live" },
      {
        name: "description",
        content: "Get in touch with Scorpion Kings Live for general enquiries, press and partnerships.",
      },
      { property: "og:title", content: "Contact | Scorpion Kings Live" },
      {
        property: "og:description",
        content: "General, press and partnership enquiries.",
      },
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

const CONTACTS = [
  {
    icon: Newspaper,
    label: "Press",
    name: "Kim Sineke",
    email: "kim@iam4.co.za",
    phone: "+27 81 042 1076",
    phoneHref: "tel:+27810421076",
  },
  {
    icon: Mail,
    label: "General",
    name: "Scorpion Kings Live",
    email: "hello@sonymusic.co.za",
  },
  {
    icon: Briefcase,
    label: "Partnerships",
    name: "Partnership enquiries",
    email: "partners@sonymusic.co.za",
  },
] as const;

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const onChange = (key: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const { error } = await supabase.from("contact_messages").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        subject: parsed.data.subject || null,
        message: parsed.data.message,
      });

      if (error) throw error;

      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      toast.success("Message sent. We’ll be in touch.");
    } catch (error) {
      console.error(error);
      toast.error("Could not send message. Please email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s talk."
        description="Press, partnerships, artist enquiries and general questions. Drop us a line."
      />

      <Section className="bg-black text-white">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <FadeIn>
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Get in touch</p>

              <h2 className="mt-3 font-display text-4xl font-bold leading-none text-white md:text-6xl">
                The right door for the right message.
              </h2>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65 md:text-base">
                Use the form for general enquiries, or email the relevant team directly for press and partnership
                conversations.
              </p>

              <div className="mt-10 space-y-6">
                {CONTACTS.map(({ icon: Icon, label, name, email, phone, phoneHref }) => (
                  <div key={label} className="rounded-3xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold text-black">
                        <Icon size={18} />
                      </span>

                      <div>
                        <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">{label}</p>

                        <p className="mt-1 text-sm text-white/70">{name}</p>
                      </div>
                    </div>

                    <a
                      href={`mailto:${email}`}
                      className="mt-4 block break-words font-display text-2xl font-bold text-white transition-colors hover:text-gold md:text-3xl"
                    >
                      {email}
                    </a>

                    {phone && phoneHref && (
                      <a
                        href={phoneHref}
                        className="mt-2 block text-sm text-white/60 transition-colors hover:text-gold"
                      >
                        {phone}
                      </a>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-3xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur-xl">
                <p className="text-[10px] uppercase tracking-[0.4em] text-white/50">Office</p>

                <p className="mt-2 font-display text-2xl font-bold text-white">
                  Scorpion Kings Live
                  <br />
                  Johannesburg, South Africa
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="rounded-3xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-xl md:p-10"
            >
              {sent ? (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gold text-black">
                    <span className="font-display text-3xl">✓</span>
                  </div>

                  <h3 className="font-display text-4xl font-bold text-white">Message sent.</h3>

                  <p className="mt-3 text-white/65">We’ll get back to you within 2 business days.</p>

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
                        value={form.name}
                        onChange={onChange("name")}
                        maxLength={100}
                        className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-gold"
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
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">Message *</label>

                    <textarea
                      required
                      value={form.message}
                      onChange={onChange("message")}
                      maxLength={2000}
                      rows={7}
                      className="w-full resize-none rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-gold"
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
                </div>
              )}
            </form>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
