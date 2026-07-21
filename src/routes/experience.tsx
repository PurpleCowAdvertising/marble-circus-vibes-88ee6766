import { createFileRoute } from "@tanstack/react-router";

import { FadeIn, PageHero, Section } from "@/components/site/Section";
import { PageGate, VisibilityGate } from "@/components/site/visibility";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Hospitality | Scorpion Kings Live" },
      {
        name: "description",
        content:
          "Premium hospitality packages for Scorpion Kings Live: suites, VIP lounges, hospitality tables and bespoke experiences.",
      },
      { property: "og:title", content: "Hospitality | Scorpion Kings Live" },
      {
        property: "og:description",
        content: "Elevated viewing, premium hospitality and bespoke packages for the night.",
      },
    ],
  }),
  component: HospitalityPage,
});

const BOOK_URL = "https://www.sailhospitality.co.za/upcoming-events/scorpion-kings";

const BLOCKS = [
  {
    title: "Private Suites",
    body: "Private suite hospitality with elevated stage views, premium food & beverage and dedicated service.",
    price: "From TBC",
    icon: Crown,
    accent: "from-gold/30 via-gold/10 to-transparent",
  },
  {
    title: "VIP Lounge",
    body: "Access to the exclusive VIP lounge with hospitality, premium bar and elevated viewing decks.",
    price: "From TBC",
    icon: Mic2,
    accent: "from-white/20 via-white/10 to-transparent",
  },
  {
    title: "Hospitality Tables",
    body: "Reserved hospitality tables with curated dining, bottle service and prime positioning.",
    price: "From TBC",
    icon: Utensils,
    accent: "from-gold/30 via-gold/10 to-transparent",
  },
  {
    title: "Bespoke Packages",
    body: "Tailored hospitality experiences for groups and corporates. Fully customisable on request.",
    price: "From TBC",
    icon: ShieldCheck,
    accent: "from-white/20 via-white/10 to-transparent",
  },
] as const;

const FACTS = [
  { label: "Doors", value: "14:00" },
  { label: "Venue", value: "FNB Stadium" },
  { label: "Date", value: "19 Sep 2026" },
  { label: "Bookings", value: "Sail Hospitality" },
] as const;

function HospitalityPage() {
  return (
    <PageGate keyName="page:experience">
      <PageHero
        eyebrow="Hospitality"
        title="Premium hospitality."
        description="Elevated viewing, premium hospitality and bespoke packages for the night."
      />

      <Section className="bg-black text-white">
        <VisibilityGate keyName="section:experience.intro">
          <FadeIn>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Hospitality packages</p>

                <h2 className="mt-3 font-display text-4xl font-bold leading-none text-white md:text-6xl">
                  Book your hospitality experience.
                </h2>
              </div>

              <p className="max-w-md text-sm leading-relaxed text-white/65 md:text-base">
                All hospitality bookings are handled by our official partner, Sail Hospitality. Choose a package below to
                book directly.
              </p>
            </div>
          </FadeIn>
        </VisibilityGate>

        <VisibilityGate keyName="section:experience.blocks">
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {BLOCKS.map((block, index) => {
              const Icon = block.icon;

              return (
                <FadeIn key={block.title} delay={index * 0.06}>
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/30 bg-white/[0.08] p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.18)] ring-1 ring-inset ring-white/10 backdrop-blur-xl backdrop-saturate-150 transition-transform duration-300 hover:-translate-y-1 md:p-7">
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

                    <div className="mt-5 flex items-center justify-between gap-4">
                      <p className="font-display text-lg font-bold text-gold">{block.price}</p>

                      <a
                        href={BOOK_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-gold px-4 py-2 text-xs font-bold uppercase tracking-widest text-black transition-transform hover:scale-[1.03]"
                      >
                        Book Now
                      </a>
                    </div>
                  </article>
                </FadeIn>
              );
            })}
          </div>
        </VisibilityGate>

        <VisibilityGate keyName="section:experience.facts">
          <FadeIn delay={0.2}>
            <div className="mt-12 grid gap-4 rounded-3xl border border-white/30 bg-white/[0.08] p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.18)] ring-1 ring-inset ring-white/10 backdrop-blur-xl backdrop-saturate-150 md:grid-cols-4 md:p-10">
              {FACTS.map((fact) => (
                <div key={fact.label}>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-white/50">{fact.label}</p>

                  <p className="mt-2 font-display text-2xl font-bold leading-tight text-white">{fact.value}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </VisibilityGate>
      </Section>
    </PageGate>
  );
}
