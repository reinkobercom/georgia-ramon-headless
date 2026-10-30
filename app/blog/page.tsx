import { formatDate, getArticles } from "lib/blog";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "SchokoBlog",
  description: "Geschichten rund um Kakao, Herkunft, Herstellung und Rezepte von Georgia Ramon.",
};

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <div className="container-shop py-10 md:py-16">
      <header className="mb-10 text-center md:mb-14">
        <p className="eyebrow text-gold-600">SchokoBlog</p>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl">Aus der Manufaktur</h1>
        <p className="mx-auto mt-3 max-w-xl text-[15px] text-cocoa-700">
          Herkunft, Produktion, Verpackung, Rezepte und was uns sonst bewegt.
        </p>
      </header>

      {articles.length ? (
        <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a, i) => (
            <li key={a.handle}>
              <Link href={`/blog/${a.handle}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-cream-100">
                  {a.image ? (
                    <Image
                      src={a.image.url}
                      alt={a.image.altText || a.title}
                      fill
                      priority={i < 3}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center font-serif text-3xl text-cocoa-500/40">
                      GR
                    </div>
                  )}
                </div>
                <p className="mt-4 text-xs text-cocoa-500">{formatDate(a.publishedAt)}</p>
                <h2 className="mt-1 font-serif text-2xl leading-snug group-hover:text-gold-600">
                  {a.title}
                </h2>
                {a.excerpt ? (
                  <p className="mt-2 line-clamp-3 text-sm text-cocoa-700">{a.excerpt}</p>
                ) : null}
                <span className="mt-3 inline-block text-xs font-semibold text-gold-600">
                  Weiterlesen →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-cocoa-700">Bald gibt es hier neue Geschichten.</p>
      )}
    </div>
  );
}
