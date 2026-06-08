'use client';

import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { categoriesQueryKey, getCategories } from '@/d-shared/api/categories';
import { getProducts, getProductsQueryKey } from '@/d-shared/api/products';
import { openImageGallery } from '@/d-shared/utils/openImageGallery';

import ProductCard, { type ProductGalleryItem } from './productCard';
import s from './products.module.scss';
import ProductSkeletonCard from './productSkeletonCard';

const COFFIN_CATEGORY_CODE = 'COFFIN';
const PRODUCTS_PAGE_SIZE = 10;
const SKELETON_ITEMS_COUNT = PRODUCTS_PAGE_SIZE;

const getPaginationItems = (currentPage: number, totalPages: number) => {
    const pages = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);

    return Array.from(pages)
        .filter((page) => page >= 1 && page <= totalPages)
        .sort((firstPage, secondPage) => firstPage - secondPage);
};

const Products = () => {
    const router = useRouter();

    const [currentPage, setCurrentPage] = useState(1);
    const [currentFilter, setCurrentFilter] = useState('');

    const {
        data: categories = [],
        isError: isCategoriesError,
        isLoading: isCategoriesLoading,
    } = useQuery({
        queryKey: categoriesQueryKey,
        queryFn: getCategories,
    });

    const selectedCategory = currentFilter || categories[0]?.code || '';

    const {
        data: productsResponse,
        isError: isProductsError,
        isLoading: isProductsLoading,
    } = useQuery({
        queryKey: getProductsQueryKey({
            category: selectedCategory,
            page: currentPage,
            size: PRODUCTS_PAGE_SIZE,
        }),
        queryFn: () =>
            getProducts({
                category: selectedCategory,
                page: currentPage,
                size: PRODUCTS_PAGE_SIZE,
            }),
        enabled: selectedCategory.length > 0,
    });

    const isLoading = isCategoriesLoading || isProductsLoading;
    const productItems = useMemo<ProductGalleryItem[]>(
        () =>
            (productsResponse?.items ?? []).map((product) => ({
                alt: product.name,
                header: product.name,
                id: product.id,
                src: product.imageUrl,
            })),
        [productsResponse?.items],
    );
    const totalPages = productsResponse?.totalPages ?? 0;
    const isCoffinItems = selectedCategory === COFFIN_CATEGORY_CODE;
    const skeletonItems = useMemo(
        () => Array.from({ length: SKELETON_ITEMS_COUNT }, (_, index) => index),
        [],
    );

    useEffect(() => {
        if (!isCategoriesError) return;

        toast.error('Не удалось загрузить категории', {
            toastId: 'products-categories-error',
        });
    }, [isCategoriesError]);

    useEffect(() => {
        if (!isProductsError) return;

        toast.error('Не удалось загрузить товары', {
            toastId: 'products-error',
        });
    }, [isProductsError]);

    const handleOpenImageGallery = (index: number) => {
        openImageGallery(productItems, index);
    };

    const handleFilterChange = (filter: string) => {
        setCurrentFilter(filter);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        router.push('/products#Products');
    };

    return (
        <section
            className={clsx('section-wrapper', s['wrapper'])}
            id={'Products'}
        >
            <div className={clsx('content-wrapper', 'content')}>
                <div className={'header'}>
                    <p>Самые низкие цены в Хабаровске</p>
                    <h2>Товары</h2>
                </div>
                <label className={s['filter-select-wrapper']}>
                    <span>Категория товаров</span>
                    <select
                        className={s['filter-select']}
                        disabled={categories.length === 0}
                        onChange={(event) => handleFilterChange(event.target.value)}
                        value={selectedCategory}
                    >
                        {categories.map((category) => (
                            <option
                                key={category.code}
                                value={category.code}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </label>
                {isLoading && (
                    <ul className={s['items']}>
                        {skeletonItems.map((item) => (
                            <ProductSkeletonCard
                                isCoffinItems={isCoffinItems}
                                key={item}
                            />
                        ))}
                    </ul>
                )}
                {!isLoading && (
                    <ul className={s['items']}>
                        {productItems.map((item, index) => (
                            <ProductCard
                                index={index}
                                isCoffinItems={isCoffinItems}
                                item={item}
                                key={item.id}
                                onOpenImageGallery={handleOpenImageGallery}
                            />
                        ))}
                    </ul>
                )}
                {!isLoading && totalPages > 1 && (
                    <nav
                        aria-label={'Пагинация товаров'}
                        className={s['pagination']}
                    >
                        <button
                            aria-label={'Первая страница'}
                            className={s['pagination-button']}
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(1)}
                            type={'button'}
                        >
                            {'<<'}
                        </button>
                        <button
                            aria-label={'Предыдущая страница'}
                            className={s['pagination-button']}
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                            type={'button'}
                        >
                            {'<'}
                        </button>
                        {getPaginationItems(currentPage, totalPages).map((page) => (
                            <button
                                aria-current={currentPage === page ? 'page' : undefined}
                                className={clsx(s['pagination-button'], {
                                    [s['pagination-button-active']]: currentPage === page,
                                })}
                                key={page}
                                onClick={() => handlePageChange(page)}
                                type={'button'}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            aria-label={'Следующая страница'}
                            className={s['pagination-button']}
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                            type={'button'}
                        >
                            {'>'}
                        </button>
                        <button
                            aria-label={'Последняя страница'}
                            className={s['pagination-button']}
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(totalPages)}
                            type={'button'}
                        >
                            {'>>'}
                        </button>
                    </nav>
                )}
            </div>
        </section>
    );
};

export default Products;
