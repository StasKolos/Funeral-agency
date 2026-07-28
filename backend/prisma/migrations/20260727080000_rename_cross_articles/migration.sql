WITH "orderedCrosses" AS (
    SELECT
        "product"."id",
        ROW_NUMBER() OVER (
            ORDER BY "product"."sortOrder" ASC, "product"."id" ASC
        ) AS "position"
    FROM "Product" AS "product"
    INNER JOIN "ProductCategory" AS "category"
        ON "category"."id" = "product"."categoryId"
    WHERE "category"."code" = 'CROSS'
)
UPDATE "Product" AS "product"
SET
    "name" = 'Крест К-' || "cross"."position",
    "updatedAt" = CURRENT_TIMESTAMP
FROM "orderedCrosses" AS "cross"
WHERE "product"."id" = "cross"."id";
