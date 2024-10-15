'use client'

import UpdateEventForm from '@/components/admin/update/content/UpdateEventForm'
import useFormHandler from '@/hooks/FormHooks'

const AdminUpdateContent = () => {
    // initial values for form data
    // set initial values to 'empty' momentarily
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

    // update event form hooks
    const { formData, handleChange, handleImageChange, handleSubmit } =
        useFormHandler(initialValues)

    return (
        <section className="px-14 md:px-32">
            {/* Update Event Selector */}
            <UpdateEventForm
                formData={formData}
                handleChange={handleChange}
                handleImageChange={handleImageChange}
            />
        </section>
    )
}

export default AdminUpdateContent
