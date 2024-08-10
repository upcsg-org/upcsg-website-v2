'use client'

import { useState } from 'react'
import ScholarshipsSection from '@/components/landing/ScholarshipsSection'
import OfficersSection from '@/components/landing/OfficersSection'
import ContactUsForm from '@/components/generics/ContactUsForm'
import { Carousel } from '@/components/landing/Carousel'
import FacultySection from '@/components/landing/FacultySection'
import EventSection from '@/components/generics/EventSection'
import { LandingPageCarouselContent } from '@/constants/carousel'
import ComingSoonModal from '@/components/generics/ComingSoonModal'
import AnnouncementSection from '@/components/landing/AnnouncementSection'

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
                    <AnnouncementSection />
                </section>
                <section>
                    <EventSection />
                </section>
                <section>
                    <ScholarshipsSection />
                </section>
                <section>
                    <OfficersSection />
                </section>
                <section>
                    <FacultySection />
                </section>
                <section>
                    <ContactUsForm
                        setIsContactUsModalOpen={setIsContactUsModalOpen}
                    />
                </section>
            </div>
            {isContactUsModalOpen && (
                <ComingSoonModal toggleModal={setIsContactUsModalOpen} />
            )}
        </>
    )
}
