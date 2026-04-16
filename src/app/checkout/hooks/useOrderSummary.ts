import { useMemo } from "react";
import { convertPrice } from "../../../lib/currency";
import type { CheckoutTotalsResponse } from "../../../lib/types/checkout-totals";
import type { Cart } from "../types";

interface UseOrderSummaryProps {
  cart: Cart | null;
  /** Server-authoritative totals (AMD); when null, legacy cart subtotal + zero shipping until first response */
  checkoutTotals: CheckoutTotalsResponse | null;
  currency: "USD" | "AMD" | "EUR" | "RUB" | "GEL";
}

export function useOrderSummary({
  cart,
  checkoutTotals,
  currency,
}: UseOrderSummaryProps) {
  const orderSummary = useMemo(() => {
    if (!cart || cart.items.length === 0) {
      return {
        subtotalAMD: 0,
        taxAMD: 0,
        shippingAMD: 0,
        totalAMD: 0,
        subtotalDisplay: 0,
        taxDisplay: 0,
        shippingDisplay: 0,
        totalDisplay: 0,
      };
    }

    if (checkoutTotals) {
      const subtotalAMD = checkoutTotals.subtotal;
      const taxAMD = checkoutTotals.taxAmount;
      const shippingAMD = checkoutTotals.shippingAmount;
      const totalAMD = checkoutTotals.total;

      const subtotalDisplay =
        currency === "AMD" ? subtotalAMD : convertPrice(subtotalAMD, "AMD", currency);
      const taxDisplay = currency === "AMD" ? taxAMD : convertPrice(taxAMD, "AMD", currency);
      const shippingDisplay =
        currency === "AMD" ? shippingAMD : convertPrice(shippingAMD, "AMD", currency);
      const totalDisplay =
        currency === "AMD" ? totalAMD : convertPrice(totalAMD, "AMD", currency);

      return {
        subtotalAMD,
        taxAMD,
        shippingAMD,
        totalAMD,
        subtotalDisplay,
        taxDisplay,
        shippingDisplay,
        totalDisplay,
      };
    }

    const subtotalAMD =
      cart.totals.currency === "AMD"
        ? cart.totals.subtotal
        : convertPrice(cart.totals.subtotal, "USD", "AMD");
    const taxAMD =
      cart.totals.currency === "AMD"
        ? cart.totals.tax
        : convertPrice(cart.totals.tax, "USD", "AMD");
    const shippingAMD = 0;
    const totalAMD = subtotalAMD + taxAMD + shippingAMD;

    const subtotalDisplay =
      currency === "AMD" ? subtotalAMD : convertPrice(subtotalAMD, "AMD", currency);
    const taxDisplay = currency === "AMD" ? taxAMD : convertPrice(taxAMD, "AMD", currency);
    const shippingDisplay =
      currency === "AMD" ? shippingAMD : convertPrice(shippingAMD, "AMD", currency);
    const totalDisplay =
      currency === "AMD" ? totalAMD : convertPrice(totalAMD, "AMD", currency);

    return {
      subtotalAMD,
      taxAMD,
      shippingAMD,
      totalAMD,
      subtotalDisplay,
      taxDisplay,
      shippingDisplay,
      totalDisplay,
    };
  }, [cart, checkoutTotals, currency]);

  return { orderSummary };
}
