'use client';

import { ProductsEnum, ProductsEnumType } from '@/d-shared/enums/productsEnum';
import { ProductInterface } from '@/d-shared/interfaces/productInterface';
import { Pagination } from '@mui/material';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import clsx from 'clsx';
import Image from 'next/image';
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

    const openImageGallery = (index: number) => {
        const reworkeditems = ProductsEnum[currentFilter].items.map(item => ({
            src: item.src,
            type: 'image',
            caption: item.alt,
        }));

        Fancybox.show(reworkeditems, {
            startIndex: index,
            Carousel: {
                Thumbs: {
                    type: 'classic',
                },
                Zoomable: {
                    Panzoom: {
                        startPos: {
                            x: 0,
                            y: 0,
                            scale: 0.8,
                        },
                        minScale: 0.5,
                        maxScale: 2,
                    },
                },
                Toolbar: {
                    enabled: true,
                    display: {
                        left: [ 'infobar' ],
                        middle: [],
                        right: [ 'zoomIn', 'zoomOut', 'toggle1to1', 'thumbs', 'close' ],
                    },
                },
            },
        });
    };

    const handlePageChange = (_event: any, page: number) => {
        setCurrentPage(page);
        router.push('/products#Products');
    };

    return (
        <section id={'Products'} className={clsx('section-wrapper', s['wrapper'])}>
            <div className={clsx('content-wrapper', 'content')}>
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
                                className={clsx(s['button'], {
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
                        currentItems?.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => openImageGallery(index)}
                                className={clsx(s['item'], {
                                    [s['coffin-item']]: isCoffinItems,
                                })}
                            >
                                <Image
                                    width={30}
                                    height={30}
                                    src={'tap-click-icon.svg'}
                                    alt={'Иконка клик по кнопке'}
                                    className={s['tap-icon']}
                                />
                                <h3>
                                    {item.header}
                                </h3>
                                <Image
                                    width={150}
                                    height={200}
                                    src={item.src}
                                    alt={item.alt}
                                    className={s['image']}
                                />
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
