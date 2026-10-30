import { ConsentSettingsLink } from "components/consent/consent";
import { HeartIcon } from "components/icons/brand";
import Logo from "components/logo-square";
import { getMenu } from "lib/shopify";
import { buildMainNav } from "lib/navigation";
import Link from "next/link";
import { Certificates } from "./certificates";
import { NewsletterForm } from "./newsletter-form";
import { SocialIcons } from "./social-icons";


export default async function Footer() {
  const currentYear = new Date().getFullYear();
  // Rechtliche Links kommen aus dem Shopify-Menü „footer“.
  const [legal, main] = await Promise.all([
    getMenu("footer").catch(() => []),
    getMenu("main-menu").catch(() => []),
  ]);
  const nav = buildMainNav(main);
  const shopGroup = nav.find((i) => i.items?.length);
  const discover = nav.filter((i) => !i.items?.length);

  return (
    <footer className="bg-cocoa-950 text-cream-200">
      <Certificates />
      <div className="border-b border-cocoa-700">
        <div className="container-shop flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md">
            <p className="font-serif text-2xl text-cream-50">Schokolade im Postfach.</p>
            <p className="mt-2 text-sm text-cream-300">
              10 % auf deine erste Bestellung sichern und als Erste:r von neuen Sorten,
              Limited Editions und exklusiven Aktionen erfahren.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      <div className="container-shop grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="inline-block text-cream-50" aria-label="Startseite">
            <Logo />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream-300">
            Bean-to-Bar Schokolade aus Soest. Von der Kakaobohne bis zur Tafel – in
            unserer eigenen Manufaktur.
          </p>
          <SocialIcons className="mt-6" />
        </div>
        <FooterColumn title={shopGroup?.title ?? "Shop"} items={shopGroup?.items ?? []} />
        <FooterColumn title="Entdecken" items={discover} />
        <FooterColumn title="Service & Rechtliches" items={legal} />
      </div>

      <div className="border-t border-cocoa-700">
        <div className="container-shop flex flex-col gap-2 py-6 text-xs text-cream-300 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {currentYear} Georgia Ramon – mit{" "}
            <HeartIcon aria-label="Herz" className="inline h-3.5 w-3.5 -translate-y-px fill-gold-500 text-gold-500" />{" "}
            gemacht in Soest
          </p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>Alle Preise inkl. MwSt., zzgl. Versandkosten.</span>
            <ConsentSettingsLink className="underline hover:text-gold-300" />
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { title: string; path: string }[];
}) {
  if (!items.length) return null;
  return (
    <div>
      <p className="eyebrow mb-4 text-gold-400">{title}</p>
      <ul className="space-y-2.5 text-sm">
        {items.map((item) => (
          <li key={item.title}>
            <Link href={item.path} className="transition-colors hover:text-gold-300">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
