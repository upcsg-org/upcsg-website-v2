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
    const [isOpen, setIsOpen] = useState(true)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            setIsMobile(width < 640)

            if (width < 1024) {
                setIsOpen(false)
            } else {
                setIsOpen(true)
            }
        }

        handleResize()
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

    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="flex min-h-screen bg-main-dark">
            {/* Overlay */}
            {isMobile && isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 h-full bg-secondary-dark z-30 transition-all duration-300
                    ${isMobile ? 'w-64' : isOpen ? 'w-64' : 'w-20'}
                    ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'}`}
            >
                <div className="flex h-full flex-col">
                    {/* Desktop Toggle Button - Only show on larger screens */}
                    {!isMobile && (
                        <button
                            onClick={toggleSidebar}
                            className="absolute -right-3 top-4 z-50 rounded-full bg-white p-1.5 text-gray-800 shadow-lg
                                hover:bg-gray-100 transition-colors duration-200"
                            aria-label="Toggle Sidebar"
                        >
                            {isOpen ? <LuX size={16} /> : <LuMenu size={16} />}
                        </button>
                    )}

                    {/* Close Button - Only show on mobile/tablet when sidebar is open */}
                    {isMobile && isOpen && (
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
                                    ${index === 2 ? 'bg-green-500 text-white' : ''}
                                    ${!isOpen && !isMobile ? 'justify-center' : ''}`}
                            >
                                <span
                                    className={`${!isOpen && !isMobile ? 'mr-0' : 'mr-4'}`}
                                >
                                    {item.icon}
                                </span>
                                <span
                                    className={`whitespace-nowrap transition-all duration-200
                                        ${isOpen || isMobile ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}
                                >
                                    {item.title}
                                </span>
                                {/* Tooltip for collapsed state */}
                                {!isOpen && !isMobile && (
                                    <div className="absolute left-20 z-50 hidden rounded-md bg-gray-800 px-2 py-1 text-sm text-white group-hover:block">
                                        {item.title}
                                    </div>
                                )}
                            </a>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Main Content Area */}
            <main
                className={`flex-1 transition-all duration-300
                    ${isOpen && !isMobile ? 'ml-64' : isMobile ? 'ml-0' : 'ml-20'}`}
            >
                <div className="p-4 lg:p-8">
                    {/* Mobile/Tablet Header with Menu Button */}
                    <header className="flex items-center mb-8">
                        {/* Mobile Menu Button - Only show on mobile/tablet */}
                        {isMobile && (
                            <button
                                onClick={toggleSidebar}
                                className="mr-4 rounded-lg p-2 text-white hover:bg-[#2b2f4c] transition-colors duration-200"
                                aria-label="Open Menu"
                            >
                                <LuMenu size={24} />
                            </button>
                        )}

                        <h1
                            className={`text-xl md:text-2xl lg:text-3xl font-semibold text-white
                            ${isMobile ? '' : 'ml-4'}`}
                        >
                            Admin Dashboard
                        </h1>
                    </header>
                </div>
            </main>
        </div>
    )
}

export default AdminDashboard
