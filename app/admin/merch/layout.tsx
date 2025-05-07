"use client"
import { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

type AdminMerchProps = {
  children: ReactNode
}


export default function AdminMerch({ children }: AdminMerchProps) {
  const pathname = usePathname()
  return (
    <div className="h-full pb-8 flex flex-col">
      {/* Header */}
      <div className="px-10 pt-6">
        <h1 className="text-3xl font-bold text-white">MERCH</h1>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 mt-4 px-10 overflow-hidden">
        {/* Sidebar - full height */}
        <div className="w-[250px] bg-[#171A33] rounded-md overflow-hidden mr-6 flex flex-col">
          <div className="py-10 px-6"></div>
          <Link 
            href="/admin/merch/products" 
            className={`block py-3 px-6 font-medium text-lg ${
                pathname.includes("/admin/merch/products")
                  ? "bg-[#41A01E] text-white"
                  : "text-white hover:bg-[#2A2D4E]"
              }`}
          >
            Products
          </Link>
          <Link 
            href="/admin/merch/orders" 
            className={`block py-3 px-6 font-medium text-lg ${
                pathname.includes("/admin/merch/orders")
                  ? "bg-[#41A01E] text-white"
                  : "text-white hover:bg-[#2A2D4E]"
              }`}
          >
            Orders
          </Link>
          {/* Spacer to push links to top */}
          <div className="flex-1"></div>
        </div>

        {/* Main Content - full height */}
        <div className="flex-1 bg-[#171A33] rounded-md p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
