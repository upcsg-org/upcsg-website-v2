import { createGenericStore } from '@/lib/zustand'
import { MerchVariant } from './merch'
import { User } from '@/interface/user'

export interface Order {
    id: number
    buyer?: User
    buyer_id?: number
    payment_method: string
    proof_of_payment: string
    total_price: number
    status: string
    date_created: string
    date_paid: string
}

export interface OrderItem {
    id: number
    order?: Order
    order_id?: number
    merch_variant?: MerchVariant
    merch_variant_id?: number
    quantity: number
    subtotal_price: number
}

export const useOrderStore = createGenericStore<Order>('/order', {
    actions: ['fetchAll', 'create'],
})

export const useOrderItemStore = createGenericStore<OrderItem>(
    'order/order-item',
    {
        actions: ['fetchAll', 'create'],
    }
)

export const useManageOrderStore = createGenericStore<Order>('/order/manage', {
    actions: ['fetchAll', 'fetchOne', 'create', 'update', 'remove'],
})

export const useManageOrderItemStore = createGenericStore<OrderItem>('/order/manage/order-item', {
    actions: ['fetchAll', 'fetchOne', 'create', 'update', 'remove'],
})
