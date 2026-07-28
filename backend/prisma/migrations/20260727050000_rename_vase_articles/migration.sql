WITH "orderedVases" AS (
    SELECT
        "product"."id",
        ROW_NUMBER() OVER (
            ORDER BY "product"."sortOrder" ASC, "product"."id" ASC
        ) AS "position"
    FROM "Product" AS "product"
    INNER JOIN "ProductCategory" AS "category"
        ON "category"."id" = "product"."categoryId"
    WHERE "category"."code" = 'VASES'
)
UPDATE "Product" AS "product"
SET
    "name" = 'Ваза В-' || "vase"."position",
    "updatedAt" = CURRENT_TIMESTAMP
FROM "orderedVases" AS "vase"
WHERE "product"."id" = "vase"."id";
