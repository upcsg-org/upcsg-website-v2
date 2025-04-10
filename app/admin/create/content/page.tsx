'use client'
import CreateEventMenu from '@/components/admin/cms/EventCMSMenu'
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
        <div>
            <CreateEventMenu />
            <section className="py-12 px-12 sm:px-14 lg:px-28">
                {/* Create Event Selector */}
                <CreateEventForm
                    formData={formData}
                    handleChange={handleChange}
                    handleImageChange={handleImageChange}
                />
            </section>
        </div>
    )
}

export default AdminCreateContent
