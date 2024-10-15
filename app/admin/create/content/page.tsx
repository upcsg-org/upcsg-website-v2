'use client'

import React from 'react'

import CreateEventForm from '@/components/admin/create/content/CreateEventForm'
import useFormHandler from '@/hooks/FormHooks'

const AdminCreateContent = () => {
    // initial values for form data
    const initialValues = {
        eventTitle: '',
        startTime: '',
        endTime: '',
        eventLocation: '',
        eventDay: '',
        eventMonth: '',
        eventYear: '',
        image: null,
    }

    // create event form hooks
    const { formData, handleChange, handleImageChange, handleSubmit } =
        useFormHandler(initialValues)

    return (
        <section className="px-14 md:px-32">
            {/* Create Event Selector */}
            <CreateEventForm
                formData={formData}
                handleChange={handleChange}
                handleImageChange={handleImageChange}
            />
        </section>
    )
}

export default AdminCreateContent
