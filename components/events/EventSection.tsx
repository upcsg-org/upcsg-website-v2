'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EventCard from './EventCard'
import { FaLongArrowAltRight } from 'react-icons/fa'
import TheButton from '../generics/TheButton'
import { useEventStore } from '@/store/event'
import { Event } from '@/interface/event'
import Loader from '@/components/ui/Loader'

const EventSection: React.FC = () => {
    const [showAll, setShowAll] = useState(false)
    const [visibleEventCount, setVisibleEventCount] = useState(3)
    const [events, setEvents] = useState<Event[]>([])
    const contentRef = useRef<HTMLDivElement>(null)
    const [contentHeight, setContentHeight] = useState(0)
    const [loading, setLoading] = useState(true)

    const { items, fetchAll } = useEventStore()

    useEffect(() => {
        const fetchEvents = async () => {
            if (fetchAll) {
                await fetchAll()
            }
        }

        try {
            setLoading(true)
            fetchEvents()
        } catch (error) {
            console.error('Error fetching events:', error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (items) {
            const sorted = [...items]
                .sort(
                    (a, b) =>
                        new Date(b.start_date!).getTime() -
                        new Date(a.start_date!).getTime()
                )
                .slice(0, 3) // or however many you want to prepare
            setEvents(sorted)
        }
    }, [items])

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
    }, [showAll, visibleEventCount, events])

    const visibleEvents = showAll ? events : events.slice(0, visibleEventCount)

    const handleToggle = () => {
        setShowAll(!showAll)
    }

    return (
        <div className="max-w-[1280px] mx-auto px-4 flex flex-col gap-10">
            <h1 className="text-2xl font-bold font-vietnam text-center ms:text-left">
                UPCOMING EVENTS
            </h1>

            {loading ? (
                <div className="flex justify-center items-center py-16">
                    <Loader
                        size="lg"
                        text="Loading events..."
                        className="text-site-main"
                        variant="spinner"
                    />
                </div>
            ) : (
                <>
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
                                {visibleEvents.map((event, index) => (
                                    <motion.div
                                        key={event.id ?? index}
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
                                        <div className="w-full min-w-[300px] max-md:flex max-md:justify-center">
                                            <EventCard {...event} />
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key="button"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="flex justify-center md:justify-end gap-6"
                        >
                            {events.length > visibleEventCount && (
                                <TheButton onClick={handleToggle}>
                                    {showAll ? 'See less' : 'See more'}
                                </TheButton>
                            )}
                            <TheButton link="/events">
                                <div className="flex items-center justify-center gap-x-2">
                                    <p>View All Events</p>
                                    <FaLongArrowAltRight />
                                </div>
                            </TheButton>
                        </motion.div>
                    </AnimatePresence>
                </>
            )}
        </div>
    )
}

export default EventSection
