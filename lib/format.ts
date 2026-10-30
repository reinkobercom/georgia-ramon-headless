import type { Money, Product, ProductVariant } from "lib/shopify/types";

export function formatPrice(amount: string | number, currency = "EUR") {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency }).format(
    typeof amount === "string" ? parseFloat(amount) : amount,
  );
}

const unitLabels: Record<string, string> = {
  KG: "kg",
  G: "g",
  L: "l",
  ML: "ml",
  CL: "cl",
  M: "m",
  ITEM: "Stk.",
};

/** Grundpreis nach PAngV, z. B. „89,00 € / kg“ – sofern in Shopify gepflegt. */
export function unitPriceLabel(variant?: ProductVariant) {
  if (!variant?.unitPrice || !variant.unitPriceMeasurement) return null;
  const { referenceValue, referenceUnit } = variant.unitPriceMeasurement;
  const unit = unitLabels[referenceUnit] ?? referenceUnit.toLowerCase();
  const ref = referenceValue === 1 ? unit : `${referenceValue} ${unit}`;
  return `${formatPrice(variant.unitPrice.amount, variant.unitPrice.currencyCode)} / ${ref}`;
}

export function compareAtPrice(product: Product): Money | null {
  const v = product.variants[0];
  if (!v?.compareAtPrice) return null;
  return parseFloat(v.compareAtPrice.amount) > parseFloat(v.price.amount)
    ? v.compareAtPrice
    : null;
}

/** Kurzes Badge aus Shopify-Tags (z. B. „Neu“, „Vegan“, „Limited“). */
export function productBadge(product: Product): string | null {
  const tags = product.tags.map((t) => t.toLowerCase());
  if (tags.some((t) => t.includes("neu"))) return "Neu";
  if (tags.some((t) => t.includes("limited"))) return "Limited";
  if (tags.some((t) => t.includes("vegan"))) return "Vegan";
  return null;
}
