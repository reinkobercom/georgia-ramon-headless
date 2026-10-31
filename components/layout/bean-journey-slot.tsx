"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// Zeigt die Reise-Sektion auf allen Unterseiten, nicht auf der Startseite
// (dort gibt es bereits „Von der Bohne bis zur Tafel“).
export function BeanJourneySlot({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <>{children}</>;
}
