-- CreateEnum
CREATE TYPE "ProductClass" AS ENUM ('retail', 'wholesale');

-- AlterTable
ALTER TABLE "products"
ADD COLUMN "productClass" "ProductClass" NOT NULL DEFAULT 'retail';

-- AlterTable
ALTER TABLE "product_variants"
ADD COLUMN "productClass" "ProductClass" NOT NULL DEFAULT 'retail';
