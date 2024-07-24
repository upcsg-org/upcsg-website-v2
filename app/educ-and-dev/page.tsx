import React from 'react'
import AnnouncementSection from '@/components/educ-and-dev/AnnouncementSection'
import ContactUsForm from '@/components/generics/ContactUsForm'
import EventSection from '@/components/generics/EventSection'
import { Carousel } from '@/components/landing-page/Carousel'

const EducAndDevPage = () => {
    return (
        <>
            <section className="h-[calc(100vh-3rem)]">
                <Carousel />
            </section>
            <section>
                <EventSection />
            </section>
            <section>
                <AnnouncementSection />
            </section>
            <section>
                <ContactUsForm />
            </section>
        </>
    )
}

export default EducAndDevPage
