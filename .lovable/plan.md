# Park + Ride info: where it lives and how it looks

The seven posters carry critical travel info (times, pickup points, pricing, rules). They shouldn't be dumped on the homepage — that would clutter it. Recommendation: one clean home for the full detail, with short, obvious doorways to it from the places fans already look.

## Recommended placement

**1. A dedicated "Park + Ride" block on the FAQs page (the home for the detail)**

Add a new section at the top of `/faqs`, above the question categories:

- A short intro line: "Park + Ride is now available — skip the traffic and the parking stress."
- A horizontal, swipeable poster gallery of all 7 posters (thumbnails on desktop, swipe on mobile), each tappable to open full-screen so the text is readable.
- Underneath, the same info written out as text so it is readable, searchable and works on slow connections:
  - Important times (first bus 12:00, last departure 15:00, arrive 15 min early, return buses run after the show, final buses ~60 min after the concert ends)
  - How it works (4 steps)
  - Pick-up locations (11)
  - Pricing per pick-up (R225 / R275 / R285 / R325 tiers)
  - Important information (one ticket per person, children need their own, follow signage, parking managed by centre security, missed buses non-refundable)
- One gold "Book Park + Ride" button to Webtickets.

This keeps the posters as the visual, but the text version means nobody is stuck squinting at an image.

**2. Doorways into it (no new clutter)**

- Homepage Park + Ride card: add a small secondary link "Full Park + Ride info" that jumps to `/faqs#park-ride`. The card itself stays exactly as it is.
- The existing Park + Ride pop-up (location picker): add the same "Full info" link at the bottom.
- FAQs page: the existing "Travel & Parking" answers get a link through to the Park + Ride block.
- Top navigation stays unchanged — FAQs already sits there.

## Why not elsewhere

- A separate `/park-and-ride` page splits the travel info from the FAQs where fans already go, and adds another menu item.
- Posters on the homepage would push the tickets and merch sections far down and slow the page.

## Technical notes

- Upload the 7 posters via `lovable-assets create` into `src/assets/parkride/` as `.asset.json` pointers; reference by CDN URL (no binaries committed).
- New `src/components/site/ParkRideInfo.tsx`: poster carousel (existing embla `carousel` UI primitive) + lightbox dialog + text blocks in the existing dark-glass card style.
- Mounted in `src/routes/faqs.tsx` behind a new `VisibilityGate keyName="section:faqs.parkride"`, with `id="park-ride"` anchor; register the key in the visibility registry so it can be hidden from `/admin`.
- Homepage (`src/routes/index.tsx`) and `ParkRideModal.tsx` get the anchor link only — no layout change.
- Posters get descriptive `alt` text; images lazy-loaded.
