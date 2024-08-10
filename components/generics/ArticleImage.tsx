import React from 'react'
import Image from 'next/image'

export const ArticleImage = () => {
    return (
        <div className="relative w-full h-full">
            <Image
                src="/carousel/slideshow-cover.png"
                alt="temp-picture"
                fill
                className="object-cover"
            />
            <div className="absolute top-0 left-0 w-1/5 h-full bg-gradient-to-r from-black/50 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-1/5 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-1/5 h-full bg-gradient-to-l from-black/50 to-transparent pointer-events-none" />
            <div className="absolute flex flex-col bottom-20 ml-8 md:ml-16 lg:ml-28 w-[85%] gap-y-4 md:gap-y-8 tracking-widest">
                <h1 className="text-xl md:text-3xl lg:text-5xl font-semibold md:underline-offset-8 underline md:decoration-2  leading-tight">
                    API Generation with Postman workshop this Wednesday
                </h1>
                <p className="text-xs md:text-lg lg:text-xl"> July 09, 2024</p>
            </div>
        </div>
    )
}
