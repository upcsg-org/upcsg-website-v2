import ScholarshipsSection from '@/components/landing/ScholarshipsSection'
import OfficersSection from '@/components/landing/OfficersSection'
import ContactUsForm from '@/components/generics/ContactUsForm'
import { Carousel } from '@/components/landing-page/Carousel'

export default function Home() {
    return (
        <>
            <section className="h-[calc(100vh-3rem)]">
                <Carousel />
            </section>
            <section>
                <ScholarshipsSection />
            </section>
            <section>
                <OfficersSection />
            </section>
            <section>
                <ContactUsForm />
            </section>
        </>
    )
}
