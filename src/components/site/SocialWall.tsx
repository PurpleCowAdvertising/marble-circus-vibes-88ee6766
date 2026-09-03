import { Radio } from "lucide-react";
import { FadeIn, Section } from "./Section";
import { Reveal } from "./Reveal";

const FEATURED_VIDEO_ID = "809nBZ8Gch0";

export function SocialWall() {
  return (
    <div id="social" className="relative isolate z-30 bg-black text-white">
      <Section className="!py-10 md:!py-14">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-gold">
                <Radio size={12} /> Live from the Kings
              </p>
              <h2 className="mt-2 font-display text-4xl font-bold md:text-6xl">The feed.</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/60">
              The latest moments, drops and announcements from Scorpion Kings Live.
            </p>
          </div>
        </FadeIn>

        <Reveal bubble className="mt-8">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${FEATURED_VIDEO_ID}?rel=0&playsinline=1`}
                title="Scorpion Kings Live"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                className="h-full w-full border-0"
              />
            </div>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
