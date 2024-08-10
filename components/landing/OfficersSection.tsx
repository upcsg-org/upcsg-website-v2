import React from 'react'
import Image from 'next/image'
import { FaLongArrowAltRight } from 'react-icons/fa'
import TheButton from '../generics/TheButton'

const OfficersSection = () => {
    return (
        <div className="flex flex-col basis-96 md:flex-row w-full">
            <figure className="min-h-96 md:w-5/12 relative object-contain bg-[url('/images/placeholder.png')]">
                <Image
                    src="/images/placeholder.png"
                    alt="Officers Section"
                    fill
                    className="object-contain backdrop-blur-md"
                />
            </figure>

            <div className="bg-csg-blue-400 md:w-7/12 md:min-w-96 flex flex-col items-center md:items-start gap-6 md:gap-10 p-6 md:p-16 font-vietnam text-center md:text-left">
                <h2 className="mb-4 md:mb-8 text-3xl md:text-5xl font-semibold tracking-widest">
                    KNOW YOUR OFFICERS FROM THE GUILD
                </h2>
                <h3 className="md:w-2/3 text-xl md:text-3xl font-semibold tracking-wider">
                    The Board of Directors, UPCSG &apos;24-25
                </h3>
                <p className="md:w-2/3 tracking-wide">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <TheButton
                    link="/officers"
                    style="flex justify-center gap-x-2 w-fit"
                >
                    <span>Know More</span>
                    <FaLongArrowAltRight />
                </TheButton>
            </div>
        </div>
    )
}

export default OfficersSection
