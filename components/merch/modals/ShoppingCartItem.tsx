import React, { useState } from 'react'
import Image from 'next/image'
import { BsXLg } from "react-icons/bs"
import { MerchItem, MerchSize, MerchType } from '@/interface/merch'
import { Color } from "@/interface/generic"

interface ShoppingCartItem {
    merch: MerchItem
    quantity: number
    size: MerchSize
    color: Color
    maxQuantity: number
    isCheckedOut: boolean
}

const ShoppingCartItem = (props: ShoppingCartItem) => {
    const minQuantity = 0

    const { name, type, price, images, sizes, colors, isBestSeller } = props.merch

    const [quantity, setQuantity] = useState(props.quantity)

    const [size, setSize] = useState(() => {
        return sizes.find(sizeObj => sizeObj === props.size) ? props.size : sizes[0]
    })

    const [isChecked, setIsChecked] = useState(false)

    const [color, setColor] = useState(() => {
        return colors.find(colorObj => colorObj === props.color) ? props.color : colors[0]
    })

    const handleToggle = () => {
        setIsChecked(prev => !prev)
    }

    const handleDecrement = () => {
        setQuantity((prevQuantity) => Math.max(minQuantity, prevQuantity - 1));
    };

    const handleIncrement = () => {
        setQuantity((prevQuantity) => Math.min(props.maxQuantity, prevQuantity + 1));
    };

    return (
        // button
        <div className="flex flex-row items-center gap-4">
            <div onClick={ handleToggle } className={`w-[35px] h-[34px] rounded-full border-4 border-[#171745] cursor-pointer flex items-center justify-center ${isChecked ? 'bg-[#2929b7]' : 'bg-[#2929b7]/0'
                }`}></div>
        
            <div className="flex flex-row gap-8 border rounded-lg p-3 items-center w-full mb-2 mt-2">
                <div className="flex w-2/5 h-full overflow-hidden">
                    {/*image*/}
                    <div className="w-16 relative flex-shrink-0">
                        <Image
                            src={images[0]}
                            alt="Background"
                            layout="fill"
                            objectFit="cover"
                            className="opacity-100 bg-[#d8dcdf] rounded-lg"
                        />
                    </div>
                    {/*info*/}
                    <div className="w-36 flex flex-col flex-grow truncate">
                        <ul className="w-full gap-4 tracking-wider px-1">
                            <li className="w-full font-bold text-[#D8DCDF] text-sm xl:text-xl truncate text-ellipsis">
                                {name}
                            </li>
                            <li className="w-full text-[#A6A6B1] text-sm xl:text-base truncate text-ellipsis">
                                {type.text}
                            </li>
                            <li className="w-full text-[#6479CB] text-sm xl:text-2xl truncate text-ellipsis">
                                PHP {price}
                            </li>
                        </ul>
                    </div>
                </div>
                {/*size */}
                <select value={size.text} onChange={(e) => setSize(e.target.value)} className="p-2 border-0 rounded-xl text-medium text-[#380557] h-fit bg-csg-violet-100 w-1/6 uppercase truncate text-xs md:text-sm focus:outline-none border-r-4 border-transparent">
                    {sizes.map((size) => (
                        <option key={size.text} value={size.text}>
                            {size.text}
                        </option>
                    ))}
                </select>
                {/*color*/}
                <select value={color.name} onChange={(e) => setColor(e.target.value)} className="p-2 border-0 rounded-xl text-[#7f2307] h-fit bg-[#ee6c45] w-1/4 truncate uppercase truncate text-xs md:text-sm focus:outline-none border-r-4 border-transparent">
                    {colors.map((color) => (
                        <option key={color.name} value={color.name}>
                            {color.name}
                        </option>
                    ))}
                </select>
                {/*quantity*/}
                <div className="w-1/6 flex items-center h-fit">
                    <button
                        className="-mr-2 px-2 py-1 pr-3 rounded-l-xl hover:bg-gray-300 bg-[#45ae95] z-0 text-[#1d594b]"
                        onClick={handleDecrement}
                    >
                        -
                    </button>
                    <input
                        type="string"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(minQuantity, Math.min(props.maxQuantity, Number(e.target.value))))}
                        className="w-8 h-fit py-1 text-center rounded-lg bg-[#288e76] z-10 text-[#8ee6d1]"
                    />
                    <button
                        className="-ml-2 px-2 py-1 pl-3 bg-[#45ae95] rounded-r-xl hover:bg-gray-300 z-0 text-[#1d594b]"
                        onClick={handleIncrement}
                    >
                        +
                    </button>
                </div>
                <button className="text-2xl text-center bold">
                    <BsXLg />
                </button>
        </div>
        </div>
    )
}

export default ShoppingCartItem
