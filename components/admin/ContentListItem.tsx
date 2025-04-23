'use client'

import { Article } from '@/interface/article'
import { Event } from '@/interface/event'
import Image from 'next/image'
import React, { useState } from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi'

interface ContentListItemProps {
    id: number
    title: string
    image_url?: string
    date_created: Date | string
    body: string
    author?: string
}

const ContentListItem = (props: ContentListItemProps) => {
    const { title, image_url, date_created, body } = props
    const formattedDate =
        date_created instanceof Date
            ? date_created.toLocaleDateString()
            : typeof date_created === 'string'
              ? new Date(date_created).toLocaleDateString()
              : 'No date'

    const [isButtonHovered, setIsButtonHovered] = useState(false)
    const defaultImage = '/images/placeholder.jpg'

    return (
        <div
            className={`h-auto sm:h-64 bg-[#171A33] m-4 flex flex-col sm:flex-row gap-4 transition-colors duration-300 ${!isButtonHovered ? 'hover:bg-white/10' : ''}`}
        >
            <figure
                style={{ backgroundImage: `url(${image_url || defaultImage})` }}
                className="min-h-64 sm:min-w-80 max-h-full relative object-contain m-auto w-full sm:w-auto"
            >
                <Image
                    fill
                    className="object-contain backdrop-blur-md max-h-full"
                    alt={title}
                    src={image_url || defaultImage}
                />
            </figure>
            <div className="p-4 flex-grow">
                <h2 className="text-xl sm:text-3xl font-bold line-clamp-1">
                    {title}
                </h2>
                <p className="text-sm sm:text-base">{formattedDate}</p>
                <br></br>
                <p className="text-sm sm:text-base line-clamp-3">{body}</p>
            </div>
            <div className="h-auto px-6 sm:px-12 flex flex-row sm:flex-col justify-around text-2xl sm:text-4xl">
                <button
                    onMouseEnter={() => setIsButtonHovered(true)}
                    onMouseLeave={() => setIsButtonHovered(false)}
                    className="transition-transform transition-colors duration-150 ease-in-out hover:scale-110 hover:text-green-500 pb-6 sm:pb-0"
                >
                    <BiEdit className="h-8 w-8 sm:h-10 sm:w-10" />
                </button>
                <button
                    onMouseEnter={() => setIsButtonHovered(true)}
                    onMouseLeave={() => setIsButtonHovered(false)}
                    className="transition-transform transition-colors duration-150 ease-in-out hover:scale-110 hover:text-green-500 pb-6 sm:pb-0"
                >
                    <BiTrash className="h-8 w-8 sm:h-10 sm:w-10" />
                </button>
            </div>
        </div>
    )
}

export default ContentListItem
