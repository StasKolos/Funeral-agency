import axios from 'axios';

import type { ProductCategory } from './types';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? '/api/backend').replace(/\/$/, '');

export const categoriesQueryKey = ['categories'] as const;

export const getCategories = async () => {
    try {
        const response = await axios.get<ProductCategory[]>(`${API_BASE_URL}/categories`);

        return response.data;
    } catch (error) {
        const status = axios.isAxiosError(error) ? error.response?.status : undefined;
        const message = status
            ? `Не удалось получить категории товаров с сервера. Статус ответа: ${status}`
            : [
                  'Не удалось получить категории товаров с сервера.',
                  'Сервер недоступен или запрос был прерван',
              ].join(' ');

        // eslint-disable-next-line no-console
        console.error(message);
        throw new Error(message);
    }
};
