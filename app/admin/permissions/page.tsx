'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useManageUserStore } from '@/store/user'
import Header from './header'
import Table from './TableSection'
import Page from './Pagination'

const ITEMS_PER_PAGE = 10

const AdminUserManagement = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')

    const {
        items: allUsers,
        loading,
        error,
        fetchAll,
        update,
        remove,
    } = useManageUserStore()

    // Fetch all users on component mount
    useEffect(() => {
        fetchAll?.()
    }, [fetchAll])

    // Filter users based on search query
    const filteredUsers = useMemo(() => {
        if (!searchQuery.trim()) {
            return allUsers
        }

        const query = searchQuery.toLowerCase()
        return allUsers.filter(
            (user) =>
                user.first_name.toLowerCase().includes(query) ||
                user.last_name.toLowerCase().includes(query) ||
                user.username.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query)
        )
    }, [allUsers, searchQuery])

    // Calculate pagination
    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const currentUsers = filteredUsers.slice(startIndex, endIndex)

    // Reset to first page when search changes
    useEffect(() => {
        setCurrentPage(1)
    }, [searchQuery])

    const handleToggleSuperuser = async (
        userId: string | number,
        currentStatus: boolean,
        username: string
    ) => {
        try {
            await update?.(userId, {
                is_superuser: !currentStatus,
                is_staff: !currentStatus,
                username: username,
            })
        } catch (error) {
            console.error('Failed to update user superuser status:', error)
        }
    }

    const handleRemoveUser = async (userId: string | number) => {
        try {
            await remove?.(userId)
        } catch (error) {
            console.error('Failed to remove user:', error)
        }
    }

    return (
        <div className="p-6 text-white mx-auto w-4/5 bg-[#0a0e22]">
            {/* Header Section */}
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            {/* Results summary */}
            {searchQuery && (
                <div className="mb-4 text-gray-400 text-sm">
                    Found {filteredUsers.length} user
                    {filteredUsers.length !== 1 ? 's' : ''}
                    {searchQuery && ` matching "${searchQuery}"`}
                </div>
            )}

            {/* Table Section */}
            <Table
                users={currentUsers}
                loading={loading}
                error={error}
                onToggleSuperuser={handleToggleSuperuser}
                onRemoveUser={handleRemoveUser}
            />

            {/* Pagination - only show if there are multiple pages */}
            {totalPages > 1 && (
                <Page
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                />
            )}
        </div>
    )
}

export default AdminUserManagement
