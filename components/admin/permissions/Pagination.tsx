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
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`mx-1 px-3 py-1 border rounded ${
            currentPage === i
              ? 'bg-blue-500 text-white'
              : 'bg-white border-gray-300 text-blue-500 hover:bg-blue-100'
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`mx-1 px-3 py-1 border rounded ${
          currentPage === 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white border-gray-300 text-blue-500 hover:bg-blue-100'
        }`}
      >
        Previous
      </button>
      {renderPages()}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`mx-1 px-3 py-1 border rounded ${
          currentPage === totalPages
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white border-gray-300 text-blue-500 hover:bg-blue-100'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;