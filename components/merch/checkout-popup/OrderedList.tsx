import RowMerchCard from "./RowMerchCard"
import { MerchItem } from "@/interface/merch"

interface OrderedListProps {
    merchItems: MerchItem[];
}

const ReciepientInformation = ({ merchItems }: OrderedListProps) => {
    return (
        <div className='flex flex-col gap-4 px-6'>
            <div className="bg-[#00000C] w-full md:grid grid-cols-12 gap-4 justify-between py-2 rounded-xl font-sm lg:font-base hidden text-[#444466]">
                <h3 className="col-span-4 text-right mr-5">PRODUCT DETAILS</h3>
                <h3 className='col-span-2 text-center'>SIZE</h3>
                <h3 className='col-span-2 text-center'>COLOR</h3>
                <h3 className='col-span-2 text-center'>QUANTITY</h3>
                <h3 className='col-span-2 text-center'>ORDER TOTAL</h3>
            </div>
            <div className="flex flex-col gap-3">
                {merchItems.map((item, index) => (
                    <RowMerchCard
                        key={index}
                        productType={item.name}
                        size={item.sizes[0].text}
                        color={item.colors[0].name}
                        quantity={1}
                        price={item.price}
                        imageSrc={item.images[0]}
                    />
                ))}
            </div>
        </div>
    )
}

export default ReciepientInformation
