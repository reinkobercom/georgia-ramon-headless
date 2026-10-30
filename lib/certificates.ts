// Footer: Auszeichnungen/Zertifikate und Presse-Logos.
// Bild hinterlegen: Datei nach /public/zertifikate/ bzw. /public/presse/ legen und hier `src`
// eintragen, z. B. src: "/zertifikate/bio.jpg". Ohne `src` erscheint ein Platzhalter.
// Tipp: Siegel als PNG mit transparentem Hintergrund, Presse-Logos einfarbig hell (weiß/gold).
export type Badge = { title: string; src?: string; href?: string };

export const certificates: Badge[] = [
  { title: "Zertifikat 1" },
  { title: "Zertifikat 2" },
  { title: "Zertifikat 3" },
  { title: "Zertifikat 4" },
  { title: "Zertifikat 5" },
];

export const pressLogos: Badge[] = [
  { title: "Presse-Logo 1" },
  { title: "Presse-Logo 2" },
  { title: "Presse-Logo 3" },
  { title: "Presse-Logo 4" },
];
