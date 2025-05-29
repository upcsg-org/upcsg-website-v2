'use client'

import ReciepientInformation from './ReciepientInformation'
import OrderedList from './OrderedList'
import { HiOutlineArrowLeft } from 'react-icons/hi2'
import getFormConfig from './formconfig'
import useFormHandler from '@/hooks/FormHooks'
import { useOrderStore } from '@/store/orders'
import { useAuthStore } from '@/store/auth'
import { useCartStore } from '@/store/cart'

interface CheckoutPopProps {
    toggleCheckoutModal: () => void
}

const CheckoutPop: React.FC<CheckoutPopProps> = ({ toggleCheckoutModal }) => {
    const { create } = useOrderStore()
    const { user } = useAuthStore()
    const { cartItems, total_price, clearCart } = useCartStore((state) => ({
        cartItems: state.cartItems,
        total_price: state.total_price,
        clearCart: state.clearCart,
    }))

    // Initial values for the form possibly from server if existing details are present
    const initialValues = {
        name: '',
        selectedYear: 'N/A',
        course: '',
        email: '',
        number: '',
        selectedPaymentOption: 'GCASH',
        image: null,
        status: 'PENDING',
        estimatedDate: '8/23/2024',
    }

    const { formData, handleChange, handleImageChange, handleSubmit } =
        useFormHandler(initialValues)

    const formConfig = getFormConfig(formData, handleChange, handleImageChange)

    const hiddenScrollbar: React.CSSProperties = {
        scrollbarWidth: 'none',
        msOverflowStyle: '-ms-autohiding-scrollbar',
    } as React.CSSProperties

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!user) {
            // Handle case where user is not logged in
            return
        }

        if (!create) {
            console.error('Create function is not available')
            return
        }

        try {
            // Create an order for each item in the cart
            for (const item of cartItems) {
                const orderData = {
                    buyer_id: user.id,
                    order_items_data: {
                        merch_variant_id: item.merch_variant.id,
                        quantity: item.quantity,
                    },
                    payment_method: formData.selectedPaymentOption,
                    proof_of_payment: formData.image,
                    status: 'PENDING',
                }

                const newOrder = await create(orderData)
                if (!newOrder) {
                    throw new Error('Failed to create order')
                }
            }

            // Clear cart after successful order creation
            clearCart()

            // Handle successful order creation
            toggleCheckoutModal()
            // You might want to show a success message or redirect
        } catch (error) {
            console.error('Error creating order:', error)
            // Handle error appropriately
        }
    }

    return (
        <form onSubmit={handleSubmit(handleCheckout)}>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 h-screen">
                <div
                    className="flex flex-col w-[500px] md:w-[700px] lg:w-[900px] bg-csg-blue-700 rounded-2xl gap-2 md:gap-6 max-h-[95dvh] overflow-y-auto font-vietnam text-sm lg:text-base hidden-scrollbar"
                    style={hiddenScrollbar}
                >
                    <div className="w-full flex flex-row p-6 pb-0">
                        <div className="font-bold tracking-widest text-lg">
                            <h1 className="text-xl md:text-3xl mb-2">
                                CHECKOUT
                            </h1>
                            <p className="text-sm  md:text-lg text-[#4E4EA6]">
                                YOUR ORDER
                            </p>
                        </div>
                        <div className="ml-auto">
                            <button
                                onClick={toggleCheckoutModal}
                                className="flex flex-row items-center bg-csg-green-100 p-1 md:p-2 rounded-2xl text-main-dark text-sm md:text-base"
                            >
                                <HiOutlineArrowLeft className="text-main-dark w-8 h-5" />
                                CONTINUE SHOPPING
                            </button>
                        </div>
                    </div>

                    <OrderedList cartItems={cartItems} />

                    <ReciepientInformation formConfig={formConfig} />
                    <div className="relative flex flex-row mt-4 h-16 bg-black rounded-b-2xl justify-between items-center text-base md:text-lg last:inset-0">
                        <div className="flex-1 flex justify-center">
                            <h2 className="text-[#242460] md:ml-[192px]">
                                TOTAL PAYMENT {''}
                                <span className="text-[#6479CB] ml-3">
                                    PHP {total_price.toFixed(2)}
                                </span>
                            </h2>
                        </div>
                        <div className="p-3 lg:p-5 bg-[#B53629] h-full rounded-br-2xl flex items-center">
                            <button
                                type="submit"
                                className="text-[#5E1E17] font-bold tracking-widest"
                            >
                                PLACE ORDER
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default CheckoutPop
