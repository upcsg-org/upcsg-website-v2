'use client'

import { useAnnouncementStore } from '@/store/announcement'
import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnnouncementCard from '../landing/AnnouncementCard'

const AnnouncementsPage: React.FC = () => {
    const { items, loading, error, fetchAll } = useAnnouncementStore()

    useEffect(() => {
        if (fetchAll) {
            fetchAll?.()
        }
    }, [])

    return (
        <div>
            <div
                className="flex w-full items-center justify-center text-center bg-gradient-to-r
                            from-csg-blue-600/25 to-csg-blue-600/25 via-csg-blue-600 h-28 sm:h-36 xl:h-56
                            tracking-widest font-vietnam font-bold text-white text-xl sm:text-4xl xl:text-6xl"
            >
                ANNOUNCEMENTS
            </div>
            <motion.div
                animate={{ height: 'auto' }}
                transition={{
                    duration: 0.5,
                    ease: [0.43, 0.13, 0.23, 0.96],
                }}
            >
                <div className="m-12 md:m-28 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 justify-items-center">
                    <AnimatePresence initial={false}>
                        {items.map((announcement, index) => (
                            <motion.div
                                key={index + announcement.title}
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
                                    <AnnouncementCard {...announcement} />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    )
}

export default AnnouncementsPage
