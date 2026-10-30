import { ChevronDownIcon, MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/outline";
import CartModal from "components/cart/modal";
import Logo from "components/logo-square";
import { mainNav, shopLinks } from "lib/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { UspBar } from "../usp-bar";
import MobileMenu from "./mobile-menu";

export async function Navbar() {
  return (
    <>
      <header className="sticky top-0 z-40 bg-cocoa-950 text-cream-50">
        <nav className="container-shop flex h-16 items-center justify-between gap-4 md:h-20">
          {/* Mobil: Menü links */}
          <div className="flex w-20 items-center lg:hidden">
            <Suspense fallback={null}>
              <MobileMenu />
            </Suspense>
          </div>

          <Link href="/" prefetch={true} aria-label="Georgia Ramon – Startseite" className="shrink-0">
            <Logo />
          </Link>

          <ul className="hidden items-center gap-7 text-[12px] font-medium tracking-[0.12em] uppercase lg:flex">
            <li className="group relative">
              <Link href="/search" className="flex items-center gap-1 py-6 transition-colors hover:text-gold-300">
                Shop
                <ChevronDownIcon className="h-3 w-3 transition-transform group-hover:rotate-180" />
              </Link>
              <div className="invisible absolute top-full left-1/2 w-60 -translate-x-1/2 pt-0 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <ul className="rounded-sm border border-cocoa-700 bg-cocoa-950 py-3 shadow-xl">
                  {shopLinks.map((item) => (
                    <li key={item.path}>
                      <Link
                        href={item.path}
                        className="block px-5 py-2 text-[12px] tracking-[0.08em] normal-case text-cream-100 hover:bg-cocoa-800 hover:text-gold-300"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            {mainNav.map((item) => (
              <li key={item.path}>
                <Link href={item.path} className="py-6 transition-colors hover:text-gold-300">
                  {item.title}
                </Link>
              </li>
            ))}
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
              href="https://georgia-ramon.com/account"
              aria-label="Kundenkonto"
              className="hidden h-10 w-10 items-center justify-center transition-colors hover:text-gold-300 sm:flex"
            >
              <UserIcon className="h-5 w-5" />
            </a>
            <CartModal />
          </div>
        </nav>
      </header>
      <UspBar />
    </>
  );
}
