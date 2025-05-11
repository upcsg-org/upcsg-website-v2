'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EventCard from './EventCard'
import { useEventStore } from '@/store/event'
import { Event } from '@/interface/event'

const EventPage: React.FC = () => {
    const { items, loading, error, fetchAll } = useEventStore()

    useEffect(() => {
        fetchAll?.()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const today = new Date()

    const getEndOrStartDate = (event: Event) => {
        if (event.end_date) return new Date(event.end_date)
        if (event.start_date) return new Date(event.start_date)
        return null
    }

    const upcomingEvents = items.filter((event) => {
        const date = getEndOrStartDate(event)
        return date ? date >= today : false
    })

    const concludedEvents = items.filter((event) => {
        const date = getEndOrStartDate(event)
        return date ? date < today : false
    })

    return (
        <div className="w-full overflow-x-hidden pt-12 pb-20 md:pt-24 md:pb-40">
            <div className="max-w-[1280px] mx-auto sm:px-6 md:px-8 flex flex-col gap-16 sm:gap-20">
                {/* --- UPCOMING EVENTS --- */}
                {upcomingEvents.length > 0 && (
                    <section className="flex flex-col gap-6 sm:gap-10">
                        <h2 className="px-4 text-lg sm:text-2xl font-bold font-vietnam">
                            UPCOMING EVENTS
                        </h2>
                        <motion.div
                            className="grid grid-cols-1 ms:grid-cols-2 ls:grid-cols-3 gap-4 sm:gap-6 ms:gap-8 ls:gap-10"
                            animate={{ height: 'auto' }}
                            transition={{ duration: 0.5 }}
                        >
                            <AnimatePresence initial={false}>
                                {upcomingEvents.map((event, index) => (
                                    <motion.div
                                        key={event.id ?? index}
                                        layout
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.5 }}
                                        className="flex justify-center"
                                    >
                                        <div className="w-full max-md:flex max-md:justify-center">
                                            <EventCard {...event} />
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </section>
                )}

                {/* --- CONCLUDED EVENTS --- */}
                {concludedEvents.length > 0 && (
                    <section className="flex flex-col gap-6 sm:gap-10">
                        <h2 className="px-4 text-lg sm:text-2xl font-bold font-vietnam text-neutral-600">
                            CONCLUDED EVENTS
                        </h2>
                        <motion.div
                            className="grid grid-cols-1 ms:grid-cols-2 ls:grid-cols-3 gap-4 sm:gap-6 ms:gap-8 ls:gap-10"
                            animate={{ height: 'auto' }}
                            transition={{ duration: 0.5 }}
                        >
                            <AnimatePresence initial={false}>
                                {concludedEvents.map((event, index) => (
                                    <motion.div
                                        key={event.id ?? index}
                                        layout
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.5 }}
                                        className="flex justify-center"
                                    >
                                        <div className="w-full max-md:flex max-md:justify-center">
                                            <EventCard {...event} />
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </section>
                )}
            </div>
        </div>
    )
}

export default EventPage
