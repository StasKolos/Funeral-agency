import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { OrderMailerService } from './order-mailer.service';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
    imports: [PrismaModule],
    controllers: [OrdersController],
    providers: [OrderMailerService, OrdersService],
})
export class OrdersModule {}
