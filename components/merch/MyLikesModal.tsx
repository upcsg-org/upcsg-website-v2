import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import ContinueButton from '../my-purchases/ContinueButton'
import MerchHeaderFilterTabs from './MerchHeaderFilterTabs'
import { merchItems } from '@/constants/merch'
import MerchCard from './MerchCard'
import { IoIosArrowDropdown } from 'react-icons/io'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import { MdAddShoppingCart } from 'react-icons/md'
import LikesFilters from './LikesFilters'

interface PropsInterface {
    handleClose: () => void
}

const MyLikesModal = (props: PropsInterface) => {
    const { handleClose } = props

    const [modalOpen, setModalOpen] = useState(false)

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 xs:p-4">
            <div className="bg-main-dark text-white p-4 xs:p-10 rounded-2xl max-h-[95%] max-w-[95%] xs:max-h-[90%] xs:max-w-[90%] w-full relative flex flex-col gap-y-4 border-csg-blue-400 border-2 right-0.5 overflow-y-scroll">
                <div className="w-full flex flex-row flex-wrap justify-between align-middle">
                    <p className="min-w-fit font-bold tracking-wider text-lg sm:text-2xl xl:text-4xl uppercase">
                        My Likes
                    </p>

                    <button
                        className="w-fill flex justify-center bg-csg-green-100 rounded-xl uppercase text-[10px] md:text-xs lg:text-sm text-center p-1.5 sm:px-2 sm:py-3 cursor-pointer hover:text-white/75 transition-colors"
                        onClick={handleClose}
                    >
                        <p className="max-sm:hidden font-semibold w-full flex items-center justify-center gap-x-2">
                            <FaLongArrowAltLeft />
                            <span>Continue Shopping</span>
                        </p>
                        <span className="sm:hidden text-lg">
                            <MdAddShoppingCart />
                        </span>
                    </button>
                </div>
                <div className="w-full flex flex-row flex-wrap justify-between gap-x-8 gap-y-4 align-middle">
                    <MerchHeaderFilterTabs selectedColor="bg-[#7D66AD]" />
                    <LikesFilters />
                </div>

                <div
                    className="gap-2 lg:gap-1 w-full text-site-main grid items-center justify-around
                                grid-cols-2 xs:grid-cols-3 sm:grid-cols-4"
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
