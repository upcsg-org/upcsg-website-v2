import React, { useState } from 'react'
import Image from 'next/image'
import { IoClose } from 'react-icons/io5'
import { VscSparkle } from 'react-icons/vsc'

interface OrderFormProps {
    product: {
        name: string
        type: string
        price: number
        image: string
        color: string
        BestSeller: boolean
    }
    onClose: () => void
}

const OrderForm: React.FC<OrderFormProps> = ({ product, onClose }) => {
    const [quantity, setQuantity] = useState(1)
    const [size, setSize] = useState('ONE SIZE')
    const [color, setColor] = useState(product.color)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Order submitted:', { ...product, quantity, size, color })
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-main-dark text-white p-4 xs:p-6 rounded-2xl max-w-2xl w-full relative border-csg-blue-400 border-2 right-0.5">
                <button
                    onClick={onClose}
                    className="absolute top-1 right-1 xs:top-4 xs:right-4 text-white z-10"
                >
                    <IoClose size={22} />
                </button>
                <div className="flex flex-col xs:flex-row space-y-4 xs:space-y-0 xs:space-x-4">
                    <div className="w-full xs:w-1/2 bg-gray-300 rounded-2xl border-csg-blue-400 border-2 flex justify-center relative">
                        <VscSparkle className="absolute top-2 left-2 text-black text-xl xl:text-3xl" />
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={500}
                            height={500}
                            objectFit="cover"
                            className="rounded-lg xs:scale-100 lg:scale-150"
                        />
                    </div>
                    <div className="w-full xs:w-1/2 space-y-2">
                        <h2 className="text-2xl xs:text-3xl font-vietnam font-bold mb-4 flex items-center">
                            ORDER FORM
                        </h2>
                        <p className="text-csg-violet-200 font-vietnam font-extrabold flex justify-between text-xs xs:text-base">
                            PRODUCT{' '}
                            <span className="text-white text-xs xs:text-md">
                                {product.name}
                            </span>
                        </p>
                        <p className="text-csg-violet-200 font-vietnam font-extrabold flex justify-between text-xs xs:text-base">
                            CATEGORY{' '}
                            <span className="text-white">{product.type}</span>
                        </p>
                        <p className="text-csg-violet-200 font-vietnam font-extrabold flex justify-between text-xs xs:text-base">
                            PRICE{' '}
                            <span className="text-white">
                                PHP {product.price}
                            </span>
                        </p>
                        <div>
                            <p className="text-csg-violet-200 font-vietnam font-extrabold flex justify-between items-center text-xs xs:text-base">
                                SIZE{' '}
                                <select
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                    className="bg-csg-green-100 text-white rounded-2xl px-2 py-1 w-32 xs:w-32 text-xs"
                                >
                                    <option>ONE SIZE</option>
                                </select>
                            </p>
                        </div>
                        <div>
                            <p className="text-csg-violet-200 font-vietnam font-extrabold flex justify-between items-center text-xs xs:text-base">
                                COLOR
                                <select
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="bg-csg-green-100 text-white rounded-2xl px-2 py-1 w-32 xs:w-32 text-xs"
                                >
                                    <option>{product.color}</option>
                                </select>
                            </p>
                        </div>
                        <div>
                            <p className="flex text-csg-violet-200 font-vietnam font-extrabold justify-between items-center text-xs xs:text-base">
                                QUANTITY
                                <div className="flex items-center bg-csg-green-100 rounded-2xl w-24">
                                    <button
                                        onClick={() =>
                                            setQuantity(
                                                Math.max(1, quantity - 1)
                                            )
                                        }
                                        className="px-2 py-1 text-white"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) =>
                                            setQuantity(Number(e.target.value))
                                        }
                                        min="1"
                                        className="w-12 xs:w-12 text-center rounded-2xl bg-[#75C756] text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-xs"
                                    />
                                    <button
                                        onClick={() =>
                                            setQuantity(quantity + 1)
                                        }
                                        className="px-2 py-1 text-white"
                                    >
                                        +
                                    </button>
                                </div>
                            </p>
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="mt-4 bg-csg-orange-100 text-csg-orange-200 font-vietnam font-bold text-xs px-4 py-2 rounded-2xl w-full hover:bg-orange-600"
                        >
                            ADD TO SHOPPING BAG
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderForm
