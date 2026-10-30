// Probierbox – Konditionen zentral. Der Rabatt wird in Shopify über Rabattcodes umgesetzt:
// BOX6 = 10 % ab 6 Artikeln, BOX10 = 15 % ab 10 Artikeln (in Shopify unter Rabatte anlegen).
export type BoxOption = {
  size: number;
  discount: number; // Prozent
  code: string;
  label: string;
  tagline: string;
  popular?: boolean;
};

export const BOX_OPTIONS: BoxOption[] = [
  { size: 6, discount: 10, code: "BOX6", label: "6er Box", tagline: "Zum Kennenlernen" },
  {
    size: 10,
    discount: 15,
    code: "BOX10",
    label: "10er Box",
    tagline: "Mehr entdecken & mehr sparen",
    popular: true,
  },
];

export const MAX_BOX_DISCOUNT = Math.max(...BOX_OPTIONS.map((o) => o.discount));
export const BOX_SIZES_TEXT = BOX_OPTIONS.map((o) => o.size).join(" oder ");
