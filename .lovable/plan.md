# Sponsor logos: placement plan

Five sponsor logos supplied (Galxboy, McCafé, RocoMamas, Sprite, Standard Bank). Four of the five are white-on-transparent artwork, so they read best on dark backgrounds.

## Recommended placement (two spots, one source of truth)

1. **Home page — "Proudly partnered by" logo strip**
   - Placed after the Hospitality/Merch block and before the footer, using the already-registered `section:home.partners` toggle (currently unused).
   - Dark band, small gold eyebrow label, logos in a single responsive row (5-up desktop, 3-up tablet, horizontal scroll/marquee on mobile), each greyscale-to-full on hover, uniform max-height so sizes look balanced.
   - Whole strip links through to `/partners`.

2. **Partners page — "Our partners" grid above the tier packages**
   - New confirmed-partners section at the top of `/partners`, same glass card treatment used elsewhere, one card per sponsor with the logo centred.
   - This turns the page from "packages available" into "partners confirmed + packages available", which is the stronger sales story for remaining tiers.

Not recommended: footer (too small, logos become unreadable) or the hero (competes with the ticket CTA).

## Technical notes

- Upload the five PNGs as CDN asset pointers under `src/assets/sponsors/*.png.asset.json`; no binaries committed.
- Single shared `SPONSORS` array (name, logo, optional URL, alt text) consumed by both the home strip and the partners grid.
- Sprite's logo is a coloured lemon mark and RocoMamas is orange/black — both sit on a light chip inside the dark band so nothing disappears; the white-only marks stay on dark.
- New visibility key `section:partners.confirmed` added to the registry so the grid can be toggled from the admin page; home strip reuses `section:home.partners`.
- Lazy-loaded images, fixed aspect boxes to avoid layout shift.

## Open item

Sponsor click-through URLs are not supplied — logos will render unlinked until you provide them.
