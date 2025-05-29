'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnnouncementCard from './AnnouncementCard'
import TheButton from '../generics/TheButton'
import { useAnnouncementStore } from '@/store/announcement'
import { FaLongArrowAltRight, FaBullhorn } from 'react-icons/fa'
import { Announcement } from '@/interface/announcement'
import Loader from '@/components/ui/Loader'

const EmptyAnnouncementsState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-6">
            <FaBullhorn className="w-12 h-12 text-purple-500" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">No Announcements Yet</h3>
        <p className="text-gray-300 max-w-md mb-8">
            Stay tuned! We&apos;ll be sharing important updates and news here soon. In the meantime, you can explore other sections of our website.
        </p>
        <div className="flex gap-4">
            <TheButton link="/about">
                About Us
            </TheButton>
            <TheButton link="/contact-us">
                Get in Touch
            </TheButton>
        </div>
    </div>
)

const AnnouncementSection: React.FC = () => {
    const [showAll, setShowAll] = useState(false)
    const [visibleCount, setVisibleCount] = useState(4)
    const [announcements, setAnnouncements] = useState<Announcement[]>([])
    const contentRef = useRef<HTMLDivElement>(null)
    const [contentHeight, setContentHeight] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    const { items, fetchAll } = useAnnouncementStore()

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                setLoading(true)
                if (fetchAll) {
                    await fetchAll()
                }
            } catch (err) {
                console.error('Error fetching announcements:', err)
                setError(err instanceof Error ? err : new Error('Failed to fetch announcements'))
            } finally {
                setLoading(false)
            }
        }

        fetchAnnouncements()
    }, [fetchAll])

    useEffect(() => {
        if (items && items.length > 0) {
            const sorted = [...items]
                .sort(
                    (a, b) =>
                        new Date(b.date_updated).getTime() -
                        new Date(a.date_updated).getTime()
                )
            setAnnouncements(sorted)
        }
    }, [items])

    useEffect(() => {
        const updateVisibleCount = () => {
            const width = window.innerWidth
            if (width < 500) {
                setVisibleCount(1)
            } else if (width < 768) {
                setVisibleCount(2)
            } else {
                setVisibleCount(4)
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
    }, [showAll, visibleCount, announcements])

    const visibleAnnouncements = showAll
        ? announcements.slice(0, 4)
        : announcements.slice(0, visibleCount)

    const handleToggle = () => {
        setShowAll(!showAll)
    }

    return (
        <div className="max-w-[1280px] mx-auto px-4 flex flex-col gap-10">
            <h1 className="text-2xl font-bold font-vietnam text-white text-center sm:text-left">
                RECENT NEWS AND ANNOUNCEMENTS
            </h1>

            {loading ? (
                <div className="flex justify-center items-center py-16">
                    <Loader
                        size="lg"
                        text="Loading announcements..."
                        className="text-white"
                        variant="spinner"
                    />
                </div>
            ) : error ? (
                <div className="text-center text-red-400">
                    Error loading announcements. Please try again later.
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
                        <div ref={contentRef}>
                            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 justify-items-center">
                                {announcements.length === 0 ? (
                                    <div className="col-span-full">
                                        <EmptyAnnouncementsState />
                                    </div>
                                ) : (
                                    <AnimatePresence initial={false}>
                                        {visibleAnnouncements.map(
                                            (announcement, index) => (
                                                <motion.div
                                                    key={announcement.id ?? index}
                                                    layout
                                                    initial={{
                                                        opacity: 0,
                                                        scale: 0.8,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        scale: 1,
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        scale: 0.8,
                                                    }}
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
                                )}
                            </div>
                        </div>
                    </motion.div>
                    {announcements.length > 0 && (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key="button"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="flex justify-end gap-6"
                            >
                                {announcements.length > visibleCount && (
                                    <TheButton onClick={handleToggle}>
                                        {showAll ? 'See less' : 'See more'}
                                    </TheButton>
                                )}
                                <TheButton link="/announcements">
                                    <div className="flex items-center justify-center gap-x-2">
                                        <p>View All Announcements</p>
                                        <FaLongArrowAltRight />
                                    </div>
                                </TheButton>
                            </motion.div>
                        </AnimatePresence>
                    )}
                </>
            )}
        </div>
    )
}

export default AnnouncementSection
