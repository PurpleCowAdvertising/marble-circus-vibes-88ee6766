import { createFileRoute } from "@tanstack/react-router";
import { FadeIn, PageHero, Section } from "@/components/site/Section";

export const Route = createFileRoute("/legacy")({
  head: () => ({
    meta: [
      { title: "Legacy & CSI — Scorpion Kings Live" },
      { name: "description", content: "Foundation work, Mandela Day initiatives and community impact behind Scorpion Kings Live." },
      { property: "og:title", content: "Legacy & CSI — Scorpion Kings Live" },
      { property: "og:description", content: "More than a show — community impact, foundation work and Mandela Day." },
    ],
  }),
  component: LegacyPage,
});

const PILLARS = [
  {
    label: "The Foundation",
    blurb:
      "Year-round investment in emerging artists, producers and engineers — bursaries, mentorship and studio access for the next generation of South African talent.",
    stat: "120+",
    statLabel: "Artists supported",
    gradient: "from-primary/40 via-primary/10 to-transparent",
  },
  {
    label: "Mandela Day",
    blurb:
      "Every July we mobilise our crews and partners for 67 minutes of service — school refurbishments, music room builds and instrument drives across Gauteng.",
    stat: "9 schools",
    statLabel: "Rebuilt since 2019",
    gradient: "from-accent/40 via-accent/10 to-transparent",
  },
  {
    label: "Community Impact",
    blurb:
      "Free community stages, township activations and ticket allocations for youth programmes — keeping the culture rooted where it started.",
    stat: "R4.6m",
    statLabel: "Reinvested in 2025",
    gradient: "from-gold/40 via-gold/10 to-transparent",
  },
];

function LegacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legacy / CSI"
        title="More than a show."
        description="Community impact, foundation initiatives and Mandela Day work that gives the event its depth."
      />

      <Section className="!pt-0">
        <div className="grid gap-4 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <FadeIn key={p.label} delay={i * 0.08}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 md:p-8">
                <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gradient-to-br ${p.gradient}`}>
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <p className="font-display text-5xl font-bold leading-none text-foreground md:text-6xl">{p.stat}</p>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{p.statLabel}</p>
                  </div>
                </div>
                <h2 className="mt-5 font-display text-2xl font-bold md:text-3xl">{p.label}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
}
