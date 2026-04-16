/**
 * Response from POST /api/v1/checkout/totals — amounts in AMD (same as Order row).
 */
export type CheckoutTotalsResponse = {
  currency: "AMD";
  subtotal: number;
  discountAmount: number;
  shippingAmount: number;
  taxAmount: number;
  total: number;
};
