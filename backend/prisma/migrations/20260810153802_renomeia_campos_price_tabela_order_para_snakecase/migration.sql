/*
  Warnings:

  - You are about to drop the column `itemsPrice` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `shippingPrice` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `orders` table. All the data in the column will be lost.
  - Added the required column `items_price` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipping_price` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_price` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "itemsPrice",
DROP COLUMN "shippingPrice",
DROP COLUMN "totalPrice",
ADD COLUMN     "items_price" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "shipping_price" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "total_price" DECIMAL(10,2) NOT NULL;
