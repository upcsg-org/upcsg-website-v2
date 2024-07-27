import React from 'react'
import Image from 'next/image'
import { BiRightArrowAlt } from 'react-icons/bi'

interface PropsInterface {
    title: string
    dateOfPosting: Date
    imageURL: string
}

function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }

    return date.toLocaleDateString('en-US', options)
}

const InternshipOpportunityCard = (props: PropsInterface) => {
    const formattedDate = formatDate(props.dateOfPosting)
    return (
        <div
            className="bg-csg-blue-400 overflow-hidden
                        my-5 mx-5 xl:my-10 xl:mx-28 
                        hover:scale-[1.02] hover:bg-csg-blue-600/50 duration-200 cursor-pointer"
        >
            <div className="w-full h-48 xl:h-64 relative">
                <Image
                    src={props.imageURL}
                    alt="Background"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <ul
                className="flex flex-col font-vietnam font-light text-white tracking-widest
                            p-5 lg:p-10 text-sm xl:text-lg leading-6 gap-2"
            >
                <li>ANNOUNCEMENT</li>
                <li className="font-bold text-base xl:text-2xl leading-3 xl:leading-5 tracking-wide">
                    {props.title}
                </li>
                <li>{formattedDate}</li>
            </ul>
        </div>
    )
}

export default InternshipOpportunityCard
