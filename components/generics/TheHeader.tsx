'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import TheNavBar from './TheNavBar'
import { FaBars } from 'react-icons/fa'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/auth'

const TheHeader = () => {
    const pathname = usePathname()
    const { user, isAuthenticated } = useAuthStore()

    const isAdminRoute = pathname.startsWith('/admin')

    const [isNavbarDropdownOpen, setIsNavbarDropdownOpen] =
        useState<boolean>(false)

    return (
        <>
            <header
                className={`h-20 sticky z-50 flex items-center top-0 py-4 w-screen px-8 md:px-16 lg:px-32 ${isAdminRoute ? 'justify-center' : 'justify-between'} text-xs font-bold bg-main-dark border-b-[0.5px] border-[#242460]`}
            >
                <Link
                    href={isAdminRoute ? '/admin/dashboard' : '/'}
                    className="flex items-center space-x-2"
                >
                    <figure className="relative aspect-square w-8 md:w-14 hover:-translate-y-1 duration-200">
                        <Image
                            src="/logo/upcsg-logo.png"
                            alt="upcsg-logo"
                            fill
                            className="object-cover"
                        />
                    </figure>
                    {!isAdminRoute ? (
                        <p className="hover:-translate-y-1 duration-200  tracking-widest">
                            UP COMPUTER <br /> SCIENCE GUILD
                        </p>
                    ) : (
                        <p className="hover:-translate-y-1 duration-200  tracking-widest">
                            UPCSG ADMIN <br /> DASHBOARD
                        </p>
                    )}
                </Link>
                {!isAdminRoute && (
                    <nav className="hidden md:flex items-center gap-10 tracking-widest">
                        <TheNavBar
                            setIsNavbarDropdownOpen={setIsNavbarDropdownOpen}
                        />
                        {/* Superuser Admin Dashboard Button */}
                        {isAuthenticated && user?.is_superuser && (
                            <Link
                                href="/admin/dashboard"
                                className="bg-csg-blue-400 hover:bg-csg-blue-500 text-white px-4 py-2 rounded-lg font-bold tracking-widest transition-colors duration-200 hover:-translate-y-1"
                            >
                                ADMIN
                            </Link>
                        )}
                    </nav>
                )}
                {!isAdminRoute && (
                    <button
                        className="flex md:hidden"
                        onClick={() =>
                            setIsNavbarDropdownOpen(!isNavbarDropdownOpen)
                        }
                    >
                        <FaBars className="text-2xl" />
                    </button>
                )}
            </header>
            <aside
                className={`tracking-widest text-xs md:hidden flex flex-col rounded-lg gap-5 items-end bg-main-dark/90 right-7 fixed z-30 transform transition-transform duration-300 ease-in-out ${isNavbarDropdownOpen ? 'translate-y-[4.5rem]' : '-translate-y-52'} py-5 px-10 `}
            >
                <TheNavBar setIsNavbarDropdownOpen={setIsNavbarDropdownOpen} />
                {/* Superuser Admin Dashboard Button for Mobile */}
                {isAuthenticated && user?.is_superuser && (
                    <Link
                        href="/admin/dashboard"
                        className="bg-csg-blue-400 hover:bg-csg-blue-500 text-white px-4 py-2 rounded-lg font-bold tracking-widest transition-colors duration-200"
                        onClick={() => setIsNavbarDropdownOpen(false)}
                    >
                        ADMIN
                    </Link>
                )}
            </aside>
        </>
    )
}

export default TheHeader
