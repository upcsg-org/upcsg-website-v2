import React from 'react'

import FormFieldBuilder from '@/components/generics/formField/FormFieldBuilder'
import TheButton from '@/components/generics/TheButton'
import useFormHandler from '@/hooks/FormHooks'
import getContentFormConfig from './eventFormConfig'
import { FaImage } from 'react-icons/fa'

const CreateEventForm = () => {
    const initialValues = {
        eventTitle: '',
        startTime: '',
        endTime: '',
        eventLocation: '',
        eventDay: '',
        eventMonth: '',
        eventYear: '',
        image: '',
    }

    const { formData, handleChange, handleImageChange, handleSubmit } =
        useFormHandler(initialValues)

    const createContentFieldProps = getContentFormConfig(formData, handleChange)

    return (
        <>
            <FormFieldBuilder
                formConfig={createContentFieldProps.slice(0, 1)}
                className={'my-2'}
            />
            <div className="flex justify-between align-center w-full my-2">
                <FormFieldBuilder
                    formConfig={createContentFieldProps.slice(1, 3)}
                    className={'flex mr-2'}
                />
                <FormFieldBuilder
                    formConfig={createContentFieldProps.slice(3, 4)}
                    className={'w-1/2'}
                />
            </div>
            <div className="my-3 w-1/2">
                <FormFieldBuilder
                    formConfig={createContentFieldProps.slice(4, 7)}
                    className={'flex'}
                />
            </div>
            <div className="inline-flex flex-col">
                <label className="mb-1 font-semibold">Event Image</label>
                <TheButton
                    children={
                        <div className="flex items-center">
                            <h1 className="mr-6">UPLOAD IMAGE</h1>
                            <FaImage />
                        </div>
                    }
                    style={'w-auto'}
                />
            </div>
        </>
    )
}

export default CreateEventForm
