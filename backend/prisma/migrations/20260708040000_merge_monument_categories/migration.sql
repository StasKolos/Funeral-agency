INSERT INTO "ProductCategory" ("code", "name", "sortOrder", "createdAt", "updatedAt")
VALUES ('MONUMENT', 'Стеллы', 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("code") DO UPDATE SET
    "name" = EXCLUDED."name",
    "sortOrder" = EXCLUDED."sortOrder",
    "updatedAt" = CURRENT_TIMESTAMP;

UPDATE "Product"
SET
    "categoryId" = (
        SELECT "id"
        FROM "ProductCategory"
        WHERE "code" = 'MONUMENT'
    ),
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "categoryId" IN (
    SELECT "id"
    FROM "ProductCategory"
    WHERE "code" IN ('VERTICAL_MONUMENT', 'HORIZONTAL_MONUMENT')
);

DELETE FROM "ProductCategory"
WHERE "code" IN ('VERTICAL_MONUMENT', 'HORIZONTAL_MONUMENT');
