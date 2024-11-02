import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    setProductTypes,
    setPriceRange,
    setSizes,
    setSort,
} from '@/app/slices/filterSlice'
import { RootState } from '@/app/store'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import { LuFilter } from 'react-icons/lu'
import TheButton from '../../generics/TheButton'
import { merchTypes } from '@/constants/merch/merchTypes'
import {
    PRICE_RANGE_20_50,
    PRICE_RANGE_50_100,
    PRICE_RANGE_100_150,
    PRICE_RANGE_150_200,
    PRICE_RANGE_200_250,
    PRICE_RANGE_250_PLUS,
    PRICE_RANGE_LOWEST_TO_HIGHEST,
    PRICE_RANGE_HIGHEST_TO_LOWEST,
} from '@/constants/merch/merchRanges'
import { merchSizes } from '@/constants/merch/merchSizes'

const PriceRanges = [
    PRICE_RANGE_20_50,
    PRICE_RANGE_50_100,
    PRICE_RANGE_100_150,
    PRICE_RANGE_150_200,
    PRICE_RANGE_200_250,
    PRICE_RANGE_250_PLUS,
]
const Sorting = [PRICE_RANGE_LOWEST_TO_HIGHEST, PRICE_RANGE_HIGHEST_TO_LOWEST]

const MerchGeneralFilters = () => {
    const dispatch = useDispatch()
    const filterState = useSelector((state: RootState) => state.filters)
    const [isOpen, setIsOpen] = useState([false, false, false])
    const [isVisible, setIsVisible] = useState(false)

    const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>(
        []
    )
    const [selectedPriceRange, setSelectedPriceRange] = useState<string[]>([])
    const [selectedSizes, setSelectedSizes] = useState<string[]>([])
    const [selectedSort, setSelectedSort] = useState<string[]>([])

    const toggleMenu = (index: number) => {
        setIsOpen((prevState) =>
            prevState.map((state, i) => (i === index ? !state : false))
        )
    }

    const toggleVisibility = () => {
        setIsVisible(!isVisible)
    }

    const handleFilter = () => {
        dispatch(setProductTypes(selectedProductTypes))
        dispatch(setPriceRange(selectedPriceRange))
        dispatch(setSizes(selectedSizes))
        dispatch(setSort(selectedSort))
        console.log('Types:', selectedProductTypes)
        console.log('Price Range:', selectedPriceRange)
        console.log('Sizes:', selectedSizes)
    }

    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setSelected: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
        const { value, checked } = event.target
        setSelected((prevSelected) =>
            checked
                ? [...prevSelected, value]
                : prevSelected.filter((item) => item !== value)
        )
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        if (typeof window !== 'undefined') {
            setIsVisible(window.innerWidth >= 1024)
            window.addEventListener('resize', handleResize)
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', handleResize)
            }
        }
    }, [])

    return (
        <>
            <div
                className={`sticky top-28 xl:top-20 left-0 w-full  max-lg:gap-4 p-4 bg-main-dark xl:py-12 lg:pl-10 xl:pl-24 ${isVisible ? 'max-lg:flex max-lg:flex-col' : 'hidden '}`}
            >
                <form
                    className="font-bold text-white text-lg xl:text-3xl flex flex-col gap-4 tracking-wider xl:px-0"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <p>FILTERS</p>
                    <div className="flex flex-col bg-black text-sm xl:text-xl rounded-lg p-4">
                        <button
                            onClick={() => toggleMenu(0)}
                            className="flex flex-row justify-between text-white cursor-pointer  hover:text-white/75"
                        >
                            PRODUCT TYPE
                            <IoIosArrowDown
                                className={`${isOpen[0] ? 'rotate-180 duration-500' : 'rotate-0 duration-500'}`}
                            />
                        </button>
                        {isOpen[0] && (
                            <ul className="grid grid-cols-2 lg:flex lg:flex-col font-normal">
                                {merchTypes.map((type) => (
                                    <li
                                        key={type.id}
                                        className="flex items-center mt-2"
                                    >
                                        <input
                                            type="checkbox"
                                            id={type.text}
                                            name="product_type"
                                            className="size-3 xl:size-5 bg-gray-100 border-gray-100 focus:ring-transparent accent-[#EE6C45] cursor-pointer"
                                            value={type.text}
                                            checked={selectedProductTypes.includes(
                                                type.text
                                            )}
                                            onChange={(e) =>
                                                handleCheckboxChange(
                                                    e,
                                                    setSelectedProductTypes
                                                )
                                            }
                                        />
                                        <label
                                            htmlFor={type.text}
                                            className="text-[#A6A6B1] text-sm xl:text-base ml-2"
                                        >
                                            {type.text}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <button
                            onClick={() => toggleMenu(1)}
                            className="flex flex-row justify-between text-white cursor-pointer mt-4  hover:text-white/75"
                        >
                            PRICE RANGE
                            <IoIosArrowDown
                                className={`${isOpen[1] ? 'rotate-180 duration-500' : 'rotate-0 duration-500'}`}
                            />
                        </button>
                        {isOpen[1] && (
                            <ul className="text-white font-normal">
                                {PriceRanges.map((range) => (
                                    <li
                                        key={range.label}
                                        className="flex items-center mt-2"
                                    >
                                        <input
                                            type="checkbox"
                                            id={range.label}
                                            name="product_type"
                                            className="size-3 xl:size-5 bg-gray-100 border-gray-100 focus:ring-transparent accent-[#EE6C45] cursor-pointer"
                                            value={range.label}
                                            checked={selectedPriceRange.includes(
                                                range.label
                                            )}
                                            onChange={(e) =>
                                                handleCheckboxChange(
                                                    e,
                                                    setSelectedPriceRange
                                                )
                                            }
                                        />
                                        <label
                                            htmlFor={range.label}
                                            className="text-[#A6A6B1] text-sm xl:text-base ml-2"
                                        >
                                            {range.label}
                                        </label>
                                    </li>
                                ))}
                                {Sorting.map((sort) => (
                                    <li
                                        key={sort.label}
                                        className="flex items-center mt-2"
                                    >
                                        <input
                                            type="checkbox"
                                            id={sort.label}
                                            name="product_type"
                                            className="size-3 xl:size-5 bg-gray-100 border-gray-100 focus:ring-transparent accent-[#EE6C45] cursor-pointer"
                                            value={sort.label}
                                            checked={selectedSort.includes(
                                                sort.label
                                            )}
                                            onChange={(e) =>
                                                handleCheckboxChange(
                                                    e,
                                                    setSelectedSort
                                                )
                                            }
                                        />
                                        <label
                                            htmlFor={sort.label}
                                            className="text-[#A6A6B1] text-sm xl:text-base ml-2"
                                        >
                                            {sort.label}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <button
                            onClick={() => toggleMenu(2)}
                            className="flex flex-row justify-between text-white cursor-pointer mt-4 hover:text-white/75"
                        >
                            SIZE
                            <IoIosArrowDown
                                className={`${isOpen[2] ? 'rotate-180 duration-500' : 'rotate-0 duration-500'}`}
                            />
                        </button>
                        {isOpen[2] && (
                            <ul className="grid grid-cols-2 lg:flex lg:flex-col text-white font-normal">
                                {merchSizes.map((size) => (
                                    <li
                                        key={size.id}
                                        className="flex items-center mt-2"
                                    >
                                        <input
                                            type="checkbox"
                                            id={size.text}
                                            name="product_type"
                                            className="size-3 xl:size-5 bg-gray-100 border-gray-100 focus:ring-transparent accent-[#EE6C45] cursor-pointer"
                                            value={size.text}
                                            checked={selectedSizes.includes(
                                                size.text
                                            )}
                                            onChange={(e) =>
                                                handleCheckboxChange(
                                                    e,
                                                    setSelectedSizes
                                                )
                                            }
                                        />
                                        <label
                                            htmlFor={size.text}
                                            className="text-[#A6A6B1] text-sm xl:text-base ml-2"
                                        >
                                            {size.text}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="flex flex-row justify-center">
                        <TheButton
                            onClick={handleFilter}
                            style="flex items-center gap-2"
                        >
                            <LuFilter />
                            Apply Filters
                        </TheButton>
                    </div>
                </form>
                <div className="flex w-full justify-center lg:hidden">
                    <button
                        onClick={toggleVisibility}
                        className="flex flex-row items-center text-white  text-sm xl:text-xl gap-3 underline hover:text-white/75"
                    >
                        {isVisible ? <FaEyeSlash /> : <FaEye />}
                        {isVisible ? 'Hide Filters' : 'Show Filters'}
                    </button>
                </div>
            </div>
            {!isVisible && (
                <div className="sticky top-20 py-5 xl:pt-10 md:top-20 lg:top-24">
                    <button
                        onClick={toggleVisibility}
                        className=" flex flex-row items-center text-white
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
