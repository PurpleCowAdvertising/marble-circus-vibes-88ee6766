import { createFileRoute } from "@tanstack/react-router";

import { FadeIn, PageHero, Section } from "@/components/site/Section";

export const Route = createFileRoute("/legacy")({
  head: () => ({
    meta: [
      { title: "Legacy & CSI | Scorpion Kings Live" },
      {
        name: "description",
        content: "Community, culture and legacy initiatives connected to Scorpion Kings Live.",
      },
      { property: "og:title", content: "Legacy & CSI | Scorpion Kings Live" },
      {
        property: "og:description",
        content: "More than a show: community, culture and future-facing impact.",
      },
    ],
  }),
  component: LegacyPage,
});

const PILLARS = [
  {
    label: "Artist development",
    blurb: "A future-facing commitment to emerging artists, producers and creative talent connected to the culture.",
    stat: "01",
    statLabel: "Talent",
    gradient: "from-gold/30 via-gold/10 to-transparent",
  },
  {
    label: "Community moments",
    blurb:
      "Opportunities to create access, inspiration and shared experiences around the event and its surrounding activations.",
    stat: "02",
    statLabel: "Community",
    gradient: "from-white/20 via-white/10 to-transparent",
  },
  {
    label: "Cultural legacy",
    blurb:
      "Keeping the movement rooted in the sound, the fans and the places that helped Amapiano travel from local streets to global stages.",
    stat: "03",
    statLabel: "Culture",
    gradient: "from-gold/30 via-gold/10 to-transparent",
  },
] as const;

function LegacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legacy / CSI"
        title="More than a show."
        description="Community, culture and future-facing impact that gives the event deeper meaning."
      />

      <Section className="bg-black text-white">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Legacy platform</p>

              <h2 className="mt-3 font-display text-4xl font-bold leading-none text-white md:text-6xl">
                Built to leave something behind.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-white/65 md:text-base">
              This page is designed to grow as official CSI, community and legacy initiatives are confirmed. It keeps
              the story credible without overstating impact before the details are locked.
            </p>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {PILLARS.map((pillar, index) => (
            <FadeIn key={pillar.label} delay={index * 0.08}>
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur-xl transition-transform hover:-translate-y-1 md:p-7">
                <div
                  className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br ${pillar.gradient}`}
                >
                  <div className="absolute inset-0 bg-black/35" />

                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <p className="font-display text-6xl font-bold leading-none text-gold md:text-7xl">{pillar.stat}</p>

                    <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-white/55">{pillar.statLabel}</p>
                  </div>
                </div>

                <h2 className="mt-5 font-display text-3xl font-bold text-white">{pillar.label}</h2>

                <p className="mt-2 text-sm leading-relaxed text-white/70">{pillar.blurb}</p>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.25}>
          <div className="mt-12 rounded-3xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-xl md:p-8">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Coming next</p>

            <h2 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">
              Confirmed initiatives will be published here.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65 md:text-base">
              As official partners, programmes and community actions are confirmed, this section can be updated with
              real numbers, dates, locations and impact stories.
            </p>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
