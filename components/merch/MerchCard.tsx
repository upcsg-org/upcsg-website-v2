import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { AiOutlineHeart, AiFillHeart, AiOutlineShopping } from 'react-icons/ai'
import { VscSparkle } from 'react-icons/vsc'
import OrderForm from './OrderForm'
import { motion, AnimatePresence } from 'framer-motion'
import LikedPop from './effects-popup/LikedPop'
import { TfiFaceSad } from 'react-icons/tfi'
import { MerchItem } from '@/interface/merch'

interface PropsInterface {
    merch: MerchItem
}

const MerchCard = (props: PropsInterface) => {
    const { merch } = props
    const {
        name,
        type,
        price,
        images,
        isBestSeller,
        isAvailable,
        isLimitedEdition,
        onSale,
        variants = [],
    } = merch

    const [currentImage, setCurrentImage] = useState(0)
    const [showOrderForm, setShowOrderForm] = useState(false)
    const [showLiked, setShowLiked] = useState(false)
    const [selectedVariant, setSelectedVariant] = useState(variants[0])

    useEffect(() => {
        if (variants.length > 0) {
            setSelectedVariant(variants[0])
        }
    }, [variants])

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
                className={`flex flex-col w-full items-center gap-2 lg:gap-4 p-1 lg:p-4 
                            rounded-lg hover:bg-csg-blue-600/25 duration-150
                            ${isAvailable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                onClick={isAvailable ? handleCardClick : undefined}
            >
                <div
                    className="relative flex items-center w-full h-48 xl:h-96 overflow-hidden
                                bg-[#D8DCDF] rounded-lg hover:scale-[1.02] duration-200"
                >
                    {!isAvailable && (
                        <div
                            className="absolute flex flex-col w-full h-full bg-[#3B505F]/[.70] z-20
                                        items-center text-center justify-center font-bold text-[#73B3FF]
                                        leading-tight xl:leading-7 text-sm lg:text-lg xl:text-3xl gap-4 xl:gap-6"
                        >
                            <TfiFaceSad className="size-12 xl:size-40" />
                            NOT
                            <br />
                            AVAILABLE
                        </div>
                    )}
                    <div
                        className={`absolute flex items-center w-full h-full
                                    ${!isAvailable && 'blur-sm'}`}
                    >
                        <ul className="absolute flex flex-col w-full h-full tracking-wider p-2 xl:p-6 z-10">
                            <li className="flex flex-row items-center w-full text-black text-xl xl:text-3xl gap-2">
                                {isBestSeller && <VscSparkle />}
                                {isLimitedEdition && (
                                    <span className="text-purple-500">
                                        Limited Edition
                                    </span>
                                )}
                                {onSale && (
                                    <span className="text-red-500">
                                        On Sale
                                    </span>
                                )}
                            </li>
                            <li className="flex flex-grow w-full h-full text-[#A6A6B1] text-base items-center justify-end">
                                <div className="flex flex-col gap-1">
                                    {variants.length > 1 &&
                                        variants.map((variant, index) => (
                                            <button
                                                key={variant.id}
                                                className={`rounded-full size-3 xl:size-4 border-[1px] border-black
                                                      ${currentImage === index ? 'bg-white' : 'bg-gray-300'}`}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    const imageIndex =
                                                        images.findIndex(
                                                            (img) =>
                                                                img ===
                                                                variant.image
                                                        )
                                                    if (imageIndex !== -1) {
                                                        setCurrentImage(
                                                            imageIndex
                                                        )
                                                    }
                                                    setSelectedVariant(variant)
                                                }}
                                            />
                                        ))}
                                </div>
                            </li>
                            <li className="flex flex-row w-full font-bold text-main-dark text-xl xl:text-3xl justify-end">
                                <button
                                    className="group"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <AiOutlineHeart className="group-hover:hidden" />
                                    <AiFillHeart
                                        className="hidden group-hover:block text-red-600"
                                        onClick={handleLikeClick}
                                    />
                                </button>
                            </li>
                        </ul>
                        <div className="w-full h-full relative">
                            <Image
                                src={images[currentImage]}
                                alt={name}
                                layout="fill"
                                objectFit="cover"
                                className=""
                            />
                        </div>
                    </div>
                </div>
                <ul className="w-full gap-4 tracking-wider px-1">
                    <li className="w-full font-bold text-[#D8DCDF] text-sm xl:text-xl truncate text-ellipsis">
                        {name}
                    </li>
                    <li className="w-full text-[#A6A6B1] text-sm xl:text-base truncate text-ellipsis">
                        {type.text}
                    </li>
                    <li className="w-full text-[#6479CB] text-sm xl:text-2xl truncate text-ellipsis">
                        PHP {selectedVariant?.price || price}
                    </li>
                </ul>
            </div>

            {showOrderForm && (
                <OrderForm
                    product={{ ...merch, image: images[currentImage] }}
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
