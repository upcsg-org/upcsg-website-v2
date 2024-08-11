'use client'
import React, { useState } from 'react'
import MerchCard from './MerchCard'
import MerchHeaderButtonGroup from './MerchHeaderButtonGroup'
import MerchHeaderFilterTabs from './MerchHeaderFilterTabs'
import { merchItems } from '@/constants/merch/merch'
import { MerchItem } from '@/interface/merch'
import Empty from '../generics/Empty'

const MerchGrid = () => {
    const [headerFilterType, setHeaderFitlerType] = useState('All Items')

    const filterMerchItems = (merchList: MerchItem[]) => {
        if (headerFilterType === 'All Items') {
            return merchList
        } else if (headerFilterType === 'Limited Edition') {
            return merchList.filter(
                (merch: MerchItem) => merch.isLimitedEdition
            )
        } else if (headerFilterType === 'On Sale') {
            return merchList.filter((merch: MerchItem) => merch.onSale)
        } else {
            return merchList
        }
    }

    return (
        <div className="flex flex-col w-full gap-4 p-5 lg:py-10 lg:pl-8 lg:pr-28">
            <div className="w-full flex flex-row max-sm:flex-col max-sm:items-center max-sm:gap-3 flex-wrap align-middle">
                <p className="min-w-fit font-bold tracking-wider max-sm:text-center text-lg sm:text-2xl xl:text-4xl">
                    UPCSG MERCH
                </p>
                <MerchHeaderButtonGroup />
            </div>

            <MerchHeaderFilterTabs handleSwitchFilter={setHeaderFitlerType} />

            {filterMerchItems(merchItems).length ? (
                <div
                    className="gap-2 lg:gap-1 w-full text-site-main grid items-center justify-around
                            grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3"
                >
                    {filterMerchItems(merchItems).map((merch, index) => (
                        <MerchCard
                            key={index + merch.name + merch.type.text}
                            merch={merch}
                        />
                    ))}
                </div>
            ) : (
                <Empty>
                    <p className="text-sm md:text-xl">
                        No {headerFilterType} Merch Available
                    </p>
                </Empty>
            )}
        </div>
    )
}

export default MerchGrid
