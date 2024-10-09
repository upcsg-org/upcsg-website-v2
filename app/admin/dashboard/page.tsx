'use client'

import React, { useState, useEffect } from 'react'
import {
    LuMenu,
    LuX,
    LuLayoutDashboard,
    LuBell,
    LuCalendar,
    LuGraduationCap,
    LuBriefcase,
    LuUsers,
    LuSettings,
} from 'react-icons/lu'

const AdminDashboard = () => {
    const [isOpen, setIsOpen] = useState(false) // Sidebar starts as closed

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            // You can check window width and perform actions if necessary,
            // but do not change `isOpen` directly based on width.
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const menuItems = [
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

    const toggleSidebar = () => setIsOpen(!isOpen)

    return (
        <div className="min-h-screen bg-main-dark">
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-15 h-full bg-secondary-dark z-30 transition-all duration-300 overflow-y-auto
                    ${isOpen ? 'w-64' : 'w-0'}`}
            >
                <div className="flex h-full flex-col">
                    {/* Close Button */}
                    {isOpen && (
                        <button
                            onClick={toggleSidebar}
                            className="absolute right-4 top-4 z-50 rounded-full bg-white p-1.5 text-gray-800 shadow-lg
                                hover:bg-gray-100 transition-colors duration-200"
                            aria-label="Close Sidebar"
                        >
                            <LuX size={16} />
                        </button>
                    )}

                    {/* Navigation Items */}
                    <nav className="mt-16 flex flex-col space-y-1 px-3">
                        {menuItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.path}
                                className={`group flex items-center rounded-lg px-4 py-3 text-gray-300 
                                    font-vietnam font-medium text-sm transition-all duration-200
                                    hover:bg-[#2b2f4c] hover:text-white
                                    ${index === 2 ? 'bg-green-500 text-white' : ''}`}
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

            {/* Main Content Area */}
            <main className="w-full">
                <div className="p-4 lg:p-8">
                    {/* Header with Menu Button */}
                    <header className="flex items-center mb-8">
                        <button
                            onClick={toggleSidebar}
                            className="mr-4 rounded-lg p-2 text-white hover:bg-[#2b2f4c] transition-colors duration-200"
                            aria-label="Toggle Menu"
                        >
                            <LuMenu size={24} />
                        </button>
                        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white">
                            Admin Dashboard
                        </h1>
                    </header>
                    {/* Add your main content here */}
                </div>
            </main>
        </div>
    )
}

export default AdminDashboard
