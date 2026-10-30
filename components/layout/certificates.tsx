import clsx from "clsx";
import { certificates, pressLogos, type Badge } from "lib/certificates";
import Image from "next/image";

export function Certificates() {
  return (
    <section aria-label="Auszeichnungen und Presse" className="border-b border-cocoa-700">
      <div className="container-shop py-10 md:py-12">
        <p className="eyebrow mb-7 text-center text-gold-400 md:mb-9">
          Ausgezeichnet & bekannt aus
        </p>

        {/* Mobil/Tablet: untereinander mit Linie. Desktop: nebeneinander mit senkrechtem Strich. */}
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-center lg:gap-10">
          <ul className="grid w-full max-w-md grid-cols-5 items-center gap-3 sm:max-w-xl sm:gap-5 lg:flex lg:w-auto lg:max-w-none lg:gap-6">
            {certificates.map((c) => (
              <li key={c.title} className="lg:w-24">
                <BadgeImage badge={c} className="aspect-square" sizes="96px" round />
              </li>
            ))}
          </ul>

          <span aria-hidden className="h-px w-full max-w-md bg-cocoa-700 lg:h-20 lg:w-px" />

          <ul className="grid w-full max-w-sm grid-cols-4 items-center gap-5 sm:max-w-lg lg:flex lg:w-auto lg:max-w-none lg:gap-8">
            {pressLogos.map((p) => (
              <li key={p.title} className="lg:w-28">
                <BadgeImage badge={p} className="aspect-[5/2]" sizes="112px" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function BadgeImage({
  badge,
  className,
  sizes,
  round,
}: {
  badge: Badge;
  className: string;
  sizes: string;
  round?: boolean;
}) {
  const inner = badge.src ? (
    <Image src={badge.src} alt={badge.title} fill sizes={sizes} className="object-contain" />
  ) : (
    <span
      className={clsx(
        "flex h-full w-full items-center justify-center border border-dashed border-cocoa-500 px-1 text-center text-[8px] leading-tight text-cream-300/70 sm:text-[10px]",
        round ? "rounded-full" : "rounded-sm",
      )}
    >
      {badge.title}
    </span>
  );

  return (
    <div className={clsx("relative w-full", className)}>
      {badge.href ? (
        <a href={badge.href} target="_blank" rel="noopener noreferrer" className="block h-full w-full">
          {inner}
        </a>
      ) : (
        inner
      )}
    </div>
  );
}
