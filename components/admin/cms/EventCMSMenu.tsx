'use client'
import React from 'react'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { IoChevronBackOutline } from 'react-icons/io5'
import { IoChevronDownOutline } from 'react-icons/io5'

function CreateEventMenu() {
    const currentRoute = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="w-full flex flex-col px-12 sm:px-14 lg:px-28">
            <div className="w-full flex flex-row justify-center lg:justify-end pt-12">
                <button
                    className="flex flex-row items-center justify-center h-12 w-full sm:w-2/3 md:w-auto py-4 px-4 md:px-8 bg-primary-light rounded-lg gap-4 font-bold tracking-wide
                                hover:bg-[#2F8690] text-[12px] md:text-sm"
                >
                    <IoChevronBackOutline />
                    BACK TO DASHBOARD
                </button>
            </div>
            <div className="w-full flex flex-col-reverse lg:flex-row-reverse items-center md:justify-between pt-8 md:pt-12 gap-6 md:gap-12">
                <div className="w-full lg:w-2/3 xl:w-1/2 flex flex-col md:flex-row gap-2 items-center justify-between">
                    <div
                        className="w-full md:w-1/2 flex flex-row items-center justify-center gap-4 py-2 md:px-6 rounded-lg hover:bg-[#7179BC]/[.10]
                    opacity-50"
                    >
                        <div className="w-8 h-8 md:w-16 md:h-16 flex flex-row items-center justify-center bg-primary-light rounded-full">
                            1
                        </div>
                        <div className="w-full md:w-1/2 text-sm md:text-md text-justify leading-4">
                            <b>Add Content</b>
                            <br />
                            Add in your content details.
                        </div>
                    </div>
                    <button className="w-full md:w-1/2 flex flex-row items-center justify-center gap-4 py-2 md:px-6 rounded-lg hover:bg-[#7179BC]/[.10]">
                        <div className="w-8 h-8 md:w-16 md:h-16 flex flex-row items-center justify-center bg-primary-light rounded-full">
                            2
                        </div>
                        <div className="w-full md:w-1/2 text-sm md:text-md text-justify leading-4">
                            <b>Finalize Content</b>
                            <br />
                            View your article before finalizing.
                        </div>
                    </button>
                </div>
                {currentRoute === '/admin/create/content' && (
                    <div
                        className={`relative w-full sm:w-2/3 xl:w-1/3 flex flex-row justify-between items-center bg-[#7179BC]/[.06] text-lg tracking-widest
                                font-bold`}
                    >
                        <button
                            className={`w-full flex flex-row justify-between items-center bg-transparent text-sm md:text-lg tracking-widest
                                font-bold border-2 border-white py-4 px-4 md:px-12 hover:bg-[#7179BC]/[.12]
                                ${isOpen ? 'rounded-t-lg' : 'rounded-lg'}`}
                            onClick={toggleDropdown}
                        >
                            <div className="text-left">
                                PUBLISH
                                <br />
                                EVENT
                            </div>

                            <IoChevronDownOutline className="text-2xl" />
                        </button>
                        {isOpen && (
                            <div
                                className="absolute top-full left-0 w-full border border-gray-300 shadow-lg border-x-2 border-b-2 border-white
                                        flex flex-col bg-[#171729] text-sm md:text-lg z-[15]"
                            >
                                <button
                                    className="w-full bg-transparent hover:bg-[#7179BC]/[.12] text-left
                                                py-4 px-4 md:px-12"
                                >
                                    PUBLISH ANNOUNCEMENT
                                </button>
                                <button
                                    className="w-full bg-transparent hover:bg-[#7179BC]/[.12] text-left
                                                py-4 px-4 md:px-12"
                                >
                                    PUBLISH SCHOLARSHIP
                                </button>
                                <button
                                    className="w-full bg-transparent hover:bg-[#7179BC]/[.12] text-left
                                                py-4 px-4 md:px-12"
                                >
                                    PUBLISH INTERNSHIP
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <hr className="mt-12" />
        </div>
    )
}

export default CreateEventMenu
