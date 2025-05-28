import React, { useState } from 'react'
import Image from 'next/image'
import { IoClose } from 'react-icons/io5'
import { VscSparkle } from 'react-icons/vsc'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { HiShoppingBag } from 'react-icons/hi'
import ShopPop from './effects-popup/ShopPop'
import { AnimatePresence, motion } from 'framer-motion'
import { MerchItem } from '@/interface/merch'
import { useOrderStore } from '@/store/orders'
import { useAuthStore } from '@/store/auth'
import { useCartStore } from '@/store/cart'

interface ProductInterface extends MerchItem {
    image: string
}

interface PropsInterface {
    product: ProductInterface
    onClose: () => void
}

const OrderForm = (props: PropsInterface) => {
    const { product, onClose } = props
    const { user } = useAuthStore()
    const { create: createOrder } = useOrderStore()
    const addItem = useCartStore((state) => state.addItem)
    const [quantity, setQuantity] = useState(1)
    const [selectedVariant, setSelectedVariant] = useState(
        product.variants?.[0]
    )
    const [showShopPop, setShowShopPop] = useState(false)
    const [currentImage, setCurrentImage] = useState(product.image)

    const handleVariantChange = (variantId: string) => {
        const variant = product.variants?.find(
            (v) => String(v.id) === variantId
        )
        if (variant) {
            setSelectedVariant(variant)
            setCurrentImage(variant.image || product.image)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (selectedVariant) {
            // TODO: This needs proper type mapping between MerchItem variants and MerchVariant
            // For now, using type assertion to unblock the functionality
            const merchVariant = selectedVariant as any
            addItem(merchVariant, quantity)
        }
        setShowShopPop(true)
        setTimeout(() => {
            setShowShopPop(false)
        }, 1500)
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
                className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl text-white p-6 lg:p-8 rounded-3xl max-w-4xl w-full relative border border-slate-700/50 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white z-10 p-2 rounded-full hover:bg-slate-700/50 transition-all duration-200"
                >
                    <IoClose size={24} />
                </motion.button>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Product Image Section */}
                    <div className="w-full lg:w-1/2">
                        <div className="relative bg-gradient-to-br from-slate-700/30 to-slate-600/30 rounded-2xl overflow-hidden border border-slate-600/30 group">
                            {/* Best Seller Badge */}
                            {product.isBestSeller && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg"
                                >
                                    <VscSparkle className="text-sm" />
                                    BESTSELLER
                                </motion.div>
                            )}

                            <Image
                                src={currentImage}
                                alt={product.name}
                                width={500}
                                height={500}
                                className="w-full h-80 lg:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                    </div>

                    {/* Product Details Section */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        {/* Header */}
                        <div className="space-y-2">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent"
                            >
                                ORDER FORM
                            </motion.h2>
                        </div>

                        {/* Product Info Cards */}
                        <div className="space-y-4">
                            {/* Product Name */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/30"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                                        Product
                                    </span>
                                    <span className="text-lg font-semibold text-white">
                                        {product.name}
                                    </span>
                                </div>
                            </motion.div>

                            {/* Category */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/30"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                                        Category
                                    </span>
                                    <span className="text-lg font-semibold text-white">
                                        {product.type.text}
                                    </span>
                                </div>
                            </motion.div>

                            {/* Price */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/30"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                                        Price
                                    </span>
                                    <span className="text-xl font-bold text-green-400">
                                        PHP{' '}
                                        {selectedVariant?.price ||
                                            product.price}
                                    </span>
                                </div>
                            </motion.div>

                            {/* Variant Selection */}
                            {product.variants &&
                                product.variants.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/30"
                                    >
                                        <div className="space-y-3">
                                            <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                                                Variant
                                            </span>
                                            <div className="relative">
                                                <select
                                                    value={
                                                        selectedVariant?.id ||
                                                        ''
                                                    }
                                                    onChange={(e) =>
                                                        handleVariantChange(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full bg-slate-700/50 border border-slate-600/50 text-white rounded-xl px-4 py-3 pr-12 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                                                >
                                                    {product.variants.map(
                                                        (variant) => (
                                                            <option
                                                                key={variant.id}
                                                                value={String(
                                                                    variant.id
                                                                )}
                                                                className="bg-slate-800 text-white"
                                                            >
                                                                {variant.name} -{' '}
                                                                {variant.size}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                                {/* Custom Chevron Icon */}
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                                    <svg
                                                        className="w-5 h-5 text-slate-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 9l-7 7-7-7"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                            {/* Quantity Selection */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 }}
                                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/30"
                            >
                                <div className="space-y-3">
                                    <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                                        Quantity
                                    </span>
                                    <div className="flex items-center justify-center">
                                        <div className="flex items-center bg-slate-700/50 rounded-xl border border-slate-600/50 overflow-hidden">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() =>
                                                    setQuantity(
                                                        Math.max(
                                                            1,
                                                            quantity - 1
                                                        )
                                                    )
                                                }
                                                className="p-3 text-white hover:bg-slate-600/50 transition-colors duration-200"
                                                disabled={quantity <= 1}
                                            >
                                                <FiMinus size={18} />
                                            </motion.button>
                                            <input
                                                type="number"
                                                value={quantity}
                                                onChange={(e) =>
                                                    setQuantity(
                                                        Number(e.target.value)
                                                    )
                                                }
                                                min="1"
                                                max={
                                                    selectedVariant?.quantity ||
                                                    999
                                                }
                                                className="w-16 text-center bg-transparent text-white focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-lg font-semibold"
                                            />
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() =>
                                                    setQuantity(quantity + 1)
                                                }
                                                className="p-3 text-white hover:bg-slate-600/50 transition-colors duration-200"
                                            >
                                                <FiPlus size={18} />
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Add to Cart Button */}
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSubmit}
                            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group"
                        >
                            <HiShoppingBag className="text-xl group-hover:scale-110 transition-transform duration-200" />
                            <span className="text-lg">ADD TO SHOPPING BAG</span>
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {showShopPop && (
                    <motion.div
                        key="shopPop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <ShopPop
                            onClose={() => {
                                setShowShopPop(false)
                                onClose()
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default OrderForm
