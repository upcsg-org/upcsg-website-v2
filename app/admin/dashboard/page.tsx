'use client'

import React, { useState } from 'react'
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

    return (
        <div className="flex min-h-screen bg-main-dark">
            {/* Sidebar */}
            <div
                className={`fixed left-0 h-full bg-secondary-dark transition-all duration-300 ease-in-out ${
                    isOpen ? 'w-64' : 'w-20'
                }`}
            >
                <div className="flex h-full flex-col">
                    {/* Toggle Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="absolute -right-3 top-4 z-50 rounded-full bg-white p-1.5 text-gray-800 shadow-lg"
                    >
                        {isOpen ? <LuX size={16} /> : <LuMenu size={16} />}
                    </button>

                    {/* Navigation Items */}
                    <nav className="mt-16 flex flex-col space-y-2 px-4">
                        {menuItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.path}
                                className={`flex items-center rounded-lg px-4 py-3 text-gray-300 font-vietnam font-bold text-lg transition-colors hover:bg-[#2b2f4c] hover:text-white ${
                                    index === 2 ? 'bg-green-500 text-white' : ''
                                }`}
                            >
                                <span className="mr-4">{item.icon}</span>
                                <span
                                    className={`whitespace-nowrap transition-opacity ${
                                        isOpen ? 'opacity-100' : 'opacity-0'
                                    }`}
                                >
                                    {item.title}
                                </span>
                            </a>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Main Content Area */}
            <div
                className={`flex-1 transition-all duration-300 ${
                    isOpen ? 'ml-64' : 'ml-20'
                }`}
            >
                <div className="p-8">
                    <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
                    {/* Add your main content here */}
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
