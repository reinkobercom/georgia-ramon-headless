"use client";

import clsx from "clsx";
import { giftFilters, type GiftBox, type GiftCategory } from "lib/gift-boxes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type GiftBoxView = GiftBox & {
  price: string | null;
  image: string | null;
  available: boolean;
};

const tagClass: Record<GiftBox["tagStyle"], string> = {
  dark: "bg-cocoa-950 text-gold-300",
  light: "bg-cream-50 text-cocoa-900",
  gold: "bg-gold-500 text-cocoa-950",
  green: "bg-leaf-600 text-cream-50",
};

export function GiftGrid({ boxes }: { boxes: GiftBoxView[] }) {
  const [filter, setFilter] = useState<"alle" | GiftCategory>("alle");
  const visible = boxes.filter(
    (b) => filter === "alle" || b.categories.includes(filter),
  );

  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-serif text-3xl leading-tight sm:text-4xl">
          Alle Geschenkboxen
        </h2>
        <div
          role="group"
          aria-label="Nach Anlass filtern"
          className="flex flex-wrap gap-2"
        >
          {giftFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={clsx(
                "min-h-11 rounded-full border px-4 text-[13px] transition-colors",
                filter === f.id
                  ? "border-cocoa-900 bg-cocoa-900 font-semibold text-cream-50"
                  : "border-cream-300 bg-white text-cocoa-700 hover:border-cocoa-500",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((b) => (
          <li
            key={b.id}
            className="flex flex-col overflow-hidden rounded-sm border border-cream-300 bg-white transition-colors hover:border-gold-500"
          >
            <div
              className={clsx(
                "relative flex h-60 items-center justify-center",
                b.tone === "dark" ? "bg-cocoa-800" : "bg-cream-200",
              )}
            >
              {b.image ? (
                <Image
                  src={b.image}
                  alt={b.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <span
                  className={clsx(
                    "font-serif text-2xl italic",
                    b.tone === "dark"
                      ? "text-gold-300/70"
                      : "text-cocoa-500/70",
                  )}
                >
                  {b.title}
                </span>
              )}
              <span
                className={clsx(
                  "absolute top-3.5 left-3.5 rounded-sm px-2.5 py-1.5 text-[10px] font-bold tracking-[0.16em] uppercase",
                  tagClass[b.tagStyle],
                )}
              >
                {b.tag}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-6">
              <h3 className="font-serif text-[1.55rem] leading-tight">
                {b.title}
              </h3>
              <p className="text-sm leading-relaxed text-cocoa-700">{b.text}</p>
              {b.tip ? (
                <p className="rounded-sm bg-cream-100 px-3 py-2 text-[13px] text-cocoa-700">
                  <strong className="font-semibold">Tipp:</strong> {b.tip}
                </p>
              ) : null}
              <div className="mt-auto flex items-center justify-between gap-3 border-t border-cream-200 pt-4">
                {b.available && b.price ? (
                  <>
                    <span className="text-[17px] font-semibold">{b.price}</span>
                    <Link
                      href={`/product/${b.handle}`}
                      className="btn-dark min-h-11 px-5"
                    >
                      Zur Box
                    </Link>
                  </>
                ) : (
                  <span className="text-sm font-medium text-cocoa-500">
                    Bald erhältlich
                  </span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
