# Tighten Partners layout + sponsor logos beside the contact form

## Interpretation

"The form" is the contact form on `/contact` (the page currently open). The sponsor logo strip currently shown on Partners and Home gets reused there. If you meant a form on the Partners page instead, say so and I'll move it.

## Partners page — tighten layout

- Reduce the vertical gap between the "Proudly partnered by" strip and the "Partnership tiers" block so the two read as one connected section instead of two floating ones.
- Make the sponsor chips shorter (h-32 to a tighter height) and let the grid go 3 columns on small screens, 5 on desktop, so there is no wide empty band under the logos.
- Trim the empty space inside the package cards: drop the fixed 320px minimum height and the oversized logo panel so cards size to their content and the grid stays even.
- Tighten the CTA block padding and the gap under the heading/description pair.

## Contact page — logos next to the form

- Change the two-column grid so the form column also hosts a compact "Proudly partnered by" logo rail directly under the form (desktop: right-hand column, stacked below the form card; mobile: after the form).
- The rail reuses the shared `SPONSORS` config and the same dark glass chip styling as Partners, at a smaller chip size (3 across) so it fills the leftover column height rather than leaving dead space beside the contact details.
- Keep it behind the existing visibility gate pattern so it can be hidden from the admin controls.

## Technical notes

- Files: `src/routes/partners.tsx`, `src/routes/contact.tsx`.
- Logos come from `src/config/sponsors.ts` (`SPONSORS`), including the existing `wide` / `onLight` handling — no new assets.
- No backend or data changes; presentation only.
