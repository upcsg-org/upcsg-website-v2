import React from 'react'
import Image from 'next/image'
import { BsXLg } from 'react-icons/bs'
import { ShoppingCartItem as ShoppingCartItemInterface } from '@/interface/cart'

interface PropsInterface {
    item: ShoppingCartItemInterface
}

const ShoppingCartItem = (props: PropsInterface) => {
    const { item } = props
    const { id, merch, colorChoice, sizeChoice, quantity } = item
    const { name, type, price, images, sizes, colors } = merch

    const handleToggle = () => {}

    return (
        // whole
        <div className="min-w-4 flex flex-row items-center gap-1 ps:gap-2 md:gap-4 overflow-hidden">
            {/*button*/}
            <button
                onClick={handleToggle}
                className={`w-[16px] ps:w-[24px] md:w-[35px] aspect-square rounded-full border-2 md:border-4 border-[#171745] flex shrink-0 cursor-pointer items-center justify-center bg-[#2929b7]`}
            />
            {/*outline*/}
            <div className="min-w-4 flex flex-row gap-4 md:gap-8 border rounded-lg p-3 items-left w-full mb-2 mt-2">
                {/*info and select*/}
                <div className="min-w-4 w-full flex flex-col md:flex-row gap-4 md:gap-0">
                    {/*image and info*/}
                    <div className="flex min-w-4 md:w-64 h-full shrink">
                        {/*image*/}
                        <div className="w-16 aspect-square relative shrink-0">
                            <Image
                                src={images[0]}
                                alt="Background"
                                layout="fill"
                                objectFit="cover"
                                className="opacity-100 bg-[#d8dcdf] rounded-lg"
                            />
                        </div>
                        {/*info*/}
                        <div className="min-w-4 shrink md:w-36 flex flex-col truncate text-ellipsis">
                            <ul className="gap-4 tracking-wider px-1">
                                <li className="min-w-4 shrink font-bold text-[#D8DCDF] text-sm xl:text-xl truncate text-ellipsis">
                                    {name}
                                </li>
                                <li className="min-w-4 text-[#A6A6B1] text-sm xl:text-base truncate text-ellipsis">
                                    {type.text}
                                </li>
                                <li className="min-w-4 text-[#6479CB] text-sm xl:text-2xl truncate text-ellipsis">
                                    PHP {price}
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/*select*/}
                    <div className="flex w-50 grow md:w-1/2 flex-row gap-2 md:gap-10">
                        {/*size */}
                        <select
                            value={sizeChoice.text}
                            onChange={(e) => {
                                const selectedSize = sizes.find(
                                    (s) => s.text === e.target.value
                                )
                                if (selectedSize) {
                                    // create function that updates the cart item size
                                }
                            }}
                            className="py-2 md:p-2 border-0 rounded-xl text-medium text-[#380557] h-fit bg-csg-violet-100 w-1/4 flex grow md:w-1/6 uppercase truncate text-xs md:text-sm focus:outline-none border-r-4 border-transparent"
                        >
                            {sizes.map((size) => (
                                <option key={size.text} value={size.text}>
                                    {size.text}
                                </option>
                            ))}
                        </select>
                        {/*color*/}
                        <select
                            value={colorChoice.name}
                            onChange={(e) => {
                                const selectedColor = colors.find(
                                    (c) => c.name === e.target.value
                                )
                                if (selectedColor) {
                                    // create function that updates the cart item color
                                }
                            }}
                            className="py-2 md:p-2 border-0 rounded-xl text-[#7f2307] h-fit bg-[#ee6c45] w-1/4 md:w-1/4 flex grow uppercase truncate text-xs md:text-sm focus:outline-none border-r-4 border-transparent"
                        >
                            {colors.map((color) => (
                                <option key={color.name} value={color.name}>
                                    {color.name}
                                </option>
                            ))}
                        </select>
                        {/*quantity*/}
                        <div className="w-1/6 flex items-center h-fit">
                            <button className="-mr-2 pr-3 px-2 py-2 rounded-l-xl hover:bg-gray-300 bg-[#45ae95] z-0 text-[#1d594b] text-xs md:text-sm">
                                -
                            </button>
                            <input
                                type="string"
                                value={quantity}
                                className="w-6 md:w-8 h-fit py-1 text-center rounded-lg bg-[#288e76] z-10 text-[#8ee6d1] text-xs md:text-sm pt-2 pb-2 shrink"
                            />
                            <button className="-ml-2 px-2 py-2 pl-3 bg-[#45ae95] rounded-r-xl hover:bg-gray-300 z-0 text-[#1d594b] text-xs md:text-sm">
                                +
                            </button>
                        </div>
                    </div>
                </div>
                <button className="text-2xl text-center bold ml-auto">
                    <BsXLg />
                </button>
            </div>
        </div>
    )
}

export default ShoppingCartItem
