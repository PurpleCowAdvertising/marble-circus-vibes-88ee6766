# Sony Music SA — Festival Website Plan

## Goal
Design and build an 8-page festival/event site with a working subscribe popup, inspired by the bold, immersive aesthetic of Luxurious Marble Fest and Ultra South Africa. Sony Music handles hosting and domain — we deliver design + build only.

## Visual direction (until CI lands)
Bold editorial-meets-rave aesthetic:
- Deep dark base (near-black) with a single saturated accent (electric coral / hot magenta) and a subtle marble/grain texture layer
- Oversized display type (Syne or Bebas Neue style) paired with a clean grotesk for body
- Generous negative space, asymmetric hero, parallax/scroll-driven motion via framer-motion
- Sticky top nav with bold hover states; full-bleed imagery; ticker/marquee bands between sections

Once you upload the CI, I'll swap colors, fonts and logo to match — design tokens are centralized so this is a clean swap, not a rebuild.

## Pages & content structure

1. **Home (`/`)** — Hero with event name + date/location + CTA, marquee artist strip, "About in 30 seconds" teaser, featured sponsors row, latest music preview, newsletter CTA
2. **Sponsors (`/sponsors`)** — Tiered sponsor grid (Headline / Major / Supporting), each with logo + blurb, partnership inquiry CTA
3. **FAQs (`/faqs`)** — Categorized accordion (Tickets, Venue, Travel, Policies)
4. **About (`/about`)** — Story, mission, team, past editions gallery
5. **Music (`/music`)** — Artist lineup grid (cards with image, name, genre), artist detail modal, embedded Spotify/YouTube previews
6. **Contact Us (`/contact`)** — Form (name, email, subject, message) writing to Cloud DB + general/press/sponsorship contact blocks
7. **Privacy Policy (`/privacy`)** — Long-form legal template with placeholder copy for legal team to refine
8. **Terms of Use (`/terms`)** — Same treatment as Privacy

Shared: header (logo + nav + CTA), footer (socials, quick links, Sony Music attribution), subscribe popup.

## Subscribe popup (Lovable Cloud)
- Auto-triggers after ~15s on first visit OR on exit-intent (whichever first), dismissible, remembers dismissal in localStorage
- Manual trigger from header CTA + footer
- Fields: email (required), name (optional), marketing consent checkbox
- Zod validation client-side
- Submits to a Cloud database table `subscribers` (email, name, consent, source, created_at) with RLS allowing public insert only
- Success state with confirmation message; duplicate emails handled gracefully
- Designed so Sony's international team can later swap the insert call for their integration endpoint without touching UI

## Contact form
Same Cloud pattern — `contact_messages` table, public insert only, admin read later.

## Tech notes
- TanStack Start file-based routing: one route file per page under `src/routes/`
- Each route gets its own SEO `head()` (title, description, og tags)
- Design tokens in `src/styles.css` (oklch); shadcn components themed via tokens — no hardcoded colors
- framer-motion for hero animations, scroll reveals, marquee
- Lovable Cloud enabled for the two tables above
- Mobile-first responsive across all pages

## What I need from you
- **CI document** (logo, brand colors, fonts) — upload anytime; I'll start with the inspired direction and swap in
- **Event name + dates + location** — placeholder used until provided
- **Artist lineup, sponsor logos, real copy** — placeholders used; easy to swap

## Out of scope (this pass)
- Hosting/domain setup (Sony Music handles)
- Ticketing integration
- International audience-DB integration (UI shell ready for handoff)
- Real legal copy (placeholders only)

## Suggested order of build
1. Enable Lovable Cloud + create `subscribers` and `contact_messages` tables
2. Design tokens + shared layout (header, footer, subscribe popup)
3. Home page (sets the visual bar)
4. About, Music, Sponsors
5. Contact (with working form)
6. FAQs, Privacy, Terms
7. SEO + responsive polish pass