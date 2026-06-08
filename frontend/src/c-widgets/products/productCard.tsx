import type { KeyboardEvent } from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import ImageWithSkeleton from '@/d-shared/ui/imageWithSkeleton/imageWithSkeleton';

import s from './products.module.scss';

const COFFIN_PRODUCT_IMAGE_HEIGHT = 150;
const COFFIN_PRODUCT_IMAGE_WIDTH = 200;
const PRODUCT_IMAGE_HEIGHT = 200;
const PRODUCT_IMAGE_WIDTH = 150;

export type ProductGalleryItem = {
    alt: string;
    header: string;
    id: number;
    src: string;
};

type ProductCardProps = {
    index: number;
    isCoffinItems: boolean;
    item: ProductGalleryItem;
    onOpenImageGallery: (index: number) => void;
};

const ProductCard = ({ index, isCoffinItems, item, onOpenImageGallery }: ProductCardProps) => {
    const handleGalleryKeyDown = (event: KeyboardEvent<HTMLLIElement>) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;

        event.preventDefault();
        onOpenImageGallery(index);
    };

    return (
        <li
            className={clsx(s['item'], {
                [s['coffin-item']]: isCoffinItems,
            })}
            onClick={() => onOpenImageGallery(index)}
            onKeyDown={handleGalleryKeyDown}
            role={'button'}
            tabIndex={0}
        >
            <Image
                alt={'Иконка клик по кнопке'}
                className={s['tap-icon']}
                height={30}
                src={'/tap-click-icon.svg'}
                width={30}
            />
            <h3>{item.header}</h3>
            <ImageWithSkeleton
                alt={item.alt}
                className={s['image']}
                height={isCoffinItems ? COFFIN_PRODUCT_IMAGE_HEIGHT : PRODUCT_IMAGE_HEIGHT}
                sizes={
                    isCoffinItems ? `${COFFIN_PRODUCT_IMAGE_WIDTH}px` : `${PRODUCT_IMAGE_WIDTH}px`
                }
                src={item.src}
                width={isCoffinItems ? COFFIN_PRODUCT_IMAGE_WIDTH : PRODUCT_IMAGE_WIDTH}
                wrapperClassName={s['image-wrapper']}
            />
        </li>
    );
};

export default ProductCard;
