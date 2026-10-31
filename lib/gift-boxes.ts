// Geschenkboxen (feste Bundles). `handle` = Produkt-Handle in Shopify.
// Sobald ein Produkt mit diesem Handle in Shopify existiert und für den Headless-Kanal
// freigegeben ist, erscheinen Preis und Link automatisch. Bis dahin: „Bald erhältlich“.

export type GiftCategory = "anlass" | "geniesser" | "danke" | "vegan";

export type GiftBox = {
  id: string;
  handle: string;
  title: string;
  tag: string;
  text: string;
  tip?: string;
  categories: GiftCategory[];
  tone: "dark" | "light";
  tagStyle: "dark" | "light" | "gold" | "green";
};

export const giftBoxes: GiftBox[] = [
  {
    id: "winterreise",
    handle: "geschenkbox-winterreise",
    title: "Winterreise",
    tag: "Weihnachten",
    text: "Die schönste Reise des Jahres passt in eine Box. Winterliche Sorten, festlich verpackt, mit Karte zum Beschriften. Auch als Wichtel-Set mit 3 Tafeln.",
    categories: ["anlass"],
    tone: "dark",
    tagStyle: "gold",
  },
  {
    id: "hochzeit",
    handle: "geschenkbox-ja-ich-will",
    title: "Ja, ich will.",
    tag: "Hochzeit",
    text: "Für zwei, die ab heute alles teilen, auch die beste Schokolade. Ausgewählte Sorten in einer Geschenkbox, dazu eine Karte für eure Glückwünsche.",
    categories: ["anlass"],
    tone: "light",
    tagStyle: "dark",
  },
  {
    id: "mama",
    handle: "geschenkbox-fuer-mama",
    title: "Für Mama. Mit Liebe.",
    tag: "Muttertag",
    text: "Sie hat dir so viel gegeben. Jetzt bist du dran: eine Box voller Lieblingsmomente, zartschmelzend und ein bisschen verrückt. Mit Karte für deine Worte.",
    categories: ["anlass"],
    tone: "light",
    tagStyle: "dark",
  },
  {
    id: "papa",
    handle: "geschenkbox-fuer-papa",
    title: "Für Papa. Die Expedition.",
    tag: "Vatertag",
    text: "Für den Mann, der schon alles hat, nur das hier noch nicht. Kräftige, ehrliche Sorten mit Charakter und eine Herausforderung für jeden Geschmack.",
    categories: ["anlass"],
    tone: "dark",
    tagStyle: "light",
  },
  {
    id: "wild",
    handle: "geschenkbox-wilde-sorten",
    title: "Wilde Sorten",
    tag: "Geschmacksexplosion",
    text: "Für alle, die Schokolade neu erleben wollen. Unsere ausgefallensten Sorten in einer Box, mit Kombinationen, die du so noch nie probiert hast. Jede Tafel ist eine kleine Geschmacksexplosion.",
    categories: ["geniesser"],
    tone: "dark",
    tagStyle: "gold",
  },
  {
    id: "tasting",
    handle: "geschenkbox-tasting-abend",
    title: "Tasting-Abend für zwei",
    tag: "Für zwei",
    text: "Licht aus, Tafeln auf. Probiert euch in der richtigen Reihenfolge von Sorte zu Sorte und haltet eure Eindrücke auf der Verkostungskarte fest. Ein Abend, über den ihr noch lange redet.",
    categories: ["geniesser"],
    tone: "dark",
    tagStyle: "light",
  },
  {
    id: "weltreise",
    handle: "geschenkbox-weltreise",
    title: "Weltreise",
    tag: "Pur & dunkel",
    text: "Ein Kontinent pro Tafel. Pure dunkle Schokolade aus verschiedenen Ländern. Jede Sorte schmeckt anders, keine schmeckt wie Supermarkt.",
    categories: ["geniesser"],
    tone: "light",
    tagStyle: "dark",
  },
  {
    id: "danke",
    handle: "geschenkbox-kleines-danke",
    title: "Kleines Danke",
    tag: "3 Tafeln + Karte",
    text: "Manchmal braucht es keine großen Worte. Drei Tafeln und eine Karte für Lehrer, Gastgeber, Nachbarn oder Kollegen.",
    tip: "Nimm zwei, dann ist der Versand kostenlos.",
    categories: ["danke"],
    tone: "light",
    tagStyle: "dark",
  },
  {
    id: "vegan",
    handle: "geschenkbox-ganz-ohne-milch",
    title: "Ganz ohne Milch",
    tag: "Vegan",
    text: "Vegan, aber kein bisschen Verzicht. Unsere besten Sorten ganz ohne Milch, dafür voller Geschmack. Für alle, die pflanzlich genießen, und alle, die es einfach mal probieren wollen.",
    categories: ["vegan", "danke"],
    tone: "light",
    tagStyle: "green",
  },
];

// Saison-Highlight im Hero (Varianten = eigene Shopify-Produkte).
export const winterVariants = [
  {
    id: "box",
    label: "Geschenkbox",
    note: "mit Karte",
    handle: "geschenkbox-winterreise",
  },
  {
    id: "wichtel",
    label: "Wichtel-Set",
    note: "3 Tafeln",
    handle: "wichtel-set-winterreise",
  },
];

export const giftFilters: { id: "alle" | GiftCategory; label: string }[] = [
  { id: "alle", label: "Alle" },
  { id: "anlass", label: "Anlässe" },
  { id: "geniesser", label: "Für Genießer" },
  { id: "danke", label: "Kleine Gesten" },
  { id: "vegan", label: "Vegan" },
];
