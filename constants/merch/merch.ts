import { HAT, BAG, SHIRT, STICKER, PIN } from "./merchTypes"
import { SMALL, MEDIUM, LARGE, XL } from "./merchSizes"
import { RED, GREEN, BLUE, WHITE, VULCAN, VIDA_LOCA } from "../generic/color"

export const merchItems = [
    {
        id: 1,
        name: 'BYTE BRIMS',
        type: HAT,
        price: 175.0,
        images: [
            '/images/temp-merch.png',
            '/title-header.png',
            '/images/temp-merch.png',
        ],
        sizes: [SMALL, MEDIUM, LARGE, XL],
        colors: [RED, GREEN, BLUE],
        isBestSeller: true,
        isAvailable: false,
        isLimitedEdition: false,
        onSale: false
    },
    {
        id: 2,
        name: 'TECH TOTES',
        type: BAG,
        price: 150.0,
        sizes: [SMALL, MEDIUM, LARGE, XL],
        images: ['/images/tote-bag.png', '/title-header.png'],
        colors: [RED, BLUE],
        isBestSeller: false,
        isAvailable: false,
        isLimitedEdition: false,
        onSale: false
    },
    {
        id: 3,
        name: 'T-SHIRTS',
        type: SHIRT,
        price: 250.0,
        sizes: [SMALL, MEDIUM, LARGE, XL],
        images: ['/images/shirt.png', '/title-header.png', '/images/shirt.png'],
        colors: [VULCAN, VIDA_LOCA, WHITE],
        isBestSeller: true,
        isAvailable: false,
        isLimitedEdition: false,
        onSale: false
    },
    {
        id: 4,
        name: 'HATS',
        type: HAT,
        price: 175.0,
        sizes: [SMALL, XL],
        images: ['/images/hat.png'],
        colors: [BLUE],
        isBestSeller: true,
        isAvailable: false,
        isLimitedEdition: false,
        onSale: false
    }
]
