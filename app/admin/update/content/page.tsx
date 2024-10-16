'use client'

import CreateEventMenu from '@/components/admin/cms/EventCMSMenu'
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
        <div>
            <CreateEventMenu />
            <section className="py-12 px-12 sm:px-14 lg:px-28">
                {/* Create Event Selector */}
                <UpdateEventForm
                    formData={formData}
                    handleChange={handleChange}
                    handleImageChange={handleImageChange}
                />
            </section>
        </div>
    )
}

export default AdminUpdateContent
