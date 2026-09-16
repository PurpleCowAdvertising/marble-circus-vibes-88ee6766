import { createFileRoute } from "@tanstack/react-router";

import { FadeIn, PageHero, Section } from "@/components/site/Section";
import { PageGate, VisibilityGate } from "@/components/site/visibility";
import { SPONSORS } from "@/config/sponsors";

const TIER_A_ORDER = ["SABC 1", "Gauteng Province", "Castle Lite", "Sprite", "RocoMamas", "VEEV"];
const TIER_B_ORDER = ["McCafé", "Galxboy", "Gautrain", "SAMPRA"];
const TIER_C_ORDER = ["Cabs Car Hire", "Audi Centre Wonderboom"];

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partners & Sponsorship | Scorpion Kings Live" },
      {
        name: "description",
        content:
          "Proud partners of Scorpion Kings Live at FNB Stadium, 19 September 2026. Sponsorship enquiries: sponsorship@scorpionkings.live.",
      },
      { property: "og:title", content: "Partners & Sponsorship | Scorpion Kings Live" },
      {
        property: "og:description",
        content: "Powered by brands that move with the culture. Meet our proud partners.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/partners" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Partners & Sponsorship | Scorpion Kings Live" },
      {
        name: "twitter:description",
        content: "Proud partners of Scorpion Kings Live at FNB Stadium, 19 September 2026.",
      },
    ],
    links: [{ rel: "canonical", href: "/partners" }],
  }),
  component: PartnersPage,
});

function sortByName(names: string[]) {
  const map = new Map(SPONSORS.map((s) => [s.name, s]));
  return names.map((name) => map.get(name)).filter(Boolean) as typeof SPONSORS;
}

function PartnersPage() {
  const tierA = sortByName(TIER_A_ORDER);
  const tierB = sortByName(TIER_B_ORDER);
  const tierC = sortByName(TIER_C_ORDER);

  return (
    <PageGate keyName="page:partners">
      <PageHero
        eyebrow="Our partners"
        title="Powered by the bold."
        description="The brands and partners standing with Scorpion Kings Live."
      />

      <VisibilityGate keyName="section:partners.confirmed">
        <Section className="bg-black text-white !pb-24">
          <FadeIn>
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Headline partners</p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-none text-white md:text-6xl">
              Proudly partnered by.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
              {tierA.map((sponsor) => {
                const chipClassName = `flex h-32 items-center justify-center rounded-2xl border py-5 backdrop-blur-xl transition-colors md:h-40 ${
                  sponsor.wide ? "px-3" : "px-6"
                } ${
                  sponsor.onLight ? "border-white/15 bg-white/90" : "border-white/10 bg-white/[0.06] hover:border-white/25"
                } ${sponsor.url ? "hover:border-gold/40" : ""}`;
                const imageClassName =
                  sponsor.imgClassName ??
                  (sponsor.wide
                    ? "mx-auto h-14 w-[90%] object-contain object-center md:h-16"
                    : "max-h-14 w-auto max-w-full object-contain md:max-h-16");
                return (
                  <li key={sponsor.name} className="min-w-0">
                    {sponsor.url ? (
                      <a
                        href={sponsor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={chipClassName}
                      >
                        <img
                          src={sponsor.logo}
                          alt={`${sponsor.name} logo`}
                          loading="lazy"
                          className={imageClassName}
                        />
                      </a>
                    ) : (
                      <div className={chipClassName}>
                        <img
                          src={sponsor.logo}
                          alt={`${sponsor.name} logo`}
                          loading="lazy"
                          className={imageClassName}
                        />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/50">Official partners</p>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <ul className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-4">
              {tierB.map((sponsor) => {
                const chipClassName = `flex h-24 w-full items-center justify-center rounded-2xl border py-3 backdrop-blur-xl transition-colors sm:h-20 sm:w-[calc(33.333%-0.75rem)] sm:py-4 md:h-24 lg:w-64 ${
                  sponsor.wide ? "px-3" : "px-4 sm:px-6"
                } ${
                  sponsor.onLight ? "border-white/15 bg-white/90" : "border-white/10 bg-white/[0.06] hover:border-white/25"
                } ${sponsor.url ? "hover:border-gold/40" : ""}`;
                const imageClassName = `${sponsor.imgClassName ?? (sponsor.wide
                  ? "mx-auto h-8 w-[88%] object-contain object-center md:h-10"
                  : "max-h-8 w-auto max-w-full object-contain md:max-h-10")} max-sm:!h-12 max-sm:!max-h-12 max-sm:!object-contain max-sm:!object-center max-sm:!w-[90%]`;
                return (
                  <li key={sponsor.name} className="min-w-0 sm:contents">
                    {sponsor.url ? (
                      <a
                        href={sponsor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={chipClassName}
                      >
                        <img
                          src={sponsor.logo}
                          alt={`${sponsor.name} logo`}
                          loading="lazy"
                          className={imageClassName}
                        />
                      </a>
                    ) : (
                      <div className={chipClassName}>
                        <img
                          src={sponsor.logo}
                          alt={`${sponsor.name} logo`}
                          loading="lazy"
                          className={imageClassName}
                        />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div className="mt-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/50">TRANSPORT PARTNER</p>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <ul className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
              {tierC.map((sponsor) => {
                const chipClassName = `flex h-16 w-full items-center justify-center rounded-2xl border py-3 backdrop-blur-xl transition-colors sm:w-[calc(33.333%-0.75rem)] md:h-20 lg:w-56 ${
                  sponsor.wide ? "px-3" : "px-6"
                } ${
                  sponsor.onLight ? "border-white/15 bg-white/90" : "border-white/10 bg-white/[0.06] hover:border-white/25"
                } ${sponsor.url ? "hover:border-gold/40" : ""}`;
                const imageClassName = sponsor.imgClassName ?? (sponsor.wide
                  ? "mx-auto h-7 w-[88%] object-contain object-center md:h-8"
                  : "max-h-7 w-auto max-w-full object-contain md:max-h-8");
                return (
                  <li key={sponsor.name} className="w-[calc(50%-0.375rem)] sm:contents">
                    {sponsor.url ? (
                      <a
                        href={sponsor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={chipClassName}
                      >
                        <img
                          src={sponsor.logo}
                          alt={`${sponsor.name} logo`}
                          loading="lazy"
                          className={imageClassName}
                        />
                      </a>
                    ) : (
                      <div className={chipClassName}>
                        <img
                          src={sponsor.logo}
                          alt={`${sponsor.name} logo`}
                          loading="lazy"
                          className={imageClassName}
                        />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </FadeIn>

          <FadeIn delay={0.35}>
            <p className="mt-12 text-center text-sm text-white/50">
              Sponsorship enquiries:{" "}
              <a
                href="mailto:sponsorship@scorpionkings.live"
                className="text-gold hover:underline"
              >
                sponsorship@scorpionkings.live
              </a>
            </p>
          </FadeIn>
        </Section>
      </VisibilityGate>
    </PageGate>
  );
}
