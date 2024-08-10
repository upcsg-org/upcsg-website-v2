'use client'

import { useState } from 'react'
import SuggestMerch from '@/components/merch/SuggestMerch'
import MerchGrid from '@/components/merch/MerchGrid'
import MerchGeneralFilters from '@/components/merch/MerchGeneralFilters'
import { Carousel } from '@/components/landing/Carousel'
import { MerchPageCarouselContent } from '@/constants/carousel'
import ComingSoonModal from '@/components/generics/ComingSoonModal'

const MerchPage = () => {
    const [isContactUsModalOpen, setIsContactUsModalOpen] = useState(false)

    const handleOpenComingSoonModal = () => {
        setIsContactUsModalOpen(true)
    }

    const images = Object.values(MerchPageCarouselContent)
    return (
        <>
            <section className="h-[calc(100vh-3rem)]">
                <Carousel carouselContentList={images} />
            </section>
            <div className="flex flex-col font-vietnam text-[#D8DCDF] bg-main-dark min-h-screen">
                <section>
                    <div className="flex flex-col lg:flex-row w-full">
                        <div className="sticky top-20 w-full lg:w-1/4 z-[21]">
                            <MerchGeneralFilters />
                        </div>
                        <div className="w-full lg:w-3/4">
                            <MerchGrid />
                        </div>
                    </div>
                </section>
                <section>
                    <SuggestMerch
                        openComingSoonModal={handleOpenComingSoonModal}
                    />
                </section>
            </div>
            {isContactUsModalOpen && (
                <ComingSoonModal toggleModal={setIsContactUsModalOpen} />
            )}
        </>
    )
}

export default MerchPage
