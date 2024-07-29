import React from 'react'
import Link from 'next/link'

const ContinueButton = () => {
    return (
        <>
            <Link href="/" className="md:border-lg w-fill">
                <div className="w-fill bg-csg-green-100 rounded-full uppercase text-sm text-center px-4 py-3">
                    <p className="font-semibold w-fill">← Continue Shopping</p>
                </div>
            </Link>
        </>
    )
}

export default ContinueButton
