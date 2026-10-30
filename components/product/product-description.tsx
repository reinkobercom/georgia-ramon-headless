import { AddToCart } from "components/cart/add-to-cart";
import { LeafIcon, PinIcon, TruckIcon } from "components/icons/brand";
import Prose from "components/prose";
import { VeganBadge } from "components/product-card";
import { compareAtPrice, formatPrice, isVegan, unitPriceLabel } from "lib/format";
import { buildSteckbrief, splitDescription } from "lib/product-info";
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
        {isVegan(product) ? <VeganBadge className="mt-3 border border-[#cfe0bd]" /> : null}
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

      <ProductDetails product={product} />
    </>
  );
}

function ProductDetails({ product }: { product: Product }) {
  const { introHtml, sections } = splitDescription(product.descriptionHtml || "");
  const steckbrief = buildSteckbrief(product);

  return (
    <div className="mt-8 space-y-8">
      {steckbrief.length ? (
        <section>
          <h2 className="eyebrow mb-3 text-cocoa-500">Steckbrief</h2>
          <dl className="divide-y divide-cream-300 rounded-sm border border-cream-300 bg-white/60 text-sm">
            {steckbrief.map((row) => (
              <div key={row.label} className="flex gap-4 px-4 py-2.5">
                <dt className="w-32 shrink-0 text-cocoa-500">{row.label}</dt>
                <dd className="font-medium">{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {introHtml ? (
        <section>
          <h2 className="eyebrow mb-3 text-cocoa-500">Beschreibung</h2>
          <Prose
            className="prose-sm max-w-none text-cocoa-700 prose-headings:font-serif prose-headings:text-cocoa-900 prose-a:text-cocoa-900 prose-strong:text-cocoa-900"
            html={introHtml}
          />
        </section>
      ) : null}

      {sections.length ? (
        <section className="border-t border-cream-300">
          {sections.map((sec, i) => (
            <details key={sec.title} open={i === 0} className="group border-b border-cream-300">
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-semibold tracking-[0.06em] uppercase [&::-webkit-details-marker]:hidden">
                {sec.title}
                <span className="text-lg leading-none text-gold-600 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div
                className="pb-5 text-sm leading-relaxed text-cocoa-700 [&_p]:mb-2 [&_strong]:font-bold [&_strong]:text-cocoa-900 [&_table]:w-full [&_td]:border-b [&_td]:border-cream-200 [&_td]:py-1.5 [&_td:last-child]:text-right [&_th]:py-1.5 [&_th]:text-left"
                dangerouslySetInnerHTML={{ __html: sec.html }}
              />
            </details>
          ))}
          <p className="pt-3 text-xs text-cocoa-500">
            Allergene sind in den Zutaten <strong className="text-cocoa-900">fett</strong> hervorgehoben.
          </p>
        </section>
      ) : null}
    </div>
  );
}
