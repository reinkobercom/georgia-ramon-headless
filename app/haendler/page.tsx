import {
  BoxIcon,
  GiftIcon,
  HandshakeIcon,
  LeafIcon,
  StarIcon,
  TruckIcon,
} from "components/icons/brand";
import { brandImages } from "lib/brand-images";
import Image from "next/image";
import { DealerForm } from "./dealer-form";

export const metadata = {
  title: "Für Händler & Partner",
  description:
    "Georgia Ramon für Feinkost, Cafés, Hotels und Firmenkunden: Bean-to-Bar Schokolade aus Soest im Handel. Jetzt anfragen.",
};

const audiences = [
  {
    Icon: BoxIcon,
    t: "Feinkost & Unverpackt",
    d: "Craft Chocolate für euer Sortiment – auffällig verpackt, mit Geschichte.",
  },
  {
    Icon: StarIcon,
    t: "Cafés & Restaurants",
    d: "Trinkschokolade, Tafeln und Kakao-Nibs für Gastronomie.",
  },
  {
    Icon: GiftIcon,
    t: "Firmenkunden",
    d: "Präsente für Kund:innen und Team – gern auch in größeren Mengen.",
  },
  {
    Icon: HandshakeIcon,
    t: "Hotels & Concierge",
    d: "Kleine Aufmerksamkeiten mit regionalem Charakter.",
  },
];

export default function DealerPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-cocoa-950 text-cream-50">
        <Image
          src={brandImages.craft}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cocoa-950 via-cocoa-950/80 to-cocoa-950/30" />
        <div className="container-shop relative py-16 md:py-24">
          <p className="eyebrow text-gold-400">Für Händler & Partner</p>
          <h1 className="mt-3 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
            Craft Chocolate aus Soest für euer Sortiment.
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-cream-200">
            Ihr möchtet Georgia Ramon verkaufen, verschenken oder in eurer
            Gastronomie anbieten? Schreibt uns – wir melden uns persönlich mit
            Konditionen und Mustern.
          </p>
          <div className="mt-7 inline-flex items-center gap-3 rounded-sm border border-gold-500/60 bg-cocoa-900/80 px-4 py-3 text-sm">
            <span className="rounded-sm bg-gold-500 px-2 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-cocoa-950 uppercase">
              Bald
            </span>
            Unser B2B-Shop mit Händlerpreisen und Direktbestellung ist in
            Vorbereitung.
          </div>
        </div>
      </section>

      <section className="container-shop py-14 md:py-20">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map(({ Icon, t, d }) => (
            <li
              key={t}
              className="rounded-sm border border-cream-300 bg-white/60 p-6"
            >
              <Icon className="h-9 w-9 text-cocoa-700" />
              <p className="mt-4 font-semibold">{t}</p>
              <p className="mt-1.5 text-sm text-cocoa-500">{d}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-cream-100">
        <div className="container-shop grid gap-10 py-14 md:py-20 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow text-gold-600">Anfrage</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
              Lasst uns sprechen.
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-cocoa-700">
              <li className="flex items-center gap-3">
                <StarIcon className="h-5 w-5 shrink-0 text-gold-600" />
                Ausgezeichnet von Academy of Chocolate & International Chocolate
                Awards
              </li>
              <li className="flex items-center gap-3">
                <LeafIcon className="h-5 w-5 shrink-0 text-gold-600" />
                Bio-zertifizierte Schokolade
              </li>
              <li className="flex items-center gap-3">
                <HandshakeIcon className="h-5 w-5 shrink-0 text-gold-600" />
                Persönliche Betreuung direkt aus der Manufaktur
              </li>
            </ul>
            <p className="mt-8 text-sm text-cocoa-700">
              Lieber direkt?{" "}
              <a
                href="mailto:info@georgia-ramon.com"
                className="font-semibold underline"
              >
                info@georgia-ramon.com
              </a>
            </p>
          </div>
          <DealerForm />
        </div>
      </section>
    </>
  );
}
