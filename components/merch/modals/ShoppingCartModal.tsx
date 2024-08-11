import React, { useState } from 'react'
import ShoppingCartItem from "./ShoppingCartItem"
import { FaLongArrowAltLeft } from 'react-icons/fa'
import TheButton from "../../generics/TheButton"
import { shoppingCartItems } from '@/constants/merch/shoppingCart'

interface PropsInterface {
    handleClose: () => void
}


const ShoppingCartModal = (props: PropsInterface) => {
    const { handleClose } = props

    const myCart = shoppingCartItems

    const handleCheckout = () => {
        console.log('checked out')
    }

    var total = 0

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="flex flex-col bg-main-dark text-white p-4 xs:p-6 rounded-2xl max-w-3xl w-full relative border-csg-blue-400 border-2 right-0.5 overflow-hidden">
                <div className="flex flex-row justify-between gap-2 mb-2">
                    <div className="text-white sm:text-2xl xl:text-4xl uppercase self-center font-bold font-vietnam tracking-widest">MY SHOPPING BAG</div>
                    <TheButton onClick={handleClose}>
                        <p className="max-sm:hidden font-semibold w-full h-full flex items-center justify-center gap-x-2">
                            <FaLongArrowAltLeft />
                            <span>Continue Shopping</span>
                        </p>
                    </TheButton>
                </div>
                <div className="w-full h-fit flex flex-row justify- gap-4 rounded-2xl text-center text-[13px] sm:text-xs md:text-sm bg-black text-[#434365] font-medium font-vietnam tracking-wider">
                    <div className="w-2/5 ml-16">PRODUCT DETAILS</div>
                    <div className="w-1/4">SIZE</div>
                    <div className="w-1/4">COLOR</div>
                    <div className="w-1/4">QUANTITY</div>
                    <div className="w-12" />
                </div>
                <div className="h-96 overflow-y-auto hidden-scrollbar">
                    {myCart.map((merch, index) => (
                        <ShoppingCartItem
                            key={index}
                            merch={merch.merch}
                            quantity={merch.quantity}
                            color={merch.color}
                            size={merch.size}
                            maxQuantity={merch.maxQuantity}
                            isCheckedOut={merch.isChecked}
                        />
                    ))}
                </div>
                <div className="absolute flex flex-row h-fit w-full bg-black bottom-0 left-0 right-0 p-0 m-0 text-center justify-center align-center">
                    <div className="w-[35px] h-[35px] bg-[#2929b7]/0 rounded-full border-2 border-[#171745] ml-2 mr-2" />
                    <p className="basis-1/4 self-center">ALL</p>
                    <div className="basis-1/4 self-center">
                        <span className="text-[#242460] font-bold">TOTAL</span> PHP { total }
                    </div>
                    <button className="ml-auto bg-[#b53629] pl-2 pr-2" onClick={handleCheckout}>CHECKOUT</button> 
                </div>
            </div>
        </div>
    )
}

export default ShoppingCartModal

    //< button onClick = { handleClose } className = "bg-csg-green-100 h-fit px-1 py-0.5 sm:px-2 sm:py-1 rounded-lg flex flex-row gap-0.5 sm:gap-1 items-center cursor-pointer hover:text-white/75" > {< BsArrowLeft />} CONTINUE SHOPPING</button >