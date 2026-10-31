import Link from "next/link";

// Schmale Ankündigungsleiste über dem Header.
export function PromoBar() {
  return (
    <Link
      href="/entdeckerbox"
      className="block bg-cocoa-900 px-4 py-2.5 text-center text-[11px] font-medium tracking-[0.08em] text-cream-300 transition-colors hover:text-cream-50 sm:text-xs"
    >
      <span className="font-semibold text-gold-400">Neu:</span> Die Entdeckerbox
      mit 6 oder 10 Sorten deiner Wahl
      <span className="hidden sm:inline">, bis zu 12 % günstiger</span>{" "}
      <span aria-hidden className="text-gold-400">
        →
      </span>
    </Link>
  );
}
