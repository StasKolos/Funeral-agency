WITH "orderedFences" AS (
    SELECT
        "product"."id",
        ROW_NUMBER() OVER (
            ORDER BY "product"."sortOrder" ASC, "product"."id" ASC
        ) AS "position"
    FROM "Product" AS "product"
    INNER JOIN "ProductCategory" AS "category"
        ON "category"."id" = "product"."categoryId"
    WHERE "category"."code" = 'FENCES'
)
UPDATE "Product" AS "product"
SET
    "name" = 'Ограда О-' || "fence"."position",
    "updatedAt" = CURRENT_TIMESTAMP
FROM "orderedFences" AS "fence"
WHERE "product"."id" = "fence"."id";
