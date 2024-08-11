import React, { useState } from 'react'
import MerchHeaderButton from './MerchHeaderButton'
import {
    AiOutlineHeart,
    AiOutlineShopping,
    AiOutlineProfile,
} from 'react-icons/ai'
import MyLikesModal from './MyLikesModal'
import ShoppingCartModal from './modals/ShoppingCartModal'





const MerchHeaderButtonGroup = () => {
    const [bagCount, setBagCount] = useState(0)
    const [likeCount, setLikeCount] = useState(0)
    const [purchaseCount, setPurchaseCount] = useState(0)

    const [shoppingCartShow, setShoppingCartShow] = useState(false)
    const [likesModalShow, setLikesModalShow] = useState(false)

    return (
        <>
            <div className="w-fit h-fill text-black tracking-wide flex flex-row flex-wrap justify-end gap-1 sm:gap-2 grow">
            <MerchHeaderButton
                Icon={AiOutlineShopping}
                text="Shopping Bag"
                count={bagCount}
                clickEvent={() => setShoppingCartShow(true)}
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
                className="bg-[#D7584B]"
             />

            </div>

            {likesModalShow && (
                <MyLikesModal handleClose={() => setLikesModalShow(false)} />
            )}

            {shoppingCartShow && (
                <ShoppingCartModal handleClose={() => setShoppingCartShow(false)}
                />
            )}
        </>
    )
}

export default MerchHeaderButtonGroup
