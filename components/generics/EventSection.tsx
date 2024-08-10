'use client'

import React, { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EventCard from './EventCard'
import Link from 'next/link'
import { FaLongArrowAltRight } from 'react-icons/fa'
import TheButton from './TheButton'

interface EventItemProps {
    image: string
    title: string
    date: string
    time: string
    dayOfWeek: string
    backgroundStyle: string
}

const backgroundStyles = [
    'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6), rgba(65, 160, 30,0.7), rgba(65, 160, 30,1))',
    'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6), rgba(123, 0, 198,0.7), rgba(123, 0, 198,1))',
    'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6), rgba(57, 162, 174,0.7), rgba(57, 162, 174, 1))',
]

const getRandomBackgroundStyle = (): string => {
    const randomIndex = Math.floor(Math.random() * backgroundStyles.length)
    return backgroundStyles[randomIndex]
}

const EventSection: React.FC = () => {
    const [showAll, setShowAll] = useState(false)
    const [visibleEventCount, setVisibleEventCount] = useState(3)
    const contentRef = useRef<HTMLDivElement>(null)
    const [contentHeight, setContentHeight] = useState(0)

    const Events: EventItemProps[] = useMemo(
        () =>
            [
                {
                    image: '/images/placeholder.png',
                    title: 'API Generation / Postman Workshop',
                    date: 'September 20, 2023',
                    time: '8:00 AM - 11:00 AM',
                    dayOfWeek: 'Wednesday',
                },
                {
                    image: '/images/placeholder.png',
                    title: 'API Generation / Postman Workshop',
                    date: 'September 20, 2023',
                    time: '8:00 AM - 11:00 AM',
                    dayOfWeek: 'Wednesday',
                },
                {
                    image: '/images/placeholder.png',
                    title: 'API Generation / Postman Workshop',
                    date: 'September 20, 2023',
                    time: '8:00 AM - 11:00 AM',
                    dayOfWeek: 'Wednesday',
                },
                {
                    image: '/images/placeholder.png',
                    title: 'API Generation / Postman Workshop',
                    date: 'September 20, 2023',
                    time: '8:00 AM - 11:00 AM',
                    dayOfWeek: 'Wednesday',
                },
                {
                    image: '/images/placeholder.png',
                    title: 'API Generation / Postman Workshop',
                    date: 'September 20, 2023',
                    time: '8:00 AM - 11:00 AM',
                    dayOfWeek: 'Wednesday',
                },
                {
                    image: '/images/placeholder.png',
                    title: 'API Generation / Postman Workshop',
                    date: 'September 20, 2023',
                    time: '8:00 AM - 11:00 AM',
                    dayOfWeek: 'Wednesday',
                },
            ].map((event) => ({
                ...event,
                backgroundStyle: getRandomBackgroundStyle(),
            })),
        []
    )

    useEffect(() => {
        const updateVisibleEventCount = () => {
            const width = window.innerWidth
            if (width < 648) {
                setVisibleEventCount(1)
            } else if (width < 948) {
                setVisibleEventCount(2)
            } else {
                setVisibleEventCount(3)
            }
        }

        updateVisibleEventCount()
        window.addEventListener('resize', updateVisibleEventCount)
        return () =>
            window.removeEventListener('resize', updateVisibleEventCount)
    }, [])

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight)
        }
    }, [showAll, visibleEventCount])

    const visibleEvents = showAll ? Events : Events.slice(0, visibleEventCount)

    const handleToggle = () => {
        setShowAll(!showAll)
    }

    return (
        <div className="w-full overflow-x-hidden">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col gap-10">
                <h1 className="text-2xl font-bold font-vietnam text-center ms:text-left">
                    UPCOMING EVENTS
                </h1>
                <motion.div
                    animate={{ height: showAll ? contentHeight : 'auto' }}
                    transition={{
                        duration: 0.5,
                        ease: [0.43, 0.13, 0.23, 0.96],
                    }}
                >
                    <div
                        ref={contentRef}
                        className="grid grid-cols-1 ms:grid-cols-2 ls:grid-cols-3 gap-6 ms:gap-8 ls:gap-10"
                    >
                        <AnimatePresence initial={false}>
                            {visibleEvents.map((Event) => (
                                <motion.div
                                    key={Event.title + Event.date}
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
                                    <div className="w-full min-w-[300px]">
                                        <EventCard {...Event} />
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </motion.div>
                <AnimatePresence mode="wait">
                    {Events.length > visibleEventCount && (
                        <motion.div
                            key="button"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="flex justify-end gap-6"
                        >
                            <TheButton onClick={handleToggle}>
                                {showAll ? 'See less' : 'See more'}
                            </TheButton>
                            <TheButton link="/events">
                                <div className=" flex items-center justify-center gap-x-2">
                                    <p>View All Events</p>
                                    <FaLongArrowAltRight />
                                </div>
                            </TheButton>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default EventSection
