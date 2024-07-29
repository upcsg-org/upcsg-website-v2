'use client'

import React, { useState } from 'react'
import { AiOutlineDollar } from 'react-icons/ai'
import { PiPackageLight } from 'react-icons/pi'
import {
    IoIosCheckmarkCircleOutline,
    IoIosCloseCircleOutline,
} from 'react-icons/io'

const TabSelector = () => {
    const tabs = [
        {
            icon: AiOutlineDollar,
            text: 'To Pay',
        },
        {
            icon: PiPackageLight,
            text: 'To Receive',
        },
        {
            icon: IoIosCheckmarkCircleOutline,
            text: 'Completed',
        },
        {
            icon: IoIosCloseCircleOutline,
            text: 'To Pay',
        },
    ]

    const [activeTab, setActiveTab] = useState(0)

    return (
        <ul className="max-sm:mx-auto w-fit h-fit flex flex-row justify- gap-4 rounded-2xl text-white text-center text-[10px] sm:text-xs md:text-sm bg-black">
            {tabs.map((item, index) => (
                <li
                    data-selected={index === activeTab ? 'true' : 'false'}
                    className="flex flex-row items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-2xl uppercase tracking-wider cursor-pointer hover:text-white/75 data-[selected=true]:bg-[#7D66AD] data-[selected=true]:text-black transition-colors"
                    key={index}
                    onClick={() => setActiveTab(index)}
                >
                    <span className="h-fit text-xl">
                        <item.icon />
                    </span>
                    <span className="">{item.text}</span>
                </li>
            ))}
        </ul>
    )
}

export default TabSelector
