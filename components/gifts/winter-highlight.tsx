"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type WinterVariantView = {
  id: string;
  label: string;
  note: string;
  handle: string;
  price: string | null;
  image: string | null;
  available: boolean;
};

export function WinterHighlight({
  variants,
}: {
  variants: WinterVariantView[];
}) {
  const [active, setActive] = useState(variants[0]?.id);
  const current = variants.find((v) => v.id === active) ?? variants[0];
  const image = current?.image ?? variants.find((v) => v.image)?.image ?? null;

  return (
    <article
      aria-label="Saison-Highlight Winterreise"
      className="flex flex-col overflow-hidden rounded-sm border border-gold-600 bg-cocoa-900/95"
    >
      <div className="relative flex h-52 items-center justify-center bg-cocoa-800">
        {image ? (
          <Image
            src={image}
            alt="Winterreise Geschenkbox"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        ) : (
          <span className="font-serif text-3xl text-gold-300/70 italic">
            Winterreise
          </span>
        )}
        <span className="absolute top-4 left-4 rounded-sm bg-gold-500 px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] text-cocoa-950 uppercase">
          Saison-Highlight · Weihnachten
        </span>
      </div>
      <div className="flex flex-col gap-3.5 p-6 sm:px-7">
        <h2 className="font-serif text-3xl leading-tight">Winterreise</h2>
        <p className="text-[15px] leading-relaxed text-cream-300">
          Die schönste Reise des Jahres passt in eine Box. Winterliche Sorten,
          festlich verpackt, mit Karte zum Beschriften.
        </p>
        <div
          role="radiogroup"
          aria-label="Variante wählen"
          className="grid grid-cols-2 gap-2.5"
        >
          {variants.map((v) => (
            <button
              key={v.id}
              type="button"
              role="radio"
              aria-checked={v.id === current?.id}
              onClick={() => setActive(v.id)}
              className={clsx(
                "flex min-h-[60px] flex-col items-start justify-center rounded-sm border px-3.5 py-2.5 text-left transition-colors",
                v.id === current?.id
                  ? "border-gold-500 bg-gold-500/15"
                  : "border-cocoa-700 hover:border-cocoa-500",
              )}
            >
              <span className="text-sm font-semibold text-cream-50">
                {v.label}
              </span>
              <span className="text-xs text-cream-300">{v.note}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between gap-4 pt-1.5">
          {current?.available && current.price ? (
            <>
              <span className="text-xl font-semibold text-gold-300">
                {current.price}
              </span>
              <Link
                href={`/product/${current.handle}`}
                className="btn-gold min-h-[50px]"
              >
                Zur Box →
              </Link>
            </>
          ) : (
            <span className="text-sm font-medium text-cream-300">
              Bald erhältlich
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
