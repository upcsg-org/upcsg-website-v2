import React, { useCallback } from 'react'
import Image from 'next/image'
import { BsXLg } from 'react-icons/bs'
import { CartItem } from '@/interface/cart'
import { useCartStore } from '@/store/cart'

interface PropsInterface {
    item: CartItem
}

const ShoppingCartItem = (props: PropsInterface) => {
    const { item } = props
    const { id, merch_variant, quantity, subtotal_price } = item
    const updateItemQuantity = useCartStore((state) => state.updateItemQuantity)
    const removeItem = useCartStore((state) => state.removeItem)

    const handleQuantityChange = useCallback(
        (newQty: number) => {
            if (
                newQty >= 1 &&
                newQty <= (merch_variant.quantity || 999) &&
                newQty !== quantity
            ) {
                updateItemQuantity(id, newQty)
            }
        },
        [id, quantity, merch_variant.quantity, updateItemQuantity]
    )

    const handleRemove = useCallback(() => {
        removeItem(id)
    }, [id, removeItem])

    // Safe access to nested properties
    const merchName =
        merch_variant.merch?.name || merch_variant.name || 'Unknown Product'
    const variantName = merch_variant.name || 'Default Variant'

    // Handle both MerchItem variant structure (size: string) and MerchVariant structure (size: {name: string})
    const sizeName =
        typeof merch_variant.size === 'string'
            ? merch_variant.size
            : merch_variant.size?.name || 'Unknown Size'

    const imageSource = merch_variant.image || '/placeholder-image.png'
    const price = Number(merch_variant.price) || 0

    return (
        <div className="flex flex-row items-center gap-4 bg-[#18182c] border border-[#23234a] rounded-xl p-4 shadow-md">
            {/* Remove button */}
            <button
                onClick={handleRemove}
                className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-[#2929b7] bg-[#23234a] text-[#7a7aff] hover:bg-[#2929b7] hover:text-white transition mr-2"
            >
                <BsXLg size={18} />
            </button>
            {/* Product image and info */}
            <div className="flex flex-row items-center gap-4 w-2/5 min-w-[180px]">
                <div className="w-16 h-16 relative rounded-lg overflow-hidden border border-[#23234a] bg-[#d8dcdf]">
                    <Image
                        src={imageSource}
                        alt={variantName}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                </div>
                <div className="flex flex-col justify-center truncate">
                    <span className="font-bold text-[#D8DCDF] text-base truncate">
                        {merchName}
                    </span>
                    <span className="text-[#A6A6B1] text-xs truncate">
                        {variantName}
                    </span>
                    <span className="text-[#6479CB] text-lg font-bold">
                        PHP {price.toFixed(2)}
                    </span>
                </div>
            </div>
            {/* Size display */}
            <div className="w-1/6 flex items-center justify-center">
                <div className="py-2 px-4 rounded-xl text-medium text-white bg-[#7c3aed] text-xs md:text-sm uppercase">
                    {sizeName}
                </div>
            </div>
            {/* Quantity controls */}
            <div className="w-1/6 flex items-center justify-center gap-2">
                <button
                    className="px-2 py-1 rounded-l-xl bg-[#45ae95] text-white font-bold text-lg hover:bg-[#288e76] transition"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                >
                    -
                </button>
                <input
                    type="number"
                    value={quantity}
                    min={1}
                    max={merch_variant.quantity || 1}
                    onChange={(e) =>
                        handleQuantityChange(Number(e.target.value))
                    }
                    className="w-10 text-center rounded-lg bg-[#23234a] text-[#8ee6d1] text-base font-bold"
                />
                <button
                    className="px-2 py-1 rounded-r-xl bg-[#45ae95] text-white font-bold text-lg hover:bg-[#288e76] transition"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= (merch_variant.quantity || 1)}
                >
                    +
                </button>
            </div>
            {/* Subtotal */}
            <div className="w-1/6 flex items-center justify-center">
                <span className="text-[#6479CB] text-lg font-bold">
                    PHP {Number(subtotal_price).toFixed(2)}
                </span>
            </div>
        </div>
    )
}

export default ShoppingCartItem
