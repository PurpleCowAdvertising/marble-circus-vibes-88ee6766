import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    ShopifyBuy: any;
  }
}

const SHOPIFY_SCRIPT_URL =
  'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

// TODO: move these into env vars (VITE_SHOPIFY_DOMAIN / VITE_SHOPIFY_TOKEN)
// rather than hardcoding — storefront tokens are safe to expose, but env vars
// make it easy to swap stores per environment.
const SHOPIFY_DOMAIN = 'galxboy-sa.myshopify.com';
const STOREFRONT_TOKEN = '3b7f71847b99743ed81f6d61ea90dfc1';
const COLLECTION_ID = '496493461795';

export function ShopifyCollection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Guard against React StrictMode double-invoking effects in dev,
    // and against remounts re-triggering the widget build.
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    function renderCollection() {
      const client = window.ShopifyBuy.buildClient({
        domain: SHOPIFY_DOMAIN,
        storefrontAccessToken: STOREFRONT_TOKEN,
      });

      window.ShopifyBuy.UI.onReady(client).then((ui: any) => {
        if (!containerRef.current) return;
        ui.createComponent('collection', {
          id: COLLECTION_ID,
          node: containerRef.current,
          moneyFormat: 'R%20%7B%7Bamount%7D%7D',
          options: {
            product: {
              styles: {
                product: {
                  '@media (min-width: 601px)': {
                    'max-width': 'calc(33.33333% - 30px)',
                    'margin-left': '30px',
                    'margin-bottom': '50px',
                    width: 'calc(33.33333% - 30px)',
                  },
                  img: {
                    height: 'calc(100% - 15px)',
                    position: 'absolute',
                    left: '0',
                    right: '0',
                    top: '0',
                  },
                  imgWrapper: {
                    'padding-top': 'calc(75% + 15px)',
                    position: 'relative',
                    height: '0',
                  },
                },
                button: {
                  ':hover': { 'background-color': '#000000' },
                  'background-color': '#000000',
                  ':focus': { 'background-color': '#000000' },
                  'border-radius': '25px',
                },
              },
              text: { button: 'Add to cart' },
            },
            productSet: {
              styles: {
                products: {
                  '@media (min-width: 601px)': { 'margin-left': '-30px' },
                },
              },
            },
            modalProduct: {
              contents: {
                img: false,
                imgWithCarousel: true,
                button: false,
                buttonWithQuantity: true,
              },
              styles: {
                product: {
                  '@media (min-width: 601px)': {
                    'max-width': '100%',
                    'margin-left': '0px',
                    'margin-bottom': '0px',
                  },
                },
                button: {
                  ':hover': { 'background-color': '#000000' },
                  'background-color': '#000000',
                  ':focus': { 'background-color': '#000000' },
                  'border-radius': '25px',
                },
              },
              text: { button: 'Add to cart' },
            },
            option: {
              styles: {
                label: { 'font-family': 'Candara, sans-serif' },
                select: { 'font-family': 'Candara, sans-serif' },
              },
            },
            cart: {
              styles: {
                button: {
                  ':hover': { 'background-color': '#000000' },
                  'background-color': '#000000',
                  ':focus': { 'background-color': '#000000' },
                  'border-radius': '25px',
                },
              },
              text: { total: 'Subtotal', button: 'Checkout' },
              popup: false,
            },
            toggle: {
              styles: {
                toggle: {
                  'background-color': '#000000',
                  ':hover': { 'background-color': '#000000' },
                  ':focus': { 'background-color': '#000000' },
                },
              },
            },
          },
        });
      });
    }

    if (window.ShopifyBuy?.UI) {
      renderCollection();
      return;
    }

    if (window.ShopifyBuy) {
      const interval = setInterval(() => {
        if (window.ShopifyBuy.UI) {
          clearInterval(interval);
          renderCollection();
        }
      }, 50);
      return () => clearInterval(interval);
    }

    const existing = document.querySelector(
      `script[src="${SHOPIFY_SCRIPT_URL}"]`
    );
    if (existing) {
      existing.addEventListener('load', renderCollection);
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = SHOPIFY_SCRIPT_URL;
    script.onload = renderCollection;
    document.head.appendChild(script);
  }, []);

  return <div ref={containerRef} />;
}
