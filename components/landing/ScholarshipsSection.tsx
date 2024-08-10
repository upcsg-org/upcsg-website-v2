import React from 'react'
import Image from 'next/image'
import { FaLongArrowAltRight } from 'react-icons/fa'
import TheButton from '../generics/TheButton'

const ScholarshipsSection = () => {
    return (
        <div className="flex flex-col basis-96 md:flex-row bg-[#1E2546]">
            <div className="flex flex-col basis-[65%] p-6 md:p-16 order-2 md:order-1 gap-6">
                <h2 className="text-3xl md:text-5xl font-bold tracking-widest font-vietnam text-center md:text-left pb-4 md:pb-8">
                    SCHOLARSHIP &<br />
                    STUDENT OPPORTUNITIES
                </h2>
                <div className="flex flex-col md:flex-row items-start gap-10 md:gap-0">
                    <div className="w-full h-full md:w-1/2 flex flex-col justify-between items-center md:items-start gap-6 grow">
                        <h3 className="text-white text-xl md:text-3xl font-semibold font-vietnam text-center md:text-left">
                            {'Scholarships '}
                            <br className="hidden md:inline" />
                            Available
                        </h3>
                        <p className="text-white md:w-4/5 font-normal text-center md:text-left">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit.
                        </p>
                        <TheButton
                            link="/scholarships"
                            style="flex gap-2 items-center w-fit"
                        >
                            <p>Apply Now</p>
                            <FaLongArrowAltRight />
                        </TheButton>
                    </div>
                    <div className="w-full h-full md:w-1/2 flex flex-col justify-between items-center md:items-start gap-6 grow">
                        <h3 className="text-white text-xl md:text-3xl font-semibold font-vietnam text-center md:text-left">
                            {'Internship '}
                            <br className="hidden md:inline" />
                            Opportunities
                        </h3>
                        <p className=" text-white md:w-4/5 font-normal font-vietnam text-center md:text-left">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nullam fermentum sollicitudin odio sed
                            aliquam.
                        </p>
                        <TheButton
                            link="/internships"
                            style="flex gap-2 items-center w-fit"
                        >
                            <p>Apply Now</p>
                            <FaLongArrowAltRight />
                        </TheButton>
                    </div>
                </div>
            </div>
            <figure className="min-h-96 md:w-5/12 relative object-contain bg-[url('/images/placeholder.png')] order-1 md:order-2">
                <Image
                    src="/images/placeholder.png"
                    alt="Faculty Section"
                    fill
                    className="object-contain backdrop-blur-md"
                />
            </figure>
        </div>
    )
}

export default ScholarshipsSection
