/*
  Warnings:

  - Added the required column `holder_name` to the `user_payment_card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_payment_card" ADD COLUMN     "holder_name" VARCHAR(50) NOT NULL;
