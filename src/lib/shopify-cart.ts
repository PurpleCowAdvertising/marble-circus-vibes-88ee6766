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
  const cart = getCart();
  const items = cart?.model?.lineItems ?? [];
  try {
    return items.reduce(
      (total: number, item: any) => total + (item?.quantity ?? 0),
      0
    );
  } catch {
    return 0;
  }
}

export function openCart(): boolean {
  const cart = getCart();
  if (!cart || typeof cart.open !== 'function') return false;
  cart.open();
  return true;
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
