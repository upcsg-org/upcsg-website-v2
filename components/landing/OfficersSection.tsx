import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

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

            <div className="bg-csg-blue-400 md:w-7/12 md:min-w-96 flex flex-col gap-6 md:gap-10 p-6 md:p-16 font-vietnam text-center md:text-left">
                <h2 className="mb-4 md:mb-8 text-3xl md:text-5xl font-semibold tracking-widest">
                    KNOW YOUR OFFICERS FROM THE GUILD
                </h2>
                <h3 className="md:w-2/3 text-xl md:text-3xl font-semibold tracking-wider">
                    The Board of Directors, UPCSG '24-25
                </h3>
                <p className="md:w-2/3 tracking-wide">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <div className="text-center md:text-left md:w-fit">
                    <Link href="/" className="md:border-lg w-fit">
                        <div className="hover:-translate-y-1 duration-200 md:hover:translate-y-0 bg-csg-green-100 rounded-full uppercase text-sm px-4 py-3">
                            <p className="font-semibold">Know More →</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default OfficersSection
