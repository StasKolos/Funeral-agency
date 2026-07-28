WITH "orderedDetails" AS (
    SELECT
        "product"."id",
        ROW_NUMBER() OVER (
            ORDER BY "product"."sortOrder" ASC, "product"."id" ASC
        ) AS "position"
    FROM "Product" AS "product"
    INNER JOIN "ProductCategory" AS "category"
        ON "category"."id" = "product"."categoryId"
    WHERE "category"."code" = 'DECORATIVE_DETAILS'
)
UPDATE "Product" AS "product"
SET
    "name" = REGEXP_REPLACE(
        "product"."name",
        '\s+[А-ЯЁA-Z]+-[0-9]+$',
        ''
    ) || ' Д-' || "detail"."position",
    "updatedAt" = CURRENT_TIMESTAMP
FROM "orderedDetails" AS "detail"
WHERE "product"."id" = "detail"."id";
