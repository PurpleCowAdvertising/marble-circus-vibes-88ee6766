import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ImagePlus, Loader2, Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import {
  createSocialPost,
  deleteSocialPost,
  listSocialPosts,
  updateSocialPost,
  uploadSocialThumbnail,
  type SocialPost,
} from "@/lib/social.functions";

type Platform = SocialPost["platform"];

type Draft = {
  platform: Platform;
  post_url: string;
  thumbnail_url: string;
  caption: string;
  is_video: boolean;
  sort_order: string;
  published: boolean;
};

const EMPTY_DRAFT: Draft = {
  platform: "instagram",
  post_url: "",
  thumbnail_url: "",
  caption: "",
  is_video: false,
  sort_order: "0",
  published: true,
};

const platforms: Platform[] = ["instagram", "facebook", "youtube", "tiktok"];

function postToDraft(post: SocialPost): Draft {
  return {
    platform: post.platform,
    post_url: post.post_url,
    thumbnail_url: post.thumbnail_url ?? "",
    caption: post.caption ?? "",
    is_video: post.is_video,
    sort_order: String(post.sort_order),
    published: post.published,
  };
}

export function SocialAdminPanel() {
  const queryClient = useQueryClient();
  const listFn = useServerFn(listSocialPosts);
  const createFn = useServerFn(createSocialPost);
  const updateFn = useServerFn(updateSocialPost);
  const deleteFn = useServerFn(deleteSocialPost);
  const uploadFn = useServerFn(uploadSocialThumbnail);
  const [newPost, setNewPost] = useState<Draft>(EMPTY_DRAFT);
  const [editing, setEditing] = useState<Record<string, Draft>>({});

  const postsQuery = useQuery({
    queryKey: ["admin-social-posts"],
    queryFn: () => listFn(),
    staleTime: 5_000,
  });

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-social-posts"] });
    queryClient.invalidateQueries({ queryKey: ["public-social-posts"] });
  };

  const createMutation = useMutation({
    mutationFn: () => createFn({ data: toPayload(newPost) }),
    onSuccess: () => {
      setNewPost(EMPTY_DRAFT);
      refresh();
      toast.success("Social post added.");
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Could not add social post."),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, draft }: { id: string; draft: Draft }) => updateFn({ data: { id, updates: toPayload(draft) } }),
    onSuccess: () => {
      refresh();
      toast.success("Social post updated.");
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Could not update social post."),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { id } }),
    onSuccess: () => {
      refresh();
      toast.success("Social post removed.");
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Could not remove social post."),
  });

  async function upload(file: File, setDraft: (draft: Draft) => void, draft: Draft) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadFn({ data: formData });
      setDraft({ ...draft, thumbnail_url: result.thumbnail_url });
      toast.success("Thumbnail uploaded.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not upload thumbnail.");
    }
  }

  const posts = postsQuery.data ?? [];

  return (
    <section className="mx-auto max-w-[1400px] px-4 pb-8 sm:px-6">
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-gold">Homepage social feed</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-white">Manage curated posts.</h2>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-white/50">Published posts appear in the homepage feed. Use a direct post URL and either a hosted thumbnail URL or an uploaded image.</p>
        </div>

        <div className="mt-6 grid gap-3 rounded-xl border border-gold/20 bg-gold/[0.04] p-4 md:grid-cols-2 lg:grid-cols-4">
          <PostFields draft={newPost} setDraft={setNewPost} onUpload={(file) => upload(file, setNewPost, newPost)} />
          <div className="flex items-end">
            <button type="button" onClick={() => createMutation.mutate()} disabled={createMutation.isPending || !newPost.post_url} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-black transition hover:brightness-110 disabled:opacity-40">
              {createMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
              Add post
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {postsQuery.isLoading && <p className="text-sm text-white/50">Loading social posts…</p>}
          {!postsQuery.isLoading && posts.length === 0 && <p className="text-sm text-white/50">No curated posts yet.</p>}
          {posts.map((post) => {
            const draft = editing[post.id] ?? postToDraft(post);
            return (
              <div key={post.id} className="grid gap-3 rounded-xl border border-white/10 bg-black/30 p-4 md:grid-cols-[120px_1fr_auto] md:items-center">
                <div className="aspect-square overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
                  {post.thumbnail_url ? <img src={post.thumbnail_url} alt="" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-white/30"><ImagePlus size={22} /></div>}
                </div>
                <PostFields draft={draft} setDraft={(next) => setEditing((current) => ({ ...current, [post.id]: next }))} onUpload={(file) => upload(file, (next) => setEditing((current) => ({ ...current, [post.id]: next })), draft)} />
                <div className="flex gap-2 md:flex-col">
                  <button type="button" onClick={() => updateMutation.mutate({ id: post.id, draft })} disabled={updateMutation.isPending} className="inline-flex items-center justify-center gap-2 rounded-full bg-white/[0.08] px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/[0.14] disabled:opacity-40" title="Save post"><Save size={14} /> <span className="md:hidden">Save</span></button>
                  <button type="button" onClick={() => deleteMutation.mutate(post.id)} disabled={deleteMutation.isPending} className="inline-flex items-center justify-center gap-2 rounded-full bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-200 transition hover:bg-red-500/20 disabled:opacity-40" title="Delete post"><Trash2 size={14} /> <span className="md:hidden">Delete</span></button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PostFields({ draft, setDraft, onUpload }: { draft: Draft; setDraft: (draft: Draft) => void; onUpload: (file: File) => void }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:col-span-3">
      <select value={draft.platform} onChange={(event) => setDraft({ ...draft, platform: event.target.value as Platform })} className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs text-white focus:border-gold focus:outline-none" aria-label="Social platform">
        {platforms.map((platform) => <option key={platform} value={platform}>{platform}</option>)}
      </select>
      <input value={draft.sort_order} onChange={(event) => setDraft({ ...draft, sort_order: event.target.value })} type="number" placeholder="Order" className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs text-white placeholder:text-white/30 focus:border-gold focus:outline-none" aria-label="Display order" />
      <input value={draft.post_url} onChange={(event) => setDraft({ ...draft, post_url: event.target.value })} type="url" placeholder="Post URL" className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs text-white placeholder:text-white/30 focus:border-gold focus:outline-none sm:col-span-2" aria-label="Post URL" />
      <input value={draft.thumbnail_url} onChange={(event) => setDraft({ ...draft, thumbnail_url: event.target.value })} type="text" placeholder="Thumbnail URL or upload below" className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs text-white placeholder:text-white/30 focus:border-gold focus:outline-none sm:col-span-2" aria-label="Thumbnail URL" />
      <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs text-white/70 transition hover:border-gold/50 hover:text-white">
        <ImagePlus size={14} /> Upload thumbnail
        <input type="file" accept="image/*" className="sr-only" onChange={(event) => { const file = event.target.files?.[0]; if (file) onUpload(file); event.currentTarget.value = ""; }} />
      </label>
      <input value={draft.caption} onChange={(event) => setDraft({ ...draft, caption: event.target.value })} type="text" placeholder="Caption (optional)" className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs text-white placeholder:text-white/30 focus:border-gold focus:outline-none sm:col-span-2" aria-label="Caption" />
      <label className="inline-flex items-center gap-2 text-xs text-white/65"><input type="checkbox" checked={draft.is_video} onChange={(event) => setDraft({ ...draft, is_video: event.target.checked })} className="accent-gold" /> Video</label>
      <label className="inline-flex items-center gap-2 text-xs text-white/65"><input type="checkbox" checked={draft.published} onChange={(event) => setDraft({ ...draft, published: event.target.checked })} className="accent-gold" /> Published</label>
    </div>
  );
}

function toPayload(draft: Draft) {
  return {
    platform: draft.platform,
    post_url: draft.post_url,
    thumbnail_url: draft.thumbnail_url || null,
    caption: draft.caption || null,
    is_video: draft.is_video,
    sort_order: Number(draft.sort_order) || 0,
    published: draft.published,
  };
}
