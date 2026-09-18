'use client';

import clsx from 'clsx';
import Link from 'next/link';

import type { ProductCategory } from '@/d-shared/api/types';

import { useScrollAnimation } from '@/d-shared/hooks/useScrollAnimation';
import { getProductCategoryPath } from '@/d-shared/products/productRoutes';
import ImageWithSkeleton from '@/d-shared/ui/imageWithSkeleton/imageWithSkeleton';

import s from './productCategories.module.scss';

const CATEGORY_ICONS = ['/services-5.svg', '/funeral-1.svg', '/services-4.svg', '/cremation-2.svg'];

const priceFormatter = new Intl.NumberFormat('ru-RU');

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
                        В категориях указана минимальная цена товара. Стоимость выбранной модели
                        смотрите в карточке. Доставку, установку и индивидуальные изменения
                        согласуем отдельно.
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
                                const minPrice = category.minPrice;
                                const categoryPath = getProductCategoryPath(category.code);

                                return (
                                    <li
                                        className={s['item']}
                                        key={category.code}
                                    >
                                        <div className={s['item-info']}>
                                            <h3>{category.name}</h3>
                                            <ImageWithSkeleton
                                                alt={imageAlt}
                                                className={s['image']}
                                                height={150}
                                                sizes={'150px'}
                                                src={imageSrc}
                                                width={150}
                                                wrapperClassName={s['image-wrapper']}
                                            />
                                            {minPrice != null && (
                                                <p>{`От ${priceFormatter.format(minPrice)} ₽`}</p>
                                            )}
                                        </div>
                                        <Link
                                            className={s['button']}
                                            href={`${categoryPath}#Products`}
                                        >
                                            Каталог
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
