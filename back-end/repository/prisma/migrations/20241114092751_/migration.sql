/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `ProductCatalog` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `ShoppingCart` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `ProductCatalog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ShoppingCart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductCatalog" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ShoppingCart" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProductCatalog_userId_key" ON "ProductCatalog"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ShoppingCart_userId_key" ON "ShoppingCart"("userId");

-- AddForeignKey
ALTER TABLE "ProductCatalog" ADD CONSTRAINT "ProductCatalog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingCart" ADD CONSTRAINT "ShoppingCart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
