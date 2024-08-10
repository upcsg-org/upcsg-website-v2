'use client'

import { useState } from 'react'
import ContactUsForm from '@/components/generics/ContactUsForm'
import ComingSoonModal from '@/components/generics/ComingSoonModal'

const ContactUsPage = () => {
    const [isContactUsModalOpen, setIsContactUsModalOpen] = useState(false)

    return (
        <div className="h-[calc(100vh-6rem)] flex flex-col justify-center">
            <section>
                <ContactUsForm
                    setIsContactUsModalOpen={setIsContactUsModalOpen}
                />
            </section>
            {isContactUsModalOpen && (
                <ComingSoonModal toggleModal={setIsContactUsModalOpen} />
            )}
        </div>
    )
}

export default ContactUsPage
