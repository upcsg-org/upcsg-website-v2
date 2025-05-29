export interface MerchSize {
    id: number
    text: string
}

export interface MerchType {
    id: number
    text: string
}

export interface MerchItem {
    id: number
    name: string
    merch_type_id: number
    description: string
    image: string
    created_at: string
    updated_at: string
    merch_type?: MerchType
    variants?: Array<{
        id: number
        name: string
        price: number
        image: string
        size: string
        quantity: number
        isLimited: boolean
        isBestSeller: boolean
        isAvailable: boolean
        onSale: boolean
    }>
    // Computed properties for frontend display
    type: {
        text: string
        value: string
    }
    price: number
    images: string[]
    sizes: Array<{
        text: string
        value: string
    }>
    colors: Array<{
        text: string
        value: string
    }>
    isBestSeller: boolean
    isAvailable: boolean
    isLimitedEdition: boolean
    onSale: boolean
}
