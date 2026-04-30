'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { type KeyboardEvent, useState } from 'react';

import { ProductsEnum, type ProductsEnumType } from '@/d-shared/enums/productsEnum';
import ImageWithSkeleton from '@/d-shared/ui/imageWithSkeleton/imageWithSkeleton';
import { openImageGallery } from '@/d-shared/utils/openImageGallery';

import s from './products.module.scss';

const COFFIN_PRODUCT_IMAGE_HEIGHT = 150;
const COFFIN_PRODUCT_IMAGE_WIDTH = 200;
const PRODUCT_IMAGE_HEIGHT = 200;
const PRODUCT_IMAGE_WIDTH = 150;

const getPaginationItems = (currentPage: number, totalPages: number) => {
    const pages = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);

    return Array.from(pages)
        .filter((page) => page >= 1 && page <= totalPages)
        .sort((firstPage, secondPage) => firstPage - secondPage);
};

const Products = () => {
    const router = useRouter();

    const [currentPage, setCurrentPage] = useState(1);
    const [currentFilter, setCurrentFilter] = useState<ProductsEnumType>(
        ProductsEnum.VERTICAL_MONUMENT.value,
    );

    const itemsPerPage = 12;
    const productItems = ProductsEnum[currentFilter].items;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = productItems.slice(startIndex, endIndex);
    const totalPages = Math.ceil(productItems.length / itemsPerPage);
    const isCoffinItems = currentFilter === ProductsEnum.COFFIN.value;

    const handleOpenImageGallery = (index: number) => {
        openImageGallery(productItems, startIndex + index);
    };

    const handleFilterChange = (filter: ProductsEnumType) => {
        setCurrentFilter(filter);
        setCurrentPage(1);
    };

    const handleFilterSelectChange = (filter: string) => {
        handleFilterChange(filter as ProductsEnumType);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        router.push('/products#Products');
    };

    const handleGalleryKeyDown = (event: KeyboardEvent<HTMLLIElement>, index: number) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;

        event.preventDefault();
        handleOpenImageGallery(index);
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
                <div
                    aria-label={'Категории товаров'}
                    className={s['filters']}
                >
                    <div
                        className={s['filter-tabs']}
                        role={'tablist'}
                    >
                        {Object.values(ProductsEnum).map((product) => (
                            <button
                                aria-selected={currentFilter === product.value}
                                className={clsx(s['button'], {
                                    [s['button-active']]: currentFilter === product.value,
                                })}
                                key={product.value}
                                onClick={() => handleFilterChange(product.value)}
                                role={'tab'}
                                type={'button'}
                            >
                                {product.name}
                            </button>
                        ))}
                    </div>
                    <label className={s['filter-select-wrapper']}>
                        <span>Категория товаров</span>
                        <select
                            className={s['filter-select']}
                            onChange={(event) => handleFilterSelectChange(event.target.value)}
                            value={currentFilter}
                        >
                            {Object.values(ProductsEnum).map((product) => (
                                <option
                                    key={product.value}
                                    value={product.value}
                                >
                                    {product.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <ul className={s['items']}>
                    {currentItems?.map((item, index) => (
                        <li
                            className={clsx(s['item'], {
                                [s['coffin-item']]: isCoffinItems,
                            })}
                            key={item.src}
                            onClick={() => handleOpenImageGallery(index)}
                            onKeyDown={(event) => handleGalleryKeyDown(event, index)}
                            role={'button'}
                            tabIndex={0}
                        >
                            <Image
                                alt={'Иконка клик по кнопке'}
                                className={s['tap-icon']}
                                height={30}
                                src={'tap-click-icon.svg'}
                                width={30}
                            />
                            <h3>{item.header}</h3>
                            <ImageWithSkeleton
                                alt={item.alt}
                                className={s['image']}
                                height={
                                    isCoffinItems
                                        ? COFFIN_PRODUCT_IMAGE_HEIGHT
                                        : PRODUCT_IMAGE_HEIGHT
                                }
                                sizes={
                                    isCoffinItems
                                        ? `${COFFIN_PRODUCT_IMAGE_WIDTH}px`
                                        : `${PRODUCT_IMAGE_WIDTH}px`
                                }
                                src={item.src}
                                width={
                                    isCoffinItems ? COFFIN_PRODUCT_IMAGE_WIDTH : PRODUCT_IMAGE_WIDTH
                                }
                                wrapperClassName={s['image-wrapper']}
                            />
                        </li>
                    ))}
                </ul>
                {totalPages > 1 && (
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
