import Image from 'next/image'
import React, { useState } from 'react'
import {
    IoIosArrowDropdown,
    IoIosArrowDropup,
    IoIosCloseCircleOutline,
} from 'react-icons/io'

interface PropsInterface {
    index: number
    name: string
    type: string
    price: number
    size: string
    color: string
    quantity: number
    status: string
    estimatedDate: string
    cancelFunction: () => void
    toggleDropdown: () => void
    openDropdown: number
}

const PurchaseDisplay = (props: PropsInterface) => {
    const {
        index,
        name,
        type,
        price,
        size,
        color,
        quantity,
        status,
        estimatedDate,
        cancelFunction,
        toggleDropdown,
        openDropdown,
    } = props

    const totalCost = price * quantity

    return (
        <div className="transform transition-all max-h-fit my-4 border-[#242460] border-4 rounded-lg grid grid-cols-5 md:grid-cols-10 items-center gap-2 p-2 text-xs min-[950px]:text-sm text-center uppercase tracking-wider">
            <Image
                src="/images/placeholder.png"
                alt="Merch Sample"
                width={100}
                height={100}
                className="min-w-10 object-fill aspect-square rounded-lg"
            />
            <div className="col-span-2 flex flex-col justify-start items-start h-max text-left">
                <span className="text-xs sm:text-base min-[950px]:text-lg font-bold">
                    {name}
                </span>
                <span className="text-[10px] sm:text-xs min-[950px]:text-sm text-[#A6A6B1]">
                    {type}
                </span>
                <div className="text-sm sm:text-lg min-[950px]:text-xl text-[#6479CB] grow flex items-end">
                    <span>PHP {price}</span>
                </div>
            </div>
            <span className="max-md:hidden">{size}</span>
            <span className="max-md:hidden">{color}</span>
            <span className="max-md:hidden">{quantity}</span>
            <span className="max-md:hidden">PHP {totalCost}</span>
            <span className="max-md:hidden">{status}</span>
            <span className="max-md:hidden">{estimatedDate}</span>
            <div
                onClick={toggleDropdown}
                className="flex flex-row items-center gap-0.5 md:hidden w-fit h-fit bg-[#6A90D9] rounded-lg justify-self-center uppercase text-black text-center p-1 lg:p-2 cursor-pointer hover:text-white/75 transition-colors"
            >
                <span className="text-lg sm:text-2xl lg:hidden">
                    {openDropdown !== index ? (
                        <IoIosArrowDropdown />
                    ) : (
                        <IoIosArrowDropup />
                    )}
                </span>
                <p className="max-sm:hidden sm:text-[10px] md:text-xs font-semibold w-fill">
                    Details
                </p>
            </div>
            <div
                onClick={cancelFunction}
                className="w-fit h-fit bg-[#6A90D9] rounded-lg justify-self-center uppercase text-xs text-black text-center p-1 lg:p-2 cursor-pointer hover:text-white/75 transition-colors"
            >
                <span className="text-lg sm:text-2xl lg:hidden">
                    <IoIosCloseCircleOutline />
                </span>
                <p className="max-lg:hidden font-semibold w-fill">Cancel</p>
            </div>

            {/* Dropdown */}
            <div
                data-isOpen={index === openDropdown ? 'true' : 'false'}
                className="col-span-full grid grid-cols-3 gap-2 overflow-hidden max-h-full data-[isOpen=false]:max-h-0 md:hidden text-left text-[10px] sm:text-xs"
            >
                <div className="flex flex-col">
                    <span className="text-[#444466] font-semibold">Size</span>
                    <span>{size}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[#444466] font-semibold">Color</span>
                    <span>{color}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[#444466] font-semibold">
                        Quantity
                    </span>
                    <span>{quantity}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[#444466] font-semibold">
                        Total Cost
                    </span>
                    <span>PHP {totalCost}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[#444466] font-semibold">Status</span>
                    <span>{status}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[#444466] font-semibold">
                        Estimated Date
                    </span>
                    <span>{estimatedDate}</span>
                </div>
            </div>
        </div>
    )
}

export default PurchaseDisplay
