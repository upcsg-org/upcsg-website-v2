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

    // handle event image upload operation
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
            <div className="flex justify-between align-center w-full my-2">
                {/* Event Duration */}
                <FormFieldBuilder
                    formConfig={contentFormConfig.slice(1, 3)}
                    className={'flex mr-2'}
                />
                {/* Event Location */}
                <FormFieldBuilder
                    formConfig={contentFormConfig.slice(3, 4)}
                    className={'w-1/2'}
                />
            </div>
            <div className="my-3 w-1/2">
                {/* Event Date */}
                <FormFieldBuilder
                    formConfig={contentFormConfig.slice(4, 7)}
                    className={'flex'}
                />
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
                        <p className="ml-5">{formData.image.name}</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default CreateEventForm
