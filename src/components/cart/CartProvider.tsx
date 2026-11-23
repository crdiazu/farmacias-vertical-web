'use client';

import * as React from 'react';
import type { SaleConditionCode } from '@/lib/regulatory/isp';

export interface CartItem {
  variantId: string;
  productId: string;
  slug: string;
  name: string;
  variantLabel: string;
  brandName: string | null;
  priceClp: number;
  imageUrl: string;
  quantity: number;
  maxQty: number;
  saleCondition: SaleConditionCode;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  subtotalClp: number;
  requiresRx: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, 'quantity'>, qty?: number) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
}

const CartContext = React.createContext<CartContextValue | null>(null);
const CART_STORAGE_KEY = 'fv_cart_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      // Ignore storage read errors
    }
  }, []);

  React.useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage write errors
    }
  }, [items]);

  const addItem = React.useCallback((item: Omit<CartItem, 'quantity'>, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.variantId === item.variantId);
      if (existing) {
        return prev.map((i) =>
          i.variantId === item.variantId
            ? { ...i, quantity: Math.min(i.maxQty, i.quantity + qty) }
            : i,
        );
      }
      return [...prev, { ...item, quantity: Math.min(item.maxQty, Math.max(1, qty)) }];
    });
    setIsOpen(true);
  }, []);

  const updateQuantity = React.useCallback((variantId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.variantId !== variantId));
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.variantId === variantId ? { ...i, quantity: Math.min(i.maxQty, quantity) } : i,
      ),
    );
  }, []);

  const removeItem = React.useCallback((variantId: string) => {
    setItems((prev) => prev.filter((i) => i.variantId !== variantId));
  }, []);

  const clearCart = React.useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = React.useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items],
  );

  const subtotalClp = React.useMemo(
    () => items.reduce((acc, item) => acc + item.priceClp * item.quantity, 0),
    [items],
  );

  const requiresRx = React.useMemo(
    () =>
      items.some(
        (item) => item.saleCondition === 'RX_SIMPLE' || item.saleCondition === 'RX_RETAINED',
      ),
    [items],
  );

  const value = React.useMemo(
    () => ({
      items,
      isOpen,
      totalItems,
      subtotalClp,
      requiresRx,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [
      items,
      isOpen,
      totalItems,
      subtotalClp,
      requiresRx,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = React.useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart debe utilizarse dentro de CartProvider');
  }
  return ctx;
}
