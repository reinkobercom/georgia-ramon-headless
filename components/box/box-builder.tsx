"use client";

import { CheckIcon, MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { BoxIcon, LockIcon, VeganIcon } from "components/icons/brand";
import { VeganBadge } from "components/product-card";
import { addBoxToCart } from "components/cart/actions";
import { BOX_OPTIONS, type BoxOption } from "lib/box";
import type { BoxFilter } from "lib/catalog";
import { formatPrice } from "lib/format";
import Image from "next/image";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

export type BoxProduct = {
  handle: string;
  title: string;
  subtitle: string;
  image: string | null;
  price: number;
  variantId: string;
  available: boolean;
  vegan: boolean;
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
  const [box, setBox] = useState<BoxOption>(
    BOX_OPTIONS.find((o) => o.popular) ?? BOX_OPTIONS[0]!,
  );
  const [pending, startTransition] = useTransition();

  const count = Object.values(selection).reduce((a, b) => a + b, 0);
  const remaining = box.size - count;
  const complete = remaining === 0;
  const byHandle = useMemo(
    () => Object.fromEntries(products.map((p) => [p.handle, p])),
    [products],
  );
  const selectedItems = Object.entries(selection)
    .filter(([, qty]) => qty > 0)
    .map(([handle, qty]) => ({ product: byHandle[handle]!, qty }));
  const singleValue = selectedItems.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const boxValue = singleValue * (1 - box.discount / 100);

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
      if (delta > 0 && total >= box.size) {
        toast(`Deine Box ist voll – ${box.size} von ${box.size} Tafeln gewählt.`);
        return prev;
      }
      const next = Math.max(0, current + delta);
      return { ...prev, [handle]: next };
    });
  }

  function submitBox() {
    if (!complete || pending) return;
    startTransition(async () => {
      const res = await addBoxToCart({
        boxLabel: `${box.size}er Entdeckerbox`,
        code: box.code,
        lines: selectedItems.map(({ product, qty }) => ({
          merchandiseId: product.variantId,
          quantity: qty,
        })),
      });
      if (res.ok) {
        toast.success(`Deine ${box.size}er Entdeckerbox liegt im Warenkorb – ${box.discount} % Box-Rabatt inklusive.`);
        setSelection({});
        setSheetOpen(false);
      } else {
        toast.error("Das hat leider nicht geklappt. Bitte versuche es noch einmal.");
      }
    });
  }

  const summary = (
    <SummaryContent
      count={count}
      remaining={remaining}
      items={selectedItems}
      singleValue={singleValue}
      boxValue={boxValue}
      box={box}
      pending={pending}
      onRemove={(h) => change(h, -999)}
      onSubmit={submitBox}
    />
  );

  return (
    <div className="container-shop">
      {/* Schritt 1: Box-Konditionen (aktuell nur die 10er-Box) */}
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0">
          <p className="eyebrow mb-3 text-cocoa-500">1. Wähle deine Box</p>
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {BOX_OPTIONS.map((o) => {
              const active = o.size === box.size;
              return (
                <button
                  key={o.size}
                  type="button"
                  onClick={() => setBox(o)}
                  aria-pressed={active}
                  className={clsx(
                    "relative flex flex-col items-start rounded-sm border-2 bg-white/70 p-4 text-left transition-colors sm:p-6",
                    active ? "border-gold-500" : "border-cream-300 hover:border-cocoa-500",
                  )}
                >
                  {o.popular ? (
                    <span className="absolute -top-3 left-4 rounded-sm bg-gold-500 px-2 py-0.5 text-[9px] font-semibold tracking-[0.14em] text-cocoa-950 uppercase sm:text-[10px]">
                      Beliebteste Wahl
                    </span>
                  ) : null}
                  <span className="flex w-full items-center justify-between gap-2">
                    <span className="font-serif text-2xl sm:text-3xl">{o.label}</span>
                    <span
                      className={clsx(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                        active ? "border-gold-500" : "border-cream-300",
                      )}
                    >
                      {active ? <span className="h-2.5 w-2.5 rounded-full bg-gold-500" /> : null}
                    </span>
                  </span>
                  <span className="mt-1 text-xs text-cocoa-500 sm:text-sm">
                    {o.tagline} · {o.size} Tafeln deiner Wahl
                  </span>
                  <span className="mt-3 rounded-sm bg-cream-200 px-2 py-1 text-xs font-semibold text-gold-600">
                    −{o.discount} % auf alle Tafeln
                  </span>
                </button>
              );
            })}
          </div>

          {/* Schritt 2: Sorten wählen */}
          <div className="mt-10 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
            <h2 className="font-serif text-2xl">2. Wähle deine Schokoladen</h2>
            <p className="text-sm text-cocoa-500">
              ({count} von {box.size})
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
              <Chip active={filter === "all"} onClick={() => setFilter("all")}>
                Alle Sorten
              </Chip>
              {filters.map((f) => (
                <Chip key={f.key} active={filter === f.key} onClick={() => setFilter(f.key)}>
                  {f.key === "vegan" ? <VeganIcon className="-my-1 mr-1 inline h-4 w-4" /> : null}
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
          <div className="sticky top-28 flex max-h-[calc(100vh-8rem)] flex-col rounded-sm border border-cream-300 bg-white p-5 shadow-sm xl:p-6">
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
              {box.label}: {count} von {box.size} {sheetOpen ? "▾" : "▴"}
            </span>
            <span className="text-xs text-cream-300">
              {remaining < 0
                ? `${-remaining} zu viel`
                : complete
                  ? "Deine Box ist komplett"
                  : `Noch ${remaining} wählen`}
              {singleValue > 0 ? ` · ${formatPrice(boxValue)}` : ""}
            </span>
          </button>
          <button
            type="button"
            onClick={submitBox}
            disabled={!complete || pending}
            className="btn-gold px-4 py-3 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pending ? "Wird gelegt …" : "In den Warenkorb"}
          </button>
        </div>
        <ProgressBar count={count} size={box.size} className="h-1 rounded-none bg-cocoa-800" />
      </div>
    </div>
  );
}

function SummaryContent({
  count,
  remaining,
  items,
  singleValue,
  boxValue,
  box,
  pending,
  onRemove,
  onSubmit,
}: {
  count: number;
  remaining: number;
  items: { product: BoxProduct; qty: number }[];
  singleValue: number;
  boxValue: number;
  box: BoxOption;
  pending: boolean;
  onRemove: (handle: string) => void;
  onSubmit: () => void;
}) {
  const complete = remaining === 0;
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <p className="flex items-center gap-2 eyebrow">
        <BoxIcon className="h-5 w-5" />
        Deine {box.label}
      </p>
      <div className="mt-4 flex gap-1.5" aria-hidden>
        {Array.from({ length: box.size }).map((_, i) => (
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
        {count} von {box.size} Tafeln ausgewählt
      </p>

      {items.length ? (
        <ul className="mt-4 min-h-0 flex-1 divide-y divide-cream-200 overflow-y-auto overscroll-contain border-y border-cream-200 pr-1">
          {items.map(({ product, qty }) => (
            <li key={product.handle} className="flex items-center gap-3 py-2">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-sm bg-cream-100">
                {product.image ? (
                  <Image src={product.image} alt="" fill sizes="40px" className="object-cover" />
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

      <div className="shrink-0">
      <dl className="mt-4 space-y-1 text-sm">
        <div className="flex justify-between text-cocoa-500">
          <dt>Einzelpreis</dt>
          <dd>{formatPrice(singleValue)}</dd>
        </div>
        <div className="flex justify-between text-gold-600">
          <dt>Box-Rabatt −{box.discount} %</dt>
          <dd>−{formatPrice(singleValue - boxValue)}</dd>
        </div>
        <div className="flex justify-between text-base font-semibold">
          <dt>Dein Boxpreis</dt>
          <dd>{formatPrice(boxValue)}</dd>
        </div>
      </dl>
      <p
        className={clsx(
          "mt-3 text-sm font-semibold",
          complete ? "text-leaf-600" : "text-gold-600",
        )}
      >
        {remaining < 0
          ? `Bitte ${-remaining} ${remaining === -1 ? "Tafel" : "Tafeln"} entfernen`
          : complete
            ? "Perfekt – deine Box ist komplett!"
            : `Noch ${remaining} ${remaining === 1 ? "Tafel" : "Tafeln"} auswählen`}
      </p>

      <button
        type="button"
        onClick={onSubmit}
        disabled={!complete || pending}
        className="btn-dark mt-4 w-full py-4 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Wird in den Warenkorb gelegt …" : "Box in den Warenkorb →"}
      </button>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-cocoa-500">
        <LockIcon className="h-3.5 w-3.5" />
        Sichere Zahlung mit SSL-Verschlüsselung
      </p>
      </div>
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
        {product.vegan ? <VeganBadge className="absolute bottom-2 left-2 z-10 scale-90 origin-bottom-left" /> : null}
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

function ProgressBar({
  count,
  size,
  className,
}: {
  count: number;
  size: number;
  className?: string;
}) {
  return (
    <div className={clsx("overflow-hidden", className)}>
      <div
        className="h-full bg-gold-500 transition-all"
        style={{ width: `${Math.min(100, (count / size) * 100)}%` }}
      />
    </div>
  );
}
