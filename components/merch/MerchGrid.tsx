'use client'
import React from 'react'
import MerchCard from './MerchCard'
import MerchHeaderButtonGroup from './MerchHeaderButtonGroup'
import MerchHeaderFilterTabs from './MerchHeaderFilterTabs'

const testValues = [
    {
        name: 'BYTE BRIMS',
        type: 'HATS',
        price: 175.0,
        images: [
            '/images/TempMerch.png',
            '/title_header.png',
            '/images/TempMerch.png',
        ],
        sizes: ['Small', 'Medium', 'Large', 'Extra-Large'],
        colors: ['#FF0000', '#00FF00', '#0000FF'],
        isBestSeller: true,
    },
    {
        name: 'TECH TOTES',
        type: 'TOTE BAG',
        price: 150.0,
        sizes: ['Small', 'Medium', 'Large', 'Extra-Large'],
        images: ['/images/Tote.png', '/title_header.png'],
        colors: ['#FF0000', '#0000FF'],
        isBestSeller: false,
    },
    {
        name: 'T-SHIRTS',
        type: 'SHIRTS',
        price: 250.0,
        sizes: ['Small', 'Medium', 'Large', 'Extra-Large'],
        images: ['/images/shirt.png', '/title_header.png', '/images/shirt.png'],
        colors: ['#111120', '#41A01E', '#FFFFFF'],
        isBestSeller: true,
    },
    {
        name: 'HATS',
        type: 'HATS',
        price: 175.0,
        sizes: ['Small', 'Medium', 'Large', 'Extra-Large'],
        images: ['/images/hat.png'],
        colors: ['#FF0000'],
        isBestSeller: true,
    },
    {
        name: 'BYTE BRIMS 2',
        type: 'HATS',
        price: 175.0,
        images: [
            '/images/TempMerch.png',
            '/title_header.png',
            '/images/TempMerch.png',
        ],
        sizes: ['Small', 'Medium', 'Large', 'Extra-Large'],
        colors: ['#FF0000', '#00FF00', '#0000FF'],
        isBestSeller: true,
    },
    {
        name: 'T-SHIRTS 2',
        type: 'SHIRTS',
        price: 250.0,
        images: ['/images/shirt.png', '/title_header.png', '/images/shirt.png'],
        sizes: ['Small', 'Medium', 'Large', 'Extra-Large'],
        colors: ['#111120', '#41A01E', '#FFFFFF'],
        isBestSeller: true,
    },
]

const MerchGrid = () => {
    return (
        <div className="flex flex-col w-full gap-4 p-5 lg:py-10 lg:pl-8 lg:pr-28">
            <div className="w-full flex flex-row flex-wrap align-middle">
                <p className="min-w-fit font-bold tracking-wider text-lg sm:text-2xl xl:text-4xl">
                    UPCSG MERCH
                </p>
                <MerchHeaderButtonGroup />
            </div>

            <MerchHeaderFilterTabs />

            <div
                className="gap-2 lg:gap-1 w-full text-site-main grid items-center justify-around
                            grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3"
            >
                {testValues.map((item, index) => (
                    <MerchCard
                        key={index}
                        name={item.name}
                        type={item.type}
                        price={item.price}
                        images={item.images}
                        colors={item.colors}
                        sizes={item.sizes}
                        isBestSeller={item.isBestSeller}
                    />
                ))}
            </div>
        </div>
    )
}

export default MerchGrid
