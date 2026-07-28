WITH "generatedProducts" AS (
    SELECT
        "id",
        "categoryId",
        ROW_NUMBER() OVER (
            PARTITION BY "categoryId"
            ORDER BY "sortOrder" ASC, "id" ASC
        ) AS "position",
        COUNT(*) OVER (PARTITION BY "categoryId") AS "total"
    FROM "Product"
    WHERE
        "imageKey" ~ '^products/monument/(vertical-monument-v|memorial-arch-g|memorial-stele-d|memorial-stele-e|memorial-family-zh|memorial-combined-z|memorial-combined-i|memorial-granite-k)-[0-9]+\.webp$'
        OR "imageKey" ~ '^products/cross/memorial-cross-kr-[0-9]+\.webp$'
        OR "imageKey" ~ '^products/decorative-details/decorative-(book|star|heart)-d-[0-9]+\.webp$'
        OR "imageKey" ~ '^products/tables-and-chairs/memorial-furniture-l-[0-9]+\.webp$'
        OR "imageKey" ~ '^products/fences/memorial-fence(-gfe|-large-corner|-small-corner)?-m-[0-9]+\.webp$'
        OR "imageKey" ~ '^products/vases/memorial-vase-n-[0-9]+\.webp$'
        OR "imageKey" ~ '^products/balls/memorial-ball-m-[0-9]+\.webp$'
),
"existingMinimums" AS (
    SELECT
        "product"."categoryId",
        MIN("product"."sortOrder") AS "sortOrder"
    FROM "Product" AS "product"
    LEFT JOIN "generatedProducts" AS "generated"
        ON "generated"."id" = "product"."id"
    WHERE "generated"."id" IS NULL
    GROUP BY "product"."categoryId"
)
UPDATE "Product" AS "product"
SET
    "sortOrder" = COALESCE("minimum"."sortOrder", 0)
        - (("generated"."total" - "generated"."position" + 1) * 10)::INTEGER,
    "updatedAt" = CURRENT_TIMESTAMP
FROM "generatedProducts" AS "generated"
LEFT JOIN "existingMinimums" AS "minimum"
    ON "minimum"."categoryId" = "generated"."categoryId"
WHERE "product"."id" = "generated"."id";
