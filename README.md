# Georgia Ramon – Headless Shop

Next.js-Frontend für georgia-ramon.com. Produkte, Warenkorb und Checkout kommen aus Shopify (Storefront API, Kanal „Georgia Ramon Headless“); gehostet auf Vercel.

Basis: [Next.js Commerce](https://github.com/vercel/commerce).

## Umgebungsvariablen

Siehe `.env.example`. `SHOPIFY_STOREFRONT_ACCESS_TOKEN` (privater Token aus dem Headless-Kanal) nur in Vercel hinterlegen, nie committen.

Alle Shopify-Abfragen laufen im Markt DE (Euro, deutsche Texte) über `@inContext`. Die Testphase ist per `robots.ts` und Metadaten auf `noindex` gestellt.
