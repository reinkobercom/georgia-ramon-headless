import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import CartModal from "components/cart/modal";
import Logo from "components/logo-square";
import { accountHref } from "lib/customer-account";
import { buildHeaderNav, ENTDECKERBOX_ITEM } from "lib/navigation";
import { getMenu } from "lib/shopify";
import Link from "next/link";
import { Suspense } from "react";
import { PromoBar } from "../promo-bar";
import MobileMenu from "./mobile-menu";

export async function Navbar() {
  const nav = buildHeaderNav(await getMenu("main-menu").catch(() => []));

  return (
    <>
      <PromoBar />
      <header className="sticky top-0 z-40 bg-cocoa-950 text-cream-50">
        <nav className="container-shop flex h-16 items-center justify-between gap-4 md:h-20">
          <div className="flex w-20 items-center lg:hidden">
            <Suspense fallback={null}>
              <MobileMenu nav={nav} accountHref={accountHref} />
            </Suspense>
          </div>

          <Link
            href="/"
            prefetch={true}
            aria-label="Georgia Ramon – Startseite"
            className="shrink-0"
          >
            <Logo />
          </Link>

          <ul className="hidden items-center gap-7 text-[12px] font-medium tracking-[0.12em] uppercase lg:flex">
            {nav.map((item) =>
              item.items?.length ? (
                <li key={item.title} className="group relative">
                  <Link
                    href={item.path}
                    className="flex items-center gap-1 py-6 transition-colors hover:text-gold-300"
                  >
                    {item.title}
                    <ChevronDownIcon className="h-3 w-3 transition-transform group-hover:rotate-180" />
                  </Link>
                  <div className="invisible absolute top-full left-1/2 w-60 -translate-x-1/2 opacity-0 transition-all duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul className="rounded-sm border border-cocoa-700 bg-cocoa-950 py-3 shadow-xl">
                      {item.items.map((sub) => (
                        <li key={sub.title}>
                          <Link
                            href={sub.path}
                            className="block px-5 py-2 text-[12px] tracking-[0.08em] text-cream-100 normal-case hover:bg-cocoa-800 hover:text-gold-300"
                          >
                            {sub.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    className={clsx(
                      "py-6 transition-colors hover:text-gold-300",
                      item.path === ENTDECKERBOX_ITEM.path && "text-gold-400",
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              ),
            )}
          </ul>

          <div className="flex w-20 items-center justify-end gap-1 sm:gap-2 lg:w-auto">
            <Link
              href="/search"
              aria-label="Suche"
              className="hidden h-10 w-10 items-center justify-center transition-colors hover:text-gold-300 sm:flex"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </Link>
            <a
              href={accountHref}
              aria-label="Kundenkonto"
              className="hidden h-10 w-10 items-center justify-center transition-colors hover:text-gold-300 sm:flex"
            >
              <UserIcon className="h-5 w-5" />
            </a>
            <CartModal />
          </div>
        </nav>
      </header>
    </>
  );
}
