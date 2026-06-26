import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { FadeIn, PageHero, Section } from "@/components/site/Section";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News | Scorpion Kings Live" },
      {
        name: "description",
        content:
          "Announcements, press releases and updates from Scorpion Kings Live at FNB Stadium, 19 September 2026.",
      },
      { property: "og:title", content: "News | Scorpion Kings Live" },
      {
        property: "og:description",
        content: "Latest from the Kings, straight from the source.",
      },
    ],
  }),
  component: NewsPage,
});

type Post = {
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  body: string[];
  href?: string;
  hrefLabel?: string;
};

const POSTS: Post[] = [
  {
    tag: "Tickets out now",
    date: "05 May 2026 · 10h00",
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
    href: "https://www.webtickets.co.za",
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

function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News"
        title="From the Kings."
        description="Announcements, press releases and updates direct from the team."
      />

      <Section className="bg-black text-white">
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

        <div className="mt-10 space-y-6">
          {POSTS.map((post, index) => (
            <FadeIn key={post.title} delay={index * 0.08}>
              <article className="overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-xl md:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
                    {post.tag}
                  </span>

                  <p className="text-[10px] uppercase tracking-[0.4em] text-white/50">{post.date}</p>
                </div>

                <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white md:text-5xl">
                  {post.title}
                </h2>

                <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/80 md:text-lg">{post.excerpt}</p>

                <div className="mt-6 space-y-3 text-sm leading-relaxed text-white/60 md:text-base">
                  {post.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                {post.href && (
                  <a
                    href={post.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-black transition-transform hover:scale-105"
                  >
                    {post.hrefLabel} <ArrowUpRight size={14} />
                  </a>
                )}
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-10 rounded-3xl border border-white/15 bg-white/[0.06] p-6 text-sm text-white/65 backdrop-blur-xl md:p-8">
            <p className="font-bold uppercase tracking-widest text-white">Press queries</p>

            <p className="mt-2">
              Kim Sineke ·{" "}
              <a href="mailto:kim@iam4.co.za" className="text-gold hover:underline">
                kim@iam4.co.za
              </a>
            </p>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
