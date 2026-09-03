# Main-show line-up press release on /news

Add "SCORPION KINGS LIVE UNVEILS MASSIVE LINEUP FOR HISTORIC SHOW AT FNB STADIUM" as the new top post on the News page, using the same featured layout as the pre-show release.

## Layout

Reuses the existing featured card structure (no new components):

- Left column: the main-show line-up poster (tap to enlarge in the existing lightbox), a gold-accented highlight card for the brand partners, the "Doors open 12:00 · 19 Sep 2026 · FNB Stadium" footnote, and the CTA buttons (Buy on Webtickets + View full line-up poster).
- Right column: the full press release body, paragraph by paragraph, verbatim from the attached document.
- Mobile: poster stacks full-width above the text, as it already does.

## Content

- Tag: "Line-up announced" · dated 03 September 2026.
- Standfirst/excerpt: the document's subheading about the all-star lineup and brand partners.
- Body: all paragraphs verbatim, including the full A–Z artist list, the pre-show 12h00 note, and the partner section (SABC1, GalxBoy, Gautrain, Sprite, Castle Lite, McCafé, RocoMamas).
- Highlight card: "Official partners" summarising each partner and their role, so the roster is scannable instead of buried in prose.
- Closing lines about the announcement video and limited ticket availability stay in the body.
- The existing pre-show release stays in place, one slot down.

## Technical notes

- Poster (`SK®️_LIVE_2026_SPONSOR_MAIN-SHOW_FEED.png`) uploaded via Lovable Assets and imported as a pointer JSON; no binary committed.
- New entry prepended to the `POSTS` array in `src/routes/news.tsx` with `datePublished` and `image`, so it automatically joins the NewsArticle JSON-LD list.
- No changes to the card renderer, lightbox, or other posts.
