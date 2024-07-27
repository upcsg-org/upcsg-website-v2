import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Sponsor {
    name: string
    logo: string
    url: string
}

const DiamondSponsors: Sponsor[] = [
    {
        name: 'Diamond Sponsor',
        logo: '/logo/upcsg-logo.png',
        url: 'www.google.com',
    },
    {
        name: 'Longer Diamond Sponsor Name',
        logo: '/logo/upcsg-logo.png',
        url: 'www.google.com',
    },
]

const GoldSponsors: Sponsor[] = [
    {
        name: 'Gold Sponsor',
        logo: '/logo/upcsg-logo.png',
        url: 'www.google.com',
    },
    {
        name: 'Gold Sponsor Name',
        logo: '/logo/upcsg-logo.png',
        url: 'www.google.com',
    },
]

function MerchSponsors() {
    return (
        <div className="flex flex-col w-full p-4 xl:pt-12 lg:pl-10 xl:pl-24">
            <p className="text-lg xl:text-3xl tracking-wider font-bold text-white">
                SPONSORS
            </p>
            <div className="flex flex-col bg-black text-sm xl:text-xl rounded-lg p-3 mt-2 xl:mt-4">
                <ul className="flex flex-col text-white font-normal gap-2">
                    {DiamondSponsors.map((sponsor, index) => (
                        <Link key={index} href={sponsor.url}>
                            <li className="flex flex-row items-center gap-4 hover:bg-csg-blue-600/25 duration-150">
                                <div className="flex items-center justify-center w-1/6 xl:w-1/4">
                                    <div className="w-10 h-10 relative hover:scale-110 duration-200">
                                        <Image
                                            src={sponsor.logo}
                                            alt="logo"
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                </div>

                                <p className="w-5/6 xl:w-3/4 text-white cursor-pointer gap-10 decoration-csg-gray-100 hover:text-white/75 underline break-words text-justify flex-grow leading-4 xl:leading-5">
                                    {sponsor.name}
                                </p>
                            </li>
                        </Link>
                    ))}
                    <hr></hr>
                    {GoldSponsors.map((sponsor, index) => (
                        <Link key={index} href={sponsor.url}>
                            <li className="flex flex-row items-center gap-4 hover:bg-csg-blue-600/25 duration-150">
                                <div className="flex items-center justify-center w-1/6 xl:w-1/4">
                                    <div className="w-7 h-7 relative hover:scale-110 duration-200">
                                        <Image
                                            src={sponsor.logo}
                                            alt="logo"
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                </div>

                                <p className="w-5/6 xl:w-3/4 text-white cursor-pointer gap-10 decoration-csg-gray-100 hover:text-white/75 underline break-words text-justify flex-grow leading-3 xl:leading-5">
                                    {sponsor.name}
                                </p>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default MerchSponsors
