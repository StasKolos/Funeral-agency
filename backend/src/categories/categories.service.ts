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
        const categories = await this.prisma.productCategory.findMany({
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
        });

        return categories.map((category) => {
            const firstProduct = category.products[0];

            return {
                id: category.id,
                code: category.code,
                name: category.name,
                imageUrl: firstProduct
                    ? this.storage.getPublicUrl(firstProduct.imageKey)
                    : undefined,
            };
        });
    }
}
