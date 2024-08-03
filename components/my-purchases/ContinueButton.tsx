import React from 'react'
import Link from 'next/link'
import { MdAddShoppingCart } from 'react-icons/md'
import { FaLongArrowAltLeft } from 'react-icons/fa'

const ContinueButton = () => {
    return (
        <Link href="/" className="md:border-lg w-fill">
            <div className="w-full flex justify-center bg-csg-green-100 rounded-xl uppercase text-[10px] md:text-xs lg:text-sm text-center p-1.5 sm:px-2 sm:py-3 cursor-pointer hover:text-white/75 transition-colors">
                <p className="max-sm:hidden font-semibold w-full flex items-center justify-center gap-x-2">
                    <FaLongArrowAltLeft />
                    <span>Continue Shopping</span>
                </p>
                <span className="sm:hidden text-lg">
                    <MdAddShoppingCart />
                </span>
            </div>
        </Link>
    )
}

export default ContinueButton
