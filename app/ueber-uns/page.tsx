import { BeanIcon, HandshakeIcon, HeartIcon, LeafIcon, PinIcon, StarIcon } from "components/icons/brand";
import { brandImages } from "lib/brand-images";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Über uns",
  description:
    "Georgia Ramon – Craft Chocolate aus Soest. Unsere Geschichte, unser Team und warum wir Schokolade von der ganzen Kakaobohne an selbst herstellen.",
};

const timeline = [
  {
    year: "2015",
    title: "Die Gründung",
    text: "Georg Bernardini und Ramona Gustmann gründen Georgia Ramon im Frühjahr 2015 in Bonn-Oberkassel – in einem ehemaligen Café mit kleiner Schauproduktion. Aus ihren beiden Vornamen entsteht der Name der Marke.",
  },
  {
    year: "seit 2017",
    title: "Ausgezeichnet",
    text: "Unsere handgemachten Schokoladen werden mehrfach prämiert, unter anderem von der Academy of Chocolate und bei den International Chocolate Awards.",
  },
  {
    year: "2020",
    title: "Phillip übernimmt",
    text: "Im November 2020 übernimmt Phillip Butzmann das Unternehmen – Konditor, zertifizierter Chocolatier und studierter Lebensmitteltechnologe mit Schwerpunkt Süßwaren.",
  },
  {
    year: "2024",
    title: "Weiter in Phillips Sinne",
    text: "Seine Eltern Constanze und Ralf führen Georgia Ramon weiter. Die Produktion zieht nach Soest – und die Marke wächst so, wie Phillip es geplant hatte.",
  },
];

// Rollen/Fotos ergänzen, sobald vorhanden.
const team: { name: string; role?: string }[] = [
  { name: "Constanze" },
  { name: "Ralf" },
  { name: "Jelena" },
  { name: "Ines" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-cocoa-950 text-cream-50">
        <Image
          src={brandImages.mission}
          alt="Schokoladenherstellung bei Georgia Ramon"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cocoa-950 via-cocoa-950/70 to-transparent" />
        <div className="container-shop relative py-20 md:py-28">
          <p className="eyebrow text-gold-400">Über uns</p>
          <h1 className="mt-3 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Craft Chocolate aus Soest.
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-cream-200 sm:text-base">
            Wir sind Constanze, Ralf, Jelena und Ines – und wir haben einen Anspruch: die beste
            Schokolade herzustellen. Kleine Tafeln, ganz eigene Geschmacksprofile und eine
            Verpackung, die man nicht übersieht.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="container-shop grid items-center gap-10 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-cream-100 sm:aspect-[4/3] lg:aspect-[4/5]">
          <Image src={brandImages.craft} alt="Handarbeit in der Manufaktur" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div>
          <p className="eyebrow text-gold-600">Die Mission</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
            Alles beginnt mit der ganzen Kakaobohne.
          </h2>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-cocoa-700">
            <p>
              Wir kaufen keine fertige Kuvertüre, sondern verarbeiten ganze Kakaobohnen selbst. Jede
              Bohne wird von Hand verlesen, hell geröstet, gebrochen und fein gemahlen.
            </p>
            <p>
              So holen wir heraus, was jeden Ursprung einzigartig macht – fruchtig, nussig, erdig
              oder blumig. Deshalb schmeckt bei uns jede Tafel anders.
            </p>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {[
              { Icon: BeanIcon, t: "Handverlesen" },
              { Icon: HeartIcon, t: "Hell geröstet" },
              { Icon: StarIcon, t: "Prämiert" },
              { Icon: PinIcon, t: "Made in Soest" },
            ].map(({ Icon, t }) => (
              <li key={t} className="flex flex-col items-start gap-2">
                <Icon className="h-8 w-8 text-cocoa-700" />
                <span className="text-xs font-semibold tracking-[0.1em] uppercase">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Herkunft & Verantwortung */}
      <section className="bg-cream-100">
        <div className="container-shop grid items-center gap-10 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
          <div className="lg:order-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-cream-200">
              <Image src={brandImages.sourcing} alt="Kakao vom Ursprung" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </div>
          <div className="lg:order-1">
            <p className="eyebrow text-gold-600">Bio, fair & gegen Kinderarbeit</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
              Wir wissen, woher unser Kakao kommt.
            </h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-cocoa-700">
              <p>
                Unsere Kakaobohnen kaufen wir teils direkt bei Plantagen, teils bei Händlern, denen
                wir vertrauen – etwa Crafting Markets aus den Niederlanden.
              </p>
              <p>
                Faire Bezahlung für die Kakaobauern ist für uns genauso selbstverständlich wie der
                Ausschluss von Kinderarbeit. Alle Kakaobohnen und unsere Kakaobutter sind
                bio-zertifiziert.
              </p>
            </div>
            <ul className="mt-8 space-y-3 text-sm">
              {[
                { Icon: LeafIcon, t: "Bio-zertifizierte Kakaobohnen & Kakaobutter (DE-ÖKO-003)" },
                { Icon: HandshakeIcon, t: "Fairer Handel oder Direktbezug beim Produzenten" },
                { Icon: HeartIcon, t: "Keine Kinderarbeit – von unseren Partnern garantiert" },
              ].map(({ Icon, t }) => (
                <li key={t} className="flex items-center gap-3">
                  <Icon className="h-6 w-6 shrink-0 text-leaf-600" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Kreativität */}
      <section className="container-shop py-16 text-center md:py-24">
        <p className="eyebrow text-gold-600">Kreativität</p>
        <h2 className="mx-auto mt-3 max-w-2xl font-serif text-3xl leading-tight sm:text-4xl">
          Klassiker als Basis. Und dann wird es spannend.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-cocoa-700">
          Neben puren Ursprungsschokoladen probieren wir gern Neues: vegane Schokolade mit Roter Bete
          und Kokosnuss, Sanddorn & Joghurt oder eine fruchtig-saure Himbeer-Schokolade mit edlem
          Rosenöl. Wir wollen zeigen, was mit Schokolade alles möglich ist.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/search/schokolade-veredelt" className="btn-dark">
            Kreationen entdecken
          </Link>
          <Link href="/probierbox" className="inline-flex items-center justify-center rounded-sm border border-cocoa-900 px-6 py-3.5 text-xs font-semibold tracking-[0.14em] uppercase hover:bg-cocoa-900 hover:text-cream-50">
            Probierbox zusammenstellen
          </Link>
        </div>
      </section>

      {/* Geschichte */}
      <section className="bg-cocoa-950 text-cream-50">
        <div className="container-shop py-16 md:py-24">
          <div className="text-center">
            <p className="eyebrow text-gold-400">Unsere Geschichte</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">Von Bonn nach Soest</h2>
          </div>
          <ol className="relative mt-12 grid gap-10 md:grid-cols-4 md:gap-6">
            <span aria-hidden className="absolute top-[11px] right-0 left-0 hidden h-px bg-gold-500/40 md:block" />
            {timeline.map((t) => (
              <li key={t.year} className="relative pl-8 md:pl-0">
                <span aria-hidden className="absolute top-1 left-0 h-[22px] w-[22px] rounded-full border-2 border-gold-500 bg-cocoa-950 md:relative md:top-0 md:block" />
                <p className="font-serif text-2xl text-gold-400 md:mt-5">{t.year}</p>
                <p className="mt-1 text-sm font-semibold tracking-[0.08em] uppercase">{t.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-cream-300">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* In Erinnerung an Phillip */}
      <section className="container-shop grid items-center gap-10 py-16 md:grid-cols-[2fr_3fr] md:py-24 lg:gap-16">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-sm bg-cream-100">
          <Image src={brandImages.phillip} alt="Phillip Butzmann" fill sizes="(min-width: 768px) 35vw, 90vw" className="object-cover" />
        </div>
        <div>
          <p className="eyebrow text-gold-600">In Erinnerung an Phillip</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">Phillip Butzmann</h2>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-cocoa-700">
            <p>
              Phillip war gelernter Konditor und zertifizierter Chocolatier. Er lernte bei
              Bean-to-Bar-Herstellern in ganz Europa, studierte Lebensmitteltechnologie mit
              Schwerpunkt Süßwaren und produzierte zunächst in Siegburg. Ende 2020 übernahm er
              Georgia Ramon.
            </p>
            <p>
              Im Herbst 2023 ist Phillip verstorben – ein tiefer Verlust für uns und das junge
              Unternehmen. Seine Eltern Constanze und Ralf führen Georgia Ramon seit Anfang 2024
              weiter, heute in Soest, und entwickeln die Marke so weiter, wie Phillip es sich
              vorgestellt hat.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-cream-100">
        <div className="container-shop grid items-center gap-10 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-cream-200">
            <Image src={brandImages.today} alt="Das Team von Georgia Ramon in Soest" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <p className="eyebrow text-gold-600">Das Team</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
              Die Menschen hinter der Schokolade
            </h2>
            <ul className="mt-8 grid grid-cols-2 gap-4">
              {team.map((m) => (
                <li key={m.name} className="rounded-sm border border-cream-300 bg-cream-50 p-5">
                  <p className="font-serif text-xl">{m.name}</p>
                  {m.role ? <p className="mt-1 text-xs text-cocoa-500">{m.role}</p> : null}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-cocoa-700">
              <strong>Georgia Ramon GmbH & Co. KG</strong>
              <br />
              Gebrüder-Ernst-Weg 4, 59494 Soest
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-shop py-16 text-center md:py-20">
        <h2 className="font-serif text-3xl sm:text-4xl">Schmeck den Unterschied.</h2>
        <p className="mx-auto mt-3 max-w-lg text-[15px] text-cocoa-700">
          Am besten probierst du dich durch – mit 6 oder 10 Sorten deiner Wahl in der Probierbox.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/probierbox" className="btn-gold">
            Probierbox zusammenstellen
          </Link>
          <Link href="/search" className="btn-dark">
            Alle Sorten ansehen
          </Link>
        </div>
      </section>
    </>
  );
}
