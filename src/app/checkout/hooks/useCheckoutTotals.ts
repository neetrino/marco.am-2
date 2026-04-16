import { useState, useEffect, useRef } from "react";
import { apiClient } from "../../../lib/api-client";
import type { CheckoutTotalsResponse } from "../../../lib/types/checkout-totals";
import { isCourierShipping, type ShippingMethodId } from "../../../lib/constants/shipping-method";
import type { Cart, CartItem } from "../types";

const DEBOUNCE_MS = 400;

function buildGuestPayloadItems(cart: Cart) {
  return cart.items.map((item: CartItem) => ({
    productId: item.variant.product.id,
    variantId: item.variant.id,
    quantity: item.quantity,
  }));
}

export function useCheckoutTotals(
  cart: Cart | null,
  isLoggedIn: boolean,
  shippingMethod: ShippingMethodId,
  shippingCity: string | undefined
) {
  const [totals, setTotals] = useState<CheckoutTotalsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const lastGoodRef = useRef<CheckoutTotalsResponse | null>(null);

  useEffect(() => {
    if (!cart || cart.items.length === 0) {
      setTotals(null);
      lastGoodRef.current = null;
      return;
    }

    const run = async () => {
      setLoading(true);
      try {
        const body: Record<string, unknown> = {
          shippingMethod,
          country: "Armenia",
        };
        if (isCourierShipping(shippingMethod) && shippingCity?.trim()) {
          body.city = shippingCity.trim();
        }

        if (isLoggedIn && cart.id !== "guest-cart") {
          body.cartId = cart.id;
        } else {
          body.items = buildGuestPayloadItems(cart);
        }

        const response = await apiClient.post<CheckoutTotalsResponse>(
          "/api/v1/checkout/totals",
          body
        );
        setTotals(response);
        lastGoodRef.current = response;
      } catch {
        setTotals(lastGoodRef.current);
      } finally {
        setLoading(false);
      }
    };

    const id = window.setTimeout(run, DEBOUNCE_MS);
    return () => window.clearTimeout(id);
  }, [cart, isLoggedIn, shippingMethod, shippingCity]);

  const displayTotals = totals ?? lastGoodRef.current;

  return {
    checkoutTotals: displayTotals,
    loadingCheckoutTotals: loading,
  };
}
