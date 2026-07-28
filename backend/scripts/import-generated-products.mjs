import { HeadObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { createReadStream } from 'node:fs';
import { readdir, stat } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Pool } from 'pg';

const EXPECTED_PRODUCT_COUNT = 313;
const UPLOAD_CONCURRENCY = 8;
const SORT_ORDER_STEP = 10;
const DRY_RUN = process.argv.includes('--dry-run');

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const backendDirectory = resolve(scriptDirectory, '..');
const repositoryDirectory = resolve(backendDirectory, '..');
const generatedProductsDirectory = resolve(
    repositoryDirectory,
    'frontend',
    'public',
    'generated-products',
);

dotenv.config({ path: resolve(backendDirectory, '.env') });

const getRequiredEnvironmentValue = (name) => {
    const value = process.env[name]?.trim();

    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }

    return value;
};

const CATEGORY_CONFIG = {
    MONUMENT: {
        articlePrefix: 'С',
        name: 'Стеллы',
        sortOrder: 10,
        storageDirectory: 'products/monument',
    },
    CROSS: {
        articlePrefix: 'К',
        name: 'Кресты',
        sortOrder: 30,
        storageDirectory: 'products/cross',
    },
    DECORATIVE_DETAILS: {
        articlePrefix: 'Д',
        name: 'Декоративные детали',
        sortOrder: 35,
        storageDirectory: 'products/decorative-details',
    },
    TABLES_AND_CHAIRS: {
        articlePrefix: 'С',
        name: 'Столы и лавки',
        sortOrder: 40,
        storageDirectory: 'products/tables-and-chairs',
    },
    FENCES: {
        articlePrefix: 'О',
        name: 'Ограды',
        sortOrder: 50,
        storageDirectory: 'products/fences',
    },
    VASES: {
        articlePrefix: 'В',
        name: 'Вазы',
        sortOrder: 60,
        storageDirectory: 'products/vases',
    },
    BALLS: {
        articlePrefix: 'Ш',
        name: 'Шары',
        sortOrder: 70,
        storageDirectory: 'products/balls',
    },
};

const productRules = [
    {
        pattern: /^vertical-monument-v-(\d+)\.webp$/,
        categoryCode: 'MONUMENT',
        groupOrder: 10,
        createName: (article) => `Стела В-${article}`,
    },
    {
        pattern: /^memorial-arch-g-(\d+)\.webp$/,
        categoryCode: 'MONUMENT',
        groupOrder: 20,
        createName: (article) => `Стела Г-${article}`,
    },
    {
        pattern: /^memorial-stele-d-(\d+)\.webp$/,
        categoryCode: 'MONUMENT',
        groupOrder: 30,
        createName: (article) => `Стела Д-${article}`,
    },
    {
        pattern: /^memorial-stele-e-(\d+)\.webp$/,
        categoryCode: 'MONUMENT',
        groupOrder: 40,
        createName: (article) => `Стела Е-${article}`,
    },
    {
        pattern: /^memorial-family-zh-(\d+)\.webp$/,
        categoryCode: 'MONUMENT',
        groupOrder: 50,
        createName: (article) => `Семейная стела Ж-${article}`,
    },
    {
        pattern: /^memorial-combined-z-(\d+)\.webp$/,
        categoryCode: 'MONUMENT',
        groupOrder: 60,
        createName: (article) => `Стела З-${article}`,
    },
    {
        pattern: /^memorial-combined-i-(\d+)\.webp$/,
        categoryCode: 'MONUMENT',
        groupOrder: 70,
        createName: (article) => `Стела И-${article}`,
    },
    {
        pattern: /^memorial-granite-k-(\d+)\.webp$/,
        categoryCode: 'MONUMENT',
        groupOrder: 80,
        createName: (article) => `Стела К-${article}`,
    },
    {
        pattern: /^memorial-cross-kr-(\d+)\.webp$/,
        categoryCode: 'CROSS',
        groupOrder: 10,
        createName: (article) => `Крест КР-${article}`,
    },
    {
        pattern: /^decorative-book-d-(\d+)\.webp$/,
        categoryCode: 'DECORATIVE_DETAILS',
        groupOrder: 10,
        createName: (article) => `Книга Д-${article}`,
    },
    {
        pattern: /^decorative-star-d-(\d+)\.webp$/,
        categoryCode: 'DECORATIVE_DETAILS',
        groupOrder: 20,
        createName: (article) => `Звезда Д-${article}`,
    },
    {
        pattern: /^decorative-heart-d-(\d+)\.webp$/,
        categoryCode: 'DECORATIVE_DETAILS',
        groupOrder: 30,
        createName: (article) => `Сердце Д-${article}`,
    },
    {
        pattern: /^memorial-furniture-l-(\d+)\.webp$/,
        categoryCode: 'TABLES_AND_CHAIRS',
        groupOrder: 10,
        createName: (article) => {
            if (article <= 3) {
                return `Лавка Л-${article}`;
            }

            if (article <= 5) {
                return `Угловая лавка Л-${article}`;
            }

            return `Стол и лавка Л-${article}`;
        },
    },
    {
        pattern: /^memorial-fence-m-(\d+)\.webp$/,
        categoryCode: 'FENCES',
        groupOrder: 10,
        createName: (article) => `Ограда М-${article}`,
    },
    {
        pattern: /^memorial-fence-gfe-m-(\d+)\.webp$/,
        categoryCode: 'FENCES',
        groupOrder: 20,
        createName: (article) => `Ограда М-${article}`,
    },
    {
        pattern: /^memorial-fence-large-corner-m-(\d+)\.webp$/,
        categoryCode: 'FENCES',
        groupOrder: 30,
        createName: (article) => `Ограда М-${article}`,
    },
    {
        pattern: /^memorial-fence-small-corner-m-(\d+)\.webp$/,
        categoryCode: 'FENCES',
        groupOrder: 40,
        createName: (article) => `Ограда М-${article}`,
    },
    {
        pattern: /^memorial-vase-n-(\d+)\.webp$/,
        categoryCode: 'VASES',
        groupOrder: 10,
        createName: (article) => `Ваза Н-${article}`,
    },
    {
        pattern: /^memorial-ball-m-(\d+)\.webp$/,
        categoryCode: 'BALLS',
        groupOrder: 10,
        createName: (article) => `Шар М-${article}`,
    },
];

const createManifestItem = (fileName) => {
    for (const rule of productRules) {
        const match = fileName.match(rule.pattern);

        if (!match) {
            continue;
        }

        const articleNumber = Number(match[1]);
        const category = CATEGORY_CONFIG[rule.categoryCode];

        return {
            fileName,
            filePath: resolve(generatedProductsDirectory, fileName),
            categoryCode: rule.categoryCode,
            groupOrder: rule.groupOrder,
            articleNumber,
            name: rule.createName(articleNumber),
            imageKey: `${category.storageDirectory}/${fileName}`,
        };
    }

    throw new Error(`No product mapping configured for ${fileName}`);
};

const groupByCategory = (items) =>
    items.reduce((groups, item) => {
        const categoryItems = groups.get(item.categoryCode) ?? [];
        categoryItems.push(item);
        groups.set(item.categoryCode, categoryItems);
        return groups;
    }, new Map());

const runWithConcurrency = async (items, concurrency, handler) => {
    let currentIndex = 0;

    const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
        while (currentIndex < items.length) {
            const itemIndex = currentIndex;
            currentIndex += 1;
            await handler(items[itemIndex], itemIndex);
        }
    });

    await Promise.all(workers);
};

const main = async () => {
    const fileNames = (await readdir(generatedProductsDirectory))
        .filter((fileName) => fileName.endsWith('.webp'))
        .sort((left, right) => left.localeCompare(right, 'en', { numeric: true }));
    const categoryArticlePositions = new Map();
    const manifest = fileNames
        .map(createManifestItem)
        .sort((left, right) => {
            const categoryComparison = left.categoryCode.localeCompare(right.categoryCode);

            if (categoryComparison !== 0) {
                return categoryComparison;
            }

            return left.groupOrder - right.groupOrder || left.articleNumber - right.articleNumber;
        })
        .map((item) => {
            const articlePosition = (categoryArticlePositions.get(item.categoryCode) ?? 0) + 1;
            const category = CATEGORY_CONFIG[item.categoryCode];
            const productType = item.name.replace(/\s+[А-ЯЁA-Z]+-\d+$/u, '');
            categoryArticlePositions.set(item.categoryCode, articlePosition);

            return {
                ...item,
                name: `${productType} ${category.articlePrefix}-${articlePosition}`,
            };
        });

    if (manifest.length !== EXPECTED_PRODUCT_COUNT) {
        throw new Error(
            `Expected ${EXPECTED_PRODUCT_COUNT} generated products, found ${manifest.length}`,
        );
    }

    const emptyFiles = [];

    for (const item of manifest) {
        const fileStats = await stat(item.filePath);

        if (!fileStats.isFile() || fileStats.size === 0) {
            emptyFiles.push(item.fileName);
        }
    }

    if (emptyFiles.length > 0) {
        throw new Error(`Empty or missing files: ${emptyFiles.join(', ')}`);
    }

    const databaseUrl = getRequiredEnvironmentValue('DATABASE_URL');
    const pool = new Pool({ connectionString: databaseUrl });
    const prisma = new PrismaClient({
        adapter: new PrismaPg(pool),
    });

    try {
        const categoryGroups = groupByCategory(manifest);
        const summary = [...categoryGroups.entries()].map(([code, items]) => ({
            code,
            count: items.length,
        }));

        console.table(summary);
        console.log(`Prepared ${manifest.length} products.`);

        if (DRY_RUN) {
            const existingCategoryCodes = new Set(
                (
                    await prisma.productCategory.findMany({
                        select: { code: true },
                    })
                ).map((category) => category.code),
            );
            const missingExistingCategories = [...categoryGroups.keys()].filter(
                (code) => code !== 'DECORATIVE_DETAILS' && !existingCategoryCodes.has(code),
            );

            if (missingExistingCategories.length > 0) {
                throw new Error(
                    `Missing product categories: ${missingExistingCategories.join(', ')}`,
                );
            }

            console.log('Dry run completed. No data or storage objects were changed.');
            return;
        }

        await prisma.productCategory.upsert({
            where: { code: 'DECORATIVE_DETAILS' },
            update: {
                name: CATEGORY_CONFIG.DECORATIVE_DETAILS.name,
                sortOrder: CATEGORY_CONFIG.DECORATIVE_DETAILS.sortOrder,
            },
            create: {
                code: 'DECORATIVE_DETAILS',
                name: CATEGORY_CONFIG.DECORATIVE_DETAILS.name,
                sortOrder: CATEGORY_CONFIG.DECORATIVE_DETAILS.sortOrder,
            },
        });

        const categories = await prisma.productCategory.findMany({
            where: {
                code: {
                    in: [...categoryGroups.keys()],
                },
            },
            select: {
                id: true,
                code: true,
            },
        });
        const categoriesByCode = new Map(categories.map((category) => [category.code, category]));

        for (const code of categoryGroups.keys()) {
            if (!categoriesByCode.has(code)) {
                throw new Error(`Missing product category after upsert: ${code}`);
            }
        }

        const s3Client = new S3Client({
            endpoint: getRequiredEnvironmentValue('S3_ENDPOINT'),
            region: getRequiredEnvironmentValue('S3_REGION'),
            forcePathStyle: true,
            credentials: {
                accessKeyId: getRequiredEnvironmentValue('S3_ACCESS_KEY'),
                secretAccessKey: getRequiredEnvironmentValue('S3_SECRET_KEY'),
            },
        });
        const bucket = getRequiredEnvironmentValue('S3_BUCKET');
        let uploadedCount = 0;

        await runWithConcurrency(manifest, UPLOAD_CONCURRENCY, async (item) => {
            await s3Client.send(
                new PutObjectCommand({
                    Bucket: bucket,
                    Key: item.imageKey,
                    Body: createReadStream(item.filePath),
                    ContentType: 'image/webp',
                    CacheControl: 'public, max-age=31536000, immutable',
                }),
            );
            uploadedCount += 1;

            if (uploadedCount % 25 === 0 || uploadedCount === manifest.length) {
                console.log(`Uploaded ${uploadedCount}/${manifest.length} images.`);
            }
        });

        const productOperations = [];

        for (const [categoryCode, items] of categoryGroups.entries()) {
            const category = categoriesByCode.get(categoryCode);
            const imageKeys = items.map((item) => item.imageKey);
            const existingBase = await prisma.product.aggregate({
                where: {
                    categoryId: category.id,
                    imageKey: {
                        notIn: imageKeys,
                    },
                },
                _min: {
                    sortOrder: true,
                },
            });
            const existingMinSortOrder = existingBase._min.sortOrder ?? 0;
            const baseSortOrder =
                existingMinSortOrder - (items.length + 1) * SORT_ORDER_STEP;

            items.forEach((item, index) => {
                const data = {
                    name: item.name,
                    imageKey: item.imageKey,
                    sortOrder: baseSortOrder + (index + 1) * SORT_ORDER_STEP,
                    categoryId: category.id,
                };

                productOperations.push(
                    prisma.product.upsert({
                        where: {
                            imageKey: item.imageKey,
                        },
                        update: data,
                        create: data,
                    }),
                );
            });
        }

        await prisma.$transaction(productOperations);

        let verifiedObjects = 0;

        await runWithConcurrency(manifest, UPLOAD_CONCURRENCY, async (item) => {
            await s3Client.send(
                new HeadObjectCommand({
                    Bucket: bucket,
                    Key: item.imageKey,
                }),
            );
            verifiedObjects += 1;
        });

        const storedProducts = await prisma.product.findMany({
            where: {
                imageKey: {
                    in: manifest.map((item) => item.imageKey),
                },
            },
            select: {
                imageKey: true,
            },
        });

        if (storedProducts.length !== manifest.length || verifiedObjects !== manifest.length) {
            throw new Error(
                `Verification failed: database=${storedProducts.length}, storage=${verifiedObjects}`,
            );
        }

        console.log(
            `Import completed: ${storedProducts.length} products and ${verifiedObjects} images verified.`,
        );
    } finally {
        await prisma.$disconnect();
        await pool.end();
    }
};

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
