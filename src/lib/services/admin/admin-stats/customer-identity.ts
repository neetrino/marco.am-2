/**
 * Stable key for grouping orders by customer.
 * Logged-in checkout uses `userId`; guests use normalized email when present.
 * Orders with neither cannot be attributed for new/repeat or top-customer lists.
 */
export function buildCustomerIdentityKey(
  userId: string | null | undefined,
  customerEmail: string | null | undefined
): string | null {
  if (userId && userId.length > 0) {
    return `user:${userId}`;
  }
  const trimmed = customerEmail?.trim();
  if (trimmed && trimmed.length > 0) {
    return `email:${trimmed.toLowerCase()}`;
  }
  return null;
}
