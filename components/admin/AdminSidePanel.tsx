'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
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
} from 'react-icons/lu'

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
        title: 'ANNOUNCEMENTS',
        icon: <LuBell size={20} />,
        path: '/admin/announcements',
    },
    {
        title: 'EVENTS',
        icon: <LuCalendar size={20} />,
        path: '/admin/events',
    },
    {
        title: 'SCHOLARSHIPS',
        icon: <LuGraduationCap size={20} />,
        path: '/admin/scholarships',
    },
    {
        title: 'INTERNSHIPS',
        icon: <LuBriefcase size={20} />,
        path: '/admin/internships',
    },
    {
        title: 'OFFICERS',
        icon: <LuUsers size={20} />,
        path: '/admin/officers',
    },
    {
        title: 'SETTINGS',
        icon: <LuSettings size={20} />,
        path: '/admin/settings',
    },
]

const AdminSidePanel: React.FC = () => {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    const isExcludedRoute = pathname.startsWith('/admin/login')

    const toggleSidebar = () => setIsOpen(!isOpen)

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
                            {menuItems.map((item, index) => (
                                <a
                                    key={item.title + index}
                                    href={item.path}
                                    className={`group flex items-center rounded-lg px-4 py-3 text-gray-300 
                                    font-vietnam font-medium text-sm transition-all duration-200
                                    hover:bg-[#2b2f4c] hover:text-white`}
                                >
                                    <span className="mr-4">{item.icon}</span>
                                    <span className="whitespace-nowrap">
                                        {item.title}
                                    </span>
                                </a>
                            ))}
                        </nav>
                    </div>
                </aside>
            </>
        )
    )
}

export default AdminSidePanel