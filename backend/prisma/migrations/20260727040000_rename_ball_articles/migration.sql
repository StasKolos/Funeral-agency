WITH "orderedBalls" AS (
    SELECT
        "product"."id",
        ROW_NUMBER() OVER (
            ORDER BY "product"."sortOrder" ASC, "product"."id" ASC
        ) AS "position"
    FROM "Product" AS "product"
    INNER JOIN "ProductCategory" AS "category"
        ON "category"."id" = "product"."categoryId"
    WHERE "category"."code" = 'BALLS'
)
UPDATE "Product" AS "product"
SET
    "name" = 'Шар Ш-' || "ball"."position",
    "updatedAt" = CURRENT_TIMESTAMP
FROM "orderedBalls" AS "ball"
WHERE "product"."id" = "ball"."id";
