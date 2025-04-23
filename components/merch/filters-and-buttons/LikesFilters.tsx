import React, { useState, useEffect } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

const Filters = [
    {
        name: 'Product Type',
        values: ['TOTE BAGS', 'SHIRTS', 'HOODIES', 'HATS', 'PINS', 'STICKERS'],
    },
    {
        name: 'Price Range',
        values: [
            'PHP 20 – PHP 50',
            'PHP 50 – PHP 100',
            'PHP 100 – PHP 150',
            'PHP 150 – PHP 200',
            'PHP 200 – PHP 250',
            'PHP 250+',
            'Lowest to Highest',
            'Highest to Lowest',
        ],
    },
    {
        name: 'Sizes',
        values: ['XSMALL', 'SMALL', 'MEDIUM', 'LARGE', 'XLARGE'],
    },
]

const LikesFilters = () => {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <div className="z-50 max-w-64 text-[10px] md:text-xs font-semibold tracking-wider uppercase grow">
            <button
                onClick={() => setModalOpen(!modalOpen)}
                className="flex flex-row items-center justify-between z-50 px-5 py-2 w-full bg-csg-blue-900 rounded-full justify-self-center uppercase text-black text-center cursor-pointer hover:text-white/75 transition-colors duration-100"
            >
                <p className="w-fill">Filters</p>
                <span className="text-lg sm:text-2xl">
                    <IoIosArrowDown
                        className={`${modalOpen ? 'rotate-180' : 'rotate-0'} duration-100`}
                    />
                </span>
            </button>
            <div className="relative w-full">
                {modalOpen && (
                    <ul className="absolute w-full -mt-4 p-2 pt-6 -z-10 bg-black rounded-md">
                        {Filters.map((filter) => (
                            <details key={filter.name} className="group mt-2">
                                <summary className="flex flex-row justify-between list-none hover:text-white/75 transition-colors">
                                    <span>{filter.name}</span>
                                    <IoIosArrowDown
                                        className={`group-open:rotate-180 rotate-0 duration-100`}
                                    />
                                </summary>
                                {filter.values.map((value) => (
                                    <li
                                        key={value}
                                        className="flex items-center mt-2"
                                    >
                                        <input
                                            type="checkbox"
                                            id={value}
                                            name="product_type"
                                            className="size-3 xl:size-5 bg-gray-100 border-gray-100 focus:ring-transparent accent-[#EE6C45] cursor-pointer"
                                            value={value}
                                        />
                                        <label htmlFor={value} className="ml-2">
                                            {value}
                                        </label>
                                    </li>
                                ))}
                            </details>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default LikesFilters
