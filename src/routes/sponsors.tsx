import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useMemo } from "react";
import { FadeIn, PageHero, Section } from "@/components/site/Section";
import { ArrowUpRight } from "lucide-react";

const CATEGORIES = ["all", "platinum", "gold", "silver", "bronze"] as const;
type Category = (typeof CATEGORIES)[number];

const searchSchema = z.object({
  tier: fallback(z.enum(CATEGORIES), "all").default("all"),
});

export const Route = createFileRoute("/sponsors")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Sponsors & Partners — Scorpion Kings Live" },
      { name: "description", content: "Meet the brands powering the moment. Filter by Platinum, Gold, Silver and Bronze partners." },
      { property: "og:title", content: "Sponsors & Partners — Scorpion Kings Live" },
      { property: "og:description", content: "Powered by brands that move with the culture." },
    ],
  }),
  component: SponsorsPage,
});

type Sponsor = { name: string; tier: Exclude<Category, "all">; blurb: string };

const SPONSORS: Sponsor[] = [
  { name: "Sony Music Africa", tier: "platinum", blurb: "Headline label partner driving the lineup." },
  { name: "FNB", tier: "platinum", blurb: "Official banking partner of the moment." },
  { name: "Castle Lite", tier: "gold", blurb: "Pouring the cold ones across every stage." },
  { name: "MTN", tier: "gold", blurb: "Connectivity that keeps the floor moving." },
  { name: "Heineken", tier: "gold", blurb: "Refreshing the night, set after set." },
  { name: "Spotify Africa", tier: "silver", blurb: "Streaming the official festival playlist." },
  { name: "Apple Music", tier: "silver", blurb: "Spatial audio drops from the main stage." },
  { name: "Boost Mobile", tier: "silver", blurb: "Powering the charging lounges." },
  { name: "Webtickets", tier: "silver", blurb: "Official ticketing partner." },
  { name: "Pick n Pay", tier: "bronze", blurb: "On-the-ground retail partner." },
  { name: "Adidas", tier: "bronze", blurb: "Official festival apparel drop." },
  { name: "Bolt", tier: "bronze", blurb: "Door-to-door from the city to FNB." },
  { name: "Showmax", tier: "bronze", blurb: "Behind-the-scenes streaming partner." },
  { name: "Red Bull", tier: "bronze", blurb: "Energy partner for late-night sets." },
];

const TIER_META: Record<Exclude<Category, "all">, { label: string; ring: string; pillBg: string }> = {
  platinum: { label: "Platinum", ring: "border-foreground/40", pillBg: "bg-foreground/5" },
  gold:     { label: "Gold",     ring: "border-accent/50",    pillBg: "bg-accent/10" },
  silver:   { label: "Silver",   ring: "border-muted-foreground/40", pillBg: "bg-muted/60" },
  bronze:   { label: "Bronze",   ring: "border-primary/40",   pillBg: "bg-primary/5" },
};

const FILTERS: { key: Category; label: string }[] = [
  { key: "all",      label: "All" },
  { key: "platinum", label: "Platinum" },
  { key: "gold",     label: "Gold" },
  { key: "silver",   label: "Silver" },
  { key: "bronze",   label: "Bronze" },
];

function SponsorsPage() {
  const { tier } = Route.useSearch();
  const navigate = useNavigate({ from: "/sponsors" });

  const filtered = useMemo(
    () => (tier === "all" ? SPONSORS : SPONSORS.filter((s) => s.tier === tier)),
    [tier],
  );

  const counts = useMemo(() => {
    const map = { all: SPONSORS.length } as Record<Category, number>;
    (Object.keys(TIER_META) as Array<keyof typeof TIER_META>).forEach((k) => {
      map[k] = SPONSORS.filter((s) => s.tier === k).length;
    });
    return map;
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Our partners"
        title="Powered by the bold."
        description="The brands moving with us — building unforgettable moments alongside the artists and the fans."
      />

      {/* FILTER BAR */}
      <Section className="!pt-0">
        <FadeIn>
          <div
            role="tablist"
            aria-label="Filter sponsors by tier"
            className="flex flex-wrap gap-2 border-b border-border pb-6"
          >
            {FILTERS.map((f) => {
              const active = tier === f.key;
              return (
                <button
                  key={f.key}
                  role="tab"
                  aria-selected={active}
                  onClick={() =>
                    navigate({ search: (prev) => ({ ...prev, tier: f.key }), replace: true })
                  }
                  className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                    active
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-card text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  {f.label}
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] tabular-nums ${
                      active ? "bg-background/20 text-background" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {counts[f.key]}
                  </span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* RESULTS */}
        <div className="mt-10">
          <FadeIn>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Showing {filtered.length} {filtered.length === 1 ? "partner" : "partners"}
              {tier !== "all" && ` · ${TIER_META[tier].label}`}
            </p>
          </FadeIn>

          {filtered.length === 0 ? (
            <FadeIn delay={0.1}>
              <div className="mt-8 rounded-lg border border-dashed border-border p-10 text-center">
                <p className="text-muted-foreground">No partners in this tier yet.</p>
              </div>
            </FadeIn>
          ) : (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((s, i) => {
                const meta = TIER_META[s.tier];
                return (
                  <FadeIn key={s.name} delay={i * 0.03}>
                    <article
                      className={`group relative flex h-full flex-col justify-between rounded-lg border-2 ${meta.ring} ${meta.pillBg} p-5 transition-transform hover:-translate-y-1`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="rounded-full bg-background/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground backdrop-blur-sm">
                          {meta.label}
                        </span>
                        <ArrowUpRight
                          size={16}
                          className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                        />
                      </div>
                      <div className="mt-8">
                        <h3 className="font-display text-2xl font-bold leading-tight">{s.name}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{s.blurb}</p>
                      </div>
                    </article>
                  </FadeIn>
                );
              })}
            </div>
          )}
        </div>
      </Section>

      {/* CTA */}
      <Section className="border-t border-border">
        <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/15 via-card to-card p-10 md:p-16">
          <FadeIn>
            <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">
              Partner with us.
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Reach a passionate, culture-defining audience. Let's build something unforgettable together.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-105"
            >
              Get in touch <ArrowUpRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
