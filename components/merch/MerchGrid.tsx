'use client'
import React from 'react'
import MerchCard from './MerchCard'
import MerchHeaderButtonGroup from './MerchHeaderButtonGroup'
import MerchHeaderFilterTabs from './MerchHeaderFilterTabs'
import { merchItems } from '@/constants/merch'

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
                {merchItems.map((item, index) => (
                    <MerchCard
                        key={index + item.name + item.type}
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
