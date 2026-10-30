import { BoxBuilder, type BoxProduct } from "components/box/box-builder";
import { BoxIcon, HeartIcon, LeafIcon, PinIcon, StarIcon } from "components/icons/brand";
import { BOX } from "lib/box";
import { getBoxCatalog } from "lib/catalog";
import { formatPrice } from "lib/format";

export const metadata = {
  title: "Probierbox zusammenstellen",
  description: `${BOX.size} Tafeln Bean-to-Bar Schokolade nach Wahl für ${formatPrice(BOX.price)}.`,
};

export default async function ProbierboxPage() {
  const { bars, filters } = await getBoxCatalog();

  const products: BoxProduct[] = bars.map((p) => ({
    handle: p.handle,
    title: p.title,
    subtitle: p.productType,
    image: p.featuredImage?.url ?? null,
    price: parseFloat(p.priceRange.minVariantPrice.amount),
    variantId: p.variants[0]?.id ?? "",
    available: p.availableForSale,
  }));

  return (
    <div className="pb-28 lg:pb-0">
      <section className="container-shop pt-8 pb-6 text-center md:pt-12">
        <p className="eyebrow text-gold-600">Probierbox</p>
        <h1 className="mt-2 font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
          Stell dir deine Schokoladenbox zusammen
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-[15px] text-cocoa-700">
          Wähle {BOX.size} Lieblingssorten und spare im Vergleich zum Einzelkauf.
        </p>
      </section>

      <BoxBuilder products={products} filters={filters} />

      <section className="container-shop py-14">
        <div className="rounded-sm border border-cream-300 bg-cream-100/60 px-6 py-10">
          <h2 className="mb-8 text-center font-serif text-xl tracking-[0.08em] uppercase">
            Warum Georgia Ramon?
          </h2>
          <ul className="grid grid-cols-2 gap-8 text-center sm:grid-cols-3 lg:grid-cols-5">
            {[
              { Icon: BoxIcon, t: "Bean-to-Bar in Soest", d: "Von der Bohne bis zur Tafel in unserer Manufaktur." },
              { Icon: LeafIcon, t: "Bio & Fair", d: "Bio-zertifizierte Zutaten & fair bezogener Kakao." },
              { Icon: StarIcon, t: "Ausgezeichnet", d: "Mehrfach international prämiert." },
              { Icon: HeartIcon, t: "Handwerk & Leidenschaft", d: "Mit Liebe zum Detail hergestellt." },
              { Icon: PinIcon, t: "Regional", d: "Handgemacht mitten in Soest." },
            ].map(({ Icon, t, d }) => (
              <li key={t} className="flex flex-col items-center">
                <Icon className="h-9 w-9 text-cocoa-700" />
                <p className="mt-3 text-sm font-semibold">{t}</p>
                <p className="mt-1 max-w-[180px] text-xs text-cocoa-500">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
