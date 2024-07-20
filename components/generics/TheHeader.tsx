'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import TheNavBar from './TheNavBar'
import { FaBars } from 'react-icons/fa'

const TheHeader = () => {
    const [isNavbarDropdownOpen, setIsNavbarDropdownOpen] =
        useState<boolean>(false)

    return (
        <>
            <header className="sticky z-20 flex items-center top-0 py-4 w-screen px-8 md:px-16 lg:px-32 justify-between  text-xs font-bold bg-main-dark">
                <Link href="/" className="flex items-center space-x-2">
                    <figure className="relative aspect-square w-8 md:w-14 hover:-translate-y-1 duration-200">
                        <Image
                            src="/logo/upcsg-logo.png"
                            alt="upcsg-logo"
                            fill
                            className="object-cover"
                        />
                    </figure>
                    <p className="hover:-translate-y-1 duration-200  tracking-widest">
                        UP COMPUTER <br /> SCIENCE GUILD
                    </p>
                </Link>
                <nav className="hidden md:flex items-center gap-10 tracking-widest">
                    <TheNavBar
                        setIsNavbarDropdownOpen={setIsNavbarDropdownOpen}
                    />
                </nav>
                <button
                    className="flex md:hidden"
                    onClick={() =>
                        setIsNavbarDropdownOpen(!isNavbarDropdownOpen)
                    }
                >
                    <FaBars className="text-2xl" />
                </button>
            </header>
            <aside
                className={`tracking-widest text-xs md:hidden flex flex-col rounded-lg gap-5 items-end bg-main-dark/90  right-7 fixed  z-19 transform transition-transform duration-300 ease-in-out ${isNavbarDropdownOpen ? 'translate-y-14' : '-translate-y-52'} py-5 px-10 `}
            >
                <TheNavBar setIsNavbarDropdownOpen={setIsNavbarDropdownOpen} />
            </aside>
        </>
    )
}

export default TheHeader
