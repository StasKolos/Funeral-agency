ALTER TABLE "Product"
ADD COLUMN "price" INTEGER NOT NULL DEFAULT 1000;

ALTER TABLE "Product"
ADD CONSTRAINT "Product_price_positive" CHECK ("price" > 0);
