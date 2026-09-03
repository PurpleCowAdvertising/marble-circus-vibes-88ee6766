import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Play, Radio } from "lucide-react";
import { getPublicSocialPosts, type SocialPost } from "@/lib/social.functions";
import { FadeIn, Section } from "./Section";
import { Reveal, RevealGroup } from "./Reveal";

const PLATFORM_LABELS: Record<SocialPost["platform"], string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  youtube: "YouTube",
  tiktok: "TikTok",
};

const PLATFORM_COLORS: Record<SocialPost["platform"], string> = {
  instagram: "border-pink-300/20 bg-pink-300/10",
  facebook: "border-blue-300/20 bg-blue-300/10",
  youtube: "border-red-300/20 bg-red-300/10",
  tiktok: "border-cyan-200/20 bg-cyan-200/10",
};

export function SocialWall() {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["public-social-posts"],
    queryFn: () => getPublicSocialPosts(),
    staleTime: 5 * 60_000,
  });

  if (!isLoading && posts.length === 0) return null;

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
            <p className="max-w-sm text-sm leading-relaxed text-white/60">The latest moments, drops and announcements from Scorpion Kings Live.</p>
          </div>
        </FadeIn>

        {isLoading ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Loading social posts">
            {[0, 1, 2, 3].map((item) => <div key={item} className="aspect-[4/5] animate-pulse rounded-2xl border border-white/10 bg-white/[0.06]" />)}
          </div>
        ) : (
          <RevealGroup className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4">
            {posts.map((post, index) => <SocialCard key={post.id} post={post} index={index} />)}
          </RevealGroup>
        )}
      </Section>
    </div>
  );
}

function SocialCard({ post, index }: { post: SocialPost; index: number }) {
  return (
    <Reveal delay={index * 80} bubble className="group min-w-[78vw] snap-start sm:min-w-[calc(50vw-1.5rem)] md:min-w-0">
      <a href={post.post_url} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] transition-colors hover:border-gold/50">
        <div className="relative aspect-[4/5] overflow-hidden bg-black/30">
          {post.thumbnail_url ? <img src={post.thumbnail_url} alt={post.caption || `${PLATFORM_LABELS[post.platform]} post`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center text-white/25"><Radio size={40} strokeWidth={1} /></div>}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
          <div className="absolute left-3 top-3 flex items-center gap-2">
            <span className={`rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest ${PLATFORM_COLORS[post.platform]}`}>{PLATFORM_LABELS[post.platform]}</span>
            {post.is_video && <span className="rounded-full border border-white/20 bg-black/40 p-1.5 text-white"><Play size={11} fill="currentColor" /></span>}
          </div>
          <ExternalLink size={16} className="absolute right-3 top-3 text-white/70" />
          {post.caption && <p className="absolute bottom-4 left-4 right-4 line-clamp-3 text-sm leading-relaxed text-white">{post.caption}</p>}
        </div>
      </a>
    </Reveal>
  );
}
