import React, { useState } from 'react'

const MerchHeaderFilterTabs = () => {
    const tabNames = ['All Items', 'Limited Edition', 'On Sale']

    const [activeTab, setActiveTab] = useState(0)

    return (
        <ul className="h-fit flex flex-row gap-4 rounded-2xl text-white bg-black">
            {tabNames.map((item, index) => (
                <li
                    data-selected={index === activeTab ? 'true' : 'false'}
                    className="px-8 py-4 rounded-2xl uppercase tracking-wider cursor-pointer hover:text-white/75 data-[selected=true]:bg-csg-green-100 data-[selected=true]:text-black transition-colors"
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
