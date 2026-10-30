import clsx from "clsx";
import { socialLinks, type SocialNetwork } from "lib/social";

const paths: Record<SocialNetwork, React.ReactNode> = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
    </>
  ),
  facebook: (
    <path
      fill="currentColor"
      d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8.1v3h2.5V21h2.9Z"
    />
  ),
  youtube: (
    <path
      fill="currentColor"
      d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z"
    />
  ),
  tiktok: (
    <path
      fill="currentColor"
      d="M16.6 3h-3v12.2a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.6a5.7 5.7 0 1 0 4.8 5.6V9.1a7.3 7.3 0 0 0 4.1 1.3V7.4a4.2 4.2 0 0 1-4.1-4.4Z"
    />
  ),
};

export function SocialIcons({ className }: { className?: string }) {
  return (
    <ul className={clsx("flex items-center gap-3", className)}>
      {socialLinks.map((s) => {
        const icon = (
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
            {paths[s.network]}
          </svg>
        );
        const base =
          "flex h-10 w-10 items-center justify-center rounded-full border border-cocoa-700";
        return (
          <li key={s.network}>
            {s.href ? (
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Georgia Ramon auf ${s.label}`}
                className={clsx(base, "text-cream-100 transition-colors hover:border-gold-500 hover:text-gold-300")}
              >
                {icon}
              </a>
            ) : (
              <span
                aria-label={`${s.label} (bald)`}
                title={`${s.label} – folgt bald`}
                className={clsx(base, "cursor-default text-cream-300/35")}
              >
                {icon}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
