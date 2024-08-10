'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const LookingSection = () => {
    return (
        <div className="bg-csg-blue-400 w-full overflow-x-hidden h-[600px] flex flex-col items-center justify-center">
            <Image
                src="/images/Study.png"
                alt="Student studying"
                width={2000}
                height={2000}
                className="w-64 h-60"
            />
            <header className="text-3xl font-vietnam font-bold text-center px-4">
                LOOKING FOR LEARNING MATERIALS?
            </header>
            <p className="text-md font-vietnam font-thin max-w-[720px] text-center px-4">
                Looking to better your learning for your academics or to
                acquaint yourself better with the computer science industry?
                Check out our collection of materials, procured for your best
                perusal!
            </p>
            <Link
                className="bg-main-dark text-white text-md sm:text-lg font-vietnam font-bold py-3 px-8 sm:px-7 mt-8 rounded-full border-white border-2"
                href="/learning"
            >
                Learning Materials
            </Link>
        </div>
    )
}

export default LookingSection
