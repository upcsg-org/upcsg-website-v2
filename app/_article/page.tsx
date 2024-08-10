import React from 'react'
import { ArticleImage } from '@/components/generics/ArticleImage'
import { ArticleBody } from '@/components/generics/ArticleBody'
// import TextForm from '@/components/generics/ContactUsForm'
import EventSection from '@/components/events/EventSection'

const page = () => {
    return (
        <>
            <section className="h-[calc(100vh-3rem)]">
                <ArticleImage />
            </section>
            <section>
                <ArticleBody />
            </section>
            {/* <section className="bg-[#171A33] mt-12">
                <TextForm />
            </section> */}
            <section className="mt-8">
                <EventSection />
            </section>
        </>
    )
}

export default page
