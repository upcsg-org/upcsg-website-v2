'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TheButton from '@/components/generics/TheButton'
import PDFMat from '@/components/educ-and-dev/PDFMat'
import DocMat from '@/components/educ-and-dev/DocMat'
import PPTMat from '@/components/educ-and-dev/PPTMat'
import VideoMat from '@/components/educ-and-dev/VideoMat'
import { LearningFiles } from '@/constants/learning/LearningFiles'

const AnnouncementSection: React.FC = () => {
    const [showAll, setShowAll] = useState(false)
    const [visibleCount, setVisibleCount] = useState(3)
    const contentRef = useRef<HTMLDivElement>(null)
    const [contentHeight, setContentHeight] = useState(0)

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

    const visibleFiles = showAll
        ? LearningFiles
        : LearningFiles.slice(0, visibleCount)

    const handleToggle = () => {
        setShowAll(!showAll)
    }

    const renderFileComponent = (file: (typeof LearningFiles)[0]) => {
        switch (file.filetype.toLowerCase()) {
            case 'pdf file':
                return <PDFMat material={file.material} title={file.title} />
            case 'doc file':
                return <DocMat material={file.material} title={file.title} />
            case 'ppt file':
                return <PPTMat material={file.material} title={file.title} />
            default:
                return <VideoMat material={file.material} title={file.title} />
        }
    }

    return (
        <div className="bg-main-dark w-full overflow-x-hidden">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col gap-10">
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
                        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 justify-items-center">
                            <AnimatePresence initial={false}>
                                {visibleFiles.map((file) => (
                                    <motion.div
                                        key={file.id}
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
                                            {renderFileComponent(file)}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
                <AnimatePresence mode="wait">
                    {LearningFiles.length > visibleCount && (
                        <motion.div
                            key="button"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="flex justify-center"
                        >
                            <TheButton onClick={handleToggle}>
                                {showAll ? 'See less' : 'See more'}
                            </TheButton>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default AnnouncementSection
