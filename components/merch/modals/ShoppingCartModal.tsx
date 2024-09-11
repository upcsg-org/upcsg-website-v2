import React, { useState } from 'react'
import ShoppingCartItem from './ShoppingCartItem'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import TheButton from '../../generics/TheButton'
import { shoppingCartItems } from '@/constants/merch/shoppingCart'
import { Dispatch, SetStateAction } from 'react'

interface PropsInterface {
    toggleModal: Dispatch<SetStateAction<boolean>>
    allChecked: boolean
}

const ShoppingCartModal = (props: PropsInterface) => {
    const { toggleModal, allChecked } = props

    const handleCloseModal = () => {
        toggleModal(false)
    }

    const [cartItems, setCartItems] = useState(shoppingCartItems)

    const handleCheckout = () => {
        console.log('checked out')
    }

    const [totalPrice, setTotalPrice] = useState(0)

    const handleCheckoutChange = (index: number, isCheckedOut: boolean) => {
        console.log(index, isCheckedOut, 'here')
        setCartItems((prevItems) => {
            const updatedItems = prevItems.map((item, i) => {
                if (i === index) {
                    const priceChange = item.merch.price * item.quantity
                    setTotalPrice((prevTotal) =>
                        isCheckedOut
                            ? prevTotal + priceChange
                            : prevTotal - priceChange
                    )
                    return { ...item, isCheckedOut }
                }
                return item
            })
            return updatedItems
        })
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="flex flex-col bg-main-dark text-white p-4 xs:p-6 rounded-2xl max-w-3xl w-full relative border-csg-blue-400 border-2 right-0.5 overflow-hidden">
                <div className="flex flex-row justify-between gap-2 mb-2">
                    <div className="text-white sm:text-2xl xl:text-4xl uppercase self-center font-bold font-vietnam tracking-widest">
                        MY SHOPPING BAG
                    </div>
                    <TheButton onClick={handleCloseModal}>
                        <p className="max-sm:hidden font-semibold w-full h-full flex items-center justify-center gap-x-2">
                            <FaLongArrowAltLeft />
                            <span>Continue Shopping</span>
                        </p>
                    </TheButton>
                </div>
                <div className="hidden md:flex w-full h-fit flex-row gap-4 rounded-2xl text-center text-[13px] sm:text-xs md:text-sm bg-black text-[#434365] font-medium font-vietnam tracking-wider">
                    <div className="w-2/5 ml-16 truncate whitespace-nowrap">
                        PRODUCT DETAILS
                    </div>
                    <div className="w-1/4">SIZE</div>
                    <div className="w-1/4">COLOR</div>
                    <div className="w-1/4">QUANTITY</div>
                    <div className="w-12" />
                </div>
                <div className="h-96 overflow-y-auto hidden-scrollbar mb-3">
                    {cartItems.map((merch, index) => (
                        <ShoppingCartItem
                            key={index}
                            id={index}
                            merch={merch.merch}
                            quantity={merch.quantity}
                            color={merch.color}
                            size={merch.size}
                            maxQuantity={merch.maxQuantity}
                            isCheckedOut={merch.isCheckedOut}
                            onCheckoutChange={(itemIndex, newCheckedState) =>
                                handleCheckoutChange(itemIndex, newCheckedState)
                            }
                        />
                    ))}
                </div>
                <div className="absolute flex flex-row h-fit w-full bg-black bottom-0 left-0 right-0 p-0 m-0 text-center justify-center align-center z-30 text-xs md:text-sm">
                    <div
                        className={`w-[16px] ps:w-[24px] md:w-[35px] aspect-square rounded-full border-2 md:border-4 border-[#171745] flex shrink-0 cursor-pointer items-center justify-center ${
                            allChecked ? 'bg-[#2929b7]' : 'bg-[#2929b7]/0'
                        }`}
                    />
                    <p className="basis-1/4 self-center">ALL</p>
                    <div className="basis-1/4 self-center">
                        <span className="text-[#242460] font-bold">TOTAL</span>{' '}
                        PHP {totalPrice}
                    </div>
                    <button
                        className="ml-auto bg-[#b53629] pl-2 pr-2"
                        onClick={handleCheckout}
                    >
                        CHECKOUT
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCartModal
