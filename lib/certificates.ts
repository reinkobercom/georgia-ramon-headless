// Zertifikate im Footer (Querformat, z. B. 3:2).
// Bild hinterlegen: JPEG nach /public/zertifikate/ legen und hier `src` eintragen,
// z. B. src: "/zertifikate/bio.jpg". Ohne `src` erscheint ein Platzhalter.
export type Certificate = { title: string; src?: string };

export const certificates: Certificate[] = [
  { title: "Zertifikat 1" },
  { title: "Zertifikat 2" },
  { title: "Zertifikat 3" },
  { title: "Zertifikat 4" },
  { title: "Zertifikat 5" },
];
