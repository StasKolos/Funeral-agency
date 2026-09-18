'use client';

import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Link from 'next/link';
import { useMemo } from 'react';
import { toast } from 'react-toastify';

import type { OrderItemPayload } from '@/d-shared/api/orders';

import { getProductsByIds, getProductsByIdsQueryKey } from '@/d-shared/api/products';
import { useCart } from '@/d-shared/cart/cartContext';

import s from './cart.module.scss';
import CartItemCard from './cartItemCard/cartItemCard';
import CartSkeletonCard from './cartSkeletonCard';
import OrderForm from './orderForm/orderForm';

const DEFAULT_SKELETON_ITEMS_COUNT = 3;
const MAX_SKELETON_ITEMS_COUNT = 8;
const priceFormatter = new Intl.NumberFormat('ru-RU');

const formatPrice = (price: number) =>
    priceFormatter.format(price).replaceAll('\u00a0', ' ').replaceAll('\u202f', ' ');

const Cart = () => {
    const {
        clearCart,
        decrementItem,
        incrementItem,
        isHydrated,
        items,
        removeItem,
        totalQuantity,
    } = useCart();
    const productIds = useMemo(() => items.map((item) => item.productId), [items]);
    const {
        data: products = [],
        isError,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: getProductsByIdsQueryKey(productIds),
        queryFn: () => getProductsByIds(productIds),
        enabled: isHydrated && productIds.length > 0,
        placeholderData: (previousProducts) => previousProducts,
    });
    const productsById = useMemo(
        () => new Map(products.map((product) => [product.id, product])),
        [products],
    );
    const cartItems = useMemo(
        () =>
            items.flatMap((item) => {
                const product = productsById.get(item.productId);

                return product
                    ? [
                          {
                              product,
                              quantity: item.quantity,
                          },
                      ]
                    : [];
            }),
        [items, productsById],
    );
    const unavailableItems = useMemo(
        () => items.filter((item) => !productsById.has(item.productId)),
        [items, productsById],
    );
    const totalPrice = useMemo(
        () =>
            cartItems.reduce((total, { product, quantity }) => total + product.price * quantity, 0),
        [cartItems],
    );
    const orderItems = useMemo<OrderItemPayload[]>(
        () =>
            items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
            })),
        [items],
    );
    const skeletonItemsCount = isHydrated
        ? Math.min(Math.max(items.length, DEFAULT_SKELETON_ITEMS_COUNT), MAX_SKELETON_ITEMS_COUNT)
        : DEFAULT_SKELETON_ITEMS_COUNT;
    const skeletonItems = useMemo(
        () => Array.from({ length: skeletonItemsCount }, (_, index) => index),
        [skeletonItemsCount],
    );
    const showLoading = !isHydrated || isLoading;
    const showEmptyCart = isHydrated && items.length === 0;
    const showCart = isHydrated && items.length > 0 && !isLoading && !isError;

    const handleRemoveItem = (productId: number) => {
        removeItem(productId);
        toast.success('Товар удалён из корзины', {
            toastId: `product-removed-from-cart-${productId}`,
        });
    };

    return (
        <section
            aria-labelledby={'cart-title'}
            className={clsx('section-wrapper', s['wrapper'])}
        >
            <div className={clsx('content-wrapper', 'content')}>
                <div className={'header'}>
                    <p>Выбранные товары</p>
                    <h1
                        className={s['title']}
                        id={'cart-title'}
                    >
                        Корзина
                    </h1>
                </div>
                <div
                    aria-live={'polite'}
                    className={s['status']}
                >
                    {showLoading && (
                        <ul className={s['items']}>
                            {skeletonItems.map((item) => (
                                <CartSkeletonCard key={item} />
                            ))}
                        </ul>
                    )}
                    {showEmptyCart && (
                        <div className={s['empty']}>
                            <h2>Корзина пуста</h2>
                            <p>Добавьте товары из каталога, чтобы оформить заказ.</p>
                            <Link
                                className={s['catalog-link']}
                                href={'/products'}
                            >
                                Перейти к товарам
                            </Link>
                        </div>
                    )}
                    {isError && (
                        <div
                            className={s['error']}
                            role={'alert'}
                        >
                            <h2>Не удалось загрузить товары</h2>
                            <p>Проверьте соединение и попробуйте ещё раз.</p>
                            <button
                                className={s['retry-button']}
                                onClick={() => refetch()}
                                type={'button'}
                            >
                                Повторить
                            </button>
                        </div>
                    )}
                    {showCart && (
                        <>
                            <ul className={s['items']}>
                                {cartItems.map(({ product, quantity }) => (
                                    <CartItemCard
                                        imageUrl={product.imageUrl}
                                        key={product.id}
                                        name={product.name}
                                        onDecrement={() => decrementItem(product.id)}
                                        onIncrement={() => incrementItem(product.id)}
                                        onRemove={() => handleRemoveItem(product.id)}
                                        price={product.price}
                                        quantity={quantity}
                                    />
                                ))}
                                {unavailableItems.map((item) => (
                                    <li
                                        className={clsx(s['item'], s['unavailable-item'])}
                                        key={item.productId}
                                    >
                                        <h2>Товар недоступен</h2>
                                        <p>
                                            Этот товар больше недоступен. Удалите его из корзины,
                                            чтобы отправить заявку.
                                        </p>
                                        <button
                                            className={s['remove-button']}
                                            onClick={() => handleRemoveItem(item.productId)}
                                            type={'button'}
                                        >
                                            Удалить из корзины
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <aside
                                aria-label={'Итог по корзине'}
                                className={s['summary']}
                            >
                                <dl>
                                    <div>
                                        <dt>Количество товаров</dt>
                                        <dd>{totalQuantity}</dd>
                                    </div>
                                    <div className={s['summary-total']}>
                                        <dt>Итого</dt>
                                        <dd>{`${formatPrice(totalPrice)} ₽`}</dd>
                                    </div>
                                </dl>
                                <button
                                    className={s['clear-button']}
                                    onClick={clearCart}
                                    type={'button'}
                                >
                                    Очистить корзину
                                </button>
                            </aside>
                            <OrderForm
                                hasUnavailableItems={unavailableItems.length > 0}
                                items={orderItems}
                                onOrderCreated={clearCart}
                            />
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Cart;
