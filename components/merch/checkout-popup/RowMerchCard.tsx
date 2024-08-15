import Image from 'next/image';

interface RowMerchCardProps {
    productType: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
    imageSrc: string;
}

const RowMerchCard: React.FC<RowMerchCardProps> = ({ productType, size, color, quantity, price, imageSrc }) => {
    return (
        <div className="grid md:grid-cols-12 grid-cols-1 gap-2 md:gap-4 rounded-2xl border-[3px] border-csg-violet-200 text-sm lg:text-base items-center py-2">
            <div className='flex flex-row items-center mb-0 md:mb-2 mt-2 ml-2 md:col-span-4 col-span-1'>
                <div className='relative w-20 h-20 bg-white rounded-2xl'>
                    <Image
                        src={imageSrc}
                        alt='Merch'
                        layout='fill'
                        objectFit='cover'
                        className='p-2'
                    />
                </div>
                <div className="flex flex-col ml-2 gap-2">
                    <div className='flex flex-col'>
                        <p className='font-bold tracking-wide text-white'>NAME OF PRODUCT</p>
                        <p className='text-sm text-[#A6A6B1]'>{productType}</p>
                    </div>
                    <p className='text-[#6479CB] text-lg'>PHP {price}</p>
                </div>
            </div>

            <div className='md:text-center md:col-span-2 col-span-1 ml-24 md:ml-0 text-[#A6A6B1] tracking-widest'>
                <p><span className='md:hidden mr-3 font-thin tracking-wide'>SIZE:</span>{size}</p>
            </div>

            <div className='md:text-center md:col-span-2 col-span-1 ml-24 md:ml-0 text-[#A6A6B1] tracking-wider'>
                <p><span className='md:hidden mr-3 font-thin tracking-wide'>COLOR:</span>{color}</p>
            </div>

            <div className='md:text-center md:col-span-2 col-span-1 ml-24 md:ml-0 text-[#A6A6B1] tracking-wider'>
                <p><span className='md:hidden mr-3 font-thin tracking-wide'>QUANTITY:</span>{quantity}</p>
            </div>

            <div className='md:text-center md:col-span-2 col-span-1 ml-24 md:ml-0 text-[#A6A6B1] tracking-wider'>
                <p><span className='md:hidden mr-3 font-thin tracking-wide'>ORDER TOTAL:</span>PHP {quantity * price}</p>
            </div>
        </div>
    );
}

export default RowMerchCard;
