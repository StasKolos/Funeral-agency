import { MAX_CART_ITEM_QUANTITY } from '@/d-shared/cart/cartContext';
import ImageWithSkeleton from '@/d-shared/ui/imageWithSkeleton/imageWithSkeleton';

import s from '../cart.module.scss';

const PRODUCT_IMAGE_SIZE = 180;
const priceFormatter = new Intl.NumberFormat('ru-RU');

type CartItemCardProps = {
    imageUrl: string;
    name: string;
    onDecrement: () => void;
    onIncrement: () => void;
    onRemove: () => void;
    price: number;
    quantity: number;
};

const formatPrice = (price: number) =>
    priceFormatter.format(price).replaceAll('\u00a0', ' ').replaceAll('\u202f', ' ');

const CartItemCard = ({
    imageUrl,
    name,
    onDecrement,
    onIncrement,
    onRemove,
    price,
    quantity,
}: CartItemCardProps) => (
    <li className={s['item']}>
        <h2 className={s['item-title']}>{name}</h2>
        <ImageWithSkeleton
            alt={name}
            className={s['item-image']}
            height={PRODUCT_IMAGE_SIZE}
            sizes={`${PRODUCT_IMAGE_SIZE}px`}
            src={imageUrl}
            width={PRODUCT_IMAGE_SIZE}
            wrapperClassName={s['item-image-wrapper']}
        />
        <dl className={s['item-prices']}>
            <div>
                <dt>Цена</dt>
                <dd>{`${formatPrice(price)} ₽`}</dd>
            </div>
            <div>
                <dt>Сумма</dt>
                <dd>{`${formatPrice(price * quantity)} ₽`}</dd>
            </div>
        </dl>
        <div
            aria-label={`Количество товара «${name}»`}
            className={s['quantity']}
            role={'group'}
        >
            <button
                aria-label={`Уменьшить количество товара «${name}»`}
                className={s['quantity-button']}
                disabled={quantity <= 1}
                onClick={onDecrement}
                type={'button'}
            >
                −
            </button>
            <output
                aria-live={'polite'}
                className={s['quantity-value']}
            >
                {quantity}
            </output>
            <button
                aria-label={`Увеличить количество товара «${name}»`}
                className={s['quantity-button']}
                disabled={quantity >= MAX_CART_ITEM_QUANTITY}
                onClick={onIncrement}
                type={'button'}
            >
                +
            </button>
        </div>
        <button
            className={s['remove-button']}
            onClick={onRemove}
            type={'button'}
        >
            Удалить
        </button>
    </li>
);

export default CartItemCard;
