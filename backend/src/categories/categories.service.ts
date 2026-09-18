import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class CategoriesService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly storage: StorageService,
    ) {}

    async findAll() {
        const categoryPricesQuery = this.prisma.product.groupBy({
            by: ['categoryId'],
            orderBy: {
                categoryId: 'asc',
            },
            _min: {
                price: true,
            },
        });
        const [categories, categoryPrices] = await this.prisma.$transaction([
            this.prisma.productCategory.findMany({
                orderBy: [
                    {
                        sortOrder: 'asc',
                    },
                    {
                        id: 'asc',
                    },
                ],
                select: {
                    id: true,
                    code: true,
                    name: true,
                    products: {
                        take: 1,
                        orderBy: [
                            {
                                sortOrder: 'asc',
                            },
                            {
                                id: 'asc',
                            },
                        ],
                        select: {
                            imageKey: true,
                        },
                    },
                },
            }),
            categoryPricesQuery,
        ]);
        const minPricesByCategoryId = new Map(
            categoryPrices.map((category) => [category.categoryId, category._min.price]),
        );

        return categories.map((category) => {
            const firstProduct = category.products[0];

            return {
                id: category.id,
                code: category.code,
                name: category.name,
                minPrice: minPricesByCategoryId.get(category.id) ?? null,
                imageUrl: firstProduct
                    ? this.storage.getPublicUrl(firstProduct.imageKey)
                    : undefined,
            };
        });
    }
}
