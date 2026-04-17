import { isCourierShipping, type ShippingMethodId } from "../constants/shipping-method";
import type { CheckoutData } from "../types/checkout";
import { isValidEmail } from "../utils/email";

const VALIDATION_TYPE = "https://api.shop.am/problems/validation-error";
const VALIDATION_TITLE = "Validation Error";

const MAX_ORDER_NOTES_LENGTH = 2000;

/** Matches storefront `checkout` phone rule (digits, optional leading +). */
const PHONE_CHECKOUT_PATTERN = /^\+?[0-9]{8,15}$/;

export type ValidatedCheckoutCustomer = {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  notes: string | null;
};

function throwValidation(detail: string): never {
  throw {
    status: 400,
    type: VALIDATION_TYPE,
    title: VALIDATION_TITLE,
    detail,
  };
}

/**
 * Validates and normalizes checkout contact fields and notes.
 * Enforces courier address rules when {@link shippingMethod} is courier.
 */
export function validateCheckoutCustomer(
  data: CheckoutData,
  shippingMethod: ShippingMethodId
): ValidatedCheckoutCustomer {
  const emailRaw = typeof data.email === "string" ? data.email.trim() : "";
  const phoneRaw = typeof data.phone === "string" ? data.phone.trim() : "";
  if (!emailRaw || !phoneRaw) {
    throwValidation("Email and phone are required");
  }
  if (!isValidEmail(emailRaw)) {
    throwValidation("Invalid email format");
  }
  const phoneNormalized = phoneRaw.replace(/\s/g, "");
  if (!PHONE_CHECKOUT_PATTERN.test(phoneNormalized)) {
    throwValidation("Invalid phone number");
  }

  const firstName = typeof data.firstName === "string" ? data.firstName.trim() : "";
  const lastName = typeof data.lastName === "string" ? data.lastName.trim() : "";
  if (!firstName || !lastName) {
    throwValidation("First name and last name are required");
  }

  if (isCourierShipping(shippingMethod)) {
    const sa = data.shippingAddress;
    const line = (sa?.addressLine1 ?? sa?.address ?? "").trim();
    const city = (sa?.city ?? "").trim();
    if (!line || !city) {
      throwValidation(
        "Shipping address and city are required for courier delivery"
      );
    }
  }

  const notesTrimmed = typeof data.notes === "string" ? data.notes.trim() : "";
  const notes =
    notesTrimmed.length > 0
      ? notesTrimmed.slice(0, MAX_ORDER_NOTES_LENGTH)
      : null;

  return {
    email: emailRaw.toLowerCase(),
    phone: phoneNormalized,
    firstName,
    lastName,
    notes,
  };
}
