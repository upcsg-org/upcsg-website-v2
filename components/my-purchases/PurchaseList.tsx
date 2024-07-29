'use client'

import React from 'react'
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
        name: 'Name of Product',
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
    function cancelOrder(index: number) {
        // Handle cancel order
        console.log(`Cancelled ${index}`)
        return
    }

    return (
        <div className="">
            <div className="grid grid-cols-10 bg-[#00000C] text-[#444466] rounded-t-lg px-6 py-2 text-center text-sm font-semibold uppercase">
                <span className="col-span-2">Product Details</span>
                <span className="col-start-4">Size</span>
                <span>Color</span>
                <span>Quantity</span>
                <span>Order Total</span>
                <span>Status</span>
                <span>Estimated Date</span>
            </div>
            <div className="bg-[#08081D] text-[#D8DCDF] rounded-b-lg p-4">
                {testValues.map((item, index) => (
                    <PurchaseDisplay
                        key={index}
                        name={item.name}
                        type={item.type}
                        price={item.price}
                        size={item.size}
                        color={item.color}
                        quantity={item.quantity}
                        status={item.status}
                        estimatedDate={item.estimatedDate}
                        cancelFunction={() => cancelOrder(index)}
                    />
                ))}
            </div>
        </div>
    )
}

export default PurchaseList
