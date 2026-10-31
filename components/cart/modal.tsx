"use client";

import clsx from "clsx";
import { Dialog, Transition } from "@headlessui/react";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import LoadingDots from "components/loading-dots";
import { TruckIcon } from "components/icons/brand";
import Price from "components/price";
import { DEFAULT_OPTION } from "lib/constants";
import { createUrl } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { createCartAndSetCookie, redirectToCheckout } from "./actions";
import { useCart } from "./cart-context";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import OpenCart from "./open-cart";

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartModal() {
  const { cart, updateCartItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  useEffect(() => {
    if (
      cart?.totalQuantity &&
      cart?.totalQuantity !== quantityRef.current &&
      cart?.totalQuantity > 0
    ) {
      if (!isOpen) {
        setIsOpen(true);
      }
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef]);

  return (
    <>
      <button aria-label="Warenkorb öffnen" onClick={openCart}>
        <OpenCart quantity={cart?.totalQuantity} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-cocoa-950/50" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col bg-cream-50 p-5 text-cocoa-900 shadow-2xl sm:p-6 md:w-[420px]">
              <div className="flex items-center justify-between">
                <p className="font-serif text-2xl">Dein Warenkorb</p>
                <button aria-label="Warenkorb schließen" onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>

              <FreeShipping amount={cart?.cost.subtotalAmount.amount ?? "0"} />

              {!cart || cart.lines.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingCartIcon className="h-14 text-gold-500" />
                  <p className="mt-6 text-center font-serif text-2xl">
                    Dein Warenkorb ist leer.
                  </p>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                  <ul className="grow overflow-auto py-4">
                    {cart.lines
                      .sort((a, b) =>
                        a.merchandise.product.title.localeCompare(
                          b.merchandise.product.title,
                        ),
                      )
                      .map((item, i) => {
                        const merchandiseSearchParams =
                          {} as MerchandiseSearchParams;

                        item.merchandise.selectedOptions.forEach(
                          ({ name, value }) => {
                            if (value !== DEFAULT_OPTION) {
                              merchandiseSearchParams[name.toLowerCase()] =
                                value;
                            }
                          },
                        );

                        const merchandiseUrl = createUrl(
                          `/product/${item.merchandise.product.handle}`,
                          new URLSearchParams(merchandiseSearchParams),
                        );

                        return (
                          <li
                            key={i}
                            className="flex w-full flex-col border-b border-cream-300"
                          >
                            <div className="relative flex w-full flex-row justify-between px-1 py-4">
                              <div className="absolute z-40 -ml-1 -mt-2">
                                <DeleteItemButton
                                  item={item}
                                  optimisticUpdate={updateCartItem}
                                />
                              </div>
                              <div className="flex flex-row">
                                <div className="relative h-16 w-16 overflow-hidden rounded-sm bg-cream-100">
                                  <Image
                                    className="h-full w-full object-contain p-1"
                                    width={64}
                                    height={64}
                                    alt={
                                      item.merchandise.product.featuredImage
                                        .altText ||
                                      item.merchandise.product.title
                                    }
                                    src={
                                      item.merchandise.product.featuredImage.url
                                    }
                                  />
                                </div>
                                <Link
                                  href={merchandiseUrl}
                                  onClick={closeCart}
                                  className="z-30 ml-2 flex flex-row space-x-4"
                                >
                                  <div className="flex flex-1 flex-col text-base">
                                    <span className="leading-tight">
                                      {item.merchandise.product.title}
                                    </span>
                                    {item.attributes?.find((a) => a.key === "Entdeckerbox" || a.key === "Probierbox") ? (
                                      <p className="text-xs font-semibold text-gold-600">
                                        Teil deiner{" "}
                                        {item.attributes.find((a) => a.key === "Entdeckerbox" || a.key === "Probierbox")!.value}
                                      </p>
                                    ) : null}
                                    {item.merchandise.title !==
                                    DEFAULT_OPTION ? (
                                      <p className="text-sm text-cocoa-500">
                                        {item.merchandise.title}
                                      </p>
                                    ) : null}
                                  </div>
                                </Link>
                              </div>
                              <div className="flex h-16 flex-col justify-between">
                                <Price
                                  className="flex justify-end space-y-2 text-right text-sm"
                                  amount={item.cost.totalAmount.amount}
                                  currencyCode={
                                    item.cost.totalAmount.currencyCode
                                  }
                                />
                                <div className="ml-auto flex h-9 flex-row items-center rounded-sm border border-cream-300 bg-white">
                                  <EditItemQuantityButton
                                    item={item}
                                    type="minus"
                                    optimisticUpdate={updateCartItem}
                                  />
                                  <p className="w-6 text-center">
                                    <span className="w-full text-sm">
                                      {item.quantity}
                                    </span>
                                  </p>
                                  <EditItemQuantityButton
                                    item={item}
                                    type="plus"
                                    optimisticUpdate={updateCartItem}
                                  />
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                  <div className="py-4 text-sm text-cocoa-500">
                    {cart.discountCodes
                      ?.filter((d) => d.applicable)
                      .map((d) => (
                        <p key={d.code} className="mb-3 rounded-sm bg-cream-100 px-3 py-2 text-xs font-semibold text-leaf-600">
                          ✓ Rabatt „{d.code}“ ist aktiv
                        </p>
                      ))}
                    <div className="mb-3 flex items-center justify-between border-b border-cream-300 pb-1">
                      <p>inkl. MwSt.</p>
                      <Price
                        className="text-right text-base text-cocoa-900"
                        amount={cart.cost.totalTaxAmount.amount}
                        currencyCode={cart.cost.totalTaxAmount.currencyCode}
                      />
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-cream-300 pb-1 pt-1">
                      <p>Versand</p>
                      <p className="text-right">wird an der Kasse berechnet</p>
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-cream-300 pb-1 pt-1">
                      <p>Gesamt</p>
                      <Price
                        className="text-right text-base text-cocoa-900"
                        amount={cart.cost.totalAmount.amount}
                        currencyCode={cart.cost.totalAmount.currencyCode}
                      />
                    </div>
                  </div>
                  <form action={redirectToCheckout}>
                    <CheckoutButton />
                  </form>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

function CloseCart({ className }: { className?: string }) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center text-cocoa-900">
      <XMarkIcon
        className={clsx(
          "h-6 transition-all ease-in-out hover:scale-110",
          className,
        )}
      />
    </div>
  );
}

function CheckoutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="btn-gold w-full py-4"
      type="submit"
      disabled={pending}
    >
      {pending ? <LoadingDots className="bg-cocoa-950" /> : "Zur Kasse"}
    </button>
  );
}

const FREE_SHIPPING_THRESHOLD = 39;

function FreeShipping({ amount }: { amount: string }) {
  const value = parseFloat(amount) || 0;
  const missing = Math.max(0, FREE_SHIPPING_THRESHOLD - value);
  const progress = Math.min(100, (value / FREE_SHIPPING_THRESHOLD) * 100);
  const reached = missing === 0;
  const eur = (n: number) => n.toLocaleString("de-DE", { style: "currency", currency: "EUR" });

  return (
    <div
      className={clsx(
        "mt-4 rounded-sm p-3.5 text-sm",
        reached ? "bg-[#eef4e6] text-leaf-600" : "bg-cream-100 text-cocoa-700",
      )}
      role="status"
      aria-live="polite"
    >
      <p className="flex items-center gap-2">
        <TruckIcon className="h-5 w-5 shrink-0" />
        {reached ? (
          <strong>Glückwunsch – dein Versand ist kostenlos!</strong>
        ) : value > 0 ? (
          <span>
            Noch <strong>{eur(missing)}</strong> bis zum <strong>kostenlosen Versand</strong>
          </span>
        ) : (
          <span>
            <strong>Kostenloser Versand</strong> ab {eur(FREE_SHIPPING_THRESHOLD)}
          </span>
        )}
      </p>
      <div className="relative mt-2.5 h-2 overflow-hidden rounded-full bg-cream-300">
        <div
          className={clsx(
            "h-full rounded-full transition-[width] duration-500",
            reached ? "bg-leaf-600" : "bg-gold-500",
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-1.5 flex justify-between text-[11px] text-cocoa-500">
        <span>{eur(value)}</span>
        <span>{eur(FREE_SHIPPING_THRESHOLD)}</span>
      </p>
    </div>
  );
}
