import type { Product } from "lib/shopify/types";
import { tasteNotes } from "./steckbrief";

/** Teilt die Shopify-Beschreibung in Einleitung und die Aufklapper (Zutaten, Nährwerte …). */
export function splitDescription(html: string) {
  const clean = html.replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<!--[\s\S]*?-->/g, "");
  const marker = clean.search(/<h2[^>]*>\s*Weitere Informationen\s*<\/h2>/i);
  const introHtml = (marker >= 0 ? clean.slice(0, marker) : clean)
    .replace(/<hr[^>]*>\s*$/i, "")
    .trim();
  const rest = marker >= 0 ? clean.slice(marker) : "";

  const sections: { title: string; html: string }[] = [];
  const re = /<details[^>]*>\s*<summary[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(rest))) {
    const title = m[1]!
      .replace(/<[^>]+>/g, "")
      .replace(/[▾▸▼►]/g, "")
      .trim();
    const body = m[2]!.replace(/<meta[^>]*>/gi, "").trim();
    if (title && body) sections.push({ title, html: body });
  }

  // Fallback: Beschreibung ohne Aufklapper komplett als Einleitung zeigen
  return { introHtml: introHtml || clean, sections };
}

const ORIGINS: Record<string, string> = {
  honduras: "Honduras",
  panama: "Panama",
  brasilien: "Brasilien",
  tanzania: "Tansania",
  peru: "Peru",
  chuncho: "Peru",
  haiti: "Haiti",
  belize: "Belize",
  guatemala: "Guatemala",
  madagascar: "Madagaskar",
  mexico: "Mexiko",
  mexiko: "Mexiko",
};

export type Steckbrief = { label: string; value: string }[];

/** Steckbrief aus Shopify-Tags und Produktname – keine erfundenen Angaben. */
export function buildSteckbrief(product: Product): Steckbrief {
  const tags = product.tags.map((t) => t.toLowerCase());
  const has = (t: string) => tags.includes(t);
  const rows: Steckbrief = [];

  const originKey =
    tags.find((t) => ORIGINS[t]) ??
    Object.keys(ORIGINS).find((k) => product.title.toLowerCase().includes(k));
  if (originKey) rows.push({ label: "Herkunft", value: ORIGINS[originKey]! });

  const pct = product.title.match(/(\d{2,3})\s?%/);
  if (pct) rows.push({ label: "Kakaoanteil", value: `${pct[1]} %` });

  const sorte = has("vegan")
    ? "Vegan"
    : has("weiss")
      ? "Weiße Schokolade"
      : has("vollmilch") || has("milchschokolade")
        ? "Milchschokolade"
        : has("dunkel")
          ? "Dunkle Schokolade"
          : null;
  if (sorte) rows.push({ label: "Sorte", value: sorte });

  if (has("pur")) rows.push({ label: "Art", value: "Pur – Ursprungsschokolade" });
  else if (has("veredelt")) rows.push({ label: "Art", value: "Veredelt" });

  const notes = tasteNotes[product.handle];
  if (notes?.length) rows.push({ label: "Geschmack", value: notes.join(" · ") });

  const extras = [
    has("bio") && "Bio",
    has("glutenfrei") && "Glutenfrei",
    has("zuckerfrei") && "Ohne Zuckerzusatz",
  ].filter(Boolean) as string[];
  if (extras.length) rows.push({ label: "Besonderheiten", value: extras.join(" · ") });

  return rows;
}
