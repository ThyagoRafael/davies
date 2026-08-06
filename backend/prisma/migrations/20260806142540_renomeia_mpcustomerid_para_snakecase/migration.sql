/*
  Warnings:

  - You are about to drop the column `mpCustomerId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mp_customer_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "users_mpCustomerId_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "mpCustomerId",
ADD COLUMN     "mp_customer_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_mp_customer_id_key" ON "users"("mp_customer_id");
