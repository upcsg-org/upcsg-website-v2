import ScholarshipsSection from '@/components/landing/ScholarshipsSection'
import OfficersSection from '@/components/landing/OfficersSection'
import ContactUsForm from '@/components/generics/ContactUsForm'
import { Carousel } from '@/components/landing-page/Carousel'
import FacultySection from '@/components/landing/FacultySection'
import EventSection from '@/components/generics/EventSection'
import { LandingPageImages } from '@/enums/carousel'

export default function Home() {
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
                <ScholarshipsSection />
            </section>
            <section>
                <OfficersSection />
            </section>
            <section>
                <FacultySection />
            </section>
            <section>
                <ContactUsForm />
            </section>
        </>
    )
}
