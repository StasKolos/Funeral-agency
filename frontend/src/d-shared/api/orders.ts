import axios from 'axios';

import { getApiBaseUrl } from './apiConfig';

export type OrderItemPayload = {
    productId: number;
    quantity: number;
};

export type CreateOrderPayload = {
    email?: string;
    items: OrderItemPayload[];
    name: string;
    phone: string;
};

export type CreateOrderResponse = {
    message: string;
};

type ApiErrorResponse = {
    message?: string | string[];
};

const DEFAULT_ORDER_ERROR_MESSAGE =
    'Не удалось оформить заказ. Попробуйте ещё раз или позвоните нам по номеру +7 (962) 587-32-38';

const getApiErrorMessage = (error: unknown) => {
    if (!axios.isAxiosError<ApiErrorResponse>(error)) {
        return DEFAULT_ORDER_ERROR_MESSAGE;
    }

    const responseMessage = error.response?.data?.message;

    if (Array.isArray(responseMessage)) {
        return responseMessage.join('. ');
    }

    return responseMessage || DEFAULT_ORDER_ERROR_MESSAGE;
};

export const createOrder = async (payload: CreateOrderPayload) => {
    try {
        const response = await axios.post<CreateOrderResponse>(
            `${getApiBaseUrl()}/orders`,
            payload,
        );

        return response.data;
    } catch (error) {
        throw new Error(getApiErrorMessage(error));
    }
};
