/**
 * Admin orders list: canonical `Order.status` values exposed as list filters.
 * UX labels (New, In process, Delivered, Canceled) map to these DB values.
 */
export const ADMIN_ORDER_LIST_STATUS_VALUES = [
  "pending",
  "processing",
  "completed",
  "cancelled",
] as const;

export type AdminOrderListStatus = (typeof ADMIN_ORDER_LIST_STATUS_VALUES)[number];

export function isAdminOrderListStatus(
  value: string
): value is AdminOrderListStatus {
  return (ADMIN_ORDER_LIST_STATUS_VALUES as readonly string[]).includes(value);
}
