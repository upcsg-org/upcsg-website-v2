import { Article } from '@/interface/article'
import Image from 'next/image'
import React from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi'

const ContentListItem = (props: Article) => {
    const { title, image, date, body } = props

    const dateString = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date)

    return (
        <div className="h-64 bg-[#171A33] m-4 flex flex-row gap-4">
            <figure
                style={{ backgroundImage: `url(${image})` }}
                className="min-w-80 min-h-64 max-h-full relative object-contain m-auto"
            >
                <Image
                    fill
                    className="object-contain backdrop-blur-md max-h-full"
                    alt=""
                    src={image}
                />
            </figure>
            <div className="p-4 flex-grow">
                <h2 className="text-3xl font-bold">{title}</h2>
                <p>{dateString}</p>
                <br></br>
                <p>{body}</p>
            </div>
            <div className="h-auto px-12 flex flex-col justify-around text-4xl">
                <button>
                    <BiEdit />
                </button>
                <button>
                    <BiTrash />
                </button>
            </div>
        </div>
    )
}

export default ContentListItem
