import ContinueButton from '@/components/my-purchases/ContinueButton'
import HistoryButton from '@/components/my-purchases/HistoryButton'
import PurchaseList from '@/components/my-purchases/PurchaseList'
import TabSelector from '@/components/my-purchases/TabSelector'
import React from 'react'

const MyPurchasesPage = () => {
    return (
        <div className="mx-auto">
            <section className="grid grid-cols-6 gap-y-4 max-w-[1280px]">
                <h2 className="col-span-5 font-bold tracking-wider text-lg sm:text-2xl xl:text-4xl">
                    MY PURCHASES
                </h2>
                <div>
                    <ContinueButton />
                </div>
                <div className="col-span-5">
                    <TabSelector />
                </div>
                <div>
                    <HistoryButton />
                </div>
                <div className="col-span-full">
                    <PurchaseList />
                </div>
            </section>
        </div>
    )
}

export default MyPurchasesPage
