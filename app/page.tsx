import OfficersSection from '@/components/landing/OfficersSection'
import ContactUsForm from '@/components/generics/ContactUsForm'
import { Carousel } from '@/components/landing-page/Carousel'
import FacultySection from '@/components/landing/FacultySection'
import EventSection from '@/components/generics/EventSection'

export default function Home() {
    return (
        <>
            <section className="h-[calc(100vh-3rem)]">
                <Carousel />
            </section>
            <section>
                <EventSection />
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
