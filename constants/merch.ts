export const HAT = 1
export const BAG = 2
export const SHIRT = 3
export const STICKER = 4
export const PIN = 5

export const SMALL = 1
export const MEDIUM = 2
export const LARGE = 3
export const XL = 4

export const merchSizes = [SMALL, MEDIUM, LARGE, XL]
export const merchTypes = [HAT, BAG, SHIRT, STICKER, PIN]

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
        colors: ['#FF0000', '#00FF00', '#0000FF'],
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
        colors: ['#FF0000', '#0000FF'],
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
        colors: ['#111120', '#41A01E', '#FFFFFF'],
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
        sizes: [SMALL, MEDIUM, LARGE, XL],
        images: ['/images/hat.png'],
        colors: ['#FF0000'],
        isBestSeller: true,
        isAvailable: false,
        isLimitedEdition: false,
        onSale: false
    }
]
