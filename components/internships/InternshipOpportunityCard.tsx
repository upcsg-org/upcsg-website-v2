import React from 'react'
import Image from 'next/image'
import { Internship } from '@/interface/internship'

interface PropsInterface extends Internship {}

const InternshipOpportunityCard = (props: PropsInterface) => {
    const articlePath = props.article
        ? `/internships/${props.id}`
        : props.external_url
          ? props.external_url
          : null

    const isClickable = !!articlePath

    return (
        <div
            className={`bg-csg-blue-400 overflow-hidden
                        my-5 mx-5 xl:my-10 xl:mx-28 
                        ${
                            isClickable
                                ? 'cursor-pointer hover:scale-[1.02] hover:bg-csg-blue-600/50 duration-200'
                                : 'cursor-default'
                        }`}
            onClick={() => {
                if (isClickable && articlePath) {
                    window.location.href = articlePath
                }
            }}
        >
            <div className="w-full h-48 xl:h-64 relative">
                <Image
                    src={props.image_url ?? '/images/placeholder-standard.svg'}
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
                <li className="font-bold text-base xl:text-2xl leading-4 xl:leading-5 tracking-wide">
                    {props.title}
                </li>
                <li>{props.opening_date}</li>
            </ul>
        </div>
    )
}

export default InternshipOpportunityCard
