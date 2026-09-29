import { createFileRoute } from "@tanstack/react-router";

import { GalleryStrip } from "@/components/site/EventGallery";
import { FadeIn, Section } from "@/components/site/Section";
import { PageGate, VisibilityGate } from "@/components/site/visibility";
import { GALLERY_YEARS, photosByYear } from "@/config/gallery";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Scorpion Kings Live" },
      { name: "description", content: "Scenes from Scorpion Kings Live — the crowd, performances and culture inside the stadium, from 2025 to 2026." },
      { property: "og:title", content: "Gallery | Scorpion Kings Live" },
      { property: "og:description", content: "Scenes from Scorpion Kings Live — the crowd, performances and culture inside the stadium, from 2025 to 2026." },
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
                <p className="max-w-md text-sm leading-relaxed text-white/65 md:text-base">The people, energy and moments that make Scorpion Kings Live — every edition, year by year.</p>
              </div>
            </FadeIn>
            {GALLERY_YEARS.map((year) => {
              const photos = photosByYear(year);
              if (photos.length === 0) return null;
              return (
                <FadeIn key={year} className="mt-12 md:mt-16" bubble={false}>
                  <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3 border-b border-white/10 pb-4">
                    <h2 className="font-display text-3xl font-bold text-white md:text-5xl">{year}.</h2>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-gold sm:text-xs">
                      {photos.length} {photos.length === 1 ? "photo" : "photos"} · Scorpion Kings Live {year}
                    </p>
                  </div>
                  <GalleryStrip photos={photos} />
                </FadeIn>

              );
            })}
          </Section>
        </VisibilityGate>
      </main>
    </PageGate>
  );
}
