/**
 * Small bridge around the Shopify Buy Button SDK instance that
 * `ShopifyCollection` publishes on `window.__skShopifyUI`, so the floating
 * merch CTA can read the cart count and open the cart drawer without owning
 * the SDK lifecycle itself.
 */

function getUI(): any | null {
  if (typeof window === 'undefined') return null;
  return (window as any).__skShopifyUI ?? null;
}

function getCart(): any | null {
  const ui = getUI();
  const cart = ui?.components?.cart?.[0];
  return cart ?? null;
}

export function getCartCount(): number {
  try {
    const cart = getCart();
    const items = cart?.lineItems ?? [];
    return items.reduce(
      (total: number, item: any) => total + (item?.quantity ?? 0),
      0
    );
  } catch {
    return 0;
  }
}

export function openCart(): boolean {
  // 1) Preferred: ask the SDK cart component to open.
  const cart = getCart();
  if (cart && typeof cart.open === 'function') {
    try {
      cart.open();
      return true;
    } catch {
      /* fall through to the DOM fallbacks */
    }
  }

  // 2) Fallback: click the SDK's own (hidden) cart toggle.
  try {
    const ui = getUI();
    const toggle = ui?.components?.toggle?.[0];
    if (toggle?.node) {
      const btn =
        toggle.node.querySelector('iframe')?.contentDocument?.querySelector(
          '.shopify-buy__cart-toggle'
        ) ?? toggle.node.querySelector('button');
      if (btn) {
        (btn as HTMLElement).click();
        return true;
      }
    }
  } catch {
    /* ignore */
  }

  // 3) Last resort: reveal the cart drawer element directly.
  const wrapper = document.querySelector<HTMLElement>(
    '.shopify-buy-cart-wrapper, .shopify-buy-frame--cart'
  );
  if (wrapper) {
    wrapper.classList.add('is-active', 'shopify-buy-frame--cart--visible');
    return true;
  }

  return false;
}

/** Polls the cart count and calls back whenever it changes. */
export function subscribeCartCount(cb: (count: number) => void): () => void {
  let last = -1;
  const tick = () => {
    const next = getCartCount();
    if (next !== last) {
      last = next;
      cb(next);
    }
  };
  tick();
  const id = window.setInterval(tick, 1000);
  window.addEventListener('sk-shopify-ready', tick);
  return () => {
    window.clearInterval(id);
    window.removeEventListener('sk-shopify-ready', tick);
  };
}

const SHOPIFY_DOMAIN = 'galxboy-sa.myshopify.com';
const STOREFRONT_TOKEN = '3b7f71847b99743ed81f6d61ea90dfc1';
const COLLECTION_GID = 'gid://shopify/Collection/496460366115';

let featuredPromise: Promise<{ title: string; image: string } | null> | null =
  null;

/** First in-stock product of the merch collection, for the CTA preview. */
export function fetchFeaturedMerch() {
  if (featuredPromise) return featuredPromise;
  featuredPromise = fetch(
    `https://${SHOPIFY_DOMAIN}/api/2024-07/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: `query($id: ID!) {
          collection(id: $id) {
            products(first: 6) {
              nodes {
                title
                availableForSale
                featuredImage { url(transform: { maxWidth: 320, maxHeight: 320 }) }
              }
            }
          }
        }`,
        variables: { id: COLLECTION_GID },
      }),
    }
  )
    .then((r) => r.json())
    .then((json) => {
      const nodes = json?.data?.collection?.products?.nodes ?? [];
      const pick =
        nodes.find((n: any) => n.availableForSale && n.featuredImage?.url) ??
        nodes.find((n: any) => n.featuredImage?.url);
      if (!pick) return null;
      return { title: pick.title as string, image: pick.featuredImage.url as string };
    })
    .catch(() => null);
  return featuredPromise;
}
