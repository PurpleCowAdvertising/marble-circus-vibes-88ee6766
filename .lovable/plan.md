# Pre-Show Line-Up press release on the News page

Add the new announcement as the **top (latest) post** on `/news`, with the poster artwork included.

## Layout

The existing news posts are text-only glass cards. This one becomes a slightly richer "featured" version of the same card so it still feels native:

```text
┌──────────────────────────────────────────────────────────┐
│ [PRE-SHOW LINE-UP]  01 SEP 2026 · 09H00                  │
│                                                          │
│  Scorpion Kings Live announces a vibrant pre-show lineup │
│  ── standfirst / excerpt ──                              │
│                                                          │
│  ┌────────────┐   Johannesburg, South Africa — The       │
│  │            │   countdown continues…                   │
│  │  POSTER    │                                          │
│  │  (tap to   │   Amapiano · hip-hop · house · Bacardi   │
│  │   enlarge) │   · Maskandi                             │
│  └────────────┘   … remaining paragraphs …               │
│                                                          │
│  Doors open 12:00 · 19 Sep 2026 · FNB Stadium            │
│  [ BUY TICKETS ]   [ VIEW FULL LINE-UP POSTER ]          │
└──────────────────────────────────────────────────────────┘
```

- Desktop: poster on the left column (~38% width), text flowing on the right. Mobile: poster full-width above the text.
- Poster is clickable — opens a full-screen lightbox on the dark glass background used elsewhere on the site.
- Line-up names pulled out as a small gold-accented block (Amapiano / Hip-Hop / Bacardi / Maskandi groupings) so the roster is scannable rather than buried in a paragraph.
- Small highlight strip for the Standard Bank cardholder offer (10% debit / 20% credit) so it reads as an offer, not body copy.
- Primary CTA: Buy on Webtickets (existing URL). Secondary: view poster.
- Press contact stays in the existing "Press queries" block at the bottom (Kim Sineke details are already there).

## Content

Full press release text is used verbatim, split into paragraphs, with the headline as the post title and the opening line as the excerpt.

## Optional extras (say if you want these)

- Also surface the poster + "Pre-show line-up announced" teaser on the home page news/announcement strip.
- Add the pre-show line-up to the Line-Up page (currently hidden from the menu).

## Technical notes

- Poster uploaded to CDN via Lovable Assets; imported as a pointer JSON, not committed as a binary.
- `POSTS` array in `src/routes/news.tsx` gains optional `image`, `groups`, and `highlight` fields; the card renderer handles them conditionally so existing posts are unchanged.
- New post gets `datePublished` so it joins the existing NewsArticle JSON-LD list, plus an `image` field in the structured data for richer Google results.
- Lightbox implemented with the existing modal/dialog styling used by the Park & Ride and merch modals.
