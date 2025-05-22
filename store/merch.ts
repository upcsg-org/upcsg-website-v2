import { createGenericStore } from '@/lib/zustand'

// Types
export interface MerchType {
    id: number
    name: string
    description: string
    created_at: string
    updated_at: string
    sizes?: MerchSize[]
}

export interface MerchSize {
    id: number
    name: string
    merch_type: number
    description: string
    created_at: string
    updated_at: string
}

export interface MerchVariant {
    id: number
    merch: number
    name: string
    price: number
    image: string
    variant: string
    is_limited: boolean
    size: number
    quantity: number
    is_bestseller: boolean
    is_available: boolean
    on_sale: boolean
    created_at: string
    updated_at: string
}

export interface Merch {
    id: number
    name: string
    merch_type_id: number
    description: string
    image: string
    created_at: string
    updated_at: string
    merch_type?: MerchType
    variants?: MerchVariant[]
}

// Create stores for each entity
export const useMerchTypeStore = createGenericStore<MerchType>(
    '/merch/merch-type',
    {
        actions: ['fetchAll', 'fetchOne'],
    }
)

export const useCreateUpdateDeleteMerchTypeStore =
    createGenericStore<MerchType>('/merch/merch-type/manage', {
        actions: ['create', 'update', 'remove'],
    })

export const useMerchSizeStore = createGenericStore<MerchSize>(
    '/merch/merch-size',
    {
        actions: ['fetchAll', 'fetchOne'],
    }
)

export const useCreateUpdateDeleteMerchSizeStore =
    createGenericStore<MerchSize>('/merch/merch-size/manage', {
        actions: ['create', 'update', 'remove'],
    })

export const useMerchStore = createGenericStore<Merch>('/merch/product', {
    actions: ['fetchAll', 'fetchOne'],
})

export const useCreateUpdateDeleteMerchStore = createGenericStore<Merch>(
    '/merch/product/manage',
    {
        actions: ['create', 'update', 'remove'],
    }
)

export const useMerchVariantStore = createGenericStore<MerchVariant>(
    '/merch/merch-variant',
    {
        actions: ['fetchAll', 'fetchOne'],
    }
)

export const useCreateUpdateDeleteMerchVariantStore =
    createGenericStore<MerchVariant>('/merch/merch-variant/manage', {
        actions: ['create', 'update', 'remove'],
    })
