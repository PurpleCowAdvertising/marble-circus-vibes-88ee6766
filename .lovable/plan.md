# Content Visibility Manager — Phase 1

## Goal
Admin-only dashboard at `/admin` to toggle visibility of pages and sections
across the site, with a draft/live workflow (edit → preview → publish).
Zero visual change to the public site until an admin publishes.

## Auth
- Google sign-in via Lovable Cloud managed OAuth.
- Admin allowlist: `ADMIN_EMAILS` secret (comma-separated). Only listed
  emails see `/admin`; everyone else is redirected to `/`.
- `/auth` route: single "Sign in with Google" button.
- No public signup, no email/password — this is a private admin surface.

## Data model
Single table `content_visibility`:
- `key` text primary key — stable identifier, e.g. `page:music`, `section:home.hero`.
- `kind` text — `page` | `section`.
- `label` text — human label shown in admin ("Home / Hero", "Music page").
- `parent_key` text nullable — for section→page grouping.
- `draft_hidden` boolean default false — pending state.
- `live_hidden` boolean default false — what the public site sees.
- `updated_at`, `updated_by` — audit trail.

RLS:
- Public `SELECT` allowed for `live_hidden` reads (needed at SSR for every visitor).
- All writes and `draft_hidden` reads require admin role check via server functions.

## Registry
`src/lib/visibility-registry.ts` — the canonical list of every toggleable key
on the site. Seed migration inserts a row per registry entry. When a section
is added to a route, the developer adds one line to the registry; a startup
sync (server fn callable from admin) inserts missing keys into the DB.

## Component wiring
- Hook `useVisibility()` fetches all live visibility rows once, caches in
  QueryClient with a long stale time.
- `<VisibilityGate keyName="section:home.hero">…</VisibilityGate>` wraps each
  section. Hidden = renders nothing (layout reflows naturally, no placeholder).
- Route-level: each page's `beforeLoad` throws `notFound()` when the page is
  hidden and preview mode is off.
- Header/MobileTabBar nav: filter out links whose page is hidden.

## Preview mode
- Admin toggle in the dashboard sets a `?preview=draft` search param or a
  `lovable-preview` cookie via a server fn (httpOnly, admin-only).
- `useVisibility()` reads `draft_hidden` instead of `live_hidden` when the
  preview cookie is present AND the caller is admin.
- Draft badge fixed at top of screen while preview is on, with "Back to live".

## Publish workflow
- Admin edits change `draft_hidden` only. UI shows unsaved-change count.
- "Publish changes" server fn copies `draft_hidden → live_hidden` for all
  changed rows in a transaction, bumps a `visibility_version` value so
  clients revalidate.
- "Discard changes" resets `draft_hidden = live_hidden`.

## Admin UI (`/admin`)
- Left sidebar: search + tree (Pages → Sections).
- Right pane: selected page/section detail with toggle, status pill
  (Live / Hidden / Draft change pending), last-edited-by.
- Top bar: unsaved count, Preview toggle, Publish, Discard.
- Bulk actions per page: Hide all sections / Show all sections.

## Route/page inventory (initial registry)
Pages: `/`, `/about`, `/music`, `/news`, `/tickets`, `/partners`,
`/experience`, `/merchandise`, `/legacy`, `/contact`, `/faqs`, `/privacy`,
`/terms`. `/auth` and `/admin` are never toggleable.

Sections per page — enumerated during the wiring pass by reading each route
file and adding one `<VisibilityGate>` per top-level section, with matching
registry entries.

## Out of scope (Phase 2)
- Individual component/card toggles (each artist, each FAQ).
- Inline text editing.
- Scheduled publish, role tiers, version history, undo/redo, recycle bin.
- Multi-admin sync conflict resolution (single-admin assumption for now).

## Build order
1. `ADMIN_EMAILS` secret + Google OAuth config + migration.
2. `/auth` route + admin middleware + `/admin` shell (empty tree, wired auth).
3. Registry + `useVisibility` + `<VisibilityGate>` + nav filtering.
4. Instrument every route with section gates + seed registry.
5. Preview mode + publish/discard.
6. Polish: search, bulk actions, status pills, audit display.
