'use client'
import React from 'react'
import MerchGrid from '@/components/merch/MerchGrid'
import MerchGeneralFilters from '@/components/merch/MerchGeneralFilters'

const MerchPage = () => {
    return (
        <div className="flex flex-col font-vietnam text-[#D8DCDF] bg-main-dark min-h-screen">
            <div className="flex flex-col lg:flex-row w-full">
                <div className="sticky top-12 lg:top-24 w-full lg:w-1/4 z-[15]">
                    <MerchGeneralFilters />
                </div>
                <div className="w-full lg:w-3/4">
                    <MerchGrid />
                </div>
            </div>
        </div>
    )
}

export default MerchPage
