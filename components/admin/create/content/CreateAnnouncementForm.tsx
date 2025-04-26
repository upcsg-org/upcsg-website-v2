import React, { useRef } from 'react'
import { FaImage } from 'react-icons/fa'
import TheButton from '@/components/generics/TheButton'

interface CreateAnnouncementFormProps {
    formData: {
        title: string
        summary: string
        image_url: File | null
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
                name: 'title',
                type: 'text',
                placeholder: 'Input your title here.',
                value: formData.title,
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
                    name="title"
                    value={formData.title}
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
                    name="summary"
                    value={formData.summary}
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
