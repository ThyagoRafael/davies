/*
  Warnings:

  - You are about to drop the column `total` on the `orders` table. All the data in the column will be lost.
  - Added the required column `itemsPrice` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingPrice` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "total",
ADD COLUMN     "itemsPrice" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "shippingPrice" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "totalPrice" DECIMAL(10,2) NOT NULL;
