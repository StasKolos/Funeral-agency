'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import type { ProductCategory } from '@/d-shared/api/types';

import { useScrollAnimation } from '@/d-shared/hooks/useScrollAnimation';
import {
    getCanonicalProductCategoryCode,
    getProductCategoryPath,
} from '@/d-shared/products/productRoutes';

import s from './productCategories.module.scss';

const CATEGORY_ICONS = [
    '/services-5.svg',
    '/funeral-1.svg',
    '/services-4.svg',
    '/cremation-2.svg',
];

const PRODUCT_CATEGORY_MIN_PRICES: Partial<Record<string, string>> = {
    BALLS: '2 000',
    BASKETS: '1 000',
    COFFIN: '5 000',
    CROSS: '4 000',
    FENCES: '5 000',
    MONUMENT: '3 000',
    TABLES_AND_CHAIRS: '10 000',
    VASES: '2 000',
    WREATHS: '1 000',
};

type ProductCategoriesProps = {
    categories?: ProductCategory[] | undefined;
};

const ProductCategories = ({ categories = [] }: ProductCategoriesProps) => {
    const listRef = useScrollAnimation<HTMLUListElement>(s['animated']);

    return (
        <section
            className={clsx('section-wrapper', s['wrapper'])}
            id={'Products'}
        >
            <div className={clsx('content-wrapper', 'content')}>
                <div className={'header'}>
                    <p>Самые низкие цены в Хабаровске</p>
                    <h2>Категории товаров</h2>
                </div>
                <div className={s['content']}>
                    <p className={s['price-note']}>
                        Цены указаны ориентировочно. Точную стоимость уточняйте по телефону: мы
                        проконсультируем и подберём подходящий вариант под вашу задачу.
                    </p>
                    {categories.length === 0 && (
                        <p className={s['empty']}>Категории товаров временно недоступны</p>
                    )}
                    {categories.length > 0 && (
                        <ul
                            className={s['items']}
                            ref={listRef}
                        >
                            {categories.map((category, index) => {
                                const imageSrc =
                                    category.imageUrl ??
                                    CATEGORY_ICONS[index % CATEGORY_ICONS.length];
                                const imageAlt = category.imageUrl
                                    ? `Фото товара категории ${category.name}`
                                    : `Иконка категории ${category.name}`;
                                const minPrice =
                                    PRODUCT_CATEGORY_MIN_PRICES[
                                        getCanonicalProductCategoryCode(category.code)
                                    ];
                                const categoryPath = getProductCategoryPath(category.code);

                                return (
                                    <li
                                        className={s['item']}
                                        key={category.code}
                                    >
                                        <div className={s['item-info']}>
                                            <h3>{category.name}</h3>
                                            <Image
                                                alt={imageAlt}
                                                className={s['image']}
                                                height={150}
                                                src={imageSrc}
                                                width={150}
                                            />
                                            {minPrice && <p>{`От ${minPrice} ₽`}</p>}
                                        </div>
                                        <Link
                                            className={s['button']}
                                            href={`${categoryPath}#Products`}
                                        >
                                            Подробнее
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProductCategories;
