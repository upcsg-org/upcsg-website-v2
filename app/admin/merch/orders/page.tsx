'use client'
import { useManageOrderStore, Order } from '@/store/orders'
import { useEffect, useState } from 'react'
import {
    FiSearch,
    FiFilter,
    FiEdit3,
    FiTrash2,
    FiCheck,
    FiX,
    FiEye,
    FiCalendar,
    FiUser,
    FiDollarSign,
} from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

export default function OrdersPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [paymentMethodFilter, setPaymentMethodFilter] = useState('all')
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [editFormData, setEditFormData] = useState<Partial<Order>>({})

    const {
        fetchAll: fetchAllOrders,
        items: orders,
        update: updateOrder,
        remove: deleteOrder,
        loading,
        error,
    } = useManageOrderStore()

    useEffect(() => {
        const fetchItems = async () => {
            await fetchAllOrders!()
        }
        fetchItems()
    }, [])

    const handleUpdateOrder = async (
        id: number,
        updatedData: Partial<Order>
    ) => {
        try {
            await updateOrder!(id, updatedData)
            setIsEditModalOpen(false)
            setSelectedOrder(null)
        } catch (error) {
            console.error('Error updating order:', error)
        }
    }

    const handleDeleteOrder = async (id: number) => {
        try {
            await deleteOrder!(id)
            setIsDeleteModalOpen(false)
            setSelectedOrder(null)
        } catch (error) {
            console.error('Error deleting order:', error)
        }
    }

    const handleQuickStatusUpdate = async (order: Order, newStatus: string) => {
        await updateOrder!(order.id, { status: newStatus })
    }

    const openEditModal = (order: Order) => {
        setSelectedOrder(order)
        setEditFormData({
            payment_method: order.payment_method,
            status: order.status,
            total_price: order.total_price,
        })
        setIsEditModalOpen(true)
    }

    const openDeleteModal = (order: Order) => {
        setSelectedOrder(order)
        setIsDeleteModalOpen(true)
    }

    const filteredOrders = orders.filter((order: Order) => {
        const matchesSearch =
            order.buyer?.username
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            order.buyer?.email
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            order.id.toString().includes(searchQuery) ||
            order.payment_method
                .toLowerCase()
                .includes(searchQuery.toLowerCase())

        const matchesStatus =
            statusFilter === 'all' ||
            order.status.toLowerCase() === statusFilter.toLowerCase()
        const matchesPaymentMethod =
            paymentMethodFilter === 'all' ||
            order.payment_method.toLowerCase() ===
                paymentMethodFilter.toLowerCase()

        return matchesSearch && matchesStatus && matchesPaymentMethod
    })

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'paid':
                return 'bg-green-100 text-green-800 border-green-200'
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200'
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-200'
            case 'delivered':
                return 'bg-blue-100 text-blue-800 border-blue-200'
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const formatPrice = (price: number | string) => {
        const numPrice = typeof price === 'string' ? parseFloat(price) : price
        return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                Error loading orders: {error.message}
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">
                        Order Management
                    </h1>
                    <p className="text-gray-400 mt-1">
                        Manage customer orders and track payments
                    </p>
                </div>
                <div className="text-sm text-gray-400">
                    Total Orders: {filteredOrders.length}
                </div>
            </div>

            {/* Filters */}
            <div className="bg-[#1E1E2E] border border-[#242460] rounded-xl p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="relative flex-1">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search by customer, email, order ID, or payment method..."
                            className="w-full bg-[#31334C] text-white border border-[#424460] focus:border-blue-500 rounded-lg px-10 py-2.5 transition-colors"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <select
                            className="appearance-none bg-[#31334C] text-white border border-[#424460] focus:border-blue-500 rounded-lg px-4 py-2.5 pr-10 min-w-[140px] transition-colors"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                        <FiFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                    </div>

                    {/* Payment Method Filter */}
                    <div className="relative">
                        <select
                            className="appearance-none bg-[#31334C] text-white border border-[#424460] focus:border-blue-500 rounded-lg px-4 py-2.5 pr-10 min-w-[140px] transition-colors"
                            value={paymentMethodFilter}
                            onChange={(e) =>
                                setPaymentMethodFilter(e.target.value)
                            }
                        >
                            <option value="all">All Payment</option>
                            <option value="cash">Cash</option>
                            <option value="gcash">GCash</option>
                            <option value="bank">Bank Transfer</option>
                        </select>
                        <FiDollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                {filteredOrders.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-lg">
                            No orders found
                        </div>
                        <div className="text-gray-500 text-sm mt-2">
                            Try adjusting your search or filters
                        </div>
                    </div>
                ) : (
                    <AnimatePresence>
                        {filteredOrders.map((order: Order) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-[#1E1E2E] border border-[#242460] rounded-xl p-6 hover:border-[#3A3D5C] transition-all duration-200"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                                    {/* Order Info */}
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                                    <FiUser className="w-4 h-4" />
                                                    {order.buyer?.username ||
                                                        order.buyer?.email ||
                                                        'Unknown Customer'}
                                                </h3>
                                                <p className="text-gray-400 text-sm">
                                                    Order #{order.id}
                                                </p>
                                            </div>
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}
                                            >
                                                {order.status.toUpperCase()}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <FiDollarSign className="w-4 h-4" />
                                                <span>
                                                    ₱
                                                    {formatPrice(
                                                        order.total_price
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <FiCalendar className="w-4 h-4" />
                                                <span>
                                                    {formatDate(
                                                        order.date_created
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <span className="font-medium">
                                                    {order.payment_method}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="flex flex-col sm:flex-row gap-2 lg:flex-col xl:flex-row">
                                        {order.status.toLowerCase() ===
                                            'pending' && (
                                            <button
                                                onClick={() =>
                                                    handleQuickStatusUpdate(
                                                        order,
                                                        'PAID'
                                                    )
                                                }
                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm font-medium"
                                            >
                                                <FiCheck className="w-4 h-4" />
                                                Mark Paid
                                            </button>
                                        )}

                                        {order.status.toLowerCase() ===
                                            'paid' && (
                                            <button
                                                onClick={() =>
                                                    handleQuickStatusUpdate(
                                                        order,
                                                        'DELIVERED'
                                                    )
                                                }
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm font-medium"
                                            >
                                                <FiCheck className="w-4 h-4" />
                                                Mark Delivered
                                            </button>
                                        )}

                                        <button
                                            onClick={() => openEditModal(order)}
                                            className="bg-[#31334C] hover:bg-[#3A3D5C] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm font-medium"
                                        >
                                            <FiEdit3 className="w-4 h-4" />
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                openDeleteModal(order)
                                            }
                                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm font-medium"
                                        >
                                            <FiTrash2 className="w-4 h-4" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>

            {/* Edit Modal */}
            <AnimatePresence>
                {isEditModalOpen && selectedOrder && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={() => setIsEditModalOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#1E1E2E] border border-[#242460] rounded-xl p-6 w-full max-w-md"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold text-white">
                                    Edit Order
                                </h3>
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <FiX className="w-5 h-5" />
                                </button>
                            </div>

                            <form
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    handleUpdateOrder(
                                        selectedOrder.id,
                                        editFormData
                                    )
                                }}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Status
                                    </label>
                                    <select
                                        className="w-full bg-[#31334C] text-white border border-[#424460] focus:border-blue-500 rounded-lg px-3 py-2"
                                        value={editFormData.status || ''}
                                        onChange={(e) =>
                                            setEditFormData({
                                                ...editFormData,
                                                status: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="paid">Paid</option>
                                        <option value="delivered">
                                            Delivered
                                        </option>
                                        <option value="cancelled">
                                            Cancelled
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Payment Method
                                    </label>
                                    <select
                                        className="w-full bg-[#31334C] text-white border border-[#424460] focus:border-blue-500 rounded-lg px-3 py-2"
                                        value={
                                            editFormData.payment_method || ''
                                        }
                                        onChange={(e) =>
                                            setEditFormData({
                                                ...editFormData,
                                                payment_method: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="cash">Cash</option>
                                        <option value="gcash">GCash</option>
                                        <option value="bank">
                                            Bank Transfer
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Total Price (₱)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="w-full bg-[#31334C] text-white border border-[#424460] focus:border-blue-500 rounded-lg px-3 py-2"
                                        value={editFormData.total_price || ''}
                                        onChange={(e) =>
                                            setEditFormData({
                                                ...editFormData,
                                                total_price: parseFloat(
                                                    e.target.value
                                                ),
                                            })
                                        }
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIsEditModalOpen(false)
                                        }
                                        className="flex-1 bg-[#31334C] hover:bg-[#3A3D5C] text-white py-2 px-4 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                                    >
                                        Update Order
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {isDeleteModalOpen && selectedOrder && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={() => setIsDeleteModalOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#1E1E2E] border border-[#242460] rounded-xl p-6 w-full max-w-md"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold text-white">
                                    Delete Order
                                </h3>
                                <button
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <FiX className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="mb-6">
                                <p className="text-gray-300 mb-2">
                                    Are you sure you want to delete this order?
                                </p>
                                <div className="bg-[#31334C] rounded-lg p-3 space-y-1">
                                    <p className="text-white font-medium">
                                        Order #{selectedOrder.id}
                                    </p>
                                    <p className="text-gray-400 text-sm">
                                        Customer:{' '}
                                        {selectedOrder.buyer?.username ||
                                            selectedOrder.buyer?.email}
                                    </p>
                                    <p className="text-gray-400 text-sm">
                                        Total: ₱
                                        {formatPrice(selectedOrder.total_price)}
                                    </p>
                                </div>
                                <p className="text-red-400 text-sm mt-3">
                                    This action cannot be undone.
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="flex-1 bg-[#31334C] hover:bg-[#3A3D5C] text-white py-2 px-4 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() =>
                                        handleDeleteOrder(selectedOrder.id)
                                    }
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
                                >
                                    Delete Order
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
