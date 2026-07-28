WITH "orderedCoffins" AS (
    SELECT
        "product"."id",
        ROW_NUMBER() OVER (
            ORDER BY "product"."sortOrder" ASC, "product"."id" ASC
        ) AS "position"
    FROM "Product" AS "product"
    INNER JOIN "ProductCategory" AS "category"
        ON "category"."id" = "product"."categoryId"
    WHERE "category"."code" = 'COFFIN'
)
UPDATE "Product" AS "product"
SET
    "name" = 'Гроб Г-' || "coffin"."position",
    "updatedAt" = CURRENT_TIMESTAMP
FROM "orderedCoffins" AS "coffin"
WHERE "product"."id" = "coffin"."id";
