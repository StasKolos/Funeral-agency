import { Controller, Get, Query } from '@nestjs/common';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    findAll(
        @Query('category') category?: string,
        @Query('page') page?: string,
        @Query('size') size?: string,
    ) {
        return this.productsService.findAll({
            category,
            page,
            size,
        });
    }
}
