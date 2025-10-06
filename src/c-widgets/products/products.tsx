'use client';

import { ProductsEnum, ProductsEnumType } from '@/d-shared/enums/productsEnum';
import { ProductInterface } from '@/d-shared/interfaces/productInterface';
import { Pagination } from '@mui/material';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import s from './products.module.scss';

const Products = () => {
    const router = useRouter();

    const [ currentPage, setCurrentPage ] = useState(1);
    const [ currentFilter, setCurrentFilter ] = useState<ProductsEnumType>(ProductsEnum.VERTICAL_MONUMENT.value);
    const [ currentItems, setCurrentItems ] = useState<ProductInterface[]>([]);
    const [ totalPages, setTotalPages ] = useState<number>(0);
    const [ isCoffinItems, setIsCoffinItems ] = useState<boolean>(false);

    const itemsPerPage = 12;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    useEffect(() => {
        const currentItems = ProductsEnum[currentFilter].items.slice(startIndex, endIndex);
        const totalPages = Math.ceil(ProductsEnum[currentFilter].items.length / itemsPerPage);
        const isCoffinItems = currentFilter === ProductsEnum.COFFIN.value;

        setCurrentItems(currentItems);
        setTotalPages(totalPages);
        setIsCoffinItems(isCoffinItems);
    }, [ currentFilter, currentPage ]);

    useEffect(() => {
        setCurrentPage(1);
    }, [ currentFilter ]);

    const handlePageChange = (_event: any, page: number) => {
        setCurrentPage(page);
        router.push('/products#Products');
    };

    return (
        <section id={'Products'} className={classNames('section-wrapper', s['wrapper'])}>
            <div className={classNames('content-wrapper', 'content')}>
                <div className={'header'}>
                    <p>
                        Самые низкие цены в Хабаровске
                    </p>
                    <h2>
                        Товары
                    </h2>
                </div>
                <div className={s['filters']}>
                    {
                        Object.values(ProductsEnum).map(product => (
                            <button
                                className={classNames(s['button'], {
                                    [s['button-active']]: currentFilter === product.value,
                                })}
                                key={product.value}
                                onClick={() => setCurrentFilter(product.value)}
                            >
                                {product.name}
                            </button>
                        ))
                    }
                </div>
                <ul className={s['items']}>
                    {
                        currentItems?.map(item => (
                            <li
                                key={item.id}
                                className={classNames(s['item'], {
                                    [s['coffin-item']]: isCoffinItems,
                                })}
                            >
                                <h3>
                                    {item.header}
                                </h3>
                                <Link
                                    href={`${ProductsEnum[currentFilter].route}/${item.id}`}
                                >
                                    <Image
                                        width={150}
                                        height={200}
                                        src={item.src}
                                        alt={item.alt}
                                        className={s['image']}
                                    />
                                </Link>
                            </li>
                        ))
                    }
                </ul>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color={'standard'}
                    size={'medium'}
                    showFirstButton={true}
                    showLastButton={true}
                />
            </div>
        </section>
    );
};

export default Products;
