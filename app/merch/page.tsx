'use client'
import React from 'react'
import SuggestMerch from '@/components/merch/SuggestMerch'
import MerchGrid from '@/components/merch/MerchGrid'
import MerchGeneralFilters from '@/components/merch/MerchGeneralFilters'
import { Carousel } from '@/components/landing-page/Carousel'
import { MerchLandingPageImages } from '@/constants/carousel'

const MerchPage = () => {
    const images = Object.values(MerchLandingPageImages)
    return (
        <>
            <section className="h-[calc(100vh-3rem)]">
                <Carousel images={images} />
            </section>
            <div className="flex flex-col font-vietnam text-[#D8DCDF] bg-main-dark min-h-screen">
                <section>
                    <div className="flex flex-col lg:flex-row w-full">
                        <div className="sticky top-20 w-full lg:w-1/4 z-[15]">
                            <MerchGeneralFilters />
                        </div>
                        <div className="w-full lg:w-3/4">
                            <MerchGrid />
                        </div>
                    </div>
                </section>

                <section>
                    <SuggestMerch />
                </section>
            </div>
        </>
    )
}

export default MerchPage
