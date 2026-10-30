import { BoxStrip, SectionHeading } from "components/home/sections";
import { ProductCard } from "components/product-card";
import { Gallery } from "components/product/gallery";
import { ProductDescription } from "components/product/product-description";
import { HIDDEN_PRODUCT_TAG } from "lib/constants";
import { getProduct, getProductRecommendations } from "lib/shopify";
import type { Image } from "lib/shopify/types";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt,
            },
          ],
        }
      : null,
  };
}

export default async function ProductPage(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      "@type": "AggregateOffer",
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <div className="container-shop py-6 md:py-10">
        <nav aria-label="Brotkrumen" className="mb-6 text-xs text-cocoa-500">
          <Link href="/" className="hover:text-cocoa-900">Startseite</Link>
          <span className="mx-2">/</span>
          <Link href="/search" className="hover:text-cocoa-900">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-cocoa-900">{product.title}</span>
        </nav>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Suspense
              fallback={<div className="aspect-square w-full rounded-sm bg-cream-100" />}
            >
              <Gallery
                images={product.images.slice(0, 8).map((image: Image) => ({
                  src: image.url,
                  altText: image.altText,
                }))}
              />
            </Suspense>
          </div>
          <div>
            <Suspense fallback={null}>
              <ProductDescription product={product} />
            </Suspense>
          </div>
        </div>
      </div>
      <BoxStrip />
      <RelatedProducts id={product.id} />
    </>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
    <section className="container-shop pb-16 md:pb-24">
      <SectionHeading title="Das könnte dir auch schmecken" />
      <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0 lg:grid-cols-5">
        {relatedProducts.slice(0, 5).map((product) => (
          <li key={product.handle} className="w-[44%] shrink-0 snap-start sm:w-auto">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
