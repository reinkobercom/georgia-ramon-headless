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

const BOX_FILTERS: { key: string; label: string; collections: string[] }[] = [
  { key: "dunkel", label: "Dunkel", collections: ["dunkle-schokolade-pur", "dunkle-schokolade-veredelt"] },
  { key: "vollmilch", label: "Vollmilch", collections: ["vollmilchschokolade-pur", "vollmilchschokolade-veredelt", "schokolade-mit-milch"] },
  { key: "weiss", label: "Weiß", collections: ["weisse-schokolade-veredelt"] },
  { key: "veredelt", label: "Veredelt", collections: ["schokolade-veredelt"] },
  { key: "nuss-frucht", label: "Nüsse & Früchte", collections: ["schokolade-mit-ganzen-nussen-fruchten"] },
  { key: "vegan", label: "Vegan", collections: ["vegan", "vegane-schokolade"] },
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
        const lists = await Promise.all(
          f.collections.map((collection) =>
            getCollectionProducts({ collection }).catch(() => [] as Product[]),
          ),
        );
        const handles = [...new Set(lists.flat().map((p) => p.handle))];
        return { key: f.key, label: f.label, handles };
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
  { title: "Dunkel", subtitle: "Kräftig & intensiv", collection: "dunkle-schokolade-pur" },
  { title: "Vollmilch", subtitle: "Cremig & ausgewogen", collection: "schokolade-mit-milch" },
  { title: "Veredelt", subtitle: "Mit besonderen Zutaten", collection: "schokolade-veredelt" },
  { title: "Nüsse & Früchte", subtitle: "Ganze Stücke, voller Geschmack", collection: "schokolade-mit-ganzen-nussen-fruchten" },
  { title: "Vegan", subtitle: "Pflanzlich genießen", collection: "vegan" },
  { title: "Pur", subtitle: "Reine Ursprungsschokolade", collection: "schokolade-pur" },
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
