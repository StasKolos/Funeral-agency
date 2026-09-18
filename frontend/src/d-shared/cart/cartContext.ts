'use client';

import { createContext, useContext } from 'react';

export const MAX_CART_ITEM_QUANTITY = 99;

export type CartItem = {
    productId: number;
    quantity: number;
};

export type CartContextValue = {
    addItem: (productId: number, quantity?: number) => void;
    clearCart: () => void;
    decrementItem: (productId: number) => void;
    incrementItem: (productId: number) => void;
    isHydrated: boolean;
    items: CartItem[];
    removeItem: (productId: number) => void;
    setItemQuantity: (productId: number, quantity: number) => void;
    totalQuantity: number;
};

export const CartContext = createContext<CartContextValue | undefined>(undefined);

export const useCart = () => {
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        throw new Error('useCart must be used within CartProvider');
    }

    return cartContext;
};
