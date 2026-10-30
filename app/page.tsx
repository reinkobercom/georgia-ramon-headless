import { Hero } from "components/home/hero";
import {
  Bestsellers,
  BoxTeaser,
  Categories,
  GiftBanner,
  Process,
  Reviews,
  TrustBar,
  WhyUs,
} from "components/home/sections";
import { getBestsellers, getCategoryTiles } from "lib/catalog";
import { getCollectionProducts } from "lib/shopify";

export const metadata = {
  description: "Bean-to-Bar Schokolade aus Deutschland – bio, fair und handgemacht in Soest.",
  openGraph: { type: "website" },
};

export default async function HomePage() {
  const [bestsellers, tiles, bundles] = await Promise.all([
    getBestsellers(8),
    getCategoryTiles(),
    getCollectionProducts({ collection: "bundles" }).catch(() => []),
  ]);

  return (
    <>
      <Hero products={bestsellers} />
      <TrustBar />
      <Bestsellers products={bestsellers.slice(0, 6)} />
      <BoxTeaser products={bestsellers.slice(1, 6)} />
      <WhyUs />
      <Categories tiles={tiles} />
      <GiftBanner product={bundles.find((p) => p.availableForSale) ?? bundles[0]} />
      <Process />
      <Reviews />
    </>
  );
}
