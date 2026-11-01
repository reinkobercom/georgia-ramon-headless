import clsx from "clsx";
import { brandImages } from "lib/brand-images";
import Image from "next/image";

// „Die Reise unserer Kakaobohne“ – steht auf allen Seiten inkl. Startseite direkt über dem Footer.
// Fotos sind vorerst Platzhalter aus der Shopify-Mediathek.
const steps = [
  {
    eyebrow: "Ursprung",
    title: "Ausgewählt vor Ort",
    text: "Alles beginnt bei den Kakaobauern. Wir wählen nur Bohnen, die uns geschmacklich überzeugen.",
    image: brandImages.sourcing,
    alt: "Kakao am Ursprung",
  },
  {
    eyebrow: "Fair & transparent",
    title: "Fair eingekauft",
    text: "Bio-Kakao von verlässlichen Partnern: faire Preise, keine Kinderarbeit, beste Qualität. Dazu fördern wir den Bau von Trockenhäusern.",
    image: brandImages.mission,
    alt: "Kakaobohnen",
  },
  {
    eyebrow: "Unterwegs",
    title: "Die Reise nach Deutschland",
    text: "Getrocknet und sorgfältig verpackt reisen die Bohnen zu uns.",
    image: brandImages.company,
    alt: "Ankunft der Kakaobohnen",
  },
  {
    eyebrow: "Manufaktur Soest",
    title: "Von Hand verarbeitet",
    text: "Wir rösten die ganzen Bohnen behutsam und verarbeiten sie selbst weiter.",
    image: brandImages.craft,
    alt: "Handarbeit in der Manufaktur in Soest",
  },
  {
    eyebrow: "Soest → zu dir",
    title: "Gegossen & verschickt",
    text: "Jede Tafel wird von Hand gegossen und geht direkt an dich.",
    image: brandImages.molds,
    alt: "Schokoladenformen in der Manufaktur",
  },
];

export function BeanJourney() {
  return (
    <section
      aria-labelledby="reise-titel"
      className="border-t border-cream-300 bg-cream-100 text-cocoa-900"
    >
      <div className="container-shop py-16 md:py-20">
        <div className="mb-12 flex flex-col items-center gap-3.5 text-center md:mb-14">
          <p className="eyebrow flex items-center gap-3.5 text-gold-600">
            <span aria-hidden className="h-px w-8 bg-gold-500" />
            Von der Bohne bis zu dir
            <span aria-hidden className="h-px w-8 bg-gold-500" />
          </p>
          <h2
            id="reise-titel"
            className="font-serif text-[clamp(2rem,3.4vw,3.1rem)] leading-tight font-medium"
          >
            Die Reise unserer <em className="text-gold-600">Kakaobohne</em>
          </h2>
          <p className="max-w-[520px] text-[15px] leading-relaxed text-cocoa-700 md:text-base">
            Fünf Stationen, ein Anspruch: die beste Schokolade, die wir machen
            können.
          </p>
        </div>

        <div className="relative">
          {/* Gestrichelte Reiselinie (Desktop) */}
          <svg
            aria-hidden
            viewBox="0 0 1000 224"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-[224px] w-full overflow-visible lg:block"
          >
            <path
              d="M0 30 C40 30 60 74 100 74 C180 74 220 150 300 150 C380 150 420 74 500 74 C580 74 620 150 700 150 C780 150 820 74 900 74 C940 74 960 30 1000 30"
              fill="none"
              stroke="#c49a45"
              strokeWidth="2"
              strokeDasharray="7 7"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          {/* Senkrechte Linie (Mobil/Tablet) */}
          <span
            aria-hidden
            className="absolute top-12 bottom-12 left-[47px] border-l-2 border-dashed border-gold-500 lg:hidden"
          />

          <ol className="relative grid gap-7 lg:grid-cols-5 lg:gap-0">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="flex items-start gap-5 lg:flex-col lg:items-center lg:gap-5 lg:px-3.5 lg:text-center"
              >
                <div
                  className={clsx(
                    "relative z-10 h-24 w-24 shrink-0 rounded-full border-4 border-cream-100 bg-cocoa-800 shadow-[0_0_0_1px_#c49a45] lg:h-[148px] lg:w-[148px]",
                    i % 2 === 1 && "lg:mt-[76px]",
                  )}
                >
                  <div className="absolute inset-0 overflow-hidden rounded-full">
                    <Image
                      src={s.image}
                      alt={s.alt}
                      fill
                      sizes="(min-width: 1024px) 148px, 96px"
                      className="object-cover"
                    />
                  </div>
                  <span className="absolute -right-1 -bottom-1 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gold-500 text-[11px] font-bold text-cocoa-950 lg:right-0.5 lg:bottom-0.5 lg:h-[38px] lg:w-[38px] lg:text-[13px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 pt-1.5 lg:items-center lg:pt-0">
                  <span className="text-[11px] font-semibold tracking-[0.16em] text-gold-600 uppercase">
                    {s.eyebrow}
                  </span>
                  <h3 className="font-serif text-xl leading-snug lg:text-[21px]">
                    {s.title}
                  </h3>
                  <p className="max-w-[260px] text-sm leading-relaxed text-cocoa-700 lg:max-w-[230px]">
                    {s.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
