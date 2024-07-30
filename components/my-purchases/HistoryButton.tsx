import React from 'react'
import Link from 'next/link'
import { AiOutlineProfile } from 'react-icons/ai'

const HistoryButton = () => {
    return (
        <>
            <Link href="/" className="md:border-lg w-fill">
                <div className="w-full flex justify-center bg-[#D7584B] rounded-xl uppercase text-[10px] md:text-xs lg:text-sm text-center p-1.5 sm:px-2 sm:py-3">
                    <p className="max-sm:hidden font-semibold w-full">
                        Purchase History
                    </p>
                    <span className="sm:hidden text-lg">
                        <AiOutlineProfile />
                    </span>
                </div>
            </Link>
        </>
    )
}

export default HistoryButton
