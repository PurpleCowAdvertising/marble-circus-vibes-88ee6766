import { createFileRoute } from "@tanstack/react-router";
import { Play } from "lucide-react";

import { FadeIn, PageHero, Section } from "@/components/site/Section";
import { Reveal, RevealGroup } from "@/components/site/Reveal";
import { PageGate } from "@/components/site/visibility";

export const Route = createFileRoute("/feed")({
  head: () => ({
    meta: [
      { title: "Feed | Scorpion Kings Live" },
      {
        name: "description",
        content:
          "Watch the latest Scorpion Kings Live moments, announcements and behind-the-scenes videos in one place.",
      },
      { property: "og:title", content: "Feed | Scorpion Kings Live" },
      {
        property: "og:description",
        content: "The latest Scorpion Kings Live videos and moments.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/feed" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Feed | Scorpion Kings Live" },
      {
        name: "twitter:description",
        content: "The latest Scorpion Kings Live videos and moments.",
      },
    ],
    links: [{ rel: "canonical", href: "/feed" }],
  }),
  component: FeedPage,
});

const VIDEOS = [
  {
    id: "809nBZ8Gch0",
    title: "Scorpion Kings Live announcement",
  },
  {
    id: "2N2P6FKmc08",
    title: "Scorpion Kings Live update",
  },
  {
    id: "Zqlt0SY8rx4",
    title: "Scorpion Kings Live moment",
  },
] as const;

function FeedPage() {
  return (
    <PageGate keyName="page:feed">
      <div className="relative isolate z-10 min-h-screen bg-black text-white">
        <PageHero
          eyebrow="Watch"
          title="The feed."
          description="The latest drops, announcements and behind-the-scenes moments from Scorpion Kings Live."
        />

        <Section className="!pt-6 md:!pt-8">
          <FadeIn>
            <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-gold">
              <Play size={12} /> Featured videos
            </p>
          </FadeIn>

          <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VIDEOS.map((video) => (
              <Reveal key={video.id} bubble>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-sm transition-transform duration-500 hover:-translate-y-1">
                  <div className="aspect-video w-full">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0&playsinline=1`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                      className="h-full w-full border-0"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </RevealGroup>
        </Section>
      </div>
    </PageGate>
  );
}
