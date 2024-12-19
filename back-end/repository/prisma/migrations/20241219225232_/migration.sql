/*
  Warnings:

  - You are about to drop the column `shoppingCartId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_shoppingCartId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "shoppingCartId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
