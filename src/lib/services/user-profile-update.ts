import { db } from "@white-shop/db";
import { logger } from "@/lib/utils/logger";
import type { UpdateProfileRequest } from "@/lib/schemas/user-profile.schema";

function resolveStringField(
  current: string | null,
  incoming: string | undefined
): string | null | undefined {
  if (incoming === undefined) {
    return undefined;
  }
  const trimmed = incoming.trim();
  return trimmed === "" ? null : trimmed;
}

function resolveEmail(
  current: string | null,
  incoming: string | undefined
): string | null | undefined {
  if (incoming === undefined) {
    return undefined;
  }
  const trimmed = incoming.trim();
  return trimmed === "" ? null : trimmed.toLowerCase();
}

/**
 * Applies validated profile fields; throws RFC7807-shaped objects for API layer.
 */
export async function applyUserProfileUpdate(
  userId: string,
  input: UpdateProfileRequest
): Promise<void> {
  const current = await db.user.findFirst({
    where: { id: userId, deletedAt: null },
    select: { firstName: true, lastName: true, email: true, phone: true },
  });

  if (!current) {
    throw {
      status: 404,
      type: "https://api.shop.am/problems/not-found",
      title: "User not found",
      detail: "User not found",
    };
  }

  const firstName = resolveStringField(current.firstName, input.firstName);
  const lastName = resolveStringField(current.lastName, input.lastName);
  const nextEmail = resolveEmail(current.email, input.email);
  const nextPhone = resolveStringField(current.phone, input.phone);

  const mergedEmail = nextEmail !== undefined ? nextEmail : current.email;
  const mergedPhone = nextPhone !== undefined ? nextPhone : current.phone;

  if (!mergedEmail && !mergedPhone) {
    throw {
      status: 400,
      type: "https://api.shop.am/problems/validation-error",
      title: "Validation Error",
      detail: "Either email or phone is required",
    };
  }

  const emailChanged =
    nextEmail !== undefined && (nextEmail ?? null) !== (current.email ?? null);
  const phoneChanged =
    nextPhone !== undefined && (nextPhone ?? null) !== (current.phone ?? null);

  if (nextEmail !== undefined && nextEmail) {
    const taken = await db.user.findFirst({
      where: {
        email: nextEmail,
        id: { not: userId },
        deletedAt: null,
      },
      select: { id: true },
    });
    if (taken) {
      throw {
        status: 409,
        type: "https://api.shop.am/problems/conflict",
        title: "Conflict",
        detail: "This email is already in use",
      };
    }
  }

  if (nextPhone !== undefined && nextPhone) {
    const taken = await db.user.findFirst({
      where: {
        phone: nextPhone,
        id: { not: userId },
        deletedAt: null,
      },
      select: { id: true },
    });
    if (taken) {
      throw {
        status: 409,
        type: "https://api.shop.am/problems/conflict",
        title: "Conflict",
        detail: "This phone number is already in use",
      };
    }
  }

  const data: {
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    phone?: string | null;
    locale?: string;
    emailVerified?: boolean;
    phoneVerified?: boolean;
  } = {};

  if (firstName !== undefined) {
    data.firstName = firstName;
  }
  if (lastName !== undefined) {
    data.lastName = lastName;
  }
  if (nextEmail !== undefined) {
    data.email = nextEmail;
  }
  if (nextPhone !== undefined) {
    data.phone = nextPhone;
  }
  if (input.locale !== undefined) {
    data.locale = input.locale;
  }
  if (emailChanged) {
    data.emailVerified = false;
  }
  if (phoneChanged) {
    data.phoneVerified = false;
  }

  try {
    await db.user.update({
      where: { id: userId },
      data,
    });
  } catch (error: unknown) {
    const err = error as { code?: string };
    if (err.code === "P2002") {
      throw {
        status: 409,
        type: "https://api.shop.am/problems/conflict",
        title: "Conflict",
        detail: "Email or phone is already in use",
      };
    }
    logger.error("User profile update failed", { error, userId });
    throw {
      status: 500,
      type: "https://api.shop.am/problems/internal-error",
      title: "Internal Server Error",
      detail: "Failed to update profile",
    };
  }
}
