// Social-Media-Profile. Ohne `href` wird das Icon angezeigt, ist aber nicht anklickbar.
export type SocialNetwork = "instagram" | "facebook" | "youtube" | "tiktok";

export const socialLinks: { network: SocialNetwork; label: string; href?: string }[] = [
  { network: "instagram", label: "Instagram", href: "https://www.instagram.com/georgia_ramon_chocolate/" },
  { network: "facebook", label: "Facebook" },
  { network: "youtube", label: "YouTube" },
  { network: "tiktok", label: "TikTok" },
];
