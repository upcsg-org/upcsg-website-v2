import React, { useState, useEffect, useRef } from 'react'
import { FaImage } from 'react-icons/fa'
import TheButton from '@/components/generics/TheButton'
import { useSearchParams } from 'next/navigation'
import { apiClient } from '@/lib/api'

interface UpdateAnnouncementFormProps {
    formData: {
        title: string
        summary: string
        image_url: File | null
    }
    handleChange: (e: any) => void
    handleImageChange: (e: any) => void
    goToNextStep: () => void
    setFormData: React.Dispatch<React.SetStateAction<any>>
}

export const UpdateAnnouncementForm = ({
    formData,
    handleChange,
    handleImageChange,
    goToNextStep,
    setFormData,
}: UpdateAnnouncementFormProps) => {
    const imageInputRef = useRef<HTMLInputElement>(null)
    const searchParams = useSearchParams()
    const [loading, setLoading] = useState(true)

    const handleImageUpload = (): void => {
        imageInputRef.current?.click()
    }

    useEffect(() => {
        const id = searchParams.get('id')
        const fetchEvent = async () => {
            try {
                const announcement = await apiClient.get(
                    `/cms/announcements/${id}/`
                )
                console.log('Fetched announcement:', announcement)

                setFormData({
                    title: announcement.title || '',
                    summary: announcement.summary || '',
                    external_url: announcement.external_url || null,
                    image_url: announcement.image_url || null,
                    article: announcement.article || null,
                })

                setLoading(false)

                console.log('Form data now:', formData)
            } catch (error) {
                console.error('Failed to fetch event:', error)
            }
        }
        fetchEvent()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <>
            {/* Announcement Title */}
            <div className="mb-6">
                <label className="mb-1 font-semibold tracking-wide">
                    Announcement Title Update
                </label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Input your title here."
                    className="w-full border rounded-xl bg-secondary-dark p-3 mt-2"
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
                    className="w-full border rounded-xl resize-none bg-secondary-dark p-3 mt-2"
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
