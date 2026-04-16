import { z } from "zod";

/** Allowed user locale values (see `User.locale` in Prisma). */
const localeSchema = z.enum(["en", "hy", "ru", "ka"]).optional();

/**
 * Body for `PUT /api/v1/users/profile` — all fields optional for forward compatibility;
 * storefront sends full personal form.
 */
export const updateProfileRequestSchema = z.object({
  firstName: z.string().max(120).optional(),
  lastName: z.string().max(120).optional(),
  email: z.union([z.string().email(), z.literal("")]).optional(),
  phone: z.string().max(32).optional(),
  locale: localeSchema,
});

export type UpdateProfileRequest = z.infer<typeof updateProfileRequestSchema>;

export function safeParseUpdateProfile(body: unknown) {
  return updateProfileRequestSchema.safeParse(body);
}
