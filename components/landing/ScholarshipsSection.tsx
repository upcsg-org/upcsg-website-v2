import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const ScholarshipsSection = () => {
    return (
        <div className="w-full h-full bg-secondary-dark flex flex-col md:flex-row">
            <div className="flex flex-col basis-[55%] content-center justify-center p-10 md:p-4 md:pl-24 order-3 md:order-1 m-10">
                <h2 className=" text-3xl md:text-5xl font-bold tracking-widest font-vietnam text-center md:text-left pb-10">SCHOLARSHIP &<br />STUDENT OPPORTUNITIES</h2>
                <div className="flex-initial flex-col">
                    <div className="flex flex-row gap-4 md:gap-12">
                        <div className="w-1/2 md:w-1/3 flex flex-col gap-4">
                            <h3 className="text-white text-2xl md:text-3xl font-semibold font-vietnam text-center md:text-left">Scholarships<br />Available</h3>
                            <p className="text-white text-xl md:text-[22px] md:w-3/5 font-normal font-vietnam text-center md:text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fermentum sollicitudin odio sed aliquam.</p>
                            <div className="text-center md:text-left justify-self-center md:w-fit self-center md:self-start mt-auto pt-6">
                                <Link href="/" className="md:border-lg w-fit">
                                    <div className="hover:-translate-y-1 duration-200 md:hover:translate-y-0 bg-csg-green-100 rounded-full uppercase text-sm px-4 py-3 w-fit">
                                        <p className="font-semibold">Apply Now →</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="w-1/2 md:w-1/3 flex flex-col gap-4">
                            <h3 className=" text-white text-2xl md:text-3xl font-semibold font-vietnam text-center md:text-left">Internship<br />Opportunities</h3>
                            <p className=" text-white text-xl md:text-[22px] md:w-3/5 font-normal font-vietnam text-center md:text-left flex-grow">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fermentum sollicitudin odio sed aliquam.</p>
                            <div className="text-center md:text-left md:w-fit self-center md:self-start mt-auto">
                                <Link href="/" className="md:border-lg w-fit">
                                    <div className="hover:-translate-y-1 duration-200 md:hover:translate-y-0 bg-csg-green-100 rounded-full uppercase text-sm px-4 py-3 w-fit">
                                        <p className="font-semibold">Apply Now →</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="basis-[0.5%] order-2 hidden md:block shrink-2"></div>
            <div className="basis-96 flex-grow md:basis-5/12 w-full md:w-1/3 order-1 md:order-3 min-h-96 md:h-auto">
                <figure className=" relative h-full w-full object-contain bg-[url('/images/placeholder.png')]">
                    <Image
                        src="/images/placeholder.png"
                        alt="Officers Section"
                        fill
                        className="object-contain backdrop-blur-md"
                    />
                </figure>
            </div>
        </div >
    )
}

export default ScholarshipsSection
