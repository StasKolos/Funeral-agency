import axios from 'axios';

import type { ProductCategory } from './types';

import { getApiBaseUrl } from './apiConfig';

export const categoriesQueryKey = ['categories'] as const;

export const getCategories = async () => {
    try {
        const response = await axios.get<ProductCategory[]>(`${getApiBaseUrl()}/categories`);

        return response.data;
    } catch (error) {
        const status = axios.isAxiosError(error) ? error.response?.status : undefined;
        const message = status
            ? `Не удалось получить категории товаров с сервера. Статус ответа: ${status}`
            : [
                  'Не удалось получить категории товаров с сервера.',
                  'Сервер недоступен или запрос был прерван',
              ].join(' ');

        throw new Error(message);
    }
};
