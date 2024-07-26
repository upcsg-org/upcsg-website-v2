import React, { useState } from 'react'
import MerchHeaderButton from './MerchHeaderButton'
import {
    AiOutlineHeart,
    AiOutlineShopping,
    AiOutlineProfile,
} from 'react-icons/ai'

const MerchHeaderButtonGroup = () => {
    const [bagCount, setBagCount] = useState(0)
    const [likeCount, setLikeCount] = useState(0)
    const [purchaseCount, setPurchaseCount] = useState(0)

    return (
        <div className="w-fit h-fill text-black tracking-wide flex flex-row flex-wrap justify-end gap-1 sm:gap-2 grow">
            <MerchHeaderButton
                Icon={AiOutlineShopping}
                text="Shopping Bag"
                count={bagCount}
                className="bg-[#45AE95]"
            />

            <MerchHeaderButton
                Icon={AiOutlineHeart}
                text="Likes"
                count={likeCount}
                className="bg-[#5B67CC]"
            />

            <MerchHeaderButton
                Icon={AiOutlineProfile}
                text="Purchases"
                count={purchaseCount}
                className="bg-[#D7584B]"
            />
        </div>
    )
}

export default MerchHeaderButtonGroup
