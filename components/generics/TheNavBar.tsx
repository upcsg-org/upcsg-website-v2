import React from 'react'
import Link from 'next/link'
import TheButton from './TheButton'

interface PropsInterface {
    setIsNavbarDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const TheNavBar = (props: PropsInterface) => {
    const { setIsNavbarDropdownOpen } = props
    return (
        <>
            <Link
                href="/merch"
                className="hover:-translate-y-1 duration-200"
                onClick={() => setIsNavbarDropdownOpen(false)}
            >
                Merch
            </Link>
            <Link
                href="/educ-and-dev"
                className="hover:-translate-y-1 duration-200"
                onClick={() => setIsNavbarDropdownOpen(false)}
            >
                Learn
            </Link>
            <TheButton
                link="/contact-us"
                onClick={() => setIsNavbarDropdownOpen(false)}
            >
                Contact Us
            </TheButton>
        </>
    )
}

export default TheNavBar
