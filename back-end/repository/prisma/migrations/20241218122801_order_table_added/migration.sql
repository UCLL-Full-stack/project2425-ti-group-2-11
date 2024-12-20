-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "cartId" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "ShoppingCart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
