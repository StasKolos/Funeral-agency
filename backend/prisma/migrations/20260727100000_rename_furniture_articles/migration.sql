WITH "orderedFurniture" AS (
    SELECT
        "product"."id",
        ROW_NUMBER() OVER (
            ORDER BY "product"."sortOrder" ASC, "product"."id" ASC
        ) AS "position"
    FROM "Product" AS "product"
    INNER JOIN "ProductCategory" AS "category"
        ON "category"."id" = "product"."categoryId"
    WHERE "category"."code" = 'TABLES_AND_CHAIRS'
)
UPDATE "Product" AS "product"
SET
    "name" = REGEXP_REPLACE(
        "product"."name",
        '\s+[А-ЯЁA-Z]+-[0-9]+$',
        ''
    ) || ' С-' || "furniture"."position",
    "updatedAt" = CURRENT_TIMESTAMP
FROM "orderedFurniture" AS "furniture"
WHERE "product"."id" = "furniture"."id";
