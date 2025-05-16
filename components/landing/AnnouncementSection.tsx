'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnnouncementCard from './AnnouncementCard'
import TheButton from '../generics/TheButton'
import { useAnnouncementStore } from '@/store/announcement'
import { FaLongArrowAltRight } from 'react-icons/fa'

const AnnouncementSection: React.FC = () => {
    const [showAll, setShowAll] = useState(false)
    const [visibleCount, setVisibleCount] = useState(4)
    const contentRef = useRef<HTMLDivElement>(null)
    const [contentHeight, setContentHeight] = useState(0)

    const { items, loading, error, fetchAll } = useAnnouncementStore()

    useEffect(() => {
        if (!items || items.length === 0) {
            fetchAll?.()
        }
    }, [items, fetchAll])

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
    }, [showAll, visibleCount, items])

    // Use items from store and slice for display
    const visibleAnnouncements = showAll
        ? (items?.slice(0, 4) ?? [])
        : (items?.slice(0, visibleCount) ?? [])

    const handleToggle = () => {
        setShowAll(!showAll)
    }

    return (
        <div className="max-w-[1280px] mx-auto px-4 flex flex-col gap-10">
            <h1 className="text-2xl font-bold font-vietnam text-white text-center sm:text-left">
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
                    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 justify-items-center">
                        <AnimatePresence initial={false}>
                            {visibleAnnouncements.map((announcement, index) => (
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
                </div>
            </motion.div>
            <AnimatePresence mode="wait">
                <motion.div
                    key="button"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-end gap-6"
                >
                    {/* Only show toggle if more items exist beyond the visible count */}
                    {items && items.length > visibleCount && (
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
        </div>
    )
}

export default AnnouncementSection
