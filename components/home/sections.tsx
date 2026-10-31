import {
  BarIcon,
  BeanIcon,
  BoxIcon,
  FlameIcon,
  GiftIcon,
  GlobeIcon,
  HeartIcon,
  LeafIcon,
  LockIcon,
  MagnifierIcon,
  MillIcon,
  PinIcon,
  StarIcon,
  TruckIcon,
  WaveIcon,
} from "components/icons/brand";
import { ProductCard } from "components/product-card";
import { BOX_SIZES_TEXT, MAX_BOX_DISCOUNT } from "lib/box";
import { brandImages } from "lib/brand-images";
import type { CategoryTile } from "lib/catalog";
import type { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";

export function TrustBar() {
  const items = [
    {
      Icon: TruckIcon,
      title: "Kostenloser Versand",
      text: "ab 39 € Bestellwert",
    },
    {
      Icon: LeafIcon,
      title: "Bio-zertifiziert",
      text: "kontrollierte Bio-Qualität",
    },
    { Icon: LockIcon, title: "Sichere Bezahlung", text: "SSL-verschlüsselt" },
    {
      Icon: HeartIcon,
      title: "Handwerkliche Herstellung",
      text: "in kleinen Chargen, fair gehandelt",
    },
  ];
  return (
    <section className="border-b border-cream-300 bg-cream-100">
      <ul className="container-shop grid grid-cols-2 gap-x-4 gap-y-5 py-6 lg:grid-cols-4">
        {items.map(({ Icon, title, text }) => (
          <li key={title} className="flex items-center gap-3">
            <Icon className="h-8 w-8 shrink-0 text-cocoa-700" />
            <span className="text-xs leading-snug">
              <strong className="block font-semibold">{title}</strong>
              <span className="text-cocoa-500">{text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SectionHeading({
  title,
  subtitle,
  link,
}: {
  title: string;
  subtitle?: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="mb-8 flex flex-col items-center text-center md:relative">
      <h2 className="font-serif text-2xl tracking-[0.08em] uppercase sm:text-[1.7rem]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-2 text-sm text-cocoa-500">{subtitle}</p>
      ) : null}
      {link ? (
        <Link
          href={link.href}
          className="mt-3 text-xs font-semibold text-gold-600 hover:text-cocoa-900 md:absolute md:right-0 md:bottom-0 md:mt-0"
        >
          {link.label} →
        </Link>
      ) : null}
    </div>
  );
}

export function Bestsellers({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <section className="container-shop py-14 md:py-20">
      <SectionHeading
        title="Unsere Bestseller"
        subtitle="Die Schokoladen, die unsere Kunden lieben."
        link={{
          href: "/search?sort=trending-desc",
          label: "Alle Bestseller ansehen",
        }}
      />
      {/* Mobil horizontal wischbar, ab Tablet Raster */}
      <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-6">
        {products.map((p, i) => (
          <li key={p.handle} className="w-[44%] shrink-0 snap-start sm:w-auto">
            <ProductCard
              product={p}
              badge={i === 0 ? "Bestseller" : undefined}
              priority={i < 2}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function BoxTeaser({ products }: { products: Product[] }) {
  const shots = products.filter((p) => p.featuredImage).slice(0, 5);
  return (
    <section className="container-shop pb-14 md:pb-20">
      <div className="grid overflow-hidden rounded-sm border border-cream-300 bg-cream-100 lg:grid-cols-2">
        <div className="relative flex min-h-[240px] items-center justify-center bg-[radial-gradient(ellipse_at_50%_100%,#e3d4bf,transparent_70%)] px-6 py-10 sm:min-h-[320px]">
          {shots.map((p, i) => (
            <div
              key={p.handle}
              className="relative -mx-2 aspect-square w-[24%] max-w-[150px] overflow-hidden rounded-sm border-4 border-cream-50 shadow-[0_15px_25px_rgba(42,31,25,0.3)]"
              style={{
                transform: `rotate(${(i - 2) * 5}deg) translateY(${Math.abs(i - 2) * 12}px)`,
                zIndex: 10 - Math.abs(i - 2),
              }}
            >
              <Image
                src={p.featuredImage.url}
                alt=""
                fill
                sizes="150px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div className="relative p-7 sm:p-10 lg:p-12">
          <div className="absolute top-6 right-6 hidden h-20 w-20 flex-col items-center justify-center rounded-full border-2 border-gold-500 text-center sm:flex">
            <span className="text-[9px] font-semibold tracking-[0.14em] uppercase">
              bis zu
            </span>
            <span className="font-serif text-2xl leading-none">
              −{MAX_BOX_DISCOUNT} %
            </span>
          </div>
          <p className="eyebrow text-gold-600">Neu hier?</p>
          <h2 className="mt-2 max-w-sm font-serif text-3xl leading-tight sm:text-4xl">
            Stell dir deine Entdeckerbox zusammen
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-cocoa-700">
            {BOX_SIZES_TEXT} Tafeln ganz nach deiner Wahl – entdecke unsere
            Sorten, finde deinen Favoriten und spare bis zu {MAX_BOX_DISCOUNT} %
            gegenüber dem Einzelkauf.
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-cocoa-700">
            <li className="flex items-center gap-2">
              <BarIcon className="h-5 w-5" />
              {BOX_SIZES_TEXT} Sorten nach Wahl
            </li>
            <li className="flex items-center gap-2">
              <HeartIcon className="h-5 w-5" />
              Ideal zum Probieren
            </li>
            <li className="flex items-center gap-2">
              <GiftIcon className="h-5 w-5" />
              Schön zum Verschenken
            </li>
          </ul>
          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
            <p className="font-serif text-2xl">
              Bis zu{" "}
              <span className="text-gold-600">−{MAX_BOX_DISCOUNT} %</span>
            </p>
            <Link href="/entdeckerbox" className="btn-dark sm:ml-auto">
              Box zusammenstellen
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhyUs() {
  const items = [
    {
      Icon: LeafIcon,
      title: "Bio & Fair",
      text: "Bio-zertifizierte Kakaobohnen & Kakaobutter",
    },
    {
      Icon: BeanIcon,
      title: "Bean-to-Bar",
      text: "Wir machen alles selbst – von der Bohne bis zur Tafel",
    },
    {
      Icon: PinIcon,
      title: "Made in Soest",
      text: "Handwerklich hergestellt in unserer Manufaktur",
    },
    {
      Icon: MagnifierIcon,
      title: "Transparent",
      text: "Wir kennen unsere Lieferketten – direkt oder über Händler unseres Vertrauens",
    },
    {
      Icon: StarIcon,
      title: "Ausgezeichnet",
      text: "Academy of Chocolate & International Chocolate Awards",
    },
    {
      Icon: GlobeIcon,
      title: "Gegen Kinderarbeit",
      text: "Fairer Handel oder Direktbezug beim Produzenten",
    },
  ];
  return (
    <section className="border-y border-cream-300 bg-cream-100/60 py-14 md:py-20">
      <div className="container-shop">
        <SectionHeading title="Warum Georgia Ramon?" />
        <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {items.map(({ Icon, title, text }) => (
            <li key={title} className="flex flex-col items-center text-center">
              <Icon className="h-11 w-11 text-cocoa-700" />
              <p className="eyebrow mt-4 text-[11px]">{title}</p>
              <p className="mt-1.5 max-w-[180px] text-xs leading-relaxed text-cocoa-500">
                {text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Categories({ tiles }: { tiles: CategoryTile[] }) {
  return (
    <section className="container-shop py-14 md:py-20">
      <SectionHeading title="Finde deine Lieblingsschokolade" />
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {tiles.map((t) => (
          <li key={t.href}>
            <Link href={t.href} className="group block text-center">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-cocoa-800">
                {t.image ? (
                  <Image
                    src={t.image.url}
                    alt={t.image.altText || t.title}
                    fill
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : null}
              </div>
              <p className="eyebrow mt-3 text-[11px] group-hover:text-gold-600">
                {t.title}
              </p>
              <p className="mt-0.5 text-xs text-cocoa-500">{t.subtitle}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function GiftBanner({ product }: { product?: Product }) {
  const occasions = [
    { Icon: GiftIcon, label: "Geburtstag" },
    { Icon: HeartIcon, label: "Danke sagen" },
    { Icon: BoxIcon, label: "Kleine Aufmerksamkeit" },
    { Icon: BeanIcon, label: "Für Schokoladenfans" },
  ];
  return (
    <section className="container-shop pb-14 md:pb-20">
      <div className="relative grid overflow-hidden rounded-sm bg-cocoa-950 text-cream-50 md:grid-cols-[1fr_1.3fr]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_50%,rgba(196,154,69,0.25),transparent_55%)]"
        />
        <div className="relative flex items-center justify-center p-8 md:p-10">
          {product?.featuredImage ? (
            <div className="relative aspect-square w-full max-w-[300px] rotate-[-3deg] overflow-hidden rounded-sm shadow-[0_30px_50px_rgba(0,0,0,0.6)]">
              <Image
                src={product.featuredImage.url}
                alt={product.featuredImage.altText || product.title}
                fill
                sizes="(min-width: 768px) 300px, 80vw"
                className="object-cover"
              />
            </div>
          ) : (
            <GiftIcon className="h-24 w-24 text-gold-400" />
          )}
        </div>
        <div className="relative p-8 pt-0 md:p-12 md:pl-0">
          <p className="eyebrow text-gold-400">Schokolade verschenken</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
            Für besondere
            <br />
            Menschen & Momente.
          </h2>
          <ul className="mt-7 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {occasions.map(({ Icon, label }) => (
              <li
                key={label}
                className="flex flex-col gap-2 text-xs text-cream-200"
              >
                <Icon className="h-7 w-7 text-cream-50" />
                {label}
              </li>
            ))}
          </ul>
          <Link href="/search/bundles" className="btn-outline-light mt-8">
            Geschenke entdecken
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const steps = [
    {
      Icon: BeanIcon,
      title: "Verlesen",
      text: "Jede Kakaobohne wird von Hand verlesen.",
    },
    {
      Icon: FlameIcon,
      title: "Hell rösten",
      text: "Hell geröstet, damit der Ursprung schmeckbar bleibt.",
    },
    {
      Icon: BarIcon,
      title: "Brechen",
      text: "Die Bohnen werden geschält & gebrochen.",
    },
    {
      Icon: MillIcon,
      title: "Mahlen",
      text: "Fein vermahlen zu einer zarten Masse.",
    },
    {
      Icon: WaveIcon,
      title: "Conchieren",
      text: "Lange veredelt für Geschmack & Textur.",
    },
    {
      Icon: HeartIcon,
      title: "Von Hand gegossen",
      text: "Mit viel Sorgfalt in jede Tafel.",
    },
  ];
  return (
    <section
      id="herstellung"
      className="scroll-mt-28 bg-cocoa-900 py-14 text-cream-50 md:py-20"
    >
      <div className="container-shop">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-2xl tracking-[0.06em] uppercase sm:text-[1.7rem]">
            Von der Bohne bis zur Tafel
          </h2>
          <p className="mt-2 text-sm text-cream-300">
            Mitten in Soest – in unserer eigenen Manufaktur.
          </p>
        </div>
        <div className="mb-12 grid grid-cols-3 gap-2 sm:gap-4">
          {[brandImages.phillipWork, brandImages.craft, brandImages.molds].map(
            (src, i) => (
              <div
                key={src}
                className="relative aspect-[4/5] overflow-hidden rounded-sm bg-cocoa-800 sm:aspect-[4/3]"
              >
                <Image
                  src={src}
                  alt={
                    [
                      "Schokolade wird von Hand gefertigt",
                      "Handarbeit in der Manufaktur",
                      "Schokoladenformen",
                    ][i]!
                  }
                  fill
                  sizes="33vw"
                  className="object-cover"
                />
              </div>
            ),
          )}
        </div>
        <ol className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {steps.map(({ Icon, title, text }, i) => (
            <li key={title} className="flex flex-col items-center text-center">
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-gold-500/60">
                <Icon className="h-9 w-9 text-gold-300" />
                <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-[11px] font-semibold text-cocoa-950">
                  {i + 1}
                </span>
              </div>
              <p className="eyebrow mt-4 text-[11px]">{title}</p>
              <p className="mt-1.5 max-w-[170px] text-xs leading-relaxed text-cream-300">
                {text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Reviews() {
  // PLATZHALTER: hier echte Kundenbewertungen einbinden (z. B. aus Judge.me oder Shopify Product Reviews).
  const placeholders = [1, 2, 3];
  return (
    <section className="container-shop py-14 md:py-20">
      <SectionHeading title="Das sagen unsere Kunden" />
      <ul className="grid gap-4 md:grid-cols-3">
        {placeholders.map((n) => (
          <li
            key={n}
            className="rounded-sm border border-dashed border-cream-300 bg-cream-100/60 p-6 text-sm text-cocoa-500"
          >
            <p className="text-gold-500">★★★★★</p>
            <p className="mt-3 italic">
              Platzhalter für eine echte Kundenbewertung – wird aus eurem
              Bewertungs-Tool übernommen.
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function BoxStrip() {
  return (
    <section className="container-shop pb-14 md:pb-20">
      <div className="flex flex-col items-start gap-4 rounded-sm bg-cocoa-950 p-6 text-cream-50 sm:flex-row sm:items-center sm:p-8">
        <BoxIcon className="h-10 w-10 shrink-0 text-gold-400" />
        <div>
          <p className="font-serif text-xl sm:text-2xl">
            Lieber probieren? {BOX_SIZES_TEXT} Sorten nach Wahl
          </p>
          <p className="mt-1 text-sm text-cream-300">
            Stell dir deine Entdeckerbox zusammen und spare bis zu{" "}
            {MAX_BOX_DISCOUNT} %.
          </p>
        </div>
        <Link href="/entdeckerbox" className="btn-gold sm:ml-auto">
          Box zusammenstellen
        </Link>
      </div>
    </section>
  );
}

export function StoryTeaser() {
  return (
    <section className="container-shop py-14 md:py-20">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-cream-100">
          <Image
            src={brandImages.company}
            alt="Georgia Ramon Manufaktur"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="eyebrow text-gold-600">Unsere Geschichte</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
            Seit 2015 mit Leidenschaft für Craft Chocolate.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-cocoa-700">
            Gegründet in Bonn, mehrfach ausgezeichnet und heute in Soest zu
            Hause: Georgia Ramon ist ein kleines Team mit einem großen Anspruch.
            Wir erzählen dir, wer wir sind – und warum wir Schokolade von der
            ganzen Kakaobohne an selbst machen.
          </p>
          <Link href="/ueber-uns" className="btn-dark mt-7">
            Lerne uns kennen
          </Link>
        </div>
      </div>
    </section>
  );
}
