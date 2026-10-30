import { AddToCart } from "components/cart/add-to-cart";
import { LeafIcon, PinIcon, TruckIcon } from "components/icons/brand";
import Prose from "components/prose";
import { compareAtPrice, formatPrice, unitPriceLabel } from "lib/format";
import { Product } from "lib/shopify/types";
import { VariantSelector } from "./variant-selector";

export function ProductDescription({ product }: { product: Product }) {
  const price = product.priceRange.minVariantPrice;
  const hasRange = price.amount !== product.priceRange.maxVariantPrice.amount;
  const compare = compareAtPrice(product);
  const unit = unitPriceLabel(product.variants[0]);

  return (
    <>
      <div className="mb-6 border-b border-cream-300 pb-6">
        {product.productType ? (
          <p className="eyebrow mb-2 text-gold-600">{product.productType}</p>
        ) : null}
        <h1 className="font-serif text-3xl leading-tight sm:text-4xl lg:text-[2.7rem]">
          {product.title}
        </h1>
        <div className="mt-4 flex items-baseline gap-3">
          <p className="text-2xl font-semibold">
            {hasRange ? "ab " : ""}
            {formatPrice(price.amount, price.currencyCode)}
          </p>
          {compare ? (
            <p className="text-base text-cocoa-500 line-through">
              {formatPrice(compare.amount, compare.currencyCode)}
            </p>
          ) : null}
        </div>
        <p className="mt-1 text-xs text-cocoa-500">
          {unit ? `${unit} · ` : ""}inkl. MwSt., zzgl.{" "}
          <a href="https://georgia-ramon.com/policies/shipping-policy" className="underline">
            Versand
          </a>
        </p>
      </div>

      <VariantSelector options={product.options} variants={product.variants} />

      <AddToCart product={product} />

      <ul className="mt-6 grid grid-cols-3 gap-3 rounded-sm bg-cream-100 p-4 text-center text-[11px] leading-snug text-cocoa-700">
        <li className="flex flex-col items-center gap-1.5">
          <TruckIcon className="h-6 w-6" />
          Kostenloser Versand ab 39 €
        </li>
        <li className="flex flex-col items-center gap-1.5">
          <LeafIcon className="h-6 w-6" />
          Bio & fair bezogener Kakao
        </li>
        <li className="flex flex-col items-center gap-1.5">
          <PinIcon className="h-6 w-6" />
          Handgemacht in Soest
        </li>
      </ul>

      {product.descriptionHtml ? (
        <div className="mt-8">
          <h2 className="eyebrow mb-3 text-cocoa-500">Beschreibung</h2>
          <Prose
            className="prose-sm max-w-none text-cocoa-700 prose-headings:font-serif prose-headings:text-cocoa-900 prose-a:text-cocoa-900 prose-strong:text-cocoa-900"
            html={product.descriptionHtml}
          />
        </div>
      ) : null}
    </>
  );
}
