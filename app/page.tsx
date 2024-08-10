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

export default function Home() {
    const [isContactUsModalOpen, setIsContactUsModalOpen] = useState(false)

    const images = Object.values(LandingPageCarouselContent)

    return (
        <>
            <section className="h-[calc(100vh-3rem)]">
                <Carousel carouselContentList={images} />
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
            {isContactUsModalOpen && (
                <ComingSoonModal toggleModal={setIsContactUsModalOpen} />
            )}
        </>
    )
}
