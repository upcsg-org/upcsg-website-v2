<<<<<<< Updated upstream
import React from 'react'

const AdminPermissions = () => {
    return <div>AdminPermissions</div>
}

export default AdminPermissions
=======
﻿'use client';

import React, { useState } from 'react';
import Header from './Header';
import Table from './TableSection';
import Page from './Pagination';

const AdminPermissions = () => {
    const [currentPage, setCurrentPage] = useState(1); // Hold the current page state

    return (
        <div className="p-6 text-white mx-auto w-4/5 bg-[#0a0e22]">
            {/* Header Section */}
            <Header />

            {/* Table Section */}
            <Table currentPage={currentPage} />

            {/* Pagination */}
            <Page currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    );
};

export default AdminPermissions;
>>>>>>> Stashed changes
