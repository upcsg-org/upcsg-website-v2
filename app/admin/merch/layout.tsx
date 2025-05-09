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
        {/* Main Content - full height */}
        <div className="flex-1 bg-[#171A33] rounded-md p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
