"use client";

import clsx from "clsx";
import { isNavActive, type NavItem } from "lib/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Menüpunkt, der nur auf der aktuell geöffneten Seite golden hervorgehoben ist. */
export function NavLink({
  item,
  className,
  activeClassName = "text-gold-400",
  onClick,
  children,
}: {
  item: NavItem;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  const active = isNavActive(usePathname(), item);
  return (
    <Link
      href={item.path}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={clsx(className, active && activeClassName)}
    >
      {children}
    </Link>
  );
}
