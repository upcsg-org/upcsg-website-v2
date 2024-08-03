'use client'

import React, { useState } from 'react'
import PurchaseDisplay from './PurchaseDisplay'

const testValues = [
    {
        name: 'Name of Product',
        type: 'Tote Bags',
        price: 100,
        size: 'small',
        color: 'forest green',
        quantity: 2,
        status: 'pending',
        estimatedDate: '08/12/2024',
    },
    {
        name: 'Short',
        type: 'Tote Bags',
        price: 100,
        size: 'small',
        color: 'forest green',
        quantity: 2,
        status: 'pending',
        estimatedDate: '08/12/2024',
    },
    {
        name: 'This Is A Really Long Name',
        type: 'Tote Bags',
        price: 100,
        size: 'small',
        color: 'forest green',
        quantity: 2,
        status: 'pending',
        estimatedDate: '08/12/2024',
    },
]

const PurchaseList = () => {
    const [openDropdown, setOpenDropdown] = useState(-1)

    function toggleDropdown(index: number) {
        if (openDropdown === index) {
            setOpenDropdown(-1)
        } else {
            setOpenDropdown(index)
        }
        console.log('toggled ' + index)
    }

    function cancelOrder(index: number) {
        // Handle cancel order
        console.log(`Cancelled ${index}`)
        console.log(`Currently open: ${openDropdown}`)
    }

    return (
        <div className="">
            <div className="min-h-8 grid grid-cols-5 md:grid-cols-10 items-center bg-[#00000C] text-[#444466] rounded-t-lg px-6 py-2 text-center text-xs min-[950px]:text-sm font-semibold uppercase">
                <span className="max-md:hidden col-span-2">
                    Product Details
                </span>
                <span className="max-md:hidden col-start-4">Size</span>
                <span className="max-md:hidden">Color</span>
                <span className="max-md:hidden">Quantity</span>
                <span className="max-md:hidden">Order Total</span>
                <span className="max-md:hidden">Status</span>
                <span className="max-md:hidden">Estimated Date</span>
            </div>
            <div className="bg-[#08081D] text-[#D8DCDF] rounded-b-lg p-4">
                {testValues.map((item, index) => (
                    <PurchaseDisplay
                        key={index}
                        index={index}
                        name={item.name}
                        type={item.type}
                        price={item.price}
                        size={item.size}
                        color={item.color}
                        quantity={item.quantity}
                        status={item.status}
                        estimatedDate={item.estimatedDate}
                        cancelFunction={() => cancelOrder(index)}
                        toggleDropdown={() => toggleDropdown(index)}
                        openDropdown={openDropdown}
                    />
                ))}
            </div>
        </div>
    )
}

export default PurchaseList
