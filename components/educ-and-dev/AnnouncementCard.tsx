'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AnnouncementItemProps {
    image: string
    title: string
    date: string
}

const AnnouncementItem: React.FC<AnnouncementItemProps> = ({
    image,
    title,
    date,
}) => {
    return (
        <motion.button
            className="bg-[#2C3264] overflow-hidden w-full max-w-64 h-80 text-left"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            <img src={image} alt={title} className="w-full h-40 object-cover" />
            <div className="p-3 relative h-40">
                <h2 className="text-base font-thin font-vietnam mb-1 text-white">
                    ANNOUNCEMENT
                </h2>
                <p className="text-base font-semibold mb-1 text-white">
                    {title}
                </p>
                <p className="text-base text-white absolute bottom-4">{date}</p>
            </div>
        </motion.button>
    )
}

const AnnouncementCard: React.FC = () => {
    const [showAll, setShowAll] = useState(false)
    const [visibleCount, setVisibleCount] = useState(3)
    const contentRef = useRef<HTMLDivElement>(null)
    const [contentHeight, setContentHeight] = useState(0)

    const announcements: AnnouncementItemProps[] = [
        {
            image: '/images/temp.jpg',
            title: 'API Generation with Postman this Wednesday',
            date: 'September 19, 2023',
        },
        {
            image: '/images/temp.jpg',
            title: 'API Generation with Postman this Wednesday',
            date: 'September 19, 2023',
        },
        {
            image: '/images/temp.jpg',
            title: 'API Generation with Postman this Wednesday',
            date: 'September 19, 2023',
        },
        {
            image: '/images/temp.jpg',
            title: 'API Generation with Postman this Wednesday',
            date: 'September 19, 2023',
        },
        {
            image: '/images/temp.jpg',
            title: 'API Generation with Postman this Wednesday',
            date: 'September 19, 2023',
        },
        {
            image: '/images/temp.jpg',
            title: 'API Generation with Postman this Wednesday',
            date: 'September 19, 2023',
        },
    ]

    useEffect(() => {
        const updateVisibleCount = () => {
            const width = window.innerWidth
            if (width < 768) {
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
            <div className="max-w-[1280px] mx-auto">
                <h1 className="text-2xl font-bold font-vietnam py-6 text-white pl-4 md:pl-2">
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
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10 pb-6 justify-items-center px-4 md:px-0">
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
                                            className="min-w-0"
                                        >
                                            <AnnouncementItem
                                                {...announcement}
                                            />
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
                                className="bg-[#1ea637] text-white text-md font-semibold py-2 px-7 rounded-full"
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

export default AnnouncementCard
