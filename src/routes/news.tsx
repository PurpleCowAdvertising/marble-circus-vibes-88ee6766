import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useState } from "react";

import { FadeIn, PageHero, Section } from "@/components/site/Section";
import { PageGate, VisibilityGate } from "@/components/site/visibility";
import posterAsset from "@/assets/preshow-lineup-poster.png.asset.json";

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
  groups?: { label: string; names: string }[];
  highlight?: { title: string; body: string };
  footnote?: string;
};

const POSTS: Post[] = [
  {
    tag: "Pre-show line-up",
    date: "01 September 2026 · 09h00",
    datePublished: "2026-09-01T09:00:00+02:00",
    title: "Scorpion Kings Live announces a vibrant pre-show line-up.",
    excerpt:
      "The countdown to Scorpion Kings Live continues with an explosive pre-show line-up set to get fans moving long before the Scorpion Kings take to the stage on 19 September 2026.",
    image: posterAsset.url,
    imageAlt: "Scorpion Kings Live pre-show line-up poster — 19 September 2026, FNB Stadium, doors open 12:00",
    body: [
      "Johannesburg, South Africa — Bringing together some of the biggest names across Amapiano, hip-hop, house, Bacardi and Maskandi, the pre-show promises to turn the day into a full-scale celebration of South African music and culture.",
      "The pre-show will also celebrate the richness and diversity of South African music, designed to get the party started early and set the tone for a day dedicated to the sounds, artists and cultures that continue to shape South Africa’s musical landscape.",
      "Scorpion Kings Live have already made history following unprecedented ticket demand. The addition of the pre-show line-up further expands the experience, giving fans even more reason to arrive early and make a full day of it.",
      "On 19 September 2026, the celebrations start early. Doors open at 12:00 for a full day of music.",
      "Be sure to follow @scorpionkingslive for all updates and more announcements, and check scorpionkings.live for hospitality suite tickets and all things Scorpion Kings Live.",
    ],
    groups: [
      {
        label: "Amapiano & house",
        names:
          "Dlala Thukzin · Mdu aka TRP · Jnr SA · Dark Horse · Sam Deep · Stixx · DJ’s @ Work · Banques · Venom · Natiey Lepaka · Shandesh · Wendy Moon · Ba Bethe Gashoazen",
      },
      { label: "Hip-hop", names: "A-Reece" },
      { label: "Bacardi showcase", names: "Big Baller CEO · Sia The Bee · Zela Force" },
      {
        label: "Maskandi showcase",
        names: "Mnotho · Mjabulisi · Mjolisi · Shenge Wasehlalankosi · Jikijiki",
      },
    ],
    highlight: {
      title: "Standard Bank cardholder offer",
      body: "Limited Scorpion Kings Live tickets are available exclusively to Standard Bank cardholders via Webtickets — 10% off for debit cardholders and 20% off for credit cardholders. Tickets are limited, so secure yours while they last.",
    },
    footnote: "Doors open 12:00 · 19 September 2026 · FNB Stadium, Johannesburg",
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

function NewsPage() {
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
        </VisibilityGate>

        <VisibilityGate keyName="section:news.press">
          <FadeIn delay={0.3}>
            <div className="mt-10 rounded-3xl border border-white/15 bg-white/[0.06] p-6 text-sm text-white/65 backdrop-blur-xl md:p-8">
              <p className="font-bold uppercase tracking-widest text-white">Press queries</p>

              <p className="mt-2">
                Kim Sineke ·{" "}
                <a href="mailto:kim@iam4.co.za" className="text-gold hover:underline">
                  kim@iam4.co.za
                </a>
              </p>

              <p className="mt-3">
                <a href="mailto:press@scorpionkings.live" className="text-gold hover:underline">
                  press@scorpionkings.live
                </a>
              </p>
            </div>
          </FadeIn>
        </VisibilityGate>
      </Section>
    </PageGate>
  );
}
