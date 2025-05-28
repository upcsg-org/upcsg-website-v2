import RowMerchCard from './RowMerchCard'
import { CartItem } from '@/interface/cart'

interface OrderedListProps {
    cartItems: CartItem[]
}

const ReciepientInformation = ({ cartItems }: OrderedListProps) => {
    return (
        <div className="flex flex-col gap-4 px-6">
            <div className="bg-[#00000C] w-full md:grid grid-cols-12 gap-4 justify-between py-2 rounded-xl font-sm lg:font-base hidden text-[#444466]">
                <h3 className="col-span-4 text-right mr-5">PRODUCT DETAILS</h3>
                <h3 className="col-span-2 text-center">SIZE</h3>
                <h3 className="col-span-2 text-center">VARIANT</h3>
                <h3 className="col-span-2 text-center">QUANTITY</h3>
                <h3 className="col-span-2 text-center">SUBTOTAL</h3>
            </div>
            <div className="flex flex-col gap-3">
                {cartItems.map((item) => (
                    <RowMerchCard
                        key={item.id}
                        productType={
                            item.merch_variant.merch?.name ||
                            item.merch_variant.name ||
                            'Unknown Product'
                        }
                        size={
                            typeof item.merch_variant.size === 'string'
                                ? item.merch_variant.size
                                : item.merch_variant.size?.name ||
                                  'Unknown Size'
                        }
                        color={item.merch_variant.name || 'Default Variant'}
                        quantity={item.quantity}
                        price={item.subtotal_price}
                        imageSrc={
                            item.merch_variant.image || '/placeholder-image.png'
                        }
                    />
                ))}
            </div>
        </div>
    )
}

export default ReciepientInformation
