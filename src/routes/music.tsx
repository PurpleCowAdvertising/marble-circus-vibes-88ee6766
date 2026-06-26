import { createFileRoute } from "@tanstack/react-router";
import { Music2 } from "lucide-react";

import { FadeIn, PageHero, Section } from "@/components/site/Section";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import majorLeague from "@/assets/artists/major-league.jpg";
import tyla from "@/assets/artists/tyla.webp";
import blackCoffee from "@/assets/artists/black-coffee.webp";
import nastyC from "@/assets/artists/nasty-c.webp";
import musaKeys from "@/assets/artists/musa-keys.webp";
import uncleWaffles from "@/assets/artists/uncle-waffles.webp";
import focalistic from "@/assets/artists/focalistic.jpg";
import kabza from "@/assets/artists/kabza.png";
import maphorisa from "@/assets/artists/dj-maphorisa.png";
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

type Artist = {
  name: string;
  genre: string;
  image: string;
  status: string;
  bio: string;
  highlights: string[];
};

const ARTISTS: readonly Artist[] = [
  {
    name: "DJ Maphorisa",
    genre: "Amapiano · Producer",
    image: maphorisa,
    status: "Scorpion Kings",
    bio: "Themba Sekowe, known as DJ Maphorisa, is a globally recognised South African DJ, producer and singer from Soshanguve. From Y-Tjukutja and Khona to Particula with Major Lazer, he has spent over a decade shaping African pop, Afrobeats and Amapiano into a worldwide sound.",
    highlights: [
      "Co-architect of Amapiano’s global rise alongside Kabza De Small.",
      "African DJ of the Year, 2023 Soundcity MVP Awards.",
      "Multi-platinum catalogue including Banyana, Abalele and Ba Straata.",
    ],
  },
  {
    name: "Kabza De Small",
    genre: "Amapiano",
    image: kabza,
    status: "Scorpion Kings",
    bio: "Kabelo Motha, the King of Amapiano, is the producer who turned a township sound into a global movement. From Piano Hub to KOA II and Bab’Motha, he has redefined modern South African music, earning SAMA wins, a Forbes Africa 30 Under 30 listing and a first-of-its-kind Red Bull Symphonic.",
    highlights: [
      "1.1B+ all-time streams and chart-topping albums.",
      "First Amapiano artist to perform Red Bull Symphonic.",
      "Multiple SAMA and Metro FM wins including Artist of the Year.",
    ],
  },
  {
    name: "Major League DJz",
    genre: "Amapiano",
    image: majorLeague,
    status: "Main Stage",
    bio: "Twin brothers Banele and Bandile have turned Balcony Mix into a global movement, exporting Amapiano from Johannesburg balconies to sold-out floors in London, New York and Lagos.",
    highlights: [
      "Balcony Mix Africa series with hundreds of millions of streams.",
      "International festival appearances across Europe and the US.",
      "Collaborations with Burna Boy, Tyla and Ty Dolla $ign.",
    ],
  },
  {
    name: "Tyla",
    genre: "Afro-Pop",
    image: tyla,
    status: "Headline Energy",
    bio: "The Grammy-winning voice behind Water, Tyla is the new face of South African pop, blending Amapiano rhythm with R&B and global radio polish.",
    highlights: [
      "Grammy Award for Best African Music Performance.",
      "Billboard Hot 100 breakout with Water.",
      "Global tour with sold-out dates across the US and Europe.",
    ],
  },
  {
    name: "Black Coffee",
    genre: "House",
    image: blackCoffee,
    status: "Icon Set",
    bio: "The architect of South African house music, Black Coffee has spent two decades shaping the sound of global dance floors from Ibiza to Madison Square Garden.",
    highlights: [
      "Grammy Award for Best Dance/Electronic Album.",
      "Residencies at Hï Ibiza and Madison Square Garden headline show.",
      "Pioneer of South African deep house on the world stage.",
    ],
  },
  {
    name: "Nasty C",
    genre: "Hip-Hop",
    image: nastyC,
    status: "Prime Time",
    bio: "Durban-born lyricist with a global pen game, Nasty C bridges South African hip-hop with international audiences through Def Jam-era releases and chart-topping collaborations.",
    highlights: [
      "Def Jam Africa signing and global album rollouts.",
      "Collaborations with T.I., French Montana and Ari Lennox.",
      "Multiple SA Hip Hop Award and BET cypher highlights.",
    ],
  },
  {
    name: "Musa Keys",
    genre: "Amapiano",
    image: musaKeys,
    status: "Second Stage",
    bio: "From Selema to Unite The World, Musa Keys turns log-drum grooves into stadium-sized choruses and has become one of Amapiano’s most exportable voices.",
    highlights: [
      "Global hit Selema with chart placements across Africa and Europe.",
      "Collaboration with Davido on Unavailable.",
      "Headline sets across the UK, US and continental Europe.",
    ],
  },
  {
    name: "Uncle Waffles",
    genre: "Amapiano",
    image: uncleWaffles,
    status: "Late Night",
    bio: "The face of new Amapiano, Uncle Waffles has taken the genre to Coachella, Wireless and global club circuits with a stage presence built for big moments.",
    highlights: [
      "Coachella performance debut for Amapiano.",
      "Sold-out international tour dates across the UK and US.",
      "Drake co-sign and viral global moments.",
    ],
  },
  {
    name: "Focalistic",
    genre: "Pitori Sound",
    image: focalistic,
    status: "Crowd Driver",
    bio: "Pitori’s President of Politiki Movement, Focalistic helped take Amapiano mainstream with Ke Star and a string of stadium-ready anthems.",
    highlights: [
      "Ke Star remix with Davido — global Amapiano breakthrough.",
      "Collaborations with Major Lazer and Diamond Platnumz.",
      "Sold-out African and European tour dates.",
    ],
  },
  {
    name: "Sho Madjozi",
    genre: "Gqom-Pop",
    image: shoMadjozi,
    status: "Live Moment",
    bio: "A vibrant fusion of Tsonga culture, Gqom and pop, Sho Madjozi turned John Cena into a global moment and continues to celebrate African identity on every stage.",
    highlights: [
      "BET Award for Best New International Act.",
      "Global viral hit John Cena.",
      "NPR Tiny Desk and international festival circuit.",
    ],
  },
  {
    name: "AKA",
    genre: "Hip-Hop",
    image: aka,
    status: "Legacy Tribute",
    bio: "A tribute set honouring the legacy of Kiernan Forbes — one of South African hip-hop’s most defining voices and showmen.",
    highlights: [
      "Multi-platinum albums Altar Ego, Levels and Touch My Blood.",
      "First SA hip-hop artist to fill major arena venues solo.",
      "Cultural impact that continues to shape SA rap.",
    ],
  },
  {
    name: "DBN Gogo",
    genre: "Amapiano",
    image: dbnGogo,
    status: "Dance Floor",
    bio: "One of Amapiano’s most in-demand selectors, DBN Gogo has turned Possible into a movement and become a global ambassador for the genre’s dance floor.",
    highlights: [
      "Global hit French Kiss and Possible.",
      "International festival appearances across Europe and Australia.",
      "Brand collaborations with major global labels.",
    ],
  },
  {
    name: "Cassper Nyovest",
    genre: "Hip-Hop",
    image: cassper,
    status: "Arena Energy",
    bio: "The original Fill Up architect, Cassper Nyovest has sold out FNB, Orlando and Royal Bafokeng stadiums and remains one of SA’s defining live performers.",
    highlights: [
      "First SA hip-hop artist to fill FNB Stadium.",
      "Multiple platinum albums and SAMA wins.",
      "Genre-crossing collaborations from Amapiano to Afro-house.",
    ],
  },
];

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
              A living roster of amapiano, hip-hop, house and culture-shaping performers. Tap any artist to read their
              profile.
            </p>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ARTISTS.map((artist, index) => (
            <FadeIn key={artist.name} delay={(index % 4) * 0.05}>
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    aria-label={`Read more about ${artist.name}`}
                    className="group relative block aspect-[3/4] w-full overflow-hidden rounded-3xl border border-white/15 bg-white/[0.05] text-left shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
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
                        <span>Read more</span>
                      </div>
                    </div>
                  </button>
                </DialogTrigger>

                <DialogContent className="max-w-lg overflow-hidden rounded-3xl border border-white/15 bg-black/90 p-0 text-white backdrop-blur-xl">
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <img src={artist.image} alt={artist.name} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-[10px] uppercase tracking-[0.32em] text-gold">{artist.genre}</p>
                      <h3 className="mt-1 font-display text-3xl font-bold leading-none text-white">{artist.name}</h3>
                    </div>
                  </div>

                  <div className="space-y-5 p-6">
                    <p className="text-sm leading-relaxed text-white/75">{artist.bio}</p>

                    <div>
                      <p className="text-[10px] uppercase tracking-[0.32em] text-gold">Highlights</p>
                      <ul className="mt-3 space-y-2">
                        {artist.highlights.map((point) => (
                          <li key={point} className="flex gap-3 text-sm leading-relaxed text-white/75">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-gold" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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
