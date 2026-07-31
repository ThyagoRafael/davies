/*
  Warnings:

  - A unique constraint covering the columns `[order_code]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order_code` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "order_code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "orders_order_code_key" ON "orders"("order_code");
