'use client'

import { useState, Suspense, lazy } from 'react'

const EventSection = lazy(() => import('@/components/events/EventSection'))
const AnnouncementSection = lazy(() => import('@/components/landing/AnnouncementSection'))
const ScholarshipsSection = lazy(() => import('@/components/landing/ScholarshipsSection'))
const OfficersSection = lazy(() => import('@/components/landing/OfficersSection'))
const FacultySection = lazy(() => import('@/components/landing/FacultySection'))

import ContactUsForm from '@/components/contact-us/ContactUsForm'
import { Carousel } from '@/components/landing/Carousel'
import { LandingPageCarouselContent } from '@/constants/carousel'
import ComingSoonModal from '@/components/generics/ComingSoonModal'

// Loading skeleton components
const SectionSkeleton = () => (
    <div className="max-w-[1280px] mx-auto px-4 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="grid grid-cols-1 ms:grid-cols-2 ls:grid-cols-3 gap-6">
            {[1, 2, 3].map((index) => (
                <div key={index} className="bg-gray-200 rounded-lg h-[300px]"></div>
            ))}
        </div>
    </div>
)

const EventSectionSkeleton = () => (
    <div className="max-w-[1280px] mx-auto px-4 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="grid grid-cols-1 ms:grid-cols-2 ls:grid-cols-3 gap-6">
            {[1, 2, 3].map((index) => (
                <div key={index} className="space-y-4">
                    <div className="bg-gray-200 rounded-lg h-[200px]"></div>
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
)

const AnnouncementSectionSkeleton = () => (
    <div className="max-w-[1280px] mx-auto px-4 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="space-y-4">
            {[1, 2].map((index) => (
                <div key={index} className="bg-gray-200 rounded-lg h-[150px]"></div>
            ))}
        </div>
    </div>
)

const ContactFormSkeleton = () => (
    <div className="max-w-[1280px] mx-auto px-4 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="bg-gray-200 rounded-lg h-[400px]"></div>
    </div>
)

export default function Home() {
    const [isContactUsModalOpen, setIsContactUsModalOpen] = useState(false)

    const images = Object.values(LandingPageCarouselContent)

    return (
        <>
            <section className="h-[calc(100vh-5rem)]">
                <Carousel carouselContentList={images} />
            </section>
            <div className="flex flex-col gap-14 py-10">
                <section>
                    <Suspense fallback={<EventSectionSkeleton />}>
                        <EventSection />
                    </Suspense>
                </section>
                <section>
                    <Suspense fallback={<AnnouncementSectionSkeleton />}>
                        <AnnouncementSection />
                    </Suspense>
                </section>
                <section>
                    <Suspense fallback={<SectionSkeleton />}>
                        <ScholarshipsSection />
                    </Suspense>
                </section>
                <section>
                    <Suspense fallback={<SectionSkeleton />}>
                        <OfficersSection />
                    </Suspense>
                </section>
                <section>
                    <Suspense fallback={<SectionSkeleton />}>
                        <FacultySection />
                    </Suspense>
                </section>
                <section>
                    <Suspense fallback={<ContactFormSkeleton />}>
                        <ContactUsForm
                            setIsContactUsModalOpen={setIsContactUsModalOpen}
                        />
                    </Suspense>
                </section>
            </div>
            {isContactUsModalOpen && (
                <ComingSoonModal toggleModal={setIsContactUsModalOpen} />
            )}
        </>
    )
}
