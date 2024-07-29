import React from 'react'
import Link from 'next/link'

const HistoryButton = () => {
    return (
        <>
            <Link href="/" className="md:border-lg w-fill">
                <div className="w-fill bg-[#D7584B] rounded-full uppercase text-sm text-center px-4 py-3">
                    <p className="font-semibold w-fill">Purchase History</p>
                </div>
            </Link>
        </>
    )
}

export default HistoryButton
