'use client'

import ReciepientInformation from './ReciepientInformation'
import OrderedList from './OrderedList'
import { HiOutlineArrowLeft } from 'react-icons/hi2'
import { merchItems } from '@/constants/merch/merch'
import { MerchItem } from '@/interface/merch'
import getFormConfig from './formconfig'
import useFormHandler from '@/hooks/FormHooks'

interface CheckoutPopProps {
    toggleCheckoutModal: () => void
}

const calculateTotalPrice = (items: MerchItem[]): number => {
    return items.reduce((total, item) => total + item.price, 0)
}

const CheckoutPop: React.FC<CheckoutPopProps> = ({ toggleCheckoutModal }) => {
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

    const shoppingCartItems = merchItems.slice(0, 2)
    const totalPrice = calculateTotalPrice(shoppingCartItems)

    const hiddenScrollbar: React.CSSProperties = {
        scrollbarWidth: 'none',
        msOverflowStyle: '-ms-autohiding-scrollbar',
    } as React.CSSProperties

    const handleCheckout = () => {
        // create handler function for checkout
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

                    <OrderedList merchItems={shoppingCartItems} />

                    <ReciepientInformation formConfig={formConfig} />
                    <div className="relative flex flex-row mt-4 h-16 bg-black rounded-b-2xl justify-between items-center text-base md:text-lg last:inset-0">
                        <div className="flex-1 flex justify-center">
                            <h2 className="text-[#242460] md:ml-[192px]">
                                TOTAL PAYMENT {''}
                                <span className="text-[#6479CB] ml-3">
                                    PHP {totalPrice}
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
