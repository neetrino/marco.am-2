import { db } from "@white-shop/db";
import { logger } from "./logger";

let productClassColumnsChecked = false;
let productClassColumnsExist = false;

function isProductClassColumnMissing(error: unknown): boolean {
  const prismaError = error as {
    code?: string;
    message?: string;
    meta?: { column?: string };
  };

  const message = prismaError?.message ?? "";
  const column = prismaError?.meta?.column ?? "";

  if (column === "products.productClass" || column === "product_variants.productClass") {
    return true;
  }

  const isColumnMissingMessage =
    message.includes("products.productClass") ||
    message.includes("product_variants.productClass") ||
    (message.includes("column") && message.includes("productClass") && message.includes("does not exist"));

  if (prismaError?.code === "P2022") {
    return isColumnMissingMessage;
  }

  if (prismaError?.code === "P2010") {
    return isColumnMissingMessage;
  }

  return false;
}

export async function ensureProductClassColumns(): Promise<boolean> {
  if (productClassColumnsChecked && productClassColumnsExist) {
    return true;
  }

  try {
    await db.$queryRaw`SELECT "productClass" FROM "products" LIMIT 1`;
    await db.$queryRaw`SELECT "productClass" FROM "product_variants" LIMIT 1`;
    productClassColumnsChecked = true;
    productClassColumnsExist = true;
    return true;
  } catch (error: unknown) {
    if (!isProductClassColumnMissing(error)) {
      const prismaError = error as { code?: string; message?: string };
      logger.error("Unexpected error checking productClass columns", {
        code: prismaError?.code,
        message: prismaError?.message,
      });
      productClassColumnsChecked = true;
      productClassColumnsExist = false;
      return false;
    }

    logger.warn("productClass columns missing, creating enum/columns fallback");

    try {
      await db.$executeRawUnsafe(`
        DO $$
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ProductClass') THEN
            CREATE TYPE "ProductClass" AS ENUM ('retail', 'wholesale');
          END IF;
        END
        $$;
      `);

      await db.$executeRaw`
        ALTER TABLE "products"
        ADD COLUMN IF NOT EXISTS "productClass" "ProductClass" NOT NULL DEFAULT 'retail'
      `;

      await db.$executeRaw`
        ALTER TABLE "product_variants"
        ADD COLUMN IF NOT EXISTS "productClass" "ProductClass" NOT NULL DEFAULT 'retail'
      `;

      logger.info("productClass enum/columns ensured successfully");
      productClassColumnsChecked = true;
      productClassColumnsExist = true;
      return true;
    } catch (createError: unknown) {
      const prismaCreateError = createError as { code?: string; message?: string };
      logger.error("Failed to ensure productClass enum/columns", {
        code: prismaCreateError?.code,
        message: prismaCreateError?.message,
      });
      productClassColumnsChecked = true;
      productClassColumnsExist = false;
      return false;
    }
  }
}
