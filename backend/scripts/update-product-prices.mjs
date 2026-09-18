import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Pool } from 'pg';

const backendDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..');
dotenv.config({ path: resolve(backendDirectory, '.env'), quiet: true });

const getArgument = (name) => {
    const index = process.argv.indexOf(name);
    return index === -1 ? undefined : process.argv[index + 1];
};
const getArticle = (value) => value.trim().match(/([А-ЯЁA-Z]+-\d+)$/u)?.[1];
const getKey = (categoryCode, article) => `${categoryCode}:${article}`;

const main = async () => {
    const inputPath = getArgument('--input');
    const backupPath = getArgument('--backup');
    const apply = process.argv.includes('--apply');
    if (!inputPath || (apply && !backupPath)) {
        throw new Error(
            'Usage: --input prices.json [--apply --backup backup.json]. Default: dry run.',
        );
    }
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) throw new Error('DATABASE_URL is required');
    const database = new URL(databaseUrl);
    if (!['localhost', '127.0.0.1', '[::1]'].includes(database.hostname)) {
        throw new Error('This importer is restricted to the local database');
    }

    const prices = JSON.parse(await readFile(resolve(inputPath), 'utf8'));
    if (!Array.isArray(prices) || prices.length === 0) throw new Error('Empty price list');
    const pricesByKey = new Map();
    for (const entry of prices) {
        if (
            typeof entry.categoryCode !== 'string' ||
            typeof entry.article !== 'string' ||
            getArticle(entry.article) !== entry.article ||
            !Number.isSafeInteger(entry.price) ||
            entry.price <= 0 ||
            entry.price > 2147483647
        ) {
            throw new Error(`Invalid price entry: ${JSON.stringify(entry)}`);
        }
        const key = getKey(entry.categoryCode, entry.article);
        if (pricesByKey.has(key)) throw new Error(`Duplicate source article: ${key}`);
        pricesByKey.set(key, entry.price);
    }

    const pool = new Pool({ connectionString: databaseUrl });
    const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });
    try {
        const products = await prisma.product.findMany({
            orderBy: { id: 'asc' },
            include: { category: { select: { code: true, name: true } } },
        });
        const matchedKeys = new Set();
        const updates = products.map((product) => {
            const article = getArticle(product.name);
            if (!article) throw new Error(`Cannot extract article: ${product.name}`);
            const key = getKey(product.category.code, article);
            if (!pricesByKey.has(key)) throw new Error(`Missing source price: ${key}`);
            if (matchedKeys.has(key)) throw new Error(`Duplicate database article: ${key}`);
            matchedKeys.add(key);
            return { id: product.id, price: pricesByKey.get(key) };
        });
        if (matchedKeys.size !== pricesByKey.size) {
            throw new Error(
                `Unmatched source articles: ${[...pricesByKey.keys()].filter((key) => !matchedKeys.has(key)).join(', ')}`,
            );
        }
        const summary = new Map();
        for (const product of products) {
            const price = pricesByKey.get(getKey(product.category.code, getArticle(product.name)));
            const row = summary.get(product.category.code) ?? {
                category: product.category.name,
                count: 0,
                minPrice: price,
            };
            row.count += 1;
            row.minPrice = Math.min(row.minPrice, price);
            summary.set(product.category.code, row);
        }
        console.log(`Database: ${database.hostname}${database.pathname}`);
        console.table([...summary.values()]);
        console.log(`Matched all ${updates.length} products by category + article.`);
        if (!apply) {
            console.log('Dry run completed. No database changes.');
            return;
        }
        await writeFile(resolve(backupPath), JSON.stringify(products, null, 2), { flag: 'wx' });
        await prisma.$transaction(
            async (tx) => {
                for (const update of updates) {
                    await tx.product.update({
                        where: { id: update.id },
                        data: { price: update.price },
                    });
                }
                const stored = await tx.product.findMany({ orderBy: { id: 'asc' } });
                if (stored.length !== products.length) throw new Error('Product count changed');
                stored.forEach((product, index) => {
                    const { category, price, updatedAt, ...original } = products[index];
                    const {
                        price: storedPrice,
                        updatedAt: storedUpdatedAt,
                        ...unchanged
                    } = product;
                    if (
                        storedPrice !== updates[index].price ||
                        JSON.stringify(unchanged) !== JSON.stringify(original)
                    ) {
                        throw new Error(`Verification failed: ${product.id}`);
                    }
                });
            },
            { timeout: 60000 },
        );
        console.log(
            `Updated and verified ${updates.length} prices. Other product fields unchanged. Backup: ${resolve(backupPath)}`,
        );
    } finally {
        await prisma.$disconnect();
        await pool.end();
    }
};

main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
});
