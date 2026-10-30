"use client";

import { useState } from "react";

const TYPES = ["Feinkost / Einzelhandel", "Café / Gastronomie", "Hotel", "Firmenkunde", "Sonstiges"];

// Vorerst per E-Mail-Programm (mailto). Später: Versand direkt aus dem Formular.
export function DealerForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="rounded-sm border border-cream-300 bg-cream-50 p-6 sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const body = [
          `Firma: ${f.get("firma")}`,
          `Ansprechpartner:in: ${f.get("name")}`,
          `E-Mail: ${f.get("email")}`,
          `Telefon: ${f.get("telefon") || "-"}`,
          `Art des Betriebs: ${f.get("art")}`,
          `Ort: ${f.get("ort") || "-"}`,
          "",
          String(f.get("nachricht") || ""),
        ].join("\n");
        window.location.href = `mailto:info@georgia-ramon.com?subject=${encodeURIComponent(
          `Händleranfrage: ${f.get("firma")}`,
        )}&body=${encodeURIComponent(body)}`;
        setSent(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Firma *" name="firma" required />
        <Field label="Ansprechpartner:in *" name="name" required />
        <Field label="E-Mail *" name="email" type="email" required />
        <Field label="Telefon" name="telefon" type="tel" />
        <label className="block text-sm">
          <span className="mb-1.5 block text-cocoa-700">Art des Betriebs *</span>
          <select
            name="art"
            required
            defaultValue=""
            className="w-full rounded-sm border border-cream-300 bg-white px-3 py-2.5 text-base sm:text-sm"
          >
            <option value="" disabled>
              Bitte wählen
            </option>
            {TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <Field label="Ort" name="ort" />
      </div>
      <label className="mt-4 block text-sm">
        <span className="mb-1.5 block text-cocoa-700">Nachricht</span>
        <textarea
          name="nachricht"
          rows={4}
          placeholder="Was habt ihr vor? Welche Sorten oder Mengen interessieren euch?"
          className="w-full rounded-sm border border-cream-300 bg-white px-3 py-2.5 text-base sm:text-sm"
        />
      </label>
      <button type="submit" className="btn-dark mt-6 w-full py-4 sm:w-auto">
        Anfrage senden
      </button>
      {sent ? (
        <p className="mt-4 text-sm text-leaf-600">
          Dein E-Mail-Programm öffnet sich mit der vorbereiteten Anfrage – bitte dort absenden.
        </p>
      ) : (
        <p className="mt-4 text-xs text-cocoa-500">
          Mit dem Absenden öffnet sich dein E-Mail-Programm mit der vorbereiteten Nachricht.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-cocoa-700">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-sm border border-cream-300 bg-white px-3 py-2.5 text-base sm:text-sm"
      />
    </label>
  );
}
