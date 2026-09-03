# Live social wall on the home page

A new "Live from the Kings" section sits below the Partners row and above the footer, showing curated posts from Instagram, Facebook, YouTube and TikTok in one branded grid — managed from the admin page.

## Layout and design language

Black section, same rhythm as the Partners row above it:

```text
 PROUDLY PARTNERED BY   [logo strip]
──────────────────────────────────────────────
 LIVE FEED                        Follow us ↗
 Straight from the timeline.
 [ All ][ Instagram ][ TikTok ][ YouTube ][ FB ]

 ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
 │ thumb  │ │ thumb  │ │ thumb  │ │ thumb  │
 │  ▶     │ │        │ │  ▶     │ │        │
 │ ⌾ IG   │ │ ⌾ TT   │ │ ⌾ YT   │ │ ⌾ FB   │
 └────────┘ └────────┘ └────────┘ └────────┘
              [ Follow @scorpionkingslive ]
```

- Gold eyebrow + display headline, matching the section headers used elsewhere.
- Cards use the existing glass treatment (`rounded-2xl`, white/10 border, backdrop blur, hover lift) — same as the tickets/merch cards, so it reads as native.
- Each card is a square/portrait thumbnail with a small platform badge, caption line, and a play glyph for video posts. Clicking opens the post in a lightbox (same dark glass modal as the news poster) with the platform's official embed, or opens the post in a new tab for platforms that block embedding.
- Mobile: horizontal snap-scroll carousel (like the partner strip) instead of a grid, so it stays light.
- Platform filter pills are optional and only render when there is more than one platform in the feed.
- Reveal animations reuse the existing `Reveal`/`FadeIn` components; images lazy-load and embeds only mount on click, so nothing slows first paint.
- Whole section wrapped in a `VisibilityGate` (`section:home.social`) so it can be hidden from admin like every other section.

## Content model (admin-managed)

New `social_posts` table in the backend holding: platform, post URL, thumbnail image, caption, whether it's a video, sort order, published flag.

A new "Social feed" panel in the existing admin page lets you:
- Paste a post URL and pick the platform
- Upload or paste a thumbnail image and a short caption
- Reorder, hide/show, and delete posts

Where the platform supports it (YouTube, TikTok), the thumbnail and caption are auto-filled from the public oEmbed endpoint when you paste the link, so most posts only need a URL. Instagram and Facebook don't allow that without app review, so those need a thumbnail uploaded — that's the one manual step.

The home page reads only published posts, ordered by sort order, and falls back to hiding the section entirely if there are none.

## Technical notes

- Migration creates `public.social_posts` with GRANTs, RLS: public `SELECT` for published rows only, writes restricted to admins via the existing role check. Thumbnails go to a public storage bucket.
- Reads via a server function/loader plus TanStack Query, following the existing visibility-function pattern; writes via admin-guarded server functions.
- New components: `src/components/site/SocialWall.tsx` (grid + carousel + lightbox) and an admin panel section inside `src/routes/admin.tsx`.
- Registry entry added to `src/lib/visibility-registry.ts` (`section:home.social`, sortOrder 95) so the toggle appears under Home.
- No third-party widget scripts, no API keys, no recurring cost.
