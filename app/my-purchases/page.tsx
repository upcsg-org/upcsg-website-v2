import ContinueButton from '@/components/my-purchases/ContinueButton'
import HistoryButton from '@/components/my-purchases/HistoryButton'
import PurchaseList from '@/components/my-purchases/PurchaseList'
import TabSelector from '@/components/my-purchases/TabSelector'
import React from 'react'

const MyPurchasesPage = () => {
    return (
        <div className="mx-auto p-4">
            <section className="grid grid-cols-8 gap-x-2 gap-y-4 max-w-[1280px]">
                <h2 className="order-first col-span-6 sm:col-span-4 lg:col-span-6 font-bold tracking-wider text-lg sm:text-2xl md:text-4xl">
                    MY PURCHASES
                </h2>
                <div className="order-2 justify-self-end sm:col-span-2 w-full">
                    <ContinueButton />
                </div>
                <div className="order-4 lg:order-3 col-span-full lg:col-span-6">
                    <TabSelector />
                </div>
                <div className="order-3 justify-self-end lg:order-4 sm:col-span-2 w-full">
                    <HistoryButton />
                </div>
                <div className="order-last col-span-full">
                    <PurchaseList />
                </div>
            </section>
        </div>
    )
}

export default MyPurchasesPage
