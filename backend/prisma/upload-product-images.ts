import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import { basename, extname, resolve } from 'node:path';
import { Pool } from 'pg';

const requiredEnv = (name: string) => {
    const value = process.env[name];

    if (!value) {
        throw new Error(`${name} is not set`);
    }

    return value;
};

const contentTypesByExtension: Record<string, string> = {
    '.avif': 'image/avif',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
};

const databaseUrl = requiredEnv('DATABASE_URL');
const bucket = requiredEnv('S3_BUCKET');
const publicDir = resolve(process.cwd(), '../frontend/public');

const prisma = new PrismaClient({
    adapter: new PrismaPg(
        new Pool({
            connectionString: databaseUrl,
        }),
    ),
});

const s3 = new S3Client({
    endpoint: requiredEnv('S3_ENDPOINT'),
    region: requiredEnv('S3_REGION'),
    forcePathStyle: true,
    credentials: {
        accessKeyId: requiredEnv('S3_ACCESS_KEY'),
        secretAccessKey: requiredEnv('S3_SECRET_KEY'),
    },
});

const getContentType = (key: string) => {
    const extension = extname(key).toLowerCase();

    return contentTypesByExtension[extension] ?? 'application/octet-stream';
};

const uploadProductImages = async () => {
    const products = await prisma.product.findMany({
        select: {
            imageKey: true,
        },
        orderBy: {
            id: 'asc',
        },
    });

    const imageKeys = [...new Set(products.map((product) => product.imageKey))];

    for (const imageKey of imageKeys) {
        const sourcePath = resolve(publicDir, basename(imageKey));
        const body = await readFile(sourcePath);

        await s3.send(
            new PutObjectCommand({
                Bucket: bucket,
                Key: imageKey,
                Body: body,
                ContentType: getContentType(imageKey),
            }),
        );

        console.log(`Uploaded ${sourcePath} -> s3://${bucket}/${imageKey}`);
    }

    console.log(`Uploaded ${imageKeys.length} product images.`);
};

uploadProductImages()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error: unknown) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    });
