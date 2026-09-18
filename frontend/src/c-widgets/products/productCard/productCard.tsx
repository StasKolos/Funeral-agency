import clsx from 'clsx';

import ImageWithSkeleton from '@/d-shared/ui/imageWithSkeleton/imageWithSkeleton';

import s from './productCard.module.scss';

const COFFIN_PRODUCT_IMAGE_HEIGHT = 150;
const COFFIN_PRODUCT_IMAGE_WIDTH = 200;
const PRODUCT_IMAGE_HEIGHT = 200;
const PRODUCT_IMAGE_WIDTH = 150;
const priceFormatter = new Intl.NumberFormat('ru-RU');

export type ProductGalleryItem = {
    alt: string;
    header: string;
    id: number;
    price: number;
    src: string;
};

type ProductCardProps = {
    index: number;
    isCoffinItems: boolean;
    item: ProductGalleryItem;
    onAddToCart: (productId: number) => void;
    onOpenImageGallery: (index: number) => void;
};

const formatPrice = (price: number) =>
    priceFormatter.format(price).replaceAll('\u00a0', ' ').replaceAll('\u202f', ' ');

const ProductCard = ({
    index,
    isCoffinItems,
    item,
    onAddToCart,
    onOpenImageGallery,
}: ProductCardProps) => (
    <li
        className={clsx(s['item'], {
            [s['coffin-item']]: isCoffinItems,
        })}
    >
        <h3>{item.header}</h3>
        <button
            aria-label={`Открыть изображение товара «${item.header}»`}
            className={s['gallery-button']}
            onClick={() => onOpenImageGallery(index)}
            type={'button'}
        >
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
        </button>
        <p className={s['price']}>{`${formatPrice(item.price)} ₽`}</p>
        <button
            className={s['add-to-cart-button']}
            onClick={() => onAddToCart(item.id)}
            type={'button'}
        >
            В корзину
        </button>
    </li>
);

export default ProductCard;
