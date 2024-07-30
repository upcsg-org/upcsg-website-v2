import React from 'react'
import Link from 'next/link'
import { MdAddShoppingCart } from 'react-icons/md'

const ContinueButton = () => {
    return (
        <>
            <Link href="/" className="md:border-lg w-fill">
                <div className="w-full flex justify-center bg-csg-green-100 rounded-xl uppercase text-[10px] md:text-xs lg:text-sm text-center p-1.5 sm:px-2 sm:py-3 cursor-pointer hover:text-white/75 transition-colors">
                    <p className="max-sm:hidden font-semibold w-full">
                        ← Continue Shopping
                    </p>
                    <span className="sm:hidden text-lg">
                        <MdAddShoppingCart />
                    </span>
                </div>
            </Link>
        </>
    )
}

export default ContinueButton
