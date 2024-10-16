import React, { useState } from 'react';

const Pagination = ({ totalPages, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageClick = (page) => {
        setCurrentPage(page);
        onPageChange(page);
    };

    const renderPages = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <span
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={`px-4 py-2 rounded-lg cursor-pointer ${currentPage === i
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                        }`}
                >
                    {i}
                </span>
            );
        }
        return pages;
    };

    return (
        <div className="mt-6 space-x-2 flex justify-end">
            <button
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg ${currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-700 text-white hover:bg-gray-600 cursor-pointer'
                    }`}
            >
                Previous
            </button>
            {renderPages()}
            <button
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg ${currentPage === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-700 text-white hover:bg-gray-600 cursor-pointer'
                    }`}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
