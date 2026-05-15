import { createFileRoute } from "@tanstack/react-router";
import { FadeIn, PageHero, Section } from "@/components/site/Section";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News — Scorpion Kings Live" },
      { name: "description", content: "Announcements, press, sponsor updates and artist reveals from Scorpion Kings Live." },
      { property: "og:title", content: "News — Scorpion Kings Live" },
      { property: "og:description", content: "Latest from the Kings — straight from the source." },
    ],
  }),
  component: NewsPage,
});

const POSTS = [
  { tag: "Announcement", title: "Scorpion Kings Live returns to FNB Stadium", date: "Coming soon" },
  { tag: "Lineup", title: "First wave of headliners revealed", date: "Coming soon" },
  { tag: "Partners", title: "Official partner reveals — round one", date: "Coming soon" },
];

function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News"
        title="From the Kings."
        description="Announcements, press, sponsor updates and artist reveals — direct from the team."
      />

      <Section className="!pt-0">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.06}>
              <article className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-transform hover:-translate-y-1 md:p-7">
                <div className="aspect-[16/9] w-full rounded-lg border border-dashed border-border/70 bg-muted/40" aria-hidden />
                <p className="mt-5 text-[10px] uppercase tracking-[0.4em] text-primary">{p.tag}</p>
                <h2 className="mt-2 font-display text-xl font-bold leading-tight md:text-2xl">{p.title}</h2>
                <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">{p.date}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
}
