import React, { useState } from 'react'

const MerchHeaderFilterTabs = () => {
    const tabNames = ['All Items', 'Limited Edition', 'On Sale']

    const [activeTab, setActiveTab] = useState(0)

    return (
        <ul className="max-sm:mx-auto w-fit h-fit flex flex-row justify- gap-4 rounded-2xl text-white text-center text-[10px] sm:text-xs md:text-sm bg-black">
            {tabNames.map((item, index) => (
                <li
                    data-selected={index === activeTab ? 'true' : 'false'}
                    className="px-4 py-2 md:px-6 md:py-3 rounded-2xl uppercase tracking-wider cursor-pointer hover:text-white/75 data-[selected=true]:bg-csg-green-100 data-[selected=true]:text-black transition-colors"
                    key={index}
                    onClick={() => setActiveTab(index)}
                >
                    {item}
                </li>
            ))}
        </ul>
    )
}

export default MerchHeaderFilterTabs
