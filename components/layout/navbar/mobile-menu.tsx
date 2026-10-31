"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "components/logo-square";
import { uspItems, type NavItem } from "lib/navigation";
import { NavLink } from "./nav-link";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment, Suspense, useEffect, useState } from "react";
import Search, { SearchSkeleton } from "./search";

export default function MobileMenu({
  nav,
  accountHref,
}: {
  nav: NavItem[];
  accountHref: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Menü öffnen"
        className="-ml-2 flex h-11 w-11 items-center justify-center text-cream-50"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={close} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-cocoa-950/60" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-transform ease-out duration-300"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition-transform ease-in duration-200"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="fixed inset-y-0 left-0 flex w-full max-w-sm flex-col overflow-y-auto bg-cocoa-950 text-cream-50">
              <div className="flex h-16 items-center justify-between border-b border-cocoa-700 px-4">
                <Logo size="sm" />
                <button
                  className="flex h-11 w-11 items-center justify-center"
                  onClick={close}
                  aria-label="Menü schließen"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="px-4 pt-5">
                <Suspense fallback={<SearchSkeleton />}>
                  <Search />
                </Suspense>
              </div>

              <nav className="px-4 py-6">
                {nav
                  .filter((item) => item.items?.length)
                  .map((group) => (
                    <div key={group.title} className="mb-6">
                      <p className="eyebrow mb-3 text-gold-400">
                        {group.title}
                      </p>
                      <ul className="grid grid-cols-2 gap-x-4">
                        {group.items!.map((item) => (
                          <li key={item.title}>
                            <NavLink
                              item={item}
                              onClick={close}
                              className="block py-2 text-[15px] text-cream-100"
                              activeClassName="!text-gold-400"
                            >
                              {item.title}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                <ul className="border-t border-cocoa-700">
                  {nav
                    .filter((item) => !item.items?.length)
                    .map((item) => (
                      <li
                        key={item.title}
                        className="border-b border-cocoa-700"
                      >
                        <NavLink
                          item={item}
                          onClick={close}
                          className="block py-4 font-serif text-xl"
                        >
                          {item.title}
                        </NavLink>
                      </li>
                    ))}
                  <li className="border-b border-cocoa-700">
                    <a
                      href={accountHref}
                      className="block py-4 font-serif text-xl"
                    >
                      Kundenkonto
                    </a>
                  </li>
                </ul>
              </nav>

              <ul className="mt-auto space-y-2 bg-cocoa-900 px-4 py-6 text-xs text-cream-200">
                {uspItems.map((usp) => (
                  <li key={usp}>✓ {usp}</li>
                ))}
              </ul>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
