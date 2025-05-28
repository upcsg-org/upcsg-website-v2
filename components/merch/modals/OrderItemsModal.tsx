import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoClose } from 'react-icons/io5'
import { FiPackage } from 'react-icons/fi'
import { useOrderItemStore, OrderItem, Order } from '@/store/orders'
import Image from 'next/image'

interface PropsInterface {
    order: Order
    onClose: () => void
}

const OrderItemsModal = (props: PropsInterface) => {
    const { order, onClose } = props
    const { fetchAll: fetchAllOrderItems, items: orderItems } =
        useOrderItemStore()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchOrderItems()
    }, [order.id])

    const fetchOrderItems = async () => {
        try {
            setLoading(true)

            if (fetchAllOrderItems) {
                await fetchAllOrderItems({
                    order_id: order.id,
                })
            }
        } catch (error) {
            console.error('Error fetching order items:', error)
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }

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
                className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl text-white p-6 lg:p-8 rounded-3xl max-w-4xl w-full max-h-[80vh] relative border border-slate-700/50 shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent"
                        >
                            Order #{order.id} Details
                        </motion.h2>
                        <div className="flex items-center gap-4 mt-2">
                            <div
                                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                            >
                                {order.status}
                            </div>
                            <div className="text-sm text-slate-400">
                                {formatDate(order.date_created)}
                            </div>
                            <div className="text-lg font-bold text-green-400">
                                PHP {Number(order.total_price).toFixed(2)}
                            </div>
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-700/50 transition-all duration-200"
                    >
                        <IoClose size={24} />
                    </motion.button>
                </div>

                {/* Order Info */}
                <div className="bg-slate-800/50 rounded-xl p-4 mb-6 border border-slate-700/30">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
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
                                    {formatDate(order.date_paid)}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Items Section */}
                <div className="flex-1 overflow-hidden">
                    <h3 className="text-lg font-semibold mb-4">Order Items</h3>

                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                        </div>
                    ) : orderItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <FiPackage
                                size={64}
                                className="text-slate-600 mb-4"
                            />
                            <h4 className="text-xl font-semibold text-slate-400 mb-2">
                                No items found
                            </h4>
                            <p className="text-slate-500">
                                This order doesn&apos;t have any items.
                            </p>
                        </div>
                    ) : (
                        <div className="h-full overflow-y-auto space-y-3 pr-2">
                            {orderItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-4 bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/30"
                                >
                                    <div className="w-16 h-16 bg-slate-600/50 rounded-lg flex items-center justify-center overflow-hidden">
                                        {item.merch_variant?.image ? (
                                            <Image
                                                src={item.merch_variant.image}
                                                alt={
                                                    item.merch_variant.name ||
                                                    'Product'
                                                }
                                                width={64}
                                                height={64}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <FiPackage
                                                className="text-slate-400"
                                                size={24}
                                            />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-semibold text-lg">
                                            {item.merch_variant?.merch?.name ||
                                                item.merch_variant?.name ||
                                                'Unknown Product'}
                                        </div>
                                        <div className="text-slate-400 mb-2">
                                            {item.merch_variant?.name}
                                        </div>
                                        <div className="text-sm text-slate-500">
                                            Quantity: {item.quantity}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-bold text-green-400">
                                            PHP{' '}
                                            {Number(
                                                item.subtotal_price
                                            ).toFixed(2)}
                                        </div>
                                        <div className="text-sm text-slate-400">
                                            PHP{' '}
                                            {(
                                                Number(item.subtotal_price) /
                                                item.quantity
                                            ).toFixed(2)}{' '}
                                            each
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    )
}

export default OrderItemsModal
