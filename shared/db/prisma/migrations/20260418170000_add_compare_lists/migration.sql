-- CreateTable
CREATE TABLE "compare_lists" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "sessionToken" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "compare_lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compare_items" (
    "id" TEXT NOT NULL,
    "compareListId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "compare_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "compare_lists_userId_key" ON "compare_lists"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "compare_lists_sessionToken_key" ON "compare_lists"("sessionToken");

-- CreateIndex
CREATE INDEX "compare_lists_expiresAt_idx" ON "compare_lists"("expiresAt");

-- CreateIndex
CREATE INDEX "compare_items_compareListId_idx" ON "compare_items"("compareListId");

-- CreateIndex
CREATE UNIQUE INDEX "compare_items_compareListId_productId_key" ON "compare_items"("compareListId", "productId");

-- AddForeignKey
ALTER TABLE "compare_lists" ADD CONSTRAINT "compare_lists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compare_items" ADD CONSTRAINT "compare_items_compareListId_fkey" FOREIGN KEY ("compareListId") REFERENCES "compare_lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compare_items" ADD CONSTRAINT "compare_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
