import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { FadeIn, PageHero, Section } from "@/components/site/Section";
import partnerLogoFull from "@/assets/partners/purple-cow-full.png";
import partnerLogoMark from "@/assets/partners/purple-cow-mark.png";

const CATEGORIES = ["all", "platinum", "gold", "silver", "bronze"] as const;

type Category = (typeof CATEGORIES)[number];

type PartnerPackage = {
  name: string;
  tier: Exclude<Category, "all">;
  blurb: string;
  status: "Available" | "Confirmed";
};

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partners | Scorpion Kings Live" },
      {
        name: "description",
        content: "Partner with Scorpion Kings Live and connect with a culture-defining live music audience.",
      },
      { property: "og:title", content: "Partners | Scorpion Kings Live" },
      {
        property: "og:description",
        content: "Powered by brands that move with the culture.",
      },
    ],
  }),
  component: PartnersPage,
});

const PARTNER_PACKAGES: PartnerPackage[] = [
  {
    name: "Headline Partner",
    tier: "platinum",
    blurb: "Maximum visibility across the event, digital campaign, stage moments and fan communications.",
    status: "Available",
  },
  {
    name: "Official Ticketing Partner",
    tier: "platinum",
    blurb: "Ticketing, access and fan purchase journey integration across the campaign.",
    status: "Available",
  },
  {
    name: "Stage Partner",
    tier: "gold",
    blurb: "Own a key stage moment, visual package or branded fan experience.",
    status: "Available",
  },
  {
    name: "VIP Experience Partner",
    tier: "gold",
    blurb: "Premium hospitality visibility across VIP areas, hosting and guest touchpoints.",
    status: "Available",
  },
  {
    name: "Digital Content Partner",
    tier: "silver",
    blurb: "Social-first content, behind-the-scenes access and digital storytelling opportunities.",
    status: "Available",
  },
  {
    name: "Merch Partner",
    tier: "silver",
    blurb: "Limited-edition merchandise, fan drops and branded retail moments.",
    status: "Available",
  },
  {
    name: "Food + Beverage Partner",
    tier: "bronze",
    blurb: "Vendor visibility, sampling opportunities and on-site fan engagement.",
    status: "Available",
  },
  {
    name: "Transport Partner",
    tier: "bronze",
    blurb: "Ride-share, parking, shuttle or access-support partnership opportunities.",
    status: "Available",
  },
] as const;

const FILTERS: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "platinum", label: "Platinum" },
  { key: "gold", label: "Gold" },
  { key: "silver", label: "Silver" },
  { key: "bronze", label: "Bronze" },
];

const TIER_META: Record<Exclude<Category, "all">, { label: string; card: string; badge: string }> = {
  platinum: {
    label: "Platinum",
    card: "border-white/30 bg-white/[0.08]",
    badge: "bg-white text-black",
  },
  gold: {
    label: "Gold",
    card: "border-gold/50 bg-gold/[0.12]",
    badge: "bg-gold text-black",
  },
  silver: {
    label: "Silver",
    card: "border-white/20 bg-white/[0.06]",
    badge: "bg-white/80 text-black",
  },
  bronze: {
    label: "Bronze",
    card: "border-white/15 bg-white/[0.04]",
    badge: "bg-white/15 text-white",
  },
};

function PartnersPage() {
  const [activeTier, setActiveTier] = useState<Category>("all");

  const filtered = useMemo(() => {
    if (activeTier === "all") return PARTNER_PACKAGES;

    return PARTNER_PACKAGES.filter((partner) => partner.tier === activeTier);
  }, [activeTier]);

  const counts = useMemo(() => {
    return FILTERS.reduce(
      (acc, filter) => {
        acc[filter.key] =
          filter.key === "all"
            ? PARTNER_PACKAGES.length
            : PARTNER_PACKAGES.filter((partner) => partner.tier === filter.key).length;

        return acc;
      },
      {} as Record<Category, number>,
    );
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Our partners"
        title="Powered by the bold."
        description="Partner opportunities for brands that want to move with the artists, the fans and the culture."
      />

      <Section className="bg-black text-white">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Partnership tiers</p>

              <h2 className="mt-3 font-display text-4xl font-bold leading-none text-white md:text-6xl">
                Built for brands with rhythm.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-white/65 md:text-base">
              This page can be updated as partners are confirmed. For now, it presents clean, credible sponsorship
              opportunities without naming unconfirmed brands.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div
            role="tablist"
            aria-label="Filter partner packages by tier"
            className="mt-8 flex flex-wrap gap-2 border-b border-white/10 pb-6"
          >
            {FILTERS.map((filter) => {
              const active = activeTier === filter.key;

              return (
                <button
                  key={filter.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTier(filter.key)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                    active
                      ? "border-gold bg-gold text-black"
                      : "border-white/15 bg-white/[0.05] text-white/65 hover:border-white/35 hover:text-white"
                  }`}
                >
                  {filter.label}

                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] tabular-nums ${
                      active ? "bg-black/10 text-black" : "bg-white/10 text-white/60"
                    }`}
                  >
                    {counts[filter.key]}
                  </span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        <div className="mt-10">
          <FadeIn>
            <p className="text-xs uppercase tracking-widest text-white/50">
              Showing {filtered.length} {filtered.length === 1 ? "package" : "packages"}
              {activeTier !== "all" ? ` · ${TIER_META[activeTier].label}` : ""}
            </p>
          </FadeIn>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((partner, index) => {
              const meta = TIER_META[partner.tier];
              const logo = partner.tier === "platinum" || partner.tier === "gold" ? partnerLogoFull : partnerLogoMark;

              return (
                <FadeIn key={partner.name} delay={index * 0.03}>
                  <article
                    className={`group relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl border p-5 backdrop-blur-xl transition-transform hover:-translate-y-1 ${meta.card}`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${meta.badge}`}
                        >
                          {meta.label}
                        </span>

                        <ArrowUpRight
                          size={16}
                          className="text-white/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                        />
                      </div>

                      <div className="mt-6 flex aspect-[3/2] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/35 p-6">
                        <img
                          src={logo}
                          alt={`${partner.name} package visual`}
                          loading="lazy"
                          className="max-h-20 w-auto object-contain"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <p className="text-[10px] uppercase tracking-[0.35em] text-gold">{partner.status}</p>

                      <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-white">{partner.name}</h3>

                      <p className="mt-2 text-sm leading-relaxed text-white/65">{partner.blurb}</p>
                    </div>
                  </article>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </Section>

      <Section className="bg-orange-rich text-white">
        <div className="rounded-3xl border border-white/15 bg-black/35 p-8 backdrop-blur-xl md:p-12">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.4em] text-gold">Partner with us</p>

            <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl">
              Let’s build something unforgettable.
            </h2>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              Reach a passionate, culture-defining audience across live, digital, content and on-site experiences.
            </p>

            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 text-sm font-bold uppercase tracking-widest text-black transition-transform hover:scale-105"
            >
              Get in touch <ArrowUpRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
