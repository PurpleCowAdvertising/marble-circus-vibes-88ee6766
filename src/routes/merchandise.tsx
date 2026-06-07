import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { FadeIn, PageHero, Section } from "@/components/site/Section";

import tourTee from "@/assets/merch/tour-tee.jpg";
import tourHoodie from "@/assets/merch/tour-hoodie.jpg";
import snapbackCap from "@/assets/merch/snapback-cap.jpg";
import eventPoster from "@/assets/merch/event-poster.jpg";

export const Route = createFileRoute("/merchandise")({
  head: () => ({
    meta: [
      { title: "Merchandise | Scorpion Kings Live" },
      {
        name: "description",
        content: "Official Scorpion Kings Live merchandise, limited drops and approved store updates.",
      },
      { property: "og:title", content: "Merchandise | Scorpion Kings Live" },
      {
        property: "og:description",
        content: "Official drops, previews and store updates.",
      },
    ],
  }),
  component: MerchandisePage,
});

const PRODUCTS = [
  {
    name: "Tour Tee",
    price: "R350",
    image: tourTee,
    alt: "Black Scorpion Kings Live tour t-shirt",
  },
  {
    name: "Tour Hoodie",
    price: "R850",
    image: tourHoodie,
    alt: "Black Scorpion Kings Live pullover hoodie",
  },
  {
    name: "Snapback Cap",
    price: "R320",
    image: snapbackCap,
    alt: "Black flat-brim Scorpion Kings Live snapback cap",
  },
  {
    name: "Event Poster",
    price: "R180",
    image: eventPoster,
    alt: "Scorpion Kings Live event poster",
  },
] as const;

function MerchandisePage() {
  return (
    <>
      <PageHero
        eyebrow="Merchandise"
        title="Official drops."
        description="Limited runs designed for the night. Store access and official drop details will be announced soon."
      />

      <Section className="bg-black text-white">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Store preview</p>

              <h2 className="mt-3 font-display text-4xl font-bold leading-none text-white md:text-6xl">
                Wear the night.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-white/65 md:text-base">
              These are preview items for the official Scorpion Kings Live merch drop. Final product availability,
              pricing and store links can be updated once confirmed.
            </p>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product, index) => (
            <FadeIn key={product.name} delay={index * 0.05}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] p-4 backdrop-blur-xl transition-transform hover:-translate-y-1">
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-black">
                  <img
                    src={product.image}
                    alt={product.alt}
                    width={1024}
                    height={1024}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  />

                  <span className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-black">
                    Preview
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-1 pt-4">
                  <h3 className="font-display text-2xl font-bold leading-tight text-white">{product.name}</h3>

                  <p className="mt-1 text-sm text-white/60">Expected price · {product.price}</p>

                  <p className="mt-4 text-xs uppercase tracking-[0.25em] text-gold/80">Coming soon</p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.25}>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-xl md:p-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Coming soon</p>

              <h2 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">
                Official store goes live closer to the event.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65">
                For merch enquiries, partner drops or retail opportunities, get in touch with the team.
              </p>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-xs font-bold uppercase tracking-widest text-black transition-transform hover:scale-105"
            >
              Contact us <ArrowUpRight size={14} />
            </Link>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
