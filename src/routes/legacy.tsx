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
          {["Foundation", "Mandela Day", "Community impact"].map((label, i) => (
            <FadeIn key={label} delay={i * 0.08}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 md:p-8">
                <div className="aspect-[4/3] w-full rounded-lg border border-dashed border-border/70 bg-muted/40" aria-hidden />
                <h2 className="mt-5 font-display text-2xl font-bold md:text-3xl">{label}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Programme details and imagery to be supplied by the foundation team.
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
}
