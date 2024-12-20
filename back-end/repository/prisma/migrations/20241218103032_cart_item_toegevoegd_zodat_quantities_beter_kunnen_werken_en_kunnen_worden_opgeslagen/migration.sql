/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductToShoppingCart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToShoppingCart" DROP CONSTRAINT "_ProductToShoppingCart_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToShoppingCart" DROP CONSTRAINT "_ProductToShoppingCart_B_fkey";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "_ProductToShoppingCart";

-- CreateTable
CREATE TABLE "CartItem" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "shoppingCartId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_shoppingCartId_fkey" FOREIGN KEY ("shoppingCartId") REFERENCES "ShoppingCart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
