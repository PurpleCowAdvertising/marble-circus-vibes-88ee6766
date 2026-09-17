import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Radio } from "lucide-react";
import { FadeIn, Section } from "./Section";
import { Reveal } from "./Reveal";
import { getPublicSocialPosts } from "@/lib/social.functions";

const FEATURED_VIDEO_ID = "809nBZ8Gch0";

export function SocialWall() {
  const getPosts = useServerFn(getPublicSocialPosts);
  const postsQuery = useQuery({
    queryKey: ["public-social-posts"],
    queryFn: () => getPosts(),
    staleTime: 60_000,
  });
  const posts = postsQuery.data ?? [];

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

        {posts.length > 0 && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {posts.slice(0, 8).map((post) => (
              <a
                key={post.id}
                href={post.post_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-lg border border-white/10 bg-white/[0.06] transition-transform duration-300 hover:-translate-y-1 hover:border-gold/40"
              >
                <div className="aspect-square overflow-hidden bg-white/[0.04]">
                  {post.thumbnail_url ? (
                    <img
                      src={post.thumbnail_url}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center font-display text-2xl font-bold uppercase text-white/25">
                      {post.platform}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold">{post.platform}</p>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/70">
                    {post.caption || `View on ${post.platform}`}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
