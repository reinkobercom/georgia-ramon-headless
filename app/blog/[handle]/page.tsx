import { BoxStrip } from "components/home/sections";
import Prose from "components/prose";
import { formatDate, getArticle } from "lib/blog";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await props.params;
  const article = await getArticle(handle);
  if (!article) return notFound();
  return {
    title: article.seo?.title || article.title,
    description: article.seo?.description || article.excerpt || undefined,
    openGraph: article.image ? { images: [{ url: article.image.url }] } : undefined,
  };
}

export default async function ArticlePage(props: { params: Promise<{ handle: string }> }) {
  const { handle } = await props.params;
  const article = await getArticle(handle);
  if (!article) return notFound();

  return (
    <>
      <article className="container-shop max-w-3xl py-10 md:py-16">
        <nav aria-label="Brotkrumen" className="mb-6 text-xs text-cocoa-500">
          <Link href="/blog" className="hover:text-cocoa-900">
            ← SchokoBlog
          </Link>
        </nav>
        <p className="text-xs text-cocoa-500">
          {formatDate(article.publishedAt)}
          {article.authorV2?.name ? ` · ${article.authorV2.name}` : ""}
        </p>
        <h1 className="mt-2 font-serif text-4xl leading-tight sm:text-5xl">{article.title}</h1>
        {article.image ? (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-sm bg-cream-100">
            <Image
              src={article.image.url}
              alt={article.image.altText || article.title}
              fill
              priority
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}
        <Prose
          className="mt-10 max-w-none text-cocoa-700 prose-headings:font-serif prose-headings:text-cocoa-900 prose-img:rounded-sm"
          html={article.contentHtml || ""}
        />
      </article>
      <BoxStrip />
    </>
  );
}
