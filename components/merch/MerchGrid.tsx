'use client'
import { useState, useEffect, useRef } from 'react'
import React from 'react'
import Link from 'next/link'
import MerchCard from './MerchCard'
import { AiOutlineArrowUp, AiOutlineEye } from 'react-icons/ai'

const testValues = [
    {
        name: 'Sample Tote Bag 1',
        type: 'TOTE BAG',
        price: 29.99,
        images: [
            '/logo/upcsg-logo.png',
            '/title_header.png',
            '/logo/upcsg-logo.png',
        ],
        colors: ['#FF0000', '#00FF00', '#0000FF'],
        isBestSeller: true,
    },
    {
        name: 'Sample Tote Bag 2',
        type: 'TOTE BAG',
        price: 29.99,
        images: ['/logo/upcsg-logo.png', '/title_header.png'],
        colors: ['#FF0000', '#0000FF'],
        isBestSeller: false,
    },
    {
        name: 'Sample Tote Bag 3',
        type: 'TOTE BAG',
        price: 5.25,
        images: [
            '/logo/upcsg-logo.png',
            '/title_header.png',
            '/logo/upcsg-logo.png',
        ],
        colors: ['#111120', '#41A01E', '#FFFFFF'],
        isBestSeller: true,
    },
]

const MerchGrid = () => {
    const [isFullyVisible, setIsFullyVisible] = useState(false)
    const gridRef = useRef<HTMLDivElement>(null)

    const handleScroll = () => {
        if (!gridRef.current) return
        const rect = gridRef.current.getBoundingClientRect()
        const fullyVisible =
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <=
                (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <=
                (window.innerWidth || document.documentElement.clientWidth)
        setIsFullyVisible(fullyVisible)
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                handleScroll()
            } else {
                setIsFullyVisible(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', handleResize)

        handleResize() // Check on initial load

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div
            ref={gridRef}
            className="gap-2 lg:gap-1 w-full text-site-main grid grid-cols-2 lg:grid-cols-3 items-center justify-around"
        >
            {testValues.map((item, index) => (
                <MerchCard
                    key={index}
                    name={item.name}
                    type={item.type}
                    price={item.price}
                    images={item.images}
                    colors={item.colors}
                    isBestSeller={item.isBestSeller}
                />
            ))}
            {isFullyVisible && (
                <Link
                    href="/merch/#merchFilters"
                    className="fixed flex items-center bottom-4 
                    lg:bottom-12 right-4 lg:right-12 p-2 lg:p-4 bg-csg-green-100 hover:bg-csg-green-200 text-white 
                    rounded-lg text-base lg:text-xl gap-2 z-10 tracking-wide"
                >
                    <AiOutlineArrowUp />
                    Return to Filters
                </Link>
            )}
        </div>
    )
}

export default MerchGrid
