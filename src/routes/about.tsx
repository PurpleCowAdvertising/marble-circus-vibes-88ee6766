import { createFileRoute } from "@tanstack/react-router";

import { FadeIn, PageHero, Section } from "@/components/site/Section";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Scorpion Kings Live" },
      {
        name: "description",
        content:
          "Scorpion Kings Live celebrates the artists, the sounds and the culture shaping Amapiano on a stadium stage.",
      },
      { property: "og:title", content: "About | Scorpion Kings Live" },
      {
        property: "og:description",
        content: "Built for the artists, powered by the fans.",
      },
    ],
  }),
  component: AboutPage,
});

const PRINCIPLES = [
  {
    number: "01",
    title: "Champion the sound",
    description:
      "Amapiano is more than a genre. It is movement, memory, dance floor language and a global cultural export.",
  },
  {
    number: "02",
    title: "Build the moment",
    description:
      "The show brings music, production, visuals and fan energy together into one stadium-scale experience.",
  },
  {
    number: "03",
    title: "Move with the culture",
    description:
      "From the streets to the stage to the feed, Scorpion Kings Live is designed around the fans who carry the sound forward.",
  },
] as const;

const EXPERIENCE_POINTS = [
  "A stadium-scale celebration of Amapiano.",
  "Curated around performance, culture and fan connection.",
  "Built for live music, digital storytelling and unforgettable moments.",
  "Designed to grow with future announcements, partners and artists.",
] as const;

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Built for the artists, powered by the fans."
        description="Scorpion Kings Live is a celebration of Amapiano, performance and the culture carrying South African sound to the world."
      />

      <Section className="bg-black text-white">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.4em] text-gold">Our story</p>

            <h2 className="mt-4 font-display text-5xl font-bold leading-tight text-white md:text-7xl">
              A movement made for the stadium.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="space-y-5 text-base leading-relaxed text-white/70 md:text-lg">
              <p>
                Scorpion Kings Live brings the energy of Amapiano into a stadium-scale experience, built around the
                artists, the fans and the sound that continues to travel from South Africa to the world.
              </p>

              <p>
                It is more than a concert. It is a cultural gathering, a live music moment and a fan-first platform for
                the next wave of performances, announcements and memories.
              </p>

              <p>
                As the road to FNB Stadium unfolds, this platform becomes the home for ticket updates, lineup news,
                event information, merchandise previews and partner opportunities.
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section className="bg-orange-rich text-white">
        <div className="grid gap-6 md:grid-cols-3">
          {PRINCIPLES.map((item, index) => (
            <FadeIn key={item.number} delay={index * 0.08}>
              <article className="h-full rounded-3xl border border-white/15 bg-black/35 p-6 backdrop-blur-xl">
                <p className="font-display text-5xl font-bold text-gold">{item.number}</p>

                <h3 className="mt-5 font-display text-3xl font-bold text-white">{item.title}</h3>

                <p className="mt-3 text-sm leading-relaxed text-white/70">{item.description}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="bg-black text-white">
        <div className="grid gap-12 md:grid-cols-[1fr_1.3fr] md:gap-16">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.4em] text-gold">The experience</p>

            <h2 className="mt-4 font-display text-5xl font-bold leading-tight text-white md:text-6xl">
              What this platform is built to do.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-3xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-xl md:p-8">
              <ul className="space-y-4">
                {EXPERIENCE_POINTS.map((point) => (
                  <li key={point} className="flex gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0">
                    <span className="mt-1 h-2 w-2 flex-none rounded-full bg-gold" />
                    <span className="text-base leading-relaxed text-white/75">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
