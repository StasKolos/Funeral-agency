'use client';

import { delay } from '@/d-shared/utils/delay';
import classNames from 'classnames';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import s from './gallery.module.scss';
import { ExamplesItem } from '@/d-shared/data/examplesItems';

interface GalleryProps {
    items: ExamplesItem[];
    route: string;
    isProductsGallery?: boolean;
}

const Gallery = ({ items, route, isProductsGallery }: GalleryProps) => {
    const params = useParams<Record<'id', string>>();
    const previewImagesContainer = useRef<HTMLUListElement>(null);

    const [ isLoading, setIsLoading ] = useState(true);

    const currentItem = items.find(item => item.id === params?.id);
    const currentIndex = items.findIndex(item => item.id === params?.id);

    const scrollToActivePreviewImage = () => {
        const activePreviewImage = previewImagesContainer.current?.querySelector(`.${s['preview-image-active']}`) as HTMLImageElement;

        const previewImagesContainerWidth = previewImagesContainer.current?.offsetWidth as number;
        const previewImagesContainerGap = 10;
        const previewImageWidth = activePreviewImage.offsetWidth + previewImagesContainerGap;

        const activePreviewImagePositionInContainer = currentIndex + 1;
        const distanceToActivePreviewImage = activePreviewImagePositionInContainer * previewImageWidth;

        if (distanceToActivePreviewImage < previewImagesContainerWidth) return;

        const visiblePreviewImagesCount = Math.trunc(previewImagesContainerWidth / previewImageWidth);

        previewImagesContainer.current!.scrollLeft = previewImageWidth * (activePreviewImagePositionInContainer - visiblePreviewImagesCount);
    };

    useEffect(() => {
        scrollToActivePreviewImage();
    }, [ params.id ]);

    if (!currentItem) return notFound();

    const oneSecond = 500;

    const handleImageLoad = async() => {
        setIsLoading(true);
        await delay(oneSecond);
        setIsLoading(false);
    };

    const nextImagePath = () => {
        const nextItem = items[currentIndex + 1];
        const nextPath = `/${route}/${nextItem.id}`;

        return nextPath;
    };

    const prevImagePath = () => {
        const prevItem = items[currentIndex - 1];
        const prevPath = `/${route}/${prevItem.id}`;

        return prevPath;
    };

    const canGoNext = currentIndex < items.length - 1;
    const canGoPrev = currentIndex > 0;

    return (
        <section className={s['wrapper']}>
            <Link
                className={s['back-button']}
                href={'/'}
            >
                <Image
                    width={40}
                    height={40}
                    src={'/close-icon.svg'}
                    alt={'Иконка назад'}
                />
            </Link>
            {
                canGoPrev &&
                <Link
                    className={s['prev-button']}
                    href={prevImagePath()}
                >
                    <Image
                        width={100}
                        height={100}
                        src={'/arrow-icon.svg'}
                        alt={'Иконка стрелочка'}
                    />
                </Link>
            }
            {
                isLoading &&
                <div
                    className={classNames(s['loading-container'], {
                        [s['loading-container-small']]: isProductsGallery,
                    })}
                />
            }
            <Image
                className={classNames(s['main-image'], {
                    [s['main-image-loading']]: isLoading,
                    [s['main-image-small']]: isProductsGallery,
                })}
                src={currentItem?.src}
                alt={currentItem?.alt}
                onLoad={handleImageLoad}
                width={800}
                height={600}
            />
            {
                canGoNext &&
                <Link
                    className={s['next-button']}
                    href={nextImagePath()}
                >
                    <Image
                        width={100}
                        height={100}
                        src={'/arrow-icon.svg'}
                        alt={'Иконка стрелочка'}
                    />
                </Link>
            }
            <ul
                className={s['preview-images']}
                ref={previewImagesContainer}
            >
                {
                    items.map((item, index) => (
                        <li
                            key={index}
                        >
                            <Link
                                href={`/${route}/${item.id}`}
                            >
                                <Image
                                    className={classNames(s['preview-image'], {
                                        [s['preview-image-active']]: item.id === currentItem.id,
                                        [s['preview-image-small']]: isProductsGallery,
                                    })}
                                    src={item?.src}
                                    alt={item?.alt}
                                    width={100}
                                    height={100}
                                />
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </section>
    );
};

export default Gallery;
