import clsx from "clsx";
import { VeganIcon } from "components/icons/brand";
import { compareAtPrice, formatPrice, isVegan, productBadge } from "lib/format";
import type { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";

export function ProductCard({
  product,
  badge,
  priority,
  className,
}: {
  product: Product;
  badge?: string | null;
  priority?: boolean;
  className?: string;
}) {
  const label = badge ?? productBadge(product);
  const compare = compareAtPrice(product);
  const vegan = isVegan(product);
  const price = product.priceRange.minVariantPrice;
  const hasRange =
    product.priceRange.minVariantPrice.amount !== product.priceRange.maxVariantPrice.amount;

  return (
    <Link
      href={`/product/${product.handle}`}
      prefetch={true}
      className={clsx("group flex flex-col", className)}
    >
      <div className="relative aspect-square overflow-hidden rounded-sm bg-cream-100">
        {label && label !== "Vegan" ? (
          <span className="absolute top-3 left-3 z-10 rounded-sm bg-cocoa-950 px-2 py-1 text-[10px] font-semibold tracking-[0.12em] text-cream-50 uppercase">
            {label}
          </span>
        ) : null}
        {vegan ? <VeganBadge className="absolute bottom-3 left-3 z-10" /> : null}
        {!product.availableForSale ? (
          <span className="absolute top-3 right-3 z-10 rounded-sm bg-cream-50 px-2 py-1 text-[10px] font-semibold tracking-[0.12em] text-cocoa-700 uppercase">
            Ausverkauft
          </span>
        ) : null}
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="mt-3 flex flex-1 flex-col">
        <h3 className="text-sm leading-snug font-semibold text-cocoa-900 group-hover:text-gold-600">
          {product.title}
        </h3>
        {product.productType ? (
          <p className="mt-0.5 text-xs text-cocoa-500">{product.productType}</p>
        ) : null}
        <p className="mt-1.5 text-sm font-semibold">
          {hasRange ? "ab " : ""}
          {formatPrice(price.amount, price.currencyCode)}
          {compare ? (
            <span className="ml-2 text-xs font-normal text-cocoa-500 line-through">
              {formatPrice(compare.amount, compare.currencyCode)}
            </span>
          ) : null}
        </p>
      </div>
    </Link>
  );
}

export function VeganBadge({ className }: { className?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full bg-white/95 py-0.5 pr-2.5 pl-1 text-[10px] font-semibold tracking-[0.08em] text-[#3f6b2a] uppercase shadow-sm",
        className,
      )}
      title="Vegan"
    >
      <VeganIcon className="h-5 w-5" />
      Vegan
    </span>
  );
}
