import type { Menu } from "lib/shopify/types";

export type NavItem = Menu;

// Fallback, falls das Shopify-Menü „main-menu“ leer ist. Normalerweise kommt die
// Navigation direkt aus Shopify (Inhalt → Menüs → Hauptmenü).
export const fallbackNav: NavItem[] = [
  {
    title: "Shop",
    path: "/search",
    items: [
      { title: "Alle Produkte", path: "/search" },
      { title: "Pur", path: "/search/schokolade-pur" },
      { title: "Milch", path: "/search/schokolade-mit-milch" },
      { title: "Veredelt", path: "/search/schokolade-veredelt" },
      { title: "Vegan", path: "/search/vegan" },
      { title: "Alles außer Tafeln", path: "/search/alles-ausser-tafeln" },
    ],
  },
  { title: "SchokoBlog", path: "/blog" },
  { title: "Über uns", path: "/ueber-uns" },
  { title: "Händler & Partner", path: "/haendler" },
];

export const PROBIERBOX_ITEM: NavItem = { title: "Probierbox", path: "/probierbox" };

/** Hauptmenü aufbereiten: „Home“ raus, Probierbox als feste Hervorhebung nach „Shop“. */
export function buildMainNav(menu: Menu[]): NavItem[] {
  const items = (menu.length ? menu : fallbackNav).filter((i) => i.path !== "/");
  if (items.some((i) => i.path === PROBIERBOX_ITEM.path)) return items;
  const shopIndex = items.findIndex((i) => i.items?.length);
  const at = shopIndex >= 0 ? shopIndex + 1 : 0;
  return [...items.slice(0, at), PROBIERBOX_ITEM, ...items.slice(at)];
}

// Diese Punkte erscheinen nur im Footer, nicht im Header/Mobilmenü.
const FOOTER_ONLY = ["/blog", "/haendler"];

export function buildHeaderNav(menu: Menu[]): NavItem[] {
  return buildMainNav(menu).filter((i) => !FOOTER_ONLY.includes(i.path));
}

export const uspItems = [
  "Bean-to-Bar in Soest hergestellt",
  "Bio & fair bezogener Kakao",
  "Kostenloser Versand ab 39 €",
  "Versand nur unter 24 °C",
];
