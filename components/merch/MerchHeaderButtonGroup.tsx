import React, { useState } from 'react'
import MerchHeaderButton from './MerchHeaderButton'
import {
    AiOutlineHeart,
    AiOutlineShopping,
    AiOutlineProfile,
} from 'react-icons/ai'
import MyLikesModal from './MyLikesModal'
import ShoppingCartModal from './modals/ShoppingCartModal'
import ComingSoonModal from '../generics/ComingSoonModal'
import CheckoutPop from './checkout-popup/CheckoutPop'

const MerchHeaderButtonGroup = () => {
    const [bagCount, setBagCount] = useState(0)
    const [likeCount, setLikeCount] = useState(0)
    const [purchaseCount, setPurchaseCount] = useState(0)

    const [likesModalShow, setLikesModalShow] = useState(false)
    const [shoppingBagModalShow, setShoppingBagModalShow] = useState(false)
    const [purchasesModalShow, setPurchasesModalShow] = useState(false)
    const [showCheckoutModal, setShowCheckoutModal] = useState(false)

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
                    count={bagCount}
                    clickEvent={() => setShoppingBagModalShow(true)}
                    className="bg-[#45AE95]"
                />

                <MerchHeaderButton
                    Icon={AiOutlineHeart}
                    text="Likes"
                    count={likeCount}
                    clickEvent={() => setLikesModalShow(true)}
                    className="bg-[#5B67CC]"
                />

                <MerchHeaderButton
                    Icon={AiOutlineProfile}
                    text="Purchases"
                    count={purchaseCount}
                    clickEvent={() => setPurchasesModalShow(true)}
                    className="bg-[#D7584B]"
                />
            </div>

            {likesModalShow && (
                <MyLikesModal handleClose={() => setLikesModalShow(false)} />
            )}

            {shoppingBagModalShow && (
                <ComingSoonModal toggleModal={setShoppingBagModalShow} />
                // <ShoppingCartModal
                //     toggleShoppingCart={toggleShoppingCart}
                //     toggleCheckoutModal={toggleCheckoutModal}
                // />
            )}

            {purchasesModalShow && (
                <ComingSoonModal toggleModal={setPurchasesModalShow} />
            )}

            {showCheckoutModal && (
                <CheckoutPop toggleCheckoutModal={toggleCheckoutModal} />
            )}
        </>
    )
}

export default MerchHeaderButtonGroup
