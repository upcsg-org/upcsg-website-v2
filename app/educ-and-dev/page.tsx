import React from 'react'
import AnnouncementSection from '@/components/educ-and-dev/AnnouncementSection'
import ContactUsForm from '@/components/generics/ContactUsForm'
import EventSection from '@/components/generics/EventSection'
import { Carousel } from '@/components/landing-page/Carousel'
import LookingSection from '@/components/educ-and-dev/LookingSection'
import { LandingPageImages } from '@/constants/carousel'

const EducAndDevPage = () => {
    const images = Object.values(LandingPageImages)
    return (
        <>
            <section className="h-[calc(100vh-3rem)]">
                <Carousel images={images} />
            </section>
            <section>
                <EventSection />
            </section>
            <section>
                <AnnouncementSection />
            </section>
            <section>
                <LookingSection />
            </section>
            <section>
                <ContactUsForm />
            </section>
        </>
    )
}

export default EducAndDevPage
