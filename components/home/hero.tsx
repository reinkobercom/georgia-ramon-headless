import { BeanIcon, LeafIcon, HandshakeIcon, PinIcon } from "components/icons/brand";
import { brandImages } from "lib/brand-images";
import Image from "next/image";
import Link from "next/link";

const values = [
  { label: "Bio", Icon: LeafIcon },
  { label: "Fair", Icon: HandshakeIcon },
  { label: "Bean-to-Bar", Icon: BeanIcon },
  { label: "Made in Soest", Icon: PinIcon },
];

export function Hero() {

  return (
    <section className="relative overflow-hidden bg-cocoa-950 text-cream-50">
      <Image
        src={brandImages.hero}
        alt="Schokolade von Georgia Ramon"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-cocoa-950/95 via-cocoa-950/75 to-cocoa-950/20"
      />
      <div className="container-shop relative grid min-h-[560px] items-center gap-10 py-14 md:min-h-[620px] md:py-20 lg:grid-cols-2 lg:py-24">
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
            Unser Anspruch: die beste Schokolade herzustellen. Deshalb verarbeiten wir ganze
            Kakaobohnen selbst – handverlesen, hell geröstet, von der Bohne bis zur Tafel.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/search" className="btn-gold">
              Schokolade entdecken
            </Link>
            <Link href="/ueber-uns" className="btn-outline-light">
              Unsere Story
            </Link>
          </div>
        </div>

        <div className="hidden justify-end self-end lg:flex">
          <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full border border-gold-500/80 bg-cocoa-950/85 text-center backdrop-blur-sm">
            <span className="text-gold-400">★</span>
            <span className="px-4 text-[9px] leading-snug font-semibold tracking-[0.14em] uppercase">
              Ausgezeichnet
              <br />
              <span className="text-gold-400">Academy of Chocolate</span>
              <br />& International
              <br />
              Chocolate Awards
            </span>
            <span className="text-gold-400">★</span>
          </div>
        </div>
      </div>
    </section>
  );
}
