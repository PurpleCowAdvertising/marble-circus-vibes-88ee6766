import { createFileRoute } from "@tanstack/react-router";
import { FadeIn, PageHero, Section } from "@/components/site/Section";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/sponsors")({
  head: () => ({
    meta: [
      { title: "Sponsors & Partners — Scorpion Kings Live" },
      { name: "description", content: "Meet the brands powering the moment. Partnership opportunities with Scorpion Kings Live." },
      { property: "og:title", content: "Sponsors & Partners — Scorpion Kings Live" },
      { property: "og:description", content: "Powered by brands that move with the culture." },
    ],
  }),
  component: SponsorsPage,
});

const TIERS = [
  { tier: "Headline Partner", count: 1, size: "lg" },
  { tier: "Major Partners", count: 3, size: "md" },
  { tier: "Supporting Partners", count: 8, size: "sm" },
] as const;

function SponsorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our partners"
        title="Powered by the bold."
        description="The brands moving with us — building unforgettable moments alongside the artists and the fans."
      />

      {TIERS.map((tier, idx) => (
        <Section key={tier.tier} className={idx > 0 ? "border-t border-border" : ""}>
          <FadeIn>
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-3xl font-bold md:text-5xl">{tier.tier}</h2>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                {String(idx + 1).padStart(2, "0")} / {String(TIERS.length).padStart(2, "0")}
              </p>
            </div>
          </FadeIn>
          <div
            className={`mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border ${
              tier.size === "lg"
                ? "grid-cols-1"
                : tier.size === "md"
                ? "sm:grid-cols-3"
                : "grid-cols-2 sm:grid-cols-4"
            }`}
          >
            {Array.from({ length: tier.count }).map((_, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div
                  className={`flex items-center justify-center bg-card ${
                    tier.size === "lg"
                      ? "aspect-[3/1]"
                      : tier.size === "md"
                      ? "aspect-[3/2]"
                      : "aspect-square"
                  }`}
                >
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    Logo {i + 1}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </Section>
      ))}

      <Section className="border-t border-border">
        <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/15 via-card to-card p-10 md:p-16">
          <FadeIn>
            <h2 className="font-display text-4xl font-bold md:text-6xl leading-tight">
              Partner with us.
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Reach a passionate, culture-defining audience. Let's build something unforgettable together.
            </p>
            <a
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-bold uppercase tracking-widest text-primary-foreground hover:scale-105 transition-transform"
            >
              Get in touch <ArrowUpRight size={16} />
            </a>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
