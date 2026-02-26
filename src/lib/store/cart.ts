import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string; // Composite ID: productId-color-size
    productId: string;
    variantId: number;
    name: string;
    color: string;
    size: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartState {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'id' | 'quantity'>) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, delta: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (item) => set((state) => {
                const id = `${item.productId}-${item.color}-${item.size}`;
                const existingItem = state.items.find(i => i.id === id);

                if (existingItem) {
                    return {
                        items: state.items.map(i =>
                            i.id === id ? { ...i, quantity: i.quantity + 1 } : i
                        )
                    };
                }

                return {
                    items: [...state.items, { ...item, id, quantity: 1 }]
                };
            }),

            removeItem: (id) => set((state) => ({
                items: state.items.filter(i => i.id !== id)
            })),

            updateQuantity: (id, delta) => set((state) => ({
                items: state.items.map(i => {
                    if (i.id === id) {
                        const newQuantity = Math.max(1, i.quantity + delta);
                        return { ...i, quantity: newQuantity };
                    }
                    return i;
                })
            })),

            clearCart: () => set({ items: [] }),

            getCartTotal: () => {
                const { items } = get();
                return items.reduce((total, item) => total + (item.price * item.quantity), 0);
            }
        }),
        {
            name: 'shoe-shop-cart',
        }
    )
);
