WITH "orderedWreaths" AS (
    SELECT
        "product"."id",
        ROW_NUMBER() OVER (
            ORDER BY "product"."sortOrder" ASC, "product"."id" ASC
        ) AS "position"
    FROM "Product" AS "product"
    INNER JOIN "ProductCategory" AS "category"
        ON "category"."id" = "product"."categoryId"
    WHERE "category"."code" = 'WREATHS'
)
UPDATE "Product" AS "product"
SET
    "name" = 'Венок В-' || "wreath"."position",
    "updatedAt" = CURRENT_TIMESTAMP
FROM "orderedWreaths" AS "wreath"
WHERE "product"."id" = "wreath"."id";
