'use client'
import React from 'react'
import { useState } from 'react'
import { IoChevronBackOutline } from 'react-icons/io5'
import { IoChevronDownOutline } from 'react-icons/io5'

function CreateEventMenu() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="w-full flex flex-col px-28">
            <div className="w-full flex flex-row-reverse pt-12">
                <button className="flex flex-row items-center h-12 py-4 px-8 bg-primary-light rounded-lg gap-4 font-bold tracking-wide hover:bg-[#2F8690]">
                    <IoChevronBackOutline />
                    BACK TO DASHBOARD
                </button>
            </div>
            <div className="w-full flex flex-row justify-between pt-12">
                <div
                    className={`relative w-1/3 flex flex-row justify-between items-center bg-[#7179BC]/[.06] text-lg tracking-widest
                                font-bold`}
                >
                    <button
                        className={`w-full flex flex-row justify-between items-center bg-transparent text-lg tracking-widest
                                font-bold border-2 border-white py-4 px-12 hover:bg-[#7179BC]/[.12]
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
                                        flex flex-col bg-[#171729]"
                        >
                            <button
                                className="w-full bg-transparent hover:bg-[#7179BC]/[.12] text-left
                                                py-4 px-12"
                            >
                                PUBLISH ANNOUNCEMENT
                            </button>
                            <button
                                className="w-full bg-transparent hover:bg-[#7179BC]/[.12] text-left
                                                py-4 px-12"
                            >
                                PUBLISH SCHOLARSHIP
                            </button>
                            <button
                                className="w-full bg-transparent hover:bg-[#7179BC]/[.12] text-left
                                                py-4 px-12"
                            >
                                PUBLISH INTERNSHIP
                            </button>
                        </div>
                    )}
                </div>
                <div className="w-1/2 flex flex-row items-center justify-between">
                    <div className="w-1/2 flex flex-row items-center justify-end gap-4 py-2 px-6 rounded-lg hover:bg-[#7179BC]/[.10]">
                        <div className="w-16 h-16 flex flex-row items-center justify-center bg-primary-light rounded-full">
                            1
                        </div>
                        <div className="w-1/2 leading-4">
                            <b>Add Content</b>
                            <br />
                            Add in your content details.
                        </div>
                    </div>
                    <div className="w-1/2 flex flex-row items-center justify-end gap-4 py-2 px-6 rounded-lg hover:bg-[#7179BC]/[.10]">
                        <div className="w-16 h-16 flex flex-row items-center justify-center bg-primary-light rounded-full">
                            2
                        </div>
                        <div className="w-1/2 leading-4">
                            <b>Finalize Content</b>
                            <br />
                            View your article before finalizing.
                        </div>
                    </div>
                </div>
            </div>
            <hr className="mt-12" />
        </div>
    )
}

export default CreateEventMenu
