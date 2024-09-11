import { merchItems } from '@/constants/merch/merch'

export const shoppingCartItems = merchItems.map(merch => ({
    merch: merch,
    color: merch.colors[0],
    size: merch.sizes[0],
    quantity: 1,
    maxQuantity: 5,
    isChecked: false
}))
