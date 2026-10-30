export type NavItem = { title: string; path: string };

// Hauptnavigation – Kollektions-Handles aus Shopify.
export const shopLinks: NavItem[] = [
  { title: "Alle Sorten", path: "/search" },
  { title: "Dunkle Schokolade", path: "/search/dunkle-schokolade-pur" },
  { title: "Vollmilch", path: "/search/schokolade-mit-milch" },
  { title: "Veredelt", path: "/search/schokolade-veredelt" },
  { title: "Vegan", path: "/search/vegan" },
  { title: "Bio", path: "/search/bio" },
  { title: "Alles außer Tafeln", path: "/search/alles-ausser-tafeln" },
];

export const mainNav: NavItem[] = [
  { title: "Bestseller", path: "/search?sort=trending-desc" },
  { title: "Probierbox", path: "/probierbox" },
  { title: "Geschenke", path: "/search/bundles" },
  { title: "Limited Editions", path: "/search/limited-edition" },
  { title: "Über uns", path: "/#herstellung" },
];

export const uspItems = [
  "Bean-to-Bar in Soest hergestellt",
  "Bio & fair bezogener Kakao",
  "Kostenloser Versand ab 39 €",
  "Schneller Versand mit DHL",
];
