'use client'
import React from 'react'
import MerchGrid from '@/components/merch/MerchGrid'
import MerchGeneralFilters from '@/components/merch/MerchGeneralFilters'

const MerchPage = () => {
    return (
        <div className="flex font-vietnam text-2xl lg:text-6xl text-[#D8DCDF] bg-main-dark">
            <div className="flex flex-col w-full lg:flex-row lg:my-10 lg:mx-24">
                <div
                    className="flex w-full pt-5 lg:w-1/4 relative"
                    id="merchFilters"
                >
                    <MerchGeneralFilters />
                </div>
                <div className="flex flex-col w-full lg:w-3/4 gap-4 p-5 lg:px-8">
                    <p className="font-bold tracking-wider">UPCSG MERCH</p>
                    <MerchGrid />
                </div>
            </div>
        </div>
    )
}

export default MerchPage
