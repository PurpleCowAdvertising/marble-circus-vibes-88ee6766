import { createFileRoute } from "@tanstack/react-router";
import { Car, Crown, Map, Mic2, ShieldCheck, Utensils } from "lucide-react";

import { FadeIn, PageHero, Section } from "@/components/site/Section";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience | Scorpion Kings Live" },
      {
        name: "description",
        content:
          "Inside the show: stages, VIP, vendors, site map, transport and safety information for Scorpion Kings Live.",
      },
      { property: "og:title", content: "Experience | Scorpion Kings Live" },
      {
        property: "og:description",
        content: "Stage, VIP, vendors, site map and traffic. Everything you need to plan the night.",
      },
    ],
  }),
  component: ExperiencePage,
});

const BLOCKS = [
  {
    title: "Main stage",
    body: "A stadium-scale production built around the music, the visuals and the moment.",
    icon: Mic2,
    accent: "from-gold/30 via-gold/10 to-transparent",
  },
  {
    title: "VIP areas",
    body: "Elevated viewing, premium hospitality and faster access for a smoother night.",
    icon: Crown,
    accent: "from-white/20 via-white/10 to-transparent",
  },
  {
    title: "Vendors + merch",
    body: "Food, bars and official event merchandise, including limited drops.",
    icon: Utensils,
    accent: "from-gold/30 via-gold/10 to-transparent",
  },
  {
    title: "Site map",
    body: "Clear zones, access points and wayfinding to help fans move with ease.",
    icon: Map,
    accent: "from-white/20 via-white/10 to-transparent",
  },
  {
    title: "Safety + security",
    body: "Event safety, medical support and accredited security across the venue.",
    icon: ShieldCheck,
    accent: "from-gold/30 via-gold/10 to-transparent",
  },
  {
    title: "Traffic + transport",
    body: "Drop-off, parking and ride-share guidance shared ahead of the event.",
    icon: Car,
    accent: "from-white/20 via-white/10 to-transparent",
  },
] as const;

const FACTS = [
  { label: "Doors", value: "14:00" },
  { label: "Venue", value: "FNB Stadium" },
  { label: "Date", value: "19 Sep 2026" },
  { label: "Updates", value: "Coming soon" },
] as const;

function ExperiencePage() {
  return (
    <>
      <PageHero
        eyebrow="Experience"
        title="Inside the show."
        description="Everything you need to plan the night, from the main stage to the way home."
      />

      <Section className="bg-black text-white">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Event experience</p>

              <h2 className="mt-3 font-display text-4xl font-bold leading-none text-white md:text-6xl">
                Built for movement, music and memory.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-white/65 md:text-base">
              This page will become the fan guide for the event. As production, access and venue details are confirmed,
              the information here can update without changing the whole site.
            </p>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {BLOCKS.map((block, index) => {
            const Icon = block.icon;

            return (
              <FadeIn key={block.title} delay={index * 0.06}>
                <article className="group relative h-full overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 md:p-7">
                  <div
                    className={`relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gradient-to-br ${block.accent}`}
                  >
                    <div className="absolute inset-0 bg-black/35" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon
                        size={56}
                        className="text-white transition-transform duration-500 group-hover:scale-110"
                        strokeWidth={1.25}
                      />
                    </div>
                  </div>

                  <h2 className="mt-5 font-display text-2xl font-bold leading-tight text-white md:text-3xl">
                    {block.title}
                  </h2>

                  <p className="mt-2 text-sm leading-relaxed text-white/70">{block.body}</p>
                </article>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-12 grid gap-4 rounded-3xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-xl md:grid-cols-4 md:p-10">
            {FACTS.map((fact) => (
              <div key={fact.label}>
                <p className="text-[10px] uppercase tracking-[0.4em] text-white/50">{fact.label}</p>

                <p className="mt-2 font-display text-2xl font-bold leading-tight text-white">{fact.value}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
