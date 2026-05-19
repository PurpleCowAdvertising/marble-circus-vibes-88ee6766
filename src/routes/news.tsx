import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { FadeIn, PageHero, Section } from "@/components/site/Section";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News — Scorpion Kings Live" },
      { name: "description", content: "Announcements, press releases and updates from Scorpion Kings Live at FNB Stadium, 19 September 2028." },
      { property: "og:title", content: "News — Scorpion Kings Live" },
      { property: "og:description", content: "Latest from the Kings — straight from the source." },
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
      "The highly anticipated return of Scorpion Kings Live is gearing up to deliver the biggest Amapiano celebration the world has ever seen — tickets are officially live.",
    body: [
      "Following a historic 2025 edition, this year's show moves to Johannesburg's iconic FNB Stadium, with over 80 000 fans expected to be part of the moment.",
      "Tickets are now on sale starting from just R400 per person, available via Webtickets, Pick n Pay and Boxer stores nationwide — making it easier than ever for fans to secure their place.",
      "In an exciting move to welcome a new generation, this year's event is open to ages 14 and up, creating an opportunity for younger audiences to be part of history by experiencing the energy, culture and community of Amapiano on a global stage.",
      "Curated by Amapiano pioneers DJ Maphorisa and Kabza De Small, Scorpion Kings Live has become a defining cultural experience, known for its world-class production, electrifying performances and unforgettable atmosphere. This year's edition is set to raise the bar even higher.",
      "While tickets are now live, this is only the beginning — more exciting announcements, including lineup reveals and special moments, are still to come.",
      "Be part of history and get your tickets now.",
    ],
    href: "https://www.webtickets.co.za",
    hrefLabel: "Buy on Webtickets",
  },
  {
    tag: "Announcement",
    date: "Pre-launch",
    title: "Tickets to Scorpion Kings Live at FNB Stadium available from 05 May 2026.",
    excerpt:
      "Scorpion Kings Live at FNB Stadium is officially loading — bigger, and set to redefine the scale of live Amapiano experiences in South Africa and beyond.",
    body: [
      "On 19 September 2028, Johannesburg's iconic FNB Stadium will play host to what is set to become the largest Amapiano celebration the world has ever seen, with over 80 000 fans expected to come together.",
      "This year's Scorpion Kings Live at FNB Stadium is more than just a concert. It's a powerful reflection of the community that has built and carried Amapiano from local streets to global stages — connection, shared energy and a sound that continues to unite people across cities, countries and cultures.",
      "Fans can expect an electrifying showcase of the very best in Amapiano, with a dynamic lineup and a stadium-wide atmosphere that captures the spirit of the movement.",
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

      <Section className="!pt-0">
        <div className="space-y-8">
          {POSTS.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.08}>
              <article className="rounded-2xl border border-border bg-card p-6 md:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                    {p.tag}
                  </span>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">{p.date}</p>
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold leading-tight md:text-4xl">{p.title}</h2>
                <p className="mt-4 text-base text-foreground/80 md:text-lg">{p.excerpt}</p>
                <div className="mt-5 space-y-3 text-sm text-muted-foreground md:text-base">
                  {p.body.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
                {p.href && (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-background transition-transform hover:scale-105"
                  >
                    {p.hrefLabel} <ArrowUpRight size={14} />
                  </a>
                )}
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-10 rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground md:p-8">
            <p className="font-bold uppercase tracking-widest text-foreground">Press queries</p>
            <p className="mt-2">
              Kim Sineke ·{" "}
              <a href="mailto:kim@iam4.co.za" className="text-primary hover:underline">
                kim@iam4.co.za
              </a>{" "}
              ·{" "}
              <a href="tel:+27810421076" className="text-primary hover:underline">
                +27 81 042 1076
              </a>
            </p>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
