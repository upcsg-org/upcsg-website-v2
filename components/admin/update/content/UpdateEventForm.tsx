import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { FaImage } from 'react-icons/fa'
import TheButton from '@/components/generics/TheButton'
import { apiClient } from '@/lib/api'

interface Article {
    title: string
    date_created: string
    date_updated: string
    body: string
    author?: string | null
}

interface UpdateEventFormProps {
    formData: {
        title: string
        start_date: string
        end_date: string
        external_url: string
        body: string
        image_url: File | null
        location: string
        article: Article
    }

    handleChange: (e: any) => void
    handleImageChange: (e: any) => void
    goToNextStep: () => void
    setFormData: React.Dispatch<React.SetStateAction<any>>
}

const UpdateEventForm = ({
    formData,
    handleChange,
    handleImageChange,
    goToNextStep,
    setFormData,
}: UpdateEventFormProps) => {
    const searchParams = useSearchParams()
    const imageInputRef = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(true)

    const handleImageUpload = (): void => {
        imageInputRef.current?.click()
    }

    useEffect(() => {
        const id = searchParams.get('id')
        const fetchEvent = async () => {
            try {
                const event = await apiClient.get(`/cms/events/${id}/`)
                console.log('Fetched event:', event)

                // Populate event form with fetched data
                setFormData({
                    title: event.title || '',
                    start_date: event.start_date || '',
                    end_date: event.end_date || '',
                    external_url: event.external_url || null,
                    image_url: event.image_url || null, // leave as string for preview
                    body: event.body || '',
                    location: event.location || '',
                    article: event.article || null,
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
            {/* Event Title */}
            <div className="mb-6">
                <label className="mb-1 font-semibold">Event Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter event title"
                    className="w-full p-3 border rounded-xl bg-secondary-dark mt-2"
                />
            </div>

            {/* Event Duration */}
            <div className="mb-6 flex flex-col lg:flex-row lg:space-x-3">
                <div className="flex-1 mb-4 lg:mb-0">
                    <label className="mb-1 font-semibold">Start Date</label>
                    <input
                        type="date"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl bg-secondary-dark mt-2"
                    />
                </div>
                <div className="flex-1">
                    <label className="mb-1 font-semibold">End Date</label>
                    <input
                        type="date"
                        name="end_date"
                        value={formData.end_date}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl bg-secondary-dark mt-2"
                    />
                </div>
            </div>

            {/* Event Location */}
            <div className="mb-6">
                <label className="mb-1 font-semibold">Location</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter event location"
                    className="w-full p-3 border rounded-xl bg-secondary-dark mt-2"
                />
            </div>

            {/* Event Body */}
            <div className="mb-6">
                <label className="mb-1 font-semibold">Description</label>
                <textarea
                    name="body"
                    value={formData.body}
                    onChange={handleChange}
                    placeholder="Enter event description"
                    className="w-full p-3 border rounded-xl resize-none bg-secondary-dark mt-2"
                    rows={6}
                />
            </div>

            {/* Event Image */}
            <div className="w-full my-6 inline-flex flex-col">
                <label className="mb-1 font-semibold">Event Image</label>
                <div className="w-full flex-col md:flex-row items-center break-words mt-2">
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
                        <p className="w-full mt-5 sm:self-start text-sm md:text-base">
                            {formData.image_url?.name}
                        </p>
                    )}
                </div>
            </div>
        </>
    )
}

export default UpdateEventForm
