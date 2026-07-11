-- CreateTable
CREATE TABLE "user_payment_card" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "card_token" TEXT NOT NULL,
    "last_digits" VARCHAR(4) NOT NULL,
    "card_brand" VARCHAR(50) NOT NULL,
    "validate_month" VARCHAR(2) NOT NULL,
    "validate_year" VARCHAR(4) NOT NULL,

    CONSTRAINT "user_payment_card_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_payment_card" ADD CONSTRAINT "user_payment_card_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
