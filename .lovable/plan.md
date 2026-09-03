# Point merch to the new Shopify collection

Your new embed code is the same store (`galxboy-sa.myshopify.com`) and same storefront token as the current merch section — the only real change is the collection it pulls from: `496460366115` instead of `496493461795`.

## What I'll do

- Update the homepage merch section to load collection `496460366115`.
- Update the floating merch CTA's featured-product preview to read from the same new collection.

## What stays the same

- The existing custom gilded-glass card design, modals, "Cart" buttons, in-stock-first ordering and cart drawer behaviour stay exactly as they are. I won't paste the raw Shopify default styling from the snippet, since the site already overrides it with the brand look.

## Technical detail

- `src/components/ShopifyCollection.tsx`: `COLLECTION_ID` → `496460366115` (used by both the Storefront GraphQL query and the Buy Button component).
- `src/lib/shopify-cart.ts`: `COLLECTION_GID` → `gid://shopify/Collection/496460366115`.

Then I'll verify the section renders products from the new collection in the preview.
