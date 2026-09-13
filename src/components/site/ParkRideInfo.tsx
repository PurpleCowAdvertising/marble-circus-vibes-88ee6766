import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

import { PARK_RIDE_URL } from "@/components/site/ParkRideModal";
import poster1 from "@/assets/parkride/1-available.jpg.asset.json";
import poster2 from "@/assets/parkride/2-why.jpg.asset.json";
import poster3 from "@/assets/parkride/3-how.jpg.asset.json";
import poster4 from "@/assets/parkride/4-locations.jpg.asset.json";
import poster5 from "@/assets/parkride/5-pricing.jpg.asset.json";
import poster6 from "@/assets/parkride/6-times.jpg.asset.json";
import poster7 from "@/assets/parkride/7-info.jpg.asset.json";

const POSTERS = [
  { src: poster1.url, label: "Park + Ride now available", alt: "Park + Ride now available — skip the traffic, skip the parking stress." },
  { src: poster2.url, label: "Why use Park + Ride", alt: "Why use Park + Ride: secure parking, direct transport, dedicated shuttle zone and safe return." },
  { src: poster3.url, label: "How it works", alt: "How Park + Ride works in four steps: book, drive to your departure point, board your shuttle, ride back." },
  { src: poster4.url, label: "Pick-up locations", alt: "Park + Ride pick-up locations across Johannesburg and Pretoria." },
  { src: poster5.url, label: "Pricing per pick-up", alt: "Park + Ride pricing per pick-up point, from R225 to R325." },
  { src: poster6.url, label: "Important times", alt: "Important Park + Ride times: first buses depart 12:00, last departure 15:00." },
  { src: poster7.url, label: "Important information", alt: "Important Park + Ride information: one ticket per person, children need their own ticket." },
] as const;

const TIMES = [
  "First buses depart: 12:00",
  "Last departure from pick-up points: 15:00",
  "Please arrive at least 15 minutes before your departure time.",
  "Return buses begin operating immediately after the event.",
  "Final buses leave approximately 60 minutes after the concert ends.",
];

const STEPS = [
  { title: "Book your ticket", body: "Purchase your official Park + Ride ticket via Webtickets or scorpionkings.live." },
  { title: "Drive to departure point", body: "Park your vehicle at your selected Park + Ride location. Secure parking is available and managed by the shopping centre." },
  { title: "Board your shuttle", body: "Friendly staff will assist you before boarding your direct shuttle to FNB Stadium." },
  { title: "The ride back", body: "After the show, return to the designated Park + Ride collection area. Buses will drive you back." },
];

const PRICING = [
  { price: "R225", places: ["Gold Reef City"] },
  { price: "R275", places: ["The Glen Shopping Centre"] },
  {
    price: "R285",
    places: [
      "Mall of Africa",
      "Nelson Mandela Square",
      "Montecasino",
      "Clearwater Mall",
      "Cresta Shopping Centre",
      "East Rand Mall",
      "Greenstone Shopping Centre",
      "Melrose Arch",
    ],
  },
  { price: "R325", places: ["Menlyn Shopping Centre"] },
];

const NOTES = [
  "One Park + Ride ticket is required per person.",
  "Children require their own valid ticket.",
  "Please follow all event signage and staff instructions.",
  "Parking is managed by shopping centre security.",
  "Missed buses are non-refundable.",
];

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-xl md:p-7">
      <h3 className="font-display text-2xl font-bold text-white md:text-3xl">{title}</h3>
      <div className="mt-4 text-base leading-relaxed text-white/70">{children}</div>
    </div>
  );
}

export function ParkRideInfo() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    if (lightbox === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [lightbox]);

  return (
    <div id="park-ride" className="scroll-mt-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-gold">Park + Ride</p>
          <h2 className="mt-2 font-display text-4xl font-bold text-white md:text-5xl">
            Skip the traffic. Skip the parking stress.
          </h2>
          <p className="mt-3 max-w-2xl text-base text-white/65">
            Secure parking at your nearest mall and a direct return shuttle to FNB Stadium. Tap any poster to read it
            full screen.
          </p>
        </div>

        <a
          href={PARK_RIDE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-xs font-bold uppercase tracking-widest text-black transition-transform hover:scale-105"
        >
          Book Park + Ride <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:px-0">
        {POSTERS.map((poster, index) => (
          <button
            key={poster.label}
            type="button"
            onClick={() => setLightbox(index)}
            className="group w-56 shrink-0 snap-start overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] text-left backdrop-blur-xl transition-transform hover:scale-[1.02] md:w-64"
          >
            <img
              src={poster.src}
              alt={poster.alt}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
            <span className="block px-4 py-3 text-xs font-bold uppercase tracking-widest text-white/80 group-hover:text-gold">
              {poster.label}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card title="Important times">
          <ul className="space-y-2">
            {TIMES.map((line) => (
              <li key={line} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {line}
              </li>
            ))}
          </ul>
        </Card>

        <Card title="How it works">
          <ol className="space-y-4">
            {STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="font-display text-lg text-gold">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block font-bold text-white">{step.title}</span>
                  {step.body}
                </span>
              </li>
            ))}
          </ol>
        </Card>

        <Card title="Pricing per pick-up">
          <ul className="space-y-4">
            {PRICING.map((tier) => (
              <li key={tier.price} className="flex flex-wrap items-start gap-3">
                <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold text-black">{tier.price}</span>
                <span className="flex-1">{tier.places.join(" · ")}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Important information">
          <ul className="space-y-2">
            {NOTES.map((note) => (
              <li key={note} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {note}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              aria-label="Close poster"
              onClick={() => setLightbox(null)}
              className="absolute right-5 top-5 rounded-full border border-white/20 bg-white/10 p-2 text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.img
              key={lightbox}
              src={POSTERS[lightbox]!.src}
              alt={POSTERS[lightbox]!.alt}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[90vh] w-auto max-w-full rounded-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
