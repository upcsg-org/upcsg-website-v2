import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoClose } from 'react-icons/io5'
import {
    FiPackage,
    FiClock,
    FiCheck,
    FiX,
    FiTruck,
    FiEye,
} from 'react-icons/fi'
import {
    useOrderStore,
    useOrderItemStore,
    OrderItem,
    Order,
} from '@/store/orders'
import { useAuthStore } from '@/store/auth'
import OrderItemsModal from './OrderItemsModal'

interface PropsInterface {
    onClose: () => void
}

const OrderModal = (props: PropsInterface) => {
    const { onClose } = props
    const { isAuthenticated } = useAuthStore()
    const { fetchAll: fetchAllOrders, items: orders } = useOrderStore()

    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('all')
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

    const tabs = [
        { id: 'all', label: 'All Orders', icon: FiPackage },
        { id: 'pending', label: 'Pending', icon: FiClock },
        { id: 'paid', label: 'Paid', icon: FiCheck },
        { id: 'delivered', label: 'Delivered', icon: FiTruck },
        { id: 'cancelled', label: 'Cancelled', icon: FiX },
    ]

    useEffect(() => {
        if (fetchAllOrders) {
            fetchUserOrders()
        }
    }, [])

    const fetchUserOrders = async () => {
        try {
            setLoading(true)

            // Fetch orders with user filter parameter
            await fetchAllOrders!()
        } catch (error) {
            console.error('Error fetching user orders:', error)
        } finally {
            setLoading(false)
        }
    }

    const filteredOrders = orders.filter(
        (order) => activeTab === 'all' || order.status === activeTab
    )

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PAID':
                return 'text-green-400 bg-green-400/10'
            case 'PENDING':
                return 'text-yellow-400 bg-yellow-400/10'
            case 'CANCELLED':
                return 'text-red-400 bg-red-400/10'
            default:
                return 'text-slate-400 bg-slate-400/10'
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }

    if (!isAuthenticated) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl text-white p-8 rounded-3xl max-w-md w-full relative border border-slate-700/50 text-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-2xl font-bold mb-4">Login Required</h2>
                    <p className="text-slate-300 mb-6">
                        Please log in to view your order history.
                    </p>
                    <button
                        onClick={onClose}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
                    >
                        Close
                    </button>
                </motion.div>
            </motion.div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl text-white p-6 lg:p-8 rounded-3xl max-w-5xl w-full h-[80vh] relative border border-slate-700/50 shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent"
                    >
                        MY ORDERS
                    </motion.h2>
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-700/50 transition-all duration-200"
                    >
                        <IoClose size={24} />
                    </motion.button>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {tabs.map((tab) => (
                        <motion.button
                            key={tab.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                                activeTab === tab.id
                                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                    : 'bg-slate-700/30 text-slate-400 hover:bg-slate-700/50 hover:text-white border border-slate-600/30'
                            }`}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                        </motion.button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                        </div>
                    ) : filteredOrders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <FiPackage
                                size={64}
                                className="text-slate-600 mb-4"
                            />
                            <h3 className="text-xl font-semibold text-slate-400 mb-2">
                                No orders found
                            </h3>
                            <p className="text-slate-500">
                                {activeTab === 'all'
                                    ? "You haven't made any orders yet."
                                    : `No ${activeTab.toLowerCase()} orders found.`}
                            </p>
                        </div>
                    ) : (
                        <div className="h-full overflow-y-auto space-y-4 pr-2">
                            {filteredOrders.map((order, index) => (
                                <motion.div
                                    key={order.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/30 overflow-hidden"
                                >
                                    {/* Order Header */}
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-4">
                                                <div className="text-sm text-slate-400">
                                                    Order #{order.id}
                                                </div>
                                                <div
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                                                >
                                                    {order.status}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="text-right">
                                                    <div className="text-lg font-bold text-green-400">
                                                        PHP{' '}
                                                        {Number(
                                                            order.total_price
                                                        ).toFixed(2)}
                                                    </div>
                                                    <div className="text-sm text-slate-400">
                                                        {formatDate(
                                                            order.date_created
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Order Details */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                                            <div>
                                                <span className="text-slate-400">
                                                    Payment Method:
                                                </span>
                                                <span className="ml-2 text-white capitalize">
                                                    {order.payment_method}
                                                </span>
                                            </div>
                                            {order.date_paid && (
                                                <div>
                                                    <span className="text-slate-400">
                                                        Date Paid:
                                                    </span>
                                                    <span className="ml-2 text-white">
                                                        {formatDate(
                                                            order.date_paid
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* View Items Button */}
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() =>
                                                setSelectedOrder(order)
                                            }
                                            className="w-full flex items-center justify-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 hover:border-blue-500/50 rounded-xl py-3 px-4 transition-all duration-200"
                                        >
                                            <FiEye size={18} />
                                            View Order Items
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Order Items Modal */}
            <AnimatePresence>
                {selectedOrder && (
                    <OrderItemsModal
                        order={selectedOrder}
                        onClose={() => setSelectedOrder(null)}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default OrderModal
