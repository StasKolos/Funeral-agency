import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { OrderMailerService } from './order-mailer.service';
import { parseOrderRequest } from './order-request';

const ORDER_SUCCESS_MESSAGE =
    'Заявка отправлена. Консультант свяжется с вами для подтверждения заказа.';
const UNAVAILABLE_PRODUCTS_MESSAGE =
    'Один или несколько товаров больше недоступны. Обновите корзину и повторите попытку';

@Injectable()
export class OrdersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly orderMailer: OrderMailerService,
    ) {}

    async create(requestBody: unknown) {
        const order = parseOrderRequest(requestBody);
        const productIds = order.items.map((item) => item.productId);
        const products = await this.prisma.product.findMany({
            where: {
                id: {
                    in: productIds,
                },
            },
            select: {
                id: true,
                name: true,
                price: true,
            },
        });
        const productsById = new Map(products.map((product) => [product.id, product]));

        if (products.length !== productIds.length) {
            throw new BadRequestException(UNAVAILABLE_PRODUCTS_MESSAGE);
        }

        const emailItems = order.items.map((item) => {
            const product = productsById.get(item.productId);

            if (!product) {
                throw new BadRequestException(UNAVAILABLE_PRODUCTS_MESSAGE);
            }

            return {
                ...product,
                quantity: item.quantity,
            };
        });
        const totalPrice = emailItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0,
        );

        await this.orderMailer.sendOrder({
            ...order,
            items: emailItems,
            totalPrice,
        });

        return {
            message: ORDER_SUCCESS_MESSAGE,
        };
    }
}
