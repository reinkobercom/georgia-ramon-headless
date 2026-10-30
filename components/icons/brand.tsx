// Schlichte Linien-Icons im Stil des Designs (1.5px Strich, currentColor).
type P = React.ComponentProps<"svg">;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 32 32",
};

export const LeafIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 26c2-9 8-16 20-20-1 12-7 19-16 19-1.5 0-3-.3-4-1" />
    <path d="M6 26c4-5 8-9 13-12" />
  </svg>
);

export const BeanIcon = (p: P) => (
  <svg {...base} {...p}>
    <ellipse cx="16" cy="16" rx="8" ry="12" transform="rotate(30 16 16)" />
    <path d="M21 6c-4 5-6 13-10 20" />
  </svg>
);

export const PinIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M16 28s9-8.2 9-15a9 9 0 1 0-18 0c0 6.8 9 15 9 15Z" />
    <circle cx="16" cy="13" r="3.2" />
  </svg>
);

export const HandshakeIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 12l5-4 5 2 3-2 5 1 8 4" />
    <path d="M3 12l3 8 3 2M29 13l-3 7-6 5-3-2-3 2-3-3" />
    <path d="M13 10l-3 4c1 1 3 1 4 0l3-3 6 6" />
  </svg>
);

export const MagnifierIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="14" cy="14" r="8" />
    <path d="M20 20l7 7" />
  </svg>
);

export const StarIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M16 4l3.6 7.6 8.4 1-6.2 5.8 1.6 8.3L16 22.6l-7.4 4.1 1.6-8.3L4 12.6l8.4-1L16 4Z" />
  </svg>
);

export const GlobeIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="16" cy="16" r="12" />
    <path d="M4 16h24M16 4c3.5 3.3 5 7.3 5 12s-1.5 8.7-5 12c-3.5-3.3-5-7.3-5-12s1.5-8.7 5-12Z" />
  </svg>
);

export const TruckIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 8h16v14H3zM19 13h5l4 4v5h-9" />
    <circle cx="8" cy="23.5" r="2.5" />
    <circle cx="23" cy="23.5" r="2.5" />
  </svg>
);

export const LockIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="7" y="14" width="18" height="13" rx="2" />
    <path d="M11 14v-4a5 5 0 0 1 10 0v4" />
  </svg>
);

export const HeartIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M16 27S4 19.5 4 11.5A6.5 6.5 0 0 1 16 8a6.5 6.5 0 0 1 12 3.5C28 19.5 16 27 16 27Z" />
  </svg>
);

export const GiftIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="5" y="12" width="22" height="15" />
    <path d="M3 8h26v4H3zM16 8v19M16 8c-2-4-7-5-7-2s4 2 7 2Zm0 0c2-4 7-5 7-2s-4 2-7 2Z" />
  </svg>
);

export const BoxIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 10l12-5 12 5v13l-12 5-12-5V10Z" />
    <path d="M4 10l12 5 12-5M16 15v13" />
  </svg>
);

export const FlameIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M16 28c-5 0-8-3.5-8-8 0-6 6-8 6-15 4 3 10 8 10 15 0 4.5-3 8-8 8Z" />
    <path d="M16 28c-2 0-3.5-1.5-3.5-3.5 0-3 3.5-4.5 3.5-7 2 1.5 3.5 4 3.5 7 0 2-1.5 3.5-3.5 3.5Z" />
  </svg>
);

export const MillIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="16" cy="16" r="11" />
    <circle cx="16" cy="16" r="4" />
    <path d="M16 5v7M16 20v7M5 16h7M20 16h7" />
  </svg>
);

export const WaveIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 12c4-4 8 4 13 0s9-4 13 0M3 20c4-4 8 4 13 0s9-4 13 0" />
  </svg>
);

export const BarIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="7" y="4" width="18" height="24" rx="1.5" />
    <path d="M7 12h18M7 20h18M16 4v24" />
  </svg>
);

// Vegan: zwei grüne Blätter, die sich vom Stiel aus auffächern (farbig, nicht currentColor).
export const VeganIcon = (p: P) => (
  <svg viewBox="0 0 32 32" fill="none" aria-hidden {...p}>
    <path d="M16 28c0-6 .5-10 0-14" stroke="#3f6b2a" strokeWidth="1.8" strokeLinecap="round" />
    <path
      d="M15.6 17.5C9.5 18.4 5 14.6 4 6.5c7.4-.4 12 3.5 11.6 11Z"
      fill="#6a9f3e"
      stroke="#3f6b2a"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    <path d="M15.4 17.2C12.4 13.9 9.4 10.8 6.5 8.4" stroke="#3f6b2a" strokeWidth="1" strokeLinecap="round" />
    <path
      d="M16.4 14.5C22.5 15.4 27 11.6 28 3.5c-7.4-.4-12 3.5-11.6 11Z"
      fill="#8bbf55"
      stroke="#3f6b2a"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    <path d="M16.6 14.2c3-3.3 6-6.4 8.9-8.8" stroke="#3f6b2a" strokeWidth="1" strokeLinecap="round" />
  </svg>
);
