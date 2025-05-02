import React, { useRef, useState, useEffect } from 'react'
import { FaImage } from 'react-icons/fa'
import TheButton from '@/components/generics/TheButton'
import Image from 'next/image'

interface CreateScholarshipFormProps {
    formData: {
        title: string
        opening_date: string
        deadline: string
        requirements: string
        benefits: string
        organization: string
        image_url: File | string | null
    }
    handleChange: (e: any) => void
    handleImageChange: (e: any) => void
    goToNextStep: () => void
}

export const CreateScholarshipForm = ({
    formData,
    handleChange,
    handleImageChange,
    goToNextStep,
}: CreateScholarshipFormProps) => {
    // IMAGE OPERATIONS
    const imageInputRef = useRef<HTMLInputElement>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    const handleImageUpload = (): void => {
        imageInputRef.current?.click()
    }

    // Set image preview when image changes
    useEffect(() => {
        if (formData.image_url) {
            if (typeof formData.image_url === 'string') {
                // If image_url is a string, it's an existing URL
                setImagePreview(formData.image_url)
            } else if (formData.image_url instanceof File) {
                // If image_url is a File, create a preview URL
                const objectUrl = URL.createObjectURL(formData.image_url)
                setImagePreview(objectUrl)

                // Clean up the URL when component unmounts or image changes
                return () => URL.revokeObjectURL(objectUrl)
            }
        } else {
            setImagePreview(null)
        }
    }, [formData.image_url])

    return (
        <>
            {/* Scholarship Title */}
            <div className="mb-6">
                <label className="mb-1 font-semibold tracking-wide">
                    Scholarship Title
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

            {/* Application Dates */}
            <div className="w-full lg:flex lg:justify-between lg:space-x-3 lg:align-center mb-6">
                <div className="mb-6 lg:mb-0 lg:w-1/2">
                    <label className="mb-1 font-semibold tracking-wide">
                        Date of Application Opening
                    </label>
                    <input
                        type="date"
                        name="opening_date"
                        value={formData.opening_date}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-xl bg-secondary-dark"
                    />
                </div>
                <div className="lg:w-1/2">
                    <label className="mb-1 font-semibold tracking-wide">
                        Date of Application Deadline
                    </label>
                    <input
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-xl bg-secondary-dark"
                    />
                </div>
            </div>

            {/* Requirements Summary */}
            <div className="mb-6">
                <label className="mb-1 font-semibold tracking-wide">
                    Requirements Summary
                </label>
                <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    placeholder="Input requirements here."
                    className="w-full p-2 border rounded-xl resize-none bg-secondary-dark"
                    rows={6}
                />
            </div>

            {/* Benefits Summary */}
            <div className="mb-6">
                <label className="mb-1 font-semibold tracking-wide">
                    Benefits Summary
                </label>
                <textarea
                    name="benefits"
                    value={formData.benefits}
                    onChange={handleChange}
                    placeholder="Input benefits here."
                    className="w-full p-2 border rounded-xl resize-none bg-secondary-dark"
                    rows={6}
                />
            </div>

            {/* Scholarship Organization */}
            <div className="mb-6">
                <label className="mb-1 font-semibold tracking-wide">
                    Scholarship Organization
                </label>
                <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="Input your organization here."
                    className="w-full p-2 border rounded-xl bg-secondary-dark"
                />
            </div>

            {/* Scholarship Image */}
            <div className="my-6">
                <label className="mb-1 font-semibold block">
                    Scholarship Image
                </label>
                <div className="flex items-center mb-4">
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
                    {formData.image_url instanceof File && (
                        <p className="ml-5 sm:self-start">
                            {formData.image_url.name}
                        </p>
                    )}
                </div>

                {/* Image Preview */}
                {imagePreview && (
                    <div className="mt-4">
                        <p className="text-sm mb-2">Image Preview:</p>
                        <div
                            className="w-full max-w-md overflow-hidden rounded-lg border border-gray-300 relative"
                            style={{ height: '250px' }}
                        >
                            <Image
                                src={imagePreview}
                                alt="Preview"
                                fill
                                sizes="(max-width: 768px) 100vw, 400px"
                                style={{ objectFit: 'contain' }}
                                priority
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
