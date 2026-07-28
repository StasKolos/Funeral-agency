import {
    GetObjectCommand,
    HeadObjectCommand,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { basename, dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Pool } from 'pg';

const EXPECTED_PRODUCT_COUNT = 313;
const EXPECTED_LEGACY_PRODUCT_COUNT = 328;
const PROCESS_CONCURRENCY = 4;
const WATERMARK_CENTER_X = 599;
const WATERMARK_TOP = 144;
const WATERMARK_HEIGHT = 58;
const WATERMARK_RADIUS = 14;
const WATERMARK_OPACITY = 0.3;

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const backendDirectory = resolve(scriptDirectory, '..');
const repositoryDirectory = resolve(backendDirectory, '..');
const frontendRequire = createRequire(resolve(repositoryDirectory, 'frontend', 'package.json'));
const sharp = frontendRequire('sharp');

dotenv.config({ path: resolve(backendDirectory, '.env') });

const getArgumentValue = (name) => {
    const prefix = `--${name}=`;
    const argument = process.argv.find((value) => value.startsWith(prefix));

    return argument?.slice(prefix.length);
};

const APPLY = process.argv.includes('--apply');
const previewCount = Number(getArgumentValue('preview') ?? 0);
const matchFilter = getArgumentValue('match');
const outputDirectory = resolve(
    repositoryDirectory,
    getArgumentValue('output') ?? 'tmp/watermark-preview',
);

const getRequiredEnvironmentValue = (name) => {
    const value = process.env[name]?.trim();

    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }

    return value;
};

const productRules = [
    [/^vertical-monument-v-(\d+)\.webp$/, 'В'],
    [/^memorial-arch-g-(\d+)\.webp$/, 'Г'],
    [/^memorial-stele-d-(\d+)\.webp$/, 'Д'],
    [/^memorial-stele-e-(\d+)\.webp$/, 'Е'],
    [/^memorial-family-zh-(\d+)\.webp$/, 'Ж'],
    [/^memorial-combined-z-(\d+)\.webp$/, 'З'],
    [/^memorial-combined-i-(\d+)\.webp$/, 'И'],
    [/^memorial-granite-k-(\d+)\.webp$/, 'К'],
    [/^memorial-cross-kr-(\d+)\.webp$/, 'КР'],
    [/^decorative-book-d-(\d+)\.webp$/, 'Д'],
    [/^decorative-star-d-(\d+)\.webp$/, 'Д'],
    [/^decorative-heart-d-(\d+)\.webp$/, 'Д'],
    [/^memorial-furniture-l-(\d+)\.webp$/, 'Л'],
    [/^memorial-fence-m-(\d+)\.webp$/, 'М'],
    [/^memorial-fence-gfe-m-(\d+)\.webp$/, 'М'],
    [/^memorial-fence-large-corner-m-(\d+)\.webp$/, 'М'],
    [/^memorial-fence-small-corner-m-(\d+)\.webp$/, 'М'],
    [/^memorial-vase-n-(\d+)\.webp$/, 'Н'],
    [/^memorial-ball-m-(\d+)\.webp$/, 'М'],
];

const getOldArticle = (imageKey) => {
    const fileName = basename(imageKey);

    for (const [pattern, prefix] of productRules) {
        const match = fileName.match(pattern);

        if (match) {
            return `${prefix}-${match[1]}`;
        }
    }

    return null;
};

const getCurrentArticle = (name) => {
    const match = name.match(/([А-ЯЁ]+-\d+)$/u);

    if (!match) {
        throw new Error(`Product name does not end with an article: ${name}`);
    }

    return match[1];
};

const getArticleWidth = (article) => {
    const textWidth = Array.from(article).reduce((width, character) => {
        if (/\d/.test(character)) {
            return width + 23;
        }

        if (character === '-') {
            return width + 14;
        }

        if (/[ЖШЩМЮФ]/u.test(character)) {
            return width + 50;
        }

        return width + 27;
    }, 0);

    return Math.max(114, textWidth + 50);
};

const getVersionedImageKey = (imageKey) => {
    const extension = extname(imageKey);

    return `${imageKey.slice(0, -extension.length)}-article-v2${extension}`;
};

const getOriginalImageKey = (imageKey) =>
    imageKey.replace(/-(?:article|watermark)-v2(?=\.webp$)/, '');

const getFullWatermarkImageKey = (imageKey) => {
    const extension = extname(imageKey);

    return `${imageKey.slice(0, -extension.length)}-watermark-v2${extension}`;
};

const roundedRectangleCoverage = (x, y, left, top, width, height, radius) => {
    const right = left + width;
    const bottom = top + height;

    if (x < left || x >= right || y < top || y >= bottom) {
        return 0;
    }

    const samples = 4;
    let insideSamples = 0;

    for (let sampleY = 0; sampleY < samples; sampleY += 1) {
        for (let sampleX = 0; sampleX < samples; sampleX += 1) {
            const pointX = x + (sampleX + 0.5) / samples;
            const pointY = y + (sampleY + 0.5) / samples;
            const nearestX = Math.max(left + radius, Math.min(pointX, right - radius));
            const nearestY = Math.max(top + radius, Math.min(pointY, bottom - radius));
            const distanceX = pointX - nearestX;
            const distanceY = pointY - nearestY;

            if (distanceX * distanceX + distanceY * distanceY <= radius * radius) {
                insideSamples += 1;
            }
        }
    }

    return insideSamples / (samples * samples);
};

const getPixelIndex = (x, y, width, channels) => (y * width + x) * channels;

const restoreBackgroundBelowOldBadge = (
    source,
    width,
    height,
    channels,
    oldArticle,
    oldTextMask,
) => {
    const restored = Buffer.from(source);
    const oldBadgeWidth = getArticleWidth(oldArticle);
    const oldBadgeLeft = Math.round(WATERMARK_CENTER_X - oldBadgeWidth / 2);
    const textPixels = new Set();

    for (let y = WATERMARK_TOP; y < Math.min(height, WATERMARK_TOP + WATERMARK_HEIGHT); y += 1) {
        for (
            let x = Math.max(0, oldBadgeLeft);
            x < Math.min(width, oldBadgeLeft + oldBadgeWidth);
            x += 1
        ) {
            const coverage = roundedRectangleCoverage(
                x,
                y,
                oldBadgeLeft,
                WATERMARK_TOP,
                oldBadgeWidth,
                WATERMARK_HEIGHT,
                WATERMARK_RADIUS,
            );

            if (coverage === 0) {
                continue;
            }

            const pixelIndex = getPixelIndex(x, y, width, channels);
            const isTextPixel = coverage >= 0.5 && oldTextMask[y * width + x] > 0;

            if (isTextPixel) {
                textPixels.add(`${x}:${y}`);
                continue;
            }

            const opacity = WATERMARK_OPACITY * coverage;
            const remainingOpacity = 1 - opacity;

            for (let channel = 0; channel < 3; channel += 1) {
                restored[pixelIndex + channel] = Math.min(
                    255,
                    Math.round(source[pixelIndex + channel] / remainingOpacity),
                );
            }
        }
    }

    const findRestoredColor = (x, y) => {
        const candidates = [];

        for (let distance = 1; distance <= 32; distance += 1) {
            for (const candidateY of [y - distance, y + distance]) {
                if (candidateY < WATERMARK_TOP || candidateY >= WATERMARK_TOP + WATERMARK_HEIGHT) {
                    continue;
                }

                const key = `${x}:${candidateY}`;
                const coverage = roundedRectangleCoverage(
                    x,
                    candidateY,
                    oldBadgeLeft,
                    WATERMARK_TOP,
                    oldBadgeWidth,
                    WATERMARK_HEIGHT,
                    WATERMARK_RADIUS,
                );

                if (coverage >= 0.75 && !textPixels.has(key)) {
                    const pixelIndex = getPixelIndex(x, candidateY, width, channels);
                    candidates.push([
                        restored[pixelIndex],
                        restored[pixelIndex + 1],
                        restored[pixelIndex + 2],
                    ]);
                }
            }

            if (candidates.length >= 2) {
                break;
            }
        }

        if (candidates.length === 0) {
            return [255, 255, 255];
        }

        return [0, 1, 2].map((channel) =>
            Math.round(
                candidates.reduce((sum, color) => sum + color[channel], 0) / candidates.length,
            ),
        );
    };

    for (const key of textPixels) {
        const [x, y] = key.split(':').map(Number);
        const pixelIndex = getPixelIndex(x, y, width, channels);
        const color = findRestoredColor(x, y);

        for (let channel = 0; channel < 3; channel += 1) {
            restored[pixelIndex + channel] = color[channel];
        }
    }

    return restored;
};

const applyNewBadgeBackground = (source, width, height, channels, badgeWidth) => {
    const result = Buffer.from(source);
    const badgeLeft = Math.round(WATERMARK_CENTER_X - badgeWidth / 2);

    for (let y = WATERMARK_TOP; y < Math.min(height, WATERMARK_TOP + WATERMARK_HEIGHT); y += 1) {
        for (let x = Math.max(0, badgeLeft); x < Math.min(width, badgeLeft + badgeWidth); x += 1) {
            const coverage = roundedRectangleCoverage(
                x,
                y,
                badgeLeft,
                WATERMARK_TOP,
                badgeWidth,
                WATERMARK_HEIGHT,
                WATERMARK_RADIUS,
            );

            if (coverage === 0) {
                continue;
            }

            const pixelIndex = getPixelIndex(x, y, width, channels);
            const remainingOpacity = 1 - WATERMARK_OPACITY * coverage;

            for (let channel = 0; channel < 3; channel += 1) {
                result[pixelIndex + channel] = Math.round(
                    result[pixelIndex + channel] * remainingOpacity,
                );
            }
        }
    }

    return result;
};

const escapeXml = (value) =>
    value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&apos;');

const createArticleTextSvg = (article, width, height) =>
    Buffer.from(`
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <text
                x="${WATERMARK_CENTER_X}"
                y="187"
                fill="#ffffff"
                font-family="Arial, DejaVu Sans, sans-serif"
                font-size="39"
                font-weight="700"
                text-anchor="middle"
            >${escapeXml(article)}</text>
        </svg>
    `);

const createDilatedTextMask = async (article, width, height) => {
    const { data, info } = await sharp(createArticleTextSvg(article, width, height))
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });
    const mask = new Uint8Array(width * height);
    const dilationRadius = 3;

    for (let y = WATERMARK_TOP; y < WATERMARK_TOP + WATERMARK_HEIGHT; y += 1) {
        for (let x = 0; x < width; x += 1) {
            const alpha = data[getPixelIndex(x, y, width, info.channels) + 3];

            if (alpha === 0) {
                continue;
            }

            for (
                let maskY = Math.max(WATERMARK_TOP, y - dilationRadius);
                maskY <= Math.min(height - 1, y + dilationRadius);
                maskY += 1
            ) {
                for (
                    let maskX = Math.max(0, x - dilationRadius);
                    maskX <= Math.min(width - 1, x + dilationRadius);
                    maskX += 1
                ) {
                    mask[maskY * width + maskX] = 255;
                }
            }
        }
    }

    return mask;
};

const updateWatermarkArticle = async (input, oldArticle, newArticle) => {
    const { data, info } = await sharp(input)
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

    if (info.width !== 768 || info.height !== 768 || info.channels !== 4) {
        throw new Error(
            `Unexpected generated image dimensions: ${info.width}x${info.height}, ${info.channels} channels`,
        );
    }

    const oldTextMask = await createDilatedTextMask(oldArticle, info.width, info.height);
    const restored = restoreBackgroundBelowOldBadge(
        data,
        info.width,
        info.height,
        info.channels,
        oldArticle,
        oldTextMask,
    );
    const badgeWidth = Math.max(getArticleWidth(oldArticle), getArticleWidth(newArticle));
    const withBadge = applyNewBadgeBackground(
        restored,
        info.width,
        info.height,
        info.channels,
        badgeWidth,
    );

    return sharp(withBadge, {
        raw: {
            width: info.width,
            height: info.height,
            channels: info.channels,
        },
    })
        .composite([
            {
                input: createArticleTextSvg(newArticle, info.width, info.height),
            },
        ])
        .webp({ quality: 95, smartSubsample: true })
        .toBuffer();
};

const createFullWatermarkSvg = (article, width, height) => {
    const scale = Math.min(width, height) / 768;
    const brandWidth = 282 * scale;
    const brandHeight = 100 * scale;
    const brandRight = 33 * scale;
    const brandLeft = width - brandRight - brandWidth;
    const brandTop = 35 * scale;
    const centerX = width - (768 - WATERMARK_CENTER_X) * scale;
    const articleWidth = getArticleWidth(article) * scale;
    const articleLeft = centerX - articleWidth / 2;
    const articleTop = WATERMARK_TOP * scale;

    return Buffer.from(`
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <rect
                x="${brandLeft}"
                y="${brandTop}"
                width="${brandWidth}"
                height="${brandHeight}"
                rx="${17 * scale}"
                fill="#000000"
                fill-opacity="${WATERMARK_OPACITY}"
            />
            <text
                x="${centerX}"
                y="${103 * scale}"
                fill="#ffffff"
                font-family="Arial, DejaVu Sans, sans-serif"
                font-size="${51 * scale}"
                font-weight="400"
                text-anchor="middle"
            >Грань ДВ</text>
            <rect
                x="${articleLeft}"
                y="${articleTop}"
                width="${articleWidth}"
                height="${WATERMARK_HEIGHT * scale}"
                rx="${WATERMARK_RADIUS * scale}"
                fill="#000000"
                fill-opacity="${WATERMARK_OPACITY}"
            />
            <text
                x="${centerX}"
                y="${187 * scale}"
                fill="#ffffff"
                font-family="Arial, DejaVu Sans, sans-serif"
                font-size="${39 * scale}"
                font-weight="700"
                text-anchor="middle"
            >${escapeXml(article)}</text>
        </svg>
    `);
};

const addFullWatermark = async (input, article) => {
    const metadata = await sharp(input).metadata();

    if (!metadata.width || !metadata.height) {
        throw new Error('Unable to determine product image dimensions');
    }

    return sharp(input)
        .composite([
            {
                input: createFullWatermarkSvg(article, metadata.width, metadata.height),
            },
        ])
        .webp({ quality: 95, smartSubsample: true })
        .toBuffer();
};

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

const getObjectBuffer = async (s3Client, bucket, imageKey) => {
    const response = await s3Client.send(
        new GetObjectCommand({
            Bucket: bucket,
            Key: imageKey,
        }),
    );

    if (!response.Body) {
        throw new Error(`S3 object has no body: ${imageKey}`);
    }

    return Buffer.from(await response.Body.transformToByteArray());
};

const main = async () => {
    if (APPLY && previewCount > 0) {
        throw new Error('Use either --apply or --preview=N, not both');
    }

    const pool = new Pool({
        connectionString: getRequiredEnvironmentValue('DATABASE_URL'),
    });
    const prisma = new PrismaClient({
        adapter: new PrismaPg(pool),
    });
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

    try {
        const products = await prisma.product.findMany({
            orderBy: [{ category: { sortOrder: 'asc' } }, { sortOrder: 'asc' }],
            select: {
                id: true,
                name: true,
                imageKey: true,
                category: {
                    select: {
                        code: true,
                    },
                },
            },
        });
        const matchingProducts = products.filter(
            (product) =>
                !matchFilter ||
                product.imageKey.includes(matchFilter) ||
                product.name.includes(matchFilter),
        );
        const allGeneratedProducts = matchingProducts.filter((product) =>
            getOldArticle(getOriginalImageKey(product.imageKey)),
        );
        const allLegacyProducts = matchingProducts.filter(
            (product) => !getOldArticle(getOriginalImageKey(product.imageKey)),
        );
        const versionedProductCount = allGeneratedProducts.length;
        const expectedImageKeys = [
            ...allGeneratedProducts.map((product) =>
                product.imageKey.includes('-article-v2.webp')
                    ? product.imageKey
                    : getVersionedImageKey(product.imageKey),
            ),
            ...allLegacyProducts.map((product) =>
                product.imageKey.includes('-watermark-v2.webp')
                    ? product.imageKey
                    : getFullWatermarkImageKey(product.imageKey),
            ),
        ];
        const generatedProducts = matchingProducts
            .map((product) => ({
                ...product,
                oldArticle: getOldArticle(product.imageKey),
            }))
            .filter((product) => product.oldArticle)
            .map((product) => ({
                ...product,
                newArticle: getCurrentArticle(product.name),
                newImageKey: getVersionedImageKey(product.imageKey),
                operation: 'replace-article',
            }));
        const legacyProducts = allLegacyProducts
            .filter((product) => !product.imageKey.includes('-watermark-v2.webp'))
            .map((product) => ({
                ...product,
                newArticle: getCurrentArticle(product.name),
                newImageKey: getFullWatermarkImageKey(product.imageKey),
                operation: 'add-watermark',
            }));
        const pendingProducts = [...generatedProducts, ...legacyProducts];

        if (!matchFilter && versionedProductCount !== EXPECTED_PRODUCT_COUNT) {
            throw new Error(
                `Expected ${EXPECTED_PRODUCT_COUNT} generated products, found ${versionedProductCount}`,
            );
        }

        if (!matchFilter && allLegacyProducts.length !== EXPECTED_LEGACY_PRODUCT_COUNT) {
            throw new Error(
                `Expected ${EXPECTED_LEGACY_PRODUCT_COUNT} legacy products, found ${allLegacyProducts.length}`,
            );
        }

        if (pendingProducts.length === 0) {
            if (APPLY) {
                await runWithConcurrency(
                    expectedImageKeys,
                    PROCESS_CONCURRENCY,
                    async (imageKey) => {
                        await s3Client.send(
                            new HeadObjectCommand({
                                Bucket: bucket,
                                Key: imageKey,
                            }),
                        );
                    },
                );
            }

            console.log('All matching product images already use versioned watermarks.');
            console.log(
                APPLY
                    ? `Verified ${expectedImageKeys.length} S3 objects.`
                    : `Found ${expectedImageKeys.length} versioned product images.`,
            );
            return;
        }

        if (!APPLY && previewCount === 0) {
            console.log(
                `Dry run: ${generatedProducts.length} article replacements and ${legacyProducts.length} full watermarks are ready.`,
            );
            console.log('Use --preview=N to render local previews or --apply to update S3 and DB.');
            return;
        }

        const selectedProducts =
            previewCount > 0 ? pendingProducts.slice(0, previewCount) : pendingProducts;

        if (previewCount > 0) {
            await mkdir(outputDirectory, { recursive: true });
        }

        let completedCount = 0;

        await runWithConcurrency(selectedProducts, PROCESS_CONCURRENCY, async (product) => {
            const source = await getObjectBuffer(s3Client, bucket, product.imageKey);
            const updated =
                product.operation === 'replace-article'
                    ? await updateWatermarkArticle(source, product.oldArticle, product.newArticle)
                    : await addFullWatermark(source, product.newArticle);

            if (previewCount > 0) {
                const outputPath = resolve(outputDirectory, basename(product.newImageKey));
                await writeFile(outputPath, updated);
                console.log(`Preview: ${product.operation}, ${product.newArticle}: ${outputPath}`);
                completedCount += 1;
                return;
            }

            await s3Client.send(
                new PutObjectCommand({
                    Bucket: bucket,
                    Key: product.newImageKey,
                    Body: updated,
                    ContentType: 'image/webp',
                    CacheControl: 'public, max-age=31536000, immutable',
                }),
            );
            await s3Client.send(
                new HeadObjectCommand({
                    Bucket: bucket,
                    Key: product.newImageKey,
                }),
            );

            const updateResult = await prisma.product.updateMany({
                where: {
                    id: product.id,
                    imageKey: product.imageKey,
                },
                data: {
                    imageKey: product.newImageKey,
                },
            });

            if (updateResult.count !== 1) {
                throw new Error(
                    `Product ${product.id} changed while the image was being processed`,
                );
            }

            completedCount += 1;

            if (completedCount % 25 === 0 || completedCount === selectedProducts.length) {
                console.log(`Updated ${completedCount}/${selectedProducts.length} product images`);
            }
        });

        console.log(
            previewCount > 0
                ? `Rendered ${completedCount} previews.`
                : `Updated ${completedCount} product images. Original S3 objects were retained.`,
        );

        if (APPLY) {
            await runWithConcurrency(expectedImageKeys, PROCESS_CONCURRENCY, async (imageKey) => {
                await s3Client.send(
                    new HeadObjectCommand({
                        Bucket: bucket,
                        Key: imageKey,
                    }),
                );
            });
            console.log(`Verified ${expectedImageKeys.length} S3 objects.`);
        }
    } finally {
        await prisma.$disconnect();
        await pool.end();
    }
};

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
