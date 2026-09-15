import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useState } from "react";

import { FadeIn, PageHero, Section } from "@/components/site/Section";
import { PageGate, VisibilityGate } from "@/components/site/visibility";
import posterAsset from "@/assets/preshow-lineup-poster.png.asset.json";
import mainShowPosterAsset from "@/assets/mainshow-lineup-poster.png.asset.json";
import hostBontleAsset from "@/assets/host-bontle-modiselle.jpg.asset.json";
import hostRobotBoiiAsset from "@/assets/host-robot-boii.jpg.asset.json";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Press Releases | Scorpion Kings Live" },
      {
        name: "description",
        content:
          "Official Scorpion Kings Live news and press releases: ticket announcements, lineup updates and event information for FNB Stadium, 19 September 2026.",
      },
      { property: "og:title", content: "News & Press Releases | Scorpion Kings Live" },
      {
        property: "og:description",
        content:
          "Official announcements, press releases and ticket updates from Scorpion Kings Live at FNB Stadium.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/news" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "News & Press Releases | Scorpion Kings Live" },
      {
        name: "twitter:description",
        content: "Official announcements, press releases and ticket updates from Scorpion Kings Live.",
      },
    ],
    links: [{ rel: "canonical", href: "/news" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Scorpion Kings Live news and press releases",
          itemListElement: POSTS.filter((p) => p.datePublished).map((post, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "NewsArticle",
              headline: post.title,
              description: post.excerpt,
              datePublished: post.datePublished,
              ...(post.image ? { image: post.image } : {}),
              articleSection: post.tag,
              inLanguage: "en-ZA",
              author: { "@type": "Organization", name: "Scorpion Kings Live" },
              publisher: { "@type": "Organization", name: "Scorpion Kings Live" },
              about: {
                "@type": "MusicEvent",
                name: "Scorpion Kings Live",
                startDate: "2026-09-19",
                location: {
                  "@type": "Place",
                  name: "FNB Stadium",
                  address: { "@type": "PostalAddress", addressLocality: "Johannesburg", addressCountry: "ZA" },
                },
              },
            },
          })),
        }),
      },
    ],
  }),
  component: NewsPage,
});

type Post = {
  tag: string;
  date: string;
  datePublished?: string;
  title: string;
  excerpt: string;
  body: string[];
  href?: string;
  hrefLabel?: string;
  image?: string;
  imageAlt?: string;
  secondImage?: string;
  secondImageAlt?: string;
  groups?: { label: string; names: string }[];
  highlight?: { title: string; body: string };
  footnote?: string;
};

const POSTS: Post[] = [
  {
    tag: "Hosts announced",
    date: "15 September 2026 · 09h00",
    datePublished: "2026-09-15T09:00:00+02:00",
    title:
      "SCORPION KINGS LIVE ANNOUNCE BONTLE MODISELLE AND ROBOT BOII AS HOSTS WITH BABA MTHETHWA ANNOUNCED AS CHIEF COMMENTATOR FOR HISTORIC FNB STADIUM SHOW",
    excerpt:
      "The trio will host and voice one of South Africa’s biggest live music moments as more than 70 000 fans prepare to experience the Scorpion Kings on 19 September.",
    image: hostBontleAsset.url,
    imageAlt: "Bontle Modiselle announced as host for Scorpion Kings Live at FNB Stadium, 19 September 2026",
    secondImage: hostRobotBoiiAsset.url,
    secondImageAlt: "Robot Boii announced as host for Scorpion Kings Live at FNB Stadium, 19 September 2026",
    body: [
      "The countdown to one of the biggest nights in South African entertainment continues, and Scorpion Kings Live at FNB Stadium has revealed the voices that will help take fans through this historic experience.",
      "Taking place on Saturday, 19 September 2026, the iconic show has announced Bontle Modiselle and Robot Boii as official hosts, alongside Baba Mthethwa as the official Chief Commentator for Scorpion Kings Live, bringing their energy, personality and undeniable connection to South African entertainment to the country’s biggest stages.",
      "Proudly supported by SABC 1, Sprite, RocoMamas, Castle Lite, VEEV, Gautrain, SAMPRA, GalxBoy, McCafé, Red Bull, the Gauteng Provincial Government, the Department of Sport, Arts and Culture and Cabs Car Hire — Scorpion Kings Live fans will enjoy food and refreshments, merchandise, safe transport options, entertainment and brand activations throughout the day which will now be hosted by these two dance favourites.",
      "Bontle Modiselle brings her dynamic presence as a performer, presenter and creative force. With a career deeply rooted in South African entertainment and popular culture, Bontle will bring her signature energy and stage presence to FNB Stadium, helping guide fans through the day and into the main event.",
      "Alongside her, Robot Boii will bring his infectious personality and unmistakable energy to the stage. Known for his ability to connect with audiences and his strong ties to contemporary South African music and culture, Robot Boii will help keep the stadium alive as the Scorpion Kings take fans on an unforgettable musical journey.",
      "Together, Bontle and Robot Boii will help shape the vibe of the day as hosts — connecting the audience to the experience, keeping the energy high and celebrating the significance of seeing DJ Maphorisa and Kabza De Small command a stadium of this scale.",
      "Adding his distinctive voice to the experience is veteran sports broadcaster Baba Mthethwa, one of South Africa’s most recognisable voices, as the official Chief Commentator. Mthethwa has built a reputation for his energetic, entertaining delivery and his ability to connect with audiences through language, humour and culture. The celebrated commentator has become a familiar voice in South African sport and entertainment, bringing his unmistakable personality and experience to the Scorpion Kings Live experience.",
      "Scorpion Kings Live represents a major moment for Amapiano and South African entertainment, showcasing how far the genre and the culture surrounding it have travelled. What began as a powerful South African movement has evolved into a global sound, and the FNB Stadium show is a celebration of that journey.",
      "On 19 September, more than 70 000 fans will gather at FNB Stadium as DJ Maphorisa and Kabza De Small — the Scorpion Kings — take their biggest stage yet, with Bontle Modiselle, Robot Boii and Baba Mthethwa leading the audience through an unforgettable day and night.",
      "Be sure to follow @scorpionkingslive across social media and visit www.scorpionkings.live for official event information and updates.",
    ],
    highlight: {
      title: "On the mic",
      body: "Bontle Modiselle — Official Host · Robot Boii — Official Host · Baba Mthethwa — Official Chief Commentator.",
    },
    footnote: "Doors open at 12:00 · 19 September 2026 · FNB Stadium, Johannesburg",
    href: "https://www.webtickets.co.za/v2/event.aspx?itemid=1594173143",
    hrefLabel: "Buy on Webtickets",
  },
  {
    tag: "Line-up announced",
    date: "03 September 2026 · 09h00",
    datePublished: "2026-09-03T09:00:00+02:00",
    title: "SCORPION KINGS LIVE UNVEILS MASSIVE LINEUP FOR HISTORIC SHOW AT FNB STADIUM",
    excerpt:
      "South Africa’s biggest Amapiano celebration brings together an extraordinary selection of music heavyweights, with an all-star lineup and powerhouse brand partners joining the experience.",
    image: mainShowPosterAsset.url,
    imageAlt:
      "Scorpion Kings Live main show line-up poster — 19 September 2026, FNB Stadium, doors open 12:00, artists A–Z",
    body: [
      "Johannesburg, South Africa — The wait is over. Scorpion Kings Live has officially unveiled its highly anticipated lineup, bringing together an extraordinary collection of South Africa’s biggest and most influential music names for what promises to be one of the country’s defining live music experiences of 2026.",
      "Taking place on 19 September 2026, Scorpion Kings Live will unite pioneers, innovators, chart-toppers and the next generation of South African music for an unmissable celebration of Amapiano, Afro-soul, hip-hop, house and contemporary African sounds.",
      "At the centre of the experience are the legendary Scorpion Kings — Kabza De Small and DJ Maphorisa — joined by a phenomenal lineup that reflects the breadth, evolution and influence of South African music.",
      "This year’s historic show will bring over 70 000 fans to FNB Stadium to witness Ami Faku, Amaroto, Aymos, Angekebabuye MC, Beekayrsa28, Blxckie, Bontle Smith, Busiswa, Busta 929, Daliwonga, DJ Maphorisa, Dladla Mshuniqisi, Focalistic, Kabelo Sings, Kabza De Small, Kamo Mphela, Kammu Dee, Key Tech, Khalil Harrison, Lady Du, Leehleza, LeeMckrazy, Madumane, Mark Khoza, MaWhoo, Mhaw Keys, Miano, Mkeyz, Mlindo The Vocalist, Mnqobi Yazo, Mr JazziQ, Msaki, Mthunzi, Nasty C, Nia Pearl, Njelic, Nkosazana Daughter, Nobuhle, Nokwazi, Pcee, Ricky Lenyora, Ringo Madlingozi, Scotts Maphuma, Semi Tee, Soweto’s Finest, Sykes, Thatohatsi, Toss, Tman Xpress, Tracy, Uncool MC, Vulela, Xduppy, Young Stunna, Zaba and Zawadi Yamungu on one stage!",
      "And the celebration starts early. Fans can arrive from 12h00 as the Scorpion Kings Live pre-show gets the party started, setting the tone for a full day of music, culture and entertainment.",
      "From the soulful sounds of Ami Faku, Msaki, Nobuhle, Nokwazi, Nkosazana Daughter and Mlindo The Vocalist, to the infectious Amapiano energy of Daliwonga, Young Stunna, Focalistic, Kamo Mphela, Toss, Tman Xpress, LeeMckrazy and MaWhoo, the lineup promises something for every generation of music lover.",
      "The event will also showcase the genre-crossing energy of Blxckie and Nasty C, the enduring influence of Ringo Madlingozi, and the unmistakable presence of artists such as Busiswa, Lady Du, Busta 929, Semi Tee, Njelic and many more.",
      "Scorpion Kings Live is not only bringing together an incredible collection of artists; it is also partnering with some of South Africa’s most recognisable and culturally relevant brands to create a complete live entertainment experience for fans.",
      "SABC1 joins Scorpion Kings Live as an Official Broadcast Partner, bringing together two brands deeply rooted in South African music, youth culture and entertainment. The partnership reflects a shared commitment to celebrating the sounds, stories and cultural movements that continue to shape Mzansi and influence the world.",
      "Fashion and culture brand GalxBoy comes on board as the Official Merch Distribution Partner, giving fans the opportunity to take a piece of the Scorpion Kings Live experience home with them.",
      "For fans making their way to and from the event, Gautrain joins as the Official Transport Partner, supporting convenient and accessible travel to and from the celebration.",
      "Sprite is the Official Refreshment Partner, keeping fans refreshed throughout the day, while Castle Lite joins as the Official Beer Partner, adding to the festival atmosphere.",
      "The experience will be further amplified through dedicated brand activations, with McCafé and RocoMamas coming on board as Official Activations Partners, bringing their unique energy and experiences directly to fans on the ground.",
      "Together, these partnerships reinforce the scale of Scorpion Kings Live and the experience that extends beyond the stage; bringing together music, fashion, culture, transport, food, refreshments and entertainment to the iconic sporting calabash — FNB Stadium.",
      "19 September 2026 will see an exceptional lineup and a powerful collection of partners for a historic Scorpion Kings Live at FNB Stadium.",
      "More than a concert — it will be a celebration of South African music, culture and the communities that continue to make the country one of the world’s most exciting musical forces.",
      "Watch the line up announcement and follow @scorpionkingslive on all social platforms for the latest updates.",
      "Limited ticketing options remain available on www.scorpionkings.live.",
    ],
    highlight: {
      title: "Official partners",
      body: "SABC1 — Official Broadcast Partner · GalxBoy — Official Merch Distribution Partner · Gautrain — Official Transport Partner · Sprite — Official Refreshment Partner · Castle Lite — Official Beer Partner · McCafé and RocoMamas — Official Activations Partners.",
    },
    footnote: "Doors open at 12:00 · 19 September 2026 · FNB Stadium, Johannesburg",
    href: "https://www.webtickets.co.za/v2/event.aspx?itemid=1594173143",
    hrefLabel: "Buy on Webtickets",
  },
  {
    tag: "Pre-show line-up",
    date: "01 September 2026 · 09h00",
    datePublished: "2026-09-01T09:00:00+02:00",
    title: "SCORPION KINGS LIVE ANNOUNCES A VIBRANT PRE-SHOW LINEUP",
    excerpt:
      "The countdown to Scorpion Kings Live continues with an exciting announcement of an explosive pre-show lineup set to get fans moving long before the Scorpion Kings take to the stage on 19 September 2026.",
    image: posterAsset.url,
    imageAlt: "Scorpion Kings Live pre-show line-up poster — 19 September 2026, FNB Stadium, doors open 12:00",
    body: [
      "Johannesburg, South Africa — The countdown to Scorpion Kings Live continues with an exciting announcement of an explosive pre-show lineup set to get fans moving long before the Scorpion Kings take to the stage on 19 September 2026.",
      "Bringing together some of the biggest names across Amapiano, hip-hop, house, Bacardi and Maskandi, the pre-show promises to turn the day into a full-scale celebration of South African music and culture.",
      "Fans can expect performances from A-Reece, Dlala Thukzin, Dark Horse, DJs @ Work, Venom, Banques, Sam Deep, Stixx, Mdu aka TRP, Jnr SA, Natiey Lepaka, Wendy Moon, Shandesh and Ba Bethe Gashoazen, alongside a special Bacardi showcase featuring Big Baller CEO, Black Boy, Sia The Bee and Zela Force.",
      "The pre-show will also celebrate the richness and diversity of South African music with a Maskandi showcase featuring Mnotho, Mjabulisi, Mjolisi, Shenge Wasehlalankosi and Jikjiki.",
      "Designed to get the party started early, the pre-show will set the tone for a day dedicated to the sounds, artists and cultures that continue to shape South Africa’s musical landscape.",
      "Scorpion Kings Live have already made history following unprecedented ticket demand, the addition of the pre-show lineup further expands the experience, giving fans even more reason to arrive early and make a full day of it.",
      "For Standard Bank customers, there’s still an opportunity to be part of the historic experience. Limited Scorpion Kings Live tickets are available exclusively to Standard Bank cardholders via Webtickets, with 10% off for Standard Bank debit cardholders and 20% off for Standard Bank credit cardholders.",
      "Tickets are limited and fans are encouraged to secure theirs while they are available.",
      "On 19 September 2026, the celebrations start early. Doors open at 12pm for a full day of music.",
      "Be sure to follow @scorpionkingslive on Instagram for all updates and more announcements.",
      "Check out www.scorpionkings.live for hospitality suite tickets and for all things Scorpion Kings Live.",
    ],
    highlight: {
      title: "Standard Bank cardholder offer",
      body: "For Standard Bank customers, there’s still an opportunity to be part of the historic experience. Limited Scorpion Kings Live tickets are available exclusively to Standard Bank cardholders via Webtickets, with 10% off for Standard Bank debit cardholders and 20% off for Standard Bank credit cardholders.",
    },
    footnote: "Doors open at 12pm · 19 September 2026 · FNB Stadium, Johannesburg",
    href: "https://www.webtickets.co.za/v2/event.aspx?itemid=1594173143",
    hrefLabel: "Buy on Webtickets",
  },
  {
    tag: "Tickets out now",
    date: "05 May 2026 · 10h00",
    datePublished: "2026-05-05T10:00:00+02:00",
    title: "Scorpion Kings Live at FNB Stadium tickets are now available.",
    excerpt:
      "The return of Scorpion Kings Live is gearing up to deliver a landmark Amapiano celebration, and tickets are officially live.",
    body: [
      "Scorpion Kings Live returns to Johannesburg’s iconic FNB Stadium on 19 September 2026, bringing fans together for a major celebration of Amapiano, performance and culture.",
      "Tickets start from R400 per person and are available via Webtickets, Pick n Pay and Boxer stores nationwide.",
      "The event is open to ages 14 and up, giving a new generation of fans the chance to experience the energy and community of Amapiano on a stadium stage.",
      "Curated by DJ Maphorisa and Kabza De Small, Scorpion Kings Live is built around world-class production, electrifying performances and the unmistakable sound that continues to move from South Africa to the world.",
      "More announcements, including lineup reveals and special moments, will follow.",
    ],
    href: "https://www.webtickets.co.za/v2/event.aspx?itemid=1594173143",
    hrefLabel: "Buy on Webtickets",
  },
  {
    tag: "Announcement",
    date: "Pre-launch",
    title: "Scorpion Kings Live at FNB Stadium is officially loading.",
    excerpt: "A stadium-scale Amapiano experience is on the way, built for the artists, the fans and the culture.",
    body: [
      "On 19 September 2026, FNB Stadium will host Scorpion Kings Live, a major live music moment shaped around the sound and movement of Amapiano.",
      "The show is more than a concert. It is a reflection of the community that has carried Amapiano from local streets to global stages through shared energy, connection and rhythm.",
      "Fans can expect a powerful live showcase, a dynamic lineup and a stadium atmosphere designed around the spirit of the movement.",
      "Tickets will be available via Webtickets, Pick n Pay and Boxer stores nationwide from 05 May 2026.",
      "Secure your ticket. Be part of history.",
    ],
    href: "https://youtu.be/Zqlt0SY8rx4",
    hrefLabel: "Watch the announcement",
  },
];

function PosterLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl md:p-10"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close poster"
        className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/10 p-2 text-white transition hover:bg-white/20 md:right-8 md:top-8"
      >
        <X size={18} />
      </button>

      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-full max-w-full rounded-2xl border border-white/15 object-contain shadow-2xl"
      />
    </div>
  );
}

function NewsPage() {
  const [poster, setPoster] = useState<{ src: string; alt: string } | null>(null);

  return (
    <PageGate keyName="page:news">
      <PageHero
        eyebrow="News"
        title="From the Kings."
        description="Announcements, press releases and updates direct from the team."
      />

      <Section className="bg-black text-white">
        <VisibilityGate keyName="section:news.header">
          <FadeIn>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Latest updates</p>

                <h2 className="mt-3 font-display text-4xl font-bold leading-none text-white md:text-6xl">
                  The official word.
                </h2>
              </div>

              <p className="max-w-md text-sm leading-relaxed text-white/65 md:text-base">
                Follow confirmed announcements, ticket updates, press notes and event information as the road to FNB
                Stadium unfolds.
              </p>
            </div>
          </FadeIn>
        </VisibilityGate>

        <VisibilityGate keyName="section:news.posts">
          <div className="mt-10 space-y-6">
            {POSTS.map((post, index) => (
              <FadeIn key={post.title} delay={index * 0.08}>
                <article className="overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-xl md:p-10">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
                      {post.tag}
                    </span>

                    {post.datePublished ? (
                      <time
                        dateTime={post.datePublished}
                        className="text-[10px] uppercase tracking-[0.4em] text-white/50"
                      >
                        {post.date}
                      </time>
                    ) : (
                      <p className="text-[10px] uppercase tracking-[0.4em] text-white/50">{post.date}</p>
                    )}
                  </div>

                  <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white md:text-5xl">
                    {post.title}
                  </h2>

                  <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/80 md:text-lg">{post.excerpt}</p>

                  <div className={post.image ? "mt-6 grid gap-6 md:grid-cols-[38%_1fr] md:gap-8" : "contents"}>
                    {post.image && (
                      <div className="space-y-5 md:self-start">
                        <button
                          type="button"
                          onClick={() => setPoster({ src: post.image!, alt: post.imageAlt ?? post.title })}
                          className="group block w-full overflow-hidden rounded-2xl border border-white/15 bg-black/40"
                          aria-label="View full line-up poster"
                        >
                          <img
                            src={post.image}
                            alt={post.imageAlt ?? post.title}
                            loading="lazy"
                            className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />

                          <span className="block bg-black/60 px-3 py-2 text-[10px] uppercase tracking-[0.3em] text-white/60">
                            Tap to enlarge
                          </span>
                        </button>

                        {post.secondImage && (
                          <button
                            type="button"
                            onClick={() =>
                              setPoster({ src: post.secondImage!, alt: post.secondImageAlt ?? post.title })
                            }
                            className="group block w-full overflow-hidden rounded-2xl border border-white/15 bg-black/40"
                            aria-label="View second poster"
                          >
                            <img
                              src={post.secondImage}
                              alt={post.secondImageAlt ?? post.title}
                              loading="lazy"
                              className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            />

                            <span className="block bg-black/60 px-3 py-2 text-[10px] uppercase tracking-[0.3em] text-white/60">
                              Tap to enlarge
                            </span>
                          </button>
                        )}

                        {post.highlight && (
                          <div className="rounded-2xl border border-white/15 bg-white/[0.05] p-5">
                            <p className="text-[11px] font-bold uppercase tracking-widest text-gold">
                              {post.highlight.title}
                            </p>

                            <p className="mt-2 text-sm leading-relaxed text-white/75">{post.highlight.body}</p>
                          </div>
                        )}

                        {post.footnote && (
                          <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">{post.footnote}</p>
                        )}

                        <div className="flex flex-wrap items-center gap-3">
                          {post.href && (
                            <a
                              href={post.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-black transition-transform hover:scale-105"
                            >
                              {post.hrefLabel} <ArrowUpRight size={14} />
                            </a>
                          )}

                          <button
                            type="button"
                            onClick={() => setPoster({ src: post.image!, alt: post.imageAlt ?? post.title })}
                            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white transition hover:bg-white/10"
                          >
                            {post.secondImage ? "View full poster" : "View full line-up poster"}
                          </button>
                        </div>
                      </div>
                    )}

                    <div className={post.image ? "" : "mt-6"}>
                      <div className="space-y-3 text-sm leading-relaxed text-white/60 md:text-base">
                        {post.body.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>

                      {post.groups && (
                        <dl className="mt-6 space-y-4 rounded-2xl border border-gold/25 bg-gold/[0.06] p-5">
                          {post.groups.map((group) => (
                            <div key={group.label}>
                              <dt className="text-[10px] uppercase tracking-[0.35em] text-gold">{group.label}</dt>

                              <dd className="mt-1.5 text-sm leading-relaxed text-white/80">{group.names}</dd>
                            </div>
                          ))}
                        </dl>
                      )}
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </VisibilityGate>

      </Section>

      {poster && <PosterLightbox src={poster.src} alt={poster.alt} onClose={() => setPoster(null)} />}
    </PageGate>
  );
}
