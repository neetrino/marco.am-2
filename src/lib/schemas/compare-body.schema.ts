import { z } from "zod";

export const compareAddBodySchema = z.object({
  productId: z.string().min(1),
});

export type CompareAddBody = z.infer<typeof compareAddBodySchema>;
