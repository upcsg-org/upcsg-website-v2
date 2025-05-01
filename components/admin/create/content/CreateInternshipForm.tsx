import React, { useRef } from 'react'
import { FaImage } from 'react-icons/fa'
import TheButton from '@/components/generics/TheButton'

interface CreateInternshipFormProps {
    formData: {
        internshipTitle: string
        applicationOpeningDate: string
        applicationDeadlineDate: string
        requirementsSummary: string
        benefitsSummary: string
        organization: string
        image: File | null
    }
    handleChange: (e: any) => void
    handleImageChange: (e: any) => void
    goToNextStep: () => void
}

export const CreateInternshipForm = ({
    formData,
    handleChange,
    handleImageChange,
    goToNextStep,
}: CreateInternshipFormProps) => {
    // IMAGE OPERATIONS
    const imageInputRef = useRef<HTMLInputElement>(null)

    const handleImageUpload = (): void => {
        imageInputRef.current?.click()
    }

    return (
        <>
            {/* Internship Title */}
            <div className="mb-6">
                <label className="mb-1 font-semibold tracking-wide">
                    Internship Title
                </label>
                <input
                    type="text"
                    name="internshipTitle"
                    value={formData.internshipTitle}
                    onChange={handleChange}
                    placeholder="Input your title here."
                    className="w-full p-3 mt-2 border rounded-xl bg-secondary-dark"
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
                        name="applicationOpeningDate"
                        value={formData.applicationOpeningDate}
                        onChange={handleChange}
                        className="w-full p-3 mt-2 border rounded-xl bg-secondary-dark"
                    />
                </div>
                <div className="lg:w-1/2">
                    <label className="mb-1 font-semibold tracking-wide">
                        Date of Application Deadline
                    </label>
                    <input
                        type="date"
                        name="applicationDeadlineDate"
                        value={formData.applicationDeadlineDate}
                        onChange={handleChange}
                        className="w-full p-3 mt-2 border rounded-xl bg-secondary-dark"
                    />
                </div>
            </div>

            {/* Requirements Summary */}
            <div className="mb-6">
                <label className="mb-1 font-semibold tracking-wide">
                    Requirements Summary
                </label>
                <textarea
                    name="requirementsSummary"
                    value={formData.requirementsSummary}
                    onChange={handleChange}
                    placeholder="Input requirements here."
                    className="w-full p-3 mt-2 border rounded-xl resize-none bg-secondary-dark"
                    rows={6}
                />
            </div>

            {/* Benefits Summary */}
            <div className="mb-6">
                <label className="mb-1 font-semibold tracking-wide">
                    Benefits Summary
                </label>
                <textarea
                    name="benefitsSummary"
                    value={formData.benefitsSummary}
                    onChange={handleChange}
                    placeholder="Input benefits here."
                    className="w-full p-3 mt-2 border rounded-xl resize-none bg-secondary-dark"
                    rows={6}
                />
            </div>

            {/* Organization */}
            <div className="mb-6">
                <label className="mb-1 font-semibold tracking-wide">
                    Organization
                </label>
                <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="Input your organization here."
                    className="w-full p-3 mt-2 border rounded-xl bg-secondary-dark"
                />
            </div>

            {/* Internship Image */}
            <div className="my-6 inline-flex flex-col">
                <label className="mb-1 font-semibold">Internship Image</label>
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
