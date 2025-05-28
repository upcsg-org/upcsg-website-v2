import React, { useState } from 'react'
import ShoppingCartItem from './ShoppingCartItem'
import PaymentModal from './PaymentModal'
import NotificationModal from '@/components/generics/NotificationModal'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import TheButton from '../../generics/TheButton'
import { useCartStore } from '@/store/cart'
import { useOrderItemStore, useOrderStore } from '@/store/orders'
import { useAuthStore } from '@/store/auth'
import { apiClient } from '@/lib/api'

interface PropsInterface {
    toggleCheckoutModal: () => void
    toggleShoppingCart: () => void
}

const ShoppingCartModal = (props: PropsInterface) => {
    const { toggleCheckoutModal, toggleShoppingCart } = props
    const cartItems = useCartStore((state) => state.cartItems)
    const total_price = useCartStore((state) => state.total_price)
    const clearCart = useCartStore((state) => state.clearCart)
    const { user, isAuthenticated, isLoading: authLoading } = useAuthStore()
    const orderStore = useOrderStore()
    const orderItemStore = useOrderItemStore()

    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [notification, setNotification] = useState<{
        isOpen: boolean
        type: 'success' | 'error' | 'warning' | 'info'
        title: string
        message: string
    }>({
        isOpen: false,
        type: 'info',
        title: '',
        message: '',
    })

    const showNotification = (
        type: 'success' | 'error' | 'warning' | 'info',
        title: string,
        message: string
    ) => {
        setNotification({
            isOpen: true,
            type,
            title,
            message,
        })
    }

    const closeNotification = () => {
        setNotification((prev) => ({ ...prev, isOpen: false }))
    }

    // Early return if cartItems is not properly initialized
    if (!cartItems) {
        return null
    }

    const handleCloseModal = () => {
        toggleShoppingCart()
    }

    const handleCheckout = () => {
        // Check if auth is still loading
        if (authLoading) {
            showNotification(
                'info',
                'Please Wait',
                'Please wait while we verify your login status...'
            )
            return
        }

        if (!isAuthenticated || !user) {
            showNotification(
                'warning',
                'Login Required',
                'Please log in to place an order'
            )
            return
        }

        if (cartItems.length === 0) {
            showNotification('warning', 'Empty Cart', 'Your cart is empty')
            return
        }

        setShowPaymentModal(true)
    }

    const handlePaymentConfirm = async (
        paymentMethod: string,
        proofOfPayment?: File
    ) => {
        if (!isAuthenticated || !user) {
            showNotification(
                'warning',
                'Login Required',
                'Please log in to place an order'
            )
            return
        }

        if (!orderStore.create || !orderItemStore.create) {
            showNotification(
                'error',
                'System Error',
                'Order system is not available. Please try again later.'
            )
            return
        }

        setIsProcessing(true)
        setShowPaymentModal(false)

        try {
            let newOrder: any

            // Handle file upload if proof of payment is provided
            if (proofOfPayment) {
                // For file uploads, use FormData with direct API call
                const formData = new FormData()
                formData.append('buyer_id', user.id.toString())
                formData.append('payment_method', paymentMethod)
                formData.append('total_price', total_price.toString())
                formData.append('proof_of_payment', proofOfPayment)

                // Use direct API call for file uploads
                newOrder = await apiClient.postFile('/order/', formData)
            } else {
                // For cash orders without file upload, use the store method
                const orderData = {
                    buyer_id: user.id,
                    payment_method: paymentMethod,
                    total_price: total_price,
                }
                newOrder = await orderStore.create(orderData)
            }

            if (!newOrder || !newOrder.id) {
                throw new Error('Failed to create order')
            }

            // Create order items for each cart item sequentially
            for (const item of cartItems) {
                const orderItemData = {
                    order_id: newOrder.id,
                    merch_variant_id: item.merch_variant.id,
                    quantity: item.quantity,
                    subtotal_price: item.subtotal_price,
                }
                await orderItemStore.create!(orderItemData)
            }

            // Clear the cart after successful order creation
            clearCart()

            // Show success message
            showNotification(
                'success',
                'Order Placed',
                'Order placed successfully!'
            )

            // Close modals after a short delay to let user see the success message
            setTimeout(() => {
                toggleShoppingCart()
            }, 2000)
        } catch (error) {
            console.error('Error creating order:', error)
            showNotification(
                'error',
                'Order Failed',
                'Failed to place order. Please try again.'
            )
        } finally {
            setIsProcessing(false)
        }
    }

    const handlePaymentCancel = () => {
        setShowPaymentModal(false)
    }

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="flex flex-col bg-main-dark text-white p-6 rounded-2xl max-w-3xl w-full relative border-csg-blue-400 border-2 right-0.5 overflow-hidden shadow-2xl">
                    <div className="flex flex-row justify-between gap-2 mb-4 items-center">
                        <div className="text-white sm:text-2xl xl:text-4xl uppercase self-center font-bold font-vietnam tracking-widest">
                            MY SHOPPING BAG
                        </div>
                        <TheButton onClick={handleCloseModal}>
                            <p className="font-semibold flex items-center gap-x-2 px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition">
                                <FaLongArrowAltLeft />
                                <span>Continue Shopping</span>
                            </p>
                        </TheButton>
                    </div>
                    <div className="w-full flex flex-row gap-4 rounded-2xl text-center text-[13px] sm:text-xs md:text-sm bg-[#18182c] text-[#b0b0d0] font-semibold font-vietnam tracking-wider py-2 px-2 mb-2 border-b border-[#23234a]">
                        <div className="w-2/5 ml-16 truncate whitespace-nowrap text-left">
                            PRODUCT DETAILS
                        </div>
                        <div className="w-1/6">SIZE</div>
                        <div className="w-1/6">QUANTITY</div>
                        <div className="w-1/6">SUBTOTAL</div>
                        <div className="w-12" />
                    </div>
                    <div className="h-96 overflow-y-auto hidden-scrollbar mb-6 flex flex-col gap-4">
                        {cartItems.length === 0 ? (
                            <div className="text-center text-[#888] py-12 text-lg font-semibold">
                                Your shopping bag is empty.
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <ShoppingCartItem key={item.id} item={item} />
                            ))
                        )}
                    </div>
                    <div className="flex flex-row items-center justify-between bg-[#18182c] rounded-xl px-6 py-4 mt-2 border-t border-[#23234a]">
                        <div className="flex items-center gap-2">
                            <span className="text-[#242460] font-bold text-lg">
                                TOTAL
                            </span>
                            <span className="text-[#6479CB] text-xl font-bold">
                                PHP {Number(total_price).toFixed(2)}
                            </span>
                        </div>
                        <button
                            className="bg-[#b53629] text-white font-bold px-6 py-2 rounded-lg hover:bg-red-700 transition text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleCheckout}
                            disabled={
                                cartItems.length === 0 ||
                                isProcessing ||
                                authLoading
                            }
                        >
                            {isProcessing
                                ? 'PROCESSING...'
                                : authLoading
                                  ? 'VERIFYING LOGIN...'
                                  : 'CHECKOUT'}
                        </button>
                    </div>
                </div>
            </div>

            <PaymentModal
                isOpen={showPaymentModal}
                onClose={handlePaymentCancel}
                onConfirm={handlePaymentConfirm}
                totalPrice={total_price}
            />

            <NotificationModal
                isOpen={notification.isOpen}
                onClose={closeNotification}
                type={notification.type}
                title={notification.title}
                message={notification.message}
            />
        </>
    )
}

export default ShoppingCartModal
