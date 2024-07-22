import React, { useState } from 'react'
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

    const toggleMenu = (index: number) => {
        setIsOpen((prevState) =>
            prevState.map((state, i) => (i === index ? !state : state))
        )
    }

    return (
        <form className="w-full font-bold text-white text-lg lg:text-3xl tracking-wider pb-5 px-5 lg:py-0 lg:px-0">
            FILTERS
            <div className="flex flex-col bg-black text-sm lg:text-xl rounded-lg p-4 mt-2 lg:mt-4">
                <div
                    onClick={() => toggleMenu(0)}
                    className="flex flex-row justify-between text-white cursor-pointer"
                >
                    PRODUCT TYPE
                    {isOpen[0] ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                {isOpen[0] && (
                    <ul className="grid grid-cols-2 lg:flex lg:flex-col text-white font-normal">
                        {ProductTypes.map((type, index) => (
                            <li key={index} className="flex items-center mt-2">
                                <input
                                    type="checkbox"
                                    id={type}
                                    name="product_type"
                                    className="size-3 lg:size-5 bg-gray-100 border-gray-100 focus:ring-transparent accent-[#EE6C45] cursor-pointer"
                                    value={type}
                                />
                                <label
                                    htmlFor={type}
                                    className="text-[#A6A6B1] text-sm lg:text-base ml-2"
                                >
                                    {type}
                                </label>
                            </li>
                        ))}
                    </ul>
                )}

                <div
                    onClick={() => toggleMenu(1)}
                    className="flex flex-row justify-between text-white cursor-pointer mt-4"
                >
                    PRICE RANGE
                    {isOpen[1] ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                {isOpen[1] && (
                    <ul className="text-white font-normal">
                        {PriceRange.map((type, index) => (
                            <li key={index} className="flex items-center mt-2">
                                <input
                                    type="checkbox"
                                    id={type}
                                    name="product_type"
                                    className="size-3 lg:size-5 bg-gray-100 border-gray-100 focus:ring-transparent accent-[#EE6C45] cursor-pointer"
                                    value={type}
                                />
                                <label
                                    htmlFor={type}
                                    className="text-[#A6A6B1] text-sm lg:text-base ml-2"
                                >
                                    {type}
                                </label>
                            </li>
                        ))}
                    </ul>
                )}

                <div
                    onClick={() => toggleMenu(2)}
                    className="flex flex-row justify-between text-white cursor-pointer mt-4"
                >
                    SIZE
                    {isOpen[2] ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                {isOpen[2] && (
                    <ul className="grid grid-cols-2 lg:flex lg:flex-col text-white font-normal">
                        {Sizes.map((type, index) => (
                            <li key={index} className="flex items-center mt-2">
                                <input
                                    type="checkbox"
                                    id={type}
                                    name="product_type"
                                    className="size-3 lg:size-5 bg-gray-100 border-gray-100 focus:ring-transparent accent-[#EE6C45] cursor-pointer"
                                    value={type}
                                />
                                <label
                                    htmlFor={type}
                                    className="text-[#A6A6B1] text-sm lg:text-base ml-2"
                                >
                                    {type}
                                </label>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="flex flex-row justify-center">
                <button className="flex items-center text-base lg:text-xl font-normal p-2 lg:p-3 rounded-lg bg-csg-green-100 hover:bg-csg-green-200 gap-4 mt-4 tracking-wide">
                    <LuFilter />
                    Apply Filters
                </button>
            </div>
        </form>
    )
}

export default MerchGeneralFilters
