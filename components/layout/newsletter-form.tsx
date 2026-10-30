"use client";

import { toast } from "sonner";

// Oberfläche steht; die Anbindung an Shopify-Kundenmarketing folgt.
export function NewsletterForm() {
  return (
    <form
      className="flex w-full flex-col gap-3 sm:flex-row md:max-w-lg"
      onSubmit={(e) => {
        e.preventDefault();
        toast("Danke! Die Newsletter-Anmeldung wird im nächsten Schritt angebunden.");
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        E-Mail-Adresse
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="Deine E-Mail-Adresse"
        className="min-w-0 flex-1 rounded-sm border border-cocoa-700 bg-cocoa-900 px-4 py-3.5 text-base text-cream-50 placeholder:text-cream-300/60 sm:text-sm"
      />
      <button type="submit" className="btn-gold shrink-0">
        10 % sichern
      </button>
    </form>
  );
}
