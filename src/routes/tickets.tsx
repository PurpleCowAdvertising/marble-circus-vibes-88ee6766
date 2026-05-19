import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { FadeIn, PageHero, Section } from "@/components/site/Section";

export const Route = createFileRoute("/tickets")({
  head: () => ({
    meta: [
      { title: "Tickets — Scorpion Kings Live at FNB Stadium" },
      { name: "description", content: "Tickets for Scorpion Kings Live at FNB Stadium, 19 September 2028. From R400 via Webtickets, Pick n Pay and Boxer stores nationwide. Ages 14+." },
      { property: "og:title", content: "Tickets — Scorpion Kings Live at FNB Stadium" },
      { property: "og:description", content: "On sale now from R400. Webtickets, Pick n Pay and Boxer stores nationwide." },
    ],
  }),
  component: TicketsPage,
});

const RETAILERS = ["Webtickets", "Pick n Pay", "Boxer"];

function TicketsPage() {
  return (
    <>
      <PageHero
        eyebrow="Tickets · On sale now"
        title="Be part of history."
        description="Scorpion Kings Live returns to FNB Stadium on 19 September 2028 — the biggest Amapiano celebration the world has ever seen. Over 80 000 fans. One stadium. One sound."
      />

      <Section className="!pt-0">
        {/* Headline ticket card */}
        <FadeIn>
          <article className="relative overflow-hidden rounded-3xl border border-primary bg-primary/5 p-8 md:p-12 shadow-[0_30px_80px_-30px_color-mix(in_oklab,var(--primary)_45%,transparent)]">
            <span className="absolute -top-3 left-8 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
              Tickets are live
            </span>
            <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">From</p>
                <p className="mt-2 font-display text-6xl font-bold leading-none text-primary md:text-8xl">R400</p>
                <p className="mt-3 text-sm text-muted-foreground">per person · ages 14 and up</p>
                <p className="mt-6 max-w-md text-base text-foreground/80">
                  Tickets on sale from <strong>05 May 2026</strong> via Webtickets, Pick n Pay and Boxer
                  stores nationwide. Secure your place before it's gone.
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href="https://www.webtickets.co.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-[1.02]"
                >
                  Buy on Webtickets <ArrowUpRight size={16} />
                </a>
                <p className="text-center text-[10px] uppercase tracking-widest text-muted-foreground">
                  Also at Pick n Pay & Boxer in-store
                </p>
              </div>
            </div>
          </article>
        </FadeIn>

        {/* Retailers strip */}
        <FadeIn delay={0.15}>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {RETAILERS.map((r) => (
              <div
                key={r}
                className="flex items-center justify-center rounded-2xl border border-border bg-card px-6 py-5 text-center"
              >
                <p className="font-display text-lg font-bold tracking-tight">{r}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Event facts */}
        <FadeIn delay={0.25}>
          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {[
              { k: "Venue", v: "FNB Stadium, Johannesburg" },
              { k: "Date", v: "19 September 2028" },
              { k: "Capacity", v: "80 000+ fans" },
              { k: "Age limit", v: "14 and up" },
            ].map((f) => (
              <div key={f.k} className="rounded-xl border border-border bg-card p-5">
                <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">{f.k}</p>
                <p className="mt-2 font-display text-lg font-bold leading-tight">{f.v}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.35}>
          <p className="mt-10 text-xs text-muted-foreground">
            Curated by Amapiano pioneers DJ Maphorisa and Kabza De Small. More
            announcements — including lineup reveals — still to come. All sales
            are governed by the official ticketing partner's terms.
          </p>
        </FadeIn>
      </Section>
    </>
  );
}
