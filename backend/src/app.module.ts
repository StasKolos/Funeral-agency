import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        PrismaModule,
        ProductsModule,
        CategoriesModule,
        OrdersModule,
    ],
})
export class AppModule {}
