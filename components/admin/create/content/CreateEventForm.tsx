import React, { useRef, useEffect } from 'react'

import FormFieldBuilder from '@/components/generics/formField/FormFieldBuilder'
import TheButton from '@/components/generics/TheButton'
import getContentFormConfig from '@/configs/eventFormConfig'
import { FormFieldProps } from '@/interface/formfield'
import { FaImage } from 'react-icons/fa'

interface TimeInputProps {
    formConfig: FormFieldProps
}

// time input component
const TimeInput = ({ formConfig }: TimeInputProps) => {
    const { field, onChange } = formConfig
    const { label, name, value, className } = field

    return (
        <div className="w-full flex flex-col">
            <label className="mb-1 font-semibold tracking-wide">{label}</label>
            <div className="mb-1 font-semibold tracking-wide">
                <input
                    type="time"
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`p-2 border rounded-xl cursor-pointer bg-secondary-dark ${className}`}
                />
            </div>
        </div>
    )
}

interface CreateEventFormProps {
    formData: {
        title: string
        start_date: string
        end_date: string
        external_url: string
        body: string
        image_url: File | null
    }
    handleChange: (e: any) => void
    handleImageChange: (e: any) => void
    goToNextStep: () => void
}

const CreateEventForm = ({
    formData,
    handleChange,
    handleImageChange,
    goToNextStep,
}: CreateEventFormProps) => {
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
                className={'my-1'}
            />
            <div className="w-full lg:flex lg:justify-between lg:space-x-3 lg:align-center">
                {/* Event Duration */}
                <div className="my-6 sm:flex sm:justify-between sm:space-x-3 lg:w-5/12">
                    <FormFieldBuilder
                        formConfig={contentFormConfig.slice(1, 2)}
                        className={'w-full'}
                    />
                    <FormFieldBuilder
                        formConfig={contentFormConfig.slice(2, 3)}
                        className={'w-full'}
                    />
                </div>
                {/* Event Location */}
                <FormFieldBuilder
                    formConfig={contentFormConfig.slice(3, 4)}
                    className={'my-6 lg:w-1/2'}
                />
            </div>

            {/* Event Body */}
            <FormFieldBuilder
                formConfig={contentFormConfig.slice(4, 5)}
                className={'my-6'}
            />

            {/* Event Image */}
            <div className="my-6 inline-flex flex-col">
                <label className="mb-1 font-semibold">Event Image</label>
                <div className="flex items-center">
                    <TheButton style={'w-auto'} onClick={handleImageUpload}>
                        <div className="flex items-center">
                            <h1 className="mr-6">UPLOAD IMAGE</h1>
                            <FaImage />
                        </div>
                    </TheButton>
                    <input
                        type="file"
                        ref={imageInputRef}
                        className="hidden"
                        onChange={handleImageChange}
                        accept="image/*"
                    />
                    {formData.image_url && (
                        <p className="ml-5 sm:self-start">
                            {formData.image_url.name}
                        </p>
                    )}
                </div>
            </div>
        </>
    )
}

export default CreateEventForm
