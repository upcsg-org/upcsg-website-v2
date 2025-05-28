import React from 'react'
import Link from 'next/link'
import TheButton from './TheButton'
import UserAvatar from './UserAvatar'
import { useAuthStore } from '@/store/auth'
import { HiOutlineShoppingBag } from 'react-icons/hi2'

interface PropsInterface {
    setIsNavbarDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const TheNavBar = (props: PropsInterface) => {
    const { setIsNavbarDropdownOpen } = props
    const { isAuthenticated, user } = useAuthStore()
    return (
        <>
            <Link
                href="/merch"
                className="hover:-translate-y-1 duration-200 flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-blue-500/30 transition-all"
                onClick={() => setIsNavbarDropdownOpen(false)}
            >
                <HiOutlineShoppingBag className="text-lg text-blue-300" />
                <span className="text-blue-100 font-semibold">Merch Store</span>
            </Link>
            {/* <Link
                href="/educ-and-dev"
                className="hover:-translate-y-1 duration-200"
                onClick={() => setIsNavbarDropdownOpen(false)}
            >
                Learn
            </Link> */}
            {isAuthenticated && user ? (
                <Link
                    href="/profile"
                    className="hover:-translate-y-1 duration-200 flex items-center"
                    onClick={() => setIsNavbarDropdownOpen(false)}
                >
                    <UserAvatar user={user} size="sm" />
                </Link>
            ) : (
                <TheButton
                    link="/login"
                    onClick={() => setIsNavbarDropdownOpen(false)}
                >
                    Login
                </TheButton>
            )}
        </>
    )
}

export default TheNavBar
