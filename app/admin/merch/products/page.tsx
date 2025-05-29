'use client'

import { useState, useEffect } from 'react'
import { useMerchStore, useCreateUpdateDeleteMerchStore } from '@/store/merch'
import { useRouter } from 'next/navigation'

export default function ProductsPage() {
    const { fetchAll, items } = useMerchStore()
    const { remove: deleteMerch } = useCreateUpdateDeleteMerchStore()
    const [searchQuery, setSearchQuery] = useState('')
    const [isDeleting, setIsDeleting] = useState<number | null>(null)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(
        null
    )
    const router = useRouter()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (fetchAll) {
                    await fetchAll()
                }
            } catch (error) {
                console.error('Error fetching products:', error)
            }
        }
        fetchProducts()
    }, [])

    const handleDelete = async (productId: number) => {
        if (!deleteMerch) return

        try {
            setIsDeleting(productId)
            await deleteMerch(productId)
            // Refresh the list after deletion
            if (fetchAll) {
                await fetchAll()
            }
        } catch (error) {
            console.error('Error deleting product:', error)
        } finally {
            setIsDeleting(null)
            setShowDeleteConfirm(null)
        }
    }

    // Filter products based on search query
    const filteredProducts = items.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

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
                            <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
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
                            <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
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
            <div className="space-y-3 overflow-y-auto relative">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="flex items-center p-4 bg-[#171A33] border-4 border-[#242460] rounded-lg"
                    >
                        <div className="h-16 w-16 bg-gray-200 rounded-md flex items-center justify-center mr-4">
                            <img
                                src={
                                    product.image ||
                                    '/placeholder.svg?height=64&width=64'
                                }
                                alt="Product thumbnail"
                                className="h-full w-full object-cover rounded-md"
                            />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-white font-medium">
                                {product.name}
                            </h3>
                            <p className="text-gray-400 text-xs">
                                {product.merch_type?.name || 'No category'}
                            </p>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={() =>
                                    router.push(
                                        `/admin/merch/products/edit/${product.id}`
                                    )
                                }
                                className="text-white hover:text-blue-400 transition-colors"
                            >
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
                            <div className="">
                                <button
                                    onClick={() =>
                                        setShowDeleteConfirm(product.id)
                                    }
                                    disabled={isDeleting === product.id}
                                    className={`text-white hover:text-red-400 transition-colors ${
                                        isDeleting === product.id
                                            ? 'opacity-50 cursor-not-allowed'
                                            : ''
                                    }`}
                                >
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

                                {/* Delete Confirmation Dialog */}
                                {showDeleteConfirm === product.id && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                        <div className="p-4">
                                            <p className="text-gray-800 mb-4">
                                                Are you sure you want to delete
                                                this product?
                                            </p>
                                            <div className="flex justify-end space-x-2">
                                                <button
                                                    onClick={() =>
                                                        setShowDeleteConfirm(
                                                            null
                                                        )
                                                    }
                                                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(product.id)
                                                    }
                                                    className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
