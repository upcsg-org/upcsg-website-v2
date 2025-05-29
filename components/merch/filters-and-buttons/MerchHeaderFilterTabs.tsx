import { useState, Dispatch, SetStateAction } from 'react'

interface PropsInterface {
    selectedColor?: string
    handleSwitchFilter: Dispatch<SetStateAction<string>>
}

const MerchHeaderFilterTabs = (props: PropsInterface) => {
    const {
        selectedColor = 'data-[selected=true]:bg-csg-green-100',
        handleSwitchFilter,
    } = props

    const tabNames = ['All Items', 'On Sale'] // Removed "Limited Edition"

    const [activeTab, setActiveTab] = useState(0)

    const handleFilterClick = (index: number) => {
        setActiveTab(index)
        handleSwitchFilter(tabNames[index])
    }

    return (
        <div className="max-sm:mx-auto w-fit h-fit flex flex-row justify- gap-4 rounded-2xl text-white text-center text-[10px] sm:text-xs md:text-sm bg-black">
            {tabNames.map((item, index) => (
                <button
                    data-selected={index === activeTab ? 'true' : 'false'}
                    className={`px-4 py-2 md:px-6 md:py-3 rounded-2xl uppercase tracking-wider cursor-pointer hover:text-white/75 ${selectedColor} data-[selected=true]:text-black transition-colors`}
                    key={index + item}
                    onClick={() => handleFilterClick(index)}
                >
                    {item}
                </button>
            ))}
        </div>
    )
}

export default MerchHeaderFilterTabs
