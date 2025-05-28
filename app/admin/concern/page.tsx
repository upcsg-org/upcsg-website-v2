'use client'

import React, { useEffect, useState } from 'react'
import {
    useCreateUpdateDeleteConcernStore,
    useListConcernStore,
} from '@/store/help'
import { BiEnvelope, BiTrash, BiCheckCircle } from 'react-icons/bi'
import { FiMenu } from 'react-icons/fi'
import SearchBar from '@/components/admin/SearchBar'
import { Concern } from '@/interface/help'

const AdminConcernPage = () => {
    const { fetchAll, items } = useListConcernStore()
    const { update, remove } = useCreateUpdateDeleteConcernStore()
    const [filteredItems, setFilteredItems] = useState(items || [])
    const [searchText, setSearchText] = useState('')
    const [isDeleting, setIsDeleting] = useState(false)
    const [activeMenu, setActiveMenu] = useState<string | null>(null)

    useEffect(() => {
        if (fetchAll) {
            fetchAll()
        }
    }, [])

    useEffect(() => {
        setFilteredItems(items || [])
    }, [items])

    const handleSearch = (searchText: string) => {
        const filtered = items?.filter(
            (item) =>
                item.content.toLowerCase().includes(searchText.toLowerCase()) ||
                (item.name &&
                    item.name
                        .toLowerCase()
                        .includes(searchText.toLowerCase())) ||
                (item.email &&
                    item.email.toLowerCase().includes(searchText.toLowerCase()))
        )
        setFilteredItems(filtered || [])
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
    }

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'No date'
        return new Date(dateString).toLocaleDateString()
    }

    const handleDelete = async (id?: string) => {
        if (!id || !remove) return

        try {
            setIsDeleting(true)
            await remove(id)
            if (fetchAll) {
                await fetchAll()
            }
        } catch (error) {
            console.error('Error deleting concern:', error)
        } finally {
            setIsDeleting(false)
        }
    }

    const handleUpdateStatus = async (
        id?: string,
        item?: Concern,
        status: 'pending' | 'resolved' | 'closed' = 'pending'
    ) => {
        if (!id || !update || !item) return

        try {
            await update(id, {
                status,
                content: item.content,
                email: item.email,
                name: item.name,
            } as Partial<Concern>)

            if (fetchAll) {
                await fetchAll()
            }
            setActiveMenu(null)
        } catch (error) {
            console.error('Error updating concern:', error)
        }
    }

    const toggleMenu = (id: string) => {
        if (activeMenu === id) {
            setActiveMenu(null)
        } else {
            setActiveMenu(id)
        }
    }

    const getStatusBadge = (status?: string) => {
        if (!status) return null

        const statusColors = {
            pending: 'bg-yellow-600',
            resolved: 'bg-green-600',
            closed: 'bg-gray-600',
        }

        const statusColor =
            statusColors[status as keyof typeof statusColors] || 'bg-gray-600'

        return (
            <span
                className={`px-2 py-1 text-xs ${statusColor} text-white rounded-full`}
            >
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        )
    }

    return (
        <div className="relative px-4 md:px-20 py-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">User Concerns</h1>
            </div>

            <div className="flex-grow mb-8">
                <SearchBar
                    searchText={searchText}
                    onSearch={handleSearch}
                    onInputChange={handleInputChange}
                />
            </div>

            <div className="mt-4 space-y-5">
                {filteredItems && filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-gray-800 rounded-lg shadow-lg p-6 relative"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="text-lg font-bold">
                                        {item.name || 'Anonymous'}
                                    </h3>
                                    <p className="text-sm text-gray-400">
                                        {formatDate(item.created_at)}
                                    </p>
                                </div>
                                <div className="flex items-center text-gray-400">
                                    <BiEnvelope className="mr-2" />
                                    <span className="text-sm">
                                        {item.email || 'No email provided'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <div>{getStatusBadge(item.status)}</div>
                                <div className="flex space-x-2">
                                    <div className="relative">
                                        <button
                                            onClick={() =>
                                                toggleMenu(item.id || '')
                                            }
                                            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                            title="Change Status"
                                        >
                                            <FiMenu size={20} />
                                        </button>

                                        {activeMenu === item.id && (
                                            <div className="absolute right-0 mt-1 w-40 bg-gray-700 rounded-md shadow-lg overflow-hidden z-10">
                                                <div className="py-1">
                                                    <button
                                                        className="w-full px-4 py-2 text-sm text-left text-white hover:bg-gray-600 flex items-center"
                                                        onClick={() =>
                                                            handleUpdateStatus(
                                                                item.id,
                                                                item,
                                                                'pending'
                                                            )
                                                        }
                                                    >
                                                        <div className="h-2 w-2 rounded-full bg-yellow-600 mr-2"></div>
                                                        Pending
                                                    </button>
                                                    <button
                                                        className="w-full px-4 py-2 text-sm text-left text-white hover:bg-gray-600 flex items-center"
                                                        onClick={() =>
                                                            handleUpdateStatus(
                                                                item.id,
                                                                item,
                                                                'resolved'
                                                            )
                                                        }
                                                    >
                                                        <div className="h-2 w-2 rounded-full bg-green-600 mr-2"></div>
                                                        Resolved
                                                    </button>
                                                    <button
                                                        className="w-full px-4 py-2 text-sm text-left text-white hover:bg-gray-600 flex items-center"
                                                        onClick={() =>
                                                            handleUpdateStatus(
                                                                item.id,
                                                                item,
                                                                'closed'
                                                            )
                                                        }
                                                    >
                                                        <div className="h-2 w-2 rounded-full bg-gray-600 mr-2"></div>
                                                        Closed
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                        disabled={isDeleting}
                                    >
                                        <BiTrash size={20} />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-2 p-4 bg-gray-700 rounded">
                                <p className="text-gray-200 whitespace-pre-wrap">
                                    {item.content}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                        <p className="text-gray-400">No concerns found</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminConcernPage
