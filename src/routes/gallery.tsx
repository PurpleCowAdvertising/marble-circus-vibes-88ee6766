import { createFileRoute } from "@tanstack/react-router";

import { GalleryGrid } from "@/components/site/EventGallery";
import { FadeIn, Section } from "@/components/site/Section";
import { PageGate, VisibilityGate } from "@/components/site/visibility";
import { GALLERY_PHOTOS } from "@/config/gallery";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Scorpion Kings Live" },
      { name: "description", content: "Scenes from Scorpion Kings Live — the crowd, performances and culture inside the stadium." },
      { property: "og:title", content: "Gallery | Scorpion Kings Live" },
      { property: "og:description", content: "Scenes from Scorpion Kings Live — the crowd, performances and culture inside the stadium." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <PageGate keyName="page:gallery">
      <main className="min-h-screen bg-black pb-16 pt-28 text-white sm:pt-32 md:pb-24 md:pt-40">
        <VisibilityGate keyName="section:gallery.photos">
          <Section className="!py-0">
            <FadeIn>
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold sm:text-xs">Inside the moment</p>
              <div className="mt-3 flex flex-wrap items-end justify-between gap-5">
                <h1 className="font-display text-5xl font-bold md:text-8xl">Gallery.</h1>
                <p className="max-w-md text-sm leading-relaxed text-white/65 md:text-base">The people, energy and moments that make Scorpion Kings Live.</p>
              </div>
            </FadeIn>
            <FadeIn className="mt-10 md:mt-16" bubble={false}>
              <GalleryGrid photos={GALLERY_PHOTOS} />
            </FadeIn>
          </Section>
        </VisibilityGate>
      </main>
    </PageGate>
  );
}