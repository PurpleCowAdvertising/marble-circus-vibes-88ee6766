import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";

import { FadeIn, PageHero, Section } from "@/components/site/Section";

export const Route = createFileRoute("/tickets")({
  head: () => ({
    meta: [
      { title: "Tickets | Scorpion Kings Live at FNB Stadium" },
      {
        name: "description",
        content:
          "Tickets for Scorpion Kings Live at FNB Stadium, 19 September 2026. From R400 via Webtickets, Pick n Pay and Boxer stores nationwide. Ages 14+.",
      },
      {
        property: "og:title",
        content: "Tickets | Scorpion Kings Live at FNB Stadium",
      },
      {
        property: "og:description",
        content: "On sale now from R400. Webtickets, Pick n Pay and Boxer stores nationwide.",
      },
    ],
  }),
  component: TicketsPage,
});

const RETAILERS = ["Webtickets", "Pick n Pay", "Boxer"] as const;

type TicketTier = {
  name: string;
  price: string;
  description: string;
  perks: readonly string[];
  featured?: boolean;
};

const TICKET_TIERS: readonly TicketTier[] = [
  {
    name: "General Access",
    price: "From R400",
    description: "Standing access with the full stadium energy.",
    perks: ["Standing access", "Main stage performances", "General bars, food and merch areas"],
  },
  {
    name: "VIP",
    price: "TBA",
    description: "Elevated comfort, faster access and better views.",
    perks: ["Fast-track entry", "Elevated viewing area", "Dedicated VIP bar and washrooms"],
    featured: true,
  },
  {
    name: "Premium Table",
    price: "TBA",
    description: "Hospitality-led experience for groups and premium guests.",
    perks: ["Reserved table area", "Hospitality service", "Premium host support"],
  },
];

function TicketsPage() {
  return (
    <>
      <PageHero
        eyebrow="Tickets · On sale now"
        title="Be part of history."
        description="Scorpion Kings Live returns to FNB Stadium on 19 September 2026. One stadium. One sound. A night built for the culture."
      />

      <Section className="!pt-0 bg-black text-white">
        <FadeIn>
          <article className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] p-6 shadow-[0_30px_80px_-30px_rgba(255,255,255,0.25)] backdrop-blur-xl md:p-12">
            <span className="absolute left-6 top-0 -translate-y-1/2 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black md:left-8">
              Tickets are live
            </span>

            <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-white/60">From</p>

                <p className="mt-2 font-display text-6xl font-bold leading-none text-gold md:text-8xl">R400</p>

                <p className="mt-3 text-sm text-white/60">per person · ages 14 and up</p>

                <p className="mt-6 max-w-md text-base leading-relaxed text-white/75">
                  Tickets are available via Webtickets, Pick n Pay and Boxer stores nationwide. Secure your place before
                  the next wave is gone.
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href="https://www.webtickets.co.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-4 text-sm font-bold uppercase tracking-widest text-black transition-transform hover:scale-[1.02]"
                >
                  Buy on Webtickets <ArrowUpRight size={16} />
                </a>

                <p className="text-center text-[10px] uppercase tracking-widest text-white/50">
                  Also at Pick n Pay & Boxer in-store
                </p>
              </div>
            </div>
          </article>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {TICKET_TIERS.map((tier) => (
              <article
                key={tier.name}
                className={`relative overflow-hidden rounded-3xl border p-6 ${
                  tier.featured ? "border-gold/50 bg-gold/[0.12]" : "border-white/15 bg-white/[0.05]"
                }`}
              >
                {tier.featured && (
                  <span className="mb-4 inline-flex rounded-full bg-gold px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-black">
                    Most popular
                  </span>
                )}

                <h2 className="font-display text-3xl font-bold text-white">{tier.name}</h2>

                <p className="mt-2 font-display text-2xl font-bold text-gold">{tier.price}</p>

                <p className="mt-3 text-sm leading-relaxed text-white/70">{tier.description}</p>

                <ul className="mt-5 space-y-2.5">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3 text-sm text-white/80">
                      <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-gold text-black">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.25}>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {RETAILERS.map((retailer) => (
              <div
                key={retailer}
                className="flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] px-6 py-5 text-center"
              >
                <p className="font-display text-lg font-bold tracking-tight text-white">{retailer}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.35}>
          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {[
              { label: "Venue", value: "FNB Stadium, Johannesburg" },
              { label: "Date", value: "19 September 2026" },
              { label: "Capacity", value: "80 000+ fans" },
              { label: "Age limit", value: "14 and up" },
            ].map((fact) => (
              <div key={fact.label} className="rounded-xl border border-white/15 bg-white/[0.06] p-5">
                <p className="text-[10px] uppercase tracking-[0.4em] text-white/50">{fact.label}</p>
                <p className="mt-2 font-display text-lg font-bold leading-tight text-white">{fact.value}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.45}>
          <p className="mt-10 text-xs leading-relaxed text-white/50">
            Curated by Amapiano pioneers DJ Maphorisa and Kabza De Small. More announcements, including lineup reveals,
            are still to come. All sales are governed by the official ticketing partner’s terms.
          </p>
        </FadeIn>
      </Section>
    </>
  );
}
