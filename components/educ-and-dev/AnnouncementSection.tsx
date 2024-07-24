'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnnouncementCard from './AnnouncementCard'

interface AnnouncementItemProps {
    image: string
    title: string
    date: string
}

const AnnouncementSection: React.FC = () => {
    const [showAll, setShowAll] = useState(false)
    const [visibleCount, setVisibleCount] = useState(3)
    const contentRef = useRef<HTMLDivElement>(null)
    const [contentHeight, setContentHeight] = useState(0)

    const announcements: AnnouncementItemProps[] = [
        {
            image: '/images/placeholder.png',
            title: 'API Generation with Postman this Wednesday',
            date: 'September 19, 2023',
        },
        {
            image: '/images/placeholder.png',
            title: 'API Generation with Postman this Wednesday',
            date: 'September 19, 2023',
        },
        {
            image: '/images/placeholder.png',
            title: 'API Generation with Postman this Wednesday',
            date: 'September 19, 2023',
        },
        {
            image: '/images/placeholder.png',
            title: 'API Generation with Postman this Wednesday',
            date: 'September 19, 2023',
        },
        {
            image: '/images/placeholder.png',
            title: 'API Generation with Postman this Wednesday',
            date: 'September 19, 2023',
        },
        {
            image: '/images/placeholder.png',
            title: 'API Generation with Postman this Wednesday',
            date: 'September 19, 2023',
        },
    ]

    useEffect(() => {
        const updateVisibleCount = () => {
            const width = window.innerWidth
            if (width < 500) {
                setVisibleCount(1)
            } else if (width < 768) {
                setVisibleCount(2)
            } else {
                setVisibleCount(3)
            }
        }

        updateVisibleCount()
        window.addEventListener('resize', updateVisibleCount)
        return () => window.removeEventListener('resize', updateVisibleCount)
    }, [])

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight)
        }
    }, [showAll, visibleCount])

    const visibleAnnouncements = showAll
        ? announcements
        : announcements.slice(0, visibleCount)

    const handleToggle = () => {
        setShowAll(!showAll)
    }

    return (
        <div className="bg-main-dark w-full overflow-x-hidden">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-bold font-vietnam py-6 sm:py-6 text-white text-center sm:text-left">
                    RECENT NEWS AND ANNOUNCEMENTS
                </h1>
                <motion.div
                    animate={{ height: showAll ? contentHeight : 'auto' }}
                    transition={{
                        duration: 0.5,
                        ease: [0.43, 0.13, 0.23, 0.96],
                    }}
                >
                    <div ref={contentRef}>
                        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 pb-6 justify-items-center">
                            <AnimatePresence initial={false}>
                                {visibleAnnouncements.map(
                                    (announcement, index) => (
                                        <motion.div
                                            key={index}
                                            layout
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{
                                                opacity: { duration: 0.3 },
                                                scale: { duration: 0.5 },
                                                layout: { duration: 0.5 },
                                            }}
                                            className="flex justify-center"
                                        >
                                            <div className="w-full max-w-[320px]">
                                                <AnnouncementCard
                                                    {...announcement}
                                                />
                                            </div>
                                        </motion.div>
                                    )
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
                <AnimatePresence mode="wait">
                    {announcements.length > visibleCount && (
                        <motion.div
                            key="button"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="flex justify-center pb-6"
                        >
                            <button
                                className="bg-csg-green-100 text-white text-sm sm:text-md font-semibold py-2 px-5 sm:px-7 rounded-full"
                                onClick={handleToggle}
                            >
                                {showAll ? 'See less' : 'See more'}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default AnnouncementSection
