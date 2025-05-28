'use client'
import {
    useManageOrderStore,
    useManageOrderItemStore,
    Order,
} from '@/store/orders'
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
    FiChevronDown,
    FiDownload,
    FiRefreshCw,
    FiPackage,
    FiClock,
    FiTrendingUp,
    FiShoppingBag,
} from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

type SortField = 'date_created' | 'total_price' | 'status' | 'id'
type SortDirection = 'asc' | 'desc'

export default function OrdersPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [paymentMethodFilter, setPaymentMethodFilter] = useState('all')
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
    const [editFormData, setEditFormData] = useState<Partial<Order>>({})
    const [sortField, setSortField] = useState<SortField>('date_created')
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
    const [showFilters, setShowFilters] = useState(false)
    const [loadingOrderItems, setLoadingOrderItems] = useState(false)

    const {
        fetchAll: fetchAllOrders,
        items: orders,
        update: updateOrder,
        remove: deleteOrder,
        loading,
        error,
    } = useManageOrderStore()

    const { fetchAll: fetchOrderItems, items: orderItems } =
        useManageOrderItemStore()

    useEffect(() => {
        const fetchData = async () => {
            await fetchAllOrders!()
        }
        fetchData()
    }, [])

    const handleUpdateOrder = async (
        id: number,
        updatedData: Partial<Order>
    ) => {
        try {
            if (selectedOrder) {
                // Debug: Check if buyer exists
                console.log('Selected order:', selectedOrder)
                console.log('Buyer object:', selectedOrder.buyer)

                // Always use buyer.id as the buyer_id
                const buyerId = selectedOrder.buyer?.id

                // Ensure we have a valid buyer_id
                if (!buyerId) {
                    console.error('No buyer found in selected order')
                    alert(
                        'Error: No buyer found for this order. This order may have corrupted data.'
                    )
                    return
                }

                console.log('Using buyer.id as buyer_id:', buyerId)

                // Always preserve critical fields that should not change during edits
                await updateOrder!(id, {
                    buyer_id: buyerId, // PRESERVE: Never change the original buyer
                    payment_method:
                        updatedData.payment_method ||
                        selectedOrder.payment_method,
                    proof_of_payment: selectedOrder.proof_of_payment, // PRESERVE: Keep original proof
                    total_price:
                        updatedData.total_price || selectedOrder.total_price,
                    status: updatedData.status || selectedOrder.status,
                    date_created: selectedOrder.date_created, // PRESERVE: Keep original creation date
                    date_paid: selectedOrder.date_paid,
                })
            }
            setIsEditModalOpen(false)
            setSelectedOrder(null)
        } catch (error) {
            console.error('Error updating order:', error)
            alert('Error updating order. Please check the console for details.')
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
        try {
            // Debug: Check if buyer exists
            console.log('Order for status update:', order)
            console.log('Buyer object:', order.buyer)

            // Always use buyer.id as the buyer_id
            const buyerId = order.buyer?.id

            // Ensure we have a valid buyer_id
            if (!buyerId) {
                console.error('No buyer found in order')
                alert(
                    'Error: No buyer found for this order. This order may have corrupted data.'
                )
                return
            }

            console.log('Using buyer.id as buyer_id:', buyerId)

            // Always preserve critical fields that should not change during status updates
            await updateOrder!(order.id, {
                buyer_id: buyerId, // PRESERVE: Never change the original buyer
                payment_method: order.payment_method, // PRESERVE: Keep original payment method
                proof_of_payment: order.proof_of_payment, // PRESERVE: Keep original proof
                total_price: order.total_price, // PRESERVE: Keep original total price
                status: newStatus, // ONLY UPDATE: Change status
                date_created: order.date_created, // PRESERVE: Keep original creation date
                date_paid: order.date_paid, // PRESERVE: Keep original payment date
            })
        } catch (error) {
            console.error('Error updating order status:', error)
            alert(
                'Error updating order status. Please check the console for details.'
            )
        }
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

    const openDetailsModal = async (order: Order) => {
        setSelectedOrder(order)
        setIsDetailsModalOpen(true)
        setLoadingOrderItems(true)

        try {
            // Fetch order items with order_id filter
            await fetchOrderItems!({ order_id: order.id })
        } catch (error) {
            console.error('Error fetching order items:', error)
        } finally {
            setLoadingOrderItems(false)
        }
    }

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortField(field)
            setSortDirection('desc')
        }
    }

    const sortedAndFilteredOrders = orders
        .filter((order: Order) => {
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
        .sort((a, b) => {
            let aValue: any, bValue: any

            switch (sortField) {
                case 'date_created':
                    aValue = new Date(a.date_created)
                    bValue = new Date(b.date_created)
                    break
                case 'total_price':
                    aValue = a.total_price
                    bValue = b.total_price
                    break
                case 'status':
                    aValue = a.status
                    bValue = b.status
                    break
                case 'id':
                    aValue = a.id
                    bValue = b.id
                    break
            }

            if (sortDirection === 'asc') {
                return aValue > bValue ? 1 : -1
            } else {
                return aValue < bValue ? 1 : -1
            }
        })

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'paid':
                return 'bg-green-500/20 text-green-300 border-green-500/30'
            case 'pending':
                return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
            case 'cancelled':
                return 'bg-red-500/20 text-red-300 border-red-500/30'
            case 'delivered':
                return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
            default:
                return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
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

    const getOrderStats = () => {
        const total = sortedAndFilteredOrders.length
        const pending = sortedAndFilteredOrders.filter(
            (o) => o.status.toLowerCase() === 'pending'
        ).length
        const paid = sortedAndFilteredOrders.filter(
            (o) => o.status.toLowerCase() === 'paid'
        ).length
        const delivered = sortedAndFilteredOrders.filter(
            (o) => o.status.toLowerCase() === 'delivered'
        ).length
        const totalRevenue = sortedAndFilteredOrders
            .filter((o) => o.status.toLowerCase() !== 'cancelled')
            .reduce(
                (sum, order) =>
                    sum +
                    (typeof order.total_price === 'string'
                        ? parseFloat(order.total_price)
                        : order.total_price),
                0
            )

        return { total, pending, paid, delivered, totalRevenue }
    }

    const stats = getOrderStats()

    const getOrderItems = (orderId: number) => {
        return orderItems.filter((item) => item.order?.id === orderId)
    }

    const refreshData = async () => {
        await fetchAllOrders!()
    }

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="h-8 bg-gray-600 rounded w-48 animate-pulse"></div>
                        <div className="h-4 bg-gray-700 rounded w-64 mt-2 animate-pulse"></div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-[#1E1E2E] border border-[#242460] rounded-xl p-4"
                        >
                            <div className="h-4 bg-gray-600 rounded w-16 animate-pulse"></div>
                            <div className="h-8 bg-gray-700 rounded w-20 mt-2 animate-pulse"></div>
                        </div>
                    ))}
                </div>
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-[#1E1E2E] border border-[#242460] rounded-xl p-6"
                        >
                            <div className="h-6 bg-gray-600 rounded w-32 animate-pulse mb-4"></div>
                            <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">
                        Order Management
                    </h1>
                    <p className="text-gray-400 mt-1">
                        Manage customer orders and track payments
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={refreshData}
                        className="bg-[#31334C] hover:bg-[#3A3D5C] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <FiRefreshCw className="w-4 h-4" />
                        Refresh
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                        <FiDownload className="w-4 h-4" />
                        Export
                    </button>
                </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-[#1E1E2E] border border-[#242460] rounded-xl p-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-500/20 p-3 rounded-lg">
                            <FiShoppingBag className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">
                                Total Orders
                            </p>
                            <p className="text-2xl font-bold text-white">
                                {stats.total}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-[#1E1E2E] border border-[#242460] rounded-xl p-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-yellow-500/20 p-3 rounded-lg">
                            <FiClock className="w-6 h-6 text-yellow-400" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Pending</p>
                            <p className="text-2xl font-bold text-white">
                                {stats.pending}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-[#1E1E2E] border border-[#242460] rounded-xl p-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-green-500/20 p-3 rounded-lg">
                            <FiCheck className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Paid</p>
                            <p className="text-2xl font-bold text-white">
                                {stats.paid}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-[#1E1E2E] border border-[#242460] rounded-xl p-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-500/20 p-3 rounded-lg">
                            <FiPackage className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Delivered</p>
                            <p className="text-2xl font-bold text-white">
                                {stats.delivered}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-[#1E1E2E] border border-[#242460] rounded-xl p-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-green-500/20 p-3 rounded-lg">
                            <FiTrendingUp className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Revenue</p>
                            <p className="text-2xl font-bold text-white">
                                ₱{formatPrice(stats.totalRevenue)}
                            </p>
                        </div>
                    </div>
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
                            className="w-full bg-[#31334C] text-white border border-[#424460] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-10 py-2.5 transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Filters Toggle for Mobile */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="lg:hidden bg-[#31334C] hover:bg-[#3A3D5C] text-white border border-[#424460] px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <FiFilter className="w-4 h-4" />
                        Filters
                        <FiChevronDown
                            className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {/* Status Filter */}
                    <div
                        className={`relative ${showFilters ? 'block' : 'hidden lg:block'}`}
                    >
                        <select
                            className="appearance-none bg-[#31334C] text-white border border-[#424460] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-4 py-2.5 pr-10 min-w-[140px] transition-all"
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
                    <div
                        className={`relative ${showFilters ? 'block' : 'hidden lg:block'}`}
                    >
                        <select
                            className="appearance-none bg-[#31334C] text-white border border-[#424460] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-4 py-2.5 pr-10 min-w-[140px] transition-all"
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

                    {/* Sort */}
                    <div
                        className={`relative ${showFilters ? 'block' : 'hidden lg:block'}`}
                    >
                        <select
                            className="appearance-none bg-[#31334C] text-white border border-[#424460] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-4 py-2.5 pr-10 min-w-[140px] transition-all"
                            value={`${sortField}-${sortDirection}`}
                            onChange={(e) => {
                                const [field, direction] = e.target.value.split(
                                    '-'
                                ) as [SortField, SortDirection]
                                setSortField(field)
                                setSortDirection(direction)
                            }}
                        >
                            <option value="date_created-desc">
                                Newest First
                            </option>
                            <option value="date_created-asc">
                                Oldest First
                            </option>
                            <option value="total_price-desc">
                                Highest Price
                            </option>
                            <option value="total_price-asc">
                                Lowest Price
                            </option>
                            <option value="status-asc">Status A-Z</option>
                            <option value="id-desc">Order ID Desc</option>
                        </select>
                        <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                {sortedAndFilteredOrders.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="bg-[#1E1E2E] border border-[#242460] rounded-xl p-8">
                            <FiShoppingBag className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                            <div className="text-gray-400 text-lg font-medium">
                                No orders found
                            </div>
                            <div className="text-gray-500 text-sm mt-2">
                                {searchQuery ||
                                statusFilter !== 'all' ||
                                paymentMethodFilter !== 'all'
                                    ? 'Try adjusting your search or filters'
                                    : 'Orders will appear here once customers place them'}
                            </div>
                        </div>
                    </div>
                ) : (
                    <AnimatePresence>
                        {sortedAndFilteredOrders.map((order: Order) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-[#1E1E2E] border border-[#242460] rounded-xl p-6 hover:border-[#3A3D5C] transition-all duration-200 hover:shadow-lg"
                            >
                                <div className="flex flex-col xl:flex-row xl:items-center gap-6">
                                    {/* Order Info */}
                                    <div className="flex-1 space-y-4">
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                            <div>
                                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                                    <FiUser className="w-5 h-5" />
                                                    {order.buyer?.username ||
                                                        order.buyer?.email ||
                                                        'Unknown Customer'}
                                                </h3>
                                                <p className="text-gray-400 text-sm mt-1">
                                                    Order #{order.id}
                                                </p>
                                            </div>
                                            <span
                                                className={`px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(order.status)} whitespace-nowrap`}
                                            >
                                                {order.status.toUpperCase()}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <FiDollarSign className="w-4 h-4 text-green-400" />
                                                <span className="font-medium text-green-400">
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
                                                <FiDollarSign className="w-4 h-4" />
                                                <span className="font-medium capitalize">
                                                    {order.payment_method}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="flex flex-col sm:flex-row xl:flex-col gap-2 xl:min-w-[200px]">
                                        <div className="flex gap-2 sm:flex-row xl:flex-col">
                                            {order.status.toLowerCase() ===
                                                'pending' && (
                                                <button
                                                    onClick={() =>
                                                        handleQuickStatusUpdate(
                                                            order,
                                                            'paid'
                                                        )
                                                    }
                                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm font-medium flex-1 justify-center"
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
                                                            'delivered'
                                                        )
                                                    }
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm font-medium flex-1 justify-center"
                                                >
                                                    <FiPackage className="w-4 h-4" />
                                                    Mark Delivered
                                                </button>
                                            )}
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() =>
                                                    openDetailsModal(order)
                                                }
                                                className="bg-[#31334C] hover:bg-[#3A3D5C] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm font-medium flex-1 justify-center"
                                            >
                                                <FiEye className="w-4 h-4" />
                                                View
                                            </button>

                                            <button
                                                onClick={() =>
                                                    openEditModal(order)
                                                }
                                                className="bg-[#31334C] hover:bg-[#3A3D5C] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm font-medium flex-1 justify-center"
                                            >
                                                <FiEdit3 className="w-4 h-4" />
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    openDeleteModal(order)
                                                }
                                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm font-medium flex-1 justify-center"
                                            >
                                                <FiTrash2 className="w-4 h-4" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>

            {/* Order Details Modal */}
            <AnimatePresence>
                {isDetailsModalOpen && selectedOrder && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={() => setIsDetailsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#1E1E2E] border border-[#242460] rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold text-white">
                                    Order Details
                                </h3>
                                <button
                                    onClick={() => setIsDetailsModalOpen(false)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <FiX className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Order Info */}
                                <div className="bg-[#31334C] rounded-lg p-4">
                                    <h4 className="text-lg font-medium text-white mb-3">
                                        Order Information
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-400">
                                                Order ID
                                            </p>
                                            <p className="text-white font-medium">
                                                #{selectedOrder.id}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400">
                                                Status
                                            </p>
                                            <span
                                                className={`inline-block px-2 py-1 rounded text-xs font-medium border ${getStatusColor(selectedOrder.status)}`}
                                            >
                                                {selectedOrder.status.toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-gray-400">
                                                Total Price
                                            </p>
                                            <p className="text-green-400 font-medium">
                                                ₱
                                                {formatPrice(
                                                    selectedOrder.total_price
                                                )}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400">
                                                Payment Method
                                            </p>
                                            <p className="text-white font-medium capitalize">
                                                {selectedOrder.payment_method}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400">
                                                Date Created
                                            </p>
                                            <p className="text-white">
                                                {formatDate(
                                                    selectedOrder.date_created
                                                )}
                                            </p>
                                        </div>
                                        {selectedOrder.date_paid && (
                                            <div>
                                                <p className="text-gray-400">
                                                    Date Paid
                                                </p>
                                                <p className="text-white">
                                                    {formatDate(
                                                        selectedOrder.date_paid
                                                    )}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Customer Info */}
                                <div className="bg-[#31334C] rounded-lg p-4">
                                    <h4 className="text-lg font-medium text-white mb-3">
                                        Customer Information
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-400">
                                                Username
                                            </p>
                                            <p className="text-white">
                                                {selectedOrder.buyer
                                                    ?.username || 'N/A'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400">
                                                Email
                                            </p>
                                            <p className="text-white">
                                                {selectedOrder.buyer?.email ||
                                                    'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="bg-[#31334C] rounded-lg p-4">
                                    <h4 className="text-lg font-medium text-white mb-3">
                                        Order Items
                                    </h4>
                                    <div className="space-y-3">
                                        {loadingOrderItems ? (
                                            <div className="flex items-center justify-center py-8">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                                <span className="ml-3 text-gray-400">
                                                    Loading order items...
                                                </span>
                                            </div>
                                        ) : (
                                            <>
                                                {getOrderItems(selectedOrder.id)
                                                    .length > 0 ? (
                                                    getOrderItems(
                                                        selectedOrder.id
                                                    ).map((item, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex justify-between items-center p-3 bg-[#1E1E2E] rounded-lg"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                {/* Product Image */}
                                                                {item
                                                                    .merch_variant
                                                                    ?.image && (
                                                                    <div className="w-16 h-16 flex-shrink-0">
                                                                        <img
                                                                            src={
                                                                                item
                                                                                    .merch_variant
                                                                                    .image
                                                                            }
                                                                            alt={
                                                                                item
                                                                                    .merch_variant
                                                                                    ?.merch
                                                                                    ?.name ||
                                                                                'Product'
                                                                            }
                                                                            className="w-full h-full object-cover rounded-lg border border-gray-600"
                                                                            onError={(
                                                                                e
                                                                            ) => {
                                                                                e.currentTarget.style.display =
                                                                                    'none'
                                                                            }}
                                                                        />
                                                                    </div>
                                                                )}

                                                                {/* Product Details */}
                                                                <div>
                                                                    <p className="text-white font-medium">
                                                                        {item
                                                                            .merch_variant
                                                                            ?.merch
                                                                            ?.name ||
                                                                            'Product'}
                                                                        {item
                                                                            .merch_variant
                                                                            ?.size &&
                                                                            ` - ${item.merch_variant.size.name}`}
                                                                        {item
                                                                            .merch_variant
                                                                            ?.variant &&
                                                                            ` (${item.merch_variant.variant})`}
                                                                    </p>
                                                                    <p className="text-gray-400 text-sm">
                                                                        Quantity:{' '}
                                                                        {
                                                                            item.quantity
                                                                        }
                                                                    </p>
                                                                    <p className="text-gray-400 text-sm">
                                                                        Unit
                                                                        Price: ₱
                                                                        {formatPrice(
                                                                            item
                                                                                .merch_variant
                                                                                ?.price ||
                                                                                0
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            {/* Price */}
                                                            <div className="text-right">
                                                                <p className="text-green-400 font-medium">
                                                                    ₱
                                                                    {formatPrice(
                                                                        item.subtotal_price
                                                                    )}
                                                                </p>
                                                                <p className="text-gray-500 text-sm">
                                                                    Total
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-gray-400 text-center py-4">
                                                        No items found
                                                    </p>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Proof of Payment */}
                                {selectedOrder.proof_of_payment && (
                                    <div className="bg-[#31334C] rounded-lg p-4">
                                        <h4 className="text-lg font-medium text-white mb-3">
                                            Proof of Payment
                                        </h4>
                                        <div className="text-center">
                                            <img
                                                src={
                                                    selectedOrder.proof_of_payment
                                                }
                                                alt="Proof of Payment"
                                                className="max-w-full h-auto rounded-lg mx-auto"
                                                style={{ maxHeight: '300px' }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

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
                                        className="w-full bg-[#31334C] text-white border border-[#424460] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-3 py-2 transition-all"
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
                                        className="w-full bg-[#31334C] text-white border border-[#424460] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-3 py-2 transition-all"
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
                                        min="0"
                                        className="w-full bg-[#31334C] text-white border border-[#424460] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-3 py-2 transition-all"
                                        value={editFormData.total_price || ''}
                                        onChange={(e) =>
                                            setEditFormData({
                                                ...editFormData,
                                                total_price:
                                                    parseFloat(
                                                        e.target.value
                                                    ) || 0,
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
                                <p className="text-gray-300 mb-4">
                                    Are you sure you want to delete this order?
                                    This action cannot be undone.
                                </p>
                                <div className="bg-[#31334C] rounded-lg p-4 space-y-2">
                                    <p className="text-white font-medium">
                                        Order #{selectedOrder.id}
                                    </p>
                                    <p className="text-gray-400 text-sm">
                                        Customer:{' '}
                                        {selectedOrder.buyer?.username ||
                                            selectedOrder.buyer?.email ||
                                            'Unknown'}
                                    </p>
                                    <p className="text-gray-400 text-sm">
                                        Total: ₱
                                        {formatPrice(selectedOrder.total_price)}
                                    </p>
                                    <p className="text-gray-400 text-sm">
                                        Status: {selectedOrder.status}
                                    </p>
                                </div>
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
