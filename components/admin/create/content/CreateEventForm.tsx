import React, { useRef } from 'react'

import FormFieldBuilder from '@/components/generics/formField/FormFieldBuilder'
import TheButton from '@/components/generics/TheButton'
import useFormHandler from '@/hooks/FormHooks'
import getContentFormConfig from './eventFormConfig'
import { FaImage } from 'react-icons/fa'

const CreateEventForm = () => {
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

    // stores field configs for create event form builder
    const contentFormConfig = getContentFormConfig(formData, handleChange)

    // IMAGE OPERATIONS
    const imageInputRef = useRef<HTMLInputElement>(null)

    const handleImageUpload = (): void => {
        imageInputRef.current?.click()
    }

    return (
        <>
            {/* Event Title */}
            <FormFieldBuilder
                formConfig={contentFormConfig.slice(0, 1)}
                className={'my-2'}
            />
            <div className="w-full my-2 md:flex md:justify-between md:space-x-3 md:align-center">
                {/* Event Duration */}
                <FormFieldBuilder
                    formConfig={contentFormConfig.slice(1, 3)}
                    className={'sm:flex sm:justify-between sm:space-x-3'}
                />
                {/* Event Location */}
                <FormFieldBuilder
                    formConfig={contentFormConfig.slice(3, 4)}
                    className={'md:w-1/2'}
                />
            </div>
            {/* Event Date */}
            <div className="my-2 md:flex md:space-x-3">
                <FormFieldBuilder
                    formConfig={contentFormConfig.slice(4, 6)}
                    className={'sm:flex sm:justify-between sm:space-x-3'}
                />
                <FormFieldBuilder formConfig={contentFormConfig.slice(6, 7)} />
            </div>
            {/* Event Image */}
            <div className="inline-flex flex-col">
                <label className="mb-1 font-semibold">Event Image</label>
                <div className="flex items-center">
                    <TheButton
                        children={
                            <div className="flex items-center">
                                <h1 className="mr-6">UPLOAD IMAGE</h1>
                                <FaImage />
                            </div>
                        }
                        style={'w-auto'}
                        onClick={handleImageUpload}
                    />
                    <input
                        type="file"
                        ref={imageInputRef}
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                        accept="image/*"
                    />
                    {formData.image && (
                        <p className="ml-5 sm:self-start">
                            {formData.image.name}
                        </p>
                    )}
                </div>
            </div>
        </>
    )
}

export default CreateEventForm
