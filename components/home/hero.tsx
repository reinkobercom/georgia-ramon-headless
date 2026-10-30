import { BeanIcon, LeafIcon, HandshakeIcon, PinIcon } from "components/icons/brand";
import type { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";

const values = [
  { label: "Bio", Icon: LeafIcon },
  { label: "Fair", Icon: HandshakeIcon },
  { label: "Bean-to-Bar", Icon: BeanIcon },
  { label: "Made in Soest", Icon: PinIcon },
];

export function Hero({ products }: { products: Product[] }) {
  const shots = products.filter((p) => p.featuredImage).slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-cocoa-950 text-cream-50">
      {/* Warmer Lichtschein statt Foto – wird durch eure Hero-Fotografie ersetzt */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_40%,rgba(196,154,69,0.28),transparent_55%),radial-gradient(ellipse_at_10%_90%,rgba(110,60,35,0.45),transparent_60%)]"
      />
      <div className="container-shop relative grid items-center gap-10 py-14 md:py-20 lg:grid-cols-2 lg:py-24">
        <div className="max-w-xl">
          <h1 className="font-serif text-[2.4rem] leading-[1.08] sm:text-5xl lg:text-[3.6rem]">
            Außergewöhnliche
            <br />
            Schokolade.
            <span className="mt-2 block text-gold-400">Bean-to-Bar aus Soest.</span>
          </h1>

          <ul className="mt-8 grid max-w-md grid-cols-4 gap-3">
            {values.map(({ label, Icon }) => (
              <li key={label} className="flex flex-col items-start gap-2">
                <Icon className="h-8 w-8 text-cream-100" />
                <span className="text-[10px] font-semibold tracking-[0.12em] uppercase sm:text-[11px]">
                  {label}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-md text-[15px] leading-relaxed text-cream-200">
            Wir verarbeiten den Kakao selbst – von der Bohne bis zur Tafel. Für
            unvergleichlichen Geschmack und höchste Qualität.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/search" className="btn-gold">
              Schokolade entdecken
            </Link>
            <Link href="/#herstellung" className="btn-outline-light">
              Unsere Story
            </Link>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[520px]">
          {shots.map((p, i) => (
            <div
              key={p.handle}
              className={[
                "absolute aspect-square w-[52%] overflow-hidden rounded-sm border border-cream-50/10 shadow-[0_30px_50px_rgba(0,0,0,0.6)]",
                i === 0 && "top-[4%] left-[24%] z-20 rotate-[-3deg]",
                i === 1 && "top-[30%] left-0 z-10 rotate-[-10deg]",
                i === 2 && "top-[34%] right-0 z-10 rotate-[8deg]",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <Image
                src={p.featuredImage.url}
                alt={p.featuredImage.altText || p.title}
                fill
                priority
                sizes="(min-width: 1024px) 280px, 50vw"
                className="object-cover"
              />
            </div>
          ))}
          <div className="absolute right-0 bottom-[4%] z-30 flex h-28 w-28 flex-col items-center justify-center rounded-full border border-gold-500/80 bg-cocoa-950/90 text-center sm:h-32 sm:w-32">
            <span className="text-gold-400">★</span>
            <span className="px-3 text-[9px] leading-tight font-semibold tracking-[0.14em] uppercase">
              International
              <br />
              <span className="text-gold-400">award winning</span>
              <br />
              Chocolate
            </span>
            <span className="text-gold-400">★</span>
          </div>
        </div>
      </div>
    </section>
  );
}
