/*
  Warnings:

  - Made the column `receiver_name` on table `shipping_addresses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `receiver_phone` on table `shipping_addresses` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "shipping_addresses" ALTER COLUMN "receiver_name" SET NOT NULL,
ALTER COLUMN "receiver_phone" SET NOT NULL;
