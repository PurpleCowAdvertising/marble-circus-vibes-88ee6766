import { createFileRoute } from "@tanstack/react-router";
import { FadeIn, PageHero, Section } from "@/components/site/Section";
import { Mic2, Crown, Utensils, Map, ShieldCheck, Car } from "lucide-react";

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
  { title: "Main stage", body: "A 60-metre wide stadium build with 360° LED, custom lighting rig and pyrotechnics — the focal point of the night.", icon: Mic2, accent: "from-primary/30 via-primary/10 to-transparent" },
  { title: "VIP areas", body: "Elevated viewing decks, dedicated bars and premium hospitality with concierge service for the full show.", icon: Crown, accent: "from-gold/30 via-gold/10 to-transparent" },
  { title: "Vendors + merch", body: "Curated street food, full bar service and the official merch drop — including limited tour-only pieces.", icon: Utensils, accent: "from-accent/30 via-accent/10 to-transparent" },
  { title: "Site map", body: "Five entry gates, clearly marked zones and family-friendly facilities mapped from the moment you arrive.", icon: Map, accent: "from-primary/30 via-primary/10 to-transparent" },
  { title: "Safety & security", body: "On-site medics, accredited security and a dedicated welfare team — your night, looked after end to end.", icon: ShieldCheck, accent: "from-gold/30 via-gold/10 to-transparent" },
  { title: "Traffic & transport", body: "Designated drop-off zones, ride-share pickup bays and shuttle routes from key Joburg pickup points.", icon: Car, accent: "from-accent/30 via-accent/10 to-transparent" },
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
          {BLOCKS.map((b, i) => {
            const Icon = b.icon;
            return (
              <FadeIn key={b.title} delay={i * 0.06}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition-transform hover:-translate-y-1 md:p-7">
                  <div className={`relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-gradient-to-br ${b.accent}`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon size={56} className="text-foreground/70" strokeWidth={1.25} />
                    </div>
                  </div>
                  <h2 className="mt-5 font-display text-2xl font-bold leading-tight md:text-3xl">{b.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{b.body}</p>
                </article>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-12 grid gap-4 rounded-2xl border border-border bg-card p-8 md:grid-cols-4 md:p-10">
            {[
              { k: "Doors", v: "14:00" },
              { k: "Headline set", v: "21:30" },
              { k: "Curfew", v: "00:00" },
              { k: "Gates", v: "5 access points" },
            ].map((f) => (
              <div key={f.k}>
                <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">{f.k}</p>
                <p className="mt-2 font-display text-2xl font-bold leading-tight">{f.v}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>
    </>
  );
}

