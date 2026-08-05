/*
  Warnings:

  - You are about to drop the column `gateway_secret` on the `payments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "payments" DROP COLUMN "gateway_secret";
