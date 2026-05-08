import { createFileRoute } from "@tanstack/react-router";
import { FadeIn, PageHero, Section } from "@/components/site/Section";
import { Play } from "lucide-react";
import majorLeague from "@/assets/artists/major-league.jpg";
import tyla from "@/assets/artists/tyla.jpg";
import blackCoffee from "@/assets/artists/black-coffee.jpg";
import nastyC from "@/assets/artists/nasty-c.jpg";
import musaKeys from "@/assets/artists/musa-keys.jpg";
import uncleWaffles from "@/assets/artists/uncle-waffles.jpg";
import focalistic from "@/assets/artists/focalistic.jpg";
import kabza from "@/assets/artists/kabza.jpg";
import shoMadjozi from "@/assets/artists/sho-madjozi.jpg";
import aka from "@/assets/artists/aka.jpg";
import dbnGogo from "@/assets/artists/dbn-gogo.jpg";
import cassper from "@/assets/artists/cassper.jpg";

export const Route = createFileRoute("/music")({
  head: () => ({
    meta: [
      { title: "Music & Artists — Sony Music South Africa" },
      { name: "description", content: "Discover the artists, the sounds and the upcoming releases from Sony Music South Africa." },
      { property: "og:title", content: "Music & Artists — Sony Music SA" },
      { property: "og:description", content: "The lineup. The sound. The future." },
    ],
  }),
  component: MusicPage,
});

const ARTISTS = [
  { name: "Major League DJz", genre: "Amapiano", image: majorLeague },
  { name: "Tyla", genre: "Afro-Pop", image: tyla },
  { name: "Black Coffee", genre: "House", image: blackCoffee },
  { name: "Nasty C", genre: "Hip-Hop", image: nastyC },
  { name: "Musa Keys", genre: "Amapiano", image: musaKeys },
  { name: "Uncle Waffles", genre: "Amapiano", image: uncleWaffles },
  { name: "Focalistic", genre: "Pitori-Sound", image: focalistic },
  { name: "Kabza De Small", genre: "Amapiano", image: kabza },
  { name: "Sho Madjozi", genre: "Gqom-Pop", image: shoMadjozi },
  { name: "AKA", genre: "Hip-Hop", image: aka },
  { name: "DBN Gogo", genre: "Amapiano", image: dbnGogo },
  { name: "Cassper Nyovest", genre: "Hip-Hop", image: cassper },
];

function MusicPage() {
  return (
    <>
      <PageHero
        eyebrow="The lineup"
        title="Sound. Story. Stage."
        description="The artists pushing the next wave — from underground floors to global charts."
      />

      <Section className="border-t border-border">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ARTISTS.map((artist, i) => (
            <FadeIn key={artist.name} delay={(i % 4) * 0.05}>
              <div className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-lg border border-border bg-card">
                <img
                  src={artist.image}
                  alt={artist.name}
                  width={768}
                  height={1024}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <p className="text-xs uppercase tracking-widest text-primary">{artist.genre}</p>
                  <h3 className="mt-1 font-display text-2xl font-bold leading-tight">{artist.name}</h3>
                  <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-foreground/20 bg-background/40 px-3 py-1 text-xs uppercase tracking-widest backdrop-blur-sm opacity-0 transition-opacity group-hover:opacity-100">
                    <Play size={12} /> Preview
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.4em] text-primary">Latest releases</p>
          <h2 className="mt-4 font-display text-5xl font-bold md:text-6xl">Fresh on the playlist.</h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Embedded Spotify and YouTube previews coming soon — once we wire your channels, this section streams live.
          </p>
        </FadeIn>
      </Section>
    </>
  );
}
