import React from 'react';
import Pagination from '@/components/admin/permissions/Pagination';

const Page = ({ currentPage, setCurrentPage }) => {
    // Function to handle page clicks
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber); // Update the current page state
    };

    return (
        <div className="mt-6 space-x-2 flex justify-end">
            <Pagination totalPages={10} onPageChange={handlePageClick} />

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
    );
};

export default Page;
