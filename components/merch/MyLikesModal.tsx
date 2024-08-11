import React from 'react'
import MerchHeaderFilterTabs from './MerchHeaderFilterTabs'
import { merchItems } from '@/constants/merch/merch'
import MerchCard from './MerchCard'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import LikesFilters from './LikesFilters'
import TheButton from '../generics/TheButton'
import Empty from '../generics/Empty'
import { MerchItem } from '@/interface/merch'

interface PropsInterface {
    handleClose: () => void
}

const MyLikesModal = (props: PropsInterface) => {
    const { handleClose } = props

    // const myLikes = merchItems
    const myLikes = [] as MerchItem[]

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 xs:p-4">
            <div className="bg-main-dark text-white p-4 xs:p-10 rounded-2xl max-h-[95%] max-w-[95%] xs:max-h-[90%] xs:max-w-[90%] w-full relative flex flex-col gap-y-4 border-csg-blue-400 border-2 right-0.5 overflow-y-scroll">
                <div className="w-full flex flex-row flex-wrap justify-between align-middle">
                    <p className="min-w-fit flex items-center font-bold tracking-wider text-lg sm:text-2xl xl:text-4xl uppercase">
                        My Likes
                    </p>
                    <TheButton onClick={handleClose}>
                        <p className=" font-semibold w-full flex items-center justify-center gap-x-2">
                            <FaLongArrowAltLeft />
                            <span className="max-sm:hidden">
                                Continue Shopping
                            </span>
                            <span className="sm:hidden">Go Back</span>
                        </p>
                    </TheButton>
                </div>
                <div className="w-full flex flex-row flex-wrap justify-around md:justify-between items-center gap-x-8 gap-y-4 align-middle">
                    <MerchHeaderFilterTabs selectedColor="data-[selected=true]:bg-csg-violet-300" />
                    <LikesFilters />
                </div>
                {myLikes.length ? (
                    <div
                        className="gap-2 lg:gap-1 w-full text-site-main grid items-center justify-around
                                grid-cols-2 xs:grid-cols-3 sm:grid-cols-4"
                    >
                        {myLikes.map((merch, index) => (
                            <MerchCard
                                key={index + merch.name + merch.type.text}
                                merch={merch}
                            />
                        ))}
                    </div>
                ) : (
                    <Empty>No Likes</Empty>
                )}
            </div>
        </div>
    )
}

export default MyLikesModal
