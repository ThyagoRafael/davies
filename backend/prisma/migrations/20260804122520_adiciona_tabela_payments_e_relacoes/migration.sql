-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('card', 'pix');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'paid', 'failed', 'expired', 'canceled');

-- CreateEnum
CREATE TYPE "PaymentGateway" AS ENUM ('stripe', 'pagarme');

-- CreateTable
CREATE TABLE "payments" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "method" "PaymentMethod" NOT NULL,
    "gateway" "PaymentGateway" NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'pending',
    "amount" DECIMAL(10,2) NOT NULL,
    "external_id" TEXT,
    "gateway_secret" TEXT,
    "user_payment_card_id" INTEGER,
    "pix_qr_code" TEXT,
    "pix_copy_paste" TEXT,
    "pix_expires_at" TIMESTAMP(3),
    "paid_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payments_external_id_key" ON "payments"("external_id");

-- CreateIndex
CREATE INDEX "payments_order_id_idx" ON "payments"("order_id");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_payment_card_id_fkey" FOREIGN KEY ("user_payment_card_id") REFERENCES "user_payment_card"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
