"use client"

import type React from "react"
import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
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
  LuChevronDown,
  LuChevronUp,
} from "react-icons/lu"
import { useAuthStore } from "@/store/auth"

interface SubMenuItem {
  title: string
  path: string
}

interface MenuItem {
  title: string
  icon: React.ReactNode
  path: string
  subItems?: SubMenuItem[]
}

const menuItems: MenuItem[] = [
  {
    title: "DASHBOARD",
    icon: <LuLayoutDashboard size={20} />,
    path: "/admin/dashboard",
  },
  {
    title: "MERCH",
    icon: <LuShoppingCart size={20} />,
    path: "/admin/merch",
    subItems: [
      {
        title: "Products",
        path: "/admin/merch/products",
      },
      {
        title: "Orders",
        path: "/admin/merch/orders",
      },
    ],
  },
  {
    title: "ANNOUNCEMENTS",
    icon: <LuBell size={20} />,
    path: "/admin/announcement",
  },
  {
    title: "EVENTS",
    icon: <LuCalendar size={20} />,
    path: "/admin/event",
  },
  {
    title: "SCHOLARSHIPS",
    icon: <LuGraduationCap size={20} />,
    path: "/admin/scholarship",
  },
  {
    title: "INTERNSHIPS",
    icon: <LuBriefcase size={20} />,
    path: "/admin/internship",
  },
  {
    title: "OFFICERS",
    icon: <LuUsers size={20} />,
    path: "/admin/officer",
  },
  {
    title: "CONCERNS",
    icon: <LuMessageCircle size={20} />,
    path: "/admin/concern",
  },
  {
    title: "SETTINGS",
    icon: <LuSettings size={20} />,
    path: "/admin/settings",
  },
  {
    title: "LOGOUT",
    icon: <LuLogOut size={20} />,
    path: "#",
  },
]

const AdminSidePanel: React.FC = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const { logout } = useAuthStore()

  const isExcludedRoute = pathname.startsWith("/login")

  const toggleSidebar = () => setIsOpen(!isOpen)

  const toggleExpandItem = (title: string) => {
    setExpandedItem(expandedItem === title ? null : title)
  }

  const isItemActive = (item: MenuItem) => {
    if (pathname === item.path) return true
    if (item.subItems && item.subItems.some((subItem) => pathname === subItem.path)) return true
    return false
  }

  const isSubItemActive = (path: string) => {
    return pathname === path
  }

  const handleMenuItemClick = (item: MenuItem, e: React.MouseEvent) => {
    if (item.title === "LOGOUT") {
      e.preventDefault()
      logout()
      return
    }

    if (item.subItems) {
      e.preventDefault()
      toggleExpandItem(item.title)
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
            ${isOpen ? "left-[250px]" : "left-[-4px]"}`}
          aria-label="Toggle Menu"
        >
          {isOpen ? <LuArrowLeft size={20} /> : <LuArrowRight size={20} />}
        </button>

        {/* Overlay */}
        {isOpen && <button className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20" onClick={toggleSidebar} />}

        {/* Sidebar */}
        <aside
          className={`fixed left-0 top-20 h-full bg-secondary-dark z-30 transition-all duration-300 overflow-y-auto
            ${isOpen ? "w-64" : "w-0"}`}
        >
          <div className="flex h-full flex-col">
            {/* Navigation Items */}
            <nav className="mt-16 flex flex-col space-y-1 px-3">
              {menuItems.map((item, index) =>
                item.title === "LOGOUT" ? (
                  <button
                    key={item.title + index}
                    onClick={() => logout()}
                    className="group flex items-center rounded-lg px-4 py-3 text-gray-300 
                      font-vietnam font-medium text-sm transition-all duration-200
                      hover:bg-[#2b2f4c] hover:text-white text-left w-full"
                  >
                    <span className="mr-4">{item.icon}</span>
                    <span className="whitespace-nowrap">{item.title}</span>
                  </button>
                ) : (
                  <div key={item.title + index}>
                    <Link
                      href={item.subItems ? "#" : item.path}
                      onClick={(e) => handleMenuItemClick(item, e)}
                      className={`group flex items-center justify-between rounded-lg px-4 py-3 
                        font-vietnam font-medium text-sm transition-all duration-200
                        ${isItemActive(item) ? "bg-[#2b2f4c] text-white" : "text-gray-300 hover:bg-[#2b2f4c] hover:text-white"}`}
                    >
                      <div className="flex items-center">
                        <span className="mr-4">{item.icon}</span>
                        <span className="whitespace-nowrap">{item.title}</span>
                      </div>
                      {item.subItems && (
                        <span>
                          {expandedItem === item.title ? <LuChevronUp size={16} /> : <LuChevronDown size={16} />}
                        </span>
                      )}
                    </Link>

                    {/* Sub Items */}
                    {item.subItems && expandedItem === item.title && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.subItems.map((subItem, subIndex) => (
                          <Link
                            key={subItem.title + subIndex}
                            href={subItem.path}
                            onClick={() => setIsOpen(false)}
                            className={`block rounded-lg px-4 py-2 text-sm font-vietnam font-medium transition-all duration-200
                              ${
                                isSubItemActive(subItem.path)
                                  ? "bg-[#2b2f4c] text-white"
                                  : "text-gray-300 hover:bg-[#2b2f4c] hover:text-white"
                              }`}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ),
              )}
            </nav>
          </div>
        </aside>
      </>
    )
  )
}

export default AdminSidePanel
