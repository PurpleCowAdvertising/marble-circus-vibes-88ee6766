# Field Tickets Sell-Out Push

## Objective
For this period, the site's single conversion goal is selling the remaining Field
tickets (from R990). Landing experience leads with that call to action.

## 1. Landing ticket popup
New `FieldTicketsPopup` component, styled to match the existing dark glass /
gold brand modals (same treatment as the ticket and Park & Ride modals).

- Fires 4 seconds after landing on the home page, once per session
  (sessionStorage flag so it doesn't nag on every route change).
- Content:
  - Eyebrow: "Final release · Selling out"
  - Headline: "Field tickets — from R990"
  - Short urgency line: FNB Stadium, 19 September 2026, limited Field
    inventory remaining.
  - Primary gold button "Buy Field Tickets" → Webtickets event link, new tab.
  - Secondary quiet link "Not now" to dismiss.
- Escape key, backdrop click, and close button all dismiss; body scroll locked
  while open, matching existing modal behaviour.
- Not shown to users who arrive via a deep link with the cart drawer open, and
  never blocks the hero video load.

## 2. Subscribe popup takes a back seat
The existing "Join the Movement" popup is suppressed while the tickets push is
active — the tickets popup is the only interruption. The subscribe form stays
reachable from the footer/subscribe route; only the automatic popup trigger is
disabled for this period, behind a single flag so it can be switched back on.

## 3. Sticky bottom ticket banner
Slim persistent gold bar across the bottom of the viewport:

```text
[ Field selling out — from R990 ]        [ Buy Now ]   [x]
```

- Appears after the hero section scrolls past, on desktop and mobile.
- Dismissible; stays dismissed for the session.
- On mobile it sits above the existing bottom tab bar so nothing overlaps, and
  it hides when the footer is in view (same pattern as the countdown card).
- Does not interfere with the floating merch/cart pill on the right.

## Technical notes
- New files: `src/components/site/FieldTicketsPopup.tsx`,
  `src/components/site/TicketUrgencyBar.tsx`.
- Both mounted in `src/routes/__root.tsx` (banner) / home route (popup), using
  existing semantic tokens and the gold brand accent — no hardcoded colours.
- Subscribe suppression is a constant in `SubscribePopup.tsx`, not a deletion.
- Ticket URL reused from the existing tiers data:
  `https://www.webtickets.co.za/v2/event.aspx?itemid=1594173143`.
- Verified with Playwright at mobile and desktop widths: popup timing, dismiss
  persistence, banner stacking above the tab bar, footer hide behaviour.
