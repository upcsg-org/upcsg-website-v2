"use client"

import { useState } from "react"

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for products
  const products = [
    { id: 1, name: "NAME OF PRODUCT", category: "TOTE BAGS", price: "PHP" },
    { id: 2, name: "NAME OF PRODUCT", category: "TOTE BAGS", price: "PHP" },
    { id: 3, name: "NAME OF PRODUCT", category: "TOTE BAGS", price: "PHP" },
    { id: 4, name: "NAME OF PRODUCT", category: "TOTE BAGS", price: "PHP" },
    { id: 5, name: "NAME OF PRODUCT", category: "TOTE BAGS", price: "PHP" },
  ]

  return (
      <div className="">
        <div className="flex items-center justify-between pb-3 mb-6 border-b-2 border-[#242460]">
          <a
            href="/admin/merch/products/create"
            className="bg-[#30b8c4] hover:bg-[#2aa0aa] text-white px-10 py-2 rounded"
          >
            Add Product
          </a>

          <div className="flex gap-2">
            <div className="relative w-[180px]">
              <select className="w-full appearance-none bg-[#31334C] text-white border border-black focus:border-white rounded px-3 py-2 pr-8">
                <option value="product">Product</option>
                <option value="category">Category</option>
                <option value="price">Price</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="relative w-[180px]">
              <input
                type="search"
                placeholder="Search"
                className="w-full bg-[#31334C] text-white border border-black focus:border-white rounded px-3 py-2 pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="space-y-3 overflow-y-auto">
          {products.map((product) => (
            <div key={product.id} className="flex items-center p-4 bg-[#171A33] border-4 border-[#242460] rounded-lg">
              <div className="h-16 w-16 bg-gray-200 rounded-md flex items-center justify-center mr-4">
                <img
                  src="/placeholder.svg?height=64&width=64"
                  alt="Product thumbnail"
                  className="h-full w-full object-cover rounded-md"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium">{product.name}</h3>
                <p className="text-gray-400 text-xs">{product.category}</p>
                <p className="text-[#6479CB]">{product.price}</p>
              </div>
              <div className="flex space-x-4">
                <button className="text-white">
                  {/* Edit icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    <path d="m15 5 4 4" />
                  </svg>
                </button>
                <button className="text-white">
                  {/* Delete icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}
