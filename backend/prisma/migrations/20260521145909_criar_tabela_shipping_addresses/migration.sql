-- CreateTable
CREATE TABLE "shipping_addresses" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "street" VARCHAR(150) NOT NULL,
    "number" VARCHAR(10) NOT NULL,
    "address_complement" VARCHAR(100),
    "city" VARCHAR(50) NOT NULL,
    "state" CHAR(2) NOT NULL,
    "zip_code" VARCHAR(9) NOT NULL,

    CONSTRAINT "shipping_addresses_pkey" PRIMARY KEY ("id")
);
