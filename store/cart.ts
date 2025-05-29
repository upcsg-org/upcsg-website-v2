import { create } from 'zustand'
import { Cart, CartItem } from '@/interface/cart'
import { MerchVariant } from '@/store/merch'

interface CartState extends Cart {
    cartItems: CartItem[]
    addItem: (merch_variant: MerchVariant, quantity: number) => void
    removeItem: (id: string) => void
    updateItemQuantity: (id: string, quantity: number) => void
    updateCart: (updates: Partial<Cart>) => void
    clearCart: () => void
    calculateTotalPrice: () => void
}

export const useCartStore = create<CartState>((set, get) => ({
    // Cart properties
    buyer: undefined,
    payment_method: undefined,
    proof_of_payment: undefined,
    total_price: 0,
    status: 'PENDING',
    cartItems: [],

    addItem: (merch_variant, quantity) => {
        const state = get()

        // Create a unique ID for the cart item (merch_variant.id + variant)
        const id = `${merch_variant.id}-${merch_variant.variant || merch_variant.name || 'default'}`

        // Ensure price is a number
        const price = Number(merch_variant.price) || 0

        // Check if item with same variant already exists
        const existing = state.cartItems.find((item) => item.id === id)

        let newCartItems: CartItem[]
        if (existing) {
            // Update quantity of existing item
            const newQuantity = existing.quantity + quantity
            newCartItems = state.cartItems.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: newQuantity,
                        subtotal_price: newQuantity * price
                    }
                    : item
            )
        } else {
            // Add new item
            const newItem: CartItem = {
                id,
                merch_variant,
                quantity,
                subtotal_price: quantity * price
            }
            newCartItems = [...state.cartItems, newItem]
        }

        // Calculate new total price
        const total_price = newCartItems.reduce((sum, item) => sum + Number(item.subtotal_price), 0)

        set({
            cartItems: newCartItems,
            total_price
        })
    },

    removeItem: (id) => {
        const state = get()
        const newCartItems = state.cartItems.filter((item) => item.id !== id)
        const total_price = newCartItems.reduce((sum, item) => sum + Number(item.subtotal_price), 0)

        set({
            cartItems: newCartItems,
            total_price
        })
    },

    updateItemQuantity: (id, quantity) => {
        const state = get()
        const newCartItems = state.cartItems.map((item) =>
            item.id === id
                ? {
                    ...item,
                    quantity,
                    subtotal_price: quantity * Number(item.merch_variant.price || 0)
                }
                : item
        )
        const total_price = newCartItems.reduce((sum, item) => sum + Number(item.subtotal_price), 0)

        set({
            cartItems: newCartItems,
            total_price
        })
    },

    updateCart: (updates) => {
        const state = get()
        set({
            ...state,
            ...updates
        })
    },

    clearCart: () => set({
        cartItems: [],
        total_price: 0,
        buyer: undefined,
        payment_method: undefined,
        proof_of_payment: undefined,
        status: 'PENDING'
    }),

    calculateTotalPrice: () => {
        const state = get()
        const total_price = state.cartItems.reduce((sum, item) => sum + Number(item.subtotal_price), 0)
        set({ total_price })
    },
})) 
