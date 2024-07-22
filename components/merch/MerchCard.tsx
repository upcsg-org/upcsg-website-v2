import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { AiOutlineHeart, AiFillHeart, AiOutlineShopping } from 'react-icons/ai'
import { VscSparkle } from 'react-icons/vsc'

interface PropsInterface {
    name: string
    type: string
    price: number
    images: string[]
    colors: string[]
    isBestSeller: boolean
}

const MerchCard = (props: PropsInterface) => {
    const { name, type, price, images, colors, isBestSeller } = props
    const [currentImage, setCurrentImage] = useState(0)

    const handleColorChange = (index: number) => {
        setCurrentImage(index)
    }

    return (
        <div className="flex flex-col w-full items-center gap-2 lg:gap-4 p-1 lg:p-4 rounded-lg hover:bg-csg-blue-600/25 duration-150">
            <div className="flex items-center w-full h-48 lg:h-96 bg-[#D8DCDF] rounded-lg relative hover:scale-[1.02] duration-200 cursor-pointer">
                <ul className="absolute flex flex-col w-full h-full tracking-wider p-3 lg:p-6 z-10">
                    <li className="flex flex-row items-center w-full text-black text-xl lg:text-3xl gap-2">
                        {isBestSeller ? <VscSparkle /> : <>&#8203;</>}
                    </li>
                    <li className="flex flex-grow w-full h-full text-[#A6A6B1] text-base items-center justify-end">
                        <div className="flex flex-col gap-1">
                            {colors.map((currentColor, index) => (
                                <button
                                    key={index}
                                    className="rounded-full size-3 lg:size-4 border-[1px] border-black"
                                    style={{
                                        backgroundColor: currentColor,
                                    }}
                                    onClick={() => handleColorChange(index)}
                                />
                            ))}
                        </div>
                    </li>
                    <li className="flex flex-row w-full font-bold text-main-dark text-xl lg:text-3xl justify-end">
                        <AiOutlineShopping />
                        <span className="group">
                            <AiOutlineHeart className="group-hover:hidden" />
                            <AiFillHeart className="hidden group-hover:block" />
                        </span>
                    </li>
                </ul>
                <div className="w-full h-4/5 relative">
                    <Image
                        src={images[currentImage]}
                        alt="Background"
                        layout="fill"
                        objectFit="cover"
                        className="opacity-50"
                    />
                </div>
            </div>
            <ul className="w-full gap-4 tracking-wider px-1">
                <li className="w-full font-bold text-[#D8DCDF] text-sm lg:text-xl">
                    {name}
                </li>
                <li className="w-full text-[#A6A6B1] text-sm lg:text-base">
                    {type}
                </li>
                <li className="w-full text-[#6479CB] text-sm lg:text-2xl">
                    PHP {price}
                </li>
            </ul>
        </div>
    )
}

export default MerchCard
