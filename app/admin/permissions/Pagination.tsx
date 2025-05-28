import React from 'react'
import Pagination from '@/components/admin/permissions/Pagination'

interface PageProps {
    currentPage: number
    setCurrentPage: (page: number) => void
    totalPages: number
}

const Page = ({ currentPage, setCurrentPage, totalPages }: PageProps) => {
    // Function to handle page clicks
    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber) // Update the current page state
    }

    // Don't render if there are no pages
    if (totalPages <= 1) {
        return null
    }

    return (
        <div className="mt-6 space-x-2 flex justify-end">
            <Pagination
                totalPages={totalPages}
                onPageChange={handlePageClick}
            />

            {/* {[1, 2, 3, 4].map((pageNumber) => (
                <span
                    key={pageNumber}
                    onClick={() => handlePageClick(pageNumber)}
                    className={`px-4 py-2 rounded-lg cursor-pointer ${currentPage === pageNumber ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-white'
                        }`}
                >
                    {pageNumber}
                </span>
            ))} */}
        </div>
    )
}

export default Page
