import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';

const DEFAULT_PRODUCTS_PAGE = 1;
const DEFAULT_PRODUCTS_PAGE_SIZE = 12;
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
            })),
            page: currentPage,
            size: pageSize,
            total,
            totalPages: Math.ceil(total / pageSize),
        };
    }
}
