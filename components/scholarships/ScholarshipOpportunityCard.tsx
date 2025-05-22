import React from 'react'
import Image from 'next/image'
import { Scholarship } from '@/interface/scholarship'
import { BiRightArrowAlt } from 'react-icons/bi'

interface PropsInterface extends Scholarship {}

const ScholarshipOpportunityCard = (props: PropsInterface) => {
    const articlePath = props.article
        ? `/scholarships/${props.id}`
        : props.external_url
          ? props.external_url
          : null

    const isClickable = !!articlePath

    return (
        <div
            className={`rounded-lg bg-csg-blue-400 overflow-hidden
                        my-5 mx-5 xl:my-10 xl:mx-28 ${
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
                <li>SCHOLARSHIP</li>
                <li>
                    <span className="font-bold text-base xl:text-2xl leading-none xl:leading-5 tracking-wide">
                        {props.title}
                        <br />
                    </span>
                    <span className="hidden md:block">
                        <span className="italic">Benefits: </span>
                        {props.benefits}
                    </span>
                </li>
                {isClickable && (
                    <li className="flex flex-row w-full items-center justify-center mt-4 hover:underline">
                        Learn more <BiRightArrowAlt />
                    </li>
                )}
            </ul>
        </div>
    )
}

export default ScholarshipOpportunityCard
