'use client'

import { useState } from 'react'
import ContactUsForm from '@/components/contact-us/ContactUsForm'
import LookingSection from '@/components/educ-and-dev/LookingSection'
import ComingSoonModal from '@/components/generics/ComingSoonModal'

const EducAndDevPage = () => {
    const [isContactUsModalOpen, setIsContactUsModalOpen] = useState(false)

    return (
        <>
            <section className="h-[calc(100vh-6rem)] flex flex-col justify-center">
                <LookingSection />
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

export default EducAndDevPage
