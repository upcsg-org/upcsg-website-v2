import React, { useState, useEffect } from 'react'
import MerchHeaderButton from './MerchHeaderButton'
import {
    AiOutlineHeart,
    AiOutlineShopping,
    AiOutlineProfile,
} from 'react-icons/ai'
import MyLikesModal from '../MyLikesModal'
import ShoppingCartModal from '../modals/ShoppingCartModal'
import OrderModal from '../modals/OrderModal'
import CheckoutPop from '../checkout-popup/CheckoutPop'
import { useCartStore } from '@/store/cart'
import { useOrderStore } from '@/store/orders'
import { useAuthStore } from '@/store/auth'

const MerchHeaderButtonGroup = () => {
    const cartItems = useCartStore((state) => state.cartItems)
    const cartItemCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    )

    const { fetchAll: fetchAllOrders, items: orders } = useOrderStore()

    const [orderCount, setOrderCount] = useState(0)

    const [likesModalShow, setLikesModalShow] = useState(false)
    const [shoppingBagModalShow, setShoppingBagModalShow] = useState(false)
    const [ordersModalShow, setOrdersModalShow] = useState(false)
    const [showCheckoutModal, setShowCheckoutModal] = useState(false)

    useEffect(() => {
        if (fetchAllOrders) {
            fetchUserOrders()
        }
    }, [])

    const fetchUserOrders = async () => {
        try {
            // Fetch orders with user filter parameter
            await fetchAllOrders!()
        } catch (error) {
            console.error('Error fetching user orders:', error)
        }
    }

    useEffect(() => {
        setOrderCount(orders.length)
    }, [orders])

    const toggleShoppingCart = () => {
        setShoppingBagModalShow(!shoppingBagModalShow)
    }

    const toggleCheckoutModal = () => {
        setShowCheckoutModal(!showCheckoutModal)
    }

    return (
        <>
            <div className="w-fit h-fill text-black tracking-wide flex flex-row flex-wrap justify-end gap-1 sm:gap-2 grow">
                <MerchHeaderButton
                    Icon={AiOutlineShopping}
                    text="Shopping Bag"
                    count={cartItemCount}
                    clickEvent={() => setShoppingBagModalShow(true)}
                    className="bg-[#45AE95]"
                />

                {/* <MerchHeaderButton
                    Icon={AiOutlineHeart}
                    text="Likes"
                    count={likeCount}
                    clickEvent={() => setLikesModalShow(true)}
                    className="bg-[#5B67CC]"
                /> */}

                <MerchHeaderButton
                    Icon={AiOutlineProfile}
                    text="Orders"
                    count={orderCount}
                    clickEvent={() => setOrdersModalShow(true)}
                    className="bg-[#D7584B]"
                />
            </div>

            {likesModalShow && (
                <MyLikesModal handleClose={() => setLikesModalShow(false)} />
            )}

            {shoppingBagModalShow && (
                <ShoppingCartModal
                    toggleShoppingCart={toggleShoppingCart}
                    toggleCheckoutModal={toggleCheckoutModal}
                />
            )}

            {ordersModalShow && (
                <OrderModal onClose={() => setOrdersModalShow(false)} />
            )}

            {showCheckoutModal && (
                <CheckoutPop toggleCheckoutModal={toggleCheckoutModal} />
            )}
        </>
    )
}

export default MerchHeaderButtonGroup
