import React, { useState } from 'react'
import Image from 'next/image'
import { AiOutlineHeart, AiFillHeart, AiOutlineShopping } from 'react-icons/ai'
import { VscSparkle } from 'react-icons/vsc'
import OrderForm from './OrderForm'
import { AnimatePresence } from 'framer-motion'
import LikedPop from './LikedPop'

interface PropsInterface {
    name: string
    type: string
    price: number
    images: string[]
    sizes: string[]
    colors: string[]
    isBestSeller: boolean
}

const MerchCard = (props: PropsInterface) => {
    const { name, type, price, images, colors, sizes, isBestSeller } = props
    const [currentImage, setCurrentImage] = useState(0)
    const [showOrderForm, setShowOrderForm] = useState(false)
    const [showLiked, setShowLiked] = useState(false)

    const handleColorChange = (index: number) => {
        setCurrentImage(index)
    }

    const handleCardClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setShowOrderForm(true)
    }

    const handleLikeClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setShowLiked(true)
    }

    return (
        <>
            <div
                className="flex flex-col w-full items-center gap-2 lg:gap-4 p-1 lg:p-4 rounded-lg hover:bg-csg-blue-600/25 duration-150"
                onClick={handleCardClick}
            >
                <div
                    className="relative flex items-center w-full h-48 xl:h-96
                                bg-[#D8DCDF] rounded-lg hover:scale-[1.02] duration-200 cursor-pointer"
                >
                    <ul className="absolute flex flex-col w-full h-full tracking-wider p-2 xl:p-6 z-10">
                        <li className="flex flex-row items-center w-full text-black text-xl xl:text-3xl gap-2">
                            {isBestSeller ? <VscSparkle /> : <>&#8203;</>}
                        </li>
                        <li className="flex flex-grow w-full h-full text-[#A6A6B1] text-base items-center justify-end">
                            <div className="flex flex-col gap-1">
                                {colors.length > 1 &&
                                    colors.map((currentColor, index) => (
                                        <button
                                            key={index + currentColor}
                                            className="rounded-full size-3 xl:size-4 border-[1px] border-black"
                                            style={{
                                                backgroundColor: currentColor,
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleColorChange(index)
                                            }}
                                        />
                                    ))}
                            </div>
                        </li>
                        <li className="flex flex-row w-full font-bold text-main-dark text-xl xl:text-3xl justify-end">
                            <AiOutlineShopping />
                            <span
                                className="group"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <AiOutlineHeart className="group-hover:hidden" />
                                <AiFillHeart
                                    className="hidden group-hover:block"
                                    onClick={handleLikeClick}
                                />
                            </span>
                        </li>
                    </ul>
                    <div className="w-full h-full relative">
                        <Image
                            src={images[currentImage]}
                            alt="Background"
                            layout="fill"
                            objectFit="cover"
                            className=""
                        />
                    </div>
                </div>
                <ul className="w-full gap-4 tracking-wider px-1">
                    <li className="w-full font-bold text-[#D8DCDF] text-sm xl:text-xl truncate text-ellipsis">
                        {name}
                    </li>
                    <li className="w-full text-[#A6A6B1] text-sm xl:text-base truncate text-ellipsis">
                        {type}
                    </li>
                    <li className="w-full text-[#6479CB] text-sm xl:text-2xl truncate text-ellipsis">
                        PHP {price}
                    </li>
                </ul>
            </div>

            {showOrderForm && (
                <OrderForm
                    product={{
                        name,
                        type,
                        price,
                        image: images[currentImage],
                        sizes: sizes,
                        colors: colors,
                        BestSeller: isBestSeller,
                    }}
                    onClose={() => setShowOrderForm(false)}
                />
            )}

            <AnimatePresence>
                {showLiked && <LikedPop onClose={() => setShowLiked(false)} />}
            </AnimatePresence>
        </>
    )
}

export default MerchCard
