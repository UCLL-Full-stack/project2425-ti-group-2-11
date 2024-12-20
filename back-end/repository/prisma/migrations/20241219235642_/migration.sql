-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_shoppingCartId_fkey";

-- AlterTable
ALTER TABLE "cart_items" ALTER COLUMN "shoppingCartId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_shoppingCartId_fkey" FOREIGN KEY ("shoppingCartId") REFERENCES "shopping_carts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
