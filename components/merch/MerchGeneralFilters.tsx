import React, { useState, useEffect } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { LuFilter } from 'react-icons/lu'

const ProductTypes = [
    'TOTE BAGS',
    'SHIRTS',
    'HOODIES',
    'HATS',
    'PINS',
    'STICKERS',
]
const PriceRange = [
    'PHP 20 – PHP 50',
    'PHP 50 – PHP 100',
    'PHP 100 – PHP 150',
    'PHP 150 – PHP 200',
    'PHP 200 – PHP 250',
    'PHP 250+',
    'Lowest to Highest',
    'Highest to Lowest',
]
const Sizes = ['XSMALL', 'SMALL', 'MEDIUM', 'LARGE', 'XLARGE']

const MerchGeneralFilters = () => {
    const [isOpen, setIsOpen] = useState([false, false, false])
    const [isVisible, setIsVisible] = useState(window.innerWidth >= 1024)

    const toggleMenu = (index: number) => {
        setIsOpen((prevState) =>
            prevState.map((state, i) => (i === index ? !state : false))
        )
    }

    const toggleVisibility = () => {
        setIsVisible(!isVisible)
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <>
            <div
                className={`sticky top-28 xl:top-20 left-0 w-full p-4 bg-main-dark xl:py-12 lg:pl-10 xl:pl-24 ${!isVisible && 'hidden'}`}
            >
                <form className="font-bold text-white text-lg xl:text-3xl tracking-wider pb-4 xl:px-0">
                    FILTERS
                    <div className="flex flex-col bg-black text-sm xl:text-xl rounded-lg p-4 mt-2 xl:mt-4">
                        <div
                            onClick={() => toggleMenu(0)}
                            className="flex flex-row justify-between text-white cursor-pointer gap-10 hover:text-white/75"
                        >
                            PRODUCT TYPE
                            {isOpen[0] ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </div>
                        {isOpen[0] && (
                            <ul className="grid grid-cols-2 lg:flex lg:flex-col text-white font-normal">
                                {ProductTypes.map((type, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center mt-2"
                                    >
                                        <input
                                            type="checkbox"
                                            id={type}
                                            name="product_type"
                                            className="size-3 xl:size-5 bg-gray-100 border-gray-100 focus:ring-transparent accent-[#EE6C45] cursor-pointer"
                                            value={type}
                                        />
                                        <label
                                            htmlFor={type}
                                            className="text-[#A6A6B1] text-sm xl:text-base ml-2"
                                        >
                                            {type}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div
                            onClick={() => toggleMenu(1)}
                            className="flex flex-row justify-between text-white cursor-pointer mt-4 gap-10 hover:text-white/75"
                        >
                            PRICE RANGE
                            {isOpen[1] ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </div>
                        {isOpen[1] && (
                            <ul className="text-white font-normal">
                                {PriceRange.map((type, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center mt-2"
                                    >
                                        <input
                                            type="checkbox"
                                            id={type}
                                            name="product_type"
                                            className="size-3 xl:size-5 bg-gray-100 border-gray-100 focus:ring-transparent accent-[#EE6C45] cursor-pointer"
                                            value={type}
                                        />
                                        <label
                                            htmlFor={type}
                                            className="text-[#A6A6B1] text-sm xl:text-base ml-2"
                                        >
                                            {type}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div
                            onClick={() => toggleMenu(2)}
                            className="flex flex-row justify-between text-white cursor-pointer mt-4 gap-10 hover:text-white/75"
                        >
                            SIZE
                            {isOpen[2] ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </div>
                        {isOpen[2] && (
                            <ul className="grid grid-cols-2 lg:flex lg:flex-col text-white font-normal">
                                {Sizes.map((type, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center mt-2"
                                    >
                                        <input
                                            type="checkbox"
                                            id={type}
                                            name="product_type"
                                            className="size-3 xl:size-5 bg-gray-100 border-gray-100 focus:ring-transparent accent-[#EE6C45] cursor-pointer"
                                            value={type}
                                        />
                                        <label
                                            htmlFor={type}
                                            className="text-[#A6A6B1] text-sm xl:text-base ml-2"
                                        >
                                            {type}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="flex flex-row justify-center">
                        <button className="flex items-center bg-csg-green-100 rounded-lg font-normal text-sm xl:text-xl p-2 xl:p-3 gap-4 mt-4 tracking-wide hover:bg-csg-green-200 hover:text-white/75">
                            <LuFilter />
                            Apply Filters
                        </button>
                    </div>
                </form>
                <div className="flex w-full justify-center lg:hidden">
                    <button
                        onClick={toggleVisibility}
                        className="flex flex-row items-center text-white text-lg text-sm xl:text-xl gap-3 underline hover:text-white/75"
                    >
                        {isVisible ? <FaEyeSlash /> : <FaEye />}
                        {isVisible ? 'Hide Filters' : 'Show Filters'}
                    </button>
                </div>
            </div>
            {!isVisible && (
                <div className="sticky top-20 pt-5 xl:pt-10 md:top-20 lg:top-24">
                    <button
                        onClick={toggleVisibility}
                        className=" flex flex-row items-center text-white text-lg 
                                    bg-csg-green-100 text-sm xl:text-xl gap-3 underline p-2 xl:p-3 rounded-r-lg
                                    hover:bg-csg-green-200 hover:text-white/75"
                    >
                        {isVisible ? <FaEyeSlash /> : <FaEye />}
                        {isVisible ? 'Hide Filters' : 'Show Filters'}
                    </button>
                </div>
            )}
        </>
    )
}

export default MerchGeneralFilters
