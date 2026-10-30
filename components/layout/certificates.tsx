import { certificates } from "lib/certificates";
import Image from "next/image";

export function Certificates() {
  return (
    <section aria-label="Zertifikate & Auszeichnungen" className="border-b border-cocoa-700">
      <div className="container-shop py-6 md:py-10">
        <p className="eyebrow mb-4 text-center text-[10px] text-gold-400 md:mb-6 md:text-xs">
          Zertifikate & Auszeichnungen
        </p>
        {/* Immer 5 nebeneinander: mobil kompakt, ab Tablet groß */}
        <ul className="grid grid-cols-5 gap-2 sm:gap-4 lg:gap-6">
          {certificates.map((c) => (
            <li
              key={c.title}
              className="relative aspect-[3/2] overflow-hidden rounded-sm bg-cream-50 sm:rounded-md"
            >
              {c.src ? (
                <Image
                  src={c.src}
                  alt={c.title}
                  fill
                  sizes="(min-width: 1280px) 240px, 20vw"
                  className="object-contain p-1 sm:p-2"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center border border-dashed border-cream-300 bg-cocoa-900 px-1 text-center text-[8px] leading-tight text-cream-300 sm:text-xs">
                  {c.title}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
