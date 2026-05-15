import { createFileRoute } from "@tanstack/react-router";
import { FadeIn, PageHero, Section } from "@/components/site/Section";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Scorpion Kings Live" },
      { name: "description", content: "Inside the show: stages, VIP, vendors, site map, transport and safety information for Scorpion Kings Live." },
      { property: "og:title", content: "Experience — Scorpion Kings Live" },
      { property: "og:description", content: "Stage, VIP, vendors, site map and traffic — everything you need to plan the night." },
    ],
  }),
  component: ExperiencePage,
});

const BLOCKS = [
  { title: "Main stage", body: "Immersive event visual and the focus of the night." },
  { title: "VIP areas", body: "Hospitality and premium value with elevated viewing." },
  { title: "Vendors + merch", body: "Food, bars, official merchandise and limited drops." },
  { title: "Site map + traffic", body: "Parking, transport and access information for fans." },
  { title: "Safety & security", body: "On-site medical, security and crowd management." },
  { title: "Traffic management", body: "Approach routes, drop-off zones and ride-share pickup." },
];

function ExperiencePage() {
  return (
    <>
      <PageHero
        eyebrow="Experience"
        title="Inside the show."
        description="Everything you need to plan the night — from the main stage to the way home."
      />

      <Section className="!pt-0">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {BLOCKS.map((b, i) => (
            <FadeIn key={b.title} delay={i * 0.06}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition-transform hover:-translate-y-1 md:p-7">
                <div className="aspect-[16/9] w-full rounded-lg border border-dashed border-border/70 bg-muted/40" aria-hidden />
                <h2 className="mt-5 font-display text-2xl font-bold leading-tight md:text-3xl">{b.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{b.body}</p>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-12 rounded-2xl border border-dashed border-border p-8 text-sm text-muted-foreground">
            Site map preview, 3D venue render and traffic management plan to be added once supplied by the venue team.
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
