WITH "orderedBaskets" AS (
    SELECT
        "product"."id",
        ROW_NUMBER() OVER (
            ORDER BY "product"."sortOrder" ASC, "product"."id" ASC
        ) AS "position"
    FROM "Product" AS "product"
    INNER JOIN "ProductCategory" AS "category"
        ON "category"."id" = "product"."categoryId"
    WHERE "category"."code" = 'BASKETS'
)
UPDATE "Product" AS "product"
SET
    "name" = 'Корзина К-' || "basket"."position",
    "updatedAt" = CURRENT_TIMESTAMP
FROM "orderedBaskets" AS "basket"
WHERE "product"."id" = "basket"."id";
