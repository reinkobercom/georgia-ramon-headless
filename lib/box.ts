// Entdeckerbox – Konditionen zentral. Der Rabatt wird in Shopify über Rabattcodes umgesetzt:
// BOX6 = 5 % ab 6 Artikeln, BOX10 = 12 % ab 10 Artikeln (in Shopify unter Rabatte anlegen).
export type BoxOption = {
  size: number;
  discount: number; // Prozent
  code: string;
  label: string;
  tagline: string;
  popular?: boolean;
};

export const BOX_OPTIONS: BoxOption[] = [
  { size: 6, discount: 5, code: "BOX6", label: "6er Box", tagline: "Zum Kennenlernen" },
  {
    size: 10,
    discount: 12,
    code: "BOX10",
    label: "10er Box",
    tagline: "Mehr entdecken & mehr sparen",
    popular: true,
  },
];

export const MAX_BOX_DISCOUNT = Math.max(...BOX_OPTIONS.map((o) => o.discount));
export const BOX_SIZES_TEXT = BOX_OPTIONS.map((o) => o.size).join(" oder ");
