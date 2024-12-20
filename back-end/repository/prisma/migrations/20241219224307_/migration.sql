/*
  Warnings:

  - You are about to drop the column `cartId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_cartId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "cartId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "shoppingCartId" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "cart_items" ADD COLUMN     "orderId" INTEGER;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shoppingCartId_fkey" FOREIGN KEY ("shoppingCartId") REFERENCES "shopping_carts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
