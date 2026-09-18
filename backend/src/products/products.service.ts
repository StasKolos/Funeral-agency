import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';

const DEFAULT_PRODUCTS_PAGE = 1;
const DEFAULT_PRODUCTS_PAGE_SIZE = 12;
const MAX_PRODUCTS_BY_IDS = 100;
const MAX_PRODUCTS_PAGE_SIZE = 48;

type FindAllProductsParams = {
    category?: string;
    page?: string;
    size?: string;
};

const getPositiveInteger = (value: string | undefined, fallback: number) => {
    const numberValue = Number(value);

    if (!Number.isInteger(numberValue) || numberValue < 1) {
        return fallback;
    }

    return numberValue;
};

const getProductIds = (value: string | undefined) => {
    if (!value?.trim()) {
        return [];
    }

    const rawIds = value.split(',').map((rawId) => rawId.trim());
    const ids = rawIds.map(Number);

    if (
        rawIds.some((rawId) => rawId.length === 0) ||
        ids.some((id) => !Number.isInteger(id) || id < 1)
    ) {
        throw new BadRequestException('Product IDs must be positive integers');
    }

    const uniqueIds = [...new Set(ids)];

    if (uniqueIds.length > MAX_PRODUCTS_BY_IDS) {
        throw new BadRequestException(
            `No more than ${MAX_PRODUCTS_BY_IDS} product IDs can be requested`,
        );
    }

    return uniqueIds;
};

@Injectable()
export class ProductsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly storage: StorageService,
    ) {}

    async findAll({ category, page, size }: FindAllProductsParams = {}) {
        const categoryCode = category?.trim().toUpperCase();
        const currentPage = getPositiveInteger(page, DEFAULT_PRODUCTS_PAGE);
        const requestedSize = getPositiveInteger(size, DEFAULT_PRODUCTS_PAGE_SIZE);
        const pageSize = Math.min(requestedSize, MAX_PRODUCTS_PAGE_SIZE);
        const skip = (currentPage - 1) * pageSize;
        const where = categoryCode
            ? {
                  category: {
                      code: categoryCode,
                  },
              }
            : undefined;

        const [total, products] = await this.prisma.$transaction([
            this.prisma.product.count({
                where,
            }),
            this.prisma.product.findMany({
                where,
                skip,
                take: pageSize,
                orderBy: [
                    {
                        category: {
                            sortOrder: 'asc',
                        },
                    },
                    {
                        sortOrder: 'asc',
                    },
                    {
                        id: 'asc',
                    },
                ],
                select: {
                    id: true,
                    name: true,
                    imageKey: true,
                    price: true,
                    categoryId: true,
                },
            }),
        ]);

        return {
            items: products.map((product) => ({
                id: product.id,
                name: product.name,
                categoryId: product.categoryId,
                imageUrl: this.storage.getPublicUrl(product.imageKey),
                price: product.price,
            })),
            page: currentPage,
            size: pageSize,
            total,
            totalPages: Math.ceil(total / pageSize),
        };
    }

    async findByIds(ids: string | undefined) {
        const productIds = getProductIds(ids);

        if (productIds.length === 0) {
            return [];
        }

        const products = await this.prisma.product.findMany({
            where: {
                id: {
                    in: productIds,
                },
            },
            select: {
                id: true,
                name: true,
                imageKey: true,
                price: true,
                categoryId: true,
            },
        });
        const productsById = new Map(products.map((product) => [product.id, product]));

        return productIds.flatMap((id) => {
            const product = productsById.get(id);

            if (!product) {
                return [];
            }

            return [
                {
                    id: product.id,
                    name: product.name,
                    categoryId: product.categoryId,
                    imageUrl: this.storage.getPublicUrl(product.imageKey),
                    price: product.price,
                },
            ];
        });
    }
}
