import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
    constructor(private readonly prisma: PrismaService) {}

    findAll() {
        return this.prisma.productCategory.findMany({
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
            },
        });
    }
}
