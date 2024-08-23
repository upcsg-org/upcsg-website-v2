import React from 'react'
import Image from 'next/image'
import { FaLongArrowAltRight } from 'react-icons/fa'
import TheButton from '../generics/TheButton'

const OfficersSection = () => {
    return (
        <div className="flex flex-col basis-96 md:flex-row w-full">
            <figure className="min-h-96 md:w-5/12 relative object-contain bg-[url('https://res.cloudinary.com/dc7anycov/image/upload/v1723340964/execom_okzenh.png')]">
                <Image
                    src="https://res.cloudinary.com/dc7anycov/image/upload/v1723340964/execom_okzenh.png"
                    alt="Officers Section"
                    fill
                    className="object-contain backdrop-blur-md"
                />
            </figure>

            <div className="bg-csg-blue-400 md:w-7/12 md:min-w-96 flex flex-col items-center md:items-start gap-6 md:gap-10 p-6 md:p-16 font-vietnam text-center md:text-left">
                <h2 className="mb-4 md:mb-8 text-md md:text-5xl font-semibold tracking-widest">
                    KNOW YOUR OFFICERS FROM THE GUILD
                </h2>
                <h3 className="md:w-2/3 text-sm md:text-3xl font-semibold tracking-wider">
                    The Board of Directors, UPCSG &apos;24-25
                </h3>
                <p className="md:w-2/3 tracking-wide max-sm:text-xs">
                    The Executive Committee consists of elected guilders who are
                    dedicated to serving the UPCSG community. Their role is to
                    lead, represent, and uphold the values of the organization,
                    ensuring that the voices of the members are heard and their
                    needs are met. Through their leadership, they strive to
                    enhance the overall experience of guilders and promote a
                    collaborative and inclusive environment.
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
