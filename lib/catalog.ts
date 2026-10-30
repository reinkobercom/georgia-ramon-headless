import { getCollection, getCollectionProducts, getProducts } from "lib/shopify";
import type { Image, Product } from "lib/shopify/types";

// Kollektionen, die keine einzelnen Tafeln enthalten (für Probierbox ausgeschlossen).
const NON_BAR_COLLECTIONS = ["alles-ausser-tafeln", "bundles"];

export async function getBestsellers(limit = 6): Promise<Product[]> {
  const products = await getProducts({ sortKey: "BEST_SELLING" });
  const nonBars = await nonBarHandles();
  return products
    .filter((p) => p.availableForSale && !nonBars.has(p.handle))
    .slice(0, limit);
}

async function nonBarHandles() {
  const lists = await Promise.all(
    NON_BAR_COLLECTIONS.map((collection) =>
      getCollectionProducts({ collection }).catch(() => [] as Product[]),
    ),
  );
  return new Set(lists.flat().map((p) => p.handle));
}

export type BoxFilter = { key: string; label: string; handles: string[] };

const BOX_FILTERS: { key: string; label: string; collection: string }[] = [
  { key: "dunkel", label: "Dunkel", collection: "zartbitter" },
  { key: "vollmilch", label: "Vollmilch", collection: "vollmilch" },
  { key: "weiss", label: "Weiß", collection: "weisse-schokolade-veredelt" },
  { key: "veredelt", label: "Veredelt", collection: "schokolade-veredelt" },
  { key: "nuss-frucht", label: "Nüsse & Früchte", collection: "schokolade-mit-ganzen-nussen-fruchten" },
  { key: "vegan", label: "Vegan", collection: "vegan" },
  { key: "bio", label: "Bio", collection: "bio" },
];

/** Alle einzelnen Tafeln für die Probierbox plus Filter-Zuordnung. */
export async function getBoxCatalog() {
  const [products, nonBars] = await Promise.all([
    getProducts({ sortKey: "BEST_SELLING" }),
    nonBarHandles(),
  ]);
  const bars = products.filter((p) => !nonBars.has(p.handle));

  const filters: BoxFilter[] = (
    await Promise.all(
      BOX_FILTERS.map(async (f) => {
        const items = await getCollectionProducts({ collection: f.collection }).catch(
          () => [] as Product[],
        );
        return { key: f.key, label: f.label, handles: items.map((p) => p.handle) };
      }),
    )
  ).filter((f) => f.handles.some((h) => bars.some((b) => b.handle === h)));

  return { bars, filters };
}

export type CategoryTile = {
  title: string;
  subtitle: string;
  href: string;
  image: Image | null;
};

const CATEGORIES = [
  { title: "Dunkel", subtitle: "Kräftig & intensiv", collection: "zartbitter" },
  { title: "Vollmilch", subtitle: "Cremig & ausgewogen", collection: "vollmilch" },
  { title: "Veredelt", subtitle: "Mit besonderen Zutaten", collection: "schokolade-veredelt" },
  { title: "Nüsse & Früchte", subtitle: "Ganze Stücke, voller Geschmack", collection: "schokolade-mit-ganzen-nussen-fruchten" },
  { title: "Vegan", subtitle: "Pflanzlich genießen", collection: "vegan" },
  { title: "Limited Editions", subtitle: "Nur für kurze Zeit", collection: "limited-edition" },
];

export async function getCategoryTiles(): Promise<CategoryTile[]> {
  return Promise.all(
    CATEGORIES.map(async (c) => {
      const [collection, products] = await Promise.all([
        getCollection(c.collection).catch(() => undefined),
        getCollectionProducts({ collection: c.collection }).catch(() => [] as Product[]),
      ]);
      return {
        title: c.title,
        subtitle: c.subtitle,
        href: `/search/${c.collection}`,
        image: collection?.image ?? products[0]?.featuredImage ?? null,
      };
    }),
  );
}
