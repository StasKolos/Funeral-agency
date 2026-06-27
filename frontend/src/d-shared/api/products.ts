import axios from 'axios';

import type { PaginatedResponse, Product } from './types';

import { getApiBaseUrl } from './apiConfig';

type GetProductsParams = {
    category?: string;
    page?: number;
    size?: number;
};

export const getProductsQueryKey = ({ category, page, size }: GetProductsParams = {}) =>
    ['products', category ?? '', page ?? '', size ?? ''] as const;

export const getProducts = async ({ category, page, size }: GetProductsParams = {}) => {
    const searchParams = new URLSearchParams();

    if (category) {
        searchParams.set('category', category);
    }

    if (page) {
        searchParams.set('page', String(page));
    }

    if (size) {
        searchParams.set('size', String(size));
    }

    const queryString = searchParams.toString();
    const url = `/products${queryString ? `?${queryString}` : ''}`;

    try {
        const response = await axios.get<PaginatedResponse<Product>>(`${getApiBaseUrl()}${url}`);

        return response.data;
    } catch (error) {
        const status = axios.isAxiosError(error) ? error.response?.status : undefined;
        const message = status
            ? `Не удалось получить товары с сервера. Статус ответа: ${status}`
            : 'Не удалось получить товары с сервера. Сервер недоступен или запрос был прерван';

        // eslint-disable-next-line no-console
        console.error(message);
        throw new Error(message);
    }
};
