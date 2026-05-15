import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { FadeIn, PageHero, Section } from "@/components/site/Section";

export const Route = createFileRoute("/tickets")({
  head: () => ({
    meta: [
      { title: "Tickets — Scorpion Kings Live" },
      { name: "description", content: "General Access, VIP and Premium / Table tickets for Scorpion Kings Live at FNB Stadium, 19 September 2026." },
      { property: "og:title", content: "Tickets — Scorpion Kings Live" },
      { property: "og:description", content: "Choose your tier. Buy through the official ticketing partner." },
    ],
  }),
  component: TicketsPage,
});

type Tier = {
  name: string;
  price: string;
  tag: string;
  perks: string[];
  cta: string;
  href: string;
  highlight?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "General Access",
    price: "From R 450",
    tag: "Stage front to floor",
    perks: ["Full festival access", "All stages", "Food & bar zones"],
    cta: "Buy GA",
    href: "#",
  },
  {
    name: "VIP",
    price: "From R 1 250",
    tag: "Elevated view, fast lanes",
    perks: ["Dedicated VIP entrance", "Raised viewing deck", "Premium bars"],
    cta: "Buy VIP",
    href: "#",
    highlight: true,
  },
  {
    name: "Premium / Table",
    price: "From R 4 800",
    tag: "Hospitality + bottle service",
    perks: ["Reserved table", "Dedicated host", "Private restrooms"],
    cta: "Reserve Table",
    href: "#",
  },
];

function TicketsPage() {
  return (
    <>
      <PageHero
        eyebrow="Tickets"
        title="Pick your tier."
        description="Three ways into the night. Tickets sell through the official ticketing partner — link goes live with the public on-sale."
      />

      <Section className="!pt-0">
        <div className="grid gap-6 md:grid-cols-3">
          {TIERS.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.08}>
              <article
                className={`group relative flex h-full flex-col rounded-2xl border p-6 transition-transform hover:-translate-y-1 md:p-8 ${
                  t.highlight
                    ? "border-primary bg-primary/5 shadow-[0_20px_60px_-20px_color-mix(in_oklab,var(--primary)_40%,transparent)]"
                    : "border-border bg-card"
                }`}
              >
                {t.highlight && (
                  <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                    Most popular
                  </span>
                )}
                <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">{t.tag}</p>
                <h2 className="mt-2 font-display text-3xl font-bold leading-tight md:text-4xl">{t.name}</h2>
                <p className="mt-3 font-display text-2xl font-bold text-primary">{t.price}</p>
                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  {t.perks.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href={t.href}
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-widest transition-transform hover:scale-105 ${
                    t.highlight
                      ? "bg-primary text-primary-foreground"
                      : "bg-foreground text-background"
                  }`}
                >
                  {t.cta} <ArrowUpRight size={14} />
                </a>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <p className="mt-10 text-xs text-muted-foreground">
            Final pricing, on-sale times and ticketing partner to be confirmed. All sales are governed by the official ticketing partner's terms.
          </p>
        </FadeIn>
      </Section>
    </>
  );
}
