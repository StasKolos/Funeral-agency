import axios from 'axios';

import type { PaginatedResponse, Product } from './types';

import { getApiBaseUrl } from './apiConfig';

type GetProductsParams = {
    category?: string;
    page?: number;
    size?: number;
};

const MAX_PRODUCTS_BY_IDS_REQUEST_SIZE = 100;

export const getProductsQueryKey = ({ category, page, size }: GetProductsParams = {}) =>
    ['products', category ?? '', page ?? '', size ?? ''] as const;

export const getProductsByIdsQueryKey = (ids: number[]) => ['products', 'by-ids', ...ids] as const;

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

export const getProductsByIds = async (ids: number[]) => {
    const uniqueIds = [...new Set(ids)];

    if (uniqueIds.length === 0) {
        return [];
    }

    try {
        const idBatches = Array.from(
            {
                length: Math.ceil(uniqueIds.length / MAX_PRODUCTS_BY_IDS_REQUEST_SIZE),
            },
            (_, batchIndex) =>
                uniqueIds.slice(
                    batchIndex * MAX_PRODUCTS_BY_IDS_REQUEST_SIZE,
                    (batchIndex + 1) * MAX_PRODUCTS_BY_IDS_REQUEST_SIZE,
                ),
        );
        const responses = await Promise.all(
            idBatches.map((idBatch) => {
                const searchParams = new URLSearchParams({
                    ids: idBatch.join(','),
                });

                return axios.get<Product[]>(
                    `${getApiBaseUrl()}/products/by-ids?${searchParams.toString()}`,
                );
            }),
        );
        const productsById = new Map(
            responses.flatMap((response) => response.data).map((product) => [product.id, product]),
        );

        return uniqueIds.flatMap((id) => {
            const product = productsById.get(id);

            return product ? [product] : [];
        });
    } catch (error) {
        const status = axios.isAxiosError(error) ? error.response?.status : undefined;
        const message = status
            ? `Не удалось получить товары корзины с сервера. Статус ответа: ${status}`
            : [
                  'Не удалось получить товары корзины с сервера.',
                  'Сервер недоступен или запрос был прерван',
              ].join(' ');

        // eslint-disable-next-line no-console
        console.error(message);
        throw new Error(message);
    }
};
