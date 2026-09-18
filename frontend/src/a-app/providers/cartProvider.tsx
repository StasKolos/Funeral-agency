'use client';

import {
    type PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
    useState,
    useSyncExternalStore,
} from 'react';

import {
    CartContext,
    type CartContextValue,
    type CartItem,
    MAX_CART_ITEM_QUANTITY,
} from '@/d-shared/cart/cartContext';

const CART_STORAGE_KEY = 'funeral-agency-cart-v1';
const DEFAULT_ITEM_QUANTITY = 1;

const getHydratedSnapshot = () => true;
const getServerSnapshot = () => false;
const subscribeToHydration = () => () => undefined;

const isPositiveInteger = (value: unknown): value is number =>
    typeof value === 'number' && Number.isSafeInteger(value) && value > 0;

const parseCartItems = (storedValue: string | null): CartItem[] => {
    if (!storedValue) {
        return [];
    }

    try {
        const parsedValue: unknown = JSON.parse(storedValue);

        if (!Array.isArray(parsedValue)) {
            return [];
        }

        const quantitiesByProductId = new Map<number, number>();

        parsedValue.forEach((storedItem: unknown) => {
            if (typeof storedItem !== 'object' || storedItem === null) {
                return;
            }

            const item = storedItem as Record<string, unknown>;
            const { productId, quantity } = item;

            if (!isPositiveInteger(productId) || !isPositiveInteger(quantity)) {
                return;
            }

            const currentQuantity = quantitiesByProductId.get(productId) ?? 0;

            quantitiesByProductId.set(
                productId,
                Math.min(currentQuantity + quantity, MAX_CART_ITEM_QUANTITY),
            );
        });

        return Array.from(quantitiesByProductId, ([productId, quantity]) => ({
            productId,
            quantity,
        }));
    } catch {
        return [];
    }
};

const getStoredCartItems = () => {
    if (typeof window === 'undefined') {
        return [];
    }

    try {
        return parseCartItems(window.localStorage.getItem(CART_STORAGE_KEY));
    } catch {
        return [];
    }
};

const CartProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>(getStoredCartItems);
    const isHydrated = useSyncExternalStore(
        subscribeToHydration,
        getHydratedSnapshot,
        getServerSnapshot,
    );

    useEffect(() => {
        if (!isHydrated) {
            return;
        }

        try {
            window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        } catch {
            return;
        }
    }, [isHydrated, items]);

    const addItem = useCallback((productId: number, quantity = DEFAULT_ITEM_QUANTITY) => {
        if (!isPositiveInteger(productId) || !isPositiveInteger(quantity)) {
            return;
        }

        setItems((currentItems) => {
            const existingItem = currentItems.find((item) => item.productId === productId);

            if (!existingItem) {
                return [
                    ...currentItems,
                    {
                        productId,
                        quantity: Math.min(quantity, MAX_CART_ITEM_QUANTITY),
                    },
                ];
            }

            return currentItems.map((item) =>
                item.productId === productId
                    ? {
                          ...item,
                          quantity: Math.min(item.quantity + quantity, MAX_CART_ITEM_QUANTITY),
                      }
                    : item,
            );
        });
    }, []);

    const removeItem = useCallback((productId: number) => {
        if (!isPositiveInteger(productId)) {
            return;
        }

        setItems((currentItems) => currentItems.filter((item) => item.productId !== productId));
    }, []);

    const setItemQuantity = useCallback((productId: number, quantity: number) => {
        if (!isPositiveInteger(productId) || !Number.isSafeInteger(quantity)) {
            return;
        }

        if (quantity <= 0) {
            setItems((currentItems) => currentItems.filter((item) => item.productId !== productId));
            return;
        }

        setItems((currentItems) =>
            currentItems.map((item) =>
                item.productId === productId
                    ? {
                          ...item,
                          quantity: Math.min(quantity, MAX_CART_ITEM_QUANTITY),
                      }
                    : item,
            ),
        );
    }, []);

    const incrementItem = useCallback(
        (productId: number) => {
            addItem(productId);
        },
        [addItem],
    );

    const decrementItem = useCallback((productId: number) => {
        if (!isPositiveInteger(productId)) {
            return;
        }

        setItems((currentItems) =>
            currentItems.flatMap((item) => {
                if (item.productId !== productId) {
                    return [item];
                }

                if (item.quantity === DEFAULT_ITEM_QUANTITY) {
                    return [];
                }

                return [
                    {
                        ...item,
                        quantity: item.quantity - DEFAULT_ITEM_QUANTITY,
                    },
                ];
            }),
        );
    }, []);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const visibleItems = useMemo(() => (isHydrated ? items : []), [isHydrated, items]);
    const totalQuantity = useMemo(
        () => visibleItems.reduce((total, item) => total + item.quantity, 0),
        [visibleItems],
    );
    const cartContextValue = useMemo<CartContextValue>(
        () => ({
            addItem,
            clearCart,
            decrementItem,
            incrementItem,
            isHydrated,
            items: visibleItems,
            removeItem,
            setItemQuantity,
            totalQuantity,
        }),
        [
            addItem,
            clearCart,
            decrementItem,
            incrementItem,
            isHydrated,
            removeItem,
            setItemQuantity,
            totalQuantity,
            visibleItems,
        ],
    );

    return <CartContext.Provider value={cartContextValue}>{children}</CartContext.Provider>;
};

export default CartProvider;
