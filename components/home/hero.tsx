import { brandImages } from "lib/brand-images";
import Image from "next/image";
import Link from "next/link";

const flavors = [
  { label: "Himbeere & Rosenöl", href: "/product/himbeere-rose" },
  { label: "Sanddorn & Joghurt", href: "/product/sanddorn-joghurt" },
  { label: "Rote Bete & Kokos", href: "/product/rote-bete-kokosnuss-vegan" },
];

function AwardSeal({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex h-[132px] w-[132px] shrink-0 items-center justify-center rounded-full border border-gold-600 bg-cocoa-950/90 backdrop-blur-sm md:h-[148px] md:w-[148px] ${className}`}
    >
      <div className="flex h-[118px] w-[118px] flex-col items-center justify-center gap-1.5 rounded-full border border-gold-500/45 px-3 text-center md:h-[134px] md:w-[134px]">
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5 fill-gold-500"
        >
          <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7.1L12 17.3 5.8 21l1.6-7.1L2 9.2l7.1-.6z" />
        </svg>
        <span className="text-[9px] font-bold tracking-[0.2em] text-cream-50 uppercase md:text-[10px]">
          Ausgezeichnet
        </span>
        <span className="font-serif text-[11px] leading-snug text-gold-300 md:text-[12px]">
          Academy of Chocolate
          <br />& International
          <br />
          Chocolate Awards
        </span>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cocoa-950 text-cream-50">
      <Image
        src={brandImages.hero}
        alt="Tafel von Georgia Ramon mit eingeprägtem Logo"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-60 md:opacity-100"
      />
      {/* Leichte Verläufe: Bild bleibt sichtbar, Text bleibt lesbar */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(0deg,#140e0b_8%,rgba(20,14,11,0.7)_60%,rgba(20,14,11,0.45)_100%)] md:bg-[linear-gradient(90deg,rgba(20,14,11,0.78)_0%,rgba(20,14,11,0.5)_38%,rgba(20,14,11,0.12)_70%,rgba(20,14,11,0)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 hidden bg-[linear-gradient(0deg,rgba(20,14,11,0.7)_0%,rgba(20,14,11,0)_25%),linear-gradient(180deg,rgba(20,14,11,0.5)_0%,rgba(20,14,11,0)_18%)] md:block"
      />

      <div className="container-shop relative flex min-h-[560px] flex-col justify-center py-12 md:h-[calc(100svh-116px)] md:max-h-[680px] md:min-h-[520px] md:py-12">
        <div className="flex max-w-[720px] flex-col gap-6">
          <p className="eyebrow flex items-center gap-3.5 text-gold-400">
            <span aria-hidden className="h-px w-9 bg-gold-500" />
            Handgemacht in Soest
          </p>

          <h1 className="font-serif text-[clamp(2.4rem,4.4vw,4.25rem)] leading-[1.05] font-medium tracking-[-0.015em] text-balance [text-shadow:0_2px_24px_rgba(20,14,11,0.55)]">
            Vergiss alles, was du bisher{" "}
            <em className="text-gold-500">Schokolade</em> genannt hast.
          </h1>

          <p className="max-w-[500px] text-base leading-relaxed text-cream-200 [text-shadow:0_1px_12px_rgba(20,14,11,0.7)] md:text-[17px]">
            Wir machen sie selbst, aus der ganzen Kakaobohne. Dein Gaumen merkt
            den Unterschied beim ersten Stück.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/entdeckerbox" className="btn-gold min-h-[52px] px-7">
              Reise starten: Entdeckerbox
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link
              href="/search"
              className="btn-outline-light min-h-[52px] px-6"
            >
              Alle Sorten
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-[13px]">
            <span className="mr-1 text-cream-300">Probier zum Beispiel:</span>
            {flavors.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className="rounded-full border border-cocoa-700 bg-cocoa-900/70 px-3.5 py-2 text-cream-50 transition-colors hover:border-gold-500 hover:text-gold-300"
              >
                {f.label}
              </Link>
            ))}
          </div>

          <AwardSeal className="mt-2 md:hidden" />
        </div>

        <AwardSeal className="absolute right-4 bottom-12 hidden sm:right-6 md:flex lg:right-8" />
      </div>
    </section>
  );
}
