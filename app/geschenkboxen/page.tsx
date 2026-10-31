import { GiftGrid, type GiftBoxView } from "components/gifts/gift-grid";
import {
  WinterHighlight,
  type WinterVariantView,
} from "components/gifts/winter-highlight";
import { TrustBar } from "components/home/sections";
import { BOX_SIZES_TEXT, MAX_BOX_DISCOUNT } from "lib/box";
import { brandImages } from "lib/brand-images";
import { formatPrice } from "lib/format";
import { giftBoxes, winterVariants } from "lib/gift-boxes";
import { getProduct } from "lib/shopify";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Geschenkboxen",
  description:
    "Schokoladen-Geschenkboxen für jeden Anlass: Weihnachten, Hochzeit, Muttertag, Vatertag und mehr – fertig zusammengestellt und liebevoll verpackt.",
};

async function lookup(handle: string) {
  const p = await getProduct(handle).catch(() => undefined);
  if (!p) return { price: null, image: null, available: false };
  return {
    price: formatPrice(
      p.priceRange.minVariantPrice.amount,
      p.priceRange.minVariantPrice.currencyCode,
    ),
    image: p.featuredImage?.url ?? null,
    available: p.availableForSale,
  };
}

export default async function GeschenkboxenPage() {
  const [boxes, winter] = await Promise.all([
    Promise.all(
      giftBoxes.map(
        async (b): Promise<GiftBoxView> => ({
          ...b,
          ...(await lookup(b.handle)),
        }),
      ),
    ),
    Promise.all(
      winterVariants.map(
        async (v): Promise<WinterVariantView> => ({
          ...v,
          ...(await lookup(v.handle)),
        }),
      ),
    ),
  ]);

  return (
    <>
      <section className="relative overflow-hidden bg-cocoa-950 text-cream-50">
        <Image
          src={brandImages.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,14,11,0.93)_0%,rgba(20,14,11,0.82)_45%,rgba(20,14,11,0.6)_100%),linear-gradient(0deg,#140e0b_0%,rgba(20,14,11,0)_30%)]"
        />
        <div className="container-shop relative grid items-center gap-10 py-12 md:py-14 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            <p className="eyebrow flex items-center gap-3.5 text-gold-400">
              <span aria-hidden className="h-px w-9 bg-gold-500" />
              Geschenkboxen
            </p>
            <h1 className="font-serif text-[clamp(2.4rem,4.2vw,3.9rem)] leading-[1.06] font-medium tracking-[-0.015em] text-balance">
              Verschenk keine Schokolade. Verschenk eine{" "}
              <em className="text-gold-500">Geschmacksreise.</em>
            </h1>
            <p className="max-w-[500px] text-[17px] leading-relaxed text-cream-200">
              Neun Boxen für jeden Anlass, fertig zusammengestellt und liebevoll
              verpackt. Du suchst aus, wir machen den Rest.
            </p>
            <a
              href="#alle-boxen"
              className="inline-flex min-h-11 items-center gap-2.5 self-start border-b border-gold-500 text-sm font-semibold"
            >
              Alle 9 Boxen ansehen <span aria-hidden>↓</span>
            </a>
          </div>
          <WinterHighlight variants={winter} />
        </div>
      </section>

      <section id="alle-boxen" className="scroll-mt-24 bg-cream-50">
        <div className="container-shop py-16 md:py-20">
          <GiftGrid boxes={boxes} />

          <Link
            href="/entdeckerbox"
            className="mt-8 flex flex-col items-start justify-between gap-6 rounded-sm bg-cocoa-950 px-6 py-9 text-cream-50 md:flex-row md:items-center md:px-12"
          >
            <span className="flex flex-col gap-2.5">
              <span className="eyebrow text-gold-400">
                Nicht das Richtige dabei?
              </span>
              <span className="font-serif text-2xl leading-snug sm:text-3xl">
                Stell deine eigene{" "}
                <em className="text-gold-500">Entdeckerbox</em> zusammen:{" "}
                {BOX_SIZES_TEXT} Sorten, bis zu {MAX_BOX_DISCOUNT} % günstiger.
              </span>
            </span>
            <span className="btn-gold shrink-0">Box zusammenstellen →</span>
          </Link>
        </div>
      </section>

      <TrustBar />
    </>
  );
}
