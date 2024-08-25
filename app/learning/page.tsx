'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import PDFMat from '@/components/educ-and-dev/PDFMat'
import DocMat from '@/components/educ-and-dev/DocMat'
import PPTMat from '@/components/educ-and-dev/PPTMat'
import VideoMat from '@/components/educ-and-dev/VideoMat'
import { LearningFiles } from '@/constants/learning/LearningFiles'
import ContactUsForm from '@/components/contact-us/ContactUsForm'
import ComingSoonModal from '@/components/generics/ComingSoonModal'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const AnnouncementSection: React.FC = () => {
    const [isContactUsModalOpen, setIsContactUsModalOpen] = useState(false)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

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

    const scroll = (direction: 'left' | 'right') => {
        const container = scrollContainerRef.current
        if (container) {
            const scrollAmount = container.clientWidth
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            })
        }
    }

    const checkScrollability = () => {
        const container = scrollContainerRef.current
        if (container) {
            setCanScrollLeft(container.scrollLeft > 0)
            setCanScrollRight(
                container.scrollLeft <
                    container.scrollWidth - container.clientWidth - 1 // Subtract 1 to account for potential rounding errors
            )
        }
    }

    useEffect(() => {
        const container = scrollContainerRef.current
        if (container) {
            container.addEventListener('scroll', checkScrollability)
            window.addEventListener('resize', checkScrollability)
            checkScrollability() // Initial check
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', checkScrollability)
                window.removeEventListener('resize', checkScrollability)
            }
        }
    }, [])

    return (
        <>
            <div className="bg-csg-blue-400 w-full overflow-x-hidden pb-8">
                <div className="max-w-full mx-auto flex flex-col gap-10">
                    <h1 className="text-3xl font-semibold font-vietnam text-white text-center sm:text-left relative top-14 ml-8">
                        LEARNING MATERIALS
                    </h1>
                    <div className="bg-main-dark max-w-full h-20 mt-6 flex">
                        Material Type PDF Year Level Search Material
                    </div>
                    <div className="relative px-4">
                        <h1 className="text-2xl font-semibold font-vietnam text-white text-center sm:text-left ml-8 pb-6">
                            For Year IV Students
                        </h1>
                        <div className="flex items-center justify-center">
                            {canScrollLeft && (
                                <motion.button
                                    onClick={() => scroll('left')}
                                    className="absolute left-0 z-10 text-white bg-black bg-opacity-50 p-2 rounded-full"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <FaChevronLeft size={24} />
                                </motion.button>
                            )}
                            <div
                                ref={scrollContainerRef}
                                className="flex overflow-x-scroll overflow-y-hidden scrollbar-hide"
                                style={{
                                    scrollSnapType: 'x mandatory',
                                    maxWidth: '100%',
                                    width: '100%',
                                    msOverflowStyle: 'none' /* IE and Edge */,
                                    scrollbarWidth: 'none' /* Firefox */,
                                }}
                            >
                                {LearningFiles.map((file) => (
                                    <div
                                        key={file.id}
                                        className="flex-shrink-0 w-64 h-fit m-4"
                                        style={{
                                            scrollSnapAlign: 'center',
                                            minWidth: '256px', // Ensure consistent width
                                        }}
                                    >
                                        {renderFileComponent(file)}
                                    </div>
                                ))}
                            </div>
                            {canScrollRight && (
                                <motion.button
                                    onClick={() => scroll('right')}
                                    className="absolute right-0 z-10 text-white bg-black bg-opacity-50 p-2 rounded-full"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <FaChevronRight size={24} />
                                </motion.button>
                            )}
                        </div>
                    </div>
                    <div className="relative px-4">
                        <h1 className="text-2xl font-semibold font-vietnam text-white text-center sm:text-left ml-8 pb-6">
                            For Year III Students
                        </h1>
                        <div className="flex items-center justify-center">
                            {canScrollLeft && (
                                <motion.button
                                    onClick={() => scroll('left')}
                                    className="absolute left-0 z-10 text-white bg-black bg-opacity-50 p-2 rounded-full"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <FaChevronLeft size={24} />
                                </motion.button>
                            )}
                            <div
                                ref={scrollContainerRef}
                                className="flex overflow-x-scroll overflow-y-hidden scrollbar-hide"
                                style={{
                                    scrollSnapType: 'x mandatory',
                                    maxWidth: '100%',
                                    width: '100%',
                                    msOverflowStyle: 'none' /* IE and Edge */,
                                    scrollbarWidth: 'none' /* Firefox */,
                                }}
                            >
                                {LearningFiles.map((file) => (
                                    <div
                                        key={file.id}
                                        className="flex-shrink-0 w-64 h-fit m-4"
                                        style={{
                                            scrollSnapAlign: 'center',
                                            minWidth: '256px', // Ensure consistent width
                                        }}
                                    >
                                        {renderFileComponent(file)}
                                    </div>
                                ))}
                            </div>
                            {canScrollRight && (
                                <motion.button
                                    onClick={() => scroll('right')}
                                    className="absolute right-0 z-10 text-white bg-black bg-opacity-50 p-2 rounded-full"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <FaChevronRight size={24} />
                                </motion.button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="relative px-4">
                    <h1 className="text-2xl font-semibold font-vietnam text-white text-center sm:text-left ml-8 pb-6">
                        For Year II Students
                    </h1>
                    <div className="flex items-center justify-center">
                        {canScrollLeft && (
                            <motion.button
                                onClick={() => scroll('left')}
                                className="absolute left-0 z-10 text-white bg-black bg-opacity-50 p-2 rounded-full"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <FaChevronLeft size={24} />
                            </motion.button>
                        )}
                        <div
                            ref={scrollContainerRef}
                            className="flex overflow-x-scroll overflow-y-hidden scrollbar-hide"
                            style={{
                                scrollSnapType: 'x mandatory',
                                maxWidth: '100%',
                                width: '100%',
                                msOverflowStyle: 'none' /* IE and Edge */,
                                scrollbarWidth: 'none' /* Firefox */,
                            }}
                        >
                            {LearningFiles.map((file) => (
                                <div
                                    key={file.id}
                                    className="flex-shrink-0 w-64 h-fit m-4"
                                    style={{
                                        scrollSnapAlign: 'center',
                                        minWidth: '256px', // Ensure consistent width
                                    }}
                                >
                                    {renderFileComponent(file)}
                                </div>
                            ))}
                        </div>
                        {canScrollRight && (
                            <motion.button
                                onClick={() => scroll('right')}
                                className="absolute right-0 z-10 text-white bg-black bg-opacity-50 p-2 rounded-full"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <FaChevronRight size={24} />
                            </motion.button>
                        )}
                    </div>
                </div>
                <div className="relative px-4">
                    <h1 className="text-2xl font-semibold font-vietnam text-white text-center sm:text-left ml-8 pb-6">
                        For Year I Students
                    </h1>
                    <div className="flex items-center justify-center">
                        {canScrollLeft && (
                            <motion.button
                                onClick={() => scroll('left')}
                                className="absolute left-0 z-10 text-white bg-black bg-opacity-50 p-2 rounded-full"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <FaChevronLeft size={24} />
                            </motion.button>
                        )}
                        <div
                            ref={scrollContainerRef}
                            className="flex overflow-x-scroll overflow-y-hidden scrollbar-hide"
                            style={{
                                scrollSnapType: 'x mandatory',
                                maxWidth: '100%',
                                width: '100%',
                                msOverflowStyle: 'none' /* IE and Edge */,
                                scrollbarWidth: 'none' /* Firefox */,
                            }}
                        >
                            {LearningFiles.map((file) => (
                                <div
                                    key={file.id}
                                    className="flex-shrink-0 w-64 h-fit m-4"
                                    style={{
                                        scrollSnapAlign: 'center',
                                        minWidth: '256px', // Ensure consistent width
                                    }}
                                >
                                    {renderFileComponent(file)}
                                </div>
                            ))}
                        </div>
                        {canScrollRight && (
                            <motion.button
                                onClick={() => scroll('right')}
                                className="absolute right-0 z-10 text-white bg-black bg-opacity-50 p-2 rounded-full"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <FaChevronRight size={24} />
                            </motion.button>
                        )}
                    </div>
                </div>
                <h1 className="text-lg font-normal font-vietnam text-white text-center mt-16">
                    Have some learning materials you'd
                </h1>
                <h1 className="text-lg font-normal font-vietnam text-white text-center mb-4">
                    love to share? Reach out to us here!
                </h1>
            </div>
            <div className="bg-main-dark">
                <section>
                    <ContactUsForm
                        setIsContactUsModalOpen={setIsContactUsModalOpen}
                    />
                </section>
                {isContactUsModalOpen && (
                    <ComingSoonModal toggleModal={setIsContactUsModalOpen} />
                )}
            </div>
        </>
    )
}

export default AnnouncementSection
