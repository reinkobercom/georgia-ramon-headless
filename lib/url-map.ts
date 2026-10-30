// Übersetzt Shopify-Menü-URLs in Pfade des neuen Shops.
const SHOP_HOSTS = /^https?:\/\/(www\.)?(georgia-ramon\.com|georgia-ramon\.myshopify\.com|shop\.georgia-ramon\.com)/i;
const LEGACY_ORIGIN = "https://georgia-ramon.com";

const PAGE_MAP: Record<string, string> = {
  "/pages/uber-uns": "/ueber-uns",
  "/pages/haendlerzugang": "/haendler",
};

export function mapShopifyUrl(url: string): string {
  if (!SHOP_HOSTS.test(url) && /^https?:\/\//i.test(url)) return url; // externe Links
  const path = url.replace(SHOP_HOSTS, "") || "/";

  if (path === "/collections" || /^\/collections\/all\/?$/.test(path)) return "/search";
  if (path.startsWith("/collections/")) return path.replace("/collections/", "/search/");
  if (path.startsWith("/products/")) return path.replace("/products/", "/product/");
  if (/^\/blogs\/[^/]+\/?$/.test(path)) return "/blog";
  if (/^\/blogs\/[^/]+\/.+/.test(path)) return path.replace(/^\/blogs\/[^/]+\//, "/blog/");
  if (PAGE_MAP[path]) return PAGE_MAP[path]!;
  // Rechtstexte, Kontakt & übrige Seiten bleiben vorerst im bestehenden Shopify-Shop
  if (path.startsWith("/policies/") || path.startsWith("/pages/")) return LEGACY_ORIGIN + path;
  return path;
}
