import React from 'react'
import Image from 'next/image'
import { LuMoveRight } from 'react-icons/lu'

interface News {
    title: string
    description: string
    link: string
}

interface CarouselBackgroundProps {
    news: News[]
    currentImageIndex: number
    images: string[]
}

const CarouselBackground: React.FC<CarouselBackgroundProps> = ({
    news,
    images,
    currentImageIndex,
}) => {
    return (
        <div className="overflow-hidden relative w-full h-full ">
            <div
                className="flex transition-transform duration-700 ease-in-out relative w-full h-full"
                style={{
                    transform: `translateX(-${currentImageIndex * 100}%)`,
                }}
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="w-full h-full flex-shrink-0 relative"
                    >
                        <Image
                            alt="image"
                            src={image}
                            fill
                            className="object-cover"
                        />

                        <div className="absolute top-0 left-0 w-1/5 h-full bg-gradient-to-r from-black/50 to-transparent pointer-events-none" />
                        <div className="absolute top-0 right-0 w-1/5 h-full bg-gradient-to-l from-black/50 to-transparent pointer-events-none" />
                        <div className="absolute justify-center items-center flex flex-col w-full h-full gap-y-1">
                            <div className="text-2xl lg:text-7xl md:text-4xl tracking-wide font-bold">
                                <h1>{news[index].title}</h1>
                            </div>
                            <div className="w-[70%]  text-sm md:text-xl lg:text-3xl tracking-wide  text-center overflow-hidden mb-4">
                                <p className="hidden lg:block">
                                    {news[index].description.length > 200
                                        ? news[index].description.substring(
                                              0,
                                              200
                                          ) + '...'
                                        : news[index].description}
                                </p>
                                <p className="block lg:hidden">
                                    {news[index].description.length > 230
                                        ? news[index].description.substring(
                                              0,
                                              100
                                          ) + '...'
                                        : news[index].description}
                                </p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <a href={news[index].link} className="">
                                    <div className="bg-black/40 rounded-full py-2 px-6 border-4 gap-x-1 font-bold flex justify-center items-center hover:scale-110 duration-300 hover:duration-300">
                                        <div className="text-xs md:text-base border-b-1 border-white flex items-center gap-x-1 border-b-[1px]">
                                            Read more
                                            <LuMoveRight className="underline decoration-1 underline-offset-2" />
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CarouselBackground
