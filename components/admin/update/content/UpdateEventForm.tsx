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
                    className={`p-2 border rounded-xl cursor-pointer ${className}`}
                />
            </div>
        </div>
    )
}

interface UpdateEventFormProps {
    formData: {
        eventTitle: string
        startTime: string
        endTime: string
        eventLocation: string
        eventDay: string
        eventMonth: string
        eventYear: string
        image: File | null
    }
    handleChange: (e: any) => void
    handleImageChange: (e: any) => void
}

const UpdateEventForm = ({
    formData,
    handleChange,
    handleImageChange,
}: UpdateEventFormProps) => {
    // stores field configs for update event form builder
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
                <div className="my-1 sm:flex sm:justify-between sm:space-x-3 lg:w-5/12">
                    <TimeInput formConfig={contentFormConfig[1]} />
                    <TimeInput formConfig={contentFormConfig[2]} />
                </div>
                {/* Event Location */}
                <FormFieldBuilder
                    formConfig={contentFormConfig.slice(3, 4)}
                    className={'my-1 lg:w-1/2'}
                />
            </div>

            {/* Event Date */}
            <div className="lg:flex lg:space-x-3 lg:w-9/12">
                <div className="my-1 sm:flex sm:justify-between sm:space-x-3">
                    <div className="w-full">
                        <FormFieldBuilder
                            formConfig={contentFormConfig.slice(4, 5)}
                        />
                    </div>
                    <div className="w-full">
                        <FormFieldBuilder
                            formConfig={contentFormConfig.slice(5, 6)}
                        />
                    </div>
                </div>
                <FormFieldBuilder
                    formConfig={contentFormConfig.slice(6, 7)}
                    className={'my-1'}
                />
            </div>

            {/* Event Image */}
            <div className="my-1 inline-flex flex-col">
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
                        className="hidden"
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

export default UpdateEventForm
