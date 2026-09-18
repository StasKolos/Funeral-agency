'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useCart } from '@/d-shared/cart/cartContext';

import s from '../header.module.scss';

const CartLink = () => {
    const { totalQuantity } = useCart();
    const cartAriaLabel =
        totalQuantity > 0 ? `Корзина, товаров: ${totalQuantity}` : 'Корзина пуста';

    return (
        <Link
            aria-label={cartAriaLabel}
            className={s['cart-link']}
            href={'/cart'}
        >
            <Image
                alt={''}
                aria-hidden={true}
                height={40}
                src={'/cart-icon.svg'}
                width={40}
            />
            {totalQuantity > 0 && (
                <span
                    aria-hidden={true}
                    className={s['cart-count']}
                >
                    {totalQuantity}
                </span>
            )}
        </Link>
    );
};

export default CartLink;
