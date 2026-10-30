"use client";

import { CheckIcon, MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { BoxIcon, LockIcon } from "components/icons/brand";
import { BOX } from "lib/box";
import type { BoxFilter } from "lib/catalog";
import { formatPrice } from "lib/format";
import Image from "next/image";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export type BoxProduct = {
  handle: string;
  title: string;
  subtitle: string;
  image: string | null;
  price: number;
  variantId: string;
  available: boolean;
};

type Sort = "popular" | "price-asc" | "price-desc" | "name";

export function BoxBuilder({
  products,
  filters,
}: {
  products: BoxProduct[];
  filters: BoxFilter[];
}) {
  const [selection, setSelection] = useState<Record<string, number>>({});
  const [filter, setFilter] = useState<string>("all");
  const [sort, setSort] = useState<Sort>("popular");
  const [sheetOpen, setSheetOpen] = useState(false);

  const count = Object.values(selection).reduce((a, b) => a + b, 0);
  const remaining = BOX.size - count;
  const complete = remaining === 0;
  const byHandle = useMemo(
    () => Object.fromEntries(products.map((p) => [p.handle, p])),
    [products],
  );
  const selectedItems = Object.entries(selection)
    .filter(([, qty]) => qty > 0)
    .map(([handle, qty]) => ({ product: byHandle[handle]!, qty }));
  const singleValue = selectedItems.reduce((sum, i) => sum + i.product.price * i.qty, 0);

  const visible = useMemo(() => {
    const active = filters.find((f) => f.key === filter);
    const list = active ? products.filter((p) => active.handles.includes(p.handle)) : [...products];
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "name") list.sort((a, b) => a.title.localeCompare(b.title, "de"));
    // Ausverkaufte Sorten ans Ende
    return list.sort((a, b) => Number(b.available) - Number(a.available));
  }, [products, filters, filter, sort]);

  function change(handle: string, delta: number) {
    setSelection((prev) => {
      const current = prev[handle] ?? 0;
      const total = Object.values(prev).reduce((a, b) => a + b, 0);
      if (delta > 0 && total >= BOX.size) {
        toast(`Deine Box ist voll – ${BOX.size} von ${BOX.size} Tafeln gewählt.`);
        return prev;
      }
      const next = Math.max(0, current + delta);
      return { ...prev, [handle]: next };
    });
  }

  function addBoxToCart() {
    if (!complete) return;
    // Technische Anbindung (Bundle mit Festpreis in Shopify) folgt im nächsten Schritt.
    toast("Deine Box ist vollständig! Die Verbindung zum Checkout wird im nächsten Schritt angebunden.");
  }

  const summary = (
    <SummaryContent
      count={count}
      remaining={remaining}
      items={selectedItems}
      singleValue={singleValue}
      onRemove={(h) => change(h, -999)}
      onSubmit={addBoxToCart}
    />
  );

  return (
    <div className="container-shop">
      {/* Schritt 1: Box-Konditionen (aktuell nur die 10er-Box) */}
      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <div>
          <div className="relative flex flex-col gap-5 rounded-sm border-2 border-gold-500 bg-white/60 p-6 sm:flex-row sm:items-center sm:p-8">
            <span className="absolute -top-3 left-6 rounded-sm bg-gold-500 px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-cocoa-950 uppercase">
              Probierbox
            </span>
            <BoxIcon className="h-14 w-14 shrink-0 text-cocoa-700" />
            <div className="flex-1">
              <p className="font-serif text-2xl sm:text-3xl">{BOX.size}er Box</p>
              <p className="mt-1 text-sm text-cocoa-500">
                {BOX.size} Tafeln deiner Wahl – zum Entdecken, Teilen & Verschenken
              </p>
            </div>
            <div className="sm:text-right">
              <p className="font-serif text-3xl">{formatPrice(BOX.price)}</p>
              <p className="text-xs text-cocoa-500">
                statt <span className="line-through">{formatPrice(BOX.compareAt)}</span>
              </p>
              <p className="mt-2 inline-block rounded-sm bg-cream-200 px-2 py-1 text-xs font-semibold text-gold-600">
                {formatPrice(BOX.compareAt - BOX.price)} sparen
              </p>
            </div>
          </div>

          {/* Schritt 2: Sorten wählen */}
          <div className="mt-10 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
            <h2 className="font-serif text-2xl">Wähle deine Schokoladen</h2>
            <p className="text-sm text-cocoa-500">
              ({count} von {BOX.size})
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
              <Chip active={filter === "all"} onClick={() => setFilter("all")}>
                Alle Sorten
              </Chip>
              {filters.map((f) => (
                <Chip key={f.key} active={filter === f.key} onClick={() => setFilter(f.key)}>
                  {f.label}
                </Chip>
              ))}
            </div>
            <label className="flex items-center gap-2 text-xs text-cocoa-500">
              <span className="sr-only md:not-sr-only">Sortieren</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="rounded-sm border border-cream-300 bg-white px-3 py-2 text-base text-cocoa-900 md:text-sm"
              >
                <option value="popular">Nach Beliebtheit</option>
                <option value="price-asc">Preis aufsteigend</option>
                <option value="price-desc">Preis absteigend</option>
                <option value="name">Name A–Z</option>
              </select>
            </label>
          </div>

          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
            {visible.map((p) => (
              <li key={p.handle}>
                <BarCard
                  product={p}
                  qty={selection[p.handle] ?? 0}
                  full={remaining <= 0}
                  onAdd={() => change(p.handle, 1)}
                  onRemove={() => change(p.handle, -1)}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop: mitlaufende Box */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-sm border border-cream-300 bg-white p-6 shadow-sm">
            {summary}
          </div>
        </aside>
      </div>

      {/* Mobil: Leiste am unteren Rand + ausklappbare Übersicht */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-cocoa-700 bg-cocoa-950 text-cream-50 lg:hidden">
        {sheetOpen ? (
          <div className="max-h-[60vh] overflow-y-auto bg-cream-50 px-4 py-5 text-cocoa-900">
            {summary}
          </div>
        ) : null}
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            type="button"
            onClick={() => setSheetOpen((o) => !o)}
            className="flex flex-1 flex-col items-start text-left"
            aria-expanded={sheetOpen}
          >
            <span className="text-sm font-semibold">
              {count} von {BOX.size} Tafeln {sheetOpen ? "▾" : "▴"}
            </span>
            <span className="text-xs text-cream-300">
              {complete ? "Deine Box ist komplett" : `Noch ${remaining} wählen`} ·{" "}
              {formatPrice(BOX.price)}
            </span>
          </button>
          <button
            type="button"
            onClick={addBoxToCart}
            disabled={!complete}
            className="btn-gold px-4 py-3 disabled:cursor-not-allowed disabled:opacity-50"
          >
            In den Warenkorb
          </button>
        </div>
        <ProgressBar count={count} className="h-1 rounded-none bg-cocoa-800" />
      </div>
    </div>
  );
}

function SummaryContent({
  count,
  remaining,
  items,
  singleValue,
  onRemove,
  onSubmit,
}: {
  count: number;
  remaining: number;
  items: { product: BoxProduct; qty: number }[];
  singleValue: number;
  onRemove: (handle: string) => void;
  onSubmit: () => void;
}) {
  const complete = remaining === 0;
  return (
    <div>
      <p className="flex items-center gap-2 eyebrow">
        <BoxIcon className="h-5 w-5" />
        Deine Box
      </p>
      <div className="mt-4 flex gap-1.5" aria-hidden>
        {Array.from({ length: BOX.size }).map((_, i) => (
          <span
            key={i}
            className={clsx(
              "h-3 flex-1 rounded-full border",
              i < count ? "border-cocoa-900 bg-cocoa-900" : "border-cream-300 bg-transparent",
            )}
          />
        ))}
      </div>
      <p className="mt-3 text-sm text-cocoa-700">
        {count} von {BOX.size} Tafeln ausgewählt
      </p>

      {items.length ? (
        <ul className="mt-4 divide-y divide-cream-200 border-y border-cream-200">
          {items.map(({ product, qty }) => (
            <li key={product.handle} className="flex items-center gap-3 py-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-sm bg-cream-100">
                {product.image ? (
                  <Image src={product.image} alt="" fill sizes="48px" className="object-cover" />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">
                  {qty > 1 ? `${qty}× ` : ""}
                  {product.title}
                </p>
                {product.subtitle ? (
                  <p className="truncate text-xs text-cocoa-500">{product.subtitle}</p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => onRemove(product.handle)}
                aria-label={`${product.title} entfernen`}
                className="p-1 text-cocoa-500 hover:text-cocoa-900"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 rounded-sm bg-cream-100 p-4 text-xs text-cocoa-500">
          Klicke bei einer Sorte auf „Hinzufügen“, um sie in deine Box zu legen.
        </p>
      )}

      <dl className="mt-5 space-y-1.5 text-sm">
        <div className="flex justify-between text-cocoa-500">
          <dt>Einzelpreis deiner Auswahl</dt>
          <dd>{formatPrice(singleValue)}</dd>
        </div>
        <div className="flex justify-between text-base font-semibold">
          <dt>Boxpreis</dt>
          <dd>{formatPrice(BOX.price)}</dd>
        </div>
      </dl>
      <p
        className={clsx(
          "mt-3 text-sm font-semibold",
          complete ? "text-leaf-600" : "text-gold-600",
        )}
      >
        {complete
          ? "Perfekt – deine Box ist komplett!"
          : `Noch ${remaining} ${remaining === 1 ? "Tafel" : "Tafeln"} auswählen`}
      </p>

      <button
        type="button"
        onClick={onSubmit}
        disabled={!complete}
        className="btn-dark mt-4 w-full py-4 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Box in den Warenkorb →
      </button>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-cocoa-500">
        <LockIcon className="h-3.5 w-3.5" />
        Sichere Zahlung mit SSL-Verschlüsselung
      </p>
    </div>
  );
}

function BarCard({
  product,
  qty,
  full,
  onAdd,
  onRemove,
}: {
  product: BoxProduct;
  qty: number;
  full: boolean;
  onAdd: () => void;
  onRemove: () => void;
}) {
  const selected = qty > 0;
  return (
    <div
      className={clsx(
        "flex h-full flex-col rounded-sm border bg-white p-2.5 transition-colors sm:p-3",
        selected ? "border-leaf-600 ring-1 ring-leaf-600" : "border-cream-300",
        !product.available && "opacity-60",
      )}
    >
      <div className="relative aspect-square overflow-hidden rounded-sm bg-cream-100">
        {selected ? (
          <span className="absolute top-2 left-2 z-10 flex items-center gap-1 rounded-sm bg-leaf-600 px-1.5 py-0.5 text-[9px] font-semibold tracking-[0.1em] text-white uppercase">
            <CheckIcon className="h-3 w-3" />
            {qty}× gewählt
          </span>
        ) : null}
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 1280px) 200px, (min-width: 640px) 30vw, 45vw"
            className="object-cover"
          />
        ) : null}
      </div>
      <p className="mt-3 text-sm leading-snug font-semibold">{product.title}</p>
      {product.subtitle ? <p className="mt-0.5 text-xs text-cocoa-500">{product.subtitle}</p> : null}
      <p className="mt-1 text-xs text-cocoa-500">Einzeln {formatPrice(product.price)}</p>

      <div className="mt-auto pt-3">
        {!product.available ? (
          <p className="rounded-sm border border-cream-300 py-2 text-center text-xs text-cocoa-500">
            Ausverkauft
          </p>
        ) : selected ? (
          <div className="flex items-center justify-between rounded-sm border border-cocoa-900">
            <button
              type="button"
              onClick={onRemove}
              aria-label={`${product.title} – eine weniger`}
              className="flex h-10 w-10 items-center justify-center"
            >
              <MinusIcon className="h-4 w-4" />
            </button>
            <span className="text-sm font-semibold">{qty}</span>
            <button
              type="button"
              onClick={onAdd}
              disabled={full}
              aria-label={`${product.title} – eine mehr`}
              className="flex h-10 w-10 items-center justify-center disabled:opacity-30"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onAdd}
            disabled={full}
            className="flex h-10 w-full items-center justify-center gap-1.5 rounded-sm border border-cocoa-900 text-xs font-semibold transition-colors hover:bg-cocoa-900 hover:text-cream-50 disabled:cursor-not-allowed disabled:border-cream-300 disabled:text-cocoa-500 disabled:hover:bg-transparent"
          >
            <PlusIcon className="h-4 w-4" />
            Hinzufügen
          </button>
        )}
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-colors",
        active
          ? "border-cocoa-900 bg-cocoa-900 text-cream-50"
          : "border-cream-300 bg-white text-cocoa-700 hover:border-cocoa-900",
      )}
    >
      {children}
    </button>
  );
}

function ProgressBar({ count, className }: { count: number; className?: string }) {
  return (
    <div className={clsx("overflow-hidden", className)}>
      <div
        className="h-full bg-gold-500 transition-all"
        style={{ width: `${(count / BOX.size) * 100}%` }}
      />
    </div>
  );
}
