'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnnouncementCard from '../landing/AnnouncementCard'
import { FaLongArrowAltRight, FaBullhorn } from 'react-icons/fa'
import TheButton from '../generics/TheButton'
import { useAnnouncementStore } from '@/store/announcement'
import { Announcement } from '@/interface/announcement'
import Loader from '@/components/ui/Loader'

const EmptyAnnouncementsState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <FaBullhorn className="w-12 h-12 text-blue-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">No Announcements Yet</h3>
        <p className="text-gray-600 max-w-md mb-8">
            We&apos;re currently preparing some important announcements for you. Check back soon for updates on news and important information.
        </p>
        <div className="flex gap-4">
            <TheButton link="/contact-us">
                Contact Us
            </TheButton>
            <TheButton link="/about">
                Learn More
            </TheButton>
        </div>
    </div>
)

const AnnouncementSection: React.FC = () => {
    const [showAll, setShowAll] = useState(false)
    const [visibleAnnouncementCount, setVisibleAnnouncementCount] = useState(3)
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
        const updateVisibleAnnouncementCount = () => {
            const width = window.innerWidth
            if (width < 648) {
                setVisibleAnnouncementCount(1)
            } else if (width < 948) {
                setVisibleAnnouncementCount(2)
            } else {
                setVisibleAnnouncementCount(3)
            }
        }

        updateVisibleAnnouncementCount()
        window.addEventListener('resize', updateVisibleAnnouncementCount)
        return () => window.removeEventListener('resize', updateVisibleAnnouncementCount)
    }, [])

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight)
        }
    }, [showAll, visibleAnnouncementCount, announcements])

    const visibleAnnouncements = showAll
        ? announcements
        : announcements.slice(0, visibleAnnouncementCount)

    const handleToggle = () => {
        setShowAll(!showAll)
    }

    return (
        <div className="max-w-[1280px] mx-auto px-4 flex flex-col gap-10">
            <h1 className="text-2xl font-bold font-vietnam text-center ms:text-left">
                ANNOUNCEMENTS
            </h1>

            {loading ? (
                <div className="flex justify-center items-center py-16">
                    <Loader
                        size="lg"
                        text="Loading announcements..."
                        className="text-site-main"
                        variant="spinner"
                    />
                </div>
            ) : error ? (
                <div className="text-center text-red-500">
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
                        <div
                            ref={contentRef}
                            className="grid grid-cols-1 ms:grid-cols-2 ls:grid-cols-3 gap-6 ms:gap-8 ls:gap-10"
                        >
                            {announcements.length === 0 ? (
                                <div className="col-span-full">
                                    <EmptyAnnouncementsState />
                                </div>
                            ) : (
                                <AnimatePresence initial={false}>
                                    {visibleAnnouncements.map((announcement, index) => (
                                        <motion.div
                                            key={announcement.id ?? index}
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
                                                <AnnouncementCard {...announcement} />
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}
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
                                className="flex justify-center md:justify-end gap-6"
                            >
                                {announcements.length > visibleAnnouncementCount && (
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
