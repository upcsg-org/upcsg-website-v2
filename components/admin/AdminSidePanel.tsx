'use client'

import React, { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
    LuArrowLeft,
    LuLayoutDashboard,
    LuBell,
    LuCalendar,
    LuGraduationCap,
    LuBriefcase,
    LuUsers,
    LuSettings,
    LuArrowRight,
    LuLogOut,
    LuShoppingCart,
    LuMessageCircle,
} from 'react-icons/lu'
import { useAuthStore } from '@/store/auth'

interface MenuItem {
    title: string
    icon: React.ReactNode
    path: string
}

const menuItems: MenuItem[] = [
    {
        title: 'DASHBOARD',
        icon: <LuLayoutDashboard size={20} />,
        path: '/admin/dashboard',
    },
    {
        title: 'MERCH',
        icon: <LuShoppingCart size={20} />,
        path: '/admin/merch/products',
    },
    {
        title: 'ANNOUNCEMENTS',
        icon: <LuBell size={20} />,
        path: '/admin/announcement',
    },
    {
        title: 'EVENTS',
        icon: <LuCalendar size={20} />,
        path: '/admin/event',
    },
    {
        title: 'SCHOLARSHIPS',
        icon: <LuGraduationCap size={20} />,
        path: '/admin/scholarship',
    },
    {
        title: 'INTERNSHIPS',
        icon: <LuBriefcase size={20} />,
        path: '/admin/internship',
    },
    {
        title: 'OFFICERS',
        icon: <LuUsers size={20} />,
        path: '/admin/officer',
    },
    {
        title: 'CONCERNS',
        icon: <LuMessageCircle size={20} />,
        path: '/admin/concern',
    },
    {
        title: 'SETTINGS',
        icon: <LuSettings size={20} />,
        path: '/admin/settings',
    },
    {
        title: 'LOGOUT',
        icon: <LuLogOut size={20} />,
        path: '#',
    },
]

const AdminSidePanel: React.FC = () => {
    const pathname = usePathname()
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const { logout } = useAuthStore()

    const isExcludedRoute = pathname.startsWith('/login')

    const toggleSidebar = () => setIsOpen(!isOpen)

    const handleMenuItemClick = (item: MenuItem, e: React.MouseEvent) => {
        if (item.title === 'LOGOUT') {
            e.preventDefault()
            logout()
            return
        }

        // Close sidebar after navigation
        setIsOpen(false)
    }

    return (
        !isExcludedRoute && (
            <>
                {/* Toggle Button*/}
                <button
                    onClick={toggleSidebar}
                    className={`fixed top-1/2 -translate-y-1/2 z-40 p-2 rounded-lg text-white transition-all duration-300 bg-secondary-dark
                    ${isOpen ? 'left-[250px]' : 'left-[-4px]'}`}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? (
                        <LuArrowLeft size={20} />
                    ) : (
                        <LuArrowRight size={20} />
                    )}
                </button>

                {/* Overlay */}
                {isOpen && (
                    <button
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20"
                        onClick={toggleSidebar}
                    />
                )}

                {/* Sidebar */}
                <aside
                    className={`fixed left-0 top-20 h-full bg-secondary-dark z-30 transition-all duration-300 overflow-y-auto
                    ${isOpen ? 'w-64' : 'w-0'}`}
                >
                    <div className="flex h-full flex-col">
                        {/* Navigation Items */}
                        <nav className="mt-16 flex flex-col space-y-1 px-3">
                            {menuItems.map((item, index) =>
                                item.title === 'LOGOUT' ? (
                                    <button
                                        key={item.title + index}
                                        onClick={() => logout()}
                                        className="group flex items-center rounded-lg px-4 py-3 text-gray-300 
                                        font-vietnam font-medium text-sm transition-all duration-200
                                        hover:bg-[#2b2f4c] hover:text-white text-left w-full"
                                    >
                                        <span className="mr-4">
                                            {item.icon}
                                        </span>
                                        <span className="whitespace-nowrap">
                                            {item.title}
                                        </span>
                                    </button>
                                ) : (
                                    <Link
                                        key={item.title + index}
                                        href={item.path}
                                        onClick={(e) =>
                                            handleMenuItemClick(item, e)
                                        }
                                        className={`group flex items-center rounded-lg px-4 py-3 text-gray-300 
                                        font-vietnam font-medium text-sm transition-all duration-200
                                        hover:bg-[#2b2f4c] hover:text-white`}
                                    >
                                        <span className="mr-4">
                                            {item.icon}
                                        </span>
                                        <span className="whitespace-nowrap">
                                            {item.title}
                                        </span>
                                    </Link>
                                )
                            )}
                        </nav>
                    </div>
                </aside>
            </>
        )
    )
}

export default AdminSidePanel
