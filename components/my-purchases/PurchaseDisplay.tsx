import Image from 'next/image'
import React from 'react'

interface PropsInterface {
    key: number
    name: string
    type: string
    price: number
    size: string
    color: string
    quantity: number
    status: string
    estimatedDate: string
    cancelFunction: () => void
}

const PurchaseDisplay = (props: PropsInterface) => {
    const {
        name,
        type,
        price,
        size,
        color,
        quantity,
        status,
        estimatedDate,
        cancelFunction,
    } = props

    return (
        <div className="my-4 border-[#242460] border-4 rounded-lg grid grid-cols-10 items-center gap-2 p-2 text-sm text-center uppercase tracking-wider">
            <Image
                src="/images/placeholder.png"
                alt="Merch Sample"
                width={100}
                height={100}
                className="min-w-16 object-fill aspect-square rounded-lg"
            />
            <div className="col-span-2 flex flex-col justify-start items-start h-max text-left">
                <span className="text-lg font-bold">{name}</span>
                <span className="text-sm text-[#A6A6B1]">{type}</span>
                <div className="text-xl text-[#6479CB] grow flex items-end">
                    <span>PHP {price}</span>
                </div>
            </div>
            <span>{size}</span>
            <span>{color}</span>
            <span>{quantity}</span>
            <span>PHP {quantity * price}</span>
            <span>{status}</span>
            <span>{estimatedDate}</span>
            <div
                onClick={cancelFunction}
                className="w-fill h-fit bg-[#6A90D9] rounded-lg uppercase text-xs text-black text-center px-2 py-2"
            >
                <p className="font-semibold w-fill">Cancel</p>
            </div>
        </div>
    )
}

export default PurchaseDisplay
