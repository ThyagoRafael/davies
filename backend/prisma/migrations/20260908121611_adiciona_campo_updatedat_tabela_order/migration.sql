ALTER TABLE "orders"
ADD COLUMN "updated_at" TIMESTAMP(3);

UPDATE "orders"
SET "updated_at" = "created_at";

ALTER TABLE "orders"
ALTER COLUMN "updated_at" SET NOT NULL;
