import { createFileRoute } from "@tanstack/react-router";
import { FadeIn, PageHero, Section } from "@/components/site/Section";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Scorpion Kings" },
      { name: "description", content: "Scorpion Kings: championing the artists, the sounds and the stories shaping a continent." },
      { property: "og:title", content: "About — Scorpion Kings" },
      { property: "og:description", content: "Championing the artists shaping a continent." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="We bet on bold."
        description="From amapiano to afro-pop, gqom to global crossovers — Scorpion Kings is the home of artists who don't ask for permission."
      />

      <Section className="border-t border-border">
        <div className="grid gap-16 md:grid-cols-2">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.4em] text-primary">Our story</p>
            <h2 className="mt-4 font-display text-5xl font-bold leading-tight">
              A movement<br />in the making.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="space-y-5 text-lg text-muted-foreground">
              <p>
                For decades, Scorpion Kings has been the engine behind the artists who shape culture.
                In South Africa, we're building something that goes beyond the studio — a stage, a community,
                and a moment that brings local sound to a global audience.
              </p>
              <p>
                This is an experience that lives in headphones, on phones, in stadiums and in living rooms.
                It's where the next generation of African talent meets the world.
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section className="border-t border-border">
        <div className="grid gap-12 md:grid-cols-3">
          {[
            { n: "01", t: "Champion artists", d: "We invest in talent, not trends. Long-term partnerships, not one-night deals." },
            { n: "02", t: "Build experiences", d: "Music is felt, not just heard. We craft moments that stay with you." },
            { n: "03", t: "Move the culture", d: "From the streets to the stage to the algorithm — we're shaping what comes next." },
          ].map((item, i) => (
            <FadeIn key={item.n} delay={i * 0.1}>
              <div className="border-t border-primary pt-6">
                <p className="font-display text-5xl font-bold text-primary">{item.n}</p>
                <h3 className="mt-4 font-display text-2xl font-bold">{item.t}</h3>
                <p className="mt-3 text-muted-foreground">{item.d}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.4em] text-primary">The team</p>
          <h2 className="mt-4 font-display text-5xl font-bold md:text-6xl">Behind the sound.</h2>
        </FadeIn>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Yule Dlamini", role: "A&R Lead" },
            { name: "Tina M.", role: "Brand & Design" },
            { name: "Ref M.", role: "Operations" },
            { name: "Katlego N.", role: "Partnerships" },
          ].map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.05}>
              <div className="aspect-square rounded-lg border border-border bg-gradient-to-br from-card to-secondary" />
              <p className="mt-4 font-display text-xl font-bold">{p.name}</p>
              <p className="text-sm text-muted-foreground">{p.role}</p>
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
}
