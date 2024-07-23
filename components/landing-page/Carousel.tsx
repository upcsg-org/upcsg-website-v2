'use client'
import React, { useState, useEffect, useRef } from 'react'
import CarouselBackground from './CarouselBackground'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const images = ['/carousel/slideshow-cover.png', '/images/footer-bg.png']
const news = [
    {
        title: 'PADAYON KOMSAI',
        description:
            'The University of the Philippines CoThe University of the The University of the Philippines CoPhilippines CoThe University of the Philippines CoThe UniveThe University of the Philippines Corsity of the Philippines CoThe University of the Philippines Computer Science Guild is porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
        link: '',
    },
    {
        title: 'PADAYON KOMSAI 2',
        description: 'KOMSAI KOMSAI KOMSAI',
        link: '',
    },
]

export const Carousel = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [translateX, setTranslateX] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
        }, 6000)

        return () => clearInterval(timer)
    }, [currentImageIndex])

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }

    const handlePrev = () => {
        setCurrentImageIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length
        )
    }

    const handleSelect = (index: number) => {
        setCurrentImageIndex(index)
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true)
        setStartX(e.touches[0].clientX)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return
        const currentX = e.touches[0].clientX
        setTranslateX(currentX - startX)
    }

    const handleTouchEnd = () => {
        setIsDragging(false)
        if (translateX > 50) {
            handlePrev()
        } else if (translateX < -50) {
            handleNext()
        }
        setTranslateX(0)
    }

    return (
        <section
            className="h-full flex flex-col grow font-vietnam relative "
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <CarouselBackground
                currentImageIndex={currentImageIndex}
                news={news}
                images={images}
            />

            <div
                className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer hover:scale-125 duration-300 hidden md:block"
                onClick={handleNext}
            >
                <FaChevronRight size={30} />
            </div>
            <div
                className="absolute left-5 top-1/2 transform -translate-y-1/2 cursor-pointer hover:scale-125 duration-300 hidden md:block"
                onClick={handlePrev}
            >
                <FaChevronLeft size={30} />
            </div>
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex flex-row space-x-1">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`rounded-full w-3 h-3 border cursor-pointer ${currentImageIndex === index ? 'bg-white' : ''}`}
                        onClick={() => handleSelect(index)}
                    />
                ))}
            </div>
        </section>
    )
}
