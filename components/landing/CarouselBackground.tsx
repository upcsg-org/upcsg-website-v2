import React from 'react'
import Image from 'next/image'
import { LuMoveRight } from 'react-icons/lu'
import { CarouselItem } from '@/interface/carousel'

interface PropsInterface {
    currentItemIndex: number
    carouselData: CarouselItem[]
}

const CarouselBackground = (props: PropsInterface) => {
    const { currentItemIndex, carouselData } = props

    return (
        <div className="overflow-hidden relative w-full h-full ">
            <div
                className="flex transition-transform duration-700 ease-in-out relative w-full h-full"
                style={{
                    transform: `translateX(-${currentItemIndex * 100}%)`,
                }}
            >
                {carouselData.map((carousel, index) => (
                    <div
                        key={carousel.image}
                        className="w-full h-full flex-shrink-0 relative"
                    >
                        <Image
                            alt="image"
                            src={carousel.image}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black opacity-65"></div>

                        <div className="absolute top-0 left-0 w-1/5 h-full bg-gradient-to-r from-black/50 to-transparent pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-full h-1/5 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                        <div className="absolute top-0 right-0 w-1/5 h-full bg-gradient-to-l from-black/50 to-transparent pointer-events-none" />
                        <div className="absolute justify-center items-center flex flex-col w-full h-full gap-y-1">
                            {carouselData[index].title && (
                                <div className="text-xl lg:text-7xl md:text-4xl tracking-wide font-bold">
                                    <h1>{carouselData[index].title}</h1>
                                </div>
                            )}
                            {carouselData[index].subtitle && (
                                <div className="w-[70%]  text-sm md:text-xl lg:text-3xl tracking-wide  text-center overflow-hidden mb-4">
                                    <p className="hidden lg:block">
                                        {carouselData[index].subtitle.length >
                                        200
                                            ? carouselData[
                                                  index
                                              ].subtitle.substring(0, 200) +
                                              '...'
                                            : carouselData[index].subtitle}
                                    </p>
                                    <p className="block lg:hidden">
                                        {carouselData[index].subtitle.length >
                                        230
                                            ? carouselData[
                                                  index
                                              ].subtitle.substring(0, 100) +
                                              '...'
                                            : carouselData[index].subtitle}
                                    </p>
                                </div>
                            )}
                            {carouselData[index].link && (
                                <div className="flex items-center space-x-4">
                                    <a
                                        href="/about"
                                        rel="noreferrer"
                                    >
                                        <div className="bg-black/40 rounded-full py-2 px-6 border-2 md:border-4 gap-x-1 font-bold flex justify-center items-center hover:scale-110 duration-300 hover:duration-300">
                                            <div className="text-xs md:text-base flex items-center gap-x-1">
                                                Learn more
                                                <LuMoveRight className="underline decoration-1 underline-offset-2" />
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CarouselBackground
