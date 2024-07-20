import React from 'react'
import Link from 'next/link'

interface PropsInterface {
    setIsNavbarDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const TheNavBar = (props: PropsInterface) => {
    const { setIsNavbarDropdownOpen } = props
    return (
        <>
            <Link
                href="/"
                className="hover:-translate-y-1 duration-200"
                onClick={() => setIsNavbarDropdownOpen(false)}
            >
                Merch
            </Link>
            <Link
                href="/"
                className="hover:-translate-y-1 duration-200"
                onClick={() => setIsNavbarDropdownOpen(false)}
            >
                Learn
            </Link>
            <Link
                href="/"
                className="md:border-lg"
                onClick={() => setIsNavbarDropdownOpen(false)}
            >
                <div className="hover:-translate-y-1 duration-200 md:hover:translate-y-0 md:bg-csg-green-100 md:rounded-xl md:uppercase md:text-sm md:px-4 md:py-3">
                    Contact Us
                </div>
            </Link>
        </>
    )
}

export default TheNavBar
