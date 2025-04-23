import React, { useRef } from 'react'
import { FaImage } from 'react-icons/fa'
import FormFieldBuilder from '@/components/generics/formField/FormFieldBuilder'
import TheButton from '@/components/generics/TheButton'

interface CreateAnnouncementFormProps {
    formData: {
        announcementTitle: string
        announcementSummary: string
        image: File | null
    }
    handleChange: (e: any) => void
    handleImageChange: (e: any) => void
    goToNextStep: () => void
}

export const CreateAnnouncementForm = ({
    formData,
    handleChange,
    handleImageChange,
    goToNextStep,
}: CreateAnnouncementFormProps) => {
    // IMAGE OPERATIONS
    const imageInputRef = useRef<HTMLInputElement>(null)

    const handleImageUpload = (): void => {
        imageInputRef.current?.click()
    }

    // Form field configurations
    const formConfig = [
        {
            field: {
                label: 'Announcement Title',
                name: 'announcementTitle',
                type: 'text',
                placeholder: 'Input your title here.',
                value: formData.announcementTitle,
                className: 'w-full rounded-xl p-2',
            },
            onChange: handleChange,
        },
    ]

    return (
        <>
            {/* Announcement Title */}
            <div className="mb-6">
                <label className="mb-1 font-semibold tracking-wide">
                    Announcement Title
                </label>
                <input
                    type="text"
                    name="announcementTitle"
                    value={formData.announcementTitle}
                    onChange={handleChange}
                    placeholder="Input your title here."
                    className="w-full p-2 border rounded-xl bg-secondary-dark"
                />
            </div>

            {/* Announcement Summary */}
            <div className="mb-6">
                <label className="mb-1 font-semibold tracking-wide">
                    Announcement Summary
                </label>
                <textarea
                    name="announcementSummary"
                    value={formData.announcementSummary}
                    onChange={handleChange}
                    placeholder="Input your summary here."
                    className="w-full p-2 border rounded-xl resize-none bg-secondary-dark"
                    rows={8}
                />
            </div>

            {/* Announcement Image */}
            <div className="my-6 inline-flex flex-col">
                <label className="mb-1 font-semibold">Announcement Image</label>
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
