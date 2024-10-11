"use client";

import { Article } from '@/interface/article'
import Image from 'next/image'
import React, { useState } from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi'

const ContentListItem = (props: Article) => {
    const { title, image, date, body } = props

    const dateString = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date)

    const [isButtonHovered, setIsButtonHovered] = useState(false);

    return (
        <div
            className={`h-auto sm:h-64 bg-[#171A33] m-4 flex flex-col sm:flex-row gap-4 transition-colors duration-300 ${!isButtonHovered ? 'hover:bg-white/10' : ''}`}
        >
            <figure
                style={{ backgroundImage: `url(${image})` }}
                className="min-h-64 sm:min-w-80 max-h-full relative object-contain m-auto w-full sm:w-auto"
            >
                <Image
                    fill
                    className="object-contain backdrop-blur-md max-h-full"
                    alt=""
                    src={image}
                />
            </figure>
            <div className="p-4 flex-grow">
                <h2 className="text-xl sm:text-3xl font-bold line-clamp-1">{title}</h2>
                <p className="text-sm sm:text-base">{dateString}</p>
                <br></br>
                <p className="text-sm sm:text-base line-clamp-3">{body}</p>
            </div>
            <div className="h-auto px-6 sm:px-12 flex flex-row sm:flex-col justify-around text-3xl sm:text-4xl">
                <button
                    onMouseEnter={() => setIsButtonHovered(true)}
                    onMouseLeave={() => setIsButtonHovered(false)}
                    className="transition-transform transition-colors duration-150 ease-in-out hover:scale-110 hover:text-green-500"
                >
                    <BiEdit />
                </button>
                <button
                    onMouseEnter={() => setIsButtonHovered(true)}
                    onMouseLeave={() => setIsButtonHovered(false)}
                    className="transition-transform transition-colors duration-150 ease-in-out hover:scale-110 hover:text-green-500"
                >
                    <BiTrash />
                </button>
            </div>
        </div>
    )
}

export default ContentListItem;
