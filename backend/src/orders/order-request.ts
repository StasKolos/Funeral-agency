import { BadRequestException } from '@nestjs/common';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[\d\s()+-]+$/;
const MAX_CART_ITEM_QUANTITY = 99;
const MAX_EMAIL_LENGTH = 254;
const MAX_NAME_LENGTH = 100;
const MAX_ORDER_ITEMS = 100;
const MAX_PHONE_LENGTH = 40;
const MAX_PHONE_DIGITS = 15;
const MIN_PHONE_DIGITS = 7;

export type OrderRequestItem = {
    productId: number;
    quantity: number;
};

export type OrderRequest = {
    email?: string;
    items: OrderRequestItem[];
    name: string;
    phone: string;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

const getRequiredString = (value: unknown, errorMessage: string) => {
    if (typeof value !== 'string' || value.trim().length === 0) {
        throw new BadRequestException(errorMessage);
    }

    return value.trim();
};

const parseItems = (value: unknown): OrderRequestItem[] => {
    if (!Array.isArray(value) || value.length === 0) {
        throw new BadRequestException('Добавьте хотя бы один товар в корзину');
    }

    if (value.length > MAX_ORDER_ITEMS) {
        throw new BadRequestException(`В заказе может быть не более ${MAX_ORDER_ITEMS} позиций`);
    }

    const productIds = new Set<number>();

    return value.map((item) => {
        if (!isRecord(item)) {
            throw new BadRequestException('Некорректный состав заказа');
        }

        const { productId, quantity } = item;

        if (typeof productId !== 'number' || !Number.isSafeInteger(productId) || productId < 1) {
            throw new BadRequestException('Некорректный идентификатор товара');
        }

        if (
            typeof quantity !== 'number' ||
            !Number.isSafeInteger(quantity) ||
            quantity < 1 ||
            quantity > MAX_CART_ITEM_QUANTITY
        ) {
            throw new BadRequestException(
                `Количество каждого товара должно быть от 1 до ${MAX_CART_ITEM_QUANTITY}`,
            );
        }

        if (productIds.has(productId)) {
            throw new BadRequestException('Один товар не должен повторяться в заказе');
        }

        productIds.add(productId);

        return {
            productId,
            quantity,
        };
    });
};

export const parseOrderRequest = (value: unknown): OrderRequest => {
    if (!isRecord(value)) {
        throw new BadRequestException('Некорректные данные заказа');
    }

    const name = getRequiredString(value.name, 'Укажите имя');

    if (name.length > MAX_NAME_LENGTH) {
        throw new BadRequestException(`Имя не должно быть длиннее ${MAX_NAME_LENGTH} символов`);
    }

    const phone = getRequiredString(value.phone, 'Укажите номер телефона');
    const phoneDigitsCount = phone.replace(/\D/g, '').length;

    if (
        phone.length > MAX_PHONE_LENGTH ||
        !PHONE_PATTERN.test(phone) ||
        phoneDigitsCount < MIN_PHONE_DIGITS ||
        phoneDigitsCount > MAX_PHONE_DIGITS
    ) {
        throw new BadRequestException('Укажите корректный номер телефона');
    }

    if (typeof value.email !== 'undefined' && typeof value.email !== 'string') {
        throw new BadRequestException('Укажите корректную электронную почту');
    }

    const email = typeof value.email === 'string' ? value.email.trim() : '';

    if (email.length > 0 && (email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email))) {
        throw new BadRequestException('Укажите корректную электронную почту');
    }

    return {
        ...(email ? { email } : {}),
        items: parseItems(value.items),
        name,
        phone,
    };
};
