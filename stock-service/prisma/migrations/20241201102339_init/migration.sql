/*
  Warnings:

  - A unique constraint covering the columns `[product_id,shop_id]` on the table `Stock` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Stock_product_id_shop_id_key" ON "Stock"("product_id", "shop_id");
