import { merchItems } from '@/constants/merch/merch'

export const shoppingCartItems = merchItems.map((merch, index) => ({
    id: index,
    merch: merch,
    colorChoice: merch.colors[0],
    sizeChoice: merch.sizes[0],
    quantity: 1,
}))
