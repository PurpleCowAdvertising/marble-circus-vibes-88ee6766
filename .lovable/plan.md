# Mobile floating menu icon update

## Goal
Update the mobile floating tab bar so its items and icons match the user's labels: Home, Tickets, Hospitality, Partners, News.

## Current state
`src/components/site/MobileTabBar.tsx` currently shows: Home, Line-Up (Music icon), Tickets (Ticket icon), Hospitality (Map icon), Contact (Mail icon).

Desktop header already has the desired labels/routes: Home, Tickets (scroll), Hospitality (scroll), Partners (`/contact`), News (`/news`), Merch.

## Changes
1. In `src/components/site/MobileTabBar.tsx`, replace the `TABS` array with:
   - Home → `/` → Home icon
   - Tickets → scroll to `#tickets` → Ticket icon
   - Hospitality → scroll to `#experience` → hospitality-themed icon (e.g., `ConciergeBell` or `UtensilsCrossed`)
   - Partners → `/contact` → Handshake icon
   - News → `/news` → Newspaper icon
2. Remove the old Line-Up and Contact entries.
3. Import the chosen icons from `lucide-react`.
4. Keep the existing scroll-to-section behaviour for Tickets and Hospitality, and keep the collapsed Buy Tickets/Buy Merch pill unchanged.
5. Verify TypeScript compiles and the mobile preview shows the five updated icons.
