"use server";

import { TAGS } from "lib/constants";
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
  updateDiscountCodes,
} from "lib/shopify";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function addItem(
  prevState: any,
  selectedVariantId: string | undefined
) {
  if (!selectedVariantId) {
    return "Artikel konnte nicht hinzugefügt werden";
  }

  try {
    await addToCart([{ merchandiseId: selectedVariantId, quantity: 1 }]);
    updateTag(TAGS.cart);
  } catch (e) {
    return "Artikel konnte nicht hinzugefügt werden";
  }
}

export async function removeItem(prevState: any, merchandiseId: string) {
  try {
    const cart = await getCart();

    if (!cart) {
      return "Warenkorb konnte nicht geladen werden";
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      await removeFromCart([lineItem.id]);
      updateTag(TAGS.cart);
    } else {
      return "Artikel nicht im Warenkorb";
    }
  } catch (e) {
    return "Artikel konnte nicht entfernt werden";
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    merchandiseId: string;
    quantity: number;
  }
) {
  const { merchandiseId, quantity } = payload;

  try {
    const cart = await getCart();

    if (!cart) {
      return "Warenkorb konnte nicht geladen werden";
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      if (quantity === 0) {
        await removeFromCart([lineItem.id]);
      } else {
        await updateCart([
          {
            id: lineItem.id,
            merchandiseId,
            quantity,
          },
        ]);
      }
    } else if (quantity > 0) {
      // If the item doesn't exist in the cart and quantity > 0, add it
      await addToCart([{ merchandiseId, quantity }]);
    }

    updateTag(TAGS.cart);
  } catch (e) {
    console.error(e);
    return "Menge konnte nicht geändert werden";
  }
}

export async function redirectToCheckout() {
  let cart = await getCart();
  redirect(cart!.checkoutUrl);
}

export async function createCartAndSetCookie() {
  let cart = await createCart();
  (await cookies()).set("cartId", cart.id!);
}

/** Entdeckerbox: Tafeln einzeln (mit Box-Kennzeichnung) in den Warenkorb + Rabattcode setzen. */
export async function addBoxToCart(payload: {
  boxLabel: string;
  code: string;
  lines: { merchandiseId: string; quantity: number }[];
}) {
  try {
    const jar = await cookies();
    let cartId = jar.get("cartId")?.value;
    if (!cartId || !(await getCart())) {
      const created = await createCart();
      cartId = created.id!;
      jar.set("cartId", cartId);
    }
    const cart = await addToCart(
      payload.lines.map((l) => ({
        ...l,
        attributes: [{ key: "Entdeckerbox", value: payload.boxLabel }],
      })),
      cartId,
    );
    const codes = new Set((cart.discountCodes ?? []).map((d) => d.code));
    codes.add(payload.code);
    await updateDiscountCodes([...codes], cartId);
    updateTag(TAGS.cart);
    return { ok: true as const };
  } catch (e) {
    console.error(e);
    return { ok: false as const };
  }
}
