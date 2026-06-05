import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { FadeIn, PageHero, Section } from "@/components/site/Section";
import tourTee from "@/assets/merch/tour-tee.jpg";
import tourHoodie from "@/assets/merch/tour-hoodie.jpg";
import snapbackCap from "@/assets/merch/snapback-cap.jpg";
import eventPoster from "@/assets/merch/event-poster.jpg";

export const Route = createFileRoute("/merchandise")({
  head: () => ({
    meta: [
      { title: "Merchandise — Scorpion Kings Live" },
      { name: "description", content: "Official Scorpion Kings Live merchandise — limited drops and approved store redirects." },
      { property: "og:title", content: "Merchandise — Scorpion Kings Live" },
      { property: "og:description", content: "Official drops, previews and store redirect." },
    ],
  }),
  component: MerchandisePage,
});

const PRODUCTS = [
  { name: "Tour Tee — Black", price: "R 350", image: tourTee, alt: "Black Scorpion Kings Live tour t-shirt" },
  { name: "Tour Hoodie", price: "R 850", image: tourHoodie, alt: "Black Scorpion Kings Live pullover hoodie" },
  { name: "Snapback Cap", price: "R 320", image: snapbackCap, alt: "Black flat-brim Scorpion Kings Live snapback cap" },
  { name: "Event Poster (A2)", price: "R 180", image: eventPoster, alt: "A2 Scorpion Kings Live event poster" },
];

function MerchandisePage() {
  return (
    <>
      <PageHero
        eyebrow="Merchandise"
        title="Official drops."
        description="Limited runs, designed for the night. Full store redirect goes live with the on-sale."
      />

      <Section className="!pt-0">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.05}>
              <article className="group flex h-full flex-col rounded-2xl border border-border bg-card p-4 transition-transform hover:-translate-y-1">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-black">
                  <img
                    src={p.image}
                    alt={p.alt}
                    width={1024}
                    height={1024}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-foreground backdrop-blur">
                    Preview
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold leading-tight">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.price}</p>
              </article>
            </FadeIn>
          ))}
        </div>


        <FadeIn delay={0.25}>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 md:p-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-primary">Coming soon</p>
              <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">Official store goes live with on-sale.</h2>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-xs font-bold uppercase tracking-widest text-background transition-transform hover:scale-105"
            >
              Notify me <ArrowUpRight size={14} />
            </a>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
