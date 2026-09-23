# Hide Ticket Sales Elements

## Goal
Temporarily hide every ticket-sales element without deleting ticket content, while leaving editorial references in News, FAQs, legal pages, and subscription copy unchanged.

## Changes
1. Add a single site-wide ticket-sales visibility flag so this campaign can be restored cleanly later.
2. Hide the full Tickets page from public viewing and remove it from the sitemap.
3. Remove the Tickets item from desktop and mobile navigation.
4. Remove the homepage ticket tier section and its ticket modal trigger.
5. Disable the Field Tickets popup and the sticky ticket/Park + Ride sales banner.
6. Remove the ticket artwork and external Tickets link from the footer.
7. Keep Hospitality, Park & Ride information, event-entry guidance, News articles, FAQs, legal/privacy wording, and subscription messaging unchanged.
8. Ensure collapsed desktop and mobile menus show only the merch purchase action, rather than alternating with Buy Tickets.
9. Verify desktop and mobile views contain no ticket-sales navigation, cards, banners, popups, or purchase links, and confirm direct access to `/tickets` is unavailable.

## Technical notes
- Use the existing visibility system for the Tickets page and homepage ticket section where appropriate.
- Keep the ticket files and content in place; only suppress their public rendering and discovery.
- Avoid changing unrelated event information or historical/editorial copy.
