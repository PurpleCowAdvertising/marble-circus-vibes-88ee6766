import { createFileRoute } from "@tanstack/react-router";
import { Music2 } from "lucide-react";

import { FadeIn, PageHero, Section } from "@/components/site/Section";

import majorLeague from "@/assets/artists/major-league.jpg";
import tyla from "@/assets/artists/tyla.webp";
import blackCoffee from "@/assets/artists/black-coffee.webp";
import nastyC from "@/assets/artists/nasty-c.webp";
import musaKeys from "@/assets/artists/musa-keys.webp";
import uncleWaffles from "@/assets/artists/uncle-waffles.webp";
import focalistic from "@/assets/artists/focalistic.jpg";
import kabza from "@/assets/artists/kabza.jpg";
import shoMadjozi from "@/assets/artists/sho-madjozi.jpg";
import aka from "@/assets/artists/aka.jpg";
import dbnGogo from "@/assets/artists/dbn-gogo.jpg";
import cassper from "@/assets/artists/cassper.jpg";

export const Route = createFileRoute("/music")({
  head: () => ({
    meta: [
      { title: "Line-Up | Scorpion Kings Live" },
      {
        name: "description",
        content: "Discover the artists, the sound and the culture behind Scorpion Kings Live.",
      },
      { property: "og:title", content: "Line-Up | Scorpion Kings Live" },
      {
        property: "og:description",
        content: "The lineup. The sound. The future.",
      },
    ],
  }),
  component: MusicPage,
});

const ARTISTS = [
  {
    name: "Major League DJz",
    genre: "Amapiano",
    image: majorLeague,
    status: "Main Stage",
  },
  {
    name: "Tyla",
    genre: "Afro-Pop",
    image: tyla,
    status: "Headline Energy",
  },
  {
    name: "Black Coffee",
    genre: "House",
    image: blackCoffee,
    status: "Icon Set",
  },
  {
    name: "Nasty C",
    genre: "Hip-Hop",
    image: nastyC,
    status: "Prime Time",
  },
  {
    name: "Musa Keys",
    genre: "Amapiano",
    image: musaKeys,
    status: "Second Stage",
  },
  {
    name: "Uncle Waffles",
    genre: "Amapiano",
    image: uncleWaffles,
    status: "Late Night",
  },
  {
    name: "Focalistic",
    genre: "Pitori Sound",
    image: focalistic,
    status: "Crowd Driver",
  },
  {
    name: "Kabza De Small",
    genre: "Amapiano",
    image: kabza,
    status: "Scorpion Kings",
  },
  {
    name: "Sho Madjozi",
    genre: "Gqom-Pop",
    image: shoMadjozi,
    status: "Live Moment",
  },
  {
    name: "AKA",
    genre: "Hip-Hop",
    image: aka,
    status: "Legacy Tribute",
  },
  {
    name: "DBN Gogo",
    genre: "Amapiano",
    image: dbnGogo,
    status: "Dance Floor",
  },
  {
    name: "Cassper Nyovest",
    genre: "Hip-Hop",
    image: cassper,
    status: "Arena Energy",
  },
] as const;

function MusicPage() {
  return (
    <>
      <PageHero
        eyebrow="The lineup"
        title="Sound. Story. Stage."
        description="The artists pushing the next wave, from underground floors to global charts."
      />

      <Section className="bg-black text-white">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Artists</p>

              <h2 className="mt-3 font-display text-4xl font-bold leading-none text-white md:text-6xl">
                Built for the big stage.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-white/65 md:text-base">
              A living roster of amapiano, hip-hop, house and culture-shaping performers. More names and set details
              will be announced closer to the event.
            </p>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ARTISTS.map((artist, index) => (
            <FadeIn key={artist.name} delay={(index % 4) * 0.05}>
              <article className="group relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/15 bg-white/[0.05] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)]">
                <img
                  src={artist.image}
                  alt={artist.name}
                  width={768}
                  height={1024}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent" />

                <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.24em] text-white/80 backdrop-blur-md">
                  {artist.status}
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[10px] uppercase tracking-[0.32em] text-gold">{artist.genre}</p>

                  <h3 className="mt-1 font-display text-3xl font-bold leading-none text-white">{artist.name}</h3>

                  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/75 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <Music2 size={12} />
                    <span>Line-up artist</span>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="bg-orange-rich text-white">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.4em] text-gold">Latest releases</p>

          <h2 className="mt-4 font-display text-5xl font-bold md:text-6xl">Fresh on the playlist.</h2>

          <p className="mt-4 max-w-xl leading-relaxed text-white/70">
            Embedded Spotify and YouTube previews are coming soon. Once the official channels are wired, this section
            can stream live updates from the artists and the event.
          </p>
        </FadeIn>
      </Section>
    </>
  );
}
