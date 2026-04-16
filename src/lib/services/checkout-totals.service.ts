import { db } from "@white-shop/db";
import { normalizeShippingMethod } from "../constants/shipping-method";
import { logger } from "../utils/logger";
import type { CheckoutTotalsResponse } from "../types/checkout-totals";
import { adminDeliveryService } from "./admin/admin-delivery.service";
import { cartService } from "./cart.service";

export type CheckoutTotalsGuestItem = {
  productId: string;
  variantId: string;
  quantity: number;
};

export type ComputeCheckoutTotalsInput = {
  userId?: string;
  locale: string;
  cartId?: string;
  guestItems?: CheckoutTotalsGuestItem[];
  shippingMethod: string;
  city?: string;
  country?: string;
};

class CheckoutTotalsService {
  /**
   * Server-side subtotal + shipping + total (matches checkout order computation; cart uses pricing rules from getCart).
   */
  async compute(input: ComputeCheckoutTotalsInput): Promise<CheckoutTotalsResponse> {
    const shippingMethod = normalizeShippingMethod(input.shippingMethod);
    const country = (input.country ?? "Armenia").trim();
    const city = input.city?.trim();

    let subtotal = 0;

    if (input.userId) {
      const { cart } = await cartService.getCart(input.userId, input.locale);
      if (input.cartId && cart.id !== input.cartId) {
        throw {
          status: 400,
          type: "https://api.shop.am/problems/validation-error",
          title: "Validation Error",
          detail: "cartId does not match the current user's cart",
        };
      }
      if (cart.items.length === 0) {
        throw {
          status: 400,
          type: "https://api.shop.am/problems/validation-error",
          title: "Cart is empty",
          detail: "Cannot compute totals for an empty cart",
        };
      }
      subtotal = cart.totals.subtotal;
    } else if (input.guestItems && input.guestItems.length > 0) {
      subtotal = await this.sumGuestItems(input.guestItems);
    } else {
      throw {
        status: 400,
        type: "https://api.shop.am/problems/validation-error",
        title: "Validation Error",
        detail: "Authenticated cart or guest items array is required",
      };
    }

    const discountAmount = 0;
    let shippingAmount = 0;
    if (shippingMethod === "courier" && city) {
      shippingAmount = await adminDeliveryService.getDeliveryPrice(city, country);
      if (shippingAmount < 0) {
        shippingAmount = 0;
      }
    }
    const taxAmount = 0;
    const total = subtotal - discountAmount + shippingAmount + taxAmount;

    logger.debug("Checkout totals computed", {
      subtotal,
      shippingAmount,
      total,
      shippingMethod,
    });

    return {
      currency: "AMD",
      subtotal,
      discountAmount,
      shippingAmount,
      taxAmount,
      total,
    };
  }

  private async sumGuestItems(items: CheckoutTotalsGuestItem[]): Promise<number> {
    const variantIds = [...new Set(items.map((i) => i.variantId))];
    const variants = await db.productVariant.findMany({
      where: { id: { in: variantIds } },
      select: {
        id: true,
        productId: true,
        price: true,
        stock: true,
        published: true,
      },
    });
    const variantMap = new Map(variants.map((v) => [v.id, v]));

    let sum = 0;
    for (const line of items) {
      const variant = variantMap.get(line.variantId);
      if (!variant || !variant.published || variant.productId !== line.productId) {
        throw {
          status: 404,
          type: "https://api.shop.am/problems/not-found",
          title: "Product variant not found",
          detail: `Variant ${line.variantId} not found for product ${line.productId}`,
        };
      }
      if (variant.stock < line.quantity) {
        throw {
          status: 422,
          type: "https://api.shop.am/problems/validation-error",
          title: "Insufficient stock",
          detail: `Insufficient stock for variant ${line.variantId}`,
        };
      }
      sum += Number(variant.price) * line.quantity;
    }
    return sum;
  }
}

export const checkoutTotalsService = new CheckoutTotalsService();
