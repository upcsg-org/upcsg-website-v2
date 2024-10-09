'use client'

import AdminSidePanel from '@/components/admin/side-panel/AdminSidePanel'
import React from 'react'

const Dashboard: React.FC = () => {
    return (
        <div className="min-h-screen bg-main-dark">
            <AdminSidePanel />
            <main className="pl-16 w-full">
                <div className="p-4 lg:p-8">
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white">
                        Admin Dashboard
                    </h1>
                </div>
            </main>
        </div>
    )
}

export default Dashboard
