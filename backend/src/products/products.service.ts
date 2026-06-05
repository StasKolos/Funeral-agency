import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class ProductsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly storage: StorageService,
    ) {}

    async findAll() {
        const products = await this.prisma.product.findMany({
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
            include: {
                category: true,
            },
        });

        return products.map((product) => ({
            ...product,
            imageUrl: this.storage.getPublicUrl(product.imageKey),
        }));
    }
}
