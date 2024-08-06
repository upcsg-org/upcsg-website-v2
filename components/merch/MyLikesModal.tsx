import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import ContinueButton from '../my-purchases/ContinueButton'
import MerchHeaderFilterTabs from './MerchHeaderFilterTabs'
import { merchItems } from '@/constants/merch'
import MerchCard from './MerchCard'
import { IoIosArrowDropdown } from 'react-icons/io'

const MyLikesModal = () => {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-main-dark text-white p-4 xs:p-10 rounded-2xl max-h-[90%] max-w-[90%] w-full relative flex flex-col gap-y-4 border-csg-blue-400 border-2 right-0.5 overflow-y-scroll">
                <div className="w-full flex flex-row flex-wrap justify-between align-middle">
                    <p className="min-w-fit font-bold tracking-wider text-lg sm:text-2xl xl:text-4xl uppercase">
                        My Likes
                    </p>
                    <ContinueButton />
                </div>
                <div className="w-full flex flex-row flex-wrap justify-between align-middle">
                    <MerchHeaderFilterTabs />
                    <button
                        onClick={console.log}
                        className="flex flex-row items-center gap-0.5 md:hidden w-fit h-fit bg-[#45AAC1] rounded-full justify-self-center uppercase text-black text-center p-1 lg:p-2 cursor-pointer hover:text-white/75 transition-colors"
                    >
                        <p className="max-sm:hidden sm:text-[10px] md:text-xs font-semibold w-fill px-1 tracking-wider">
                            Filters
                        </p>
                        <span className="text-lg sm:text-2xl lg:hidden">
                            <IoIosArrowDropdown
                                className={`${modalOpen ? 'rotate-180 duration-500' : 'rotate-0 duration-500'}`}
                            />
                        </span>
                    </button>
                </div>

                <div
                    className="gap-2 lg:gap-1 w-full text-site-main grid items-center justify-around
                                grid-cols-3 sm:grid-cols-4"
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
                            isAvailable={item.isAvailable}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyLikesModal
