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
                MERCH
            </Link>
            <Link
                href="/"
                className="hover:-translate-y-1 duration-200"
                onClick={() => setIsNavbarDropdownOpen(false)}
            >
                INFO
            </Link>
            <Link
                href="/"
                className="hover:-translate-y-1 duration-200"
                onClick={() => setIsNavbarDropdownOpen(false)}
            >
                EVENTS
            </Link>
            <Link
                href="/"
                className="md:border-lg"
                onClick={() => setIsNavbarDropdownOpen(false)}
            >
                <div className="hover:-translate-y-1 duration-200 md:hover:translate-y-0 md:bg-csg-green-100 md:px-6 md:py-3">
                    LOGIN
                </div>
            </Link>
        </>
    )
}

export default TheNavBar
